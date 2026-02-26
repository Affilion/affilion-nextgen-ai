import { useRef, useState, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  parallaxStrength?: number;
}

const GlassCard = ({ children, className = "", parallaxStrength = 30 }: GlassCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shine, setShine] = useState({ x: 50, y: 50 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [4, 0, -4]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [-2, 2]);
  const y = useTransform(scrollYProgress, [0, 1], [parallaxStrength, -parallaxStrength]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const yPos = ((e.clientY - rect.top) / rect.height) * 100;
    setShine({ x, y: yPos });
  };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, y, perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShine({ x: 50, y: 50 })}
      className={`hyper-glass group relative overflow-hidden ${className}`}
    >
      {/* Shine effect */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(300px circle at ${shine.x}% ${shine.y}%, rgba(56,189,248,0.12), transparent 60%)`,
        }}
      />
      {/* Chromatic aberration border */}
      <div className="pointer-events-none absolute inset-0 z-10 rounded-xl chromatic-border opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {children}
    </motion.div>
  );
};

export default GlassCard;
