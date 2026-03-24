import { useState, useCallback } from "react";

interface TutorialPromptBoxProps {
  label: string;
  children: string;
}

const TutorialPromptBox = ({ label, children }: TutorialPromptBoxProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(children);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = children;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [children]);

  return (
    <div className="tutorial-prompt-box relative">
      <span className="block font-sans text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2.5">
        {label}
      </span>
      <button
        onClick={handleCopy}
        className={`absolute top-3 right-3 px-3 py-1.5 bg-white/[0.06] border border-white/10 rounded-md text-[11px] font-medium transition-all duration-200 hover:bg-white/10 ${
          copied ? "text-green-400 border-green-400" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {copied ? "✓ Masolva" : "Másolás"}
      </button>
      {children}
    </div>
  );
};

export default TutorialPromptBox;
