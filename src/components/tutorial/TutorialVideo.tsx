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
    "showinfo=0",
    "iv_load_policy=3",   // hide annotations
    "disablekb=1",        // disable keyboard (prevents info shortcuts)
    "vq=hd1080",          // force HD quality
    "cc_load_policy=0",   // hide captions by default
    origin ? `origin=${origin}` : "",
  ]
    .filter(Boolean)
    .join("&");

  return (
    <div className="tutorial-hero-video" id={id}>
      <div
        className="tutorial-hero-video-inner"
        style={{ padding: 0, overflow: "hidden" }}
        onContextMenu={(e) => e.preventDefault()}
      >
        {playing ? (
          <div className="absolute inset-0 w-full h-full">
            <iframe
              className="w-full h-full absolute inset-0"
              src={`https://www.youtube-nocookie.com/embed/${videoId}?${embedParams}`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="no-referrer"
            />
            {/* Top overlay — blocks title + YouTube link at the top */}
            <div
              className="absolute top-0 left-0 right-0 h-[52px] z-10"
              style={{ pointerEvents: "auto" }}
            />
            {/* Bottom-right overlay — blocks YouTube logo watermark */}
            <div
              className="absolute bottom-[42px] right-0 w-[140px] h-[36px] z-10"
              style={{ pointerEvents: "auto" }}
            />
          </div>
        ) : (
          <div
            className="relative w-full h-full cursor-pointer group"
            onClick={() => setPlaying(true)}
          >
            <img
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="tutorial-hero-video-play">
                <Play size={28} className="text-white ml-1" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorialVideo;
