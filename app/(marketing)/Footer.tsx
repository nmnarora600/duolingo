import { Button } from "@/components/ui/button";
import { FOOTER_LANGUAGES } from "@/constants";
import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        {FOOTER_LANGUAGES.map((item) => (
          <Button
            key={item.name}
            size={"lg"}
            variant={"ghost"}
            className="w-full"
          >
            <Image
              src={item.source}
              alt={item.name}
              width={40}
              height={32}
              className="mr-4 rounded-md"
            />
            {item.name}
          </Button>
        ))}
      </div>
    </footer>
  );
}
