import FeedWrapper from "@/components/FeedWrapper";
import StickyWrapper from "@/components/StickyWrapper";
import UserProgress from "@/components/UserProgress";
import Promo from "@/components/promo";
import Quests from "@/components/quests";
import { Header } from "./Header";
import Unit from "./unit";
import {
  getCourseProgress,
  getLessonPercentage,
  getUnits,
  getUserProgress,
  getUserSubscription,
} from "@/db/queries";
import { redirect } from "next/navigation";
import React from "react";

async function Learn() {
  const userProgress = await getUserProgress();
  const units = await getUnits();
  const courseProgress = await getCourseProgress();
  const lessonPercentage = await getLessonPercentage();

  if (!userProgress || !userProgress.activeCourse) redirect("/courses");

  if (!courseProgress) {
    redirect("/courses");
  }
  if(!units) redirect('/')
  const userSubscription = await getUserSubscription();
  const isPro = !!userSubscription?.isActive;
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          hasActiveSubscription={isPro}
          hearts={userProgress.hearts}
          activeCourses={userProgress.activeCourse}
          points={userProgress.points}
        />
        {!isPro && <Promo />}
        <Quests points={userProgress.points} />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        {units.map((unit) => (
          <div key={unit.id} className="mb-10">
            <Unit
              id={unit.id}
              order={unit.order}
              description={unit.description}
              title={unit.title}
              lessons={unit.lessons}
              activeLesson={courseProgress?.activeLesson}
              activeLessonPercentage={lessonPercentage}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
}

export default Learn;
