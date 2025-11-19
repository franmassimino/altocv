"use client";

import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LANDING_CONTENT } from "@/lib/constants/landing-content";
import Link from "next/link";
import { motion } from "framer-motion";

export function PricingSection() {
  const { pricing } = LANDING_CONTENT;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="container max-w-5xl mx-auto">
        {/* Headline */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {pricing.headline}
          </h2>
          <p className="text-lg text-muted-foreground">
            {pricing.subheadline}
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {pricing.tiers.map((tier) => (
            <motion.div key={tier.id} variants={itemVariants}>
              <Card
                className={`p-6 flex flex-col h-full ${
                  tier.highlighted
                    ? "border-primary shadow-xl shadow-primary/20 md:scale-105 bg-gradient-to-br from-primary/5 to-transparent"
                    : "bg-card/50 backdrop-blur-sm border-muted"
                }`}
              >
                {/* Badge for highlighted plan */}
                {tier.highlighted && (
                  <div className="flex justify-center -mt-10 mb-3">
                    <Badge className="px-3 py-1 text-xs bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  </div>
                )}

                {/* Tier Name */}
                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-4xl font-bold">${tier.price}</span>
                  <span className="text-sm text-muted-foreground">/{tier.period}</span>
                </div>

                <Separator className="mb-4" />

                {/* Features */}
                <ul className="space-y-2 mb-6 flex-grow">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-xs">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  asChild
                  className="w-full"
                  variant={tier.highlighted ? "default" : "outline"}
                >
                  <Link href="/login">{tier.cta}</Link>
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
