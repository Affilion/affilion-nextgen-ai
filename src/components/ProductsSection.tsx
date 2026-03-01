import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import productPrompts from "@/assets/product-prompts.png";
import productSuno from "@/assets/product-suno.png";
import productAuto from "@/assets/product-auto.png";
import GlassCard from "./GlassCard";
import { useState } from "react";

const products = [
  {
    id: "prompt-pack",
    title: "100 AI Prompt Pack",
    description: "Azonnal használható promptok Midjourney-hez, ChatGPT-hez és DALL·E-hoz.",
    price: "2 990 Ft",
    image: productPrompts,
  },
  {
    id: "suno-guide",
    title: "Suno AI Dalszövegírási Titkok",
    description: "Tanulj meg professzionális dalokat generálni mesterséges intelligenciával.",
    price: "3 990 Ft",
    image: productSuno,
  },
  {
    id: "auto-guide",
    title: "AI Automatizációs Útmutató",
    description: "Automatizáld a munkafolyamataidat Make, Zapier és AI eszközökkel.",
    price: "4 990 Ft",
    image: productAuto,
  },
];

const ProductsSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleBuy = async (productId: string) => {
    if (!user) {
      toast({
        title: "Bejelentkezés szükséges",
        description: "A vásárláshoz kérlek jelentkezz be.",
      });
      navigate("/auth");
      return;
    }

    setLoadingId(productId);
    try {
      const { data, error } = await supabase.functions.invoke("create-payment", {
        body: { productId },
      });

      if (error) throw error;
      if (data?.url) {
        window.open(data.url, "_blank");
      }
    } catch (error: any) {
      toast({
        title: "Hiba történt",
        description: error.message || "Nem sikerült a fizetés indítása.",
        variant: "destructive",
      });
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <section id="termekek" className="py-24 px-4" style={{ perspective: "1000px" }}>
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title text-center mb-16"
        >
          Gyorsítsd fel <span className="glow-text">a munkád!</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <GlassCard className="flex flex-col h-full" parallaxStrength={25}>
                <div className="relative overflow-hidden aspect-square bg-muted/20">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{p.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold glow-text">{p.price}</span>
                    <button
                      onClick={() => handleBuy(p.id)}
                      disabled={loadingId === p.id}
                      className="neon-button text-sm py-2 px-4 disabled:opacity-50"
                    >
                      {loadingId === p.id ? "Feldolgozás..." : "Megveszem"}
                    </button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
