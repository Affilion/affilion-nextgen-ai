import TutorialAccordion from "./TutorialAccordion";
import TutorialPromptBox from "./TutorialPromptBox";
import TutorialTipBox from "./TutorialTipBox";

const TutorialModule4 = () => {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 border-b border-border/20" id="module-4">
      <div className="max-w-[820px] mx-auto">
        <div className="mb-10 tutorial-fade-up">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            <span className="tutorial-label-line" /> Modul 4
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3">Weblap Építése</h2>
          <p className="text-muted-foreground">Most jön a lényeg &mdash; tanuld még, hogyan írj hatékony promptokat és építsd fel az oldaladat lépésről lépésre.</p>
        </div>

        {/* Prompt tippek */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Prompt-írási tippek (Prompt Engineering)</h3>
          <p className="text-muted-foreground mb-4">Az AI minősége a te utasításaid minosoegetol függ. Íme a legjobb gyakorlatok:</p>

          <TutorialTipBox variant="pro" icon="🎯" title="Az aranyszabály: Legyél konkrét!">
            <p>Minél részletesebb a leírásod, annál jobb lesz az eredmény. Ne csak azt írd: &bdquo;csinálj szép oldalt&rdquo;, hanem írd le pontosan, mit szeretnél látni.</p>
          </TutorialTipBox>

          <div className="glass-card">
            <h4 className="font-heading font-semibold mb-2">❌ Rossz prompt:</h4>
            <p className="text-red-400 mb-4">&bdquo;Csinálj egy weboldalt.&rdquo;</p>
            <h4 className="font-heading font-semibold mb-2">✅ Jo prompt:</h4>
            <p className="text-green-400">&bdquo;Készíts egy modern portfólió weboldalt egy fotós számára. Legyen sötét háttér, nagy képek, egy galéria szekció 3 oszlopos grid-del, rólam szekció, es egy kapcsolat űrlap. A színvilág legyen meleg szürke és arány akcentus.&rdquo;</p>
          </div>
        </div>

        {/* Prompt sablonok */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Részletes prompt sablonok</h3>
          <p className="text-muted-foreground mb-4">Az alábbiakban kész, kiproobalt prompt sablonokat találsz különböző típusú weboldalakhoz. Csak másold be a Lovable chat-be!</p>

          {/* Étterem */}
          <div className="tutorial-prompt-template">
            <div className="tutorial-prompt-template-header">
              <span className="text-xl">🍽</span>
              <h5 className="text-sm font-semibold text-foreground">Étterem weboldal</h5>
            </div>
            <div className="tutorial-prompt-template-body">
              <TutorialPromptBox label="Étterem prompt sablon">{`Készíts egy elegáns étterem weboldalt. A stílus legyen sötét háttér, arany akcentus színekkel.

Az oldalon legyen:
- Hero szekció egy nagy háttérképpel és "Foglalj asztalt" gombbal
- Étlap/Menü szekció kategóriákkal (Előételek, Főételek, Desszertek, Italok) — minden ételhez név, rövid leírás és ár
- Rólunk szekció a séf bemutatásaval
- Galéria szekció az étterem fotóival (6 kép grid)
- Nyitvatartás és elérhetőség (cím, telefon, email)
- Asztalfoglalási űrlap (név, email, telefon, dátum, vendégszám, megjegyzés)
- Google Maps beágyazás a pontos címmel
- Legyen teljesen reszponzív, mobilbarát`}</TutorialPromptBox>
            </div>
          </div>

          {/* Portfólió */}
          <div className="tutorial-prompt-template">
            <div className="tutorial-prompt-template-header">
              <span className="text-xl">👤</span>
              <h5 className="text-sm font-semibold text-foreground">Személyes portfólió</h5>
            </div>
            <div className="tutorial-prompt-template-body">
              <TutorialPromptBox label="Portfólió prompt sablon">{`Készíts egy modern, minimalista személyes portfólió weboldalt. A stílus legyen letisztult, fehér háttér finom szürke árnyalatokkal és egy erős akcentus színnel (kék vagy lila).

Az oldalon legyen:
- Hero szekció a nevemmel, foglalkozásommal és egy rövid bemutatkozó mondattal
- Rólam szekció részletesebb bemutatkozással, képességek listájával (skill bar-ok vagy tag-ek)
- Portfólió/Munkáim szekció: 6 projekt kártya, mindegyiken kép, cím, rövid leírás és "Megnézem" gomb
- Tapasztalat szekció timeline/idővonal stílusban (munkahely, évszám, pozíció)
- Kapcsolat szekció: email, LinkedIn, GitHub linkek + kapcsolatfelvételi űrlap
- Letölthető önéletrajz gomb (CV)
- Legyen animált scroll effekt és teljesen reszponzív`}</TutorialPromptBox>
            </div>
          </div>

          {/* Szolgáltató */}
          <div className="tutorial-prompt-template">
            <div className="tutorial-prompt-template-header">
              <span className="text-xl">✂️</span>
              <h5 className="text-sm font-semibold text-foreground">Szolgáltató cég (pl. fodrász, szerviz)</h5>
            </div>
            <div className="tutorial-prompt-template-body">
              <TutorialPromptBox label="Szolgáltató prompt sablon">{`Készíts egy professzionális weboldalt egy szolgáltató vállalkozásnak. A stílus legyen modern, megbízhatóságot sugárzó, világos háttérrel és zöld/kék akcentus színnel.

Az oldalon legyen:
- Hero szekció figyelemfelkeltő szöveggel és "Időpontfoglalás" CTA gombbal
- Szolgáltatások szekció: legalább 6 szolgáltatás kártyán (ikon, cím, rövid leírás, ár)
- Árlista táblázat a szolgáltatásokkal és árakkal
- Rólunk szekció: a csapat bemutatása fotókkal és rövid bióval
- Vélemények szekció: 4-5 ugyfélvelemeny kártya (idézet, név, csillagos értékelés)
- Galéria: munkáink bemutatása (before/after vagy egyszerű grid)
- Nyitvatartás, cím, térkép, telefon, email
- Kapcsolatfelvételi/Időpontfoglalási űrlap
- Legyen teljesen reszponzív és mobilbarát`}</TutorialPromptBox>
            </div>
          </div>

          {/* Webshop */}
          <div className="tutorial-prompt-template">
            <div className="tutorial-prompt-template-header">
              <span className="text-xl">🛒</span>
              <h5 className="text-sm font-semibold text-foreground">Webshop / Termékbemutató</h5>
            </div>
            <div className="tutorial-prompt-template-body">
              <TutorialPromptBox label="Webshop prompt sablon">{`Készíts egy modern webshop/termékbemutató weboldalt. A stílus legyen letisztult, fehér háttér narancs vagy piros akcentus színnel.

Az oldalon legyen:
- Hero szekció a fő termékkel és "Vásárlás" gombbal
- Termék kategóriák szekció (3-4 kategória kártya képpel)
- Kiemelt termékek grid: 8 termék kártya (kép, név, ár, "Kosárba" gomb, kedvezmény badge ha van)
- Termék szűrés és rendezés lehetőség (kategória, ár)
- Egyedi termék oldal: nagy kép, leírás, ár, méret/szín választó, "Kosárba" gomb
- Vásárlói vélemények az egyes termékeknél
- Szállítási információk szekció
- GYIK (Gyakran Ismételt Kérdések) szekció accordion stílusban
- Kapcsolat és ügyfélszolgálat elérhetősége
- Legyen teljesen reszponzív és mobilbarát
- Kosár funkció sidebar-ral`}</TutorialPromptBox>
            </div>
          </div>

          <TutorialTipBox variant="info" icon="💡" title="Tipp: Testreszabás">
            <p>Ezek kiindulópontok &mdash; szabadon módosítsd a színeket, szekciókat és a szöveget az igenyyeidnek megfelelően. Minél részletesebb a leírásod, annál jobb lesz az eredmény!</p>
          </TutorialTipBox>
        </div>

        {/* Tipikus oldal-struktúra */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Tipikus oldal-struktúra</h3>
          <p className="text-muted-foreground mb-4">A legtöbb weboldal ezekből az oldalakból áll:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
            {[
              { icon: "🏠", name: "Főoldal", desc: "Hero, bemutatkozás, CTA" },
              { icon: "👤", name: "Rólunk", desc: "Történet, csapat, értékek" },
              { icon: "⚡", name: "Szolgáltatások", desc: "Mit kínálsz?" },
              { icon: "📬", name: "Kapcsolat", desc: "Űrlap, térkép, elérhetőség" },
            ].map((p) => (
              <div key={p.name} className="glass-card text-center">
                <div className="text-3xl mb-2">{p.icon}</div>
                <h4 className="font-heading font-semibold mb-1">{p.name}</h4>
                <p className="text-xs text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hasznos promptok */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Hasznos promptok</h3>
          <TutorialPromptBox label="Szekció hozzáadása">{`Add hozzá a főoldalhoz egy „Vélemények" szekciót. Legyen 3 kártya, mindegyiken egy idézet, a személy neve, es csillagos értékelés (5/5). Használj glassmorphism kártya-designt.`}</TutorialPromptBox>
          <TutorialPromptBox label="Reszponzív design">{`Tedd az egész weboldalt teljesen reszponzívvá. Mobilon egymás alá kerüljenek a kártyák, a menü legyen hamburger menü, a szöveg jól olvasható legyen kis képernyőn is.`}</TutorialPromptBox>
          <TutorialPromptBox label="Képek kezelése">{`Cseréld le az összes placeholder képet Unsplash képekre. A hero kép legyen egy modern irodai környezet, a szolgáltatások szekció képei legyenek tech-témájúak.`}</TutorialPromptBox>
        </div>

        {/* Tippek */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Tippek a hatékony építéshez</h3>
          <TutorialAccordion title="Lepesenként építkezz">
            <p className="text-muted-foreground">Ne akarj egyszerre mindent! Először készítsd el az alapstrukturaat, aztaan finomítsd a részleteket. Lepesenként kérd az AI-t, hogy adjon hozzá vagy módosítson.</p>
          </TutorialAccordion>
          <TutorialAccordion title="Mobil-barát design">
            <p className="text-muted-foreground">A látogatóid nagy része mobilról fog jönni! A Lovable automatikusan reszponzív kódot generál, de mindig ellenőrizd a mobil előnézetet. Ha valami nem stimmel, írd be: &bdquo;Fix the mobile layout for the services section&rdquo;.</p>
          </TutorialAccordion>
          <TutorialAccordion title="Figma import">
            <p className="text-muted-foreground">Ha van Figma design-od, egyszerűen importálhatod a Lovable-be! Használd a Figma import funkciót, es az AI a design alapján generálja a kódot. Ez különösen hasznos, ha van designed, vagy ha sablonból indulsz.</p>
          </TutorialAccordion>
          <TutorialAccordion title="Verziókezelés (History)">
            <p className="text-muted-foreground">A Lovable minden változatot ment. Ha valami nem tetszik, bármikor visszaléphetsz. Használd ezt bátran: próbálj ki merész változtatásokat &mdash; ha nem jo, egyszerűen visszaállsz!</p>
          </TutorialAccordion>
        </div>
      </div>
    </section>
  );
};

export default TutorialModule4;
