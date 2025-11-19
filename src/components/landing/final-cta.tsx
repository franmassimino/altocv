"use client";

import { Button } from "@/components/ui/button";
import { LANDING_CONTENT } from "@/lib/constants/landing-content";
import Link from "next/link";
import { motion } from "framer-motion";

export function FinalCTA() {
  const { finalCta } = LANDING_CONTENT;

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent">
      <div className="container max-w-3xl mx-auto text-center">
        {/* Headline */}
        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {finalCta.headline}
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          className="text-lg md:text-xl text-muted-foreground mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {finalCta.subheadline}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button asChild size="lg">
            <Link href="/login">{finalCta.cta}</Link>
          </Button>
        </motion.div>

        {/* Note */}
        <motion.p
          className="text-xs text-muted-foreground mt-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {finalCta.note}
        </motion.p>
      </div>
    </section>
  );
}
