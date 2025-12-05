import { VideoPlayer } from "../VideoPlayer";

export default function VideoPlayerExample() {
  return (
    <VideoPlayer
      dayNumber={1}
      youtubeId="dQw4w9WgXcQ"
      title="In the Beginning"
      scriptureReference="Genesis 1-3"
      calendarDate="January 1, 2025"
    />
  );
}
