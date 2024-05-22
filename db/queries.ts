import { cache } from "react";
import  { connectionToPG } from "./drizzle";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import {
  challengeProgress,
  courses,
  lessons,
  units,
  userProgress,
  userSubscription,
} from "@/db/schema";
import { DAY_IN_MS, TOP_COUNTS } from "@/constants";




export const getCourses = cache(async () => {
  
   const {db,client}= await connectionToPG();
  if(!db){
    return;
  }
  try{
    const data = await db.query.courses.findMany();
    await  client.end()
    return data;
  }
  finally{
    await client.end();
  }
});

export const getUserProgress = cache(async () => {
  
   const {db,client}= await connectionToPG();
   try{
    if(!db){
      return;
    }
    const {userId} = auth();
  
    if (!userId) {
      return null;
    }
    const data = await db.query.userProgress.findFirst({
      where: eq(userProgress.userId, userId),
      with: {
        activeCourse: true,
      },
    });
    await  client.end()
    return data;
   }
   finally{
    await client.end()
   }
  
});

export const getCourseById = cache(async (courseId: number) => {
  
  const {db,client}= await connectionToPG();
  try{
    if(!db){
      return;
    }
    const data = await db.query.courses.findFirst({
      where: eq(courses.id, courseId),
      with: {
        units: {
          orderBy: (units, { asc }) => [asc(units.order)],
          with: {
            lessons: {
              orderBy: (lessons, { asc }) => [asc(lessons.order)],
            },
          },
        },
      },
    });
    await  client.end()
    return data;
  }
  finally{
    await client.end()
  }
});

export const getUnits = cache(async () => {
  
   const {db,client}= await connectionToPG();
   try{
    if(!db){
      return;
    }
    const {userId} = auth();
    const userProgress = await getUserProgress();
    if (!userId || !userProgress || !userProgress.activeCourseId) return [];
  
    const data = await db.query.units.findMany({
      orderBy: (units, { asc }) => [asc(units.order)],
      where: eq(units.courseId, userProgress.activeCourseId),
      with: {
        lessons: {
          orderBy: (lessons, { asc }) => [asc(lessons.order)],
          with: {
            challenges: {
              orderBy: (challenges, { asc }) => [asc(challenges.order)],
              with: {
                challengeProgress: {
                  where: eq(challengeProgress.userId, userId),
                },
              },
            },
          },
        },
      },
    });
  
    const normalizedData = data.map((unit) => {
      //for each unit
      const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
        //in each lesson
        if (lesson.challenges.length === 0)
          return { ...lesson, completed: false };
        const allCompletedChallenges = lesson.challenges.every((challenge) => {
          //whether completed every challenge
          return (
            challenge.challengeProgress &&
            challenge.challengeProgress.length > 0 &&
            challenge.challengeProgress.every((progress) => progress.completed)
          );
        });
        
        return { ...lesson, completed: allCompletedChallenges };
      });
    
      return { ...unit, lessons: lessonsWithCompletedStatus };
    });
    await  client.end()
    return normalizedData;
   }
   finally{
    await client.end()
   }
  
});

export const getCourseProgress = cache(async () => {
 
   const {db,client}= await connectionToPG();
   try{
    if(!db){
      return;
    }
    const {userId} = auth();
    const userProgress = await getUserProgress();
    if (!userId || !userProgress?.activeCourseId) return null;
    const unitsInactiveCourse = await db.query.units.findMany({
      orderBy: (units, { asc }) => [asc(units.order)],
      where: eq(units.courseId, userProgress.activeCourseId),
      with: {
        lessons: {
          orderBy: (lessons, { asc }) => [asc(lessons.order)],
          with: {
            unit: true,
            challenges: {
              with: {
                challengeProgress: {
                  where: eq(challengeProgress.userId, userId),
                },
              },
            },
          },
        },
      },
    });
  
    const firstUncompletedLesson = unitsInactiveCourse
      .flatMap((unit) => unit.lessons)
      .find((lesson) =>
        lesson.challenges.some(
          (challenge) =>
            !challenge.challengeProgress ||
            challenge.challengeProgress.length === 0 ||
            challenge.challengeProgress.some(
              (progress) => progress.completed === false
            )
        )
      );
      await  client.end()
    return {
      activeLesson: firstUncompletedLesson,
      activeLessonId: firstUncompletedLesson?.id,
    };
   }
  finally{
    await client.end()
  }
});

export const getLesson = cache(async (id?: number) => {
 
   const {db,client}= await connectionToPG();
   try{
    if(!db){
      return;
    }
    const {userId} = auth();
    if (!userId) {
      return null;
    }
    const CourseProgress = await getCourseProgress();
  
    const lessonId = id || CourseProgress?.activeLessonId;
    if (!lessonId) return null;
  
    const data = await db.query.lessons.findFirst({
      where: eq(lessons.id, lessonId),
      with: {
        challenges: {
          orderBy: (challenges, { asc }) => [asc(challenges.order)],
          with: {
            challengeOptions: true,
            challengeProgress: {
              where: eq(challengeProgress.userId, userId),
            },
          },
        },
      },
    });
    if (!data || !data.challenges) {await  client.end();return null};
    const normalizedChallenges = data.challenges.map((challenge) => {
      const completed =
        challenge.challengeProgress &&
        challenge.challengeProgress.length > 0 &&
        challenge.challengeProgress.every((progress) => progress.completed);
      return {
        ...challenge,
        completed,
      };
    });
    await  client.end()
    return { ...data, challenges: normalizedChallenges };
   }
   finally{
    await client.end()
   }
  
});

export const getLessonPercentage = cache(async () => {
  
  
  const courseProgress = await getCourseProgress();
  if (!courseProgress?.activeLessonId) return 0;
  const lesson = await getLesson(courseProgress.activeLessonId);

  if (!lesson) return 0;

  const CompletedChallenges = lesson.challenges.filter(
    (challenge) => challenge.completed
  );

  const percentage = Math.round(
    (CompletedChallenges.length / lesson.challenges.length) * 100
  );

  return percentage;
});


export const getUserSubscription = cache(async () => {
 
   const {db,client}= await connectionToPG();
   try{
    if(!db){
      return;
    }
    const {userId} = auth();
    if (!userId) return null;
  
    const data = await db.query.userSubscription.findFirst({
      where: eq(userSubscription.userId, userId),
    });
    if (!data) return null;
  
    const isActive =
      data.stripePriceId &&
      data.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();
      await  client.end()
    return { ...data, isActive: !!isActive };
   }
   finally{
    await client.end()
   }
  
});

export const getTopUsers = cache(async () => {
 
   const {db,client}= await connectionToPG();
   try{
    if(!db){
      return;
    }
    const {userId} = auth();
    if (!userId) return [];
    const data = await db.query.userProgress.findMany({
      orderBy: (userProgress, { desc }) => [desc(userProgress.points)],
      limit: TOP_COUNTS,
      columns: {
        userId: true,
        userName: true,
        userImageSrc: true,
        points: true,
      },
    });
    await  client.end()
    return data;
   }
  finally{
    await client.end()
  }
});
