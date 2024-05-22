"use client";
import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Header() {
  return (
    <header className="h-20 w-full  px-4">
      <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
        <div className="pt-3 pl-2 pb-7 flex items-center justify-center md:w-1/4 w-full">
          <Image src={"/images/mascot.svg"} width={180} height={100} alt="mascot" />
        </div>
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton
              mode="modal"
              signUpForceRedirectUrl={"/learn"}
              forceRedirectUrl={"/learn"}
            >
              <Button size={"lg"} variant={"ghost"} className="md:block hidden">
                Log In
              </Button>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </header>
  );
}
