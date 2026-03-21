import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const sequence = [
  { action: "type" as const, text: "Szórakozz az AI-val... nem," },
  { action: "pause" as const, duration: 900 },
  { action: "delete" as const, count: 27 },
  { action: "pause" as const, duration: 350 },
  { action: "type" as const, text: "ÉPÍTS ÖNMŰKÖDŐ BIRODALMAT. Affilion AI." },
];

const FINAL_SUFFIX = "Affilion AI.";
const HeroSection = () => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const navigate = useNavigate();

  const handleAiClubClick = () => {
    navigate("/csatlakozas");
  };

  // Typewriter: starts immediately on mount
  useEffect(() => {
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let current = "";
    let stepIndex = 0;
    let typeIndex = 0;
    let deleteIndex = 0;

    setDisplayed("");
    setDone(false);

    const schedule = (fn: () => void, delay: number) => {
      timeoutId = setTimeout(fn, delay);
    };

    const run = () => {
      if (cancelled) return;
      const step = sequence[stepIndex];
      if (!step) { setDone(true); return; }

      if (step.action === "pause") {
        stepIndex += 1;
        schedule(run, step.duration);
        return;
      }
      if (step.action === "type" && step.text) {
        if (typeIndex < step.text.length) {
          current += step.text[typeIndex];
          typeIndex += 1;
          setDisplayed(current);
          schedule(run, 70);
        } else {
          typeIndex = 0;
          stepIndex += 1;
          schedule(run, 120);
        }
        return;
      }
      if (step.action === "delete" && step.count) {
        if (deleteIndex < step.count && current.length > 0) {
          current = current.slice(0, -1);
          deleteIndex += 1;
          setDisplayed(current);
          schedule(run, 40);
        } else {
          deleteIndex = 0;
          stepIndex += 1;
          schedule(run, 80);
        }
      }
    };

    const startDelay = setTimeout(() => run(), 400);

    return () => {
      cancelled = true;
      clearTimeout(startDelay);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const hasFinalSuffix = displayed.endsWith(FINAL_SUFFIX);
  const headlinePrefix = hasFinalSuffix ? displayed.slice(0, -FINAL_SUFFIX.length) : displayed;

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center overflow-hidden">

      {/* YouTube Video Background */}
      <div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{
          filter: "brightness(0.3) saturate(1.2)",
          opacity: isVideoLoaded ? 1 : 0,
          transition: "opacity 1.5s ease-in-out",
        }}
      >
        <iframe
          src="https://www.youtube.com/embed/MuHibWqua8Y?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&loop=1&playlist=MuHibWqua8Y&showinfo=0&iv_load_policy=3&disablekb=1&fs=0&playsinline=1"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            border: "none",
            width: "100vw",
            height: "100vh",
            minWidth: "120%",
            minHeight: "120%",
            transform: "translate(-50%, -50%) scale(1.2)",
          }}
          allow="autoplay; encrypted-media"
          title="Hero background video"
          onLoad={() => setIsVideoLoaded(true)}
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
          <span>{headlinePrefix}</span>
          {hasFinalSuffix ? <span className="glow-text">{FINAL_SUFFIX}</span> : null}
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
          <button
            onClick={handleAiClubClick}
            className="hero-glass-button text-center animate-[pulse_3s_ease-in-out_infinite] hover:animate-none"
          >
            Csatlakozz az AI CLUB csoporthoz
          </button>
          <a href="#termekek" className="hero-glass-button-outline text-center">
            Gyorsítsd fel a munkád!
          </a>
        </motion.div>
      </div>

    </section>
  );
};

export default HeroSection;
