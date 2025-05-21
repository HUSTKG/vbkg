import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

// Define types for our custom button props
type ButtonVariant = "default" | "primary" | "success" | "warning" | "info";
type ButtonSize = "icon" | "xs" | "sm" | "md" | "lg";
type ButtonRounded = "none" | "sm" | "md" | "full";

// Interface for our custom button props
type CustomButtonProps = React.ComponentProps<"button"> & {
  asChild?: boolean;
} & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  rounded?: ButtonRounded;
  className?: string;
  children: React.ReactNode;
};

// Custom button component with additional options
const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  className,
  variant = "default",
  size = "md",
  rounded = "md",
  ...props
}) => {
  // Define variant styles
  const variantStyles: Record<ButtonVariant, string> = {
    default: "bg-gray-500 hover:bg-gray-600 text-white",
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
    warning: "bg-yellow-500 hover:bg-yellow-600 text-white",
    info: "bg-cyan-500 hover:bg-cyan-600 text-white",
  };

  // Define size styles
  const sizeStyles: Record<ButtonSize, string> = {
    icon: "p-2 w-8 h-8",
    xs: "text-xs px-2 py-1",
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-4 py-2",
    lg: "text-lg px-6 py-3",
  };

  // Define rounded styles
  const roundedStyles: Record<ButtonRounded, string> = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    full: "rounded-full",
  };

  return (
    <Button
      className={cn(
        "font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        variantStyles[variant],
        sizeStyles[size],
        roundedStyles[rounded],
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
