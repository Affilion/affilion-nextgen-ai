import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ParticleEffect from "@/components/ParticleEffect";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PortfolioSection from "@/components/PortfolioSection";
import YouTubeSection from "@/components/YouTubeSection";
import PromptLabSection from "@/components/PromptLabSection";
import ProductsSection from "@/components/ProductsSection";
import WaitlistSection from "@/components/WaitlistSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ContactWidget from "@/components/ContactWidget";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
  }, []);

  useEffect(() => {
    if (!location.hash) return;
    const sectionId = location.hash.replace("#", "");
    const target = document.getElementById(sectionId);
    if (!target) return;

    const timeout = window.setTimeout(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);

    return () => window.clearTimeout(timeout);
  }, [location.hash]);

  return (
    <>
      <ParticleEffect />
      <Navbar />
      <main>
        <HeroSection />
        <WaitlistSection />
        <PortfolioSection />
        <YouTubeSection />
        <PromptLabSection />
        <ProductsSection />
      </main>
      <Footer />
      <ScrollToTop />
      <ContactWidget />
    </>
  );
};

export default Index;
