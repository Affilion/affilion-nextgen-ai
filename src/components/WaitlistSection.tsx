import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import GlassCard from "./GlassCard";
import { supabase } from "@/integrations/supabase/client";

const WaitlistSection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    <section id="kurzus" className="py-24 px-4" style={{ perspective: "1000px" }}>
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <GlassCard className="p-8 md:p-12 text-center">
            <h2 className="section-title mb-4">
              Saját weboldal <span className="glow-text">1 nap alatt</span>, AI segítségével
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Most bevezető áron:{" "}
              <span className="text-primary font-semibold">17 990 Ft</span>
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
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="flex-1 space-y-1">
                  <input
                    type="email"
                    required
                    placeholder="pelda@email.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    className="w-full rounded-lg border border-glass-border/40 bg-muted/30 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                  {error && <p className="text-xs text-destructive text-left">{error}</p>}
                </div>
                <button type="submit" disabled={loading} className="neon-button flex items-center justify-center gap-2 disabled:opacity-50">
                  <ShoppingCart size={16} />
                  {loading ? "Küldés..." : "Megvásárolom"}
                </button>
              </form>
            )}
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

export default WaitlistSection;
