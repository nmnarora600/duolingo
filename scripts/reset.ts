import "dotenv/config";

import * as schema from "@/db/schema"
import { connectionToPG } from "@/db/drizzle";



const main = async () => {
  try {
    console.log("resetting db");
    
    const {db,client} =await connectionToPG();
    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.userSubscription);
    await  client.end();
    console.log("resetting finished");
  
  } catch (error) {
    console.error(error);
    throw new Error("Failed to reset the database");
  }
};

main();
