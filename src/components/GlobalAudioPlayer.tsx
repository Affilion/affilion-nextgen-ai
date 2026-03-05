import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

const HERO_MUSIC_URL = "/music/hero-bg.mp3";

const GlobalAudioPlayer = () => {
  const [soundOn, setSoundOn] = useState(false);
  const [visible, setVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.25;
    }
    // Delay visibility to match original hero animation
    const timer = setTimeout(() => setVisible(true), 6000);
    return () => clearTimeout(timer);
  }, []);

  const toggleSound = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (soundOn) {
      audio.pause();
    } else {
      audio.volume = 0.25;
      audio.play().catch(() => {});
    }
    setSoundOn((s) => !s);
  }, [soundOn]);

  if (!visible) return <audio ref={audioRef} src={HERO_MUSIC_URL} loop preload="auto" />;

  return (
    <>
      <audio ref={audioRef} src={HERO_MUSIC_URL} loop preload="auto" />
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={toggleSound}
        className="fixed bottom-8 right-8 z-50 p-3 rounded-full hyper-glass text-primary hover:text-foreground transition-colors"
        aria-label="Sound toggle"
      >
        {soundOn ? (
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          >
            <Volume2 size={20} />
          </motion.div>
        ) : (
          <VolumeX size={20} />
        )}
      </motion.button>
    </>
  );
};

export default GlobalAudioPlayer;
