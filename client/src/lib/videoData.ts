// todo: remove mock functionality - replace with actual YouTube video IDs
export interface BibleVideo {
  dayNumber: number;
  youtubeId: string;
  title: string;
  scriptureReference: string;
}

// Generate placeholder data for all 365 days
// todo: replace these with your actual YouTube video IDs and scripture references
const bibleReadingPlan: BibleVideo[] = [
  { dayNumber: 1, youtubeId: "dQw4w9WgXcQ", title: "In the Beginning", scriptureReference: "Genesis 1-3" },
  { dayNumber: 2, youtubeId: "dQw4w9WgXcQ", title: "The Fall of Man", scriptureReference: "Genesis 4-7" },
  { dayNumber: 3, youtubeId: "dQw4w9WgXcQ", title: "Noah and the Flood", scriptureReference: "Genesis 8-11" },
  { dayNumber: 4, youtubeId: "dQw4w9WgXcQ", title: "The Call of Abraham", scriptureReference: "Genesis 12-15" },
  { dayNumber: 5, youtubeId: "dQw4w9WgXcQ", title: "God's Covenant with Abraham", scriptureReference: "Genesis 16-18" },
  { dayNumber: 6, youtubeId: "dQw4w9WgXcQ", title: "Sodom and Gomorrah", scriptureReference: "Genesis 19-21" },
  { dayNumber: 7, youtubeId: "dQw4w9WgXcQ", title: "The Sacrifice of Isaac", scriptureReference: "Genesis 22-24" },
  { dayNumber: 8, youtubeId: "dQw4w9WgXcQ", title: "Jacob and Esau", scriptureReference: "Genesis 25-27" },
  { dayNumber: 9, youtubeId: "dQw4w9WgXcQ", title: "Jacob's Ladder", scriptureReference: "Genesis 28-30" },
  { dayNumber: 10, youtubeId: "dQw4w9WgXcQ", title: "Jacob Wrestles with God", scriptureReference: "Genesis 31-33" },
];

// Generate remaining days with placeholder data
for (let i = 11; i <= 365; i++) {
  bibleReadingPlan.push({
    dayNumber: i,
    youtubeId: "dQw4w9WgXcQ", // todo: replace with actual video ID
    title: `Day ${i} Reading`,
    scriptureReference: `Scripture Reference ${i}`,
  });
}

export function getVideoByDay(dayNumber: number): BibleVideo | undefined {
  return bibleReadingPlan.find(v => v.dayNumber === dayNumber);
}

export function getAllVideos(): BibleVideo[] {
  return bibleReadingPlan;
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
