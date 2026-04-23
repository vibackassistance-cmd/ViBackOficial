interface BadgeProps {
  text: string;
}

export function Badge({ text }: BadgeProps) {
  return (
    <span className="inline-block bg-gradient-to-r from-[#18A2D9]/10 to-[#F2A20C]/10 border border-[#18A2D9]/20 px-3 py-1.5 rounded-full text-xs font-medium text-foreground">
      {text}
    </span>
  );
}
