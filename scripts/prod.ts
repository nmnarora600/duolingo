import "dotenv/config";

import * as schema from "@/db/schema"
import { connectionToPG } from "@/db/drizzle";

//when you have connection string
// import { drizzle } from 'drizzle-orm/postgres-js';
// import postgres from 'postgres'
// const connectionString = process.env.DATABASE_URL!
// const client = postgres(connectionString)
// const db = drizzle(client,{schema});

const main = async () => {
  const {db,client}= await connectionToPG();
  try {
    console.log("          Seeding Started          ");
    console.log("_______________________________________");
    // Delete all existing data
    await Promise.all([
      db.delete(schema.userProgress),
      db.delete(schema.challenges),
      db.delete(schema.units),
      db.delete(schema.lessons),
      db.delete(schema.courses),
      db.delete(schema.challengeOptions),
      db.delete(schema.userSubscription),
    ]);

    // Insert courses
    const courses = await db
      .insert(schema.courses)
      .values([
        { title: "Hindi", imageSrc: "/flags/in.svg" },
        { title: "French", imageSrc: "/flags/gf.svg" },
        { title: "Spanish", imageSrc: "/flags/es.svg" },
        { title: "Italian", imageSrc: "/flags/it.svg" },
      ])
      .returning();

    let i=0;
    // For each course, insert units
    for (const course of courses) {
      console.log("  ");
      console.log("---------- Inserting ",course.title,"----------")
      const units = await db
        .insert(schema.units)
        .values([
          {
            courseId: course.id,
            title: "Unit 1",
            description: `Learn the basics of ${course.title}`,
            order: 1,
          },
          {
            courseId: course.id,
            title: "Unit 2",
            description: `Learn intermediate ${course.title}`,
            order: 2,
          },
        ])
        .returning();
console.log("===>Units inserted")
      // For each unit, insert lessons
      for (const unit of units) {
        const lessons = await db
          .insert(schema.lessons)
          .values([
            { unitId: unit.id, title: "Nouns", order: 1 },
            { unitId: unit.id, title: "Verbs", order: 2 },
            { unitId: unit.id, title: "Adjectives", order: 3 },
            { unitId: unit.id, title: "Phrases", order: 4 },
            { unitId: unit.id, title: "Sentences", order: 5 },
          ])
          .returning();

        // For each lesson, insert challenges
        for (const lesson of lessons) {
          const challenges = await db
            .insert(schema.challenges)
            .values([
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the man"?',
                order: 1,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the woman"?',
                order: 2,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the boy"?',
                order: 3,
              },
              {
                lessonId: lesson.id,
                type: "ASSIST",
                question: '"the man"',
                order: 4,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the zombie"?',
                order: 5,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the robot"?',
                order: 6,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the girl"?',
                order: 7,
              },
              {
                lessonId: lesson.id,
                type: "ASSIST",
                question: '"the zombie"',
                order: 8,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the rabbit"?',
                order: 9,
              },
            ])
            .returning();

          
            // For each challenge, insert challenge options
            if(i===0){      // for Hindi
              for (const challenge of challenges) {
                if (challenge.order === 1) {
                  await db.insert(schema.challengeOptions).values([
                    {
                      challengeId: challenge.id,
                      correct: true,
                      text: "आदमी",
                      imageSrc: "/images/man.svg",
                      audioSrc: `/resources/in/sounds/in_man.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "औरत",
                      imageSrc: "/images/woman.svg",
                      audioSrc: `/resources/in/sounds/in_woman.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "लड़का",
                      imageSrc: "/images/boy.svg",
                      audioSrc: `/resources/in/sounds/in_boy.mp3`,
                    },
                  ]);
                }
  
                if (challenge.order === 2) {
                  await db.insert(schema.challengeOptions).values([
                    {
                      challengeId: challenge.id,
                      correct: true,
                      text: "औरत",
                      imageSrc: "/images/woman.svg",
                      audioSrc: `/resources/in/sounds/in_woman.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "लड़का",
                      imageSrc: "/images/boy.svg",
                      audioSrc: `/resources/in/sounds/in_boy.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "आदमी",
                      imageSrc: "/images/man.svg",
                      audioSrc: `/resources/in/sounds/in_man.mp3`,
                    },
                  ]);
                }
  
                if (challenge.order === 3) {
                  await db.insert(schema.challengeOptions).values([
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "औरत",
                      imageSrc: "/images/woman.svg",
                      audioSrc: `/resources/in/sounds/in_woman.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "आदमी",
                      imageSrc: "/images/man.svg",
                      audioSrc: `/resources/in/sounds/in_man.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: true,
                      text: "लड़का",
                      imageSrc: "/images/boy.svg",
                      audioSrc: `/resources/in/sounds/in_boy.mp3`,
                    },
                  ]);
                }
  
                if (challenge.order === 4) {
                  await db.insert(schema.challengeOptions).values([
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "औरत",
                      audioSrc: `/resources/in/sounds/in_woman.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: true,
                      text: "आदमी",
                      audioSrc: `/resources/in/sounds/in_man.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "लड़का",
                      audioSrc: `/resources/in/sounds/in_boy.mp3`,
                    },
                  ]);
                }
  
                if (challenge.order === 5) {
                  await db.insert(schema.challengeOptions).values([
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "आदमी",
                      imageSrc: "/images/man.svg",
                      audioSrc: `/resources/in/sounds/in_man.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "औरत",
                      imageSrc: "/images/woman.svg",
                      audioSrc: `/resources/in/sounds/in_woman.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: true,
                      text: "अनुप्राणित शव",
                      imageSrc: "/images/zombie.svg",
                      audioSrc: `/resources/in/sounds/in_zombie.mp3`,
                    },
                  ]);
                }
  
                if (challenge.order === 6) {
                  await db.insert(schema.challengeOptions).values([
                    {
                      challengeId: challenge.id,
                      correct: true,
                      text: "यंत्रमानव",
                      imageSrc: "/images/robot.svg",
                      audioSrc: `/resources/in/sounds/in_robot.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "अनुप्राणित शव",
                      imageSrc: "/images/zombie.svg",
                      audioSrc: `/resources/in/sounds/in_zombie.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "लड़का",
                      imageSrc: "/images/boy.svg",
                      audioSrc: `/resources/in/sounds/in_boy.mp3`,
                    },
                  ]);
                }
  
                if (challenge.order === 7) {
                  await db.insert(schema.challengeOptions).values([
                    {
                      challengeId: challenge.id,
                      correct: true,
                      text: "लड़की",
                      imageSrc: "/images/girl.svg",
                      audioSrc: `/resources/in/sounds/in_girl.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "अनुप्राणित शव",
                      imageSrc: "/images/zombie.svg",
                      audioSrc: `/resources/in/sounds/in_zombie.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "आदमी",
                      imageSrc: "/images/man.svg",
                      audioSrc: `/resources/in/sounds/in_man.mp3`,
                    },
                  ]);
                }
  
                if (challenge.order === 8) {
                  await db.insert(schema.challengeOptions).values([
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "औरत",
                      audioSrc: `/resources/in/sounds/in_woman.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: true,
                      text: "अनुप्राणित शव",
                      audioSrc: `/resources/in/sounds/in_zombie.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "लड़का",
                      audioSrc: `/resources/in/sounds/in_boy.mp3`,
                    },
                  ]);
                }
                if (challenge.order === 9) {
                  await db.insert(schema.challengeOptions).values([
                    {
                      challengeId: challenge.id,
                      correct: true,
                      text: "खरगोश",
                      imageSrc: "/images/rabbit.png",
                      audioSrc: `/resources/in/sounds/in_rabbit.mp3`,
                    },
                 
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "बंदर",
                      imageSrc: "/images/monkey.png",
                      audioSrc: `/resources/in/sounds/in_monkey.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "हाथी",
                      imageSrc: "/images/elephant.png",
                      audioSrc: `/resources/in/sounds/in_elephant.mp3`,
                    },
                  ]);
                }
              }
            }
           
            else if(i===1){      // for french
              for (const challenge of challenges) {
                if (challenge.order === 1) {
                  await db.insert(schema.challengeOptions).values([
                    {
                      challengeId: challenge.id,
                      correct: true,
                      text: "l'homme",
                      imageSrc: "/images/man.svg",
                      audioSrc: `/resources/gf/sounds/gf_man.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "la femme",
                      imageSrc: "/images/woman.svg",
                      audioSrc: `/resources/gf/sounds/gf_woman.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "le garçon",
                      imageSrc: "/images/boy.svg",
                      audioSrc: `/resources/gf/sounds/gf_boy.mp3`,
                    },
                  ]);
                }
  
                if (challenge.order === 2) {
                  await db.insert(schema.challengeOptions).values([
                    {
                      challengeId: challenge.id,
                      correct: true,
                      text: "la femme",
                      imageSrc: "/images/woman.svg",
                      audioSrc: `/resources/gf/sounds/gf_woman.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "le garçon",
                      imageSrc: "/images/boy.svg",
                      audioSrc: `/resources/gf/sounds/gf_boy.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "l'homme",
                      imageSrc: "/images/man.svg",
                      audioSrc: `/resources/gf/sounds/gf_man.mp3`,
                    },
                  ]);
                }
  
                if (challenge.order === 3) {
                  await db.insert(schema.challengeOptions).values([
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "la femme",
                      imageSrc: "/images/woman.svg",
                      audioSrc: `/resources/gf/sounds/gf_woman.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "l'homme",
                      imageSrc: "/images/man.svg",
                      audioSrc: `/resources/gf/sounds/gf_man.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: true,
                      text: "le garçon",
                      imageSrc: "/images/boy.svg",
                      audioSrc: `/resources/gf/sounds/gf_boy.mp3`,
                    },
                  ]);
                }
  
                if (challenge.order === 4) {
                  await db.insert(schema.challengeOptions).values([
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "la femme",
                      audioSrc: `/resources/gf/sounds/gf_woman.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: true,
                      text: "l'homme",
                      audioSrc: `/resources/gf/sounds/gf_man.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "le garçon",
                      audioSrc: `/resources/gf/sounds/gf_boy.mp3`,
                    },
                  ]);
                }
  
                if (challenge.order === 5) {
                  await db.insert(schema.challengeOptions).values([
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "l'homme",
                      imageSrc: "/images/man.svg",
                      audioSrc: `/resources/gf/sounds/gf_man.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "la femme",
                      imageSrc: "/images/woman.svg",
                      audioSrc: `/resources/gf/sounds/gf_woman.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: true,
                      text: "le zombie",
                      imageSrc: "/images/zombie.svg",
                      audioSrc: `/resources/gf/sounds/gf_zombie.mp3`,
                    },
                  ]);
                }
  
                if (challenge.order === 6) {
                  await db.insert(schema.challengeOptions).values([
                    {
                      challengeId: challenge.id,
                      correct: true,
                      text: "le robot",
                      imageSrc: "/images/robot.svg",
                      audioSrc: `/resources/gf/sounds/gf_robot.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "le zombie",
                      imageSrc: "/images/zombie.svg",
                      audioSrc: `/resources/gf/sounds/gf_zombie.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "le garçon",
                      imageSrc: "/images/boy.svg",
                      audioSrc: `/resources/gf/sounds/gf_boy.mp3`,
                    },
                  ]);
                }
  
                if (challenge.order === 7) {
                  await db.insert(schema.challengeOptions).values([
                    {
                      challengeId: challenge.id,
                      correct: true,
                      text: "la fille",
                      imageSrc: "/images/girl.svg",
                      audioSrc: `/resources/gf/sounds/gf_girl.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "le zombie",
                      imageSrc: "/images/zombie.svg",
                      audioSrc: `/resources/gf/sounds/gf_zombie.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "l'homme",
                      imageSrc: "/images/man.svg",
                      audioSrc: `/resources/gf/sounds/gf_man.mp3`,
                    },
                  ]);
                }
  
                if (challenge.order === 8) {
                  await db.insert(schema.challengeOptions).values([
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "la femme",
                      audioSrc: `/resources/gf/sounds/gf_woman.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: true,
                      text: "le zombie",
                      audioSrc: `/resources/gf/sounds/gf_zombie.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "le garçon",
                      audioSrc: `/resources/gf/sounds/gf_boy.mp3`,
                    },
                  ]);
                }
                if (challenge.order === 9) {
                  await db.insert(schema.challengeOptions).values([
                    {
                      challengeId: challenge.id,
                      correct: true,
                      text: "le lapin",
                      imageSrc: "/images/rabbit.png",
                      audioSrc: `/resources/gf/sounds/gf_rabbit.mp3`,
                    },
       
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "le singe",
                      imageSrc: "/images/monkey.png",
                      audioSrc: `/resources/gf/sounds/gf_monkey.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "l'éléphant",
                      imageSrc: "/images/elephant.png",
                      audioSrc: `/resources/gf/sounds/gf_elephant.mp3`,
                    },
                  ]);
                }
              }
            }
            else  if(i===2){       //for spanish
              for (const challenge of challenges) {
                if (challenge.order === 1) {
                  await db.insert(schema.challengeOptions).values([
                    {
                      challengeId: challenge.id,
                      correct: true,
                      text: "el hombre",
                      imageSrc: "/images/man.svg",
                      audioSrc: `/resources/es/sounds/es_man.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "la mujer",
                      imageSrc: "/images/woman.svg",
                      audioSrc: `/resources/es/sounds/es_woman.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "el chico",
                      imageSrc: "/images/boy.svg",
                      audioSrc: `/resources/es/sounds/es_boy.mp3`,
                    },
                  ]);
                }
  
                if (challenge.order === 2) {
                  await db.insert(schema.challengeOptions).values([
                    {
                      challengeId: challenge.id,
                      correct: true,
                      text: "la mujer",
                      imageSrc: "/images/woman.svg",
                      audioSrc: `/resources/es/sounds/es_woman.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "el chico",
                      imageSrc: "/images/boy.svg",
                      audioSrc: `/resources/es/sounds/es_boy.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "el hombre",
                      imageSrc: "/images/man.svg",
                      audioSrc: `/resources/es/sounds/es_man.mp3`,
                    },
                  ]);
                }
  
                if (challenge.order === 3) {
                  await db.insert(schema.challengeOptions).values([
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "la mujer",
                      imageSrc: "/images/woman.svg",
                      audioSrc: `/resources/es/sounds/es_woman.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "el hombre",
                      imageSrc: "/images/man.svg",
                      audioSrc: `/resources/es/sounds/es_man.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: true,
                      text: "el chico",
                      imageSrc: "/images/boy.svg",
                      audioSrc: `/resources/es/sounds/es_boy.mp3`,
                    },
                  ]);
                }
  
                if (challenge.order === 4) {
                  await db.insert(schema.challengeOptions).values([
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "la mujer",
                      audioSrc: `/resources/es/sounds/es_woman.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: true,
                      text: "el hombre",
                      audioSrc: `/resources/es/sounds/es_man.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "el chico",
                      audioSrc: `/resources/es/sounds/es_boy.mp3`,
                    },
                  ]);
                }
  
                if (challenge.order === 5) {
                  await db.insert(schema.challengeOptions).values([
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "el hombre",
                      imageSrc: "/images/man.svg",
                      audioSrc: `/resources/es/sounds/es_man.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "la mujer",
                      imageSrc: "/images/woman.svg",
                      audioSrc: `/resources/es/sounds/es_woman.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: true,
                      text: "el zombie",
                      imageSrc: "/images/zombie.svg",
                      audioSrc: `/resources/es/sounds/es_zombie.mp3`,
                    },
                  ]);
                }
  
                if (challenge.order === 6) {
                  await db.insert(schema.challengeOptions).values([
                    {
                      challengeId: challenge.id,
                      correct: true,
                      text: "el robot",
                      imageSrc: "/images/robot.svg",
                      audioSrc: `/resources/es/sounds/es_robot.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "el zombie",
                      imageSrc: "/images/zombie.svg",
                      audioSrc: `/resources/es/sounds/es_zombie.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "el chico",
                      imageSrc: "/images/boy.svg",
                      audioSrc: `/resources/es/sounds/es_boy.mp3`,
                    },
                  ]);
                }
  
                if (challenge.order === 7) {
                  await db.insert(schema.challengeOptions).values([
                    {
                      challengeId: challenge.id,
                      correct: true,
                      text: "la nina",
                      imageSrc: "/images/girl.svg",
                      audioSrc: `/resources/es/sounds/es_girl.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "el zombie",
                      imageSrc: "/images/zombie.svg",
                      audioSrc: `/resources/es/sounds/es_zombie.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "el hombre",
                      imageSrc: "/images/man.svg",
                      audioSrc: `/resources/es/sounds/es_man.mp3`,
                    },
                  ]);
                }
  
                if (challenge.order === 8) {
                  await db.insert(schema.challengeOptions).values([
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "la mujer",
                      audioSrc: `/resources/es/sounds/es_woman.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: true,
                      text: "el zombie",
                      audioSrc: `/resources/es/sounds/es_zombie.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "el chico",
                      audioSrc: `/resources/es/sounds/es_boy.mp3`,
                    },
                  ]);
                }
                if (challenge.order === 9) {
                  await db.insert(schema.challengeOptions).values([
                    {
                      challengeId: challenge.id,
                      correct: true,
                      text: "el conejo",
                      imageSrc: "/images/rabbit.png",
                      audioSrc: `/resources/es/sounds/es_rabbit.mp3`,
                    },
        
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "el mono",
                      imageSrc: "/images/monkey.png",
                      audioSrc: `/resources/es/sounds/es_monkey.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "el elefante",
                      imageSrc: "/images/elephant.png",
                      audioSrc: `/resources/es/sounds/es_elephant.mp3`,
                    },
                  ]);
                }
              }
              }
            else if(i===3){      // for Italian
              for (const challenge of challenges) {
                if (challenge.order === 1) {
                  await db.insert(schema.challengeOptions).values([
                    {
                      challengeId: challenge.id,
                      correct: true,
                      text: "l'uomo",
                      imageSrc: "/images/man.svg",
                      audioSrc: `/resources/it/sounds/it_man.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "la donna",
                      imageSrc: "/images/woman.svg",
                      audioSrc: `/resources/it/sounds/it_woman.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "il ragazzo",
                      imageSrc: "/images/boy.svg",
                      audioSrc: `/resources/it/sounds/it_boy.mp3`,
                    },
                  ]);
                }
  
                if (challenge.order === 2) {
                  await db.insert(schema.challengeOptions).values([
                    {
                      challengeId: challenge.id,
                      correct: true,
                      text: "la donna",
                      imageSrc: "/images/woman.svg",
                      audioSrc: `/resources/it/sounds/it_woman.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "il ragazzo",
                      imageSrc: "/images/boy.svg",
                      audioSrc: `/resources/it/sounds/it_boy.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "l'uomo",
                      imageSrc: "/images/man.svg",
                      audioSrc: `/resources/it/sounds/it_man.mp3`,
                    },
                  ]);
                }
  
                if (challenge.order === 3) {
                  await db.insert(schema.challengeOptions).values([
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "la donna",
                      imageSrc: "/images/woman.svg",
                      audioSrc: `/resources/it/sounds/it_woman.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "l'uomo",
                      imageSrc: "/images/man.svg",
                      audioSrc: `/resources/it/sounds/it_man.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: true,
                      text: "il ragazzo",
                      imageSrc: "/images/boy.svg",
                      audioSrc: `/resources/it/sounds/it_boy.mp3`,
                    },
                  ]);
                }
  
                if (challenge.order === 4) {
                  await db.insert(schema.challengeOptions).values([
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "la donna",
                      audioSrc: `/resources/it/sounds/it_woman.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: true,
                      text: "l'uomo",
                      audioSrc: `/resources/it/sounds/it_man.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "il ragazzo",
                      audioSrc: `/resources/it/sounds/it_boy.mp3`,
                    },
                  ]);
                }
  
                if (challenge.order === 5) {
                  await db.insert(schema.challengeOptions).values([
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "l'uomo",
                      imageSrc: "/images/man.svg",
                      audioSrc: `/resources/it/sounds/it_man.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "la donna",
                      imageSrc: "/images/woman.svg",
                      audioSrc: `/resources/it/sounds/it_woman.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: true,
                      text: "lo zombie",
                      imageSrc: "/images/zombie.svg",
                      audioSrc: `/resources/it/sounds/it_zombie.mp3`,
                    },
                  ]);
                }
  
                if (challenge.order === 6) {
                  await db.insert(schema.challengeOptions).values([
                    {
                      challengeId: challenge.id,
                      correct: true,
                      text: "Il robot",
                      imageSrc: "/images/robot.svg",
                      audioSrc: `/resources/it/sounds/it_robot.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "lo zombie",
                      imageSrc: "/images/zombie.svg",
                      audioSrc: `/resources/it/sounds/it_zombie.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "il ragazzo",
                      imageSrc: "/images/boy.svg",
                      audioSrc: `/resources/it/sounds/it_boy.mp3`,
                    },
                  ]);
                }
  
                if (challenge.order === 7) {
                  await db.insert(schema.challengeOptions).values([
                    {
                      challengeId: challenge.id,
                      correct: true,
                      text: "la ragazza",
                      imageSrc: "/images/girl.svg",
                      audioSrc: `/resources/it/sounds/it_girl.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "lo zombie",
                      imageSrc: "/images/zombie.svg",
                      audioSrc: `/resources/it/sounds/it_zombie.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "l'uomo",
                      imageSrc: "/images/man.svg",
                      audioSrc: `/resources/it/sounds/it_man.mp3`,
                    },
                  ]);
                }
  
                if (challenge.order === 8) {
                  await db.insert(schema.challengeOptions).values([
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "la donna",
                      audioSrc: `/resources/it/sounds/it_woman.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: true,
                      text: "lo zombie",
                      audioSrc: `/resources/it/sounds/it_zombie.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "il ragazzo",
                      audioSrc: `/resources/it/sounds/it_boy.mp3`,
                    },
                  ]);
                }
                if (challenge.order === 9) {
                  await db.insert(schema.challengeOptions).values([
                    {
                      challengeId: challenge.id,
                      correct: true,
                      text: "il coniglio",
                      imageSrc: "/images/rabbit.png",
                      audioSrc: `/resources/it/sounds/it_rabbit.mp3`,
                    },
       
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "la scimmia",
                      imageSrc: "/images/monkey.png",
                      audioSrc: `/resources/it/sounds/it_monkey.mp3`,
                    },
                    {
                      challengeId: challenge.id,
                      correct: false,
                      text: "l'elefante",
                      imageSrc: "/images/elephant.png",
                      audioSrc: `/resources/it/sounds/it_elephant.mp3`,
                    },
                  ]);
                }
              }
            }

          
        
              }
      
            }
            console.log("===>Lessons inserted")  
              i++;
    console.log("===>Challenges and Options inserted")
    }
    await  client.end();
    console.log("________________________________________");
    console.log("  ");
    console.log("      Database seeded successfully     ");
    console.log("  ");
    return;
  } catch (error) {
    console.error(error);
    throw new Error("Error:Failed to seed database!");
  }
};

main();
