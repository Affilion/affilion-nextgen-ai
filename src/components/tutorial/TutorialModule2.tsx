import { useState } from "react";
import { Play } from "lucide-react";
import TutorialTipBox from "./TutorialTipBox";
import { DNSPanelMockup } from "./TutorialUIMockup";

const MODULE2_VIDEO_ID = "4Wa-1NegJa4";

const Module2Video = () => {
  const [playing, setPlaying] = useState(false);
  const origin = typeof window !== "undefined" ? encodeURIComponent(window.location.origin) : "";

  return (
    <div className="tutorial-hero-video" id="module2-video">
      <div className="tutorial-hero-video-inner" style={{ padding: 0, overflow: "hidden" }}>
        {playing ? (
          <iframe
            className="w-full h-full absolute inset-0"
            src={`https://www.youtube-nocookie.com/embed/${MODULE2_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1${origin ? `&origin=${origin}` : ""}`}
            title="Domain regisztráció lépésről lépésre"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <div className="relative w-full h-full cursor-pointer group" onClick={() => setPlaying(true)}>
            <img
              src={`https://img.youtube.com/vi/${MODULE2_VIDEO_ID}/maxresdefault.jpg`}
              alt="Domain regisztráció lépésről lépésre"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="tutorial-hero-video-play">
                <Play size={28} className="text-primary ml-1" fill="hsl(var(--primary))" fillOpacity={0.3} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const LOVABLE_URL = "https://lovable.dev/invite/PBZ4OPL";

const TutorialModule2 = () => {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 border-b border-border/20" id="module-2">
      <div className="max-w-[820px] mx-auto">
        <div className="mb-10 tutorial-fade-up">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            <span className="tutorial-label-line" /> Modul 2
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3">Domain Regisztráció</h2>
          <p className="text-muted-foreground">Foglald le a weboldalad nevét. A Rackhost.hu a legjobb magyar szolgáltató erre a célra.</p>
        </div>

        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Miért a Rackhost?</h3>
          <p className="text-muted-foreground mb-4">A <a href="https://www.rackhost.hu" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 decoration-primary/30 hover:decoration-primary transition-colors">Rackhost.hu</a> az egyik legmegbízhatóbb magyar domain regisztrátor. Előnyei:</p>
          <ul className="text-muted-foreground pl-6 space-y-1.5 list-disc mb-4 marker:text-primary">
            <li>Magyar nyelvű felület és ügyfélszolgálat</li>
            <li>Kifejezetten alacsony árak (.hu domain: 490 Ft/év!)</li>
            <li>Egyszerű DNS kezelőfelület</li>
            <li>Gyors regisztrációs folyamat</li>
            <li>Megbízható, évek óta működő szolgáltatás</li>
          </ul>
        </div>

        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Domain árak (2026)</h3>
          <div className="glass-card p-0 overflow-hidden">
            <table className="tutorial-price-table">
              <thead>
                <tr>
                  <th>Kiterjesztés</th>
                  <th>Regisztráció (nettó/év)</th>
                  <th>Hosszabbítás (nettó/év)</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr><td><strong className="text-foreground">.hu</strong></td><td className="tutorial-price-highlight">490 Ft/év</td><td>2 200 Ft/év</td><td><span className="tutorial-price-badge">Legjobb ár!</span></td></tr>
                <tr><td><strong className="text-foreground">.eu</strong></td><td className="tutorial-price-highlight">490 Ft/év</td><td>2 500 Ft/év</td><td><span className="tutorial-price-badge">EU-s opció</span></td></tr>
                <tr><td><strong className="text-foreground">.com</strong></td><td>6 000 Ft/év</td><td>6 000 Ft/év</td><td></td></tr>
                <tr><td><strong className="text-foreground">.org</strong></td><td>5 500 Ft/év</td><td>5 500 Ft/év</td><td></td></tr>
                <tr><td><strong className="text-foreground">.net</strong></td><td>7 000 Ft/év</td><td>7 000 Ft/év</td><td></td></tr>
                <tr><td><strong className="text-foreground">.de</strong></td><td>3 500 Ft/év</td><td>3 500 Ft/év</td><td></td></tr>
              </tbody>
            </table>
          </div>

          <TutorialTipBox variant="info" icon="💡" title="Tipp">
            <p>Ha magyar célközönségnek készül a weboldalad, a .hu domain a legjobb választás. Első évre mindössze 490 Ft (bruttó 622 Ft) &mdash; ez a legolcsóbb opció!</p>
          </TutorialTipBox>
        </div>

        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Regisztrációs lépések</h3>
          <ol className="tutorial-step-list">
            <li>Ellenőrizd, szabad-e a kívánt domain: menj a <a href="https://www.rackhost.hu" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 decoration-primary/30 hover:decoration-primary">rackhost.hu</a> oldalra és írd be a kereső mezőbe</li>
            <li>Ha szabad, tedd a kosárba és válaszd ki, hány évre szeretnéd regisztrálni</li>
            <li>Add még a számlázási adataidat (cég vagy magánszemély)</li>
            <li>Fogadd el az Általános Szerződési Feltételeket és kattints a &bdquo;Megrendel&rdquo; gombra</li>
            <li>A felhasználói fiókodban add még a tulajdonosi adatokat és fizess</li>
            <li><strong className="text-foreground">.hu domainnél:</strong> megerősítő e-mailt kapsz &mdash; erősítsd még a tulajdonjogot elektronikusan</li>
            <li>Várd még a regisztráció befejezését (.hu: ~3 munkanap, nemzetközi: ~24 óra)</li>
          </ol>

          <TutorialTipBox variant="warning" icon="⚠️" title="Fontos">
            <p>.hu domain esetén a tulajdonosi adatok megerősítése kötelező! Ha nem erositedd még időben, a regisztráció meghiúsulhat. Figyeld az e-mailjeidet.</p>
          </TutorialTipBox>

          <DNSPanelMockup />
          <span className="block text-center text-xs text-muted-foreground italic mt-3 mb-2">Illusztráció &mdash; a Rackhost DNS kezelőfelülete hasonlóan néz ki</span>

          <div className="mt-8">
            <TutorialVideoPlaceholder title="Domain regisztráció lépésről lépésre" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TutorialModule2;
