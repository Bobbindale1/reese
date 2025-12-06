import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ModeToggle } from "@/components/ModeToggle";
import { VideoPlayer } from "@/components/VideoPlayer";
import { WatchButton } from "@/components/WatchButton";
import { DayNavigation } from "@/components/DayNavigation";
import { ProgressDashboard } from "@/components/ProgressDashboard";
import { VideoList } from "@/components/VideoList";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BibleVideo, fetchVideos, getVideoByDay, getDayOfYear, getDateForDay, formatDate } from "@/lib/videoData";
import { BookOpen, Loader2 } from "lucide-react";

type ViewMode = "calendar" | "dayNumber";

export default function Home() {
  const { data: videos, isLoading, error } = useQuery<BibleVideo[]>({
    queryKey: ["/api/videos"],
  });

  const [mode, setMode] = useState<ViewMode>(() => {
    const stored = localStorage.getItem("viewMode");
    return (stored as ViewMode) || "calendar";
  });
  
  const [currentDay, setCurrentDay] = useState(() => {
    const stored = localStorage.getItem("currentDay");
    if (stored) return parseInt(stored);
    return mode === "calendar" ? getDayOfYear() : 1;
  });
  
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground" data-testid="text-loading">Loading Bible reading videos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-destructive mb-2" data-testid="text-error">Error loading videos</p>
          <p className="text-muted-foreground text-sm">Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  const currentVideo = videos ? getVideoByDay(videos, currentDay) : undefined;
  const currentDate = getDateForDay(currentDay);
  const formattedDate = formatDate(currentDate);
  
  const videoListItems = (videos || []).slice(0, 50).map(v => ({
    dayNumber: v.dayNumber,
    title: v.title,
    isWatched: watchedDays.has(v.dayNumber),
    calendarDate: formatDate(getDateForDay(v.dayNumber)),
  }));

  if (!currentVideo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground" data-testid="text-not-found">Video not found for day {currentDay}</p>
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
              totalDays={videos?.length || 365}
              mode={mode}
              onNavigate={setCurrentDay}
              currentDate={formattedDate}
            />
          </div>

          <div className="space-y-6">
            <ProgressDashboard
              totalWatched={watchedDays.size}
              totalVideos={videos?.length || 365}
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
