import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Heart, InfinityIcon, Sparkles, Zap } from "lucide-react";
import { courses } from "@/db/schema";
type Props = {
  activeCourses: typeof courses.$inferSelect;
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

function UserProgress({
  activeCourses,
  hearts,
  points,
  hasActiveSubscription,
}: Props) {
  return (
    <div className="flex justify-between items-center gap-x-2 w-full">
      <Link href={"/courses"}>
        <Button variant={"ghost"}>
          <Image
            src={activeCourses.imageSrc}
            alt={activeCourses.title}
            className="rounded-md border"
            width={32}
            height={32}
          />
        </Button>
      </Link>
      <Link href={"/shop"}>
        <Button variant={"ghost"} className="text-orange-500">
          <Zap className="mr-2 w-6 h-8 stroke-[2]" fill="rgb(249 115 22)" />
          {points}
        </Button>
      </Link>
      <Link href={"/shop"}>
        <Button variant={"ghost"} className="text-rose-500">
          <Heart
            className="border-rose-500 h-6 w-6 mr-2"
            fill="rgb(244 63 94)"
          />
          {hasActiveSubscription ? (
            <InfinityIcon className="h-4 w-4 stroke-[3]" />
          ) : (
            hearts
          )}
        </Button>
      </Link>
    </div>
  );
}

export default UserProgress;
