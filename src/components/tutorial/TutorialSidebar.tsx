import { useCallback } from "react";

const modules = [
  { id: "module-0", num: "0", label: "Bevezetés" },
  { id: "module-1", num: "1", label: "Előkészületek" },
  { id: "module-2", num: "2", label: "Domain Regisztráció" },
  { id: "module-3", num: "3", label: "Ismerkedés a Lovable-lel" },
  { id: "module-4", num: "4", label: "Weblap Építése" },
  { id: "module-5", num: "5", label: "Backend és Adatbázis" },
  { id: "module-6", num: "6", label: "Domain Bekötés" },
  { id: "module-7", num: "7", label: "SEO és Analytics" },
  { id: "module-8", num: "8", label: "Karbantartás" },
  { id: "module-9", num: "9", label: "GYIK" },
  { id: "module-10", num: "10", label: "Fogalomtár" },
];

interface TutorialSidebarProps {
  activeModule: string;
  isOpen: boolean;
  onClose: () => void;
}

const TutorialSidebar = ({ activeModule, isOpen, onClose }: TutorialSidebarProps) => {
  const handleClick = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      onClose();
    },
    [onClose]
  );

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[105] lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`tutorial-sidebar ${isOpen ? "open" : ""}`}>
        <nav>
          <ul className="tutorial-sidebar-nav list-none p-0">
            {modules.map((m) => (
              <li key={m.id}>
                <a
                  href={`#${m.id}`}
                  className={activeModule === m.id ? "active" : ""}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(m.id);
                  }}
                >
                  <span className="tutorial-nav-number">{m.num}</span>
                  {m.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default TutorialSidebar;
