import { useState, useCallback } from "react";
import { Check } from "lucide-react";
import TutorialAccordion from "./TutorialAccordion";
import TutorialPromptBox from "./TutorialPromptBox";
import TutorialTipBox from "./TutorialTipBox";

const LOVABLE_URL = "https://lovable.dev/invite/PBZ4OPL";

const maintenanceItems = [
  "Tartalom frissitese (legalabb havonta egyszer)",
  "Analytics adatok attekintese (heti/havi)",
  "Search Console hibak ellenorzese",
  "Mobil megjelenes tesztelese",
  "Biztonsagi frissitesek (SSL aktiv-e?)",
  "Biztonsagi mentes (GitHub sync bekapcsolas)",
];

const TutorialModule8 = () => {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const toggleCheck = useCallback((i: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }, []);

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 border-b border-border/20" id="module-8">
      <div className="max-w-[820px] mx-auto">
        <div className="mb-10 tutorial-fade-up">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            <span className="tutorial-label-line" /> Modul 8
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3">Karbantartas es Tovabbfejlesztes</h2>
          <p className="text-muted-foreground">A weboldalad elkeszult &mdash; de a munka nem all meg! Tartsd karban es fejleszd folyamatosan.</p>
        </div>

        {/* Checklist */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Rendszeres teendok</h3>
          <ul className="tutorial-checklist list-none p-0 mb-5">
            {maintenanceItems.map((item, i) => (
              <li
                key={i}
                onClick={() => toggleCheck(i)}
                className={`flex items-start gap-3 py-2.5 border-b border-white/[0.04] text-sm cursor-pointer transition-colors ${checked.has(i) ? "checked" : "text-muted-foreground"}`}
              >
                <span className="tutorial-check-box">
                  {checked.has(i) && <Check size={12} className="text-white" />}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Perf */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Teljesitmeny-optimalizalas</h3>
          <TutorialAccordion title="Kepek optimalizalasa">
            <p className="text-muted-foreground mb-3">A nagy kepfajlok lelassitjak az oldaladat. Hasznalj WebP vagy AVIF formatumot, es allits be lazy loading-ot:</p>
            <TutorialPromptBox label="Prompt">{`Optimize all images: add lazy loading, use WebP format where possible, and add proper width/height attributes to prevent layout shifts.`}</TutorialPromptBox>
          </TutorialAccordion>
          <TutorialAccordion title="Speed Tool hasznalata">
            <p className="text-muted-foreground">A Lovable beepitett Speed eszkozevel merheted a Core Web Vitals ertekeket. Cel: LCP &lt; 2.5s, FID &lt; 100ms, CLS &lt; 0.1.</p>
          </TutorialAccordion>
        </div>

        {/* GitHub sync */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Biztonsagi mentes &mdash; GitHub Sync</h3>
          <p className="text-muted-foreground mb-4">A Lovable ketaranyu GitHub szinkront kinal. Ez azt jelenti, hogy a weboldalad teljes forraskodja automatikusan mentesre kerul a GitHub fiokodon. Ha barmi tortenae, onnan barmikor visszaallithatod.</p>
          <TutorialTipBox variant="pro" icon="\uD83C\uDFAF" title="Pro tipp">
            <p>Kapcsold be a GitHub sync-et minel hamarabb! Ez nemcsak biztonsagi mentes, hanem lehetove teszi, hogy masokat is bevonj a projektbe, es akar mas platformra is atvidd a kodot.</p>
          </TutorialTipBox>
        </div>

        {/* Cookie GDPR */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Cookie hozzajarulas es GDPR</h3>
          <p className="text-muted-foreground mb-4">Ha a weboldalad barmilyen cookie-t (sutit) hasznal &mdash; peldaul Google Analytics-et &mdash;, akkor a magyar es EU-s jogszabalyok (GDPR) ertelmeben koteles vagy errol tajekoztatni a latogatoidat, es beleegyezesüket kerni.</p>

          <div className="glass-card mb-4">
            <h4 className="font-heading font-semibold mb-3">\uD83C\uDF6A Mi az a cookie (suti)?</h4>
            <p className="text-muted-foreground leading-relaxed">A cookie egy apro szoveges fajl, amelyet a weboldal a latogato bongeszojeben tarol. Olyan, mint egy kis &bdquo;emlekezteto cetli&rdquo; &mdash; segit a weboldalnak megjegyezni dolgokat rolad (pl. hogy bejelentkeztel, mit tettel a kosarba, milyen nyelvet beszelsz).</p>
          </div>

          <div className="glass-card mb-4">
            <h4 className="font-heading font-semibold mb-3">\uD83D\uDEE1\uFE0F GDPR egyszeruen</h4>
            <p className="text-muted-foreground leading-relaxed mb-3">A GDPR (General Data Protection Regulation) az EU adatvedelmi rendelete. Lenyege: a felhasznaloknak joguk van tudni, milyen adatokat gyujtesz roluk, es <strong className="text-foreground">elozetesen bele kell egyezniuk</strong>. Ez azt jelenti:</p>
            <ul className="text-muted-foreground pl-5 space-y-1 list-disc">
              <li>A weboldalon megjelenik egy &bdquo;cookie banner&rdquo; &mdash; egy kis sav, ami tajekoztat a sutikrol</li>
              <li>A latogato elfogadhatja vagy elutasithatja a sutiket</li>
              <li>Kell egy Adatvedelmi tajekoztato (Privacy Policy) oldal</li>
              <li>Analytics kodot <strong className="text-foreground">csak az elfogadas utan</strong> szabad betolteni</li>
            </ul>
          </div>

          <TutorialPromptBox label="Cookie consent banner prompt">{`Add a GDPR-compliant cookie consent banner to the site. It should appear at the bottom of the page on first visit with "Elfogadom" (Accept) and "Elutasitom" (Decline) buttons. Store the user's choice in the browser's local storage. Only load Google Analytics tracking code if the user accepts cookies. The banner should explain in Hungarian that the site uses cookies for analytics. Style it to match the site's dark theme with a glass-morphism effect.`}</TutorialPromptBox>

          <TutorialPromptBox label="Adatvedelmi tajekoztato prompt">{`Create an Adatvedelmi Tajekoztato (Privacy Policy) page in Hungarian. Include sections about: what data is collected (Google Analytics cookies), purpose of data collection (website improvement), data retention period, user rights (access, deletion, modification), cookie policy details, and contact information for the data controller. Use clear, simple Hungarian language.`}</TutorialPromptBox>

          <TutorialTipBox variant="warning" icon="\u26A0\uFE0F" title="Fontos: Ha GA4-et hasznalsz, KELL cookie banner!">
            <p>A Google Analytics cookie-kat helyez el a latogatok bongeszoijeben. GDPR szerint ehhez elozetes beleegyezes kell. Cookie banner nelkul jogsertest kovetsz el! Az NAIH (magyar adatvedelmi hatosag) buntetese akar tobb millio forint is lehet.</p>
          </TutorialTipBox>
        </div>

        {/* Impresszum */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Impresszum (Jogi nyilatkozat)</h3>
          <p className="text-muted-foreground mb-4">A magyar jogszabalyok (2001. evi CVIII. torveny) szerint <strong className="text-foreground">minden kereskedelmi celu weboldalon</strong> kotelezo feltuntetni bizonyos adatokat. Ezt nevezzuk impresszumnak.</p>

          <div className="glass-card mb-4">
            <h4 className="font-heading font-semibold mb-3">\uD83D\uDCCB Mit kell tartalmaznia az impresszumnak?</h4>
            <ul className="text-muted-foreground pl-5 space-y-1 list-disc">
              <li><strong className="text-foreground">Egyeni vallalkozoknal:</strong> teljes nev, szekhely cime, adoszam, e-mail cim</li>
              <li><strong className="text-foreground">Cegeknel:</strong> cegnev, szekhely, cegjegyzekszam, adoszam, e-mail, telefon</li>
              <li><strong className="text-foreground">Tarhelyszolgaltato neve</strong> (ha van, pl. Lovable Cloud)</li>
              <li><strong className="text-foreground">Felugyeleti szerv</strong> elerhetosege (ha relevans)</li>
            </ul>
          </div>

          <TutorialPromptBox label="Impresszum oldal prompt">{`Create an Impresszum (Legal Notice) page in Hungarian. Include placeholder sections for: company/individual name, registered address, tax number (adoszam), company registration number (cegjegyzekszam), email contact, phone number, hosting provider information, and a note about the applicable Hungarian law (2001. evi CVIII. torveny). Style it to match the site's design.`}</TutorialPromptBox>

          <TutorialTipBox variant="warning" icon="\u26A0\uFE0F" title="Figyelem: Az impresszum kihagyasa birsagot vonhat maga utan!">
            <p>Ha a weboldaladnak barmilyen uzleti celja van (szolgaltatas, termekek, hirdetes), az impresszum kotelezo. Ennek hianya a fogyasztovedelmi hatosag birsagaval jarhat. Mindig tedd ki a lablecbe, jol lathato helyre!</p>
          </TutorialTipBox>
        </div>

        {/* Future developments */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Jovobeli fejlesztesi lehetosegek</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
            {[
              { icon: "\uD83D\uDCB3", name: "Fizetes (Stripe)", desc: "Online fizetes integralas" },
              { icon: "\uD83D\uDCE7", name: "E-mail marketing", desc: "Hirlevel es automatizacio" },
              { icon: "\uD83C\uDF10", name: "Tobbnyelvuseg", desc: "i18n tamogatas" },
              { icon: "\uD83E\uDD16", name: "AI Chatbot", desc: "Ugyfelszolgalati asszisztens" },
            ].map((item) => (
              <div key={item.name} className="glass-card text-center py-5">
                <div className="text-3xl mb-2">{item.icon}</div>
                <h4 className="font-heading text-sm font-semibold mb-1">{item.name}</h4>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Csomag valtas */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Mikor erdemes csomagot valtani?</h3>
          <div className="glass-card">
            <ul className="text-muted-foreground pl-5 space-y-2 list-disc">
              <li><strong className="text-foreground">Free &rarr; Pro:</strong> Ha sajat domaint szeretnel, vagy elfogynak a napi kreditjeid</li>
              <li><strong className="text-foreground">Pro &rarr; Business:</strong> Ha csapatban dolgozol, SSO-ra van szukseged, vagy extra vedelmet szeretnel</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="tutorial-cta-card tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-2 relative">\uD83C\uDF89 Gratulalunk!</h3>
          <p className="text-muted-foreground mb-6 relative mx-auto">Ha ideaig eljutottal, mar mindent tudsz ahhoz, hogy sajat weboldalt epitts es tartsd karban. Kezdj bele most!</p>
          <a
            href={LOVABLE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center gap-2 px-8 py-3.5 font-semibold text-white rounded-[10px] transition-all hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))", boxShadow: "0 4px 20px hsl(var(--primary) / 0.3)" }}
          >
            Kezdd el a Lovable-lel!
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TutorialModule8;
