import TutorialAccordion from "./TutorialAccordion";
import TutorialPromptBox from "./TutorialPromptBox";
import TutorialTipBox from "./TutorialTipBox";
import TutorialVideoPlaceholder from "./TutorialVideoPlaceholder";
import { LovableEditorMockup } from "./TutorialUIMockup";

const LOVABLE_URL = "https://lovable.dev/invite/PBZ4OPL";

const TutorialModule3 = () => {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 border-b border-border/20" id="module-3">
      <div className="max-w-[820px] mx-auto">
        <div className="mb-10 tutorial-fade-up">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            <span className="tutorial-label-line" /> Modul 3
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3">Ismerkedés a Lovable-lel</h2>
          <p className="text-muted-foreground">A Lovable egy AI-alapu weboldal-epito, amely szöveges utasitasokbol készít igazi, működő weboldalakat.</p>
        </div>

        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Mi az a Lovable?</h3>
          <p className="text-muted-foreground mb-4">A <a href={LOVABLE_URL} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 decoration-primary/30 hover:decoration-primary">Lovable.dev</a> egy mesterséges intelligenciával működő webfejleszto platform. Ahelyett, hogy kódot irnal, egyszerűen <strong className="text-foreground">leirod, mit szeretnel</strong>, es az AI megepiti neked!</p>
          <div className="glass-card">
            <h4 className="font-heading font-semibold mb-3">Fobb kepessegek:</h4>
            <ul className="text-muted-foreground pl-6 space-y-1.5 list-disc marker:text-primary">
              <li>AI-vezerelt fejlesztés &mdash; írd le szöveggel, mit szeretnel</li>
              <li>React-alapu, modern frontend</li>
              <li>Vizualis szerkesztő + chat alapú szerkesztés</li>
              <li>Precision Edit &mdash; kattints bármely elemre és módosítsd</li>
              <li>Supabase integracio (adatbázis, hitelesítés, fajltarolas)</li>
              <li>GitHub szinkron (ketaranyu)</li>
              <li>Figma &rarr; web konverzio</li>
              <li>Saját domain beállítás automatikus SSL-lel</li>
              <li>Lovable Cloud hosting (teljes menedzselt)</li>
              <li>SOC 2 Type 2 és ISO 27001 tanúsítvány</li>
            </ul>
          </div>
        </div>

        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Árazás</h3>
          <div className="tutorial-pricing-grid">
            <div className="tutorial-pricing-card">
              <div className="font-heading text-lg font-bold text-foreground mb-1">Free</div>
              <div className="font-heading text-xl font-extrabold glow-text mb-3">$0/ho</div>
              <ul className="list-none p-0 text-xs text-muted-foreground space-y-1">
                <li>5 napi kredit (max 30/ho)</li>
                <li>Csak nyilvános projektek</li>
                <li>Lovable.app aldomainen</li>
              </ul>
            </div>
            <div className="tutorial-pricing-card recommended">
              <div className="font-heading text-lg font-bold text-foreground mb-1">Pro</div>
              <div className="font-heading text-xl font-extrabold glow-text mb-3">$25/ho</div>
              <ul className="list-none p-0 text-xs text-muted-foreground space-y-1">
                <li>100 havi kredit + 5 napi bónusz</li>
                <li>Privát projektek</li>
                <li>Saját domain</li>
                <li>Kod hozzáférés</li>
                <li>Badge eltávolítás</li>
              </ul>
            </div>
            <div className="tutorial-pricing-card">
              <div className="font-heading text-lg font-bold text-foreground mb-1">Business</div>
              <div className="font-heading text-xl font-extrabold glow-text mb-3">$50/ho</div>
              <ul className="list-none p-0 text-xs text-muted-foreground space-y-1">
                <li>Minden Pro funkció</li>
                <li>SSO, adatvédelem</li>
                <li>Design sablonok</li>
                <li>Csapatmunkaterület</li>
              </ul>
            </div>
          </div>

          <TutorialTipBox variant="pro" icon="🎯" title="Pro tipp: Diákoknak akár 50% kedvezmény!">
            <p>Ha van egyetemi e-mail címed, akár 50%-os kedvezményt kaphatsz. A kreditek hónapról hónapra átgördülnek (az éves/havi limitig).</p>
          </TutorialTipBox>
        </div>

        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Fiók létrehozása</h3>
          <ol className="tutorial-step-list">
            <li>Nyisd meg a <a href={LOVABLE_URL} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 decoration-primary/30 hover:decoration-primary">Lovable.dev</a> oldalt</li>
            <li>Kattints a &bdquo;Sign Up&rdquo; gombra</li>
            <li>Regisztrálj Google fiókkal vagy e-mail cimmel</li>
            <li>Töltsd ki a profil adatokat (opcionalis)</li>
            <li>Készen állsz! Az ingyenes csomag maris aktív</li>
          </ol>
        </div>

        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">A felület részei</h3>
          <TutorialAccordion title="Chat panel — beszelj az AI-jal">
            <p className="text-muted-foreground">A bal oldalon talaalod a chat panelt. Ide írd le, mit szeretnel: &bdquo;Készíts egy modern portfólió oldalt sotet hatterrel&rdquo; &mdash; es az AI megepiti! Minden üzenet 1 kreditet használ, ha kódot modosit; a sima chat (kód nélkül) szinten 1 kreditet.</p>
          </TutorialAccordion>
          <TutorialAccordion title="Vizualis elonezet — lásd, amit epitesz">
            <p className="text-muted-foreground">A jobb oldalon valos idoben latod a weboldaladat, ahogy az AI dolgozik rajta. Az elonezet interaktiv &mdash; kattinthatsz, gorgethetsz, kiprobaalhatod.</p>
          </TutorialAccordion>
          <TutorialAccordion title="Precision Edit — kattints és szerkeszd">
            <p className="text-muted-foreground">A Precision Edit funkcioval rakattinthatsz bármely elemre az elonozetben, es közvetlenül szerkesztheted a szöveget, szint, méretet. Nem kell mindent a chatben kerned!</p>
          </TutorialAccordion>
          <TutorialAccordion title="Elozmoenyek — bármikor visszalephetsz">
            <p className="text-muted-foreground">A Lovable automatikusan menti minden változatot. Ha valami rosszul sul el, egyszerűen visszaterhetsz egy korabbi verziohoz. Ez olyan, mint a &bdquo;Ctrl+Z&rdquo; a vegtelensegig!</p>
          </TutorialAccordion>

          <LovableEditorMockup />
          <span className="block text-center text-xs text-muted-foreground italic mt-3 mb-2">A Lovable szerkesztő felülete &mdash; bal oldalon a chat, jobb oldalon az elo elonezet</span>
        </div>

        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Első projekt létrehozása</h3>
          <p className="text-muted-foreground mb-4">Kattints a &bdquo;New Project&rdquo; gombra, adj nevét a projektednek, es írd be az első promptodat:</p>
          <TutorialPromptBox label="Példa prompt">{`Készíts egy modern, letisztult bemutatkozó weboldalt egy magyar kis- vallalkozasnak. Legyen rajta:
- Hero szekció egy figyelemfelkeltő szöveggel
- Rólunk szekció
- Szolgáltatások (3 kártya)
- Kapcsolat szekció e-mail cimmel és telefonszammal
- Legyen sotet háttér, modern tipografia, lila akcentus szín`}</TutorialPromptBox>
        </div>

        <div className="mb-8 tutorial-fade-up">
          <TutorialVideoPlaceholder title="Hogyan hozd letre az első projekted a Lovable-ben" />
        </div>

        <div className="tutorial-cta-card tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-2 relative">{"🚀"} Készen állsz kiprobalni?</h3>
          <p className="text-muted-foreground mb-6 relative mx-auto">Hozd letre ingyenes fiokodat a Lovable.dev-en és kezdj el építeni!</p>
          <a
            href={LOVABLE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center gap-2 px-8 py-3.5 font-semibold text-white rounded-[10px] transition-all duration-250 hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))", boxShadow: "0 4px 20px hsl(var(--primary) / 0.3)" }}
          >
            Regisztrálj a Lovable-re!
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TutorialModule3;
