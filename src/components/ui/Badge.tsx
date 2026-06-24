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
        variant === "gold" && "bg-[#dc320c] text-white",
        variant === "dark" && "bg-[#0c0c0c] text-white",
        variant === "new"  && "bg-[#0c0c0c] text-white",
        variant === "sale" && "bg-[#a81e0a] text-white",
        className
      )}
    >
      {children}
    </span>
  );
}
