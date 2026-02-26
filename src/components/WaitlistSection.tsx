import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import GlassCard from "./GlassCard";

const WaitlistSection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
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
              Saját weboldal <span className="glow-text">1 nap alatt</span>, Lovable segítségével
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              A kurzus hamarosan indul. Iratkozz fel a várólistára, és csapj le a{" "}
              <span className="text-primary font-semibold">20% kedvezményre!</span>
            </p>

            {submitted ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-primary font-semibold text-lg"
              >
                ✅ Sikeresen feliratkoztál! Hamarosan értesítünk.
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder="pelda@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-lg border border-glass-border/40 bg-muted/30 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
                <button type="submit" className="neon-button flex items-center justify-center gap-2">
                  <Send size={16} />
                  Feliratkozom
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
