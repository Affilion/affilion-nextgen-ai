import TutorialAccordion from "./TutorialAccordion";
import TutorialPromptBox from "./TutorialPromptBox";
import TutorialTipBox from "./TutorialTipBox";

/* ========== MINI MOCKUP COMPONENTS ========== */

const SupabaseConnectMockup = () => (
  <div className="tutorial-ui-mockup tutorial-fade-up">
    <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]" style={{ background: "hsl(var(--background))" }}>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-md flex items-center justify-center text-white text-sm font-bold" style={{ background: "linear-gradient(135deg, #3ecf8e, #1a9f60)" }}>S</div>
        <span className="text-foreground text-xs font-medium">Supabase Bekapcsolása</span>
      </div>
    </div>
    <div className="p-5 flex flex-col items-center gap-4">
      <div className="flex items-center gap-3 w-full max-w-xs">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ background: "linear-gradient(135deg, #e44d8a, hsl(var(--secondary)))" }}>L</div>
        <div className="flex-1 h-[2px] bg-gradient-to-r from-pink-500 via-primary to-green-500 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-background border-2 border-primary flex items-center justify-center text-[10px]">&#x2194;</div>
        </div>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm text-white font-bold" style={{ background: "linear-gradient(135deg, #3ecf8e, #1a9f60)" }}>S</div>
      </div>
      <p className="text-muted-foreground text-[11px] text-center">Lovable &harr; Supabase egyetlen kattintással</p>
      <div className="px-4 py-2 rounded-lg text-xs font-semibold text-white" style={{ background: "linear-gradient(135deg, #3ecf8e, #1a9f60)" }}>Enable Supabase</div>
    </div>
  </div>
);

const AuthFormMockup = () => (
  <div className="tutorial-ui-mockup tutorial-fade-up">
    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06]" style={{ background: "hsl(var(--background))" }}>
      <span className="text-sm">&#x1f512;</span>
      <span className="text-foreground text-xs font-medium">Bejelentkezés / Regisztráció</span>
    </div>
    <div className="p-6 flex flex-col items-center gap-4" style={{ background: "hsl(var(--card) / 0.5)" }}>
      <div className="w-full max-w-xs space-y-3">
        <div className="text-center mb-2">
          <h5 className="text-foreground text-sm font-bold">Bejelentkezés</h5>
          <p className="text-muted-foreground text-[10px]">Jelentkezz be a fiókodba</p>
        </div>
        <div className="px-3 py-2.5 rounded-lg border border-white/[0.08] bg-white/[0.03] text-muted-foreground text-[11px]">pelda@email.hu</div>
        <div className="px-3 py-2.5 rounded-lg border border-white/[0.08] bg-white/[0.03] text-muted-foreground text-[11px]">&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;</div>
        <div className="w-full py-2.5 rounded-lg text-center text-white text-[11px] font-semibold" style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))" }}>Bejelentkezés</div>
        <div className="flex items-center gap-2 my-1">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-muted-foreground text-[9px]">VAGY</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>
        <div className="w-full py-2 rounded-lg text-center text-muted-foreground text-[11px] border border-white/[0.08] bg-white/[0.03] flex items-center justify-center gap-2">
          <span className="text-sm">G</span> Bejelentkezés Google-lel
        </div>
        <p className="text-center text-muted-foreground text-[9px]">Nincs fiókod? <span className="text-primary">Regisztrálj</span></p>
      </div>
    </div>
  </div>
);

const ContactFormMockup = () => (
  <div className="tutorial-ui-mockup tutorial-fade-up">
    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06]" style={{ background: "hsl(var(--background))" }}>
      <span className="text-sm">&#x1f4e7;</span>
      <span className="text-foreground text-xs font-medium">Kapcsolatfelvételi Űrlap</span>
    </div>
    <div className="p-6" style={{ background: "hsl(var(--card) / 0.5)" }}>
      <div className="max-w-xs mx-auto space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="px-3 py-2 rounded-lg border border-white/[0.08] bg-white/[0.03] text-muted-foreground text-[11px]">Vezetéknév</div>
          <div className="px-3 py-2 rounded-lg border border-white/[0.08] bg-white/[0.03] text-muted-foreground text-[11px]">Keresztnév</div>
        </div>
        <div className="px-3 py-2 rounded-lg border border-white/[0.08] bg-white/[0.03] text-muted-foreground text-[11px]">E-mail cím</div>
        <div className="px-3 py-2 rounded-lg border border-white/[0.08] bg-white/[0.03] text-muted-foreground text-[11px]">Telefon (opcionális)</div>
        <div className="px-3 py-2 rounded-lg border border-white/[0.08] bg-white/[0.03] text-muted-foreground text-[11px] h-20">Üzenet...</div>
        <div className="w-full py-2.5 rounded-lg text-center text-white text-[11px] font-semibold" style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))" }}>Üzenet küldése</div>
      </div>
    </div>
  </div>
);

const ImageUploadMockup = () => (
  <div className="tutorial-ui-mockup tutorial-fade-up">
    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06]" style={{ background: "hsl(var(--background))" }}>
      <span className="text-sm">&#x1f5bc;&#xfe0f;</span>
      <span className="text-foreground text-xs font-medium">Képfeltöltés</span>
    </div>
    <div className="p-6" style={{ background: "hsl(var(--card) / 0.5)" }}>
      <div className="max-w-xs mx-auto">
        <div className="border-2 border-dashed border-white/[0.15] rounded-xl p-6 text-center hover:border-primary/40 transition-colors">
          <div className="text-3xl mb-2">&#x2601;&#xfe0f;</div>
          <p className="text-foreground text-[11px] font-medium mb-1">Húzd ide a képet, vagy kattints</p>
          <p className="text-muted-foreground text-[9px]">PNG, JPG, WEBP &mdash; max. 5 MB</p>
        </div>
        <div className="mt-3 flex gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex-1 aspect-square rounded-lg overflow-hidden border border-white/[0.08]" style={{ background: `linear-gradient(${135 + i * 30}deg, hsl(var(--primary) / 0.15), hsl(var(--secondary) / 0.15))` }}>
              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-[9px]">kep{i}.jpg</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const BlogMockup = () => (
  <div className="tutorial-ui-mockup tutorial-fade-up">
    <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]" style={{ background: "hsl(var(--background))" }}>
      <div className="flex items-center gap-2">
        <span className="text-sm">&#x1f4dd;</span>
        <span className="text-foreground text-xs font-medium">Blog Admin</span>
      </div>
      <div className="px-3 py-1 rounded-md text-[11px] font-medium text-white" style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))" }}>+ Uj bejegyzes</div>
    </div>
    <div className="p-4 space-y-2" style={{ background: "hsl(var(--card) / 0.5)" }}>
      {[
        { title: "5 tipp a jobb weboldalhoz", date: "2026. marc. 20.", status: "Publikus", color: "#10b981" },
        { title: "Miert fontos az SEO?", date: "2026. marc. 18.", status: "Publikus", color: "#10b981" },
        { title: "Lovable tippek kezdoknek", date: "2026. marc. 15.", status: "Piszkozat", color: "#f59e0b" },
      ].map((post) => (
        <div key={post.title} className="flex items-center justify-between p-3 rounded-lg border border-white/[0.06] bg-white/[0.02]">
          <div>
            <h6 className="text-foreground text-[11px] font-semibold">{post.title}</h6>
            <p className="text-muted-foreground text-[9px]">{post.date}</p>
          </div>
          <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full" style={{ background: `${post.color}18`, color: post.color }}>{post.status}</span>
        </div>
      ))}
    </div>
  </div>
);

const AdminPanelMockup = () => (
  <div className="tutorial-ui-mockup tutorial-fade-up">
    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06]" style={{ background: "hsl(var(--background))" }}>
      <span className="text-sm">&#x2699;&#xfe0f;</span>
      <span className="text-foreground text-xs font-medium">Admin Dashboard</span>
    </div>
    <div className="flex min-h-[200px]">
      <div className="w-[140px] border-r border-white/[0.06] p-2 space-y-1" style={{ background: "hsl(var(--background))" }}>
        {["Dashboard", "Felhasznalok", "Termekek", "Rendelesek", "Beallitasok"].map((item, i) => (
          <div key={item} className={`px-3 py-1.5 rounded text-[10px] ${i === 0 ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground"}`}>{item}</div>
        ))}
      </div>
      <div className="flex-1 p-4">
        <div className="grid grid-cols-3 gap-2 mb-3">
          {[
            { label: "Felhasznalok", value: "248", icon: "&#x1f465;", color: "hsl(var(--primary))" },
            { label: "Rendelesek", value: "1,847", icon: "&#x1f6d2;", color: "#10b981" },
            { label: "Bevetel", value: "2.4M Ft", icon: "&#x1f4b0;", color: "#f59e0b" },
          ].map((stat) => (
            <div key={stat.label} className="p-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02]">
              <div className="text-[9px] text-muted-foreground mb-1">{stat.label}</div>
              <div className="text-sm font-bold" style={{ color: stat.color }}>{stat.value}</div>
            </div>
          ))}
        </div>
        <div className="text-[9px] text-muted-foreground font-semibold uppercase tracking-wider mb-2">Legutóbbi rendelések</div>
        {[
          { name: "Kovács Anna", amount: "12,500 Ft", status: "Teljesítve" },
          { name: "Nagy Péter", amount: "8,900 Ft", status: "Folyamatban" },
        ].map((order) => (
          <div key={order.name} className="flex items-center justify-between py-1.5 border-b border-white/[0.04] text-[10px]">
            <span className="text-foreground">{order.name}</span>
            <span className="text-muted-foreground">{order.amount}</span>
            <span className="text-green-400">{order.status}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const WebshopMockup = () => (
  <div className="tutorial-ui-mockup tutorial-fade-up">
    <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]" style={{ background: "hsl(var(--background))" }}>
      <div className="flex items-center gap-2">
        <span className="text-sm">&#x1f6d2;</span>
        <span className="text-foreground text-xs font-medium">Webshop</span>
      </div>
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08]">
        <span className="text-[10px]">&#x1f6d2;</span>
        <span className="text-foreground text-[10px] font-semibold">3</span>
      </div>
    </div>
    <div className="p-4" style={{ background: "hsl(var(--card) / 0.5)" }}>
      <div className="grid grid-cols-3 gap-2">
        {[
          { name: "Premium Polo", price: "12,900 Ft" },
          { name: "Lenvászon Táska", price: "8,500 Ft" },
          { name: "Bőr Készlet", price: "24,900 Ft" },
        ].map((product) => (
          <div key={product.name} className="rounded-lg border border-white/[0.06] bg-white/[0.02] overflow-hidden">
            <div className="aspect-square flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--secondary) / 0.1))" }}>
              <span className="text-2xl">&#x1f4e6;</span>
            </div>
            <div className="p-2">
              <h6 className="text-[10px] text-foreground font-semibold">{product.name}</h6>
              <p className="text-[10px] text-primary font-bold">{product.price}</p>
              <div className="mt-1.5 w-full py-1 rounded text-center text-[8px] font-semibold text-white" style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))" }}>Kosárba</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ========== STEP FLOW COMPONENT ========== */
const StepFlow = ({ steps }: { steps: { num: string; title: string; desc: string }[] }) => (
  <div className="tutorial-backend-steps">
    {steps.map((step, i) => (
      <div key={i} className="flex gap-4 mb-4 last:mb-0">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))" }}>{step.num}</div>
          {i < steps.length - 1 && <div className="w-px flex-1 bg-gradient-to-b from-primary/40 to-transparent mt-1" />}
        </div>
        <div className="pb-4">
          <h5 className="text-foreground text-sm font-semibold mb-1">{step.title}</h5>
          <p className="text-muted-foreground text-xs leading-relaxed">{step.desc}</p>
        </div>
      </div>
    ))}
  </div>
);


/* ========== MAIN MODULE ========== */
const TutorialModule5 = () => {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 border-b border-border/20" id="module-5">
      <div className="max-w-[820px] mx-auto">
        <div className="mb-10 tutorial-fade-up">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary mb-3">
            <span className="tutorial-label-line" /> Modul 5
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-3">Backend és Adatbázis</h2>
          <p className="text-muted-foreground">Ha a weboldaladnak adatokat kell kezelnie (űrlap, bejelentkezés, feltöltés), itt megtanulod, hogyan.</p>
        </div>

        {/* ===================== MIKOR KELL BACKEND ===================== */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">Mikor van szükséged backend-re?</h3>
          <div className="tutorial-backend-grid grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div className="glass-card">
              <h4 className="text-green-400 font-semibold mb-2">&#x2705; Kell backend, ha:</h4>
              <ul className="text-sm text-muted-foreground pl-5 space-y-1 list-disc">
                <li>Felhasználói regisztráció/bejelentkezés</li>
                <li>Kapcsolatfelvételi űrlap, ami ment</li>
                <li>Kép/fájl feltöltés</li>
                <li>Dinamikus tartalom (blog)</li>
                <li>Admin panel</li>
                <li>Webshop funkciók</li>
              </ul>
            </div>
            <div className="glass-card">
              <h4 className="text-red-400 font-semibold mb-2">&#x274c; Nem kell backend, ha:</h4>
              <ul className="text-sm text-muted-foreground pl-5 space-y-1 list-disc">
                <li>Egyszerű bemutatkozó oldal</li>
                <li>Portfólió, galéria</li>
                <li>Statikus tartalom</li>
                <li>Landing page</li>
                <li>Egyszerű információs oldal</li>
              </ul>
            </div>
          </div>

          <TutorialTipBox variant="info" icon="&#x1f4a1;" title="Ne ijedj meg a backend szótól!">
            <p>A Lovable + Supabase kombináció miatt neked szó szerint semmilyen programozási tudásra nincs szükséged. Mindent promptokkal (utasításokkal) kérsz, és az AI megcsinálja. Ebben a modulban minden funkciónál megkapod a kész promptot &mdash; csak másold be!</p>
          </TutorialTipBox>
        </div>

        {/* ===================== SUPABASE BEKAPCSOLÁSA ===================== */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-3">0. lépés: Supabase bekapcsolása</h3>
          <p className="text-muted-foreground mb-4">Mielőtt bármelyik backend funkciót használnád, be kell kapcsolnod a Supabase-t a projektedben. Ez egyetlen kattintás:</p>

          <SupabaseConnectMockup />

          <StepFlow steps={[
            { num: "1", title: "Nyisd meg a projektedet a Lovable-ben", desc: "Menj a Lovable-be, nyisd meg azt a projektet, amihez backend-et szeretnél." },
            { num: "2", title: "Kattints a Supabase ikonra", desc: "A bal oldali menüben (vagy felül) találsz egy zöld Supabase ikont. Kattints rá." },
            { num: "3", title: "Kattints az 'Enable Supabase' gombra", desc: "A Lovable automatikusan létrehozza a Supabase projektet és összeköti az oldaladdal. Ez 10-20 másodpercet vesz igénybe." },
            { num: "4", title: "Kész!", desc: "Mostantól használhatsz adatbázist, felhasználó-kezelést, fájltárolást és mindent, amit ebben a modulban megtanulsz." },
          ]} />

          <TutorialTipBox variant="warning" icon="&#x26a0;&#xfe0f;" title="Fontos: a Supabase ingyenes!">
            <p>A Supabase alap csomagja ingyenes, és a legtöbb kis-közepes weboldalhoz tökéletesen elegendő. Fizetős csomag csak akkor kell, ha nagyon sok felhasználód vagy adatod van.</p>
          </TutorialTipBox>
        </div>

        {/* ===================== 1. REGISZTRÁCIÓ / BEJELENTKEZÉS ===================== */}
        <div className="mb-10 tutorial-fade-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--secondary) / 0.15))", border: "1px solid hsl(var(--primary) / 0.25)" }}>&#x1f512;</div>
            <div>
              <h3 className="text-xl font-bold font-heading">1. Felhasználói regisztráció és bejelentkezés</h3>
              <p className="text-muted-foreground text-sm">Amikor az oldaladra be kell tudniuk jelentkezni az embereknek</p>
            </div>
          </div>

          <p className="text-muted-foreground mb-4">Ha szeretnéd, hogy a látogatóid regisztráljanak és bejelentkezzenek (például egy ügyfélportálhoz, privát tartalomhoz, vagy webshophoz), ezt nagyon egyszerűen megoldhatod.</p>

          <AuthFormMockup />

          <h4 className="text-base font-bold font-heading mt-6 mb-3">Hogyan csináld? &mdash; lépésről lépésre</h4>

          <StepFlow steps={[
            { num: "1", title: "Kapcsold be a Supabase-t (ha még nem tetted)", desc: "Lásd fentebb a 0. lépést." },
            { num: "2", title: "Másold be az alábbi promptot a Lovable chat-be", desc: "A Lovable automatikusan létrehozza a bejelentkezési és regisztrációs oldalt, az adatbázis táblákat, és a hitelesítési logikát." },
            { num: "3", title: "Teszteld", desc: "Regisztrálj egy teszt email-lel, majd próbáld meg a bejelentkezést. Ha működik, kész vagy!" },
          ]} />

          <TutorialPromptBox label="Prompt &mdash; Masold be a Lovable-be">{`Add user authentication to my website using Supabase Auth.

Create:
1. A login page with email and password fields, a "Login" button, and a "Register" link
2. A registration page with name, email, password, and "Confirm password" fields
3. A protected dashboard page that only logged-in users can access
4. If someone tries to visit the dashboard without logging in, redirect them to the login page
5. Add a logout button in the dashboard header
6. After successful login, redirect to the dashboard
7. After successful registration, show a success message saying "Registration successful! Please check your email."
8. Make the forms responsive and modern looking
9. Add Google login button as an option (OAuth)`}</TutorialPromptBox>

          <TutorialTipBox variant="success" icon="&#x2705;" title="Eredmény">
            <p>Ez a prompt egy komplett bejelentkezési rendszert hoz létre: regisztrációs oldal, bejelentkezési oldal, védett dashboard, kijelentkezés gomb, és még Google bejelentkezés is. Mindezt anélkül, hogy egyetlen sor kódot írnál!</p>
          </TutorialTipBox>

          <TutorialTipBox variant="pro" icon="&#x1f4a1;" title="Google bejelentkezés beállítása">
            <p>A Google login-hoz a Supabase dashboard-on be kell állítanod a Google OAuth kulcsokat. A Supabase honlapján ezt a <strong>Authentication &rarr; Providers &rarr; Google</strong> menüben találod. A Lovable akár ebben is segít, ha megkéred: &bdquo;Guide me through setting up Google OAuth in Supabase&rdquo;.</p>
          </TutorialTipBox>
        </div>

        {/* ===================== 2. KAPCSOLATFELVÉTELI ŰRLAP ===================== */}
        <div className="mb-10 tutorial-fade-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: "linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(59, 130, 246, 0.05))", border: "1px solid rgba(59, 130, 246, 0.25)" }}>&#x1f4e7;</div>
            <div>
              <h3 className="text-xl font-bold font-heading">2. Kapcsolatfelvételi űrlap, ami valóban ment</h3>
              <p className="text-muted-foreground text-sm">Az üzenetek az adatbázisba mentődnek &mdash; soha nem vesznek el</p>
            </div>
          </div>

          <p className="text-muted-foreground mb-4">Egy egyszerű kapcsolatfelvételi űrlap, ahol a látogató kitölti a nevét, emailjét és üzenetét &mdash; és az üzenet elmentődik az adatbázisba. Sőt, akár email értesítést is kaphatsz róla!</p>

          <ContactFormMockup />

          <h4 className="text-base font-bold font-heading mt-6 mb-3">Hogyan csináld?</h4>

          <StepFlow steps={[
            { num: "1", title: "Kapcsold be a Supabase-t", desc: "Ha még nem tetted meg, lásd a 0. lépést." },
            { num: "2", title: "Add meg az alábbi promptot", desc: "Ez létrehoz egy komplett űrlapot, adatbázis táblát, és a mentési logikát." },
            { num: "3", title: "Teszteld az űrlapot", desc: "Töltsd ki teszt adatokkal. Utána menj a Supabase dashboardra, és nézd meg a 'contact_messages' táblában a beérkezett üzenetet." },
          ]} />

          <TutorialPromptBox label="Prompt &mdash; Alap kapcsolat urlap">{`Create a contact form section for my website.

The form should have these fields:
- Full name (required)
- Email address (required, with email validation)  
- Phone number (optional)
- Subject dropdown (General question, Price request, Cooperation, Other)
- Message textarea (required, minimum 10 characters)

Save all submissions to a Supabase table called "contact_messages" with columns: id, created_at, full_name, email, phone, subject, message, is_read (boolean, default false).

After successful submission, show a green success toast: "Köszönjük! Üzenetét megkaptuk, hamarosan válaszolunk."
Clear the form after submission.
Add form validation with error messages in Hungarian.
Make the form responsive and modern.`}</TutorialPromptBox>

          <TutorialTipBox variant="pro" icon="&#x1f4e8;" title="Bónusz: Email értesítés">
            <p>Ha azt is szeretnéd, hogy emailben értesítést kapj, amikor valaki kitölti az űrlapot, add hozzá ezt a kiegészítő promptot:</p>
          </TutorialTipBox>

          <TutorialPromptBox label="Prompt &mdash; Email ertesites (bonusz)">{`When someone submits the contact form, also send me an email notification using a Supabase Edge Function.

The email should contain the sender's name, email, subject, and message.
Use Resend (resend.com) as email provider.
Send the notification to: TE-EMAIL-CIMED-IDE@gmail.com
Email subject: "Új üzenet érkezett a weboldalról: [sender name]"

Add the RESEND_API_KEY to Supabase secrets.`}</TutorialPromptBox>

          <TutorialTipBox variant="info" icon="&#x2139;&#xfe0f;" title="Hol olvasod az üzeneteket?">
            <p>A Supabase dashboard-on a <strong>Table Editor &rarr; contact_messages</strong> táblában láthatod az összes beérkezett üzenetet. De ha admin panelt is készítesz (lásd lejjebb), az is mutatja őket!</p>
          </TutorialTipBox>
        </div>

        {/* ===================== 3. KÉP / FÁJL FELTÖLTÉS ===================== */}
        <div className="mb-10 tutorial-fade-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: "linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.05))", border: "1px solid rgba(16, 185, 129, 0.25)" }}>&#x1f5bc;&#xfe0f;</div>
            <div>
              <h3 className="text-xl font-bold font-heading">3. Kép és fájl feltöltés</h3>
              <p className="text-muted-foreground text-sm">Profilképek, termékfotók, dokumentumok feltöltése</p>
            </div>
          </div>

          <p className="text-muted-foreground mb-4">Ha a felhasználóidnak képeket vagy fájlokat kell feltölteniük (profilkép, portfólió, termékfotó, dokumentum), a Supabase Storage megoldja.</p>

          <ImageUploadMockup />

          <h4 className="text-base font-bold font-heading mt-6 mb-3">Hogyan csináld?</h4>

          <StepFlow steps={[
            { num: "1", title: "Supabase bekapcsolva?", desc: "A Storage automatikusan elérhető, amint a Supabase be van kapcsolva." },
            { num: "2", title: "Prompt beküldése", desc: "Az alábbi prompt létrehozza a feltöltési felületet, a Supabase Storage bucket-et, és a mentési logikát." },
            { num: "3", title: "Teszteld", desc: "Próbálj meg egy képet feltölteni. A Supabase dashboardon a Storage menüben láthatod a feltöltött fájlokat." },
          ]} />

          <TutorialPromptBox label="Prompt &mdash; Profilkep feltoltes">{`Add a profile picture upload feature to the user dashboard.

Requirements:
1. Show the current profile picture (or a default avatar with the user's initials if no picture)
2. Add an "Upload photo" button that opens a file picker
3. Accept only image files: PNG, JPG, WEBP (max 5 MB)
4. Upload the image to Supabase Storage in a bucket called "avatars"
5. Store the image URL in the user's profile in the database (profiles table, avatar_url column)
6. Show a preview of the image before uploading
7. Show a loading spinner during upload
8. After successful upload, show the new profile picture immediately
9. Add a "Remove photo" option to delete the current picture`}</TutorialPromptBox>

          <TutorialPromptBox label="Prompt &mdash; Galeria / Toebb kep feltoltese">{`Add an image gallery feature where users can upload multiple images.

Requirements:
1. Create a gallery page with a drag-and-drop upload area
2. Users can upload multiple images at once (up to 10)
3. Accept PNG, JPG, WEBP files (max 5 MB each)
4. Store images in Supabase Storage bucket called "gallery"
5. Save image metadata (title, upload date, file URL) to a "gallery_images" Supabase table
6. Display uploaded images in a responsive masonry grid layout
7. Click on an image to open a lightbox viewer
8. Add a delete button on each image (only the uploader can delete)
9. Show upload progress for each image`}</TutorialPromptBox>

          <TutorialTipBox variant="success" icon="&#x2705;" title="A képek a felhőben vannak!">
            <p>A Supabase Storage a felhőben tárolja a képeket, tehát nem a te szerveredre kerülnek, és nincs helyszűke. Az ingyenes csomag 1 GB tárhelyet ad &mdash; ez több ezer képnek elég!</p>
          </TutorialTipBox>
        </div>

        {/* ===================== 4. BLOG / DINAMIKUS TARTALOM ===================== */}
        <div className="mb-10 tutorial-fade-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: "linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(168, 85, 247, 0.05))", border: "1px solid rgba(168, 85, 247, 0.25)" }}>&#x1f4dd;</div>
            <div>
              <h3 className="text-xl font-bold font-heading">4. Blog / Dinamikus tartalom</h3>
              <p className="text-muted-foreground text-sm">Írj cikkeket, híreket, amelyek az adatbázisból töltődnek be</p>
            </div>
          </div>

          <p className="text-muted-foreground mb-4">Ha blogot, híroldalt vagy bármilyen dinamikus tartalmat szeretnél az oldaladra (amit te magad szerkeszthetsz anélkül, hogy bármit is programoznál), itt a megoldás.</p>

          <BlogMockup />

          <h4 className="text-base font-bold font-heading mt-6 mb-3">Hogyan csináld?</h4>

          <StepFlow steps={[
            { num: "1", title: "Supabase bekapcsolása", desc: "Ha még nem tetted, kapcsold be a 0. lépés szerint." },
            { num: "2", title: "Blog rendszer létrehozása", desc: "Az alábbi prompt egy komplett blog rendszert hoz létre: listázó oldal, egyedi cikk oldal, és admin felület a bejegyzések kezeléséhez." },
            { num: "3", title: "Írj egy teszt bejegyzést", desc: "Menj az admin felületre, hozz létre egy bejegyzést, és nézd meg a blog oldalon, hogyan jelenik meg." },
          ]} />

          <TutorialPromptBox label="Prompt &mdash; Teljes blog rendszer">{`Create a complete blog system for my website.

PUBLIC PAGES (everyone can see):
1. Blog list page (/blog) showing all published posts in a grid layout
   - Each card shows: featured image, title, short excerpt, publication date, reading time, category tag
   - Add a search bar to search posts by title
   - Add category filter buttons (All, Technology, Tips, News)
   - Pagination (6 posts per page)
2. Individual blog post page (/blog/:slug)
   - Hero section with featured image, title, date, reading time
   - Full article content with rich text formatting (headings, bold, lists, links, images)
   - "Back to blog" button
   - Share buttons (Facebook, Twitter/X, copy link)
   - Related posts section at the bottom (3 similar posts)

ADMIN PAGES (only logged-in admin can access):
3. Blog admin dashboard (/admin/blog)
   - List all posts (published and drafts) with edit and delete buttons
   - "New post" button
4. Blog post editor (/admin/blog/new and /admin/blog/edit/:id)
   - Title field
   - Slug field (auto-generated from title)
   - Category dropdown
   - Featured image upload (Supabase Storage)
   - Rich text editor for content (use TipTap or similar)
   - Excerpt field (short description)
   - Status toggle: Draft / Published
   - Save and Publish buttons

DATABASE:
- Supabase table "blog_posts" with columns: id, created_at, updated_at, title, slug (unique), excerpt, content, featured_image_url, category, status (draft/published), author_id, reading_time
- Row Level Security: anyone can read published posts, only authenticated admin can create/edit/delete

Make everything responsive and Hungarian-friendly.`}</TutorialPromptBox>

          <TutorialTipBox variant="pro" icon="&#x1f4a1;" title="Tipp: SEO-barát blog">
            <p>Ha azt szeretnéd, hogy a blog bejegyzéseid megjelenjenek a Google keresőben, add hozzá ezt a promptot is:</p>
          </TutorialTipBox>

          <TutorialPromptBox label="Prompt &mdash; Blog SEO kiegeszites">{`Add SEO meta tags to each blog post page:
- Dynamic page title: "[Post Title] | [Site Name]"
- Meta description from the post excerpt
- Open Graph tags (og:title, og:description, og:image) for social media sharing
- Add a JSON-LD structured data for BlogPosting schema
- Generate a sitemap.xml that includes all published blog posts`}</TutorialPromptBox>
        </div>

        {/* ===================== 5. ADMIN PANEL ===================== */}
        <div className="mb-10 tutorial-fade-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: "linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(245, 158, 11, 0.05))", border: "1px solid rgba(245, 158, 11, 0.25)" }}>&#x2699;&#xfe0f;</div>
            <div>
              <h3 className="text-xl font-bold font-heading">5. Admin panel</h3>
              <p className="text-muted-foreground text-sm">Kezeld az oldalad tartalmát egy saját admin felületről</p>
            </div>
          </div>

          <p className="text-muted-foreground mb-4">Az admin panel egy titkos, jelszóval védett felület, ahol te (az oldal tulajdonosa) kezelni tudod az összes adatot: felhasználókat, üzeneteket, termékeket, bejegyzéseket. Ez olyan, mint a WordPress admin felülete &mdash; csak sokkal modernebb!</p>

          <AdminPanelMockup />

          <h4 className="text-base font-bold font-heading mt-6 mb-3">Hogyan csináld?</h4>

          <StepFlow steps={[
            { num: "1", title: "Győződj meg róla, hogy van bejelentkezési rendszered", desc: "Az admin panelhez kell az 1. pontban leírt bejelentkezési rendszer. Ha még nincs, először azt készítsd el." },
            { num: "2", title: "Hozd létre az admin panelt", desc: "Az alábbi prompt egy komplett admin dashboard-ot készít, statisztikákkal, táblázatokkal és kezelési lehetőségekkel." },
            { num: "3", title: "Állítsd be, ki az admin", desc: "A Supabase-ben a te email címedet admin-nak kell jelölni. A prompt ezt is beállítja." },
          ]} />

          <TutorialPromptBox label="Prompt &mdash; Admin panel">{`Create a complete admin dashboard for my website at /admin route.

AUTHENTICATION & SECURITY:
- Only users with admin role can access /admin pages
- Add a "role" column to the profiles table (default: "user", can be: "admin")
- If a non-admin user tries to access /admin, redirect to homepage
- My email (ADMIN-EMAIL-CIM@gmail.com) should be set as admin

DASHBOARD HOME (/admin):
- Show stats cards: Total users, Total messages, Total orders (if applicable), Revenue
- Recent activity feed (last 10 actions)
- Quick links to all admin sections

USERS MANAGEMENT (/admin/users):
- Table listing all users with: name, email, registration date, role
- Search and filter by name/email
- Change user role (user/admin)
- View user details

MESSAGES (/admin/messages):
- List all contact form submissions
- Show unread count badge
- Click to view full message
- Mark as read/unread
- Delete messages
- Reply via email button (opens mailto)

LAYOUT:
- Sidebar navigation with icons for each section
- Mobile-friendly: sidebar becomes a hamburger menu
- Dark theme matching the main site
- Breadcrumb navigation

Make all tables sortable and searchable.
Use Hungarian labels everywhere.`}</TutorialPromptBox>

          <TutorialTipBox variant="warning" icon="&#x26a0;&#xfe0f;" title="Fontos: admin email cím">
            <p>A promptban cseréld ki az <strong>ADMIN-EMAIL-CIM@gmail.com</strong> részt a saját valós email címedre! Ezzel az email címmel regisztrálva automatikusan admin jogot kapsz.</p>
          </TutorialTipBox>
        </div>

        {/* ===================== 6. WEBSHOP ===================== */}
        <div className="mb-10 tutorial-fade-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: "linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(236, 72, 153, 0.05))", border: "1px solid rgba(236, 72, 153, 0.25)" }}>&#x1f6d2;</div>
            <div>
              <h3 className="text-xl font-bold font-heading">6. Webshop funkciók</h3>
              <p className="text-muted-foreground text-sm">Termékek, kosár, rendelés &mdash; teljes e-commerce megoldás</p>
            </div>
          </div>

          <p className="text-muted-foreground mb-4">Ha termékeket szeretnél árulni az oldaladon, a Lovable + Supabase + Stripe kombináció egy teljes webshopot tud neked készíteni. Nézzük lépésről lépésre!</p>

          <WebshopMockup />

          <h4 className="text-base font-bold font-heading mt-6 mb-3">Hogyan csináld? &mdash; lépésről lépésre</h4>

          <StepFlow steps={[
            { num: "1", title: "Supabase bekapcsolása + Auth beállítása", desc: "Webshophoz kell adatbázis ÉS felhasználó-kezelés. Ha még nincs, nézd meg az 1. pontot (regisztráció) és a 0. lépést." },
            { num: "2", title: "Termékek és kosár létrehozása", desc: "Az alábbi prompt létrehozza a termék-listát, termék-részletek oldalt és a kosár funkciót." },
            { num: "3", title: "Stripe fizetés bekapcsolása (opcionális)", desc: "Ha online kártyás fizetést is szeretnél, add hozzá a Stripe integrációt a második prompttal." },
            { num: "4", title: "Admin felület a termékekhez", desc: "A harmadik prompt egy admin felületet ad a termékek kezeléséhez." },
          ]} />

          <TutorialPromptBox label="Prompt &mdash; Webshop alap (termekek + kosar)">{`Create an e-commerce / webshop section for my website.

PRODUCTS PAGE (/shop or /termekek):
1. Product grid showing all products from the database
2. Each product card shows: image, name, price (with "Ft" currency), category tag, "Add to cart" button
3. If a product has a sale price, show the original price crossed out and the sale price highlighted
4. Category filter sidebar/tabs (All, Clothing, Accessories, Electronics, etc.)
5. Sort by: Price low-high, Price high-low, Newest, Name A-Z
6. Search bar to search products by name
7. Pagination or infinite scroll

PRODUCT DETAIL PAGE (/shop/:slug):
1. Large product image gallery (main image + thumbnails)
2. Product name, price, description
3. Quantity selector (+ / - buttons)
4. Size/variant selector if applicable
5. "Add to cart" button
6. Product specifications table
7. Related products section (4 similar products)

SHOPPING CART:
1. Cart sidebar that slides in from the right when clicking the cart icon
2. Show cart items with: image, name, quantity (editable), price, remove button
3. Cart subtotal, shipping cost, total
4. "Checkout" button
5. Cart icon in the header with item count badge
6. Save cart to localStorage (works without login too)

DATABASE:
- Supabase table "products": id, created_at, name, slug, description, price, sale_price, category, image_url, images (array), stock_quantity, is_featured, is_active
- Supabase table "orders": id, created_at, user_id, items (json), subtotal, shipping, total, status (pending/paid/shipped/delivered), shipping_address
- Supabase table "order_items": id, order_id, product_id, quantity, price

All prices in Hungarian Forints (Ft). Use Hungarian labels.
Make everything fully responsive.`}</TutorialPromptBox>

          <TutorialTipBox variant="info" icon="&#x1f4b3;" title="Online fizetés Stripe-pal">
            <p>Ha kártyás fizetést is szeretnél (Visa, Mastercard), ahhoz a Stripe szolgáltatást használhatod. A Stripe Magyarországon is elérhető, és ingyenes regisztráció után azonnal használható. Az alábbi prompt bekapcsolja:</p>
          </TutorialTipBox>

          <TutorialPromptBox label="Prompt &mdash; Stripe fizetes (opcionalis)">{`Add Stripe payment integration to the webshop checkout.

Requirements:
1. Create a checkout page (/checkout) with:
   - Order summary (items, quantities, prices)
   - Shipping address form (name, address, city, zip code, phone)
   - "Pay with card" button
2. When clicking "Pay with card", redirect to Stripe Checkout (hosted payment page)
3. Create a Supabase Edge Function that:
   - Creates a Stripe Checkout Session with the cart items
   - Sets success_url and cancel_url
4. After successful payment:
   - Redirect to a /thank-you page with order confirmation
   - Update the order status to "paid" in the database
   - Send order confirmation (optional)
5. Add STRIPE_SECRET_KEY to Supabase Edge Function secrets

Use Stripe test mode first for testing (test API keys).
All prices in Hungarian Forints (HUF).`}</TutorialPromptBox>

          <TutorialPromptBox label="Prompt &mdash; Termek admin felulet">{`Create a product management admin page at /admin/products.

Requirements:
1. Product list table with: image thumbnail, name, price, category, stock, status (active/inactive), edit/delete buttons
2. "Add new product" button that opens a form:
   - Product name
   - Slug (auto-generated from name)
   - Description (rich text editor)
   - Price and Sale price fields
   - Category dropdown
   - Stock quantity
   - Image upload (multiple images, first one is the main image) using Supabase Storage
   - Active/Inactive toggle
3. Edit product form (same as above, pre-filled)
4. Delete product with confirmation dialog
5. Search and filter products
6. Bulk actions: activate/deactivate multiple products

Only admin users can access this page.
Hungarian labels everywhere.`}</TutorialPromptBox>

          <TutorialTipBox variant="success" icon="&#x1f389;" title="Teljes webshop &mdash; 3 prompttal!">
            <p>Ezzel a 3 prompttal (termékek + kosár, Stripe fizetés, admin felület) egy teljes, működő webshopot hoztál létre! A vevőid böngészhetik a termékeket, kosárba tehetik őket, fizethetnek kártyával, és te az admin felületen kezelheted az összes terméket és rendelést.</p>
          </TutorialTipBox>
        </div>

        {/* ===================== ÖSSZEFOGLALÓ TÁBLA ===================== */}
        <div className="mb-8 tutorial-fade-up">
          <h3 className="text-xl font-bold font-heading mb-4">Összefoglalás &mdash; melyik funkcióhoz mi kell?</h3>
          <div className="overflow-x-auto">
            <table className="tutorial-price-table w-full">
              <thead>
                <tr>
                  <th>Funkció</th>
                  <th>Supabase</th>
                  <th>Auth</th>
                  <th>Storage</th>
                  <th>Stripe</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { func: "Regisztráció / Bejelentkezés", supa: true, auth: true, storage: false, stripe: false },
                  { func: "Kapcsolat űrlap", supa: true, auth: false, storage: false, stripe: false },
                  { func: "Kép / Fájl feltöltés", supa: true, auth: true, storage: true, stripe: false },
                  { func: "Blog", supa: true, auth: true, storage: true, stripe: false },
                  { func: "Admin panel", supa: true, auth: true, storage: false, stripe: false },
                  { func: "Webshop", supa: true, auth: true, storage: true, stripe: true },
                ].map((row) => (
                  <tr key={row.func}>
                    <td className="text-foreground font-medium">{row.func}</td>
                    <td>{row.supa ? <span className="text-green-400">&#x2705;</span> : <span className="text-muted-foreground">&#x2014;</span>}</td>
                    <td>{row.auth ? <span className="text-green-400">&#x2705;</span> : <span className="text-muted-foreground">&#x2014;</span>}</td>
                    <td>{row.storage ? <span className="text-green-400">&#x2705;</span> : <span className="text-muted-foreground">&#x2014;</span>}</td>
                    <td>{row.stripe ? <span className="text-green-400">&#x2705;</span> : <span className="text-muted-foreground text-xs">opcionális</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ===================== ZÁRÓ TIPP ===================== */}
        <div className="tutorial-fade-up">
          <TutorialTipBox variant="pro" icon="&#x1f680;" title="A sorrend számít!">
            <p>Ha több funkciót is szeretnél, javasolt sorrend: <strong>1.</strong> Supabase bekapcsolása &rarr; <strong>2.</strong> Regisztráció/Auth &rarr; <strong>3.</strong> Ami kell (űrlap, blog, webshop) &rarr; <strong>4.</strong> Admin panel. Így minden szépen egymásra épül, és a Lovable nem keveredik össze.</p>
          </TutorialTipBox>

          <TutorialTipBox variant="info" icon="&#x1f4a1;" title="Lépésenként haladj!">
            <p>Ne akarj egyszerre mindent! Küldd be a promptokat egyenként, és mindig ellenőrizd az eredményt, mielőtt a következőre lépsz. Ha valami nem tetszik, mondd el a Lovable-nek, mit változtasson meg &mdash; erre való!</p>
          </TutorialTipBox>
        </div>
      </div>
    </section>
  );
};

export default TutorialModule5;
