import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import kurzusCover from "@/assets/kurzus-cover.png";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Info, X } from "lucide-react";
import GlassCard from "./GlassCard";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

const COURSE_PRODUCT_ID = "webgyar-tutorial";

const WaitlistSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [alreadyOwned, setAlreadyOwned] = useState(false);

  // Check if user already owns this product
  useEffect(() => {
    if (!user) return;
    supabase
      .from("purchases")
      .select("id")
      .eq("user_id", user.id)
      .eq("product_id", COURSE_PRODUCT_ID)
      .eq("status", "completed")
      .limit(1)
      .then(({ data }) => {
        if (data && data.length > 0) setAlreadyOwned(true);
      });
  }, [user]);

  const handleBuy = async () => {
    if (!user) {
      toast({
        title: "Bejelentkezés szükséges",
        description: "A vásárláshoz kérlek jelentkezz be.",
      });
      navigate("/auth");
      return;
    }

    if (alreadyOwned) {
      navigate("/tartalmaim");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-payment", {
        body: { productId: COURSE_PRODUCT_ID },
      });
      if (error) throw error;
      if (data?.url) {
        window.open(data.url, "_blank");
      }
    } catch (err: any) {
      toast({
        title: "Hiba történt",
        description: err.message || "Nem sikerült a fizetés indítása.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="kurzus" className="py-28 px-4" style={{ perspective: "1000px" }}>
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <GlassCard className="p-10 md:p-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-heading">
              Saját weboldal <span className="glow-text">1 nap alatt</span>, AI segítségével
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
              <span className="text-primary font-semibold">A kurzus most</span> bevezető áron:{" "}
              <span className="text-primary font-bold text-xl md:text-2xl">17 990 Ft</span>
              <br />
              Az ár hamarosan 27 990 Ft-ra emelkedik
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto items-center justify-center">
              <button
                type="button"
                onClick={() => setShowInfo(!showInfo)}
                className="flex items-center justify-center gap-2 px-5 py-3 text-sm rounded-lg border border-glass-border/40 bg-muted/30 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
              >
                <Info size={16} />
                Több infó a kurzusról
              </button>
              <button
                type="button"
                onClick={handleBuy}
                disabled={loading}
                className="neon-button flex items-center justify-center gap-2 px-6 py-4 text-lg disabled:opacity-50"
              >
                <ShoppingCart size={18} />
                {alreadyOwned ? "Megnyitás – Tartalmaim" : loading ? "Feldolgozás..." : "Megvásárolom"}
              </button>
            </div>
            <AnimatePresence>
              {showInfo && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="mt-8 relative"
                >
                  <GlassCard className="p-6 md:p-8 text-left border border-primary/20">
                    <button
                      onClick={() => setShowInfo(false)}
                      className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-colors z-10"
                    >
                      <X size={20} />
                    </button>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Mit tartalmaz a kurzus?</h3>
                    <div className="space-y-3 text-sm md:text-base text-foreground leading-relaxed pr-6">
                      <p>Ebben a kurzusban lépésről lépésre megmutatom, hogyan készítheted el a saját modern, gyors és versenyképes weboldaladat akár pár óra alatt, anélkül, hogy vagyonokat fizetnél webfejlesztőnek.</p>
                      <p>A legmodernebb technológiák és AI-alapú megoldások segítségével végigvezetlek a teljes folyamaton, a tervezéstől egészen a kész, működő weboldalig.</p>
                      <p>Nemcsak maga az oldal elkészítése van benne, hanem az összes előmunka és utómunka is, amire valóban szükséged lesz ahhoz, hogy ne csak egy szép dizájnt kapj, hanem egy használható, jól beállított, saját domain név alatt futó weboldalt.</p>
                      <p>A kurzus minden fontos lépést érthetően, gyakorlatiasan mutat meg, így akkor is végig tudsz menni rajta, ha eddig még soha nem építettél weboldalt.</p>
                      <p className="text-foreground font-bold">A cél az, hogy a végére ne csak egy félkész projekted legyen, hanem egy valódi, optimálisan beállított, működő weboldalad, amit büszkén használhatsz vállalkozáshoz, szolgáltatáshoz vagy saját márkádhoz.</p>
                    </div>
                    <img
                      src={kurzusCover}
                      alt="Weboldal pár óra alatt kurzus"
                      className="mt-6 rounded-lg w-full max-w-md mx-auto"
                    />
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

export default WaitlistSection;
