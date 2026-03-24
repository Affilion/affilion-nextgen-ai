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
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3">Domain Bekötés és Publikálás</h2>
          <p className="text-muted-foreground">Itt összekapcsolod a Rackhost-nal regisztrált domainedet a Lovable-ben épített weboldaladdal.</p>
        </div>

        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">1. lépés: Publikálás Lovable aldomain-en</h3>
          <p className="text-muted-foreground mb-4">Először publikáld a weboldaladat a Lovable ingyenes aldomain-jen (projektneved.lovable.app). Ez ingyenes és azonnal működik!</p>
          <ol className="tutorial-step-list">
            <li>A Lovable projektedben kattints a jobb felső sarokban a &bdquo;Share&rdquo; &rarr; &bdquo;Publish&rdquo; gombra</li>
            <li>A weboldalad azonnal elérhető lesz a <strong className="text-foreground">projektneved.lovable.app</strong> címen</li>
            <li>Teszteld: minden jól működik? Nézd még mobilon is!</li>
          </ol>
        </div>

        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">2. lépés: Saját domain beállítása</h3>
          <p className="text-muted-foreground mb-4">Ha szeretnéd, hogy a weboldalad a <strong className="text-foreground">sajatdomain.hu</strong> címen legyen elérhető (ehhez fizetős Lovable csomag kell):</p>
          <ol className="tutorial-step-list">
            <li>A Lovable-ben: <strong className="text-foreground">Project &rarr; Settings &rarr; Domains &rarr; Connect domain</strong></li>
            <li>Írd be a domain nevedet (pl. sajatdomain.hu)</li>
            <li>Válaszd a <strong className="text-foreground">Manual DNS setup</strong> opciót</li>
            <li>A Lovable megadja neked az <strong className="text-foreground">A rekord</strong> IP-címet és a <strong className="text-foreground">TXT rekord</strong> értéket &mdash; másold ki őket!</li>
            <li>Nyisd még a <a href="https://www.rackhost.hu" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 decoration-primary/30 hover:decoration-primary">Rackhost</a> admin paneledet</li>
            <li>Keresd még a domain-edet &rarr; <strong className="text-foreground">DNS rekordok</strong></li>
            <li>Adj hozzá egy <strong className="text-foreground">A rekordot</strong> a Lovable által megadott IP-vel</li>
            <li>Adj hozzá egy <strong className="text-foreground">TXT rekordot</strong> a Lovable által megadott verifikációs értékkel</li>
            <li>Várj a verifikációra &mdash; akár 72 óra, de általában néhány óra</li>
            <li>Sikeres verifikáció után az <strong className="text-foreground">SSL tanúsítvány automatikusan</strong> generálódik</li>
          </ol>
        </div>

        <div className="mb-8 tutorial-fade-up">
          <TutorialVideoPlaceholder title="Domain bekötés lépésről lépésre" />
        </div>

        <div className="mb-8 tutorial-fade-up">
          <TutorialTipBox variant="warning" icon="⚠️" title="Fontos: DNS propagáció">
            <p>A DNS módosítások akár 72 óráig is tarthatnak, amíg &bdquo;végigfutnak&rdquo; az interneten. Általában pár órán belül működik. A <a href="https://dnschecker.org" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 decoration-primary/30 hover:decoration-primary">dnschecker.org</a> oldalon ellenőrizheted a propagáció állapotát.</p>
          </TutorialTipBox>

          <TutorialTipBox variant="info" icon="💡" title="www aldomain">
            <p>Ha a www.sajatdomain.hu címet is szeretnéd használni, azt külön kell hozzáadnod a Lovable domain beállításaiban. Az első hozzáadott domain lesz az elsődleges, a többi automatikusan átirányít.</p>
          </TutorialTipBox>
        </div>

        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Hibaelhárítás</h3>
          <TutorialAccordion title="A domain nem mutat a weboldalra">
            <ul className="text-muted-foreground pl-5 space-y-1 list-disc">
              <li>Ellenőrizd, hogy az A rekord IP-je megegyezik a Lovable-ben megadottal</li>
              <li>Ellenőrizd a TXT rekordot a verifikációhoz</li>
              <li>Várj 24-72 órát &mdash; a DNS propagáció időbe telik</li>
              <li>Nézd még a <a href="https://dnschecker.org" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 decoration-primary/30 hover:decoration-primary">dnschecker.org</a>-on, hogy a DNS rekordok már frissültek-e</li>
            </ul>
          </TutorialAccordion>
          <TutorialAccordion title="SSL hiba (nem biztonságos)">
            <p className="text-muted-foreground mb-2">Az SSL tanúsítvány automatikusan generálódik a sikeres domain verifikáció után. Ha nem működik:</p>
            <ul className="text-muted-foreground pl-5 space-y-1 list-disc">
              <li>Várj néhány órát a verifikáció után</li>
              <li>Ellenőrizd, hogy a domain verifikáció sikeres volt-e a Lovable Settings-ben</li>
              <li>Próbáld még eltávolítani és újra hozzáadni a domaint</li>
            </ul>
          </TutorialAccordion>
        </div>
      </div>
    </section>
  );
};

export default TutorialModule6;
