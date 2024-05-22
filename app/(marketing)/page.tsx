"use client";
import { Button } from "@/components/ui/button";
import { SignedIn } from "@clerk/clerk-react";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedOut,
  SignUpButton,
  SignInButton,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
      <div className="relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] lg:mb-0 mb-8 ">
        <Image src="/images/intro.gif" width={800} height={400} alt="Hero" unoptimized/>
      </div>

      <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-xl lg:text-3xl font-bold text-[rgb(75,75,75)] max-w-[480px] text-center">
          Learn, practice and master new languages with Duolingo
        </h1>
        <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
          <ClerkLoading>
            <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignUpButton
                mode="modal"
                forceRedirectUrl={"/learn"}
                signInForceRedirectUrl={"/learn"}
                
              >
                <Button size={"lg"} variant={"secondary"} className="w-full">
                  Get Started
                </Button>
              </SignUpButton>
              <SignInButton mode="modal" forceRedirectUrl={"/learn"}>
                <Button
                  size={"lg"}
                  variant={"defaultOutline"}
                  className="w-full font-bold"
                >
                  I already have an Account
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button
                size={"lg"}
                variant={"secondary"}
                className="w-full"
                asChild
              >
                <Link href={"/learn"}>Continue Learning</Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
}
