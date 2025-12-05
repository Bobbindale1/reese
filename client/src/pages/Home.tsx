import { useState, useEffect } from "react";
import { ModeToggle } from "@/components/ModeToggle";
import { VideoPlayer } from "@/components/VideoPlayer";
import { WatchButton } from "@/components/WatchButton";
import { DayNavigation } from "@/components/DayNavigation";
import { ProgressDashboard } from "@/components/ProgressDashboard";
import { VideoList } from "@/components/VideoList";
import { ThemeToggle } from "@/components/ThemeToggle";
import { getVideoByDay, getAllVideos, getDayOfYear, getDateForDay, formatDate } from "@/lib/videoData";
import { BookOpen } from "lucide-react";

type ViewMode = "calendar" | "dayNumber";

export default function Home() {
  const [mode, setMode] = useState<ViewMode>(() => {
    const stored = localStorage.getItem("viewMode");
    return (stored as ViewMode) || "calendar";
  });
  
  const [currentDay, setCurrentDay] = useState(() => {
    const stored = localStorage.getItem("currentDay");
    if (stored) return parseInt(stored);
    return mode === "calendar" ? getDayOfYear() : 1;
  });
  
  // todo: remove mock functionality - replace with server-side storage
  const [watchedDays, setWatchedDays] = useState<Set<number>>(() => {
    const stored = localStorage.getItem("watchedDays");
    if (stored) {
      return new Set(JSON.parse(stored));
    }
    return new Set();
  });

  useEffect(() => {
    localStorage.setItem("viewMode", mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem("currentDay", currentDay.toString());
  }, [currentDay]);

  useEffect(() => {
    localStorage.setItem("watchedDays", JSON.stringify(Array.from(watchedDays)));
  }, [watchedDays]);

  const handleModeChange = (newMode: ViewMode) => {
    setMode(newMode);
    if (newMode === "calendar") {
      setCurrentDay(getDayOfYear());
    }
  };

  const handleToggleWatched = () => {
    setWatchedDays(prev => {
      const newSet = new Set(prev);
      if (newSet.has(currentDay)) {
        newSet.delete(currentDay);
      } else {
        newSet.add(currentDay);
      }
      return newSet;
    });
  };

  const currentVideo = getVideoByDay(currentDay);
  const currentDate = getDateForDay(currentDay);
  const formattedDate = formatDate(currentDate);
  
  const allVideos = getAllVideos();
  const videoListItems = allVideos.slice(0, 50).map(v => ({
    dayNumber: v.dayNumber,
    title: v.title,
    isWatched: watchedDays.has(v.dayNumber),
    calendarDate: formatDate(getDateForDay(v.dayNumber)),
  }));

  // Calculate streak
  const calculateStreak = () => {
    let streak = 0;
    const today = getDayOfYear();
    for (let i = today; i >= 1; i--) {
      if (watchedDays.has(i)) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  if (!currentVideo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Video not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <h1 className="text-lg font-semibold" data-testid="text-app-title">Bible in a Year</h1>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <ModeToggle mode={mode} onModeChange={handleModeChange} />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[2fr,1fr] gap-8">
          <div className="space-y-6">
            <VideoPlayer
              dayNumber={currentDay}
              youtubeId={currentVideo.youtubeId}
              title={currentVideo.title}
              scriptureReference={currentVideo.scriptureReference}
              calendarDate={mode === "calendar" ? formattedDate : undefined}
            />
            
            <WatchButton
              isWatched={watchedDays.has(currentDay)}
              onToggle={handleToggleWatched}
            />
            
            <DayNavigation
              currentDay={currentDay}
              totalDays={365}
              mode={mode}
              onNavigate={setCurrentDay}
              currentDate={formattedDate}
            />
          </div>

          <div className="space-y-6">
            <ProgressDashboard
              totalWatched={watchedDays.size}
              totalVideos={365}
              currentStreak={calculateStreak()}
            />
            
            <div>
              <h3 className="text-sm font-medium mb-3 text-muted-foreground">Video History</h3>
              <VideoList
                videos={videoListItems}
                currentDay={currentDay}
                mode={mode}
                onSelectVideo={setCurrentDay}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
