"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LANDING_CONTENT } from "@/lib/constants/landing-content";
import { motion } from "framer-motion";

export function HeroSection() {
  const { hero } = LANDING_CONTENT;

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-4 py-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="container max-w-4xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="secondary"
              className="px-3 py-1 text-xs font-medium"
            >
              {hero.badge}
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {hero.headline}
            <br />
            <span className="text-primary">
              {hero.headlineHighlight}
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {hero.subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-3 pt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button asChild size="lg">
              <Link href="/login">{hero.primaryCta}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
            >
              <Link href="/cv-preview">{hero.secondaryCta}</Link>
            </Button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            className="flex items-center gap-2 pt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <Avatar
                  key={i}
                  className="border-2 border-background w-8 h-8"
                >
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                    {String.fromCharCode(65 + i)}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">{hero.socialProof}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
