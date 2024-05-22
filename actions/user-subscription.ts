"use server";

import { UNIT_AMOUNT } from "@/constants";
import { getUserSubscription } from "@/db/queries";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs/server";

// where to go after transaction
const returnUrl = absoluteUrl("/shop");

// get user id
const getUserId = async () => {
  return new Promise<string | null>(async (resolve, reject) => {
    const { userId } = await auth();
    if (userId) resolve(userId);
    else {
      reject(null);
    }
  });
};

//creating transaction url
export const createStripeUrl = async () => {
  const userId = await getUserId();
  const user = await currentUser();
  if (!userId || !user) throw new Error("Unauthorized");

  const userSubscription = await getUserSubscription();
  //when user already have subscription
  if (userSubscription && userSubscription.stripeCustomerId) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: userSubscription.stripeCustomerId,
      return_url: returnUrl,
    });
    return { data: stripeSession.url };
  }

  //payment page data
  const stripeSession = await stripe.checkout.sessions.create({
    mode: "subscription", //select monthly or one time
    payment_method_types: ["card"],
    customer_email: user.emailAddresses[0].emailAddress,

    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "INR",
          product_data: {
            name: "Duolingo Web+",
            description: "Unlimited Hearts",
          },
          unit_amount: UNIT_AMOUNT, // amount to charge
          recurring: {
            interval: "month", //next interval to charge
          },
        },
      },
    ],
    metadata: {
      userId, //details given to webhook
    },
    success_url: returnUrl,
    cancel_url: returnUrl,
  });
  return { data: stripeSession.url };
};
