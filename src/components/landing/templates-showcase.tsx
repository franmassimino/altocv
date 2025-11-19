"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LANDING_CONTENT } from "@/lib/constants/landing-content";
import Link from "next/link";
import { motion } from "framer-motion";

export function TemplatesShowcase() {
  const { templates } = LANDING_CONTENT;

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
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="py-24 px-4">
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
            {templates.headline}
          </h2>
          <p className="text-lg text-muted-foreground">
            {templates.subheadline}
          </p>
        </motion.div>

        {/* Templates Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {templates.items.map((template, index) => (
            <motion.div key={template.id} variants={itemVariants}>
              <Card className="overflow-hidden hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2 group border-muted h-full flex flex-col">
                {/* Template Preview Placeholder */}
                <div className="aspect-square bg-gradient-to-br from-primary/20 via-primary/5 to-transparent relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-5xl font-bold text-primary/20">
                      {index + 1}
                    </div>
                  </div>
                  {/* Category Badge */}
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-background/90 text-xs">
                      {template.category}
                    </Badge>
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-5 flex-grow flex flex-col">
                  <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">
                    {template.description}
                  </p>
                  <Button asChild variant="outline" className="w-full" size="sm">
                    <Link href="/cv-preview">View Details</Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
