import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface VideoPlayerProps {
  dayNumber: number;
  youtubeId: string;
  title: string;
  scriptureReference: string;
  calendarDate?: string;
}

export function VideoPlayer({ dayNumber, youtubeId, title, scriptureReference, calendarDate }: VideoPlayerProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <AspectRatio ratio={16 / 9} className="bg-muted rounded-md overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
            data-testid="video-player-iframe"
          />
        </AspectRatio>
        <Badge 
          className="absolute top-3 left-3 bg-background/90 text-foreground backdrop-blur-sm"
          data-testid="badge-day-number"
        >
          Day {dayNumber}
        </Badge>
      </div>
      
      <div className="space-y-2">
        {calendarDate && (
          <p className="text-sm text-muted-foreground" data-testid="text-calendar-date">
            {calendarDate}
          </p>
        )}
        <h2 className="text-xl font-semibold font-serif" data-testid="text-video-title">
          {title}
        </h2>
        <p className="text-muted-foreground" data-testid="text-scripture-reference">
          {scriptureReference}
        </p>
      </div>
    </div>
  );
}
