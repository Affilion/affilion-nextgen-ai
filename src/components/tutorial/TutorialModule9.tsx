import TutorialAccordion from "./TutorialAccordion";

const faqItems = [
  {
    q: "Mennyibe kerul összesen egy weboldal elkészítése?",
    a: <>
      <p className="text-muted-foreground mb-2">Az abszolut minimum: egy <strong className="text-foreground">.hu domain (622 Ft/ev bruttó)</strong> + <strong className="text-foreground">Lovable Free csomag ($0)</strong>. Tehat akár <strong className="text-foreground">622 forintbol</strong> elindulhatsz!</p>
      <p className="text-muted-foreground">Ha saját domaint szeretnel használni (nem lovable.app aldomain), szükséged lesz a <strong className="text-foreground">Lovable Pro csomagra ($25/ho, ~9 500 Ft)</strong>. A Google Analytics és Search Console teljesen ingyenes. Osszehasonlitaskeppp: egy programozooval készíttetett weboldal 200 000 - 2 000 000 Ft, egy WordPress fejlesztés 50 000 - 500 000 Ft.</p>
    </>,
  },
  {
    q: "Kell-e programozói tudás a Lovable hasznalataahoz?",
    a: <>
      <p className="text-muted-foreground mb-2"><strong className="text-foreground">Egyaltalan nem!</strong> A Lovable lenyege éppen az, hogy termeszetes nyelven (magyarul vagy angolul) irod le, mit szeretnel, es az AI megcsinalja. Nem kell tudnod HTML-t, CSS-t, JavaScript-et, vagy bármi mast. Eleg, ha el tudod mondani, milyen weboldalt kepzelsz el.</p>
      <p className="text-muted-foreground">Persze, ha van nemi technikai hatterismereted, az segíthet pontosabb promptokat irni &mdash; de nem feltétel!</p>
    </>,
  },
  {
    q: "Mi történik, ha lemondom a Lovable elofizetesst?",
    a: <>
      <p className="text-muted-foreground mb-2">Ha lemondod a fizetos csomagodat:</p>
      <ul className="text-muted-foreground pl-5 space-y-1 list-disc">
        <li>A weboldalad tovaabbra is elérhető marad a Lovable Cloud-on</li>
        <li>A saját domain beállítás megszunhet (visszaall a lovable.app aldomainre)</li>
        <li>Nem tudsz majd szerkeszteni a feluln az ingyenes krediteken tul</li>
        <li>A forráskód megmarad &mdash; ha bekapcsoltad a GitHub sync-et, minden mentesre kerul</li>
      </ul>
      <p className="text-muted-foreground mt-2"><strong className="text-foreground">Tipp:</strong> Mielőtt lemondanad, kapcsold be a GitHub szinkront, hogy a teljes kodod biztonsaagban legyen!</p>
    </>,
  },
  {
    q: "Tudom-e később módosítani a weboldalamat?",
    a: <p className="text-muted-foreground"><strong className="text-foreground">Igen, bármikor!</strong> Ez a Lovable egyik legnagyobb előnye. Egyszeruen írd be, mit szeretnel változtatni: &bdquo;Csereld ki a hero szekció hatterszinet kekre&rdquo; vagy &bdquo;Add hozza egy új Szolgáltatások oldalt&rdquo;. Az AI vegrehajta a modositast, es ha nem tetszik, egy kattintással visszalephetsz az elozo verziora.</p>,
  },
  {
    q: "Biztonsagos a Lovable? Mi van az adataimmal?",
    a: <>
      <p className="text-muted-foreground mb-2">A Lovable komolyan veszi a biztonsagot:</p>
      <ul className="text-muted-foreground pl-5 space-y-1 list-disc">
        <li><strong className="text-foreground">SOC 2 Type 2</strong> tanúsítvány &mdash; nemzetközi biztonsági audit</li>
        <li><strong className="text-foreground">ISO 27001</strong> tanúsítvány &mdash; informacioobiztonsagi szabvany</li>
        <li>Automatikus <strong className="text-foreground">SSL/HTTPS</strong> minden weboldalon</li>
        <li>A Supabase adatbázis szinten titkosított és biztonsági auditalt</li>
      </ul>
      <p className="text-muted-foreground mt-2">Az adataidat nem hasznaljak a modell tanitasara, es bármikor törölheted a fiokodat és a projektjeidet.</p>
    </>,
  },
  {
    q: "Mennyi idő alatt készül el egy weboldal?",
    a: <>
      <p className="text-muted-foreground mb-2">Ez a weboldal komplexitasatol fugg:</p>
      <ul className="text-muted-foreground pl-5 space-y-1 list-disc">
        <li><strong className="text-foreground">Egyszerű bemutatkozó oldal:</strong> 1-2 óra</li>
        <li><strong className="text-foreground">Több oldalas ceges weboldal:</strong> 3-5 óra</li>
        <li><strong className="text-foreground">Webshop alapokkal:</strong> 5-8 óra</li>
        <li><strong className="text-foreground">Komplex webapp (bejelentkezés, adatbázis):</strong> 1-2 nap</li>
      </ul>
      <p className="text-muted-foreground mt-2">A domain regisztráció (+DNS propagacio) meg 1-3 napot igenyalhet. De maga a weboldalepites meglepoen gyors a Lovable-lel!</p>
    </>,
  },
  {
    q: "Mi az a Supabase és szuksegem van ra?",
    a: <>
      <p className="text-muted-foreground mb-2">A <strong className="text-foreground">Supabase</strong> egy nyilt forrraskodu backend-szolgaltatas (adatbázis, felhasználó-kezeles, fajltarolas). A Lovable ezt hasznalja hatterrendszerkent.</p>
      <p className="text-muted-foreground mb-2"><strong className="text-foreground">Szukseged van ra, ha:</strong> a weboldaladnak adatokat kell kezelnie &mdash; például űrlap bekuldes mentese, felhasználói regisztráció, kép feltoltes, blog adminisztráció, webshop.</p>
      <p className="text-muted-foreground mb-2"><strong className="text-foreground">Nem kell, ha:</strong> egyszerű, statikus bemutatkozó/portfolio oldalt epitesz szovegekkel és kepekkel.</p>
      <p className="text-muted-foreground">A Lovable-bol egy kattintással aktivalhatod &mdash; nem kell kulon regisztrlnod.</p>
    </>,
  },
  {
    q: "Hogyan tudok segítséget kerni, ha elakadok?",
    a: <>
      <p className="text-muted-foreground mb-2">Több lehetőséged is van:</p>
      <ul className="text-muted-foreground pl-5 space-y-1 list-disc">
        <li><strong className="text-foreground">Lovable Discord közösség:</strong> Több ezer felhasználó, gyors segítség angolul</li>
        <li><strong className="text-foreground">Lovable dokumentacio:</strong> Reszletes angol nyelvű sugo a docs.lovable.dev oldalon</li>
        <li><strong className="text-foreground">Ez az útmutató:</strong> A modulok a leggyakoribb feladatokat részletesen targyaljak</li>
        <li><strong className="text-foreground">AI chat a Lovable-ben:</strong> Kerdezd meg az AI-t közvetlenül! Pl.: &bdquo;Hogyan adjak hozza Google Analytics-et?&rdquo;</li>
      </ul>
    </>,
  },
  {
    q: "Atvihetem-e a weboldalamat másik platformra?",
    a: <>
      <p className="text-muted-foreground mb-2"><strong className="text-foreground">Igen!</strong> A Lovable egyik legnagyobb előnye, hogy a generált kód a tied. A GitHub szinkronnak koszonhetoen a teljes React forrraskod elérhető a GitHub fiokodon. Ezt onnan barmelyik másik platformra (Netlify, Vercel, saját szerver) telepitheted.</p>
      <p className="text-muted-foreground">A domain is könnyen atviheto &mdash; egyszerűen aatlitod a DNS rekordokat az új tarhelyre.</p>
    </>,
  },
  {
    q: "Mukodik-e a weboldalam telefonon is?",
    a: <>
      <p className="text-muted-foreground mb-2"><strong className="text-foreground">Igen, automatikusan!</strong> A Lovable reszponzív (alkalmazkodó) kódot general, ami telefonon, tableten és számítógépen is jol nez ki. A React és a modern CSS technologiak biztositjak, hogy az oldal minden eszkozooen megfelelően jelenjen meg.</p>
      <p className="text-muted-foreground"><strong className="text-foreground">Tipp:</strong> Mindig ellenőrizd az elonozetben a mobil nezetet is! Ha valami nem stimmel, írd be: &bdquo;Fix the mobile layout&rdquo; es az AI javitja.</p>
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
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3">Gyakran Ismetelt Kerdesek (GYIK)</h2>
          <p className="text-muted-foreground">Osszegyujtottuk a leggyakoribb kerdeseket, amik a weboldal-epites soran felmerulnek.</p>
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
