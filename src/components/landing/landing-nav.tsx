import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

export function LandingNav() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-muted/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
        <div className="flex h-16 items-center justify-between">
          {/* Logo - Left */}
          <Logo size="lg" />

          {/* Navigation Links - Center */}
          <div className="hidden md:flex items-center space-x-6 absolute left-1/2 transform -translate-x-1/2">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              href="#templates"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Templates
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Pricing
            </Link>
          </div>

          {/* CTA Button - Right */}
          <div>
            <Button asChild>
              <Link href="/login">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
