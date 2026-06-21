"use client";

import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "solid",
      size = "md",
      fullWidth = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          // Base
          "inline-flex items-center justify-center gap-2 font-sans tracking-widest uppercase text-xs font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none",
          // Rounded — barely, to keep it architectural
          "rounded-sm",
          // Size
          size === "sm" && "px-4 py-2 text-[0.65rem]",
          size === "md" && "px-6 py-3 text-xs",
          size === "lg" && "px-8 py-4 text-xs",
          // Variants
          variant === "solid" &&
            "bg-stone-900 text-stone-50 hover:bg-stone-700 focus-visible:ring-stone-900",
          variant === "outline" &&
            "border border-current text-stone-900 hover:bg-stone-900 hover:text-stone-50 focus-visible:ring-stone-900",
          variant === "ghost" &&
            "border border-white/40 text-white hover:bg-white hover:text-stone-900 focus-visible:ring-white",
          variant === "gold" &&
            "bg-gold-500 text-white hover:bg-gold-600 focus-visible:ring-gold-500",
          // Full width
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };
