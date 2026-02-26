const AuroraBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-background" />
    <div className="aurora-blob-1 absolute -top-1/4 -left-1/4 h-[60vh] w-[60vh] rounded-full bg-glow-purple/[0.07] blur-[120px]" />
    <div className="aurora-blob-2 absolute top-1/3 -right-1/4 h-[50vh] w-[50vh] rounded-full bg-primary/[0.05] blur-[100px]" />
    <div className="aurora-blob-3 absolute -bottom-1/4 left-1/3 h-[55vh] w-[55vh] rounded-full bg-glow-purple/[0.04] blur-[140px]" />
  </div>
);

export default AuroraBackground;
