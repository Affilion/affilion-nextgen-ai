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
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3">Domain Bekotes es Publikalas</h2>
          <p className="text-muted-foreground">Itt osszekapcsolod a Rackhost-nal regisztralt domainedet a Lovable-ben epitett weboldaladdal.</p>
        </div>

        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">1. lepes: Publikalas Lovable aldomain-en</h3>
          <p className="text-muted-foreground mb-4">Eloszor publikald a weboldaladat a Lovable ingyenes aldomain-jen (projektneved.lovable.app). Ez ingyenes es azonnal mukodik!</p>
          <ol className="tutorial-step-list">
            <li>A Lovable projektedben kattints a jobb felso sarokban a &bdquo;Share&rdquo; &rarr; &bdquo;Publish&rdquo; gombra</li>
            <li>A weboldalad azonnal elerheto lesz a <strong className="text-foreground">projektneved.lovable.app</strong> cimen</li>
            <li>Teszteld: minden jol mukodik? Nezd meg mobilon is!</li>
          </ol>
        </div>

        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">2. lepes: Sajat domain beallitasa</h3>
          <p className="text-muted-foreground mb-4">Ha szeretned, hogy a weboldalad a <strong className="text-foreground">sajatdomain.hu</strong> cimen legyen elerheto (ehhez fizetos Lovable csomag kell):</p>
          <ol className="tutorial-step-list">
            <li>A Lovable-ben: <strong className="text-foreground">Project &rarr; Settings &rarr; Domains &rarr; Connect domain</strong></li>
            <li>Ird be a domain nevedet (pl. sajatdomain.hu)</li>
            <li>Valaszd a <strong className="text-foreground">Manual DNS setup</strong> opciot</li>
            <li>A Lovable megadja neked az <strong className="text-foreground">A rekord</strong> IP-cimet es a <strong className="text-foreground">TXT rekord</strong> erteket &mdash; masold ki oket!</li>
            <li>Nyisd meg a <a href="https://www.rackhost.hu" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 decoration-primary/30 hover:decoration-primary">Rackhost</a> admin paneledet</li>
            <li>Keresd meg a domain-edet &rarr; <strong className="text-foreground">DNS rekordok</strong></li>
            <li>Adj hozza egy <strong className="text-foreground">A rekordot</strong> a Lovable altal megadott IP-vel</li>
            <li>Adj hozza egy <strong className="text-foreground">TXT rekordot</strong> a Lovable altal megadott verifikacios ertekkel</li>
            <li>Varj a verifikaciora &mdash; akar 72 ora, de altalaban nehany ora</li>
            <li>Sikeres verifikacio utan az <strong className="text-foreground">SSL tanusitvany automatikusan</strong> generalodik</li>
          </ol>
        </div>

        <div className="mb-8 tutorial-fade-up">
          <TutorialVideoPlaceholder title="Domain bekotes lepesrol lepesre" />
        </div>

        <div className="mb-8 tutorial-fade-up">
          <TutorialTipBox variant="warning" icon="\u26A0\uFE0F" title="Fontos: DNS propagacio">
            <p>A DNS modositasok akar 72 oraig is tarthatnak, amig &bdquo;vegigfutnak&rdquo; az interneten. Altalaban par oran belul mukodik. A <a href="https://dnschecker.org" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 decoration-primary/30 hover:decoration-primary">dnschecker.org</a> oldalon ellenorizheted a propagacio allapotat.</p>
          </TutorialTipBox>

          <TutorialTipBox variant="info" icon="\uD83D\uDCA1" title="www aldomain">
            <p>Ha a www.sajatdomain.hu cimet is szeretned hasznalni, azt kulon kell hozzaadnod a Lovable domain beallitasaiban. Az elso hozzaadott domain lesz az elsodleges, a tobbi automatikusan atiranyit.</p>
          </TutorialTipBox>
        </div>

        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Hibaelharitas</h3>
          <TutorialAccordion title="A domain nem mutat a weboldalra">
            <ul className="text-muted-foreground pl-5 space-y-1 list-disc">
              <li>Ellenorizd, hogy az A rekord IP-je megegyezik a Lovable-ben megadottal</li>
              <li>Ellenorizd a TXT rekordot a verifikaciohoz</li>
              <li>Varj 24-72 orat &mdash; a DNS propagacio idobe telik</li>
              <li>Nezd meg a <a href="https://dnschecker.org" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 decoration-primary/30 hover:decoration-primary">dnschecker.org</a>-on, hogy a DNS rekordok mar frissultek-e</li>
            </ul>
          </TutorialAccordion>
          <TutorialAccordion title="SSL hiba (nem biztonsagos)">
            <p className="text-muted-foreground mb-2">Az SSL tanusitvany automatikusan generalodik a sikeres domain verifikacio utan. Ha nem mukodik:</p>
            <ul className="text-muted-foreground pl-5 space-y-1 list-disc">
              <li>Varj nehany orat a verifikacio utan</li>
              <li>Ellenorizd, hogy a domain verifikacio sikeres volt-e a Lovable Settings-ben</li>
              <li>Probald meg eltavolitani es ujra hozzaadni a domaint</li>
            </ul>
          </TutorialAccordion>
        </div>
      </div>
    </section>
  );
};

export default TutorialModule6;
