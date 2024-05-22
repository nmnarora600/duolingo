import { cn } from "@/lib/utils";
import { Heart, Zap } from "lucide-react";
import React from "react";

type Props = {
  value: number;
  variant: "points" | "hearts";
};

//table to show when lesson completes
export default function ResultCard({ value, variant }: Props) {
  return (
    <div
      className={cn(
        "rounded-xl border-2 w-full",
        variant === "points" && "bg-orange-400 border-orange-400",
        variant === "hearts" && "bg-rose-400 border-rose-400"
      )}
    >
      <div
        className={cn(
          "p-1.5 text-white rounded-t-xl font-bold text-center uppercase text-xs",
          variant === "hearts" && "bg-rose-500",
          variant === "points" && "bg-orange-400"
        )}
      >
        {variant === "hearts" ? "Hearts Left" : "Total XP"}
      </div>
      <div
        className={cn(
          "rounded-2xl bg-white items-center justify-center flex p-6 font-bold text-lg",
          variant === "hearts" && "text-rose-500",
          variant === "points" && "text-orange-400"
        )}
      >
        {variant === "hearts" ? (
          <Heart
            className="border-rose-500 h-6 w-6 mr-2"
            fill="rgb(244 63 94)"
          />
        ) : (
          <Zap className="mr-2 w-6 h-8 stroke-[2]" fill="rgb(249 115 22)" />
        )}{" "}
        {value}
      </div>
    </div>
  );
}
