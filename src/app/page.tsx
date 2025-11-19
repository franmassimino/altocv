import { LandingNav } from "@/components/landing/landing-nav";
import { HeroSection } from "@/components/landing/hero-section";
import { ProblemStatement } from "@/components/landing/problem-statement";
import { ThreePillars } from "@/components/landing/three-pillars";
import { FeaturesGrid } from "@/components/landing/features-grid";
import { TemplatesShowcase } from "@/components/landing/templates-showcase";
import { PricingSection } from "@/components/landing/pricing-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { FinalCTA } from "@/components/landing/final-cta";
import { LandingFooter } from "@/components/landing/landing-footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      <main>
        <HeroSection />
        <ProblemStatement />
        <div id="features">
          <ThreePillars />
        </div>
        <FeaturesGrid />
        <div id="templates">
          <TemplatesShowcase />
        </div>
        <div id="pricing">
          <PricingSection />
        </div>
        <TestimonialsSection />
        <FinalCTA />
      </main>
      <LandingFooter />
    </div>
  );
}
