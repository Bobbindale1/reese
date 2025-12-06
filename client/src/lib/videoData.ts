export interface BibleVideo {
  dayNumber: number;
  youtubeId: string;
  title: string;
  scriptureReference: string;
}

export async function fetchVideos(): Promise<BibleVideo[]> {
  const response = await fetch("/api/videos");
  if (!response.ok) {
    throw new Error("Failed to fetch videos");
  }
  return response.json();
}

export function getVideoByDay(videos: BibleVideo[], dayNumber: number): BibleVideo | undefined {
  return videos.find(v => v.dayNumber === dayNumber);
}

export function getDayOfYear(date: Date = new Date()): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

export function getDateForDay(dayNumber: number, year: number = new Date().getFullYear()): Date {
  const date = new Date(year, 0, 1);
  date.setDate(date.getDate() + dayNumber - 1);
  return date;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}
