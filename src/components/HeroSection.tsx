import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

const sequence = [
  { action: "type", text: "A jövő... marketingje... nem," },
  { action: "pause", duration: 800 },
  { action: "delete", count: 28 },
  { action: "pause", duration: 400 },
  { action: "type", text: "A jövő TARTALOMGYÁRTÁSA. Affilion AI." },
];

const HeroSection = () => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load music URL from localStorage (admin panel)
  const heroMusicUrl = localStorage.getItem("affilion_hero_music") || "";

  useEffect(() => {
    let cancelled = false;
    let current = "";

    const run = async () => {
      for (const step of sequence) {
        if (cancelled) return;
        if (step.action === "pause") {
          await new Promise((r) => setTimeout(r, step.duration));
        } else if (step.action === "type" && step.text) {
          for (const char of step.text) {
            if (cancelled) return;
            current += char;
            setDisplayed(current);
            await new Promise((r) => setTimeout(r, 70));
          }
        } else if (step.action === "delete" && step.count) {
          for (let i = 0; i < step.count; i++) {
            if (cancelled) return;
            current = current.slice(0, -1);
            setDisplayed(current);
            await new Promise((r) => setTimeout(r, 40));
          }
        }
      }
      setDone(true);
    };
    run();
    return () => { cancelled = true; };
  }, []);

  const toggleSound = () => {
    if (!audioRef.current && heroMusicUrl) {
      audioRef.current = new Audio(heroMusicUrl);
      audioRef.current.loop = true;
    }
    if (soundOn) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setSoundOn(!soundOn);
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center overflow-hidden">
      {/* YouTube Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden" style={{ filter: "brightness(0.3) saturate(1.2)" }}>
        <iframe
          src={`https://www.youtube.com/embed/MuHibWqua8Y?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&loop=1&playlist=MuHibWqua8Y&showinfo=0&iv_load_policy=3&disablekb=1&fs=0&playsinline=1`}
          className="absolute top-1/2 left-1/2 w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ border: "none" }}
          allow="autoplay; encrypted-media"
          title="Hero background video"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/40 via-background/60 to-background" />

      {/* Content */}
      <div className="relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl leading-tight"
        >
          <span className="glow-text">{displayed}</span>
          <span
            className={`inline-block w-[3px] h-[0.85em] bg-primary ml-1 align-text-bottom ${
              done ? "cursor-blink" : ""
            }`}
          />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 5 }}
          className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed"
        >
          Zene, képek, videók és automatizáció – hipergyorsan.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 5.5 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#youtube" className="hero-glass-button text-center">
            Nézd a videókat
          </a>
          <a href="#" className="hero-glass-button-outline text-center">
            AI Eszköztár letöltése
          </a>
        </motion.div>
      </div>

      {/* Sound Toggle */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 6 }}
        onClick={toggleSound}
        className="absolute bottom-8 right-8 z-10 p-3 rounded-full hyper-glass text-primary hover:text-foreground transition-colors"
        aria-label="Sound toggle"
      >
        {soundOn ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </motion.button>
    </section>
  );
};

export default HeroSection;
