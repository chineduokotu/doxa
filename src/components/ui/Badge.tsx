import { cn } from "@/lib/utils";

interface BadgeProps {
  children:  React.ReactNode;
  variant?:  "gold" | "dark" | "new" | "sale";
  className?: string;
}

export function Badge({ children, variant = "dark", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block font-sans text-[9px] font-semibold tracking-[0.14em] uppercase px-2.5 py-[5px]",
        variant === "gold" && "bg-[#D4AF37] text-black",
        variant === "dark" && "bg-black text-white",
        variant === "new"  && "bg-black text-white",
        variant === "sale" && "bg-[#D4AF37] text-black",
        className
      )}
    >
      {children}
    </span>
  );
}
