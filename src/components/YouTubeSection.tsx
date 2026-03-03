import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import { Play, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Experiment {
  id: string;
  video_id: string;
  title: string;
  badge: string | null;
}

const VideoCard = ({
  video,
  large = false,
}: {
  video: Experiment;
  large?: boolean;
}) => {
  const [playing, setPlaying] = useState(false);
  const watchUrl = `https://www.youtube.com/watch?v=${video.video_id}`;
  const origin =
    typeof window !== "undefined" ? encodeURIComponent(window.location.origin) : "";

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
      {playing ? (
        <iframe
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${video.video_id}?autoplay=1&rel=0&modestbranding=1&playsinline=1${origin ? `&origin=${origin}` : ""}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <div
          className="relative h-full w-full cursor-pointer group"
          onClick={() => setPlaying(true)}
        >
          <img
            src={`https://img.youtube.com/vi/${video.video_id}/maxresdefault.jpg`}
            alt={video.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full backdrop-blur-md bg-white/10 border border-white/20 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20">
              <Play className="w-6 h-6 md:w-7 md:h-7 text-white/80 fill-white/80 ml-1" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const YouTubeSection = () => {
  const [videos, setVideos] = useState<Experiment[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const { data } = await supabase
        .from("experiments")
        .select("id, video_id, title, badge")
        .order("sort_order", { ascending: true });
      if (data) setVideos(data);
    };
    fetchVideos();
  }, []);

  if (videos.length === 0) return null;

  const [first, ...rest] = videos;

  return (
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
              <VideoCard video={first} large />
              <div className="p-4">
                <span
                  className="inline-block px-2 py-0.5 rounded text-[10px] md:text-xs font-bold tracking-wider mb-1"
                  style={{
                    background: "linear-gradient(135deg, hsl(270 80% 60%), hsl(200 80% 60%))",
                    color: "white",
                  }}
                >
                  {first.badge}
                </span>
                <h3 className="font-black uppercase leading-tight tracking-wide text-foreground text-base md:text-xl"
                  style={{ textShadow: "0 0 20px rgba(0,0,0,0.5)" }}
                >
                  {first.title}
                </h3>
                <a
                  href={`https://www.youtube.com/watch?v=${first.video_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-2 text-xs text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  <ExternalLink size={13} /> Megnézem YouTube-on
                </a>
              </div>
            </GlassCard>
          </motion.div>

          {rest.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <GlassCard parallaxStrength={20}>
                <VideoCard video={v} />
                <div className="p-3">
                  <span
                    className="inline-block px-2 py-0.5 rounded text-[9px] md:text-[10px] font-bold tracking-wider mb-1"
                    style={{
                      background: "linear-gradient(135deg, hsl(270 80% 60%), hsl(200 80% 60%))",
                      color: "white",
                    }}
                  >
                    {v.badge}
                  </span>
                  <h3 className="font-black uppercase leading-tight tracking-wide text-foreground text-xs md:text-sm"
                    style={{ textShadow: "0 0 20px rgba(0,0,0,0.5)" }}
                  >
                    {v.title}
                  </h3>
                  <a
                    href={`https://www.youtube.com/watch?v=${v.video_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-1.5 text-[10px] md:text-xs text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    <ExternalLink size={11} /> YouTube
                  </a>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default YouTubeSection;
