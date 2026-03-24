import { useState, useMemo } from "react";
import { Search, ChevronDown, BookOpen } from "lucide-react";

const glossaryItems = [
  { term: "A rekord", badge: "DNS", def: "DNS bejegyzes, ami egy domain nevet egy konkret IP-cimhez (szerver cimehez) rendel. Ezzel mondod meg, melyik szerveren van a weboldalad." },
  { term: "API", badge: "Fejlesztes", def: "Application Programming Interface - ket szoftver kozotti kommunikacios nyelv. Peldaul igy kuld adatot a Lovable a Supabase-nek." },
  { term: "Backend", badge: "Webfejlesztes", def: "A weboldal hatterben futo resze - adatbazis, szerverlogika, felhasznalo-kezeles. Nem lathato a felhasznalo szamara." },
  { term: "Bongeszo", badge: "Alap", def: "A program, amivel weboldalakat nezel (Chrome, Firefox, Safari, Edge). A bongeszo jeleníti meg a weboldalak tartalmat." },
  { term: "CMS", badge: "Platform", def: "Content Management System - tartalomkezelo rendszer, pl. WordPress. Lehetove teszi weboldalak kezeleset programozas nelkul." },
  { term: "CTA", badge: "Marketing", def: "Call to Action - cselekvesre osztonzo elem, pl. Vedd meg most!, Regisztralj gomb. A weboldal legfontosabb interakcios eleme." },
  { term: "CSS", badge: "Kod", def: "Cascading Style Sheets - a weboldal oltozeke. Ez hatarozza meg a szineket, betutipusokat, elrendezest es megjelenest." },
  { term: "DNS", badge: "Halozat", def: "Domain Name System - az internet telefonkonyve. A domain neveket (pelda.hu) leforditja IP-cimekre (szamsorokra), amit a szamitogepek megertenek." },
  { term: "Domain", badge: "Alap", def: "A weboldalad egyedi neve/cime az interneten (pl. pelda.hu). Ezt gepeli be a latogato a bongeszojebe." },
  { term: "Edge Function", badge: "Supabase", def: "Szerver nelkuli hatter-kod, ami a felhoben fut. Idealis e-mail kuldesre, fizetes-feldolgozasra, vagy API hivasokra." },
  { term: "Frontend", badge: "Webfejlesztes", def: "A weboldal vitrine - minden, amit a latogato lat es hasznal: design, gombok, szovegek, kepek, animaciok." },
  { term: "GA4", badge: "Analytics", def: "Google Analytics 4 - a Google ingyenes statisztikai eszkooze, amellyel a weboldalad latogatoit kovetheted nyomon (hanyan jonnek, honnan, mit csinalnak)." },
  { term: "GSC", badge: "SEO", def: "Google Search Console - ingyenes eszkoz, amivel megnezheted, hogyan teljesit a weboldalad a Google keresoben." },
  { term: "Hosting", badge: "Infrastruktura", def: "Tarhelyszolgaltatas - a szerver, ahol a weboldalad fajljai laknak es az interneten elerhetok. A Lovable Cloud ezt automatikusan biztositja." },
  { term: "HTML", badge: "Kod", def: "HyperText Markup Language - a weboldal csontváza. Ez hatarozza meg a weboldal szerkezetet (cimsorok, bekezdesek, kepek, linkek)." },
  { term: "HTTPS/SSL", badge: "Biztonsag", def: "Titkositott kapcsolat a bongeszo es a szerver kozott. A bongeszeben lakat ikonnal jelolik. A Lovable automatikusan biztositja minden weboldalhoz." },
  { term: "JavaScript", badge: "Kod", def: "Programozasi nyelv, ami a weboldalakat interaktivva teszi (gombok, animaciok, urlapok). A Lovable React-et hasznal, ami JavaScript-re epul." },
  { term: "JSON-LD", badge: "SEO", def: "Strukturalt adat formatum, amivel a Google-nek extra informaciokat adsz a weboldaladrol (pl. ceg neve, cime, nyitvatartas)." },
  { term: "Kulcsszo", badge: "SEO", def: "Az a szo vagy kifejezes, amire a celkozponseged keres a Google-ben. A jo SEO alapja: a megfelelo kulcsszavak hasznalata a weboldalad szovegeiben." },
  { term: "Meta tag", badge: "SEO", def: "A weboldal fejleceben elhelyezett rejtett informacio, ami a keresomotoroknak es a kozossegi medianak szol (cim, leiras, kep)." },
  { term: "Open Graph", badge: "Kozossegi", def: "Meta tag szabvany, ami meghatarozza, hogyan jelenik meg a weboldalad, ha megosztjak Facebookon, LinkedInen vagy mas kozossegi platformon." },
  { term: "PostgreSQL", badge: "Adatbazis", def: "Nyilt forraskodu adatbazis-kezelo rendszer. A Supabase (es igy a Lovable) ezt hasznalja az adatok tarolasara." },
  { term: "Prompt", badge: "AI", def: "Az AI-nak adott szoveges utasitas. Minel reszletesebb es pontosabb, annal jobb eredmenyt kapsz a Lovable-tol." },
  { term: "React", badge: "Kod", def: "Nepszeru JavaScript konyvtar weboldalak epiteshez. A Lovable ezt hasznalja a weboldalad kodjanak generálásához." },
  { term: "Reszponziv", badge: "Design", def: "Alkalmazkodo megjelenes - a weboldal automatikusan igazodik a kepernyo meretehez (telefon, tablet, monitor)." },
  { term: "Robots.txt", badge: "SEO", def: "Szoveges fajl, ami megmondja a keresorobotoknak, melyik oldalakat indexelhetik es melyeket ne." },
  { term: "SEO", badge: "Marketing", def: "Search Engine Optimization - keresooptimalizalas. Az a folyamat, amivel elered, hogy a Google-ben magasabban jelenjen meg a weboldalad." },
  { term: "Sitemap", badge: "SEO", def: "XML fajl, ami a weboldalad osszes oldalat felsorolja. Segiti a Google-t, hogy megtalálja es indexelje az oldalaidat." },
  { term: "SPA", badge: "Fejlesztes", def: "Single Page Application - egyoldalas alkalmazas. A weboldal egyetlen HTML oldalbol all, es JavaScript-tel tolti be a kulonbozo nezeteket. A Lovable ilyen oldalakat keszit." },
  { term: "Supabase", badge: "Backend", def: "Nyilt forraskodu backend-szolgaltatas (adatbazis, hitelesites, fajltarolas). A Lovable ezt hasznalja backend-kent, ha szukseged van ra." },
  { term: "TXT rekord", badge: "DNS", def: "DNS bejegyzes szoveges adatokkal. Leggyakrabban domain-verifikaciora hasznaljak (pl. Google Search Console, Lovable domain megerosites)." },
  { term: "URL", badge: "Alap", def: "Uniform Resource Locator - a weboldal pontos postacime (pl. https://pelda.hu/kapcsolat). Minden weboldalnak es aloldalnak sajat URL-je van." },
  { term: "UX/UI", badge: "Design", def: "UX = felhasznaloi elmeny (mennyire intuitiv, konnyu hasznalni). UI = felhasznaloi felulet (hogy nez ki, gombok, szinek, elrendezes)." },
  { term: "Webshop", badge: "E-kereskedelem", def: "Online aruhaz/bolt, ahol termekeket vagy szolgaltatasokat arulhatsz. Kosar, fizetes es rendeleskezeles funkciokkal." },
];

const categoryColors: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  "DNS": { bg: "rgba(59,130,246,0.10)", text: "#60a5fa", border: "rgba(59,130,246,0.25)", glow: "rgba(59,130,246,0.06)" },
  "Fejlesztes": { bg: "rgba(168,85,247,0.10)", text: "#c084fc", border: "rgba(168,85,247,0.25)", glow: "rgba(168,85,247,0.06)" },
  "Webfejlesztes": { bg: "rgba(168,85,247,0.10)", text: "#c084fc", border: "rgba(168,85,247,0.25)", glow: "rgba(168,85,247,0.06)" },
  "Alap": { bg: "rgba(34,211,238,0.10)", text: "#22d3ee", border: "rgba(34,211,238,0.25)", glow: "rgba(34,211,238,0.06)" },
  "Platform": { bg: "rgba(251,146,60,0.10)", text: "#fb923c", border: "rgba(251,146,60,0.25)", glow: "rgba(251,146,60,0.06)" },
  "Marketing": { bg: "rgba(244,63,94,0.10)", text: "#fb7185", border: "rgba(244,63,94,0.25)", glow: "rgba(244,63,94,0.06)" },
  "Kod": { bg: "rgba(52,211,153,0.10)", text: "#34d399", border: "rgba(52,211,153,0.25)", glow: "rgba(52,211,153,0.06)" },
  "Halozat": { bg: "rgba(59,130,246,0.10)", text: "#60a5fa", border: "rgba(59,130,246,0.25)", glow: "rgba(59,130,246,0.06)" },
  "Supabase": { bg: "rgba(52,211,153,0.10)", text: "#34d399", border: "rgba(52,211,153,0.25)", glow: "rgba(52,211,153,0.06)" },
  "Analytics": { bg: "rgba(251,191,36,0.10)", text: "#fbbf24", border: "rgba(251,191,36,0.25)", glow: "rgba(251,191,36,0.06)" },
  "SEO": { bg: "rgba(244,63,94,0.10)", text: "#fb7185", border: "rgba(244,63,94,0.25)", glow: "rgba(244,63,94,0.06)" },
  "Infrastruktura": { bg: "rgba(148,163,184,0.10)", text: "#94a3b8", border: "rgba(148,163,184,0.25)", glow: "rgba(148,163,184,0.06)" },
  "Biztonsag": { bg: "rgba(52,211,153,0.10)", text: "#34d399", border: "rgba(52,211,153,0.25)", glow: "rgba(52,211,153,0.06)" },
  "Kozossegi": { bg: "rgba(59,130,246,0.10)", text: "#60a5fa", border: "rgba(59,130,246,0.25)", glow: "rgba(59,130,246,0.06)" },
  "Adatbazis": { bg: "rgba(168,85,247,0.10)", text: "#c084fc", border: "rgba(168,85,247,0.25)", glow: "rgba(168,85,247,0.06)" },
  "AI": { bg: "rgba(34,211,238,0.10)", text: "#22d3ee", border: "rgba(34,211,238,0.25)", glow: "rgba(34,211,238,0.06)" },
  "Design": { bg: "rgba(251,146,60,0.10)", text: "#fb923c", border: "rgba(251,146,60,0.25)", glow: "rgba(251,146,60,0.06)" },
  "Backend": { bg: "rgba(52,211,153,0.10)", text: "#34d399", border: "rgba(52,211,153,0.25)", glow: "rgba(52,211,153,0.06)" },
  "E-kereskedelem": { bg: "rgba(251,191,36,0.10)", text: "#fbbf24", border: "rgba(251,191,36,0.25)", glow: "rgba(251,191,36,0.06)" },
};

const defaultColor = { bg: "rgba(148,163,184,0.10)", text: "#94a3b8", border: "rgba(148,163,184,0.25)", glow: "rgba(148,163,184,0.06)" };

const TutorialModule10 = () => {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

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
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-2">Fogalomtar</h2>
              <p className="text-muted-foreground">
                Az utmutatoban elofordulo osszes szakkifejezes magyarazata - egyszeru nyelven, abece-sorrendben.
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
              placeholder="Kereses a fogalmak kozott..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="tutorial-glossary-search-input"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm px-2"
              >
                Torles
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

        {/* Glossary Cards */}
        <div className="tutorial-fade-up">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Search size={32} className="mx-auto mb-3 opacity-40" />
              <p>Nincs talalat a keresesre.</p>
              <button
                onClick={() => {
                  setSearch("");
                  setActiveFilter(null);
                }}
                className="text-primary text-sm mt-2 hover:underline"
              >
                Szurok torlese
              </button>
            </div>
          ) : (
            <div className="tutorial-glossary-list">
              {filtered.map((item) => {
                const color = getColor(item.badge);
                const isExpanded = expandedCard === item.term;
                return (
                  <div
                    key={item.term}
                    className={`tutorial-glossary-item ${isExpanded ? "expanded" : ""}`}
                    style={{
                      borderLeftColor: color.border,
                      ...(isExpanded ? { background: color.glow } : {}),
                    }}
                    onClick={() => setExpandedCard(isExpanded ? null : item.term)}
                  >
                    <div className="tutorial-glossary-item-header">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <span className="tutorial-glossary-item-term">{item.term}</span>
                        <span
                          className="tutorial-glossary-item-badge"
                          style={{ background: color.bg, color: color.text, borderColor: color.border }}
                        >
                          {item.badge}
                        </span>
                      </div>
                      <ChevronDown
                        size={16}
                        className={`tutorial-glossary-chevron ${isExpanded ? "rotated" : ""}`}
                      />
                    </div>
                    <div className={`tutorial-glossary-item-def ${isExpanded ? "visible" : ""}`}>
                      {item.def}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Footer stat */}
          <div className="mt-6 pt-4 border-t border-border/10 text-center">
            <span className="text-xs text-muted-foreground/60">
              Osszesen {glossaryItems.length} fogalom &bull; {categories.length} kategoria
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TutorialModule10;