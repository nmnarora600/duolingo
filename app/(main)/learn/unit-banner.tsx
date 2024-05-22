import { Button } from "@/components/ui/button";
import { NotebookText } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  description: string;
};

export default function UnitBanner({ title, description }: Props) {
  return (
    <div className="w-full rounded-xl  bg-owl text-white px-5 lg:py-4 py-2 items-center justify-between flex">
      <div className="space-y-2.5">
        <h4 className="text-2xl font-bold">{title}</h4>

        <p className="text-lg">{description}</p>
      </div>
      <Link href={"/lesson"} passHref>
        <Button
          size={"lg"}
          variant={"secondary"}
          className="hidden xl:flex border-2 border-b-4 active:border-b-2"
        >
          {" "}
          <NotebookText className="mr-2" /> Continue{" "}
        </Button>
      </Link>
    </div>
  );
}
