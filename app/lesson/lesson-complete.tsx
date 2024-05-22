import React from "react";
import ResultCard from "./result-card";
import Image from "next/image";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import Footer from "./footer";
import { useRouter } from "next/navigation";

type Props = {
  hearts: number;
  points: number;
  lessonId: number;
};

//last page with confetti when lesson completes
export default function LessonComplete({ hearts, points, lessonId }: Props) {
  const { width, height } = useWindowSize();
  const router = useRouter();
  return (
    <>
      <Confetti
        recycle={false}
        numberOfPieces={500}
        tweenDuration={500}
        width={width}
        height={height}
      />

      <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-screen">
        <Image
          src={"/images/finish_duo.svg"}
          className="hidden lg:block"
          height={150}
          width={150}
          alt="finish"
        />
        <Image
          src={"/images/finish_duo.svg"}
          className="lg:hidden block"
          height={100}
          width={100}
          alt="finish"
        />
        <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
          Great Job! <br /> You&apos;ve completed the lesson.
        </h1>
        <div className="flex items-center gap-x-4 w-full">
          <ResultCard variant="points" value={points} />
          <ResultCard variant="hearts" value={hearts} />
        </div>
      </div>
      <Footer
        lessonId={lessonId}
        status="completed"
        onCheck={() => {
          router.push("/learn");
        }}
      />
    </>
  );
}
