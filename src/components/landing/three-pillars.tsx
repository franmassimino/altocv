"use client";

import { MessageSquare, Eye, Palette } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LANDING_CONTENT } from "@/lib/constants/landing-content";
import { motion } from "framer-motion";

const iconMap = {
  "message-square": MessageSquare,
  eye: Eye,
  palette: Palette,
} as const;

export function ThreePillars() {
  const { threePillars } = LANDING_CONTENT;

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
            {threePillars.headline}
          </h2>
          <p className="text-lg text-muted-foreground">
            {threePillars.subheadline}
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue={threePillars.pillars[0].id} className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto gap-2 bg-muted/50 p-2">
              {threePillars.pillars.map((pillar) => {
                const Icon = iconMap[pillar.icon as keyof typeof iconMap];
                return (
                  <TabsTrigger
                    key={pillar.id}
                    value={pillar.id}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3 px-4 text-sm font-semibold"
                  >
                    <Icon className="w-4 h-4 mr-2 inline" />
                    {pillar.title}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {threePillars.pillars.map((pillar) => {
              const Icon = iconMap[pillar.icon as keyof typeof iconMap];
              return (
                <TabsContent key={pillar.id} value={pillar.id} className="mt-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Card className="p-6 md:p-8 bg-gradient-to-br from-primary/5 to-transparent border-muted">
                      <div className="flex flex-col items-center text-center space-y-4">
                        {/* Icon */}
                        <div className="p-3 rounded-full bg-primary/10">
                          <Icon className="w-8 h-8 text-primary" />
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold">{pillar.title}</h3>

                        {/* Description */}
                        <p className="text-base text-muted-foreground max-w-2xl">
                          {pillar.description}
                        </p>

                        {/* Features */}
                        <div className="flex flex-wrap justify-center gap-2 pt-2">
                          {pillar.features.map((feature, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="px-3 py-1 text-xs bg-background/50"
                            >
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </TabsContent>
              );
            })}
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}
