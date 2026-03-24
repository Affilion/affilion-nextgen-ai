import { useState, useRef, useCallback } from "react";
import { ChevronDown } from "lucide-react";

interface TutorialAccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const TutorialAccordion = ({ title, children, defaultOpen = false }: TutorialAccordionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className={`tutorial-accordion mb-4 ${isOpen ? "open" : ""}`}>
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between p-4 px-5 bg-white/[0.03] border border-white/[0.06] rounded-[10px] text-left text-base font-medium text-foreground transition-all duration-200 hover:bg-white/[0.05] hover:border-primary/20"
        style={isOpen ? { borderRadius: "10px 10px 0 0", borderBottomColor: "transparent", background: "hsl(var(--primary) / 0.06)" } : {}}
      >
        <span>{title}</span>
        <ChevronDown
          size={20}
          className={`tutorial-acc-icon text-muted-foreground transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        ref={contentRef}
        className="tutorial-accordion-content overflow-hidden transition-all duration-400"
        style={{ maxHeight: isOpen ? contentRef.current?.scrollHeight + "px" : "0" }}
      >
        <div className="p-5 bg-white/[0.02] border border-white/[0.06] border-t-0 rounded-b-[10px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default TutorialAccordion;
