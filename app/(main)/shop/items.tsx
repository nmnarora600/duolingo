"use client";
import { RefillHearts } from "@/actions/user-progress";
import { createStripeUrl } from "@/actions/user-subscription";
import { Button } from "@/components/ui/button";
import { MAX_HEARTS, POINTS_TO_REFILL } from "@/constants";
import { Heart, Zap } from "lucide-react";
import Image from "next/image";
import React, { useTransition } from "react";
import { toast } from "sonner";

type Props = {
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

export default function Items({
  hearts,
  points,
  hasActiveSubscription,
}: Props) {
  const [pending, startTransition] = useTransition();

  const onRefillHearts = () => {
    if (pending || hearts === MAX_HEARTS || points < POINTS_TO_REFILL) return;
    startTransition(() => {
      RefillHearts().catch(() => toast.error("Something went wrong"));
    });
  };

  const onUpgrade = () => {
    startTransition(() => {
      createStripeUrl()
        .then((response) => {
          if (response.data) {
            window.location.href = response.data;
          }
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };
  return (
    <ul className="w-full ">
      <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
        <Heart
          className="border-rose-500 h-10 w-10 stroke-rose-500"
          fill="rgb(244 63 94)"
        />
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            Refill Hearts
          </p>
        </div>
        <Button
          disabled={pending || hearts === MAX_HEARTS || points < POINTS_TO_REFILL}
          onClick={onRefillHearts}
        >
          {hearts === MAX_HEARTS ? (
            "full"
          ) : (
            <div className="flex items-center justify-center">
              <Zap
                className=" w-5 h-7 stroke-none mr-2"
                fill="rgb(249 115 22)"
              />
              <p>{POINTS_TO_REFILL}</p>
            </div>
          )}
        </Button>
      </div>
      <div className="flex items-center w-full p-4 pt-8 gap-x-4 border-t-2">
        <Image src={"/images/unlimited.svg"} alt="unlimited" height={45} width={45} />
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            Unlimited hearts
          </p>
        </div>

        <Button disabled={pending} onClick={onUpgrade}>
          {hasActiveSubscription ? "manage" : "upgrade"}
        </Button>
      </div>
    </ul>
  );
}
