"use client";

import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Promo() {
  return (
    <div className=" border-2 rounded-xl p-4 space-y-4">
      <div className="space-y-2">
        <div className="flex gap-x-2 items-center">
          <Image src={"/images/unlimited.svg"} alt="pro" height={26} width={26} />
          <h3 className="font-bold text-lg">Upgrade to Pro</h3>
        </div>
        <p className="text-muted-foreground"> Get unlimied hearts and more!</p>
      </div>
      <Button variant={"super"} asChild className="w-full" size="lg">
        <Link href={"/shop"}>Upgrade today</Link>
      </Button>
    </div>
  );
}
