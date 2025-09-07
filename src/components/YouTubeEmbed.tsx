import { getYouTubeEmbedUrl } from '@/lib/youtube';

interface YouTubeEmbedProps {
  url: string;
  title: string;
  className?: string;
}

export function YouTubeEmbed({ url, title, className = '' }: YouTubeEmbedProps) {
  const embedUrl = getYouTubeEmbedUrl(url);

  if (!embedUrl) {
    return (
      <div className={`bg-muted rounded-lg p-4 text-center ${className}`}>
        <p className="text-muted-foreground text-sm">Invalid YouTube URL</p>
      </div>
    );
  }

  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
}