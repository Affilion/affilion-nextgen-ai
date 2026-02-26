import ParticleEffect from "@/components/ParticleEffect";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import YouTubeSection from "@/components/YouTubeSection";
import PromptLabSection from "@/components/PromptLabSection";
import ProductsSection from "@/components/ProductsSection";
import WaitlistSection from "@/components/WaitlistSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => (
  <>
    <ParticleEffect />
    <Navbar />
    <main>
      <HeroSection />
      <YouTubeSection />
      <PromptLabSection />
      <ProductsSection />
      <WaitlistSection />
    </main>
    <Footer />
    <ScrollToTop />
  </>
);

export default Index;
