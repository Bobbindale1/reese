import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface DayNavigationProps {
  currentDay: number;
  totalDays: number;
  mode: "calendar" | "dayNumber";
  onNavigate: (day: number) => void;
  currentDate?: string;
}

export function DayNavigation({ currentDay, totalDays, mode, onNavigate, currentDate }: DayNavigationProps) {
  const [jumpToValue, setJumpToValue] = useState("");

  const handlePrevious = () => {
    if (currentDay > 1) {
      onNavigate(currentDay - 1);
    }
  };

  const handleNext = () => {
    if (currentDay < totalDays) {
      onNavigate(currentDay + 1);
    }
  };

  const handleJumpTo = () => {
    const day = parseInt(jumpToValue);
    if (day >= 1 && day <= totalDays) {
      onNavigate(day);
      setJumpToValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleJumpTo();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentDay <= 1}
          data-testid="button-previous-day"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>
        
        <div className="text-center">
          <p className="text-sm font-medium" data-testid="text-current-position">
            Day {currentDay} of {totalDays}
          </p>
          {mode === "calendar" && currentDate && (
            <p className="text-xs text-muted-foreground">{currentDate}</p>
          )}
        </div>
        
        <Button
          variant="outline"
          onClick={handleNext}
          disabled={currentDay >= totalDays}
          data-testid="button-next-day"
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Input
          type="number"
          min={1}
          max={totalDays}
          placeholder={mode === "calendar" ? "Jump to day..." : "Enter day number..."}
          value={jumpToValue}
          onChange={(e) => setJumpToValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1"
          data-testid="input-jump-to-day"
        />
        <Button onClick={handleJumpTo} variant="secondary" data-testid="button-jump-to">
          Go
        </Button>
      </div>
    </div>
  );
}
