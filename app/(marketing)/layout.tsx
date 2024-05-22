import React from "react";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
  children: React.ReactNode;
};

function MarketLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default MarketLayout;
