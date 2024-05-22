"use server";

import { MAX_HEARTS, POINTS_AWARDED} from "@/constants";
import  { connectionToPG } from "@/db/drizzle";
import { getUserProgress, getUserSubscription } from "@/db/queries";
import { challengeProgress, challenges, userProgress } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";


const getUserId = async () => {
  return new Promise<string | null>(async (resolve, reject) => {
    setTimeout(async() => {
      const { userId } = await auth();
    if (userId) resolve(userId);
    else {
      reject(null);
    }
    }, 200);
    
  });
};
export const upsertChallengeProgress = async (challengeId: number) => {
  try {
    const {db,client}= await connectionToPG();
    const {userId}= await auth();

    if (!userId) {client.end();throw new Error("Unauthorized")};

    const currentUserProgress = await getUserProgress();

    const userSubscription = await getUserSubscription();

    if (!currentUserProgress) {
      console.error(
        "User progress not found. Aborting challenge progress update."
      );
      client.end()
      throw new Error("User progress not found");
    }

    const challenge = await db.query.challenges.findFirst({
      where: eq(challenges.id, challengeId),
    });
    if (!challenge) {
      client.end()
      throw new Error("Challenge not found");
    }

    const lessonId = challenge.lessonId;

// undefined when user is playing for first time
    const existingChallengeProgress =
      await db.query.challengeProgress.findFirst({
        where: and(
          eq(challengeProgress.userId, userId),
          eq(challengeProgress.challengeId, challengeId)
        ),
      });

    const isPractice = !!existingChallengeProgress;

    // when not practice, non premium and no hearts
    if (
      currentUserProgress.hearts === 0 &&
      !isPractice &&
      !userSubscription?.isActive
    ) {
      client.end();
      return { error: "hearts" };
    }

    // increase hearts and points during practice
    if (isPractice) {
      await db
        .update(challengeProgress)
        .set({ completed: true })
        .where(eq(challengeProgress.id, existingChallengeProgress.id));

      await db
        .update(userProgress)
        .set({
          hearts: Math.min(currentUserProgress.hearts + 1, MAX_HEARTS),
          points: currentUserProgress.points +  POINTS_AWARDED,
        })
        .where(eq(userProgress.userId, userId));
      revalidatePath("/learn");
      revalidatePath("/lesson");
      revalidatePath("/quests");
      revalidatePath("/leaderboard");
      revalidatePath(`/learn/${lessonId}`);
      client.end()
      return;
    }
// when no practice
    await db.insert(challengeProgress).values({
      challengeId,
      userId,
      completed: true,
    });

    await db
      .update(userProgress)
      .set({ points: currentUserProgress.points + POINTS_AWARDED })
      .where(eq(userProgress.userId, userId));
    revalidatePath("/learn");
    revalidatePath("/lesson");
    revalidatePath("/quests");
    revalidatePath("/leaderboard");
    revalidatePath(`/learn/${lessonId}`);
    client.end();
    
  } catch (e) {
    console.log("error aagye",e);
  }
};
