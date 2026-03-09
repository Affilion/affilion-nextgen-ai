import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import GlassCard from "./GlassCard";
import { useState, useEffect } from "react";
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import PromptPlayer from "./PromptPlayer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  coming_soon: boolean;
}

const ProductsSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [purchasedIds, setPurchasedIds] = useState<Set<string>>(new Set());
  const [products, setProducts] = useState<Product[]>([]);
  const [activePlayer, setActivePlayer] = useState<{ productId: string; productName: string } | null>(null);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from("products")
        .select("id, name, description, price, image_url, coming_soon")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      setProducts((data || []) as Product[]);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!user) {
      setPurchasedIds(new Set());
      return;
    }

    const fetchPurchases = async () => {
      const { data } = await supabase
        .from("purchases")
        .select("product_id")
        .eq("user_id", user.id)
        .eq("status", "completed");

      if (data) {
        setPurchasedIds(new Set(data.map((p) => p.product_id)));
      }
    };

    fetchPurchases();
  }, [user]);

  const handleBuy = async (productId: string) => {
    if (!user) {
      toast({
        title: "Bejelentkezés szükséges",
        description: "A vásárláshoz kérlek jelentkezz be.",
      });
      navigate("/auth");
      return;
    }

    if (purchasedIds.has(productId)) return;

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

  const formatPrice = (price: number) => {
    return price.toLocaleString("hu") + " Ft";
  };

  if (products.length === 0) return null;

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

        <div className={`grid grid-cols-1 ${products.length === 2 ? 'md:grid-cols-2 max-w-4xl mx-auto' : 'md:grid-cols-3'} gap-6`}>
          {products.map((p, i) => {
            const purchased = purchasedIds.has(p.id);
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                onClick={() => purchased && setActivePlayer({ productId: p.id, productName: p.name })}
                className={purchased ? "cursor-pointer" : ""}
              >
                <GlassCard className="flex flex-col h-full" parallaxStrength={25}>
                  <div className="relative overflow-hidden aspect-square bg-muted/20">
                    {p.image_url ? (
                      <img
                        src={p.image_url}
                        alt={p.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-muted-foreground text-sm">
                        Nincs kép
                      </div>
                    )}
                    {purchased && (
                      <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                        <CheckCircle className="w-12 h-12 text-primary" />
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-2">{p.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-1">{p.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold glow-text">{formatPrice(p.price)}</span>
                      {purchased ? (
                        <span className="text-sm font-semibold text-primary flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" /> Megvásárolva
                        </span>
                      ) : p.coming_soon ? (
                        <button
                          onClick={(e) => { e.stopPropagation(); toast({ title: "Hamarosan!", description: "Ez a termék hamarosan elérhető lesz!" }); }}
                          className="neon-button-outline text-sm py-2 px-4"
                        >
                          Hamarosan
                        </button>
                      ) : (
                        <button
                          onClick={(e) => { e.stopPropagation(); handleBuy(p.id); }}
                          disabled={loadingId === p.id}
                          className="neon-button text-sm py-2 px-4 disabled:opacity-50"
                        >
                          {loadingId === p.id ? "Feldolgozás..." : "Megveszem"}
                        </button>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {activePlayer && (
          <PromptPlayer
            productId={activePlayer.productId}
            productName={activePlayer.productName}
            onClose={() => setActivePlayer(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProductsSection;
