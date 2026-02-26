import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, ChevronDown, ChevronUp } from "lucide-react";
import jediBanana from "@/assets/jedi-banana.png";
import GlassCard from "./GlassCard";

const samplePrompt = `A Jedi warrior in a dark Star Wars corridor, wielding a giant glowing banana instead of a lightsaber, fighting Darth Vader. The banana emits bright yellow-green neon light. Cinematic composition, dramatic lighting, 8K, photorealistic. --ar 16:9 --v 6`;

const PromptLabSection = () => {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(samplePrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="prompt-labor" className="py-24 px-4" style={{ perspective: "1000px" }}>
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title text-center mb-16"
        >
          Prompt Labor – <span className="glow-text">Másold le a varázslatot!</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <GlassCard parallaxStrength={15}>
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 overflow-hidden">
                <img
                  src={jediBanana}
                  alt="Jedi harcol Darth Vaderrel egy világító banánnal"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="lg:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  A Birodalom Visszavág... egy banánnal? 🍌
                </h3>
                <p className="text-muted-foreground mb-6">
                  Igen, jól látod. Ez egy AI-generált kép, és alább megtalálod a promptot hozzá!
                </p>

                <button
                  onClick={() => setExpanded(!expanded)}
                  className="flex items-center gap-2 text-sm text-primary font-medium mb-3 hover:underline"
                >
                  {expanded ? "Elrejtés" : "Prompt megtekintése"}
                  {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {expanded && (
                  <div className="relative mb-6">
                    <div className="code-block text-muted-foreground">{samplePrompt}</div>
                    <button
                      onClick={handleCopy}
                      className="absolute top-2 right-2 p-2 rounded-md bg-muted/50 hover:bg-muted transition-colors text-foreground"
                      aria-label="Másolás"
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="#" className="neon-button text-center text-sm">
                    Próbáld ki a Midjourney-t!
                  </a>
                  <a href="#" className="neon-button-outline text-center text-sm">
                    Vedd meg a Kezdő Prompt Csomagot!
                  </a>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

export default PromptLabSection;
