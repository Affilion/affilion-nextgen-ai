import TutorialPromptBox from "./TutorialPromptBox";
import TutorialTipBox from "./TutorialTipBox";
import { GSCDashboardMockup, GA4DashboardMockup } from "./TutorialUIMockup";

const TutorialModule7 = () => {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 border-b border-border/20" id="module-7">
      <div className="max-w-[820px] mx-auto">
        <div className="mb-10 tutorial-fade-up">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            <span className="tutorial-label-line" /> Modul 7
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3">SEO, Analytics és Indexelés</h2>
          <p className="text-muted-foreground">Gondoskodj róla, hogy megtaláljanak a Google-ben, es kövesd nyomon a látogatóidat.</p>
        </div>

        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Mi az a SEO?</h3>
          <p className="text-muted-foreground">A <strong className="text-foreground">SEO</strong> (Search Engine Optimization = Keresőoptimalizálás) az a folyamat, amellyel eléred, hogy a weboldalad magasabb helyezést érjen el a Google találati listáján. Minél jobb a SEO-d, annál több ingyenes (organikus) látogató érkezik.</p>
        </div>

        {/* SEO Pillars */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">A SEO három pillére</h3>
          <p className="text-muted-foreground mb-4">A keresőoptimalizálás három fő területre oszlik. Mindháromra figyelned kell, ha azt szeretnéd, hogy a Google-ben elöl legyen az oldalad:</p>

          <div className="tutorial-seo-pillars">
            <div className="tutorial-seo-pillar">
              <div className="w-12 h-12 rounded-xl mx-auto mb-3.5 flex items-center justify-center text-2xl bg-blue-500/[0.12]">⚙️</div>
              <h4 className="font-heading font-bold mb-2">Technikai SEO</h4>
              <p className="text-sm text-muted-foreground mb-2">Megtalaalja-e a Google az oldaladat?</p>
              <ul className="list-none p-0 text-xs text-muted-foreground space-y-0.5">
                <li>Gyors betöltés (LCP &lt; 2.5s)</li>
                <li>Mobil-barát megjelenés</li>
                <li>SSL (HTTPS)</li>
                <li>Sitemap.xml + robots.txt</li>
                <li>Hibamentes kód</li>
              </ul>
            </div>
            <div className="tutorial-seo-pillar">
              <div className="w-12 h-12 rounded-xl mx-auto mb-3.5 flex items-center justify-center text-2xl bg-green-500/[0.12]">📝</div>
              <h4 className="font-heading font-bold mb-2">On-Page SEO</h4>
              <p className="text-sm text-muted-foreground mb-2">Mit mond az oldalad a Google-nek?</p>
              <ul className="list-none p-0 text-xs text-muted-foreground space-y-0.5">
                <li>Kulcsszavak a címben, szövegben</li>
                <li>Title tag, meta leírás</li>
                <li>Strukturált címsorok (H1-H3)</li>
                <li>Képek alt text-tel</li>
                <li>Értékes, eredeti tartalom</li>
              </ul>
            </div>
            <div className="tutorial-seo-pillar">
              <div className="w-12 h-12 rounded-xl mx-auto mb-3.5 flex items-center justify-center text-2xl bg-yellow-500/[0.12]">🔗</div>
              <h4 className="font-heading font-bold mb-2">Off-Page SEO</h4>
              <p className="text-sm text-muted-foreground mb-2">Ki linkel rád? Ki ajánl téged?</p>
              <ul className="list-none p-0 text-xs text-muted-foreground space-y-0.5">
                <li>Visszahivatkozások (backlink-ek)</li>
                <li>Google Cégem profil</li>
                <li>Közösségi média jelenlét</li>
                <li>Online katalógusok, listák</li>
                <li>Vendégcikkek más oldalakon</li>
              </ul>
            </div>
          </div>

          <TutorialTipBox variant="info" icon="💡" title="Kezdőknek">
            <p>Ne aggódj, ha ez sok! A Lovable a technikai SEO nagy részét automatikusan kezeli. A te dolgod főleg az on-page SEO: jó szövegek, kulcsszavak, es a meta tagek beállítása. Az off-page SEO idővel, a tartalom minőségével építhető.</p>
          </TutorialTipBox>
        </div>

        {/* On-Page SEO */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">On-Page SEO alapok</h3>
          <div className="glass-card p-0 overflow-hidden">
            <table className="tutorial-price-table">
              <thead>
                <tr><th>Elem</th><th>Szabály</th><th>Példa</th></tr>
              </thead>
              <tbody>
                <tr><td><strong className="text-foreground">Title tag</strong></td><td>Max 60 karakter, kulcsszó elöl</td><td className="text-green-400">Weboldal Készítés | CégNév</td></tr>
                <tr><td><strong className="text-foreground">Meta leírás</strong></td><td>140-160 karakter, CTA-val</td><td className="text-green-400">Modern weboldal készítés Budapesten. Kérjen ajánlatot!</td></tr>
                <tr><td><strong className="text-foreground">URL</strong></td><td>Rövid, beszédes, kötőjeles</td><td className="text-green-400">példa.hu/szolgáltatások</td></tr>
                <tr><td><strong className="text-foreground">H1 cím</strong></td><td>Oldalanként 1 db, kulcsszooval</td><td className="text-green-400">Professzionális Weboldal Készítés</td></tr>
                <tr><td><strong className="text-foreground">Alt text</strong></td><td>Minden képen, leíró jelleggel</td><td className="text-green-400">Modern iroda belső tere</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SEO promptok */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">SEO promptok a Lovable-hez</h3>
          <TutorialPromptBox label="Sitemap létrehozás">{`Create XML sitemap at /sitemap.xml listing áll public routes`}</TutorialPromptBox>
          <TutorialPromptBox label="Meta tagek">{`Create an SEOHead component using react-helmet-async. Add unique title, meta description, and Open Graph tags (og:title, og:description, og:image) to every page. Add self-referencing canonical tags to áll pages.`}</TutorialPromptBox>
          <TutorialPromptBox label="Robots.txt">{`Create a robots.txt file that allows áll crawlers and points to the sitemap.xml`}</TutorialPromptBox>
          <TutorialPromptBox label="Strukturált adatok">{`Add JSON-LD structured data (schema.org) for the homepage as a LocalBusiness or Organization with name, description, url, and contact info.`}</TutorialPromptBox>
        </div>

        {/* GSC */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Google Search Console beállítása</h3>
          <p className="text-muted-foreground mb-4">A <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 decoration-primary/30 hover:decoration-primary">Google Search Console</a> segítségével nyomon követheted, hogyan teljesít a weboldalad a Google keresooben.</p>
          <ol className="tutorial-step-list">
            <li>Nyisd még a <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 decoration-primary/30 hover:decoration-primary">search.google.com/search-console</a> oldalt</li>
            <li>Kattints a &bdquo;Property hozzáadása&rdquo; gombra &rarr; válaszd a &bdquo;Domain&rdquo; típust</li>
            <li>Írd be a domain nevedet (pl. sajatdomain.hu)</li>
            <li>Másold ki a verifikációs <strong className="text-foreground">TXT rekordot</strong></li>
            <li>Add hozzá a Rackhost DNS beállításaiban (ugyanúgy, mint a Lovable verifikaciónaal)</li>
            <li>Várj a verifikációra, majd küldd be a sitemap-et: <strong className="text-foreground">Sitemaps &rarr; add URL &rarr; /sitemap.xml &rarr; Submit</strong></li>
            <li>Használd az <strong className="text-foreground">URL Inspection</strong> eszközt &rarr; <strong className="text-foreground">Request Indexing</strong> a fontos oldalakra</li>
          </ol>

          <GSCDashboardMockup />
          <span className="block text-center text-xs text-muted-foreground italic mt-3 mb-2">Illusztráció &mdash; a Google Search Console Teljesítmény nézete</span>
        </div>

        {/* GA4 */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Google Analytics 4 beállítása</h3>
          <p className="text-muted-foreground mb-4">A <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 decoration-primary/30 hover:decoration-primary">Google Analytics 4</a> (GA4) segítségével részletes statisztikákat látsz a látogatóidról.</p>
          <ol className="tutorial-step-list">
            <li>Nyisd még az <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 decoration-primary/30 hover:decoration-primary">analytics.google.com</a> oldalt &rarr; Admin &rarr; Create Property</li>
            <li>Add meg a property nevét, országát (Magyarország) és időzónáját</li>
            <li>Hozz létre egy <strong className="text-foreground">Web Data Stream</strong>-et &rarr; add még a weboldalad URL-jet</li>
            <li>Másold ki a <strong className="text-foreground">Measurement ID</strong>-t (G-XXXXXXX formátum)</li>
            <li>A Lovable-ben add még ezt a promptot:</li>
          </ol>
          <TutorialPromptBox label="GA4 beillesztés prompt">{`Add Google Analytics 4 tracking to the site. Add the gtag.js script to the head section with measurement ID: G-XXXXXXXXX (replace with your actual ID). Make sure it tracks page views on route changes.`}</TutorialPromptBox>

          <TutorialTipBox variant="warning" icon="⚠️" title="Fontos: Data Retention beállítás">
            <p>Az Admin &rarr; Data Settings &rarr; Data Retention menüben állítsd a megőrzési időt <strong className="text-foreground">14 hónapra</strong>! Az alapértelmezett 2 hónap nagyon kevés az éves trendek elemzéséhez.</p>
          </TutorialTipBox>

          <div className="glass-card">
            <h4 className="font-heading font-semibold mb-2">Fontos metrikák, amiket érdemes figyelni:</h4>
            <ul className="text-muted-foreground pl-5 space-y-1 list-disc">
              <li><strong className="text-foreground">Felhasználók</strong> &mdash; hány egyedi látogató érkezett</li>
              <li><strong className="text-foreground">Munkamenetek</strong> &mdash; hányszor nyitották még az oldalt</li>
              <li><strong className="text-foreground">Visszafordulási arány</strong> &mdash; hányan léptek el azonnal</li>
              <li><strong className="text-foreground">Átlagos munkamenet időtartam</strong> &mdash; mennyi időt töltöttek</li>
              <li><strong className="text-foreground">Forgalmi források</strong> &mdash; honnan jönnek a látogatók (Google, közösségi média, direkt)</li>
            </ul>
          </div>

          <GA4DashboardMockup />
          <span className="block text-center text-xs text-muted-foreground italic mt-3 mb-2">Illusztráció &mdash; a Google Analytics 4 áttekintő nézete</span>
        </div>
      </div>
    </section>
  );
};

export default TutorialModule7;
