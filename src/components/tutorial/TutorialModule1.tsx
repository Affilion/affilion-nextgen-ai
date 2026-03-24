import { useState, useCallback } from "react";
import TutorialAccordion from "./TutorialAccordion";
import TutorialTipBox from "./TutorialTipBox";
import TutorialCostCalculator from "./TutorialCostCalculator";
import { Check } from "lucide-react";

const checklistItems = [
  "Mi a célom a weboldallal? (bemutatkozás, szolgáltatás, portfólió, webshop?)",
  "Ki a célközönségem? (maganszemelyek, cégek, fiatalok, idosebbek?)",
  "Milyen oldalak kellenek? (Főoldal, Rolam, Szolgáltatások, Kapcsolat, stb.)",
  "Milyen domain nevét szeretnek? (.hu, .com, .eu?)",
  "Van-e szuksegem backend funkcionalitásra? (bejelentkezés, adatbázis, űrlap?)",
  "Összegyűjtöttem a szövegeket és képeket?",
];

const TutorialModule1 = () => {
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
    <section className="py-16 md:py-24 px-6 md:px-12 border-b border-border/20" id="module-1">
      <div className="max-w-[820px] mx-auto">
        {/* Header */}
        <div className="mb-10 tutorial-fade-up">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            <span className="tutorial-label-line" /> Modul 1
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3">Előkészületek</h2>
          <p className="text-muted-foreground">Mielőtt nekiállnál építeni, fontos megérteni, hogyan működik egy weboldal és mit kell előre megtervezned.</p>
        </div>

        {/* Mi az a weboldal? */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Mi az a weboldal?</h3>
          <p className="text-muted-foreground mb-4 leading-relaxed">Egy weboldal egyszerűen fájlok gyűjteménye, amelyeket egy szerver (számítógép) szolgaltat ki az interneten, es a bongeszod (Chrome, Firefox, Safari) megjeleníti. Nezzuk meg az alapvető fogalmakat:</p>

          <TutorialAccordion title="Domain név — a weboldalad címe">
            <p className="text-muted-foreground mb-2">A domain név az az egyedi cím, amit az emberek beirnak a bongeszojukbe, hogy eljussanak a weboldaladra. Például: <strong className="text-foreground">példa.hu</strong> vagy <strong className="text-foreground">uzletem.com</strong>.</p>
            <p className="text-muted-foreground">Gondolj ra ugy, mint a hazad postai cimere &mdash; ez alapján talaljak meg az internetezok a weboldalad.</p>
          </TutorialAccordion>

          <TutorialAccordion title="Hosting (tarhelyszolgaltatas) — ahol a weboldalad „lakik”">
            <p className="text-muted-foreground">A hosting egy szerver (speciális számítógép), amely a weboldalad fájljait tárolja és folyamatosan elérhetővé teszi az interneten. Jó hír: a <strong className="text-foreground">Lovable</strong> automatikusan biztosít hosting-ot &mdash; ezt hívják <strong className="text-foreground">Lovable Cloud</strong>-nak. Ezzel neked nem kell foglalkoznod!</p>
          </TutorialAccordion>

          <TutorialAccordion title="Frontend vs. Backend — mit lát a felhasználó?">
            <p className="text-muted-foreground mb-2"><strong className="text-foreground">Frontend</strong>: Minden, amit a látogató lát és használ &mdash; a design, a gombok, a szövegek, a képek. Ez a &bdquo;vitrin&rdquo;.</p>
            <p className="text-muted-foreground mb-2"><strong className="text-foreground">Backend</strong>: A háttérben futó logika &mdash; adatbázis, felhasználó-kezeles, űrlap-feldolgozas. Ez a &bdquo;raktar és iroda&rdquo;.</p>
            <p className="text-muted-foreground">A Lovable mindkettot kepes létrehozni: a frontend-et React-tel, a backend-et pedig Supabase integracioval.</p>
          </TutorialAccordion>
        </div>

        {/* Fontos fogalmak */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Fontos fogalmak egyszerűen</h3>
          <p className="text-muted-foreground mb-4">Mielőtt tovabbmennenk, ismerd meg ezeket az alapfogalmakat &mdash; mindegyiket hetkoznapi nyelven magyarazzuk el:</p>

          <div className="glass-card mb-4">
            <h4 className="font-heading font-semibold mb-3">🔒 SSL/HTTPS &mdash; A lakat ikon a bongészoben</h4>
            <p className="text-muted-foreground leading-relaxed">Kepzeld el, hogy kuldol egy képeslapot (HTTP) &mdash; bárki olvashatja utkozben. Most kepzeld el, hogy zart, leragasztott borítékban kuldod (HTTPS) &mdash; csak a címzett nyithatja ki. Az <strong className="text-foreground">SSL tanúsítvány</strong> pontosan ezt csinaja: titkosítja a weboldal és a látogató közötti kommunikációt. A böngésző ezert mutat egy kis <strong className="text-foreground">lakat ikont</strong> 🔒 a biztonságos oldalaknál. Jó hír: a <strong className="text-foreground">Lovable automatikusan biztosít SSL-t</strong> &mdash; nem kell vele foglalkoznod!</p>
          </div>

          <div className="glass-card mb-4">
            <h4 className="font-heading font-semibold mb-3">🔗 URL &mdash; A weboldalad pontos címe</h4>
            <p className="text-muted-foreground leading-relaxed mb-3">Egy URL (Uniform Resource Locator) a weboldal pontos &bdquo;postacime&rdquo;. Nezzuk meg a reszeit:</p>
            <div className="bg-black/30 rounded-lg p-3.5 px-4 mb-3 font-mono text-sm overflow-x-auto">
              <span className="text-green-400">https://</span>
              <span className="text-yellow-400">www.</span>
              <span className="text-primary">példa</span>
              <span className="text-blue-400">.hu</span>
              <span className="text-muted-foreground">/szolgaltatasok</span>
            </div>
            <ul className="text-sm text-muted-foreground pl-5 space-y-1 list-disc">
              <li><span className="text-green-400 font-semibold">https://</span> &mdash; Protokoll (biztonságos kapcsolat)</li>
              <li><span className="text-yellow-400 font-semibold">www.</span> &mdash; Aldomain (opcionalis, ma már nem kotelezo)</li>
              <li><span className="text-primary font-semibold">példa</span> &mdash; A domain neved</li>
              <li><span className="text-blue-400 font-semibold">.hu</span> &mdash; Kiterjesztes (TLD)</li>
              <li><span className="text-muted-foreground font-semibold">/szolgaltatasok</span> &mdash; Aloldal (utvonal)</li>
            </ul>
          </div>

          <div className="glass-card mb-4">
            <h4 className="font-heading font-semibold mb-3">📱 Reszponzív design &mdash; Alkalmazkodó megjelenés</h4>
            <p className="text-muted-foreground leading-relaxed">Gondolj egy okos butorra, ami automatikusan atrendeződik, hogy belferjen egy kis szobaba is és egy nagy nappaliba is. A <strong className="text-foreground">reszponzív design</strong> ugyanezt csinaja: a weboldal automatikusan alkalmazkodik a képernyő meretehez &mdash; legyen az telefon, tablet, vagy monitor. A Lovable minden altala generált oldalt automatikusan reszponzivva tesz!</p>
          </div>

          <div className="glass-card mb-4">
            <h4 className="font-heading font-semibold mb-3">🤖 CMS vs. Kod vs. AI &mdash; Hogyan építhetsz weboldalt?</h4>
            <p className="text-muted-foreground leading-relaxed mb-3">Haromfelekeppen készíthetsz weboldalt:</p>
            <div className="tutorial-diagram">
              <div className="tutorial-diagram-box">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">CMS</div>
                <div className="font-heading font-bold text-foreground">WordPress</div>
              </div>
              <div className="tutorial-diagram-box">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">Kod</div>
                <div className="font-heading font-bold text-foreground">Fejleszto</div>
              </div>
              <div className="tutorial-diagram-box" style={{ borderColor: "hsl(var(--primary) / 0.5)", background: "hsl(var(--primary) / 0.15)" }}>
                <div className="text-[11px] uppercase tracking-wider text-primary mb-1">AI-alapu</div>
                <div className="font-heading font-bold text-foreground">Lovable ✨</div>
              </div>
            </div>
            <ul className="text-sm text-muted-foreground pl-5 space-y-1 list-disc">
              <li><strong className="text-foreground">CMS (pl. WordPress):</strong> Kesz sablonokbol epitkezel, de korlátozott és gyakran lassu</li>
              <li><strong className="text-foreground">Koddal:</strong> Maximalis szabadsag, de programozói tudás kell</li>
              <li><strong className="text-foreground">AI-alapu (Lovable):</strong> Leirod szöveggel, mit szeretnel, es az AI megepiti &mdash; programozás nélkül, de profi eredmennyel!</li>
            </ul>
          </div>
        </div>

        {/* Hogyan működik? */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Hogyan működik egy weboldal?</h3>
          <div className="tutorial-diagram">
            {[
              { label: "1. Felhasznalo", value: "Bongeszo" },
              { label: "2. Domain", value: "példa.hu" },
              { label: "3. DNS", value: "IP keresés" },
              { label: "4. Szerver", value: "Lovable Cloud" },
              { label: "5. Válasz", value: "Weboldal ✓" },
            ].map((item, i) => (
              <div key={item.label} className="contents">
                <div className="tutorial-diagram-box">
                  <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">{item.label}</div>
                  <div className="font-heading font-bold text-foreground">{item.value}</div>
                </div>
                {i < 4 && <div className="tutorial-diagram-arrow">→</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Tervezd meg */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Tervezd meg a weboldaladat!</h3>
          <p className="text-muted-foreground mb-4">Mielőtt akár egyetlen sort is irnal, gondold vegig ezeket:</p>
          <ul className="tutorial-checklist list-none p-0 mb-5">
            {checklistItems.map((item, i) => (
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

          <TutorialTipBox variant="pro" icon="🎯" title="Pro tipp: Domain név választás">
            <p>Válassz rövid, könnyen megjegyezhető domain nevét. Kerüld a kötőjeleket és a számokat. Ha magyar célközönségnek készül, a <strong className="text-foreground">.hu</strong> kiterjesztés a legerősebb. Ha nemzetközi, válaszd a <strong className="text-foreground">.com</strong>-ot.</p>
          </TutorialTipBox>
        </div>

        {/* Amire szükséged lesz */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Amire szükséged lesz</h3>
          <div className="glass-card">
            <ul className="list-none p-0 space-y-2">
              {[
                "Egy modern böngésző (Chrome, Edge, Firefox)",
                "Lovable.dev fiók (ingyenes is elég a kezdeshez)",
                "Google fiók (Analytics-hoz és Search Console-hoz)",
                "~3-5 óra szabad idő",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-muted-foreground">
                  <Check size={18} className="text-green-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cost calculator */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Mennyibe kerul összesen?</h3>
          <p className="text-muted-foreground mb-4">Az egyik legjobb dolog a Lovable-ben, hogy szinte ingyen elkezdhetsz. Ime a teljes költségbontás:</p>
          <TutorialCostCalculator />

          <TutorialTipBox variant="success" icon="🎉" title="Akar 1000 Ft alatt elkezdheted!">
            <p>Az ingyenes Lovable csomaggal és egy .hu domainnel már indulhatsz. Később, ha kell, bármikor frissíthetsz Pro-ra a saját domain és több kredit érdekében.</p>
          </TutorialTipBox>
        </div>
      </div>
    </section>
  );
};

export default TutorialModule1;
