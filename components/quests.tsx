import Link from "next/link";
import { Button } from "./ui/button";
import { QUESTS } from "@/constants";
import { Progress } from "./ui/progress";
import { Zap } from "lucide-react";

export default function Quests({ points }: { points: number }) {
  const r = QUESTS.filter((quest) => quest.value >= points);
  return (
    <div className=" border-2 rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between w-full space-y-2">
        <h3 className="font-bold text-lg">Quests</h3>
        <Link href={"/quests"}>
          <Button variant={"primaryOutline"} size="sm">
            View all
          </Button>
        </Link>
      </div>
      <ul className="w-full space-y-4">
        {r.slice(0, 3).map((quest) => {
          const progress = (points / quest.value) * 100;
          return (
            <div
              key={quest.title}
              className="flex items-center w-full gap-x-3  pb-2"
            >
              <Zap
                className="mr-2 w-7 h-12 shrink-0 stroke-none"
                fill="rgb(249 115 22)"
              />
              <div className="flex flex-col w-full gap-y-2">
                <p className="text-neutral-700 text-sm font-bold">
                  {quest.title}
                </p>
                <Progress value={progress} className="h-2" />
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
