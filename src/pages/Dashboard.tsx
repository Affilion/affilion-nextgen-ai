import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { ArrowLeft, Lock, BookOpen } from "lucide-react";

interface ProductContent {
  product_id: string;
  notion_url: string;
  title: string;
}

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [content, setContent] = useState<ProductContent[]>([]);
  const [activeProduct, setActiveProduct] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate("/auth");
      return;
    }

    const fetchContent = async () => {
      // product_content RLS only returns items the user purchased
      const { data } = await supabase
        .from("product_content")
        .select("product_id, notion_url, title");

      if (data && data.length > 0) {
        setContent(data);
        setActiveProduct(data[0].product_id);
      }
      setLoading(false);
    };

    fetchContent();
  }, [user, authLoading, navigate]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const activeContent = content.find((c) => c.product_id === activeProduct);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-card border-0 border-b border-glass-border/20">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} /> Vissza
          </button>
          <h1 className="text-lg font-bold glow-text">Saját Tartalmaim</h1>
          <div className="w-20" />
        </div>
      </header>

      <div className="pt-20 px-4 pb-8">
        <div className="container mx-auto max-w-6xl">
          {content.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24"
            >
              <Lock className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-3">Még nincs megvásárolt tartalmad</h2>
              <p className="text-muted-foreground mb-6">
                Vásárolj egy terméket, és itt elérheted a tartalmát!
              </p>
              <button
                onClick={() => navigate("/")}
                className="neon-button text-sm"
              >
                Termékek megtekintése
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Product tabs */}
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {content.map((c) => (
                  <button
                    key={c.product_id}
                    onClick={() => setActiveProduct(c.product_id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                      activeProduct === c.product_id
                        ? "neon-button"
                        : "hyper-glass text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <BookOpen size={14} />
                    {c.title}
                  </button>
                ))}
              </div>

              {/* Notion iframe */}
              {activeContent && (
                <div className="hyper-glass rounded-xl overflow-hidden" style={{ minHeight: "80vh" }}>
                  <iframe
                    src={activeContent.notion_url}
                    className="w-full border-0"
                    style={{
                      minHeight: "80vh",
                      background: "transparent",
                    }}
                    title={activeContent.title}
                    allowFullScreen
                  />
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
