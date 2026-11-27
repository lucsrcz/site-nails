import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fc6998] disabled:pointer-events-none disabled:opacity-50 cursor-pointer min-h-[44px]",
  {
    variants: {
      variant: {
        default:
          "btn-liquid-pink text-white font-semibold",
        outline:
          "btn-liquid-glass border-[#efb810]/70 text-[#1c1417]",
        subtle:
          "btn-liquid-glass text-[#1c1417] hover:text-[#fc6998]",
        ghost: "text-[#1c1417] hover:bg-[#fff4f7] hover:text-[#fc6998]",
      },
      size: {
        default: "px-6 py-2.5",
        sm: "px-4 py-2 text-xs min-h-[36px]",
        lg: "px-8 py-3.5 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
