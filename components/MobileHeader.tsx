import React from "react";
import MobileSidebar from "./MobileSidebar";

export default function MobileHeader() {
  return (
    <nav className="lg:hidden px-6 h-[50px] flex items-center bg-owl border-b fixed top-0 w-full z-50">
      <MobileSidebar />
    </nav>
  );
}
