import React from "react";
import Link from "next/link";

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-7xl w-full px-4 md:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Button({
  children,
  href,
  onClick,
  type = "button",
  className = "",
  variant = "primary",
  disabled = false,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
}) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 px-8 py-3.5 md:px-10 md:py-4 rounded-full font-semibold text-[13px] md:text-sm tracking-[0.08em] uppercase transition-all duration-300 ease-out transform hover:-translate-y-[3px] active:translate-y-0 active:scale-[0.98] text-center select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-45 disabled:cursor-not-allowed disabled:hover:-translate-y-0 disabled:hover:shadow-none disabled:active:scale-100";

  const variants = {
    primary:
      "bg-[var(--ternary)] text-white shadow-[0_1px_2px_rgba(0,0,0,0.06),0_2px_8px_rgba(242,110,33,0.28)] hover:shadow-[0_6px_16px_rgba(242,110,33,0.4),0_16px_32px_-8px_rgba(242,110,33,0.35)] hover:brightness-[1.04] focus-visible:ring-[var(--ternary)]",
    secondary:
      "bg-[var(--secondary)] text-white shadow-[0_1px_2px_rgba(0,0,0,0.08),0_2px_8px_rgba(20,21,26,0.18)] hover:shadow-[0_10px_24px_-6px_rgba(20,21,26,0.35)] hover:brightness-[1.12] focus-visible:ring-[var(--secondary)]",
    outline:
      "border-[1.5px] border-[var(--ternary)] text-[var(--ternary)] bg-transparent hover:bg-[var(--ternary)] hover:text-white hover:shadow-[0_10px_24px_-8px_rgba(242,110,33,0.4)] focus-visible:ring-[var(--ternary)]",
  };

  const styles = `${baseStyles} ${variants[variant]} ${className}`;

  if (href && !disabled) {
    return (
      <Link href={href} className={styles} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={styles}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
