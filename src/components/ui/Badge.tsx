import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "gold" | "dark" | "new" | "sale";
  className?: string;
}

export function Badge({ children, variant = "dark", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block text-[0.6rem] font-sans font-medium tracking-widest uppercase px-2.5 py-1",
        variant === "gold" && "bg-gold-500 text-white",
        variant === "dark" && "bg-stone-900 text-stone-50",
        variant === "new" && "bg-stone-800 text-stone-50",
        variant === "sale" && "bg-red-800 text-white",
        className
      )}
    >
      {children}
    </span>
  );
}
