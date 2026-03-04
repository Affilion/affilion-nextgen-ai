import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Copy, Check, ChevronDown, ChevronUp } from "lucide-react";
import GlassCard from "./GlassCard";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const DZINE_REFERRAL = "https://www.dzine.ai/referrals/47NQZav2";

interface PromptLabItem {
  id: string;
  title: string;
  image_url: string;
  prompt_text: string;
  description: string | null;
}

const PromptLabSection = () => {
  const [items, setItems] = useState<PromptLabItem[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      const { data } = await supabase
        .from("prompt_lab_items")
        .select("id, title, image_url, prompt_text, description")
        .order("sort_order", { ascending: true });
      if (data) setItems(data);
    };
    fetchItems();
  }, []);

  if (items.length === 0) return null;

  const item = items[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(item.prompt_text);
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
                  src={item.image_url}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="lg:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-muted-foreground mb-6">{item.description}</p>
                )}

                <button
                  onClick={() => setExpanded(!expanded)}
                  className="flex items-center gap-2 text-sm text-primary font-medium mb-3 hover:underline"
                >
                  {expanded ? "Elrejtés" : "Prompt megtekintése"}
                  {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {expanded && (
                  <div className="relative mb-6">
                    <div className="code-block text-muted-foreground">{item.prompt_text}</div>
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
                  <a href={DZINE_REFERRAL} target="_blank" rel="noopener noreferrer" className="neon-button text-center text-sm">
                    Próbáld ki a Dzine-t!
                  </a>
                  <button
                    onClick={() => toast({ title: "HAMAROSAN", description: "Ez a funkció hamarosan elérhető lesz!" })}
                    className="neon-button-outline text-center text-sm"
                  >
                    Vedd meg a Kezdő Prompt Csomagot!
                  </button>
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
