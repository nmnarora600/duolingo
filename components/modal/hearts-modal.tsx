"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useHeartsModal } from "@/store/use-hearts-modal";

export const HeartsModal = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = useHeartsModal();

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) return null;

  const onClick = () => {
    close();
    router.push("/shop");
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className={"max-w-md scale-90 md:scale-100 rounded-xl"}>
        <DialogHeader className="flex items-center w-full justify-center mb-5">
          <div>
            <Image
              src={"/images/duo-noheart.png"}
              alt="noheart mascot"
              width={120}
              height={100}
            />
          </div>
        </DialogHeader>
        <DialogTitle className="text-center font-bold text-2xl">
          You ran out of hearts
        </DialogTitle>
        <DialogDescription className="text-center text-base">
          Get Pro for unlimited hearts, or purchase them in store.
        </DialogDescription>
        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            <Button
              variant={"primary"}
              size={"lg"}
              className="w-full"
              onClick={onClick}
            >
              Get unlimited hearts
            </Button>
            <Button
              variant={"primaryOutline"}
              size={"lg"}
              className="w-full"
              onClick={close}
            >
              No thanks
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
