import { Slot } from "@radix-ui/react-slot";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean; variant?: "primary" | "outline" | "ghost" | "icon"; children: ReactNode };
export function Button({ asChild, variant = "primary", className, ...props }: Props) {
  const Component = asChild ? Slot : "button";
  return <Component className={cn("button-base", `button-${variant}`, className)} {...props} />;
}
