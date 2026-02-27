import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import { Play } from "lucide-react";
import { useState } from "react";

const videos = [
  {
    id: "e_q8YOyD1vc",
    title: "AI Zene generálás bemutató",
    overlay: "ÍGY SZEREPELJ A FILMSZTÁROKKAL",
    badge: "AFFILION AI",
  },
  {
    id: "V_KrbdjRoAI",
    title: "Midjourney tippek és trükkök",
    overlay: "KIADTAM A SAJÁT AI ZENÉM",
    badge: "AFFILION AI",
  },
  {
    id: "MuHibWqua8Y",
    title: "Automatizáció a mindennapokban",
    overlay: "BURN IT ALL",
    badge: "AFFILION AI",
  },
];

const VideoCard = ({
  video,
  large = false,
}: {
  video: (typeof videos)[0];
  large?: boolean;
}) => {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="aspect-video w-full">
        <iframe
          className="h-full w-full rounded-xl"
          src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div
      className="relative aspect-video w-full cursor-pointer group overflow-hidden rounded-xl"
      onClick={() => setPlaying(true)}
    >
      {/* YouTube thumbnail */}
      <img
        src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
        alt={video.title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/40 transition-transform duration-300 group-hover:scale-110">
          <Play className="w-6 h-6 md:w-7 md:h-7 text-white fill-white ml-1" />
        </div>
      </div>

      {/* Badge + overlay text */}
      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5">
        <span
          className="inline-block px-2 py-0.5 rounded text-[10px] md:text-xs font-bold tracking-wider mb-1 md:mb-2"
          style={{
            background: "linear-gradient(135deg, hsl(270 80% 60%), hsl(200 80% 60%))",
            color: "white",
          }}
        >
          {video.badge}
        </span>
        <h3
          className={`font-black uppercase leading-tight tracking-wide text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] ${
            large
              ? "text-lg md:text-2xl lg:text-3xl"
              : "text-xs md:text-sm lg:text-base"
          }`}
          style={{
            textShadow:
              "0 0 20px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.8)",
          }}
        >
          {video.overlay}
        </h3>
      </div>
    </div>
  );
};

const YouTubeSection = () => (
  <section id="youtube" className="py-24 px-4" style={{ perspective: "1000px" }}>
    <div className="container mx-auto max-w-6xl">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="section-title text-center mb-16"
      >
        Legújabb <span className="glow-text">AI Kísérleteim</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="md:col-span-2 md:row-span-2"
        >
          <GlassCard className="h-full">
            <VideoCard video={videos[0]} large />
            <div className="p-4">
              <h3 className="font-semibold text-foreground">{videos[0].title}</h3>
            </div>
          </GlassCard>
        </motion.div>

        {videos.slice(1).map((v, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <GlassCard parallaxStrength={20}>
              <VideoCard video={v} />
              <div className="p-4">
                <h3 className="text-sm font-semibold text-foreground">{v.title}</h3>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default YouTubeSection;
