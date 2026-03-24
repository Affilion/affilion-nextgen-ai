import { useState, useMemo } from "react";
import { Search, BookOpen } from "lucide-react";

const glossaryItems = [
  { term: "A rekord", badge: "DNS", def: "DNS bejegyzés, ami egy domain nevét egy konkrét IP-címhez (szerver címéhez) rendel. Ezzel mondod meg, melyik szerveren van a weboldalad." },
  { term: "AI", badge: "AI", def: "Artificial Intelligence — mesterséges intelligencia. Számítógép által végzett 'okos' műveletek, pl. szöveggenerálás, képfelismerés. A Lovable AI-t használ a kód generálásához." },
  { term: "API", badge: "Fejlesztés", def: "Application Programming Interface — két szoftver közötti kommunikációs 'nyelv'. Például így küld adatot a Lovable a Supabase-nek." },
  { term: "Backend", badge: "Webfejlesztés", def: "A weboldal háttérben futó része — adatbázis, szerverlogika, felhasználó-kezelés. Nem látható a felhasználó számára." },
  { term: "Böngésző", badge: "Alap", def: "A program, amivel weboldalakat nézel (Chrome, Firefox, Safari, Edge). A böngésző jeleníti meg a weboldalak tartalmát." },
  { term: "Cache", badge: "Teljesítmény", def: "A böngésző által ideiglenesen tárolt adatok (képek, fájlok), hogy a weboldal gyorsabban töltődjön be legközelebb. Néha törölni kell, ha a változtatások nem jelennek meg." },
  { term: "CMS", badge: "Platform", def: "Content Management System — tartalomkezelő rendszer, pl. WordPress. Lehetővé teszi weboldalak kezelését programozás nélkül." },
  { term: "Cookie", badge: "Biztonság", def: "Kis szöveges fájl, amit a weboldal a látogató böngészőjében tárol. Használják bejelentkezési adatok megjegyzésére, statisztikákra és hirdetéskövetésre." },
  { term: "CTA", badge: "Marketing", def: "Call to Action — cselekvésre ösztönző elem, pl. 'Vedd meg most!', 'Regisztrálj' gomb. A weboldal legfontosabb interakciós eleme." },
  { term: "CSS", badge: "Kód", def: "Cascading Style Sheets — a weboldal 'öltözéke'. Ez határozza meg a színeket, betűtípusokat, elrendezést és megjelenést." },
  { term: "Deploy", badge: "Fejlesztés", def: "A weboldal 'élesítése' — amikor a kész kódot feltöltöd a szerverre és bárki számára elérhetővé teszed az interneten. A Lovable-ben egy gombnyomással megteheted." },
  { term: "DNS", badge: "Hálózat", def: "Domain Name System — az internet 'telefonkönyve'. A domain neveket (pelda.hu) lefordítja IP-címekre (számsorokra), amit a számítógépek megértenek." },
  { term: "Domain", badge: "Alap", def: "A weboldalad egyedi neve/címe az interneten (pl. pelda.hu). Ezt gépeli be a látogató a böngészőjébe." },
  { term: "Edge Function", badge: "Supabase", def: "Szerver nélküli háttér-kód, ami a felhőben fut. Ideális e-mail küldésre, fizetés-feldolgozásra, vagy API hívásokra." },
  { term: "Favicon", badge: "Design", def: "A kis ikon, ami a böngésző fülecskéjében jelenik meg a weboldal neve mellett. Általában 32x32 pixeles kép, ami segít felismerni az oldalad." },
  { term: "Frontend", badge: "Webfejlesztés", def: "A weboldal 'vitrine' — minden, amit a látogató lát és használ: design, gombok, szövegek, képek, animációk." },
  { term: "GA4", badge: "Analytics", def: "Google Analytics 4 — a Google ingyenes statisztikai eszköze, amellyel a weboldalad látogatóit követheted nyomon (hányan jönnek, honnan, mit csinálnak)." },
  { term: "Git/GitHub", badge: "Fejlesztés", def: "Verziókezelő rendszer (Git) és annak webes platformja (GitHub). Tárolja a kódod történetét és lehetővé teszi a csapatmunkát. A Lovable automatikusan GitHub-ot használ." },
  { term: "GSC", badge: "SEO", def: "Google Search Console — ingyenes eszköz, amivel megnézheted, hogyan teljesít a weboldalad a Google keresőben." },
  { term: "Hosting", badge: "Infrastruktúra", def: "Tárhelyszolgáltatás — a szerver, ahol a weboldalad fájljai 'laknak' és az interneten elérhetők. A Lovable Cloud ezt automatikusan biztosítja." },
  { term: "HTML", badge: "Kód", def: "HyperText Markup Language — a weboldal 'csontváza'. Ez határozza meg a weboldal szerkezetét (címsorok, bekezdések, képek, linkek)." },
  { term: "HTTPS/SSL", badge: "Biztonság", def: "Titkosított kapcsolat a böngésző és a szerver között. A böngészőben lakat ikonnal jelölik. A Lovable automatikusan biztosítja minden weboldalhoz." },
  { term: "IP-cím", badge: "Hálózat", def: "Egyedi számsor (pl. 192.168.1.1), ami azonosítja a számítógépeket az interneten. Minden szerver, ami weboldalakat szolgál ki, rendelkezik IP-címmel." },
  { term: "JavaScript", badge: "Kód", def: "Programozási nyelv, ami a weboldalakat interaktívvá teszi (gombok, animációk, űrlapok). A Lovable React-et használ, ami JavaScript-re épül." },
  { term: "JSON-LD", badge: "SEO", def: "Strukturált adat formátum, amivel a Google-nek extra információkat adsz a weboldaladról (pl. cég neve, címe, nyitvatartás)." },
  { term: "Kulcsszó", badge: "SEO", def: "Az a szó vagy kifejezés, amire a célközönséged keres a Google-ben. A jó SEO alapja: a megfelelő kulcsszavak használata a weboldalad szövegeiben." },
  { term: "Landing Page", badge: "Marketing", def: "Céloldal — egyetlen oldalból álló weboldal, ami egy konkrét célra készül (pl. termék bemutatása, feliratkozás gyűjtése). A legfontosabb eleme a CTA gomb." },
  { term: "Meta tag", badge: "SEO", def: "A weboldal fejlécében elhelyezett rejtett információ, ami a keresőmotoroknak és a közösségi médiának szól (cím, leírás, kép)." },
  { term: "Navigáció", badge: "Design", def: "A weboldal menürendszere — az a rész, ahol a látogató az oldalak között tud mozogni. Általában az oldal tetején, néha oldalt (hamburger menü mobilon)." },
  { term: "Open Graph", badge: "Közösségi", def: "Meta tag szabvány, ami meghatározza, hogyan jelenik meg a weboldalad, ha megosztják Facebookon, LinkedInen vagy más közösségi platformon." },
  { term: "PostgreSQL", badge: "Adatbázis", def: "Nyílt forráskódú adatbázis-kezelő rendszer. A Supabase (és így a Lovable) ezt használja az adatok tárolására." },
  { term: "Prompt", badge: "AI", def: "Az AI-nak adott szöveges utasítás. Minél részletesebb és pontosabb, annál jobb eredményt kapsz a Lovable-től." },
  { term: "React", badge: "Kód", def: "Népszerű JavaScript könyvtár weboldalak építéséhez. A Lovable ezt használja a weboldalad kódjának generálásához." },
  { term: "Redirect", badge: "Hálózat", def: "Átirányítás — amikor egy URL automatikusan egy másik oldalra visz. Hasznos, ha megváltoztatod egy oldal címét, de a régi linknek is működnie kell." },
  { term: "Reszponzív", badge: "Design", def: "Alkalmazkodó megjelenés — a weboldal automatikusan igazodik a képernyő méretéhez (telefon, tablet, monitor)." },
  { term: "Robots.txt", badge: "SEO", def: "Szöveges fájl, ami megmondja a keresőrobotoknak, melyik oldalakat indexelhetik és melyeket ne." },
  { term: "SEO", badge: "Marketing", def: "Search Engine Optimization — keresőoptimalizálás. Az a folyamat, amivel eléred, hogy a Google-ben magasabban jelenjen meg a weboldalad." },
  { term: "Sitemap", badge: "SEO", def: "XML fájl, ami a weboldalad összes oldalát felsorolja. Segíti a Google-t, hogy megtalálja és indexelje az oldalaidat." },
  { term: "SPA", badge: "Fejlesztés", def: "Single Page Application — egyoldalas alkalmazás. A weboldal egyetlen HTML oldalból áll, és JavaScript-tel tölti be a különböző nézeteket. A Lovable ilyen oldalakat készít." },
  { term: "Supabase", badge: "Backend", def: "Nyílt forráskódú backend-szolgáltatás (adatbázis, hitelesítés, fájltárolás). A Lovable ezt használja backend-ként, ha szükséged van rá." },
  { term: "Tailwind CSS", badge: "Kód", def: "Modern CSS keretrendszer, ami előre elkészített stílusosztályokat kínál (pl. 'bg-blue-500', 'text-center'). A Lovable ezt használja a weboldalad kinézetének kialakításához." },
  { term: "TXT rekord", badge: "DNS", def: "DNS bejegyzés szöveges adatokkal. Leggyakrabban domain-verifikációra használják (pl. Google Search Console, Lovable domain megerősítés)." },
  { term: "TypeScript", badge: "Kód", def: "A JavaScript bővített változata, ami típusbiztonságot ad a kódhoz. A Lovable TypeScript-et használ, ami kevesebb hibát és jobb fejlesztői élményt eredményez." },
  { term: "URL", badge: "Alap", def: "Uniform Resource Locator — a weboldal pontos 'postacíme' (pl. https://pelda.hu/kapcsolat). Minden weboldalnak és aloldalnak saját URL-je van." },
  { term: "UX/UI", badge: "Design", def: "UX = felhasználói élmény (mennyire intuitív, könnyű használni). UI = felhasználói felület (hogy néz ki, gombok, színek, elrendezés)." },
  { term: "Viewport", badge: "Design", def: "A böngészőablak látható területe, ahol a weboldal megjelenik. A reszponzív design a viewport méret alapján változtatja az elrendezést." },
  { term: "Webshop", badge: "E-kereskedelem", def: "Online áruház/bolt, ahol termékeket vagy szolgáltatásokat árulhatsz. Kosár, fizetés és rendeléskezelés funkciókkal." },
  { term: "Wireframe", badge: "Design", def: "A weboldal egyszerű vázlatos terve — fekete-fehér 'drótváz' rajz, ami megmutatja, hova kerülnek a szövegek, képek és gombok. Az építkezési tervrajzhoz hasonló." },
];

const categoryColors: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  "DNS": { bg: "rgba(59,130,246,0.10)", text: "#60a5fa", border: "rgba(59,130,246,0.25)", glow: "rgba(59,130,246,0.06)" },
  "Fejlesztés": { bg: "rgba(168,85,247,0.10)", text: "#c084fc", border: "rgba(168,85,247,0.25)", glow: "rgba(168,85,247,0.06)" },
  "Webfejlesztés": { bg: "rgba(168,85,247,0.10)", text: "#c084fc", border: "rgba(168,85,247,0.25)", glow: "rgba(168,85,247,0.06)" },
  "Alap": { bg: "rgba(34,211,238,0.10)", text: "#22d3ee", border: "rgba(34,211,238,0.25)", glow: "rgba(34,211,238,0.06)" },
  "Platform": { bg: "rgba(251,146,60,0.10)", text: "#fb923c", border: "rgba(251,146,60,0.25)", glow: "rgba(251,146,60,0.06)" },
  "Marketing": { bg: "rgba(244,63,94,0.10)", text: "#fb7185", border: "rgba(244,63,94,0.25)", glow: "rgba(244,63,94,0.06)" },
  "Kód": { bg: "rgba(52,211,153,0.10)", text: "#34d399", border: "rgba(52,211,153,0.25)", glow: "rgba(52,211,153,0.06)" },
  "Hálózat": { bg: "rgba(59,130,246,0.10)", text: "#60a5fa", border: "rgba(59,130,246,0.25)", glow: "rgba(59,130,246,0.06)" },
  "Supabase": { bg: "rgba(52,211,153,0.10)", text: "#34d399", border: "rgba(52,211,153,0.25)", glow: "rgba(52,211,153,0.06)" },
  "Analytics": { bg: "rgba(251,191,36,0.10)", text: "#fbbf24", border: "rgba(251,191,36,0.25)", glow: "rgba(251,191,36,0.06)" },
  "SEO": { bg: "rgba(244,63,94,0.10)", text: "#fb7185", border: "rgba(244,63,94,0.25)", glow: "rgba(244,63,94,0.06)" },
  "Infrastruktúra": { bg: "rgba(148,163,184,0.10)", text: "#94a3b8", border: "rgba(148,163,184,0.25)", glow: "rgba(148,163,184,0.06)" },
  "Biztonság": { bg: "rgba(52,211,153,0.10)", text: "#34d399", border: "rgba(52,211,153,0.25)", glow: "rgba(52,211,153,0.06)" },
  "Közösségi": { bg: "rgba(59,130,246,0.10)", text: "#60a5fa", border: "rgba(59,130,246,0.25)", glow: "rgba(59,130,246,0.06)" },
  "Adatbázis": { bg: "rgba(168,85,247,0.10)", text: "#c084fc", border: "rgba(168,85,247,0.25)", glow: "rgba(168,85,247,0.06)" },
  "AI": { bg: "rgba(34,211,238,0.10)", text: "#22d3ee", border: "rgba(34,211,238,0.25)", glow: "rgba(34,211,238,0.06)" },
  "Design": { bg: "rgba(251,146,60,0.10)", text: "#fb923c", border: "rgba(251,146,60,0.25)", glow: "rgba(251,146,60,0.06)" },
  "Backend": { bg: "rgba(52,211,153,0.10)", text: "#34d399", border: "rgba(52,211,153,0.25)", glow: "rgba(52,211,153,0.06)" },
  "E-kereskedelem": { bg: "rgba(251,191,36,0.10)", text: "#fbbf24", border: "rgba(251,191,36,0.25)", glow: "rgba(251,191,36,0.06)" },
  "Teljesítmény": { bg: "rgba(251,191,36,0.10)", text: "#fbbf24", border: "rgba(251,191,36,0.25)", glow: "rgba(251,191,36,0.06)" },
};

const defaultColor = { bg: "rgba(148,163,184,0.10)", text: "#94a3b8", border: "rgba(148,163,184,0.25)", glow: "rgba(148,163,184,0.06)" };

const TutorialModule10 = () => {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = [...new Set(glossaryItems.map((i) => i.badge))];
    return cats.sort();
  }, []);

  const filtered = useMemo(() => {
    return glossaryItems.filter((item) => {
      const matchesSearch =
        !search ||
        item.term.toLowerCase().includes(search.toLowerCase()) ||
        item.def.toLowerCase().includes(search.toLowerCase()) ||
        item.badge.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = !activeFilter || item.badge === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [search, activeFilter]);

  const getColor = (badge: string) => categoryColors[badge] || defaultColor;

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 border-b border-border/20" id="module-10">
      <div className="max-w-[900px] mx-auto">
        {/* Header */}
        <div className="mb-10 tutorial-fade-up">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            <span className="tutorial-label-line" /> Modul 10
          </div>
          <div className="flex items-start gap-4 mb-3">
            <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-xl bg-primary/[0.08] border border-primary/20 flex-shrink-0 mt-1">
              <BookOpen size={22} className="text-primary" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-2">Fogalomtár</h2>
              <p className="text-muted-foreground">
                Az útmutatóban előforduló összes szakkifejezés magyarázata &mdash; egyszerű nyelven, ábécé-sorrendben.
              </p>
            </div>
          </div>
        </div>

        {/* Search + Filter Bar */}
        <div className="tutorial-fade-up mb-8">
          <div className="tutorial-glossary-search-bar">
            <Search size={18} className="text-muted-foreground flex-shrink-0" />
            <input
              type="text"
              placeholder="Keresés a fogalmak között..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="tutorial-glossary-search-input"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm px-2"
              >
                Törlés
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setActiveFilter(null)}
              className={`tutorial-glossary-filter-pill ${!activeFilter ? "active" : ""}`}
            >
              Mind ({glossaryItems.length})
            </button>
            {categories.map((cat) => {
              const color = getColor(cat);
              const count = glossaryItems.filter((i) => i.badge === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(activeFilter === cat ? null : cat)}
                  className={`tutorial-glossary-filter-pill ${activeFilter === cat ? "active" : ""}`}
                  style={
                    activeFilter === cat
                      ? { background: color.bg, borderColor: color.border, color: color.text }
                      : {}
                  }
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Glossary Grid - tile/card layout */}
        <div className="tutorial-fade-up">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Search size={32} className="mx-auto mb-3 opacity-40" />
              <p>Nincs találat a keresésre.</p>
              <button
                onClick={() => {
                  setSearch("");
                  setActiveFilter(null);
                }}
                className="text-primary text-sm mt-2 hover:underline"
              >
                Szűrők törlése
              </button>
            </div>
          ) : (
            <div className="tutorial-glossary-grid">
              {filtered.map((item) => {
                const color = getColor(item.badge);
                return (
                  <div
                    key={item.term}
                    className="tutorial-glossary-card"
                    style={{ borderTopColor: color.border }}
                  >
                    <div className="tutorial-glossary-term">
                      {item.term}
                      <span
                        className="tutorial-glossary-badge"
                        style={{ background: color.bg, color: color.text, borderColor: color.border }}
                      >
                        {item.badge}
                      </span>
                    </div>
                    <div className="tutorial-glossary-def">{item.def}</div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Footer stat */}
          <div className="mt-6 pt-4 border-t border-border/10 text-center">
            <span className="text-xs text-muted-foreground/60">
              Összesen {glossaryItems.length} fogalom &bull; {categories.length} kategória
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TutorialModule10;
