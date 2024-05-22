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
import { useExitModal } from "@/store/use-exit-modal";

export const ExitModal = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = useExitModal();

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) return null;

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className={"max-w-md scale-95 md:scale-100 rounded-xl"}>
        <DialogHeader className="flex items-center w-full justify-center mb-5">
          <div>
            <Image
              src={"/images/duo-sad.png"}
              alt="sad mascot"
              width={100}
              height={80}
            />
          </div>
        </DialogHeader>
        <DialogTitle className="text-center font-bold text-2xl">
          Wait, don&apos;t go..!
        </DialogTitle>
        <DialogDescription className="text-center text-base">
          You are about to leave the lesson, Are you sure?
        </DialogDescription>
        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            <Button
              variant={"primary"}
              size={"lg"}
              className="w-full"
              onClick={close}
            >
              Keep Learning
            </Button>
            <Button
              variant={"dangerOutline"}
              size={"lg"}
              className="w-full"
              onClick={() => {
                close();
                router.push("/learn");
              }}
            >
              End Session
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
