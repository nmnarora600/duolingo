"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { usePracticeModal } from "@/store/use-practice-modal";
import { Heart } from "lucide-react";

export const PracticeModal = () => {
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = usePracticeModal();

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) return null;

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className={"max-w-md scale-95 md:scale-100 rounded-xl"}>
        <DialogHeader className="flex items-center w-full justify-center mb-2">
          <div className="flex justify-center items-center">
            <Heart
              className="border-rose-500 h-28 w-28 stroke-none"
              fill="rgb(244 63 94)"
            />
          </div>
        </DialogHeader>
        <DialogTitle className="text-center font-bold text-2xl">
          Practice Lesson
        </DialogTitle>
        <DialogDescription className="text-center text-base">
          Use practice lessons to regain hearts and points. You cannot loose
          hearts or points in practice lessons.
        </DialogDescription>
        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            <Button
              variant={"primary"}
              size={"lg"}
              className="w-full"
              onClick={close}
            >
              I understand
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
