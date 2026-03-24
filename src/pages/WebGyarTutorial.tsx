import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, Menü } from "lucide-react";
import { Link } from "react-router-dom";
import "@/styles/tutorial.css";

import TutorialSidebar from "@/components/tutorial/TutorialSidebar";
import TutorialHero from "@/components/tutorial/TutorialHero";
import TutorialModule1 from "@/components/tutorial/TutorialModule1";
import TutorialModule2 from "@/components/tutorial/TutorialModule2";
import TutorialModule3 from "@/components/tutorial/TutorialModule3";
import TutorialModule4 from "@/components/tutorial/TutorialModule4";
import TutorialModule5 from "@/components/tutorial/TutorialModule5";
import TutorialModule6 from "@/components/tutorial/TutorialModule6";
import TutorialModule7 from "@/components/tutorial/TutorialModule7";
import TutorialModule8 from "@/components/tutorial/TutorialModule8";
import TutorialModule9 from "@/components/tutorial/TutorialModule9";
import TutorialModule10 from "@/components/tutorial/TutorialModule10";
import Footer from "@/components/Footer";

const MODULE_IDS = [
  "module-0",
  "module-1",
  "module-2",
  "module-3",
  "module-4",
  "module-5",
  "module-6",
  "module-7",
  "module-8",
  "module-9",
  "module-10",
];

const WebGyarTutorial = () => {
  const [activeModule, setActiveModule] = useState("module-0");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  /* ---- Scroll-based active module tracking + progress bar ---- */
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    setShowScrollTop(scrollTop > 600);

    // Find the module closest to the top of the viewport
    let current = MODULE_IDS[0];
    for (const id of MODULE_IDS) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120) {
          current = id;
        }
      }
    }
    setActiveModule(current);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  /* ---- Intersection Observer for fade-up animations ---- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".tutorial-fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* ---- Fixed Header ---- */}
      <header className="fixed top-0 left-0 right-0 z-50 hyper-glass border-0 border-b border-border/20">
        {/* Progress bar */}
        <div
          className="absolute top-0 left-0 h-[2px] transition-all duration-150"
          style={{
            width: `${scrollProgress}%`,
            background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)))",
          }}
        />
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} /> Főoldal
          </Link>

          <h1 className="text-lg font-bold glow-text font-heading hidden sm:block">
            WebGyár Tutorial
          </h1>

          <button
            className="lg:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
            onClick={() => setSidebarOpen(true)}
            aria-label="Modulok"
          >
            <Menü size={20} />
          </button>

          {/* Spacer for desktop symmetry */}
          <div className="hidden lg:block w-20" />
        </div>
      </header>

      {/* ---- Layout: Sidebar + Content ---- */}
      <div className="flex flex-1 pt-[56px]">
        <TutorialSidebar
          activeModule={activeModule}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 min-w-0">
          <TutorialHero />
          <TutorialModule1 />
          <TutorialModule2 />
          <TutorialModule3 />
          <TutorialModule4 />
          <TutorialModule5 />
          <TutorialModule6 />
          <TutorialModule7 />
          <TutorialModule8 />
          <TutorialModule9 />
          <TutorialModule10 />
          <Footer />
        </main>
      </div>

      {/* ---- Scroll to Top ---- */}
      <button
        className={`tutorial-scroll-top ${showScrollTop ? "visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Vissza a tetejere"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
};

export default WebGyarTutorial;
