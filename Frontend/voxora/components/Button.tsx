// components/ui/Button.tsx

import React from "react";
import clsx from "clsx";
import { Loader } from "lucide-react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "success"
  | "link";

type ButtonSize = "sm" | "md" | "lg" | "icon";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-black text-white hover:bg-neutral-800 active:bg-neutral-900",

  secondary:
    "bg-neutral-200 text-black hover:bg-neutral-300 active:bg-neutral-400",

  outline:
    "border border-neutral-300 bg-transparent hover:bg-neutral-100",

  ghost:
    "bg-transparent hover:bg-neutral-100 text-black",

  danger:
    "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",

  success:
    "bg-green-600 text-white hover:bg-green-700 active:bg-green-800",

  link:
    "bg-transparent text-blue-600 underline-offset-4 hover:underline p-0 h-auto",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 text-sm",
  md: "h-11 text-sm",
  lg: "h-12 text-base",
  icon: "h-10 w-10",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      fullWidth = false,
      leftIcon,
      rightIcon,
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        aria-busy={loading}
        className={clsx(
          
          "inline-flex items-center justify-center gap-2 rounded-xl",
          "font-medium transition-all duration-200",
          "select-none",
          "disabled:opacity-50 disabled:pointer-events-none",

          
          variantStyles[variant],

          
          sizeStyles[size],

          
          fullWidth && "w-full",

          className
        )}
        {...props}
      >
        {loading ? (
          <>
            <Loader />
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon}
            {children}
            {rightIcon}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";