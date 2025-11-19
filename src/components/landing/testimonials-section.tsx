"use client";

import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LANDING_CONTENT } from "@/lib/constants/landing-content";
import { motion } from "framer-motion";

export function TestimonialsSection() {
  const { testimonials } = LANDING_CONTENT;

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
    <section className="py-24 px-4">
      <div className="container max-w-5xl mx-auto">
        {/* Headline */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {testimonials.headline}
        </motion.h2>

        {/* Testimonials Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.items.map((testimonial, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="p-5 flex flex-col hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 bg-card/50 backdrop-blur-sm border-muted h-full">
                {/* Rating */}
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-primary text-primary"
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-sm text-foreground mb-4 flex-grow leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-2">
                  <Avatar className="w-10 h-10 border-2 border-primary/20">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
                      {testimonial.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-semibold">{testimonial.author}</div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.role} @ {testimonial.company}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
