import Image from "next/image";
import React from "react";

type Props = {
  question: string;
};

// when duo asks in bubble during assist mode
export default function QuestionBubble({ question }: Props) {
  return (
    <div className="flex items-center gap-x-4 mb-6  ">
      <Image
        src="/images/mascot.png"
        alt="mascot"
        height={100}
        width={100}
        className="hidden lg:block"
      />
      <Image
        src="/images/mascot.png"
        alt="mascot"
        height={60}
        width={60}
        className="block lg:hidden"
      />
      <div className="-left-24 relative">
        <div className="py-2 px-4 left-24 relative rounded-xl border-2 text-sm lg:text-base">
          {question}
          <div className="absolute -left-3 top-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8  transform -translate-y-1/2 rotate-90 " />
        </div>
      </div>
    </div>
  );
}
