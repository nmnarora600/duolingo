import { getLesson, getUserProgress, getUserSubscription } from "@/db/queries";
import { redirect } from "next/navigation";
import React from "react";
import Quiz from "./quiz";

type Props = {};

export default async function LessonPage({}: Props) {
  //get latest lesson
  const lesson = await getLesson();
  const userProgress = await getUserProgress();
  if (!lesson || !userProgress) redirect("/learn");
  let userSubscription = await getUserSubscription();
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
