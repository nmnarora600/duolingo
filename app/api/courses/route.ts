import  { connectionToPG } from "@/db/drizzle";
import { courses } from "@/db/schema";
import { isAdmin } from "@/lib/admin";
import { NextResponse } from "next/server";

export const GET=async()=>{
      const {db,client}= await connectionToPG();
      try{
        const adm= await isAdmin();
        if(!adm) {  await  client.end();return new NextResponse("Unauthorized",{status:401})}
        const data= await db.query.courses.findMany();
        await  client.end();
        return NextResponse.json(data)
      }
      finally{
        await client.end()
      }
   
}
export const POST=async(req:Request)=>{
      const {db,client}= await connectionToPG();
      try{

          const adm= await isAdmin();
          if(!adm) {  await  client.end();return new NextResponse("Unauthorized",{status:401})}
      
              const body= await req.json();
          const data = await db.insert(courses).values({
              ...body,
          }).returning()
          await  client.end();
          return NextResponse.json(data[0])
      }
      finally{
        await client.end()
      }
}