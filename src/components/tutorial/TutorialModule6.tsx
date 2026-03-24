import TutorialAccordion from "./TutorialAccordion";
import TutorialTipBox from "./TutorialTipBox";
import TutorialVideoPlaceholder from "./TutorialVideoPlaceholder";

const TutorialModule6 = () => {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 border-b border-border/20" id="module-6">
      <div className="max-w-[820px] mx-auto">
        <div className="mb-10 tutorial-fade-up">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            <span className="tutorial-label-line" /> Modul 6
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3">Domain Bekötés és Publikalas</h2>
          <p className="text-muted-foreground">Itt összekapcsolod a Rackhost-nal regisztralt domainedet a Lovable-ben epitett weboldaladdal.</p>
        </div>

        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">1. lépés: Publikalas Lovable aldomain-en</h3>
          <p className="text-muted-foreground mb-4">Eloszor publikald a weboldaladat a Lovable ingyenes aldomain-jen (projektneved.lovable.app). Ez ingyenes és azonnal működik!</p>
          <ol className="tutorial-step-list">
            <li>A Lovable projektedben kattints a jobb felső sarokban a &bdquo;Share&rdquo; &rarr; &bdquo;Publish&rdquo; gombra</li>
            <li>A weboldalad azonnal elérhető lesz a <strong className="text-foreground">projektneved.lovable.app</strong> címen</li>
            <li>Teszteld: minden jol működik? Nezd meg mobilon is!</li>
          </ol>
        </div>

        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">2. lépés: Saját domain beállítása</h3>
          <p className="text-muted-foreground mb-4">Ha szeretned, hogy a weboldalad a <strong className="text-foreground">sajatdomain.hu</strong> címen legyen elérhető (ehhez fizetos Lovable csomag kell):</p>
          <ol className="tutorial-step-list">
            <li>A Lovable-ben: <strong className="text-foreground">Project &rarr; Settings &rarr; Domains &rarr; Connect domain</strong></li>
            <li>Ird be a domain nevedet (pl. sajatdomain.hu)</li>
            <li>Válaszd a <strong className="text-foreground">Manual DNS setup</strong> opciot</li>
            <li>A Lovable megadja neked az <strong className="text-foreground">A rekord</strong> IP-cimet és a <strong className="text-foreground">TXT rekord</strong> értéket &mdash; másold ki oket!</li>
            <li>Nyisd meg a <a href="https://www.rackhost.hu" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 decoration-primary/30 hover:decoration-primary">Rackhost</a> admin paneledet</li>
            <li>Keresd meg a domain-edet &rarr; <strong className="text-foreground">DNS rekordok</strong></li>
            <li>Adj hozza egy <strong className="text-foreground">A rekordot</strong> a Lovable által megadott IP-vel</li>
            <li>Adj hozza egy <strong className="text-foreground">TXT rekordot</strong> a Lovable által megadott verifikacios ertekkel</li>
            <li>Várj a verifikaciora &mdash; akár 72 óra, de általában nehany óra</li>
            <li>Sikeres verifikacio utan az <strong className="text-foreground">SSL tanúsítvány automatikusan</strong> generalodik</li>
          </ol>
        </div>

        <div className="mb-8 tutorial-fade-up">
          <TutorialVideoPlaceholder title="Domain bekötés lépésről lepesre" />
        </div>

        <div className="mb-8 tutorial-fade-up">
          <TutorialTipBox variant="warning" icon="⚠️" title="Fontos: DNS propagacio">
            <p>A DNS modositasok akár 72 oraig is tarthatnak, amig &bdquo;vegigfutnak&rdquo; az interneten. Általában par órán belul működik. A <a href="https://dnschecker.org" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 decoration-primary/30 hover:decoration-primary">dnschecker.org</a> oldalon ellenorizheted a propagacio állapotát.</p>
          </TutorialTipBox>

          <TutorialTipBox variant="info" icon="💡" title="www aldomain">
            <p>Ha a www.sajatdomain.hu címet is szeretned használni, azt kulon kell hozzaadnod a Lovable domain beallitasaiban. Az első hozzaadott domain lesz az elsodleges, a tobbi automatikusan átirányít.</p>
          </TutorialTipBox>
        </div>

        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Hibaelharitas</h3>
          <TutorialAccordion title="A domain nem mutat a weboldalra">
            <ul className="text-muted-foreground pl-5 space-y-1 list-disc">
              <li>Ellenorizd, hogy az A rekord IP-je megegyezik a Lovable-ben megadottal</li>
              <li>Ellenorizd a TXT rekordot a verifikaciohoz</li>
              <li>Várj 24-72 órát &mdash; a DNS propagacio idobe telik</li>
              <li>Nezd meg a <a href="https://dnschecker.org" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 decoration-primary/30 hover:decoration-primary">dnschecker.org</a>-on, hogy a DNS rekordok már frissultek-e</li>
            </ul>
          </TutorialAccordion>
          <TutorialAccordion title="SSL hiba (nem biztonságos)">
            <p className="text-muted-foreground mb-2">Az SSL tanúsítvány automatikusan generalodik a sikeres domain verifikacio utan. Ha nem működik:</p>
            <ul className="text-muted-foreground pl-5 space-y-1 list-disc">
              <li>Várj nehany órát a verifikacio utan</li>
              <li>Ellenorizd, hogy a domain verifikacio sikeres volt-e a Lovable Settings-ben</li>
              <li>Probald meg eltávolítani és újra hozzáadni a domaint</li>
            </ul>
          </TutorialAccordion>
        </div>
      </div>
    </section>
  );
};

export default TutorialModule6;
