import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "lucide-react";

interface JumpToDateProps {
  onNavigate: (day: number) => void;
  totalDays: number;
}

const MONTHS = [
  { num: 1, name: "January", days: 31 },
  { num: 2, name: "February", days: 29 },
  { num: 3, name: "March", days: 31 },
  { num: 4, name: "April", days: 30 },
  { num: 5, name: "May", days: 31 },
  { num: 6, name: "June", days: 30 },
  { num: 7, name: "July", days: 31 },
  { num: 8, name: "August", days: 31 },
  { num: 9, name: "September", days: 30 },
  { num: 10, name: "October", days: 31 },
  { num: 11, name: "November", days: 30 },
  { num: 12, name: "December", days: 31 },
];

function monthDayToDayOfYear(month: number, day: number): number {
  let dayOfYear = 0;
  for (let i = 1; i < month; i++) {
    const monthData = MONTHS[i - 1];
    dayOfYear += monthData.days;
  }
  dayOfYear += day;
  return dayOfYear;
}

export function JumpToDate({ onNavigate, totalDays }: JumpToDateProps) {
  const [selectedMonth, setSelectedMonth] = useState<string>("1");
  const [selectedDay, setSelectedDay] = useState<string>("1");

  const currentMonth = parseInt(selectedMonth);
  const currentMonthData = MONTHS[currentMonth - 1];
  const daysInMonth = currentMonthData.days;

  const handleJump = () => {
    const day = parseInt(selectedDay);
    if (day >= 1 && day <= daysInMonth) {
      const dayOfYear = monthDayToDayOfYear(currentMonth, day);
      if (dayOfYear >= 1 && dayOfYear <= totalDays) {
        onNavigate(dayOfYear);
      }
    }
  };

  const dayOptions = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="rounded-lg border p-4 space-y-3">
      <div className="flex items-center gap-2 mb-3">
        <Calendar className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-medium">Jump to Date</h3>
      </div>
      
      <div className="flex gap-2">
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="flex-1" data-testid="select-month">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {MONTHS.map(month => (
              <SelectItem key={month.num} value={month.num.toString()}>
                {month.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedDay} onValueChange={setSelectedDay}>
          <SelectTrigger className="flex-1" data-testid="select-day">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {dayOptions.map(day => (
              <SelectItem key={day} value={day.toString()}>
                {day}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button 
        onClick={handleJump} 
        className="w-full" 
        variant="default"
        data-testid="button-jump-to-date"
      >
        Jump to Date
      </Button>
    </div>
  );
}
