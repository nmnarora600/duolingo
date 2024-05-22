import FeedWrapper from "@/components/FeedWrapper";
import StickyWrapper from "@/components/StickyWrapper";
import UserProgress from "@/components/UserProgress";
import Promo from "@/components/promo";
import Quests from "@/components/quests";
import { getUserProgress, getUserSubscription } from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import Items from "./items";

type Props = {};

export default async function ShopPage({}: Props) {
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
        <Quests points={UserProgressData.points} />
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image src={"/images/shop.svg"} alt="shop" height={90} width={90} />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Shop
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            Spend your points on cool stuff
          </p>

          <Items
            hearts={UserProgressData.hearts}
            points={UserProgressData.points}
            hasActiveSubscription={isPro}
          />
        </div>
      </FeedWrapper>
    </div>
  );
}
