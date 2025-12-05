import { useState } from "react";
import { WatchButton } from "../WatchButton";

export default function WatchButtonExample() {
  const [isWatched, setIsWatched] = useState(false);
  
  return (
    <div className="max-w-xs">
      <WatchButton isWatched={isWatched} onToggle={() => setIsWatched(!isWatched)} />
    </div>
  );
}
