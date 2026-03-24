/* Lovable Editor Mockup */
export const LovableEditorMockup = () => (
  <div className="tutorial-ui-mockup tutorial-fade-up" style={{ position: "relative" }}>
    <div className="tutorial-mockup-topbar">
      <div className="flex items-center gap-2.5">
        <div className="tutorial-mockup-logo">L</div>
        <span className="text-muted-foreground text-xs font-medium">az-en-projektem</span>
      </div>
      <div className="flex gap-2">
        <div className="px-3 py-1 rounded-md text-[11px] font-medium text-muted-foreground bg-white/[0.06] border border-white/[0.08]">Share</div>
        <div className="px-3 py-1 rounded-md text-[11px] font-medium text-white" style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))" }}>Publish</div>
      </div>
    </div>
    <div className="tutorial-mockup-body">
      <div className="tutorial-mockup-chat" style={{ position: "relative" }}>
        <div className="absolute top-1.5 left-4 text-[10px] text-primary font-semibold uppercase tracking-wider">&larr; Chat panel</div>
        <div className="mt-5" />
        <div className="tutorial-mockup-msg tutorial-mockup-msg--user">
          Keszits egy modern etterem weboldalt sotet temaval es elegans betutipussal
        </div>
        <div className="tutorial-mockup-msg tutorial-mockup-msg--ai">
          Rendben! Keszítek egy elegans etterem oldalt. Tartalmaz hero szekciot, menut, es foglalasi lehetoseget...
        </div>
        <div className="mt-auto p-2.5 px-3.5 rounded-[10px] bg-white/[0.04] border border-white/[0.08] text-muted-foreground text-xs">
          Irj ide egy uzenetet...
        </div>
      </div>
      <div className="tutorial-mockup-preview" style={{ position: "relative" }}>
        <div className="absolute top-1.5 right-4 text-[10px] text-secondary font-semibold uppercase tracking-wider">Elo elonezet &rarr;</div>
        <div className="tutorial-mini-site mt-4">
          <div className="tutorial-mini-nav">
            <div className="text-white text-[11px] font-bold">🍽 Ristorante</div>
            <div className="flex gap-2.5">
              <span className="text-muted-foreground text-[9px]">Menu</span>
              <span className="text-muted-foreground text-[9px]">Rolunk</span>
              <span className="text-muted-foreground text-[9px]">Foglalas</span>
            </div>
          </div>
          <div className="tutorial-mini-hero">
            <h5 className="text-white text-[13px] font-bold mb-1.5">Autentikus olasz konyha</h5>
            <p className="text-muted-foreground text-[9px] mb-2.5">Fedezd fel izeink vilagat egy kulonleges gasztronomiai elmenyben</p>
            <div className="inline-block px-3 py-1 text-white text-[9px] font-semibold rounded" style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))" }}>Asztal foglalas</div>
          </div>
          <div className="tutorial-mini-cards">
            {["Eloetelek", "Foetelek", "Desszertek"].map((name) => (
              <div key={name} className="tutorial-mini-card">
                <div className="w-5 h-5 rounded-full mx-auto mb-1.5" style={{ background: "linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--secondary) / 0.15))" }} />
                <h6 className="text-[9px] text-gray-800 font-semibold mb-0.5">{name}</h6>
                <p className="text-[7px] text-gray-500">Peldak</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* DNS Panel Mockup */
export const DNSPanelMockup = () => (
  <div className="tutorial-ui-mockup tutorial-fade-up">
    <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]" style={{ background: "hsl(var(--background))" }}>
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-md flex items-center justify-center text-white text-sm" style={{ background: "linear-gradient(135deg, #2563eb, hsl(var(--primary)))" }}>⚙</div>
        <div>
          <h5 className="text-foreground text-[13px] font-semibold">DNS Rekordok &mdash; sajatdomain.hu</h5>
          <p className="text-muted-foreground text-[10px]">Rackhost Vezerlopult</p>
        </div>
      </div>
      <div className="px-3 py-1 rounded-md text-[11px] font-medium text-white" style={{ background: "linear-gradient(135deg, #2563eb, hsl(var(--primary)))" }}>+ Uj rekord</div>
    </div>
    <table className="tutorial-dns-table">
      <thead>
        <tr>
          <th>Tipus</th>
          <th>Nev</th>
          <th>Ertek</th>
          <th>TTL</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span className="tutorial-dns-type tutorial-dns-type--a">A</span></td>
          <td className="text-foreground">@</td>
          <td><span className="tutorial-dns-value">76.76.21.21</span></td>
          <td className="text-muted-foreground">3600</td>
        </tr>
        <tr>
          <td><span className="tutorial-dns-type tutorial-dns-type--txt">TXT</span></td>
          <td className="text-foreground">@</td>
          <td><span className="tutorial-dns-value">lovable-verification=abc123xyz</span></td>
          <td className="text-muted-foreground">3600</td>
        </tr>
        <tr>
          <td><span className="tutorial-dns-type tutorial-dns-type--cname">CNAME</span></td>
          <td className="text-foreground">www</td>
          <td><span className="tutorial-dns-value">sajatdomain.hu</span></td>
          <td className="text-muted-foreground">3600</td>
        </tr>
      </tbody>
    </table>
  </div>
);

/* GSC Dashboard Mockup */
export const GSCDashboardMockup = () => {
  const barHeights = [30, 45, 35, 55, 40, 65, 50, 70, 60, 75, 55, 80, 65, 85, 70, 90, 75, 95, 82, 100];
  return (
    <div className="tutorial-ui-mockup tutorial-fade-up">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]" style={{ background: "hsl(var(--background))" }}>
        <div className="flex items-center gap-2.5">
          <div className="w-[22px] h-[22px] rounded bg-[#4285f4] flex items-center justify-center text-white text-xs font-bold">G</div>
          <span className="text-foreground text-xs font-medium">Search Console</span>
        </div>
        <div className="flex items-center gap-1 px-2.5 py-1 bg-white/[0.04] border border-white/[0.08] rounded text-muted-foreground text-[11px]">
          <span>sajatdomain.hu</span>
          <span className="text-[9px]">▼</span>
        </div>
      </div>
      <div className="tutorial-gsc-body">
        <div className="tutorial-gsc-sidebar">
          {["Teljesitmeny", "URL vizsgalat", "Indexeles", "Sitemaps", "Elmeny", "Beallitasok"].map((item, i) => (
            <div key={item} className={`tutorial-gsc-menu-item ${i === 0 ? "tutorial-gsc-menu-item--active" : ""}`}>
              <div className="tutorial-gsc-menu-icon" />
              {item}
            </div>
          ))}
        </div>
        <div className="flex-1 p-4">
          <div className="tutorial-gsc-metrics">
            {[
              { label: "Kattintasok", value: "847", color: "#4285f4" },
              { label: "Megjelenitesek", value: "12.4K", color: "#a855f7" },
              { label: "Atl. CTR", value: "6.8%", color: "#10b981" },
              { label: "Atl. pozicio", value: "14.2", color: "#f59e0b" },
            ].map((m) => (
              <div key={m.label} className="tutorial-gsc-metric">
                <div className="tutorial-metric-label">{m.label}</div>
                <div className="text-base font-bold font-heading" style={{ color: m.color }}>{m.value}</div>
              </div>
            ))}
          </div>
          <div className="tutorial-gsc-chart">
            {barHeights.map((h, i) => (
              <div key={i} className="tutorial-gsc-chart-bar" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* GA4 Dashboard Mockup */
export const GA4DashboardMockup = () => (
  <div className="tutorial-ui-mockup tutorial-fade-up">
    <div className="flex items-center gap-2.5 px-4 py-2.5 border-b border-white/[0.06]" style={{ background: "hsl(var(--background))" }}>
      <div className="w-[22px] h-[22px] rounded bg-[#f9ab00] flex items-center justify-center text-white text-xs font-bold">A</div>
      <span className="text-foreground text-xs font-medium">Google Analytics &mdash; sajatdomain.hu</span>
    </div>
    <div className="tutorial-ga4-body">
      <div className="tutorial-ga4-sidebar">
        {["Kezdolap", "Jelentesek", "Felfedezes", "Hirdetes", "Adminisztracio"].map((item, i) => (
          <div key={item} className={`tutorial-ga4-menu-item ${i === 0 ? "tutorial-ga4-menu-item--active" : ""}`}>
            <div className="tutorial-ga4-menu-icon" />
            {item}
          </div>
        ))}
      </div>
      <div className="flex-1 p-4">
        <div className="tutorial-ga4-metrics">
          {[
            { label: "Felhasznalok", value: "1,247", delta: "↑ +12.3%" },
            { label: "Munkamenetek", value: "2,891", delta: "↑ +8.7%" },
            { label: "Atl. ido", value: "2:34", delta: "↑ +5.1%" },
          ].map((m) => (
            <div key={m.label} className="tutorial-ga4-metric">
              <div className="tutorial-metric-label">{m.label}</div>
              <div className="text-lg font-bold font-heading text-foreground">{m.value}</div>
              <div className="text-[10px] text-green-400 mt-0.5">{m.delta}</div>
            </div>
          ))}
        </div>
        <div className="tutorial-ga4-chart">
          <svg className="absolute bottom-5 left-3 right-3 h-[60px]" viewBox="0 0 400 60" preserveAspectRatio="none">
            <defs>
              <linearGradient id="tutGa4ChartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f9ab00" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#f9ab00" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,50 C30,45 60,40 90,35 C120,30 150,38 180,25 C210,12 240,18 270,15 C300,12 330,8 360,10 C380,11 400,5 400,5 L400,60 L0,60 Z" fill="url(#tutGa4ChartGrad)" />
            <path d="M0,50 C30,45 60,40 90,35 C120,30 150,38 180,25 C210,12 240,18 270,15 C300,12 330,8 360,10 C380,11 400,5 400,5" fill="none" stroke="#f9ab00" strokeWidth="2" />
          </svg>
        </div>
        <div className="text-[10px] text-muted-foreground mb-2 font-medium">FORGALMI FORRASOK</div>
        <div className="tutorial-ga4-sources">
          {[
            { name: "Google kereso", pct: "42%", color: "#4285f4" },
            { name: "Kozvetlen", pct: "28%", color: "#10b981" },
            { name: "Kozossegi media", pct: "18%", color: "#f59e0b" },
            { name: "Hivatkozas", pct: "12%", color: "#a855f7" },
          ].map((s) => (
            <div key={s.name} className="tutorial-ga4-source">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
              <span className="text-[10px] text-muted-foreground">{s.name}</span>
              <span className="text-[10px] font-bold text-foreground ml-auto">{s.pct}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
