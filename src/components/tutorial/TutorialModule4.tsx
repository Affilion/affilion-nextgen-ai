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
          <p className="text-muted-foreground">Most jon a lényeg &mdash; tanuld meg, hogyan írj hatékony promptokat és epitsd fel az oldaladat lépésről lepesre.</p>
        </div>

        {/* Prompt tippek */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Prompt-irasi tippek (Prompt Engineering)</h3>
          <p className="text-muted-foreground mb-4">Az AI minosege a te utasitasaid minosoegetol fugg. Ime a legjobb gyakorlatok:</p>

          <TutorialTipBox variant="pro" icon="🎯" title="Az aranyszabály: Legyél konkrét!">
            <p>Minel részletesebb a leirasod, annál jobb lesz az eredmeny. Ne csak azt írd: &bdquo;csinalj szep oldalt&rdquo;, hanem írd le pontosan, mit szeretnel latni.</p>
          </TutorialTipBox>

          <div className="glass-card">
            <h4 className="font-heading font-semibold mb-2">❌ Rossz prompt:</h4>
            <p className="text-red-400 mb-4">&bdquo;Csinalj egy weboldalt.&rdquo;</p>
            <h4 className="font-heading font-semibold mb-2">✅ Jo prompt:</h4>
            <p className="text-green-400">&bdquo;Készíts egy modern portfólió weboldalt egy fotos számára. Legyen sotet háttér, nagy képek, egy galeria szekció 3 oszlopos grid-del, rolam szekció, es egy kapcsolat űrlap. A szinvilag legyen meleg szurke és arány akcentus.&rdquo;</p>
          </div>
        </div>

        {/* Prompt sablonok */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Reszletes prompt sablonok</h3>
          <p className="text-muted-foreground mb-4">Az alabbiakban kész, kiproobalt prompt sablonokat találsz különböző tipusu weboldalakhoz. Csak másold be a Lovable chat-be!</p>

          {/* Étterem */}
          <div className="tutorial-prompt-template">
            <div className="tutorial-prompt-template-header">
              <span className="text-xl">🍽</span>
              <h5 className="text-sm font-semibold text-foreground">Étterem weboldal</h5>
            </div>
            <div className="tutorial-prompt-template-body">
              <TutorialPromptBox label="Étterem prompt sablon">{`Készíts egy elegáns étterem weboldalt. A stilus legyen sotet háttér arány akcentus szinekkel.

Az oldalon legyen:
- Hero szekció egy nagy háttérképpel és "Foglalj asztalt" gombbal
- Etlap/Menu szekció kategoriakkal (Eloetelek, Foetelek, Desszertek, Italok) — minden etelhez név, rövid leírás és ar
- Rólunk szekció a sef bemutatásaval
- Galeria szekció az étterem fotoival (6 kép grid)
- Nyitvatartas és elérhetőség (cím, telefon, email)
- Asztalfoglalasi űrlap (név, email, telefon, datum, vendegszam, megjegyzes)
- Google Maps beagyazas a pontos cimmel
- Legyen teljesen reszponzív, mobilbarat`}</TutorialPromptBox>
            </div>
          </div>

          {/* Portfólió */}
          <div className="tutorial-prompt-template">
            <div className="tutorial-prompt-template-header">
              <span className="text-xl">👤</span>
              <h5 className="text-sm font-semibold text-foreground">Személyes portfólió</h5>
            </div>
            <div className="tutorial-prompt-template-body">
              <TutorialPromptBox label="Portfólió prompt sablon">{`Készíts egy modern, minimalista személyes portfólió weboldalt. A stilus legyen letisztult, feher háttér finom szurke arnyalatokkal és egy eros akcentus szinnel (kek vagy lila).

Az oldalon legyen:
- Hero szekció a nevemmel, foglalkozasommal és egy rövid bemutatkozó mondattal
- Rolam szekció részletesebb bemutatkozassal, kepessegek listajaval (skill bar-ok vagy tag-ek)
- Portfólió/Munkaim szekció: 6 projekt kártya, mindegyiken kép, cím, rövid leírás és "Megnézem" gomb
- Tapasztalat szekció timeline/idovonal stilusban (munkahely, evszam, pozicio)
- Kapcsolat szekció: email, LinkedIn, GitHub linkek + kapcsolatfelvételi űrlap
- Letölthető oneletrajz gomb (CV)
- Legyen animalt scroll effekt és teljesen reszponzív`}</TutorialPromptBox>
            </div>
          </div>

          {/* Szolgáltató */}
          <div className="tutorial-prompt-template">
            <div className="tutorial-prompt-template-header">
              <span className="text-xl">✂️</span>
              <h5 className="text-sm font-semibold text-foreground">Szolgáltató cég (pl. fodrasz, szerviz)</h5>
            </div>
            <div className="tutorial-prompt-template-body">
              <TutorialPromptBox label="Szolgáltató prompt sablon">{`Készíts egy professzionális weboldalt egy szolgáltató vallalkozasnak. A stilus legyen modern, megbizhatosagot sugarzo, vilagos hatterrel és zold/kek akcentus szinnel.

Az oldalon legyen:
- Hero szekció figyelemfelkeltő szöveggel és "Időpontfoglalás" CTA gombbal
- Szolgáltatások szekció: legalabb 6 szolgáltatás kártyán (ikon, cím, rövid leírás, ar)
- Arlista tablazat a szolgaltatasokkal és arakkal
- Rólunk szekció: a csapat bemutatása fotokkal és rövid bioval
- Vélemények szekció: 4-5 ugyfélvelemeny kártya (idézet, név, csillagos értékelés)
- Galeria: munkaink bemutatása (before/after vagy egyszerű grid)
- Nyitvatartas, cím, térkép, telefon, email
- Kapcsolatfelveteli/Idopontfoglalasi űrlap
- Legyen teljesen reszponzív és mobilbarat`}</TutorialPromptBox>
            </div>
          </div>

          {/* Webshop */}
          <div className="tutorial-prompt-template">
            <div className="tutorial-prompt-template-header">
              <span className="text-xl">🛒</span>
              <h5 className="text-sm font-semibold text-foreground">Webshop / Termekbemutato</h5>
            </div>
            <div className="tutorial-prompt-template-body">
              <TutorialPromptBox label="Webshop prompt sablon">{`Készíts egy modern webshop/termekbemutato weboldalt. A stilus legyen letisztult, feher háttér narancs vagy piros akcentus szinnel.

Az oldalon legyen:
- Hero szekció a fő termékkel és "Vásárlás" gombbal
- Termek kategoriak szekció (3-4 kategoria kártya keppel)
- Kiemelt termekek grid: 8 termek kártya (kép, név, ar, "Kosarba" gomb, kedvezmény badge ha van)
- Termek szures és rendezes lehetőség (kategoria, ar)
- Egyedi termek oldal: nagy kép, leírás, ar, meret/szin valaszto, "Kosarba" gomb
- Vasarloi vélemények az egyes termekeknel
- Szallitasi informaciok szekció
- GYIK (Gyakran Ismetelt Kerdesek) szekció accordion stilusban
- Kapcsolat és ügyfélszolgálat elerhetosege
- Legyen teljesen reszponzív és mobilbarat
- Kosár funkció sidebar-ral`}</TutorialPromptBox>
            </div>
          </div>

          <TutorialTipBox variant="info" icon="💡" title="Tipp: Testreszabás">
            <p>Ezek kiindulopontok &mdash; szabadon módosítsd a színeket, szekciókat és a szöveget az igenyyeidnek megfelelően. Minel részletesebb a leirasod, annál jobb lesz az eredmeny!</p>
          </TutorialTipBox>
        </div>

        {/* Tipikus oldal-struktura */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Tipikus oldal-struktura</h3>
          <p className="text-muted-foreground mb-4">A legtobb weboldal ezekbol az oldalakbol áll:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
            {[
              { icon: "🏠", name: "Főoldal", desc: "Hero, bemutatkozás, CTA" },
              { icon: "👤", name: "Rólunk", desc: "Történet, csapat, értékek" },
              { icon: "⚡", name: "Szolgáltatások", desc: "Mit kinalsz?" },
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
          <TutorialPromptBox label="Szekcio hozzáadása">{`Add hozza a fooldalhoz egy „Vélemények" szekciót. Legyen 3 kártya, mindegyiken egy idézet, a szemely neve, es csillagos értékelés (5/5). Használj glassmorphism kártya-designt.`}</TutorialPromptBox>
          <TutorialPromptBox label="Reszponzív design">{`Tedd az egesz weboldalt teljesen reszponzivva. Mobilon egymas ala keruljenek a kártyák, a menü legyen hamburger menü, a szöveg jol olvashato legyen kis képernyőn is.`}</TutorialPromptBox>
          <TutorialPromptBox label="Kepek kezelése">{`Csereld le az összes placeholder képet Unsplash kepekre. A hero kép legyen egy modern irodai kornyezet, a szolgáltatások szekció kepei legyenek tech-temajuak.`}</TutorialPromptBox>
        </div>

        {/* Tippek */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Tippek a hatékony építéshez</h3>
          <TutorialAccordion title="Lepesenként epitkezz">
            <p className="text-muted-foreground">Ne akarj egyszerre mindent! Eloszor készítsd el az alapstrukturaat, aztaan finomitsd a részleteket. Lepesenként kerd az AI-t, hogy adjon hozza vagy modositson.</p>
          </TutorialAccordion>
          <TutorialAccordion title="Mobil-barat design">
            <p className="text-muted-foreground">A látogatóid nagy része mobilrol fog jonni! A Lovable automatikusan reszponzív kódot general, de mindig ellenőrizd a mobil elonezetet. Ha valami nem stimmel, írd be: &bdquo;Fix the mobile layout for the services section&rdquo;.</p>
          </TutorialAccordion>
          <TutorialAccordion title="Figma import">
            <p className="text-muted-foreground">Ha van Figma design-od, egyszerűen importálhatod a Lovable-be! Használd a Figma import funkciót, es az AI a design alapján generálja a kódot. Ez különösen hasznos, ha van designed, vagy ha sablonból indulsz.</p>
          </TutorialAccordion>
          <TutorialAccordion title="Verziokezeles (History)">
            <p className="text-muted-foreground">A Lovable minden változatot ment. Ha valami nem tetszik, bármikor visszalephetsz. Használd ezt batran: probalj ki meresz valtoztatasokat &mdash; ha nem jo, egyszerűen visszaallsz!</p>
          </TutorialAccordion>
        </div>
      </div>
    </section>
  );
};

export default TutorialModule4;
