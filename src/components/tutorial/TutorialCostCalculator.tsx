const costItems = [
  { icon: "\uD83C\uDF10", bg: "bg-blue-500/[0.12]", label: "Domain (.hu, elso ev)", note: "Rackhost.hu \u2014 legolcsobb ajanlat", price: "622 Ft", priceNote: "(brutto)", free: false },
  { icon: "\uD83D\uDD04", bg: "bg-primary/[0.12]", label: "Domain (.hu, megujitas)", note: "Evente, masodik evtol", price: "~2 200 Ft/ev", free: false },
  { icon: "\u2728", bg: "bg-green-500/[0.12]", label: "Lovable Free csomag", note: "5 napi kredit, lovable.app aldomain", price: "Ingyenes", free: true },
  { icon: "\u26A1", bg: "bg-primary/[0.12]", label: "Lovable Pro csomag", note: "Sajat domain + 100 kredit/ho", price: "$25/ho", priceNote: "(~9 500 Ft)", free: false },
  { icon: "\uD83D\uDCCA", bg: "bg-green-500/[0.12]", label: "Google Analytics 4", price: "Ingyenes", free: true },
  { icon: "\uD83D\uDD0D", bg: "bg-green-500/[0.12]", label: "Google Search Console", price: "Ingyenes", free: true },
  { icon: "\uD83D\uDD12", bg: "bg-green-500/[0.12]", label: "SSL tanusitvany", note: "A Lovable automatikusan biztositja", price: "Ingyenes", free: true },
];

const TutorialCostCalculator = () => {
  return (
    <div className="glass-card overflow-hidden mb-5 p-0">
      <div className="px-6 py-5 pb-4 border-b border-white/[0.06]" style={{ background: "hsl(var(--primary) / 0.06)" }}>
        <h4 className="font-heading text-lg font-bold text-foreground mb-1">\uD83D\uDCB0 Koltsegkalkulator</h4>
        <p className="text-xs text-muted-foreground">Osszesites magyar forintban (2026-os arak)</p>
      </div>
      <div>
        {costItems.map((item, i) => (
          <div key={i} className="tutorial-cost-row">
            <div className="flex items-center gap-2.5 text-muted-foreground">
              <div className={`w-7 h-7 rounded-md flex items-center justify-center text-sm flex-shrink-0 ${item.bg}`}>
                {item.icon}
              </div>
              <div>
                {item.label}
                {item.note && <span className="text-xs text-muted-foreground block mt-0.5">{item.note}</span>}
              </div>
            </div>
            <div className={`font-semibold whitespace-nowrap ${item.free ? "text-green-400" : "text-foreground"}`}>
              {item.price}
              {item.priceNote && <span className="text-xs text-muted-foreground font-normal ml-1">{item.priceNote}</span>}
            </div>
          </div>
        ))}

        <div className="tutorial-cost-row tutorial-cost-row--total">
          <div className="text-foreground font-semibold">
            INDULASHOZ MINIMUM
            <span className="text-xs text-muted-foreground font-normal block">Domain + Lovable Free</span>
          </div>
          <div className="text-lg font-bold glow-text">~622 Ft</div>
        </div>

        <div className="tutorial-cost-row tutorial-cost-row--total" style={{ background: "hsl(var(--primary) / 0.1)" }}>
          <div className="text-foreground font-semibold">
            PRO CSOMAGGAL
            <span className="text-xs text-muted-foreground font-normal block">Domain + Lovable Pro (sajat domain)</span>
          </div>
          <div className="text-lg font-bold glow-text">622 Ft + $25/ho</div>
        </div>
      </div>
    </div>
  );
};

export default TutorialCostCalculator;
