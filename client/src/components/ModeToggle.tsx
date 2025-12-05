import { Calendar, Hash } from "lucide-react";

type ViewMode = "calendar" | "dayNumber";

interface ModeToggleProps {
  mode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
}

export function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <div className="inline-flex items-center rounded-md bg-muted p-1" data-testid="mode-toggle">
      <button
        onClick={() => onModeChange("calendar")}
        className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
          mode === "calendar"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover-elevate"
        }`}
        data-testid="button-calendar-mode"
      >
        <Calendar className="h-4 w-4" />
        Calendar Mode
      </button>
      <button
        onClick={() => onModeChange("dayNumber")}
        className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
          mode === "dayNumber"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover-elevate"
        }`}
        data-testid="button-day-number-mode"
      >
        <Hash className="h-4 w-4" />
        Day Number Mode
      </button>
    </div>
  );
}
