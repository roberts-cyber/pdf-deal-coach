/**
 * Convert various YouTube URL formats to embed URL
 * Supports:
 * - https://youtu.be/dQw4w9WgXcQ
 * - https://www.youtube.com/watch?v=dQw4w9WgXcQ
 * - https://youtube.com/watch?v=dQw4w9WgXcQ
 * - URLs with additional parameters
 */
export function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    
    // Handle youtu.be format
    if (urlObj.hostname === 'youtu.be') {
      const videoId = urlObj.pathname.slice(1); // Remove leading slash
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    // Handle youtube.com format
    if (urlObj.hostname.includes('youtube.com')) {
      const videoId = urlObj.searchParams.get('v');
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }
    
    return null;
  } catch {
    return null;
  }
}

/**
 * Extract video ID from YouTube URL
 */
export function getYouTubeVideoId(url: string): string | null {
  try {
    const urlObj = new URL(url);
    
    if (urlObj.hostname === 'youtu.be') {
      return urlObj.pathname.slice(1);
    }
    
    if (urlObj.hostname.includes('youtube.com')) {
      return urlObj.searchParams.get('v');
    }
    
    return null;
  } catch {
    return null;
  }
}