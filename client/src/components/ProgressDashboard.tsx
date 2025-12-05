import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, CheckCircle2, Clock, Flame } from "lucide-react";

interface ProgressDashboardProps {
  totalWatched: number;
  totalVideos: number;
  currentStreak: number;
}

export function ProgressDashboard({ totalWatched, totalVideos, currentStreak }: ProgressDashboardProps) {
  const percentage = Math.round((totalWatched / totalVideos) * 100);
  const remaining = totalVideos - totalWatched;

  return (
    <Card data-testid="card-progress-dashboard">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Your Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-muted"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${percentage * 2.51} 251`}
                className="text-primary transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold" data-testid="text-progress-percentage">{percentage}%</span>
            </div>
          </div>
          <Progress value={percentage} className="w-full h-2" data-testid="progress-bar" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-3 p-3 rounded-md bg-muted/50">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <div>
              <p className="text-2xl font-bold" data-testid="text-total-watched">{totalWatched}</p>
              <p className="text-xs text-muted-foreground">Watched</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 rounded-md bg-muted/50">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-2xl font-bold" data-testid="text-remaining">{remaining}</p>
              <p className="text-xs text-muted-foreground">Remaining</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-md bg-muted/50">
            <Flame className="h-5 w-5 text-orange-500 dark:text-orange-400" />
            <div>
              <p className="text-2xl font-bold" data-testid="text-streak">{currentStreak}</p>
              <p className="text-xs text-muted-foreground">Day Streak</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-md bg-muted/50">
            <BookOpen className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-2xl font-bold" data-testid="text-total-videos">{totalVideos}</p>
              <p className="text-xs text-muted-foreground">Total Days</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
