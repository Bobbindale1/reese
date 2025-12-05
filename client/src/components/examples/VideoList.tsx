import { useState } from "react";
import { VideoList } from "../VideoList";

export default function VideoListExample() {
  const [currentDay, setCurrentDay] = useState(3);
  
  // todo: remove mock functionality
  const mockVideos = [
    { dayNumber: 1, title: "In the Beginning", isWatched: true, calendarDate: "January 1" },
    { dayNumber: 2, title: "The Fall of Man", isWatched: true, calendarDate: "January 2" },
    { dayNumber: 3, title: "Noah and the Flood", isWatched: false, calendarDate: "January 3" },
    { dayNumber: 4, title: "The Call of Abraham", isWatched: false, calendarDate: "January 4" },
    { dayNumber: 5, title: "God's Covenant with Abraham", isWatched: false, calendarDate: "January 5" },
  ];

  return (
    <div className="max-w-md">
      <VideoList
        videos={mockVideos}
        currentDay={currentDay}
        mode="calendar"
        onSelectVideo={setCurrentDay}
      />
    </div>
  );
}
