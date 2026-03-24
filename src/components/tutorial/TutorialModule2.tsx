import TutorialTipBox from "./TutorialTipBox";
import { DNSPanelMockup } from "./TutorialUIMockup";

const LOVABLE_URL = "https://lovable.dev/invite/PBZ4OPL";

const TutorialModule2 = () => {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 border-b border-border/20" id="module-2">
      <div className="max-w-[820px] mx-auto">
        <div className="mb-10 tutorial-fade-up">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            <span className="tutorial-label-line" /> Modul 2
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3">Domain Regisztracio</h2>
          <p className="text-muted-foreground">Foglald le a weboldalad nevet. A Rackhost.hu a legjobb magyar szolgaltato erre a celra.</p>
        </div>

        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Miert a Rackhost?</h3>
          <p className="text-muted-foreground mb-4">A <a href="https://www.rackhost.hu" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 decoration-primary/30 hover:decoration-primary transition-colors">Rackhost.hu</a> az egyik legmegbizhatobb magyar domain regisztrator. Elonyei:</p>
          <ul className="text-muted-foreground pl-6 space-y-1.5 list-disc mb-4 marker:text-primary">
            <li>Magyar nyelvu felulet es ugyfélszolgalat</li>
            <li>Kifejezetten alacsony arak (.hu domain: 490 Ft/ev!)</li>
            <li>Egyszeru DNS kezelofelulet</li>
            <li>Gyors regisztracios folyamat</li>
            <li>Megbizhato, evek ota mukodo szolgaltatas</li>
          </ul>
        </div>

        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Domain arak (2026)</h3>
          <div className="glass-card p-0 overflow-hidden">
            <table className="tutorial-price-table">
              <thead>
                <tr>
                  <th>Kiterjesztes</th>
                  <th>Regisztracio (netto/ev)</th>
                  <th>Hosszabbitas (netto/ev)</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr><td><strong className="text-foreground">.hu</strong></td><td className="tutorial-price-highlight">490 Ft/ev</td><td>2 200 Ft/ev</td><td><span className="tutorial-price-badge">Legjobb ar!</span></td></tr>
                <tr><td><strong className="text-foreground">.eu</strong></td><td className="tutorial-price-highlight">490 Ft/ev</td><td>2 500 Ft/ev</td><td><span className="tutorial-price-badge">EU-s opcio</span></td></tr>
                <tr><td><strong className="text-foreground">.com</strong></td><td>6 000 Ft/ev</td><td>6 000 Ft/ev</td><td></td></tr>
                <tr><td><strong className="text-foreground">.org</strong></td><td>5 500 Ft/ev</td><td>5 500 Ft/ev</td><td></td></tr>
                <tr><td><strong className="text-foreground">.net</strong></td><td>7 000 Ft/ev</td><td>7 000 Ft/ev</td><td></td></tr>
                <tr><td><strong className="text-foreground">.de</strong></td><td>3 500 Ft/ev</td><td>3 500 Ft/ev</td><td></td></tr>
              </tbody>
            </table>
          </div>

          <TutorialTipBox variant="info" icon="💡" title="Tipp">
            <p>Ha magyar celkozonsegnek keszul a weboldalad, a .hu domain a legjobb valasztas. Elso evre mindossze 490 Ft (brutto 622 Ft) &mdash; ez a legolcsobb opcio!</p>
          </TutorialTipBox>
        </div>

        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Regisztracios lepesek</h3>
          <ol className="tutorial-step-list">
            <li>Ellenorizd, szabad-e a kivant domain: menj a <a href="https://www.rackhost.hu" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 decoration-primary/30 hover:decoration-primary">rackhost.hu</a> oldalra es ird be a kereso mezobe</li>
            <li>Ha szabad, tedd a kosarba es valaszd ki, hany evre szeretned regisztralni</li>
            <li>Add meg a szamlazasi adataidat (ceg vagy maganszemely)</li>
            <li>Fogadd el az Altalanos Szerzodesi Felteteleket es kattints a &bdquo;Megrendel&rdquo; gombra</li>
            <li>A felhasznaloi fiokodban add meg a tulajdonosi adatokat es fizess</li>
            <li><strong className="text-foreground">.hu domainnel:</strong> megerosito e-mailt kapsz &mdash; erositsd meg a tulajdonjogot elektronikusan</li>
            <li>Vard meg a regisztracio befejezeset (.hu: ~3 munkanap, nemzetkozi: ~24 ora)</li>
          </ol>

          <TutorialTipBox variant="warning" icon="⚠️" title="Fontos">
            <p>.hu domain eseten a tulajdonosi adatok megerositese kotelezo! Ha nem erositedd meg idoben, a regisztracio meghiusulhat. Figyeld az e-mailjeidet.</p>
          </TutorialTipBox>

          <DNSPanelMockup />
          <span className="block text-center text-xs text-muted-foreground italic mt-3 mb-2">Illusztracio &mdash; a Rackhost DNS kezelofelulete hasonloan nez ki</span>
        </div>
      </div>
    </section>
  );
};

export default TutorialModule2;
