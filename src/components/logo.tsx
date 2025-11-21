import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** Link destination (default: "/") */
  href?: string;
  /** Size preset or custom className for text size */
  size?: "sm" | "md" | "lg" | "xl" | string;
  /** Additional className for the container */
  className?: string;
  /** Whether the logo should be a link (default: true) */
  asLink?: boolean;
  /** Show hover effect (default: true when asLink is true) */
  showHover?: boolean;
}

const sizeClasses = {
  sm: "text-base",
  md: "text-lg",
  lg: "text-xl",
  xl: "text-2xl",
};

export function Logo({
  href = "/",
  size = "lg",
  className,
  asLink = true,
  showHover = true,
}: LogoProps) {
  const textSizeClass = size in sizeClasses ? sizeClasses[size as keyof typeof sizeClasses] : size;

  const logoContent = (
    <div className={cn("font-bold", textSizeClass, className)}>
      <span className="text-primary">ALTO</span>
      <span className="text-foreground">CV</span>
    </div>
  );

  if (!asLink) {
    return logoContent;
  }

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center",
        showHover && "hover:opacity-80 transition-opacity"
      )}
    >
      {logoContent}
    </Link>
  );
}
