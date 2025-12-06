const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";

interface PlaylistItem {
  snippet: {
    resourceId: {
      videoId: string;
    };
    title: string;
    position: number;
  };
}

interface PlaylistItemsResponse {
  items: PlaylistItem[];
  nextPageToken?: string;
}

export interface BibleVideo {
  dayNumber: number;
  youtubeId: string;
  title: string;
  scriptureReference: string;
}

const PLAYLISTS = [
  { id: "PLZ2wMq12NwDHhv9iiMR5pa6KIjAx78Pa-", month: "January", startDay: 1 },
  { id: "PLZ2wMq12NwDFNmLiPDyLCVjmjEUCc0cHe", month: "February", startDay: 32 },
  { id: "PLZ2wMq12NwDEz0YIknWokdWbqAg15-DIa", month: "March", startDay: 60 },
  { id: "PLZ2wMq12NwDHcYGL_xUov2tWcpwqXbLDi", month: "April", startDay: 91 },
  { id: "PLZ2wMq12NwDEKlSBzk3PMGGlbVqIynF85", month: "May", startDay: 121 },
  { id: "PLZ2wMq12NwDGsRYMWnrYr394hy8Hp9R5q", month: "June", startDay: 152 },
  { id: "PLZ2wMq12NwDGxf5aSZRxrteZFlqoInXtQ", month: "July", startDay: 182 },
  { id: "PLZ2wMq12NwDHeEss_r-LpkZ1MyUmPEeRo", month: "August", startDay: 213 },
  { id: "PLZ2wMq12NwDF_IAjGS5qPCNWUSLFI-RV6", month: "September", startDay: 244 },
  { id: "PLZ2wMq12NwDGIu0v9aPOyMWPLXTw4Hp-K", month: "October", startDay: 274 },
  { id: "PLZ2wMq12NwDGanKD7h8AHl6s49l171d_O", month: "November", startDay: 305 },
  { id: "PLZ2wMq12NwDHKl_Tc2z_pgGfRoqvmpoQr", month: "December", startDay: 335 },
];

async function fetchPlaylistItems(playlistId: string): Promise<PlaylistItem[]> {
  const items: PlaylistItem[] = [];
  let pageToken: string | undefined;

  do {
    const url = new URL(`${YOUTUBE_API_BASE}/playlistItems`);
    url.searchParams.set("part", "snippet");
    url.searchParams.set("playlistId", playlistId);
    url.searchParams.set("maxResults", "50");
    url.searchParams.set("key", YOUTUBE_API_KEY || "");
    if (pageToken) {
      url.searchParams.set("pageToken", pageToken);
    }

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status} ${response.statusText}`);
    }

    const data: PlaylistItemsResponse = await response.json();
    items.push(...data.items);
    pageToken = data.nextPageToken;
  } while (pageToken);

  return items;
}

function extractScriptureReference(title: string): string {
  const match = title.match(/Day\s+\d+[:\s-]+(.+)/i);
  if (match) {
    return match[1].trim();
  }
  const colonMatch = title.match(/:\s*(.+)/);
  if (colonMatch) {
    return colonMatch[1].trim();
  }
  return title;
}

let cachedVideos: BibleVideo[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export async function fetchAllVideos(): Promise<BibleVideo[]> {
  if (cachedVideos && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return cachedVideos;
  }

  const allVideos: BibleVideo[] = [];

  for (const playlist of PLAYLISTS) {
    try {
      const items = await fetchPlaylistItems(playlist.id);
      
      items.sort((a, b) => a.snippet.position - b.snippet.position);
      
      items.forEach((item, index) => {
        allVideos.push({
          dayNumber: playlist.startDay + index,
          youtubeId: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          scriptureReference: extractScriptureReference(item.snippet.title),
        });
      });
    } catch (error) {
      console.error(`Error fetching playlist ${playlist.month}:`, error);
    }
  }

  allVideos.sort((a, b) => a.dayNumber - b.dayNumber);

  cachedVideos = allVideos;
  cacheTimestamp = Date.now();

  return allVideos;
}
