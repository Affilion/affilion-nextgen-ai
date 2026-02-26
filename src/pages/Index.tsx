import AuroraBackground from "@/components/AuroraBackground";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import YouTubeSection from "@/components/YouTubeSection";
import PromptLabSection from "@/components/PromptLabSection";
import ProductsSection from "@/components/ProductsSection";
import WaitlistSection from "@/components/WaitlistSection";
import Footer from "@/components/Footer";

const Index = () => (
  <>
    <AuroraBackground />
    <Navbar />
    <main>
      <HeroSection />
      <YouTubeSection />
      <PromptLabSection />
      <ProductsSection />
      <WaitlistSection />
    </main>
    <Footer />
  </>
);

export default Index;
