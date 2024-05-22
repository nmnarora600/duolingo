import { getLesson, getUserProgress, getUserSubscription } from "@/db/queries";
import { redirect } from "next/navigation";
import React from "react";
import Quiz from "../quiz";

type Props = {
  params: {
    lessonId: number;
  };
};

export default async function LessonIdPage({ params }: Props) {
  const lesson = await getLesson(params.lessonId);
  const userProgress = await getUserProgress();
  let userSubscription = await getUserSubscription();
  if (!lesson || !userProgress) redirect("/learn");
if(userSubscription===undefined) userSubscription=null;
  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100;
  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
      userSubscription={userSubscription}
    />
  );
}
