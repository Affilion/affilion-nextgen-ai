import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Lock, Unlock, ShoppingCart, X, BookOpen, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import productPrompts from "@/assets/product-prompts.png";
import productSuno from "@/assets/product-suno.png";
import productAuto from "@/assets/product-auto.png";

interface ProductContent {
  product_id: string;
  notion_url: string;
  title: string;
}

const ALL_PRODUCTS = [
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

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [content, setContent] = useState<ProductContent[]>([]);
  const [purchasedIds, setPurchasedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [activeContent, setActiveContent] = useState<ProductContent | null>(null);
  const [loadingBuyId, setLoadingBuyId] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate("/auth?redirect=dashboard");
      return;
    }

    const fetchData = async () => {
      const [contentRes, purchaseRes] = await Promise.all([
        supabase.from("product_content").select("product_id, notion_url, title"),
        supabase.from("purchases").select("product_id").eq("user_id", user.id).eq("status", "completed"),
      ]);

      if (contentRes.data) setContent(contentRes.data);
      if (purchaseRes.data) setPurchasedIds(new Set(purchaseRes.data.map((p) => p.product_id)));
      setLoading(false);
    };

    fetchData();
  }, [user, authLoading, navigate]);

  const handleBuy = async (productId: string) => {
    setLoadingBuyId(productId);
    try {
      const { data, error } = await supabase.functions.invoke("create-payment", {
        body: { productId },
      });
      if (error) throw error;
      if (data?.url) window.open(data.url, "_blank");
    } catch (error: any) {
      toast({
        title: "Hiba történt",
        description: error.message || "Nem sikerült a fizetés indítása.",
        variant: "destructive",
      });
    } finally {
      setLoadingBuyId(null);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const purchasedProducts = ALL_PRODUCTS.filter((p) => purchasedIds.has(p.id));
  const lockedProducts = ALL_PRODUCTS.filter((p) => !purchasedIds.has(p.id));

  const getContentForProduct = (productId: string) =>
    content.find((c) => c.product_id === productId);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 hyper-glass border-0 border-b border-border/20">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} /> Főoldal
          </button>
          <h1 className="text-lg font-bold glow-text">Saját Tartalmaim</h1>
          <div className="w-20" />
        </div>
      </header>

      <div className="pt-20 px-4 pb-12">
        <div className="container mx-auto max-w-6xl">
          {/* Welcome */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-1">
              Üdv, <span className="glow-text">{user?.user_metadata?.full_name || user?.email?.split("@")[0]}!</span>
            </h2>
            <p className="text-muted-foreground text-sm">
              {purchasedProducts.length > 0
                ? "Itt találod az összes megvásárolt tartalmad."
                : "Még nincs megvásárolt tartalmad — nézd meg, mit kínálunk!"}
            </p>
          </motion.div>

          {/* UNLOCKED - Purchased Products */}
          {purchasedProducts.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-14"
            >
              <div className="flex items-center gap-2 mb-6">
                <Unlock size={18} className="text-primary" />
                <h3 className="text-lg font-bold text-foreground">Feloldott tartalmak</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {purchasedProducts.map((product, i) => {
                  const productContent = getContentForProduct(product.id);
                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + i * 0.1 }}
                      onClick={() => productContent && setActiveContent(productContent)}
                      className="group cursor-pointer"
                    >
                      <div className="hyper-glass rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_hsl(var(--primary)/0.15)]">
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                          <div className="absolute bottom-3 left-3 right-3">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/20 text-primary border border-primary/30 backdrop-blur-sm">
                              <Sparkles size={10} /> FELOLDVA
                            </span>
                          </div>
                        </div>
                        <div className="p-5">
                          <h4 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                            {product.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mb-3">{product.description}</p>
                          <div className="flex items-center gap-2 text-xs text-primary font-semibold">
                            <BookOpen size={14} />
                            Megnyitás
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>
          )}

          {/* LOCKED - Upsell Products */}
          {lockedProducts.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Lock size={18} className="text-muted-foreground" />
                <h3 className="text-lg font-bold text-foreground">Még feloldásra vár</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {lockedProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + i * 0.1 }}
                  >
                    <div className="hyper-glass rounded-xl overflow-hidden opacity-70 hover:opacity-90 transition-all duration-300">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="h-full w-full object-cover grayscale"
                        />
                        <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-muted/60 backdrop-blur-sm border border-border flex items-center justify-center">
                            <Lock size={22} className="text-muted-foreground" />
                          </div>
                        </div>
                      </div>
                      <div className="p-5">
                        <h4 className="font-bold text-foreground mb-1">{product.title}</h4>
                        <p className="text-xs text-muted-foreground mb-4">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold glow-text">{product.price}</span>
                          <button
                            onClick={() => handleBuy(product.id)}
                            disabled={loadingBuyId === product.id}
                            className="neon-button text-xs py-2 px-4 flex items-center gap-1.5 disabled:opacity-50"
                          >
                            <ShoppingCart size={13} />
                            {loadingBuyId === product.id ? "Feldolgozás..." : "Feloldás"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </div>

      {/* Content Modal */}
      <AnimatePresence>
        {activeContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-md p-4"
            onClick={() => setActiveContent(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-5xl h-[85vh] hyper-glass rounded-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-border/30">
                <h3 className="font-bold text-foreground text-sm md:text-base truncate pr-4">
                  {activeContent.title}
                </h3>
                <button
                  onClick={() => setActiveContent(null)}
                  className="flex-shrink-0 w-8 h-8 rounded-lg bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              {/* Notion iframe */}
              <div className="flex-1 overflow-hidden">
                <iframe
                  src={activeContent.notion_url}
                  className="w-full h-full border-0"
                  title={activeContent.title}
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
