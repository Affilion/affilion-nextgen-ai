import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAiClubStatus } from "@/hooks/useAiClubStatus";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleEffect from "@/components/ParticleEffect";
import { motion } from "framer-motion";

const STRIPE_URL = "https://buy.stripe.com/dRm4gz8jz3c23YS7DA7bW01";

const benefits = [
  { icon: "🤖", title: "AI eszközök és tippek", desc: "A leghasznosabb appok, promptok, trükkök" },
  { icon: "⚡", title: "Automatizálás", desc: "Spórolj időt, dolgozz okosabban" },
  { icon: "🎨", title: "Képek, videók és zenék készítése AI-jal", desc: "Nulláról, egyszerűen" },
  { icon: "📚", title: "Folyamatos tanulás", desc: "Kezdőknek és haladóknak egyaránt" },
];

const Csatlakozas = () => {
  const { user } = useAuth();
  const { isSubscribed } = useAiClubStatus();
  const navigate = useNavigate();

  const handleJoin = () => {
    if (!user) {
      localStorage.setItem("redirect_after_login", "/csatlakozas");
      navigate("/auth");
      return;
    }
    if (isSubscribed) {
      toast.info("Már van aktív AI Club tagságod! A tagságodat a Tartalmaim oldalon tudod kezelni.");
      navigate("/tartalmaim");
      return;
    }
    window.open(STRIPE_URL, "_blank", "noopener");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <ParticleEffect />
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl p-8 md:p-12 max-w-2xl w-full text-center space-y-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold glow-text">
            Csatlakozz az AI CLUB csoporthoz
          </h1>

          <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
            Az Affilion AI Club egy zárt Discord közösség, ahol együtt tanulunk és kísérletezünk a mesterséges intelligencia legjobb eszközeivel.
          </p>

          <div className="text-left space-y-4">
            <p className="text-sm font-semibold text-foreground">A tagság részeként hozzáférsz:</p>
            {benefits.map((b) => (
              <div key={b.title} className="flex items-start gap-3">
                <span className="text-xl">{b.icon}</span>
                <div>
                  <span className="font-semibold text-foreground">{b.title}</span>
                  <span className="text-muted-foreground"> – {b.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleJoin}
            className="hero-glass-button text-center w-full text-base py-3 animate-[pulse_3s_ease-in-out_infinite] hover:animate-none"
          >
            Csatlakozás az AI CLUB-hoz
          </button>

          <div className="border-t border-glass-border/30 pt-4 space-y-3">
            <p className="text-xs text-muted-foreground leading-relaxed">
              ⚠️ <strong>Fontos:</strong> Szükséges egy ingyenes Discord fiók regisztrálása és a fizetés után azzal tudsz csatlakozni a csoporthoz. Várunk szeretettel!
            </p>
            <a href="https://discord.com/download" target="_blank" rel="noopener noreferrer" className="inline-block text-xs text-primary hover:underline">
              Discord letöltése →
            </a>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Csatlakozas;
