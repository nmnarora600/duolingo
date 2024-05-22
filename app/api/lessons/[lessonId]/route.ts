import { connectionToPG } from "@/db/drizzle";
import { lessons } from "@/db/schema";
import { isAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

//get request
export const GET = async (
  req: Request,
  { params }: { params: { lessonId: number } }
) => {
    const {db,client}= await connectionToPG();
    try{

      const adm = await isAdmin();
      if (!adm) {  await  client.end();return new NextResponse("Unauthorized", { status: 401 });}
      const data = await db.query.lessons.findFirst({
        where: eq(lessons.id, params.lessonId),
      });
      await client.end();
      return NextResponse.json(data);
    }
    finally{
      await client.end();
    }
};

//put request
export const PUT = async (
  req: Request,
  { params }: { params: { lessonId: number } }
) => {
    const {db,client}= await connectionToPG();
    try{

      const adm = await isAdmin();
      if (!adm) {  await  client.end();return new NextResponse("Unauthorized", { status: 401 });}
    
      const body = await req.json();
      const data = await db
        .update(lessons)
        .set({
          ...body,
        })
        .where(eq(lessons.id, params.lessonId))
        .returning();
        await  client.end();
      return NextResponse.json(data[0]);
    }
    finally{
       await  client.end()
    }
};

//delete request
export const DELETE = async (
  req: Request,
  { params }: { params: { lessonId: number } }
) => {
    const {db,client}= await connectionToPG();
    try{

      const adm = await isAdmin();
      if (!adm){  await  client.end(); return new NextResponse("Unauthorized", { status: 401 });}
      const data = await db
        .delete(lessons)
        .where(eq(lessons.id, params.lessonId))
        .returning();
        await  client.end();
      return NextResponse.json(data[0]);
    }
    finally{
      await client.end()
    }
};
