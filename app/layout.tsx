import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { ExitModal } from "@/components/modal/exit-modal";
import { HeartsModal } from "@/components/modal/hearts-modal";
import { PracticeModal } from "@/components/modal/practice-modal";
const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Duolingo Clone",
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_APP_URL}`),
  description:
    "This is an unofficial clone of Duolingo, created primarily using Next.js 14 and TypeScript. This project is not affiliated with, endorsed, or sponsored by Duolingo. All logos, characters, and trademarks used on this site are the property of their respective owners and are used for educational and illustrative purposes only.",
    icons: {
      icon: `${process.env.DUO_FAVICON_IMAGE}`, // Path to your icon file
      shortcut: `${process.env.DUO_FAVICON_IMAGE}`, // Path to your icon file
      apple: `${process.env.DUO_FAVICON_IMAGE}`, // Path to the Apple touch icon file
    },
  openGraph: {
    images: [
      {
        url: `${process.env.META_IMAGE}`,
        width: 1200,
        height: 630,
      },
      {
        url: `${process.env.META_IMAGE}`,
        width: 1200,
        height: 630,
      },
    ],
    title: "Duolingo Clone",
    url: `${process.env.NEXT_PUBLIC_APP_URL}`,
  },
  twitter: {
    card: "summary_large_image",
    images: {
      url: `${process.env.META_IMAGE}`,
    },
  },
  creator: "Naman Arora",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        signIn: {
          variables: {
            colorPrimary: "rgb(88,204,2)",
          },
        },
        signUp: {
          variables: {
            colorPrimary: "rgb(88,204,2)",
          },
        },
      }}
    >
      <html lang="en">
        <body className={font.className}>
          {children}
          <Toaster position="bottom-center" />
          <ExitModal />
          <HeartsModal />
          <PracticeModal />
        </body>
      </html>
    </ClerkProvider>
  );
}
