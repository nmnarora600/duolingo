import "dotenv/config";
// import { drizzle } from "drizzle-orm/neon-http";
// import { neon } from "@neondatabase/serverless";

// import * as schema from "@/db/schema";

// const sql = neon(process.env.DATABASE_URL!);
// const db = drizzle(sql, { schema });

import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from "@/db/schema"
import postgres from 'postgres'
const connectionString = process.env.DATABASE_URL!
const client = postgres(connectionString)
const db = drizzle(client,{schema});








const main = async () => {
  try {
    console.log("seeding db");
    await db.delete(schema.courses);

    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.userSubscription);
    console.log("delete finished");
    await db.insert(schema.courses).values([
      { id: 1, title: "Hindi", imageSrc: "/in.svg" },
      { id: 2, title: "German", imageSrc: "/de.svg" },
      { id: 3, title: "Italian", imageSrc: "/it.svg" },
      { id: 4, title: "Croatian", imageSrc: "/hr.svg" },
      { id: 5, title: "Japanese", imageSrc: "/jp.svg" },
      { id: 6, title: "French", imageSrc: "/gf.svg" },
      { id: 7, title: "Spanish", imageSrc: "/es.svg" },
    ]);

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 7, //choose spanish
        title: "Unit 1",
        description: "Learn the basics of Spanish",
        order: 1,
      },
    ]);

    await db.insert(schema.lessons).values([
      { id: 1, unitId: 1, order: 1, title: "Nouns" },
      { id: 2, unitId: 1, order: 2, title: "Verbs" },
      { id: 3, unitId: 1, order: 3, title: "Pronouns" },
      { id: 4, unitId: 1, order: 4, title: "Adjectives" },
      { id: 5, unitId: 1, order: 5, title: "Adverbs" },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1, //Nouns
        type: "SELECT",
        order: 1,
        question: 'Which one of these is "the man"?',
      },
      {
        id: 2,
        lessonId: 1, //Nouns
        type: "ASSIST",
        order: 2,
        question: '"the man"?',
      },
      {
        id: 3,
        lessonId: 1, //Nouns
        type: "SELECT",
        order: 3,
        question: 'Which one of these is "the robot"?',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 1, //answers which is a man
        imageSrc: "/images/man.svg",
        correct: true,
        text: "el hombre",
        audioSrc: "/es_man.mp3",
      },
      {
        challengeId: 1,
        imageSrc: "/images/woman.svg",
        correct: false,
        text: "la mujer",
        audioSrc: "/es_woman.mp3",
      },
      {
        challengeId: 1,
        imageSrc: "/images/robot.svg",
        correct: false,
        text: "el robot",
        audioSrc: "/images/robot.mp3",
      },
    
    ]);
    await db.insert(schema.challengeOptions).values([
        {
            challengeId: 2, //answers which is a man
            correct: true,
            text: "el hombre",
            audioSrc: "/es_man.mp3",
          },
          {
            challengeId: 2,
            correct: false,
            text: "la mujer",
            audioSrc: "/es_woman.mp3",
          },
          {
            challengeId: 2,
            correct: false,
            text: "el robot",
            audioSrc: "/images/robot.mp3",
          },
       
    ]);
    await db.insert(schema.challengeOptions).values([
        {
            challengeId: 3, //answers which is a man
            imageSrc: "/images/man.svg",
            correct: false,
            text: "el hombre",
            audioSrc: "/es_man.mp3",
          },
          {
            challengeId: 3,
            imageSrc: "/images/woman.svg",
            correct: false,
            text: "la mujer",
            audioSrc: "/es_woman.mp3",
          },
          {
            challengeId: 3,
            imageSrc: "/images/robot.svg",
            correct: true,
            text: "el robot",
            audioSrc: "/images/robot.mp3",
          },
       
    ]);
    await db.insert(schema.challenges).values([
      {
        id: 4,
        lessonId: 2, //Verbs
        type: "SELECT",
        order: 1,
        question: 'Which one of these is "the man"?',
      },
      {
        id: 5,
        lessonId: 2, //Verbs
        type: "ASSIST",
        order: 2,
        question: '"the man"?',
      },
      {
        id: 6,
        lessonId: 2, //Verbs
        type: "SELECT",
        order: 3,
        question: 'Which one of these is "the robot"?',
      },
    ]);
    console.log("seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();
