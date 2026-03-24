interface TutorialVideoPlaceholderProps {
  title: string;
  status?: string;
}

const TutorialVideoPlaceholder = ({ title, status = "🎬 Video hamarosan elérhető" }: TutorialVideoPlaceholderProps) => {
  return (
    <div className="tutorial-video-placeholder">
      <div className="tutorial-video-play-btn" />
      <div className="absolute bottom-0 left-0 right-0 p-5 pb-4 z-[2]" style={{ background: "linear-gradient(to top, hsl(var(--background) / 0.95) 0%, transparent 100%)" }}>
        <div className="font-heading text-base font-semibold text-foreground mb-1">{title}</div>
        <div className="text-xs text-muted-foreground">{status}</div>
      </div>
    </div>
  );
};

export default TutorialVideoPlaceholder;
