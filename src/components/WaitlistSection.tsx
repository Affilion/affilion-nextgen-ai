import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Info, X } from "lucide-react";
import GlassCard from "./GlassCard";
import { supabase } from "@/integrations/supabase/client";

const WaitlistSection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showInfo, setShowInfo] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError("");

    const { error: dbError } = await supabase
      .from("waitlist_subscribers")
      .insert({ email: email.trim().toLowerCase() });

    if (dbError) {
      if (dbError.code === "23505") {
        setError("Ez az e-mail cím már feliratkozott!");
      } else {
        setError("Hiba történt, próbáld újra később.");
      }
      setLoading(false);
      return;
    }

    setSubmitted(true);
    setEmail("");
    setLoading(false);
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

            {submitted ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-primary font-semibold text-lg"
              >
                Sikeres feliratkozás! 🎉 Hamarosan értesítünk.
              </motion.div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto items-center justify-center">
                <button
                  type="button"
                  onClick={() => setShowInfo(true)}
                  className="flex items-center justify-center gap-2 px-5 py-3 text-sm rounded-lg border border-glass-border/40 bg-muted/30 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
                >
                  <Info size={16} />
                  Több infó a kurzusról
                </button>
                <button
                  type="button"
                  onClick={() => {/* TODO: Stripe payment */}}
                  className="neon-button flex items-center justify-center gap-2 px-6 py-4 text-lg"
                >
                  <ShoppingCart size={18} />
                  Megvásárolom
                </button>
              </div>
            )}

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
                      className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <X size={20} />
                    </button>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed pr-6">
                      Ebben a kurzusban lépésről lépésre megmutatom, hogyan készítheted el a saját modern, gyors és versenyképes weboldaladat akár pár óra alatt, anélkül, hogy vagyonokat fizetnél webfejlesztőnek. A legmodernebb technológiák és AI-alapú megoldások segítségével végigvezetlek a teljes folyamaton, a tervezéstől egészen a kész, működő weboldalig. Nemcsak maga az oldal elkészítése van benne, hanem az összes előmunka és utómunka is, amire valóban szükséged lesz ahhoz, hogy ne csak egy szép dizájnt kapj, hanem egy használható, jól beállított, saját domain név alatt futó weboldalt. A kurzus minden fontos lépést érthetően, gyakorlatiasan mutat meg, így akkor is végig tudsz menni rajta, ha eddig még soha nem építettél weboldalt. A cél az, hogy a végére ne csak egy félkész projekted legyen, hanem egy valódi, optimálisan beállított, működő weboldalad, amit büszkén használhatsz vállalkozáshoz, szolgáltatáshoz vagy saját márkádhoz.
                    </p>
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
