import { Layers, Clock, Users, Zap, Play } from "lucide-react";
import { useState } from "react";

const HERO_VIDEO_ID = "gxpP2WLr8K8";

const HeroVideo = () => {
  const [playing, setPlaying] = useState(false);
  const origin = typeof window !== "undefined" ? encodeURIComponent(window.location.origin) : "";

  return (
    <div className="tutorial-hero-video" id="hero-video">
      <div className="tutorial-hero-video-inner" style={{ padding: 0, overflow: "hidden" }}>
        {playing ? (
          <iframe
            className="w-full h-full absolute inset-0"
            src={`https://www.youtube-nocookie.com/embed/${HERO_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1&vq=hd1080${origin ? `&origin=${origin}` : ""}`}
            title="Üdvözlő videó"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <div className="relative w-full h-full cursor-pointer group" onClick={() => setPlaying(true)}>
            <img
              src={`https://img.youtube.com/vi/${HERO_VIDEO_ID}/maxresdefault.jpg`}
              alt="Üdvözlő videó"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="tutorial-hero-video-play">
                <Play size={28} className="text-primary ml-1" fill="hsl(var(--primary))" fillOpacity={0.3} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
const LOVABLE_URL = "https://lovable.dev/invite/PBZ4OPL";

const TutorialHero = () => {
  return (
    <section className="tutorial-hero" id="module-0">
      <div className="tutorial-hero-bg" />
      <div className="tutorial-hero-grid" />
      <div className="relative z-[2] text-center max-w-[850px] tutorial-fade-up visible">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/[0.12] border border-primary/25 rounded-full text-xs font-medium text-primary mb-7">
          <span className="tutorial-hero-badge-dot" />
          2026 &mdash; Frissített kiadás
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-5 glow-text font-heading">
          Készítsd el saját weblapodat pár óra alatt!
        </h1>

        <p className="text-lg text-muted-foreground mb-10 max-w-[600px] mx-auto">
          Komplett útmutató kezdőknek &mdash; a nulláról a kész, működő weboldalig.
          Programozói tudás nélkül, mesterséges intelligencia segítségével.
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {[
            { icon: Layers, text: "10 modul" },
            { icon: Clock, text: "~3-5 óra" },
            { icon: Users, text: "Kezdőknek" },
            { icon: Zap, text: "AI-alapú" },
          ].map((f) => (
            <div key={f.text} className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.04] border border-white/[0.06] rounded-[10px] text-sm text-muted-foreground">
              <f.icon size={16} className="text-primary" />
              {f.text}
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="#module-1"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("module-1")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-8 py-3.5 font-semibold text-white rounded-[10px] transition-all duration-250 shadow-lg hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))",
              boxShadow: "0 4px 20px hsl(var(--primary) / 0.3)",
            }}
          >
            Kezdjük el!
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
          <a
            href={LOVABLE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/[0.05] border border-white/10 text-foreground font-semibold rounded-[10px] transition-all duration-250 hover:bg-white/[0.08] hover:border-white/15"
          >
            Lovable.dev megnyitása
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
          </a>
        </div>

        {/* Video Placeholder */}
        <HeroVideo />
      </div>
    </section>
  );
};

export default TutorialHero;
