const glossaryItems = [
  { term: "A rekord", badge: "DNS", def: "DNS bejegyzés, ami egy domain nevét egy konkrét IP-címhez (szerver címéhez) rendel. Ezzel mondod meg, melyik szerveren van a weboldalad." },
  { term: "API", badge: "Fejlesztés", def: "Application Programming Interface — két szoftver közötti kommunikációs „nyelv”. Például így küld adatot a Lovable a Supabase-nek." },
  { term: "Backend", badge: "Webfejlesztés", def: "A weboldal háttérben futó része — adatbázis, szerverlogika, felhasználó-kezelés. Nem látható a felhasználó számára." },
  { term: "Böngésző", badge: "Alap", def: "A program, amivel weboldalakat nézel (Chrome, Firefox, Safari, Edge). A böngésző jeleníti még a weboldalak tartalmát." },
  { term: "CMS", badge: "Platform", def: "Content Management System — tartalomkezelő rendszer, pl. WordPress. Lehetővé teszi weboldalak kezelését programozás nélkül." },
  { term: "CTA", badge: "Marketing", def: "Call to Action — cselekvésre ösztönző elem, pl. „Vedd még most!”, „Regisztrálj” gomb. A weboldal legfontosabb interakciós eleme." },
  { term: "CSS", badge: "Kód", def: "Cascading Style Sheets — a weboldal „öltözéke”. Ez határozza még a színeket, betűtípusokat, elrendezést és megjelenést." },
  { term: "DNS", badge: "Hálózat", def: "Domain Name System — az internet „telefonkönyve”. A domain neveket (példa.hu) lefordítja IP-címekre (számsorokra), amit a számítógépek megértenek." },
  { term: "Domain", badge: "Alap", def: "A weboldalad egyedi neve/címe az interneten (pl. példa.hu). Ezt gépeli be a látogató a böngészőjébe." },
  { term: "Edge Function", badge: "Supabase", def: "Szerver nélküli háttér-kód, ami a felhőben fut. Ideális e-mail küldésre, fizetés-feldolgozásra, vagy API hívásokra." },
  { term: "Frontend", badge: "Webfejlesztés", def: "A weboldal „vitrine” — minden, amit a látogató lát és használ: design, gombok, szövegek, képek, animációk." },
  { term: "GA4", badge: "Analytics", def: "Google Analytics 4 — a Google ingyenes statisztikai eszköze, amellyel a weboldalad látogatóit követheted nyomon (hányan jönnek, honnan, mit csinálnak)." },
  { term: "GSC", badge: "SEO", def: "Google Search Console — ingyenes eszköz, amivel megnézheted, hogyan teljesít a weboldalad a Google keresőben." },
  { term: "Hosting", badge: "Infrastruktúra", def: "Tárhelyszolgáltatás — a szerver, ahol a weboldalad fájljai „laknak” és az interneten elérhetők. A Lovable Cloud ezt automatikusan biztosítja." },
  { term: "HTML", badge: "Kód", def: "HyperText Markup Language — a weboldal „csontváza”. Ez határozza még a weboldal szervezetet (címsorok, bekezdések, képek, linkek)." },
  { term: "HTTPS/SSL", badge: "Biztonság", def: "Titkosított kapcsolat a böngésző és a szerver között. A böngészőben lakat ikonnal jelölik. A Lovable automatikusan biztosítja minden weboldalhoz." },
  { term: "JavaScript", badge: "Kód", def: "Programozási nyelv, ami a weboldalakat interaktívvá teszi (gombok, animációk, űrlapok). A Lovable React-et használ, ami JavaScript-re épül." },
  { term: "JSON-LD", badge: "SEO", def: "Strukturált adat formátum, amivel a Google-nek extra információkat adsz a weboldaladról (pl. cég neve, címe, nyitvatartás)." },
  { term: "Kulcsszó", badge: "SEO", def: "Az a szó vagy kifejezés, amire a célközönséged keres a Google-ben. A jo SEO alapja: a megfelelő kulcsszavak használata a weboldalad szövegeiben." },
  { term: "Meta tag", badge: "SEO", def: "A weboldal fejlécében elhelyezett rejtett információ, ami a keresőmotoroknak és a közösségi médiának szól (cím, leírás, kép)." },
  { term: "Open Graph", badge: "Közösségi", def: "Meta tag szabvány, ami meghatározza, hogyan jelenik még a weboldalad, ha megosztják Facebookon, LinkedInen vagy más közösségi platformon." },
  { term: "PostgreSQL", badge: "Adatbázis", def: "Nyílt forráskódú adatbázis-kezelő rendszer. A Supabase (es így a Lovable) ezt használja az adatok tárolására." },
  { term: "Prompt", badge: "AI", def: "Az AI-nak adott szöveges utasítás. Minél részletesebb és pontosabb, annál jobb eredményt kapsz a Lovable-tol." },
  { term: "React", badge: "Kód", def: "Népszerű JavaScript könyvtár weboldalak epitésehez. A Lovable ezt használja a weboldalad kódjának generálásahoz." },
  { term: "Reszponzív", badge: "Design", def: "Alkalmazkodó megjelenés — a weboldal automatikusan igazodik a képernyő méretéhez (telefon, tablet, monitor)." },
  { term: "Robots.txt", badge: "SEO", def: "Szöveges fájl, ami megmondja a keresőrobotoknak, melyik oldalakat indexelhetik és melyeket ne." },
  { term: "SEO", badge: "Marketing", def: "Search Engine Optimization — keresőoptimalizálás. Az a folyamat, amivel eléred, hogy a Google-ben magasabban jelenjen még a weboldalad." },
  { term: "Sitemap", badge: "SEO", def: "XML fájl, ami a weboldalad összes oldalát felsorolja. Segíti a Google-t, hogy megtalálja és indexelje az oldalaidat." },
  { term: "SPA", badge: "Fejlesztés", def: "Single Page Application — egyoldalas alkalmazás. A weboldal egyetlen HTML oldalból áll, es JavaScript-tel tölti be a különböző nézeteket. A Lovable ilyen oldalakat készít." },
  { term: "Supabase", badge: "Backend", def: "Nyílt forráskódú backend-szolgáltatás (adatbázis, hitelesítés, fájltárolás). A Lovable ezt használja backend-kent, ha szükséged van rá." },
  { term: "TXT rekord", badge: "DNS", def: "DNS bejegyzés szöveges adatokkal. Leggyakrabban domain-verifikációra használják (pl. Google Search Console, Lovable domain megerősítés)." },
  { term: "URL", badge: "Alap", def: "Uniform Resource Locator — a weboldal pontos „postacíme” (pl. https://példa.hu/kapcsolat). Minden weboldalnak és aloldalnak saját URL-je van." },
  { term: "UX/UI", badge: "Design", def: "UX = felhasználói élmény (mennyire intuitív, könnyű használni). UI = felhasználói felület (hogy néz ki, gombok, színek, elrendezés)." },
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
          <p className="text-muted-foreground">Az útmutatóban előforduló összes szakkifejezés magyarázata &mdash; egyszerű nyelven, ábécé-sorrendben.</p>
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
