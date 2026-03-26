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
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <div className="flex-1 space-y-1">
                  <input
                    type="email"
                    required
                    placeholder="pelda@email.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    className="w-full rounded-lg border border-glass-border/40 bg-muted/30 px-5 py-4 text-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                  {error && <p className="text-xs text-destructive text-left">{error}</p>}
                </div>
                <button type="submit" disabled={loading} className="neon-button flex items-center justify-center gap-2 disabled:opacity-50 px-6 py-4 text-lg">
                  <ShoppingCart size={18} />
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
