import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const fullText = "Affilion AI";

const HeroSection = () => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-20 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
      >
        <span className="glow-text">{displayed}</span>
        <span className={`inline-block w-[3px] h-[0.85em] bg-primary ml-1 align-text-bottom ${done ? "cursor-blink" : ""}`} />
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed"
      >
        A jövő tartalomgyártása. Zene, képek, videók és automatizáció – okosabban.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2 }}
        className="mt-10 flex flex-col sm:flex-row gap-4"
      >
        <a href="#youtube" className="neon-button text-center">
          Nézd a videókat
        </a>
        <a href="#" className="neon-button-outline text-center">
          AI Eszköztár letöltése
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
