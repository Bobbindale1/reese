import { Check, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WatchButtonProps {
  isWatched: boolean;
  onToggle: () => void;
}

export function WatchButton({ isWatched, onToggle }: WatchButtonProps) {
  return (
    <Button
      onClick={onToggle}
      variant={isWatched ? "secondary" : "default"}
      className="w-full gap-2"
      data-testid="button-mark-watched"
    >
      {isWatched ? (
        <>
          <Check className="h-4 w-4" />
          Watched
        </>
      ) : (
        <>
          <Circle className="h-4 w-4" />
          Mark as Watched
        </>
      )}
    </Button>
  );
}
