import { Check } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface VideoItem {
  dayNumber: number;
  title: string;
  isWatched: boolean;
  calendarDate?: string;
}

interface VideoListProps {
  videos: VideoItem[];
  currentDay: number;
  mode: "calendar" | "dayNumber";
  onSelectVideo: (dayNumber: number) => void;
}

export function VideoList({ videos, currentDay, mode, onSelectVideo }: VideoListProps) {
  return (
    <ScrollArea className="h-80 rounded-md border" data-testid="scroll-video-list">
      <div className="p-2 space-y-1">
        {videos.map((video) => (
          <button
            key={video.dayNumber}
            onClick={() => onSelectVideo(video.dayNumber)}
            className={`w-full flex items-center gap-3 p-3 rounded-md text-left transition-colors hover-elevate active-elevate-2 ${
              currentDay === video.dayNumber
                ? "bg-accent"
                : ""
            }`}
            data-testid={`button-video-item-${video.dayNumber}`}
          >
            <div
              className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                video.isWatched
                  ? "bg-primary text-primary-foreground"
                  : "border-2 border-muted-foreground/30"
              }`}
            >
              {video.isWatched && <Check className="h-3 w-3" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                Day {video.dayNumber}: {video.title}
              </p>
              {mode === "calendar" && video.calendarDate && (
                <p className="text-xs text-muted-foreground">{video.calendarDate}</p>
              )}
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}
