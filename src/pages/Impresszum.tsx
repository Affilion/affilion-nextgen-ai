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
              <h2 className="text-xl md:text-2xl font-bold text-foreground">Szolgáltató adatai</h2>
              <div className="space-y-2 text-sm text-foreground/80 leading-relaxed">
                <p><strong className="text-foreground">Név:</strong> [Cégnév / Egyéni vállalkozó neve]</p>
                <p><strong className="text-foreground">Székhely:</strong> [Irányítószám, Város, Utca, Házszám]</p>
                <p><strong className="text-foreground">Adószám:</strong> [Adószám]</p>
                <p><strong className="text-foreground">Cégjegyzékszám:</strong> [Cégjegyzékszám]</p>
                <p><strong className="text-foreground">E-mail:</strong> [email@pelda.hu]</p>
                <p><strong className="text-foreground">Telefon:</strong> [+36 XX XXX XXXX]</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-foreground">Tárhelyszolgáltató</h2>
              <div className="space-y-2 text-sm text-foreground/80 leading-relaxed">
                <p><strong className="text-foreground">Név:</strong> [Tárhelyszolgáltató neve]</p>
                <p><strong className="text-foreground">Székhely:</strong> [Tárhelyszolgáltató címe]</p>
                <p><strong className="text-foreground">Weboldal:</strong> [Tárhelyszolgáltató weboldala]</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-foreground">Felügyeleti szerv</h2>
              <p className="text-sm text-foreground/80 leading-relaxed">
                [Illetékes felügyeleti szerv neve és elérhetősége, ha releváns.]
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-foreground">Szellemi tulajdon</h2>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Az Affilion AI weboldalon megjelenő tartalmak, szövegek, grafikai elemek, képek, logók és egyéb anyagok szerzői jogi védelem alatt állnak. Ezek bármilyen formában történő felhasználása kizárólag a szolgáltató előzetes írásbeli engedélyével lehetséges.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-foreground">Felelősségkizárás</h2>
              <p className="text-sm text-foreground/80 leading-relaxed">
                A szolgáltató fenntartja a jogot a weboldal tartalmának bármikori megváltoztatására előzetes értesítés nélkül. A weboldalon található információk kizárólag tájékoztató jellegűek, azok teljességéért és pontosságáért a szolgáltató felelősséget nem vállal.
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
