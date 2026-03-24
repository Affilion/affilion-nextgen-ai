const glossaryItems = [
  { term: "A rekord", badge: "DNS", def: "DNS bejegyzes, ami egy domain nevet egy konkret IP-cimhez (szerver cimehez) rendel. Ezzel mondod meg, melyik szerveren van a weboldalad." },
  { term: "API", badge: "Fejlesztes", def: "Application Programming Interface \u2014 ket szoftver kozotti kommunikacios \u201enyelv\u201d. Peldaul igy kuld adatot a Lovable a Supabase-nek." },
  { term: "Backend", badge: "Webfejlesztes", def: "A weboldal hatterben futo resze \u2014 adatbazis, szerverlogika, felhasznalo-kezeles. Nem lathato a felhasznalo szamara." },
  { term: "Bongeszo", badge: "Alap", def: "A program, amivel weboldalakat nezel (Chrome, Firefox, Safari, Edge). A bongeszo jeleníti meg a weboldalak tartalmat." },
  { term: "CMS", badge: "Platform", def: "Content Management System \u2014 tartalomkezelo rendszer, pl. WordPress. Lehetove teszi weboldalak kezeleset programozas nelkul." },
  { term: "CTA", badge: "Marketing", def: "Call to Action \u2014 cselekvesre osztonzo elem, pl. \u201eVedd meg most!\u201d, \u201eRegisztralj\u201d gomb. A weboldal legfontosabb interakcios eleme." },
  { term: "CSS", badge: "Kod", def: "Cascading Style Sheets \u2014 a weboldal \u201eoltozeke\u201d. Ez hatarozza meg a szineket, betutipusokat, elrendezest es megjelenest." },
  { term: "DNS", badge: "Halozat", def: "Domain Name System \u2014 az internet \u201etelefonkonyve\u201d. A domain neveket (pelda.hu) leforditja IP-cimekre (szamsorokra), amit a szamitogepek megertenek." },
  { term: "Domain", badge: "Alap", def: "A weboldalad egyedi neve/cime az interneten (pl. pelda.hu). Ezt gepeli be a latogato a bongeszojebe." },
  { term: "Edge Function", badge: "Supabase", def: "Szerver nelkuli hatter-kod, ami a felhoben fut. Idealis e-mail kuldesre, fizetes-feldolgozasra, vagy API hivasokra." },
  { term: "Frontend", badge: "Webfejlesztes", def: "A weboldal \u201evitrine\u201d \u2014 minden, amit a latogato lat es hasznal: design, gombok, szovegek, kepek, animaciok." },
  { term: "GA4", badge: "Analytics", def: "Google Analytics 4 \u2014 a Google ingyenes statisztikai eszkoze, amellyel a weboldalad latogatoit kovetheted nyomon (hanyan jonnek, honnan, mit csinalnak)." },
  { term: "GSC", badge: "SEO", def: "Google Search Console \u2014 ingyenes eszkoz, amivel megnezheted, hogyan teljesit a weboldalad a Google keresoben." },
  { term: "Hosting", badge: "Infrastruktura", def: "Tarhelyszolgaltatas \u2014 a szerver, ahol a weboldalad fajljai \u201elaknak\u201d es az interneten elerhetok. A Lovable Cloud ezt automatikusan biztositja." },
  { term: "HTML", badge: "Kod", def: "HyperText Markup Language \u2014 a weboldal \u201ecsontvaza\u201d. Ez hatarozza meg a weboldal szervezetet (cimsorok, bekezdesek, kepek, linkek)." },
  { term: "HTTPS/SSL", badge: "Biztonsag", def: "Titkositott kapcsolat a bongeszo es a szerver kozott. A bongeszoben lakat ikonnal jelolik. A Lovable automatikusan biztositja minden weboldalhoz." },
  { term: "JavaScript", badge: "Kod", def: "Programozasi nyelv, ami a weboldalakat interaktivva teszi (gombok, animaciok, urlapok). A Lovable React-et hasznal, ami JavaScript-re epul." },
  { term: "JSON-LD", badge: "SEO", def: "Strukturalt adat formatum, amivel a Google-nek extra informaciokat adsz a weboldaladrol (pl. ceg neve, cime, nyitvatartas)." },
  { term: "Kulcsszo", badge: "SEO", def: "Az a szo vagy kifejezes, amire a celkozonseged keres a Google-ben. A jo SEO alapja: a megfelelo kulcsszavak hasznalata a weboldalad szovegeiben." },
  { term: "Meta tag", badge: "SEO", def: "A weboldal fejleceben elhelyezett rejtett informacio, ami a keresomotoroknak es a kozossegi medianak szol (cim, leiras, kep)." },
  { term: "Open Graph", badge: "Kozossegi", def: "Meta tag szabvany, ami meghatarozza, hogyan jelenik meg a weboldalad, ha megosztjak Facebookon, LinkedInen vagy mas kozossegi platformon." },
  { term: "PostgreSQL", badge: "Adatbazis", def: "Nyilt forraskodu adatbazis-kezelo rendszer. A Supabase (es igy a Lovable) ezt hasznalja az adatok tarolasara." },
  { term: "Prompt", badge: "AI", def: "Az AI-nak adott szoveges utasitas. Minel reszletesebb es pontosabb, annal jobb eredmenyt kapsz a Lovable-tol." },
  { term: "React", badge: "Kod", def: "Nepszeru JavaScript konyvtar weboldalak epitésehez. A Lovable ezt hasznalja a weboldalad kodjanak generálásahoz." },
  { term: "Reszponziv", badge: "Design", def: "Alkalmazkodo megjelenes \u2014 a weboldal automatikusan igazodik a kepernyo meretehez (telefon, tablet, monitor)." },
  { term: "Robots.txt", badge: "SEO", def: "Szoveges fajl, ami megmondja a keresorobotoknak, melyik oldalakat indexelhetik es melyeket ne." },
  { term: "SEO", badge: "Marketing", def: "Search Engine Optimization \u2014 keresooptimalizalas. Az a folyamat, amivel elered, hogy a Google-ben magasabban jelenjen meg a weboldalad." },
  { term: "Sitemap", badge: "SEO", def: "XML fajl, ami a weboldalad osszes oldalat felsorolja. Segiti a Google-t, hogy megtalálja es indexelje az oldalaidat." },
  { term: "SPA", badge: "Fejlesztes", def: "Single Page Application \u2014 egyoldalas alkalmazas. A weboldal egyetlen HTML oldalbol all, es JavaScript-tel tolti be a kulonbozo nezeteket. A Lovable ilyen oldalakat keszit." },
  { term: "Supabase", badge: "Backend", def: "Nyilt forraskodu backend-szolgaltatas (adatbazis, hitelesites, fajltarolas). A Lovable ezt hasznalja backend-kent, ha szukseged van ra." },
  { term: "TXT rekord", badge: "DNS", def: "DNS bejegyzes szoveges adatokkal. Leggyakrabban domain-verifikaciora hasznaljak (pl. Google Search Console, Lovable domain megerosites)." },
  { term: "URL", badge: "Alap", def: "Uniform Resource Locator \u2014 a weboldal pontos \u201epostacime\u201d (pl. https://pelda.hu/kapcsolat). Minden weboldalnak es aloldalnak sajat URL-je van." },
  { term: "UX/UI", badge: "Design", def: "UX = felhasznaloi elmeny (mennyire intuitiv, konnyu hasznalni). UI = felhasznaloi felulet (hogy nez ki, gombok, szinek, elrendezes)." },
  { term: "Webshop", badge: "E-kereskedelem", def: "Online aruhaz/bolt, ahol termekeket vagy szolgaltatasokat arulhatsz. Kosar, fizetes es rendeléskezeles funkciokkal." },
];

const TutorialModule10 = () => {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 border-b border-border/20" id="module-10">
      <div className="max-w-[820px] mx-auto">
        <div className="mb-10 tutorial-fade-up">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            <span className="tutorial-label-line" /> Modul 10
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3">Fogalomtar</h2>
          <p className="text-muted-foreground">Az utmutatoban elofordulo osszes szakkifejezes magyarazata &mdash; egyszeru nyelven, abece-sorrendben.</p>
        </div>

        <div className="tutorial-fade-up">
          <div className="tutorial-glossary-grid">
            {glossaryItems.map((item) => (
              <div key={item.term} className="tutorial-glossary-card">
                <div className="tutorial-glossary-term">
                  {item.term} <span className="tutorial-glossary-badge">{item.badge}</span>
                </div>
                <div className="tutorial-glossary-def">{item.def}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TutorialModule10;
