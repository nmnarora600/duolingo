import FeedWrapper from "@/components/FeedWrapper";
import StickyWrapper from "@/components/StickyWrapper";
import UserProgress from "@/components/UserProgress";
import Promo from "@/components/promo";
import { Progress } from "@/components/ui/progress";

import { QUESTS } from "@/constants";
import { getUserProgress, getUserSubscription } from "@/db/queries";
import { Zap } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

export default async function QuestsPage({}: Props) {
  const UserProgressData = await getUserProgress();
  const userSubscription = await getUserSubscription();

  if (!UserProgressData || !UserProgressData.activeCourse) {
    redirect("/courses");
  }

  const isPro = !!userSubscription?.isActive;
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourses={UserProgressData.activeCourse}
          hearts={UserProgressData.hearts}
          points={UserProgressData.points}
          hasActiveSubscription={isPro}
        />
        {!isPro && <Promo />}
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image src={"/images/quests.svg"} alt="quests" height={90} width={90} />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Quests
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            Complete Quests by earning points.
          </p>
          <ul className="w-full">
            {QUESTS.map((quest) => {
              const progress = (UserProgressData.points / quest.value) * 100;
              return (
                <div
                  key={quest.title}
                  className="flex items-center w-full gap-x-4 border-t-2 p-4"
                >
                  <Zap
                    className="mr-2 w-7 h-12 shrink-0 stroke-none"
                    fill="rgb(249 115 22)"
                  />
                  <div className="flex flex-col w-full gap-y-2">
                    <p className="text-neutral-700 text-xl font-bold">
                      {quest.title}
                    </p>
                    <Progress value={progress} className="h-3" />
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      </FeedWrapper>
    </div>
  );
}
