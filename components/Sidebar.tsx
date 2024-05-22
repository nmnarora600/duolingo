import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SidebarItems from "./SidebarItems";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { MENU_ITEMS } from "@/constants";
type Props = {
  className?: string;
};

export default function Sidebar({ className }: Props) {
  const menuItems=MENU_ITEMS;
  return (
    <div
      className={cn(
        "  lg:w-[256px] lg:fixed flex h-screen px-4 border-r-2 flex-col",
        className
      )}
    >
      <Link href={"/learn"}>
        <div className="pt-3 pl-2 pb-7 flex items-center justify-start w-full">
          <Image src={"/images/mascot.svg"} width={180} height={100} alt="mascot" />
        </div>
      </Link>

      <div className="flex flex-col gap-y-2 flex-1">
        {menuItems.map((item) => (
          <SidebarItems
            key={item.label}
            label={item.label}
            href={item.href}
            iconSrc={item.iconSrc}
          />
        ))}
      </div>
      <div className="p-4">
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton afterSignOutUrl="/" />
        </ClerkLoaded>
      </div>
    </div>
  );
}
