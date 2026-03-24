import TutorialAccordion from "./TutorialAccordion";

const faqItems = [
  {
    q: "Mennyibe kerül összesen egy weboldal elkészítése?",
    a: <>
      <p className="text-muted-foreground mb-2">Az abszolút minimum: egy <strong className="text-foreground">.hu domain (622 Ft/év bruttó)</strong> + <strong className="text-foreground">Lovable Free csomag ($0)</strong>. Tehát akár <strong className="text-foreground">622 forintból</strong> elindulhatsz!</p>
      <p className="text-muted-foreground">Ha saját domaint szeretnél használni (nem lovable.app aldomain), szükséged lesz a <strong className="text-foreground">Lovable Pro csomagra ($25/hó, ~9 500 Ft)</strong>. A Google Analytics és Search Console teljesen ingyenes. Összehasonlításképpen: egy programozóval készíttetett weboldal 200 000 - 2 000 000 Ft, egy WordPress fejlesztés 50 000 - 500 000 Ft.</p>
    </>,
  },
  {
    q: "Kell-e programozói tudás a Lovable hasznalataahoz?",
    a: <>
      <p className="text-muted-foreground mb-2"><strong className="text-foreground">Egyáltalán nem!</strong> A Lovable lényege éppen az, hogy természetes nyelven (magyarul vagy angolul) írod le, mit szeretnél, és az AI megcsinálja. Nem kell tudnod HTML-t, CSS-t, JavaScript-et, vagy bármi mást. Elég, ha el tudod mondani, milyen weboldalt képzelsz el.</p>
      <p className="text-muted-foreground">Persze, ha van némi technikai háttérismereted, az segíthet pontosabb promptokat írni &mdash; de nem feltétel!</p>
    </>,
  },
  {
    q: "Mi történik, ha lemondom a Lovable elofizetesst?",
    a: <>
      <p className="text-muted-foreground mb-2">Ha lemondod a fizetős csomagodat:</p>
      <ul className="text-muted-foreground pl-5 space-y-1 list-disc">
        <li>A weboldalad tovaabbra is elérhető marad a Lovable Cloud-on</li>
        <li>A saját domain beállítás megszűnhet (visszaáll a lovable.app aldomainre)</li>
        <li>Nem tudsz majd szerkeszteni a feluln az ingyenes krediteken túl</li>
        <li>A forráskód megmarad &mdash; ha bekapcsoltad a GitHub sync-et, minden mentésre kerül</li>
      </ul>
      <p className="text-muted-foreground mt-2"><strong className="text-foreground">Tipp:</strong> Mielőtt lemondanád, kapcsold be a GitHub szinkront, hogy a teljes kódod biztonsaagban legyen!</p>
    </>,
  },
  {
    q: "Tudom-e később módosítani a weboldalamat?",
    a: <p className="text-muted-foreground"><strong className="text-foreground">Igen, bármikor!</strong> Ez a Lovable egyik legnagyobb előnye. Egyszerűen írd be, mit szeretnél változtatni: &bdquo;Cseréld ki a hero szekció háttérszínét kékre&rdquo; vagy &bdquo;Add hozzá egy új Szolgáltatások oldalt&rdquo;. Az AI végrehajtja a módosítást, és ha nem tetszik, egy kattintással visszaléphetsz az előző verzióra.</p>,
  },
  {
    q: "Biztonságos a Lovable? Mi van az adataimmal?",
    a: <>
      <p className="text-muted-foreground mb-2">A Lovable komolyan veszi a biztonságot:</p>
      <ul className="text-muted-foreground pl-5 space-y-1 list-disc">
        <li><strong className="text-foreground">SOC 2 Type 2</strong> tanúsítvány &mdash; nemzetközi biztonsági audit</li>
        <li><strong className="text-foreground">ISO 27001</strong> tanúsítvány &mdash; informacioobiztonsagi szabvány</li>
        <li>Automatikus <strong className="text-foreground">SSL/HTTPS</strong> minden weboldalon</li>
        <li>A Supabase adatbázis szintén titkosított és biztonsági auditált</li>
      </ul>
      <p className="text-muted-foreground mt-2">Az adataidat nem használják a modell tanítására, és bármikor törölheted a fiókodat és a projektjeidet.</p>
    </>,
  },
  {
    q: "Mennyi idő alatt készül el egy weboldal?",
    a: <>
      <p className="text-muted-foreground mb-2">Ez a weboldal komplexitásától függ:</p>
      <ul className="text-muted-foreground pl-5 space-y-1 list-disc">
        <li><strong className="text-foreground">Egyszerű bemutatkozó oldal:</strong> 1-2 óra</li>
        <li><strong className="text-foreground">Több oldalas céges weboldal:</strong> 3-5 óra</li>
        <li><strong className="text-foreground">Webshop alapokkal:</strong> 5-8 óra</li>
        <li><strong className="text-foreground">Komplex webapp (bejelentkezés, adatbázis):</strong> 1-2 nap</li>
      </ul>
      <p className="text-muted-foreground mt-2">A domain regisztráció (+DNS propagáció) még 1-3 napot igenyalhet. De maga a weboldalépítés meglepően gyors a Lovable-lel!</p>
    </>,
  },
  {
    q: "Mi az a Supabase és szükségem van rá?",
    a: <>
      <p className="text-muted-foreground mb-2">A <strong className="text-foreground">Supabase</strong> egy nyílt forráskódú backend-szolgáltatás (adatbázis, felhasználó-kezelés, fájltárolás). A Lovable ezt használja háttérrendszerként.</p>
      <p className="text-muted-foreground mb-2"><strong className="text-foreground">Szükséged van rá, ha:</strong> a weboldaladnak adatokat kell kezelnie &mdash; például űrlap beküldés mentése, felhasználói regisztráció, kép feltöltés, blog adminisztráció, webshop.</p>
      <p className="text-muted-foreground mb-2"><strong className="text-foreground">Nem kell, ha:</strong> egyszerű, statikus bemutatkozó/portfólió oldalt építesz szövegekkel és képekkel.</p>
      <p className="text-muted-foreground">A Lovable-ből egy kattintással aktiválhatod &mdash; nem kell külön regisztrálnod.</p>
    </>,
  },
  {
    q: "Hogyan tudok segítséget kérni, ha elakadok?",
    a: <>
      <p className="text-muted-foreground mb-2">Több lehetőséged is van:</p>
      <ul className="text-muted-foreground pl-5 space-y-1 list-disc">
        <li><strong className="text-foreground">Lovable Discord közösség:</strong> Több ezer felhasználó, gyors segítség angolul</li>
        <li><strong className="text-foreground">Lovable dokumentáció:</strong> Részletes angol nyelvű súgó a docs.lovable.dev oldalon</li>
        <li><strong className="text-foreground">Ez az útmutató:</strong> A modulok a leggyakoribb feladatokat részletesen tárgyalják</li>
        <li><strong className="text-foreground">AI chat a Lovable-ben:</strong> Kérdezd még az AI-t közvetlenül! Pl.: &bdquo;Hogyan adjak hozzá Google Analytics-et?&rdquo;</li>
      </ul>
    </>,
  },
  {
    q: "Átvihetem-e a weboldalamat másik platformra?",
    a: <>
      <p className="text-muted-foreground mb-2"><strong className="text-foreground">Igen!</strong> A Lovable egyik legnagyobb előnye, hogy a generált kód a tiéd. A GitHub szinkronnak köszönhetően a teljes React forrraskod elérhető a GitHub fiókodon. Ezt onnan bármelyik másik platformra (Netlify, Vercel, saját szerver) telepítheted.</p>
      <p className="text-muted-foreground">A domain is könnyen átvihető &mdash; egyszerűen aatlitod a DNS rekordokat az új tárhelyre.</p>
    </>,
  },
  {
    q: "Működik-e a weboldalam telefonon is?",
    a: <>
      <p className="text-muted-foreground mb-2"><strong className="text-foreground">Igen, automatikusan!</strong> A Lovable reszponzív (alkalmazkodó) kódot generál, ami telefonon, tableten és számítógépen is jól néz ki. A React és a modern CSS technológiák biztosítják, hogy az oldal minden eszkozooen megfelelően jelenjen még.</p>
      <p className="text-muted-foreground"><strong className="text-foreground">Tipp:</strong> Mindig ellenőrizd az előnézetben a mobil nézetet is! Ha valami nem stimmel, írd be: &bdquo;Fix the mobile layout&rdquo; és az AI javítja.</p>
    </>,
  },
];

const TutorialModule9 = () => {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 border-b border-border/20" id="module-9">
      <div className="max-w-[820px] mx-auto">
        <div className="mb-10 tutorial-fade-up">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            <span className="tutorial-label-line" /> Modul 9
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3">Gyakran Ismételt Kérdések (GYIK)</h2>
          <p className="text-muted-foreground">Összegyűjtöttük a leggyakoribb kérdéseket, amik a weboldal-építés során felmerülnek.</p>
        </div>

        <div className="tutorial-fade-up">
          {faqItems.map((item) => (
            <TutorialAccordion key={item.q} title={item.q}>
              {item.a}
            </TutorialAccordion>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TutorialModule9;
