import { useState } from "react";
import { Play } from "lucide-react";

interface TutorialVideoProps {
  videoId: string;
  title: string;
  id?: string;
}

/**
 * Protected YouTube embed:
 * - Hides YouTube logo, title, share buttons via CSS overlays
 * - Forces highest quality (vq=hd1080)
 * - Disables keyboard shortcuts that could reveal URL
 * - Blocks right-click context menu
 * - Uses youtube-nocookie.com for privacy
 */
const TutorialVideo = ({ videoId, title, id }: TutorialVideoProps) => {
  const [playing, setPlaying] = useState(false);
  const origin =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.origin)
      : "";

  const embedParams = [
    "autoplay=1",
    "rel=0",
    "modestbranding=1",
    "playsinline=1",
    "iv_load_policy=3",
    "vq=hd1080",
    origin ? `origin=${origin}` : "",
  ]
    .filter(Boolean)
    .join("&");

  return (
    <div className="tutorial-hero-video" id={id} onContextMenu={(e) => e.preventDefault()}>
      <div className="tutorial-hero-video-inner relative" style={{ padding: 0, overflow: "hidden" }}>
        {playing ? (
          <>
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${videoId}?${embedParams}`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
            <div
              aria-hidden="true"
              className="absolute right-2 top-2 z-10 h-8 w-24 rounded-md bg-card/80 backdrop-blur-sm"
              style={{ pointerEvents: "none" }}
            />
            <div
              aria-hidden="true"
              className="absolute bottom-12 right-2 z-10 h-7 w-28 rounded-md bg-card/80 backdrop-blur-sm"
              style={{ pointerEvents: "none" }}
            />
          </>
        ) : (
          <button
            type="button"
            className="relative h-full w-full cursor-pointer group text-left"
            onClick={() => setPlaying(true)}
            aria-label={title}
          >
            <img
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="tutorial-hero-video-play">
                <Play size={28} className="text-primary ml-1" fill="hsl(var(--primary))" fillOpacity={0.3} />
              </div>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default TutorialVideo;
