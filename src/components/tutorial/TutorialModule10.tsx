const glossaryItems = [
  { term: "A rekord", badge: "DNS", def: "DNS bejegyzés, ami egy domain nevét egy konkrét IP-címhez (szerver címéhez) rendel. Ezzel mondod meg, melyik szerveren van a weboldalad." },
  { term: "API", badge: "Fejlesztés", def: "Application Programming Interface — két szoftver közötti kommunikációs „nyelv”. Például így küld adatot a Lovable a Supabase-nek." },
  { term: "Backend", badge: "Webfejlesztés", def: "A weboldal háttérben futó része — adatbázis, szerverlogika, felhasználó-kezeles. Nem látható a felhasználó számára." },
  { term: "Bongeszo", badge: "Alap", def: "A program, amivel weboldalakat nezel (Chrome, Firefox, Safari, Edge). A böngésző jeleníti meg a weboldalak tartalmat." },
  { term: "CMS", badge: "Platform", def: "Content Management System — tartalomkezelő rendszer, pl. WordPress. Lehetove teszi weboldalak kezeleset programozás nélkül." },
  { term: "CTA", badge: "Marketing", def: "Call to Action — cselekvesre osztonzo elem, pl. „Vedd meg most!”, „Regisztrálj” gomb. A weboldal legfontosabb interakcios eleme." },
  { term: "CSS", badge: "Kod", def: "Cascading Style Sheets — a weboldal „öltözéke”. Ez határozza meg a színeket, betűtípusokat, elrendezést és megjelenést." },
  { term: "DNS", badge: "Halozat", def: "Domain Name System — az internet „telefonkonyve”. A domain neveket (példa.hu) leforditja IP-cimekre (szamsorokra), amit a számítógépek megertenek." },
  { term: "Domain", badge: "Alap", def: "A weboldalad egyedi neve/cime az interneten (pl. példa.hu). Ezt gepeli be a látogató a bongeszojebe." },
  { term: "Edge Function", badge: "Supabase", def: "Szerver nelkuli háttér-kod, ami a felhoben fut. Idealis e-mail kuldesre, fizetés-feldolgozasra, vagy API hivasokra." },
  { term: "Frontend", badge: "Webfejlesztés", def: "A weboldal „vitrine” — minden, amit a látogató lát és használ: design, gombok, szövegek, képek, animációk." },
  { term: "GA4", badge: "Analytics", def: "Google Analytics 4 — a Google ingyenes statisztikai eszkoze, amellyel a weboldalad latogatoit kovetheted nyomon (hanyan jonnek, honnan, mit csinalnak)." },
  { term: "GSC", badge: "SEO", def: "Google Search Console — ingyenes eszkoz, amivel megnézheted, hogyan teljesit a weboldalad a Google keresoben." },
  { term: "Hosting", badge: "Infrastruktúra", def: "Tárhelyszolgáltatás — a szerver, ahol a weboldalad fájljai „laknak” és az interneten elérhetők. A Lovable Cloud ezt automatikusan biztosítja." },
  { term: "HTML", badge: "Kod", def: "HyperText Markup Language — a weboldal „csontvaza”. Ez határozza meg a weboldal szervezetet (cimsorok, bekezdesek, képek, linkek)." },
  { term: "HTTPS/SSL", badge: "Biztonság", def: "Titkosított kapcsolat a böngésző és a szerver között. A böngészőben lakat ikonnal jelölik. A Lovable automatikusan biztosítja minden weboldalhoz." },
  { term: "JavaScript", badge: "Kod", def: "Programozasi nyelv, ami a weboldalakat interaktivva teszi (gombok, animációk, urlapok). A Lovable React-et használ, ami JavaScript-re epul." },
  { term: "JSON-LD", badge: "SEO", def: "Strukturalt adat formatum, amivel a Google-nek extra informaciokat adsz a weboldaladrol (pl. cég neve, címe, nyitvatartas)." },
  { term: "Kulcsszo", badge: "SEO", def: "Az a szo vagy kifejezes, amire a celkozonseged keres a Google-ben. A jo SEO alapja: a megfelelő kulcsszavak használata a weboldalad szovegeiben." },
  { term: "Meta tag", badge: "SEO", def: "A weboldal fejlécében elhelyezett rejtett információ, ami a keresőmotoroknak és a közösségi médiának szól (cím, leírás, kép)." },
  { term: "Open Graph", badge: "Kozossegi", def: "Meta tag szabvany, ami meghatarozza, hogyan jelenik meg a weboldalad, ha megosztjak Facebookon, LinkedInen vagy mas közösségi platformon." },
  { term: "PostgreSQL", badge: "Adatbázis", def: "Nyilt forraskodu adatbázis-kezelo rendszer. A Supabase (es így a Lovable) ezt hasznalja az adatok tarolasara." },
  { term: "Prompt", badge: "AI", def: "Az AI-nak adott szöveges utasítás. Minel részletesebb és pontosabb, annál jobb eredményt kapsz a Lovable-tol." },
  { term: "React", badge: "Kod", def: "Nepszeru JavaScript konyvtar weboldalak epitésehez. A Lovable ezt hasznalja a weboldalad kodjanak generálásahoz." },
  { term: "Reszponzív", badge: "Design", def: "Alkalmazkodó megjelenés — a weboldal automatikusan igazodik a képernyő meretehez (telefon, tablet, monitor)." },
  { term: "Robots.txt", badge: "SEO", def: "Szöveges fájl, ami megmondja a keresorobotoknak, melyik oldalakat indexelhetik és melyeket ne." },
  { term: "SEO", badge: "Marketing", def: "Search Engine Optimization — keresooptimalizalas. Az a folyamat, amivel elered, hogy a Google-ben magasabban jelenjen meg a weboldalad." },
  { term: "Sitemap", badge: "SEO", def: "XML fájl, ami a weboldalad összes oldalát felsorolja. Segiti a Google-t, hogy megtalálja és indexelje az oldalaidat." },
  { term: "SPA", badge: "Fejlesztés", def: "Single Page Application — egyoldalas alkalmazás. A weboldal egyetlen HTML oldalból áll, es JavaScript-tel tölti be a különböző nézeteket. A Lovable ilyen oldalakat készít." },
  { term: "Supabase", badge: "Backend", def: "Nyilt forraskodu backend-szolgaltatas (adatbázis, hitelesítés, fajltarolas). A Lovable ezt hasznalja backend-kent, ha szükséged van ra." },
  { term: "TXT rekord", badge: "DNS", def: "DNS bejegyzés szöveges adatokkal. Leggyakrabban domain-verifikaciora hasznaljak (pl. Google Search Console, Lovable domain megerősítés)." },
  { term: "URL", badge: "Alap", def: "Uniform Resource Locator — a weboldal pontos „postacime” (pl. https://pelda.hu/kapcsolat). Minden weboldalnak és aloldalnak saját URL-je van." },
  { term: "UX/UI", badge: "Design", def: "UX = felhasználói elmeny (mennyire intuitiv, konnyu használni). UI = felhasználói felület (hogy nez ki, gombok, színek, elrendezes)." },
  { term: "Webshop", badge: "E-kereskedelem", def: "Online áruház/bolt, ahol termékeket vagy szolgáltatásokat árulhatsz. Kosár, fizetés és rendeléskezelés funkciókkal." },
];

const TutorialModule10 = () => {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 border-b border-border/20" id="module-10">
      <div className="max-w-[820px] mx-auto">
        <div className="mb-10 tutorial-fade-up">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            <span className="tutorial-label-line" /> Modul 10
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3">Fogalomtár</h2>
          <p className="text-muted-foreground">Az útmutatóban elofordulo összes szakkifejezes magyarazata &mdash; egyszerű nyelven, abece-sorrendben.</p>
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
