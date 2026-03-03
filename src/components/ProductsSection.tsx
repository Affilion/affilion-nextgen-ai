import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import GlassCard from "./GlassCard";
import { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
}

const ProductsSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [purchasedIds, setPurchasedIds] = useState<Set<string>>(new Set());
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from("products")
        .select("id, name, description, price, image_url")
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p, i) => {
            const purchased = purchasedIds.has(p.id);
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
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
                      ) : (
                        <button
                          onClick={() => handleBuy(p.id)}
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
    </section>
  );
};

export default ProductsSection;
