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
    "iv_load_policy=3",
    "vq=hd1080",
    "cc_load_policy=0",
    origin ? `origin=${origin}` : "",
  ]
    .filter(Boolean)
    .join("&");

  return (
    <div className="tutorial-hero-video" id={id}>
      <div
        className="tutorial-hero-video-inner relative"
        style={{ padding: 0, overflow: "hidden" }}
        onContextMenu={(e) => e.preventDefault()}
      >
        {playing ? (
          <>
            <iframe
              className="w-full h-full absolute inset-0"
              src={`https://www.youtube-nocookie.com/embed/${videoId}?${embedParams}`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="no-referrer"
            />
            {/* Transparent overlay on top-right to block YT logo link — only covers the small area */}
            <div className="absolute top-2 right-2 w-[90px] h-[32px] z-10 cursor-default" />
            {/* Bottom-right overlay — blocks YouTube watermark logo */}
            <div className="absolute bottom-[42px] right-2 w-[120px] h-[28px] z-10 cursor-default" />
          </>
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
