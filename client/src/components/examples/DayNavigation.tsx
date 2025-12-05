import { useState } from "react";
import { DayNavigation } from "../DayNavigation";

export default function DayNavigationExample() {
  const [currentDay, setCurrentDay] = useState(1);
  
  return (
    <div className="max-w-md">
      <DayNavigation
        currentDay={currentDay}
        totalDays={365}
        mode="calendar"
        onNavigate={setCurrentDay}
        currentDate="January 1, 2025"
      />
    </div>
  );
}
