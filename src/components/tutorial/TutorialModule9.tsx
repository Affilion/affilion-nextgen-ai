import TutorialAccordion from "./TutorialAccordion";

const faqItems = [
  {
    q: "Mennyibe kerul osszesen egy weboldal elkeszitese?",
    a: <>
      <p className="text-muted-foreground mb-2">Az abszolut minimum: egy <strong className="text-foreground">.hu domain (622 Ft/ev brutto)</strong> + <strong className="text-foreground">Lovable Free csomag ($0)</strong>. Tehat akar <strong className="text-foreground">622 forintbol</strong> elindulhatsz!</p>
      <p className="text-muted-foreground">Ha sajat domaint szeretnel hasznalni (nem lovable.app aldomain), szukseged lesz a <strong className="text-foreground">Lovable Pro csomagra ($25/ho, ~9 500 Ft)</strong>. A Google Analytics es Search Console teljesen ingyenes. Osszehasonlitaskeppp: egy programozooval keszittetett weboldal 200 000 - 2 000 000 Ft, egy WordPress fejlesztes 50 000 - 500 000 Ft.</p>
    </>,
  },
  {
    q: "Kell-e programozoi tudas a Lovable hasznalataahoz?",
    a: <>
      <p className="text-muted-foreground mb-2"><strong className="text-foreground">Egyaltalan nem!</strong> A Lovable lenyege eppen az, hogy termeszetes nyelven (magyarul vagy angolul) irod le, mit szeretnel, es az AI megcsinalja. Nem kell tudnod HTML-t, CSS-t, JavaScript-et, vagy barmi mast. Eleg, ha el tudod mondani, milyen weboldalt kepzelsz el.</p>
      <p className="text-muted-foreground">Persze, ha van nemi technikai hatterismereted, az segithet pontosabb promptokat irni &mdash; de nem feltetel!</p>
    </>,
  },
  {
    q: "Mi tortenik, ha lemondom a Lovable elofizetesst?",
    a: <>
      <p className="text-muted-foreground mb-2">Ha lemondod a fizetos csomagodat:</p>
      <ul className="text-muted-foreground pl-5 space-y-1 list-disc">
        <li>A weboldalad tovaabbra is elerheto marad a Lovable Cloud-on</li>
        <li>A sajat domain beallitas megszunhet (visszaall a lovable.app aldomainre)</li>
        <li>Nem tudsz majd szerkeszteni a feluln az ingyenes krediteken tul</li>
        <li>A forraskod megmarad &mdash; ha bekapcsoltad a GitHub sync-et, minden mentesre kerul</li>
      </ul>
      <p className="text-muted-foreground mt-2"><strong className="text-foreground">Tipp:</strong> Mielott lemondanad, kapcsold be a GitHub szinkront, hogy a teljes kodod biztonsaagban legyen!</p>
    </>,
  },
  {
    q: "Tudom-e kesobb modositani a weboldalamat?",
    a: <p className="text-muted-foreground"><strong className="text-foreground">Igen, barmikor!</strong> Ez a Lovable egyik legnagyobb elonye. Egyszeruen ird be, mit szeretnel valtoztatni: &bdquo;Csereld ki a hero szekcio hatterszinet kekre&rdquo; vagy &bdquo;Add hozza egy uj Szolgaltatasok oldalt&rdquo;. Az AI vegrehajta a modositast, es ha nem tetszik, egy kattintassal visszalephetsz az elozo verziora.</p>,
  },
  {
    q: "Biztonsagos a Lovable? Mi van az adataimmal?",
    a: <>
      <p className="text-muted-foreground mb-2">A Lovable komolyan veszi a biztonsagot:</p>
      <ul className="text-muted-foreground pl-5 space-y-1 list-disc">
        <li><strong className="text-foreground">SOC 2 Type 2</strong> tanusitvany &mdash; nemzetkozi biztonsagi audit</li>
        <li><strong className="text-foreground">ISO 27001</strong> tanusitvany &mdash; informacioobiztonsagi szabvany</li>
        <li>Automatikus <strong className="text-foreground">SSL/HTTPS</strong> minden weboldalon</li>
        <li>A Supabase adatbazis szinten titkositott es biztonsagi auditalt</li>
      </ul>
      <p className="text-muted-foreground mt-2">Az adataidat nem hasznaljak a modell tanitasara, es barmikor torolheted a fiokodat es a projektjeidet.</p>
    </>,
  },
  {
    q: "Mennyi ido alatt keszul el egy weboldal?",
    a: <>
      <p className="text-muted-foreground mb-2">Ez a weboldal komplexitasatol fugg:</p>
      <ul className="text-muted-foreground pl-5 space-y-1 list-disc">
        <li><strong className="text-foreground">Egyszeru bemutatkozo oldal:</strong> 1-2 ora</li>
        <li><strong className="text-foreground">Tobb oldalas ceges weboldal:</strong> 3-5 ora</li>
        <li><strong className="text-foreground">Webshop alapokkal:</strong> 5-8 ora</li>
        <li><strong className="text-foreground">Komplex webapp (bejelentkezes, adatbazis):</strong> 1-2 nap</li>
      </ul>
      <p className="text-muted-foreground mt-2">A domain regisztracio (+DNS propagacio) meg 1-3 napot igenyalhet. De maga a weboldalepites meglepoen gyors a Lovable-lel!</p>
    </>,
  },
  {
    q: "Mi az a Supabase es szuksegem van ra?",
    a: <>
      <p className="text-muted-foreground mb-2">A <strong className="text-foreground">Supabase</strong> egy nyilt forrraskodu backend-szolgaltatas (adatbazis, felhasznalo-kezeles, fajltarolas). A Lovable ezt hasznalja hatterrendszerkent.</p>
      <p className="text-muted-foreground mb-2"><strong className="text-foreground">Szukseged van ra, ha:</strong> a weboldaladnak adatokat kell kezelnie &mdash; peldaul urlap bekuldes mentese, felhasznaloi regisztracio, kep feltoltes, blog adminisztracio, webshop.</p>
      <p className="text-muted-foreground mb-2"><strong className="text-foreground">Nem kell, ha:</strong> egyszeru, statikus bemutatkozo/portfolio oldalt epitesz szovegekkel es kepekkel.</p>
      <p className="text-muted-foreground">A Lovable-bol egy kattintassal aktivalhatod &mdash; nem kell kulon regisztrlnod.</p>
    </>,
  },
  {
    q: "Hogyan tudok segitseget kerni, ha elakadok?",
    a: <>
      <p className="text-muted-foreground mb-2">Tobb lehetoseged is van:</p>
      <ul className="text-muted-foreground pl-5 space-y-1 list-disc">
        <li><strong className="text-foreground">Lovable Discord kozosseg:</strong> Tobb ezer felhasznalo, gyors segitseg angolul</li>
        <li><strong className="text-foreground">Lovable dokumentacio:</strong> Reszletes angol nyelvu sugo a docs.lovable.dev oldalon</li>
        <li><strong className="text-foreground">Ez az utmutato:</strong> A modulok a leggyakoribb feladatokat reszletesen targyaljak</li>
        <li><strong className="text-foreground">AI chat a Lovable-ben:</strong> Kerdezd meg az AI-t kozvetlenul! Pl.: &bdquo;Hogyan adjak hozza Google Analytics-et?&rdquo;</li>
      </ul>
    </>,
  },
  {
    q: "Atvihetem-e a weboldalamat masik platformra?",
    a: <>
      <p className="text-muted-foreground mb-2"><strong className="text-foreground">Igen!</strong> A Lovable egyik legnagyobb elonye, hogy a generalt kod a tied. A GitHub szinkronnak koszonhetoen a teljes React forrraskod elerheto a GitHub fiokodon. Ezt onnan barmelyik masik platformra (Netlify, Vercel, sajat szerver) telepitheted.</p>
      <p className="text-muted-foreground">A domain is konnyen atviheto &mdash; egyszeruen aatlitod a DNS rekordokat az uj tarhelyre.</p>
    </>,
  },
  {
    q: "Mukodik-e a weboldalam telefonon is?",
    a: <>
      <p className="text-muted-foreground mb-2"><strong className="text-foreground">Igen, automatikusan!</strong> A Lovable reszponziv (alkalmazkodo) kodot general, ami telefonon, tableten es szamitogepen is jol nez ki. A React es a modern CSS technologiak biztositjak, hogy az oldal minden eszkozooen megfeleloen jelenjen meg.</p>
      <p className="text-muted-foreground"><strong className="text-foreground">Tipp:</strong> Mindig ellenorizd az elonozetben a mobil nezetet is! Ha valami nem stimmel, ird be: &bdquo;Fix the mobile layout&rdquo; es az AI javitja.</p>
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
