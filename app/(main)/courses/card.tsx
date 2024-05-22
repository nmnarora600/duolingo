import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {
  title: string;
  imageSrc: string;
  id: number;
  onClick: (id: number) => void;
  disabled?: Boolean;
  active?: Boolean;
};

export default function card({
  title,
  imageSrc,
  id,
  onClick,
  disabled,
  active,
}: Props) {
  return (
    <div
      onClick={() => onClick(id)}
      className={cn(
        "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-3 pb-6 lg:min-h-[217px] lg:min-w-[200px] min-h-[190px] min-w-[170px] ",
        disabled ? "pointer-events-none opacity-50" : ""
      )}
    >
      <div className="min-h-[24px] w-full flex items-center justify-end">
        {active && (
          <div className="rounded-md bg-green-600 flex items-center justify-center p-1.5">
            {" "}
            <Check className="text-white stroke-[4] h-4 w-4 " />{" "}
          </div>
        )}
      </div>
      <Image
        src={imageSrc}
        alt={title}
        height={70}
        width={93.33}
        className="rounded-lg drop-shadow-md border object-cover"
      />
      <p className="text-neutral-700 text-center  mt-3 font-extrabold">
        {title.slice(0, 1).toUpperCase() + title.slice(1)}
      </p>
    </div>
  );
}
