import { useState } from "react";
import { ModeToggle } from "../ModeToggle";

export default function ModeToggleExample() {
  const [mode, setMode] = useState<"calendar" | "dayNumber">("calendar");
  
  return (
    <ModeToggle mode={mode} onModeChange={setMode} />
  );
}
