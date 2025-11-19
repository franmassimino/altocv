"use client";

import { Clock, Ban, MessageCircleOff } from "lucide-react";
import { Card } from "@/components/ui/card";
import { LANDING_CONTENT } from "@/lib/constants/landing-content";
import { motion } from "framer-motion";

const iconMap = {
  clock: Clock,
  ban: Ban,
  "message-circle-off": MessageCircleOff,
} as const;

export function ProblemStatement() {
  const { problemStatement } = LANDING_CONTENT;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {problemStatement.headline}
          </h2>
        </motion.div>

        {/* Problem Cards Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {problemStatement.problems.map((problem, index) => {
            const Icon =
              iconMap[problem.icon as keyof typeof iconMap] || Clock;

            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="p-6 text-center hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur-sm border-muted h-full">
                  {/* Icon */}
                  <div className="flex justify-center mb-3">
                    <div className="p-3 rounded-full bg-destructive/10">
                      <Icon className="w-6 h-6 text-destructive" />
                    </div>
                  </div>

                  {/* Stat */}
                  <div className="text-4xl font-bold text-destructive mb-2">
                    {problem.stat}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold mb-2">{problem.title}</h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {problem.description}
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
