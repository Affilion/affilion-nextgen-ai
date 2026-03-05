import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const Adatvedelem = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 hyper-glass border-0 border-b border-border/20">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft size={16} /> Főoldal
          </Link>
          <h1 className="text-lg font-bold glow-text">Adatvédelem</h1>
          <div className="w-20" />
        </div>
      </header>

      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <article className="hyper-glass rounded-2xl p-8 md:p-12 space-y-10">
            <h1 className="text-3xl md:text-4xl font-bold glow-text">Adatvédelmi Tájékoztató</h1>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-foreground">1. Az adatkezelő megnevezése</h2>
              <div className="space-y-2 text-sm text-foreground/80 leading-relaxed">
                <p><strong className="text-foreground">Adatkezelő neve:</strong> [Cégnév / Egyéni vállalkozó neve]</p>
                <p><strong className="text-foreground">Székhelye:</strong> [Irányítószám, Város, Utca, Házszám]</p>
                <p><strong className="text-foreground">E-mail:</strong> [email@pelda.hu]</p>
                <p><strong className="text-foreground">Telefon:</strong> [+36 XX XXX XXXX]</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-foreground">2. A kezelt adatok köre</h2>
              <p className="text-sm text-foreground/80 leading-relaxed">
                A weboldal használata során az alábbi személyes adatokat kezelhetjük:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-foreground/80 leading-relaxed pl-2">
                <li>Név (regisztrációkor megadott teljes név)</li>
                <li>E-mail cím</li>
                <li>Számlázási adatok (vásárlás esetén)</li>
                <li>IP-cím és böngészési adatok (cookie-k, analitika)</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-foreground">3. Az adatkezelés célja és jogalapja</h2>
              <div className="space-y-3 text-sm text-foreground/80 leading-relaxed">
                <p><strong className="text-foreground">Regisztráció és bejelentkezés:</strong> A felhasználó azonosítása, a szolgáltatás nyújtása. Jogalap: szerződés teljesítése (GDPR 6. cikk (1) bekezdés b) pont).</p>
                <p><strong className="text-foreground">Vásárlás és számlázás:</strong> A számla kiállítása és a fizetés feldolgozása. Jogalap: jogi kötelezettség teljesítése (GDPR 6. cikk (1) bekezdés c) pont).</p>
                <p><strong className="text-foreground">Hírlevél (ha van):</strong> Tájékoztatás új tartalmakról és ajánlatokról. Jogalap: az érintett hozzájárulása (GDPR 6. cikk (1) bekezdés a) pont).</p>
                <p><strong className="text-foreground">Weboldal működtetése:</strong> Technikai működés biztosítása, analitika. Jogalap: jogos érdek (GDPR 6. cikk (1) bekezdés f) pont).</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-foreground">4. Az adatok megőrzési ideje</h2>
              <ul className="list-disc list-inside space-y-1 text-sm text-foreground/80 leading-relaxed pl-2">
                <li>Regisztrációs adatok: a fiók törléséig</li>
                <li>Számlázási adatok: a jogszabály által előírt ideig (8 év)</li>
                <li>Cookie adatok: a cookie élettartamáig vagy visszavonásig</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-foreground">5. Adattovábbítás, adatfeldolgozók</h2>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Az adatkezelő az alábbi adatfeldolgozókat veheti igénybe:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-foreground/80 leading-relaxed pl-2">
                <li><strong className="text-foreground">Stripe, Inc.</strong> – fizetésfeldolgozás</li>
                <li><strong className="text-foreground">[Tárhelyszolgáltató neve]</strong> – szerverüzemeltetés</li>
                <li><strong className="text-foreground">[Számlázó rendszer neve]</strong> – online számlázás</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-foreground">6. Az érintettek jogai</h2>
              <p className="text-sm text-foreground/80 leading-relaxed">
                A felhasználó jogosult:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-foreground/80 leading-relaxed pl-2">
                <li>Tájékoztatást kérni a kezelt adatairól</li>
                <li>Adatai helyesbítését kérni</li>
                <li>Adatai törlését kérni („elfeledtetéshez való jog")</li>
                <li>Az adatkezelés korlátozását kérni</li>
                <li>Az adathordozhatósághoz való jogot gyakorolni</li>
                <li>Tiltakozni az adatkezelés ellen</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-foreground">7. Jogorvoslati lehetőségek</h2>
              <div className="space-y-2 text-sm text-foreground/80 leading-relaxed">
                <p>Amennyiben úgy érzi, hogy személyes adatainak kezelése jogsértő, panaszt tehet a Nemzeti Adatvédelmi és Információszabadság Hatóságnál:</p>
                <p><strong className="text-foreground">NAIH</strong></p>
                <p>Cím: 1055 Budapest, Falk Miksa utca 9-11.</p>
                <p>Telefon: +36 1 391 1400</p>
                <p>E-mail: ugyfelszolgalat@naih.hu</p>
                <p>Weboldal: <a href="https://naih.hu" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">naih.hu</a></p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-foreground">8. Cookie-k (sütik)</h2>
              <p className="text-sm text-foreground/80 leading-relaxed">
                A weboldal működéséhez elengedhetetlen és analitikai cookie-kat használ. A felhasználó a böngészője beállításaiban bármikor módosíthatja a cookie-k kezelésére vonatkozó beállításait.
              </p>
            </section>

            <div className="pt-4 border-t border-border/20">
              <p className="text-xs text-muted-foreground">
                Utolsó módosítás: 2026. március 5.
              </p>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Adatvedelem;
