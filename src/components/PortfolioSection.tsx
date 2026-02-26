import { useState, useRef, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Copy, Check, X, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import deadpoolImg from "@/assets/portfolio-deadpool.jpg";

interface PortfolioItem {
  id: number;
  title: string;
  image: string;
  prompt: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Idén én leszek Deadpool a Farsangon...",
    image: deadpoolImg,
    prompt: `Create an 8K ultra-realistic cinematic image of the person from the uploaded reference photo dressed as Deadpool.

The character should be wearing a highly detailed Deadpool suit and standing in a dramatic, cinematic environment while looking at the camera with a dark, ominous expression.

IMPORTANT — IDENTITY PRESERVATION:

Use the uploaded image as the strict identity reference.

Do NOT alter the face in any way.

The facial structure, skin texture, wrinkles, pores, jawline, eye shape, nose, lips, asymmetry, and proportions must remain 100% identical to the original.

No beautification. No smoothing. No reshaping. No reinterpretation. No AI enhancement of facial features.

Do not make the face more handsome, younger, slimmer, cleaner, or more symmetrical.

The face must remain EXACTLY the same person and geometry as in the reference image.

This is an identity-preservation task, not a reinterpretation.

Allowed adjustments: framing, lighting, background, depth of field, color grading

Style: Photorealistic, Natural skin texture, Professional photography look, Cinematic lighting, 8K quality, Shallow depth of field, Moody atmosphere

Do not alter the face, do not beautify, do not stylize the face, do not change identity, do not smooth the skin, no symmetry correction, no face reshaping, no jawline change, no nose change, no eye enlargement, no lip change, no aging change, no gender shift.`,
  },
  {
    id: 2,
    title: "Neon Főnix Ébredése",
    image: "https://images.unsplash.com/photo-1614854262318-831574f15f1f?w=800&q=80",
    prompt: `A majestic phoenix made entirely of neon light and digital particles, rising from a pool of liquid chrome in a dark void. Wings spread wide, trailing streams of cyan and magenta energy. Bioluminescent feathers, fractal patterns, hyperrealistic CGI. --ar 16:9 --v 6`,
  },
  {
    id: 3,
    title: "Holografikus Portré",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80",
    prompt: `A holographic portrait of a woman dissolving into thousands of glowing data fragments, half her face is photorealistic and the other half is wireframe mesh with floating geometric shapes. Teal and purple color palette, studio lighting, depth of field. --ar 1:1 --v 6`,
  },
];

/* ── Cracked-glass SVG overlay ── */
const CrackedGlassOverlay = () => (
  <svg
    className="absolute inset-0 z-20 w-full h-full pointer-events-none opacity-[0.18] mix-blend-overlay"
    viewBox="0 0 400 300"
    preserveAspectRatio="none"
  >
    <defs>
      <filter id="glow-crack">
        <feGaussianBlur stdDeviation="0.8" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g stroke="hsl(190 95% 75%)" strokeWidth="0.8" fill="none" filter="url(#glow-crack)">
      {/* Main impact point */}
      <circle cx="200" cy="150" r="8" strokeWidth="1.2" />
      <circle cx="200" cy="150" r="18" strokeWidth="0.6" opacity="0.5" />
      {/* Radial cracks */}
      <line x1="200" y1="150" x2="50" y2="30" />
      <line x1="200" y1="150" x2="380" y2="20" />
      <line x1="200" y1="150" x2="10" y2="200" />
      <line x1="200" y1="150" x2="390" y2="280" />
      <line x1="200" y1="150" x2="100" y2="290" />
      <line x1="200" y1="150" x2="350" y2="140" />
      <line x1="200" y1="150" x2="60" y2="120" />
      <line x1="200" y1="150" x2="300" y2="290" />
      {/* Secondary fractures */}
      <line x1="120" y1="80" x2="80" y2="10" />
      <line x1="120" y1="80" x2="30" y2="100" />
      <line x1="300" y1="100" x2="370" y2="60" />
      <line x1="300" y1="100" x2="350" y2="200" />
      <line x1="150" y1="220" x2="50" y2="270" />
      <line x1="150" y1="220" x2="180" y2="295" />
      <line x1="280" y1="200" x2="390" y2="180" />
      {/* Micro fractures */}
      <line x1="160" y1="110" x2="130" y2="60" opacity="0.6" />
      <line x1="240" y1="130" x2="310" y2="80" opacity="0.6" />
      <line x1="180" y1="190" x2="120" y2="250" opacity="0.6" />
      <line x1="230" y1="180" x2="280" y2="250" opacity="0.6" />
    </g>
  </svg>
);

/* ── Single portfolio card ── */
const PortfolioCard = ({
  item,
  onClick,
}: {
  item: PortfolioItem;
  onClick: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const rotateScroll = useTransform(scrollYProgress, [0, 0.5, 1], [4, 0, -4]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
      setTilt({ x: y, y: x });
    },
    [],
  );

  return (
    <motion.div
      ref={cardRef}
      style={{ perspective: 1000, rotateX: rotateScroll }}
      className="h-full"
    >
      <motion.div
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="group relative h-[380px] cursor-pointer overflow-hidden rounded-xl hyper-glass"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Image */}
        <img
          src={item.image}
          alt={item.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Cracked glass overlay */}
        <CrackedGlassOverlay />

        {/* Glass tint layer - only behind text area, NOT over image */}

        {/* Hover dark overlay + title */}
        <div className="absolute inset-0 z-30 flex items-end bg-background/0 transition-all duration-500 group-hover:bg-background/50">
          <div className="w-full translate-y-full p-5 transition-transform duration-500 group-hover:translate-y-0">
            <h3 className="text-lg font-bold text-foreground drop-shadow-lg">
              {item.title}
            </h3>
            <p className="mt-1 text-xs text-primary">Kattints a promptért →</p>
          </div>
        </div>

        {/* Chromatic aberration border on hover */}
        <div className="pointer-events-none absolute inset-0 z-40 rounded-xl chromatic-border opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </motion.div>
    </motion.div>
  );
};

/* ── Modal ── */
const PortfolioModal = ({
  item,
  onClose,
}: {
  item: PortfolioItem;
  onClose: () => void;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(item.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ zIndex: 9999 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/70 backdrop-blur-xl" />

      {/* Content */}
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl lg:flex-row"
        style={{
          zIndex: 10000,
          background: "hsl(228 14% 14% / 0.35)",
          backdropFilter: "blur(20px) saturate(1.4)",
          WebkitBackdropFilter: "blur(20px) saturate(1.4)",
          border: "1px solid hsl(190 95% 55% / 0.3)",
          boxShadow:
            "0 0 40px hsl(190 95% 55% / 0.12), 0 0 0 1px hsl(190 95% 55% / 0.08), 0 16px 48px -8px hsl(228 12% 4% / 0.6), inset 0 1px 0 0 hsl(0 0% 100% / 0.08)",
        }}
      >
        {/* Close button - highly visible */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-primary/40 bg-background/80 text-primary backdrop-blur-sm transition-all hover:border-primary hover:bg-primary/20 hover:shadow-[0_0_15px_hsl(190_95%_55%/0.4)]"
          style={{ zIndex: 10001 }}
        >
          <X size={18} strokeWidth={2.5} />
        </button>

        {/* Cracked glass overlay on entire modal */}
        <CrackedGlassOverlay />

        {/* Image side */}
        <div className="relative h-64 w-full lg:h-auto lg:min-h-[420px] lg:w-1/2">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover"
          />
          <CrackedGlassOverlay />
        </div>

        {/* Prompt side */}
        <div className="flex w-full flex-col justify-center p-6 md:p-8 lg:w-1/2">
          <h3 className="text-2xl font-bold text-foreground mb-1">
            {item.title}
          </h3>
          <p className="mb-5 text-sm glow-text font-semibold">
            A Varázslat (Prompt)
          </p>

          <div className="premium-scrollbar relative mb-5 max-h-[240px] overflow-y-auto rounded-lg border border-primary/20 bg-background/60 p-4 backdrop-blur-sm">
            <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-muted-foreground">
              <code>{item.prompt}</code>
            </pre>
          </div>

          <button
            onClick={handleCopy}
            className="neon-button flex items-center justify-center gap-2 text-sm"
          >
            {copied ? (
              <>
                <Check size={16} /> Másolva!
              </>
            ) : (
              <>
                <Copy size={16} /> Prompt Másolása
              </>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ── Section ── */
const PortfolioSection = () => {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [api, setApi] = useState<CarouselApi>();

  return (
    <section id="munkak" className="py-24 px-4" style={{ perspective: "1200px" }}>
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-title text-center mb-16"
        >
          Munkáim – <span className="glow-text">Portfólió</span>
        </motion.h2>

        <div className="relative">
          <Carousel
            setApi={setApi}
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {portfolioItems.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="pl-4 basis-full md:basis-1/2"
                >
                  <PortfolioCard
                    item={item}
                    onClick={() => setSelectedItem(item)}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Custom nav buttons */}
          <button
            onClick={() => api?.scrollPrev()}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full hyper-glass flex items-center justify-center text-foreground/70 hover:text-primary transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => api?.scrollNext()}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full hyper-glass flex items-center justify-center text-foreground/70 hover:text-primary transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <PortfolioModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </section>
  );
};

export default PortfolioSection;
