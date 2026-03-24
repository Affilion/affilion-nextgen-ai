interface TutorialTipBoxProps {
  variant: "info" | "warning" | "pro" | "success";
  icon: string;
  title: string;
  children: React.ReactNode;
}

const variantStyles = {
  info: "bg-blue-500/[0.08] border-l-blue-500 text-blue-300",
  warning: "bg-yellow-500/[0.08] border-l-yellow-500 text-yellow-300",
  pro: "bg-primary/[0.08] border-l-primary text-primary/80",
  success: "bg-green-500/[0.08] border-l-green-500 text-green-300",
};

const TutorialTipBox = ({ variant, icon, title, children }: TutorialTipBoxProps) => {
  return (
    <div className={`p-5 px-6 rounded-[10px] mb-5 flex gap-3.5 items-start text-sm leading-relaxed border-l-[3px] ${variantStyles[variant]}`}>
      <span className="text-xl flex-shrink-0 leading-snug">{icon}</span>
      <div className="flex-1">
        <strong className="block mb-1 text-foreground">{title}</strong>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default TutorialTipBox;
