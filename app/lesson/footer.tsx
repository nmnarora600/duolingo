import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useKey, useMedia } from "react-use";

type Props = {
  disabled?: boolean;
  lessonId?: number;
  onCheck: () => void;
  status: "correct" | "wrong" | "none" | "completed";
};

export default function Footer({ disabled, lessonId, onCheck, status }: Props) {
  const router = useRouter();
  useKey("Enter", onCheck, {}, [onCheck]);
  const isMobile = useMedia("(max-width:1024px)");
  return (
    <footer
      className={cn(
        "lg:h-[110px] absolute bottom-0 w-full h-[100px] border-t-2",
        status === "correct" && "border-transparent bg-green-100",
        status === "wrong" && "border-transparent bg-rose-100"
      )}
    >
      <div className="max-w-[1140px] h-full mx-auto flex justify-between items-center px-6 lg:px-10">
        {status === "correct" && (
          <div className="text-owl font-bold text-base lg:text-2xl flex items-center">
            <CheckCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4" /> Nicely
            Done!
          </div>
        )}
        {status === "wrong" && (
          <div className="text-rose-500 font-bold text-base lg:text-2xl flex items-center">
            <XCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4" /> Try Again!
          </div>
        )}
        {status === "completed" && (
          <Button
            variant={"default"}
            size={ "lg"}
            onClick={() => router.push(`lesson/${lessonId}`)}
          >
            Practice Again
          </Button>
        )}
        <Button
          className="ml-auto w-28"
          disabled={disabled}
          onClick={onCheck}
          size={ "lg"}

          variant={status === "wrong" ? "danger" : "secondary"}
        >
          {status === "none" && "Check"}
          {status === "correct" && "Next"}
          {status === "wrong" && "Retry"}
          {status === "completed" && "Continue"}
        </Button>
      </div>
    </footer>
  );
}
