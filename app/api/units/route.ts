import { connectionToPG } from "@/db/drizzle";
import { units } from "@/db/schema";
import { isAdmin } from "@/lib/admin";
import { NextResponse } from "next/server";

//get request
export const GET = async () => {
    const {db,client}= await connectionToPG();
    try{
      const adm = await isAdmin();
      if (!adm){ await client.end(); return new NextResponse("Unauthorized", { status: 401 });}
      const data = await db.query.units.findMany();
      await client.end();
      return NextResponse.json(data);
    }
    finally{
      await client.end()
    }
};

//post request
export const POST = async (req: Request) => {
    const {db,client}= await connectionToPG();
    try{

      const adm = await isAdmin();
      if (!adm) { await client.end();return new NextResponse("Unauthorized", { status: 401 });}
    
      const body = await req.json();
      const data = await db
        .insert(units)
        .values({
          ...body,
        })
        .returning();
        await client.end();
      return NextResponse.json(data[0]);
    }
    finally{
      await client.end();
    }
};
