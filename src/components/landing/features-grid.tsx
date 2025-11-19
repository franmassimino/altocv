"use client";

import { Bot, BarChart, FileText, Download, Target, Save, Eye, Palette } from "lucide-react";
import { Card } from "@/components/ui/card";
import { LANDING_CONTENT } from "@/lib/constants/landing-content";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";

const iconMap = {
  bot: Bot,
  "bar-chart": BarChart,
  "file-text": FileText,
  download: Download,
  target: Target,
  save: Save,
  eye: Eye,
  palette: Palette,
} as const;

export function FeaturesGrid() {
  const { features } = LANDING_CONTENT;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="container max-w-5xl mx-auto">
        {/* Headline */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {features.headline}
          </h2>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.items.map((feature, index) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap] || Bot;

            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="p-5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 group bg-card/50 backdrop-blur-sm border-muted hover:border-primary/50 flex flex-col h-full">
                  {/* Icon */}
                  <div className="mb-3">
                    <div className="p-2.5 rounded-lg bg-primary/10 inline-block group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
