"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`
        sticky top-0 z-50 w-full transition-all duration-300
        ${scrolled
          ? "border-b border-muted/40 bg-background/80 backdrop-blur"
          : "bg-primary/5 border-transparent"
        }
      `}
    >
      <div className="container max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Logo size="lg" />

          {/* Center Links */}
          <div className="hidden md:flex items-center space-x-6 absolute left-1/2 -translate-x-1/2">
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

          {/* CTA */}
          <Button asChild>
            <Link href="/login">Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
