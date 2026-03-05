import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const Impresszum = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 hyper-glass border-0 border-b border-border/20">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft size={16} /> Főoldal
          </Link>
          <h1 className="text-lg font-bold glow-text">Impresszum</h1>
          <div className="w-20" />
        </div>
      </header>

      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <article className="hyper-glass rounded-2xl p-8 md:p-12 space-y-10">
            <h1 className="text-3xl md:text-4xl font-bold glow-text">Impresszum</h1>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-foreground">Kiadó és Üzemeltető</h2>
              <div className="space-y-2 text-sm text-foreground/80 leading-relaxed">
                <p><strong className="text-foreground">Név:</strong> Affilion AI (Hivatalos cégadatok frissítés alatt)</p>
                <p><strong className="text-foreground">Székhely:</strong> Adatok frissítés alatt</p>
                <p><strong className="text-foreground">Adószám:</strong> Adatok frissítés alatt</p>
                <p><strong className="text-foreground">Kapcsolat:</strong> hello@affilion.ai</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-foreground">Tárhelyszolgáltató</h2>
              <div className="space-y-2 text-sm text-foreground/80 leading-relaxed">
                <p><strong className="text-foreground">Név:</strong> Rendszerfrissítés alatt</p>
                <p><strong className="text-foreground">Kapcsolat:</strong> Rendszerfrissítés alatt</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-foreground">Felelősségkizárás</h2>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Az Affilion AI weboldalon található promptok, automatizációs útmutatók és oktatóanyagok információs célokat szolgálnak. A mesterséges intelligencia modellek (Suno, Midjourney, ChatGPT stb.) frissítései és működési sajátosságai miatt a generált eredmények eltérhetnek a bemutatott példáktól. A tartalmak és útmutatók felhasználása kizárólag a látogató saját felelősségére történik.
              </p>
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Impresszum;
