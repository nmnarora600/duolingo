import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import  { connectionToPG } from "@/db/drizzle";
import { userSubscription } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req:Request) {
    const {db,client}= await connectionToPG();
    const body= await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;
    try {
        event= stripe.webhooks.constructEvent(
            body,signature,process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error:any) {
        await  client.end();
        return new NextResponse(`Webhook error:${error.message}`,{status:400})
    }

    const session= event.data.object as Stripe.Checkout.Session;
    //first time user
    if(event.type=== "checkout.session.completed"){
        const subscription= await stripe.subscriptions.retrieve(session.subscription as string)
        if(!session?.metadata?.userId){
            await  client.end();
            return new NextResponse("User id is required",{status:400});
        }


        
        await db.insert(userSubscription).values({
            userId:session.metadata.userId,
            stripeSubscriptionId:subscription.id,
            stripeCustomerId:subscription.customer as string,
            stripePriceId:subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd:new Date(subscription.current_period_end*1000)
        })
        await  client.end();
    }
//recurring
    if(event.type==="invoice.payment_succeeded"){
        const subscription= await stripe.subscriptions.retrieve(session.subscription as string);

        await db.update(userSubscription).set({
            stripePriceId:subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd:new Date(
                subscription.current_period_end * 1000
            )
        }).where(eq(userSubscription.stripeSubscriptionId,subscription.id))
    }
    await  client.end();
    return new NextResponse(null,{status:200})
}