import { ProgressDashboard } from "../ProgressDashboard";

export default function ProgressDashboardExample() {
  return (
    <div className="max-w-sm">
      <ProgressDashboard
        totalWatched={42}
        totalVideos={365}
        currentStreak={7}
      />
    </div>
  );
}
