import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, X, Music, Tag, Layers, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface PromptItem {
  id: string;
  product_id: string;
  category: string;
  title: string;
  cover_image: string | null;
  style_tags: string;
  structure_tags: string;
  analysis_text: string | null;
}

interface PromptPlayerProps {
  productId: string;
  productName: string;
  onClose: () => void;
}

const PromptPlayer = ({ productId, productName, onClose }: PromptPlayerProps) => {
  const [prompts, setPrompts] = useState<PromptItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<PromptItem | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("product_prompts")
        .select("*")
        .eq("product_id", productId)
        .order("sort_order");
      setPrompts((data || []) as PromptItem[]);
      setLoading(false);
    };
    fetch();
  }, [productId]);

  const categories = ["all", ...Array.from(new Set(prompts.map((p) => p.category)))];

  const filtered = activeCategory === "all"
    ? prompts
    : prompts.filter((p) => p.category === activeCategory);

  const handleCopy = (text: string, id: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id + label);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/85 backdrop-blur-xl p-2 md:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="w-full max-w-6xl h-[92vh] hyper-glass rounded-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border/30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
              <Music size={18} className="text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-sm md:text-base">{productName}</h3>
              <p className="text-[11px] text-muted-foreground">{prompts.length} prompt</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Category filter */}
        <div className="px-5 py-3 border-b border-border/20 overflow-x-auto flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? "bg-primary/20 text-primary border border-primary/40 shadow-[0_0_12px_hsl(var(--primary)/0.2)]"
                  : "bg-muted/30 text-muted-foreground border border-border/30 hover:text-foreground hover:border-border"
              }`}
            >
              {cat === "all" ? "Összes" : cat}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-5 custom-scrollbar">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
              Nincs prompt ebben a kategóriában.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((prompt, i) => (
                <motion.div
                  key={prompt.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="group relative hyper-glass rounded-xl overflow-hidden hover:border-primary/30 hover:shadow-[0_0_25px_hsl(var(--primary)/0.12)] transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedPrompt(prompt)}
                >
                  {/* Cover */}
                  {prompt.cover_image && (
                    <div className="relative h-32 overflow-hidden">
                      <img src={prompt.cover_image} alt={prompt.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                    </div>
                  )}

                  <div className="p-4 space-y-3">
                    {/* Title + category */}
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                        {prompt.title}
                      </h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/15 text-secondary border border-secondary/25 whitespace-nowrap flex-shrink-0">
                        {prompt.category}
                      </span>
                    </div>

                    {/* Style tags */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                          <Tag size={10} /> Style
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleCopy(prompt.style_tags, prompt.id, "style"); }}
                          className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 transition-colors"
                        >
                          {copiedId === prompt.id + "style" ? <><Check size={10} /> Másolva</> : <><Copy size={10} /> Másolás</>}
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground font-mono bg-muted/30 rounded-md px-2.5 py-1.5 line-clamp-2 border border-border/30">
                        {prompt.style_tags}
                      </p>
                    </div>

                    {/* Structure tags */}
                    {prompt.structure_tags && (
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                            <Layers size={10} /> Structure
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleCopy(prompt.structure_tags, prompt.id, "struct"); }}
                            className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-secondary/10 text-secondary hover:bg-secondary/20 border border-secondary/20 transition-colors"
                          >
                            {copiedId === prompt.id + "struct" ? <><Check size={10} /> Másolva</> : <><Copy size={10} /> Másolás</>}
                          </button>
                        </div>
                        <p className="text-xs text-muted-foreground font-mono bg-muted/30 rounded-md px-2.5 py-1.5 line-clamp-2 border border-border/30">
                          {prompt.structure_tags}
                        </p>
                      </div>
                    )}

                    {/* Read more indicator */}
                    {prompt.analysis_text && (
                      <div className="flex items-center gap-1 text-[10px] text-primary/70 pt-1">
                        <ChevronRight size={10} /> Elemzés megtekintése
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Detail modal */}
      <AnimatePresence>
        {selectedPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-background/70 backdrop-blur-md p-4"
            onClick={() => setSelectedPrompt(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-2xl max-h-[80vh] hyper-glass rounded-2xl overflow-y-auto p-6 space-y-5 custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{selectedPrompt.title}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/15 text-secondary border border-secondary/25 mt-1 inline-block">
                    {selectedPrompt.category}
                  </span>
                </div>
                <button onClick={() => setSelectedPrompt(null)} className="w-8 h-8 rounded-lg bg-muted/50 hover:bg-muted flex items-center justify-center">
                  <X size={16} />
                </button>
              </div>

              {selectedPrompt.cover_image && (
                <img src={selectedPrompt.cover_image} alt="" className="w-full rounded-xl object-cover max-h-48" />
              )}

              {/* Style tags full */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-primary font-semibold uppercase tracking-wider">
                    <Tag size={12} /> Style Tags
                  </div>
                  <button
                    onClick={() => handleCopy(selectedPrompt.style_tags, selectedPrompt.id, "detail-style")}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 border border-primary/25 transition-colors"
                  >
                    {copiedId === selectedPrompt.id + "detail-style" ? <><Check size={12} /> Másolva!</> : <><Copy size={12} /> Másolás</>}
                  </button>
                </div>
                <div className="font-mono text-sm text-foreground bg-muted/40 rounded-xl px-4 py-3 border border-border/30 whitespace-pre-wrap">
                  {selectedPrompt.style_tags}
                </div>
              </div>

              {/* Structure tags full */}
              {selectedPrompt.structure_tags && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-secondary font-semibold uppercase tracking-wider">
                      <Layers size={12} /> Structure Tags
                    </div>
                    <button
                      onClick={() => handleCopy(selectedPrompt.structure_tags, selectedPrompt.id, "detail-struct")}
                      className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium bg-secondary/10 text-secondary hover:bg-secondary/20 border border-secondary/25 transition-colors"
                    >
                      {copiedId === selectedPrompt.id + "detail-struct" ? <><Check size={12} /> Másolva!</> : <><Copy size={12} /> Másolás</>}
                    </button>
                  </div>
                  <div className="font-mono text-sm text-foreground bg-muted/40 rounded-xl px-4 py-3 border border-border/30 whitespace-pre-wrap">
                    {selectedPrompt.structure_tags}
                  </div>
                </div>
              )}

              {/* Analysis */}
              {selectedPrompt.analysis_text && (
                <div className="space-y-2">
                  <h4 className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Elemzés</h4>
                  <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">
                    {selectedPrompt.analysis_text}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PromptPlayer;
