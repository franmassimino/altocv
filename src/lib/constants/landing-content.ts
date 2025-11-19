export const LANDING_CONTENT = {
  hero: {
    badge: "Land your dream job, without the overwhelm",
    headline: "Create Smarter CVs with",
    headlineHighlight: "AI-Powered Precision",
    subheadline:
      "Build, customize, and optimize your CV with conversational AI, live preview, and intelligent ATS analysis.",
    primaryCta: "Start Building Free",
    secondaryCta: "View Example",
    socialProof: "Join 1,000+ professionals creating better CVs",
  },

  problemStatement: {
    headline: "The CV Process is Broken",
    problems: [
      {
        icon: "clock",
        stat: "30-60 min",
        title: "Wasted Time",
        description:
          "Manually adapting your CV for each job application takes hours of tedious work",
      },
      {
        icon: "ban",
        stat: "75%",
        title: "ATS Rejected",
        description:
          "Most CVs never reach human eyes, automatically filtered by tracking systems",
      },
      {
        icon: "message-circle-off",
        stat: "Zero",
        title: "Feedback",
        description:
          "No insights on why your CV was rejected until weeks or months later",
      },
    ],
  },

  threePillars: {
    headline: "Three Powerful Pillars",
    subheadline: "Everything you need to create the perfect CV",
    pillars: [
      {
        id: "ai-editor",
        icon: "message-square",
        title: "Conversational AI Editor",
        description:
          "Chat naturally with an AI assistant that edits your CV in real-time",
        features: [
          "Natural conversation interface",
          "Real-time CV modifications",
          "Context-aware suggestions",
          "Multi-model AI routing",
        ],
      },
      {
        id: "live-preview",
        icon: "eye",
        title: "Live Visual Preview",
        description: "See changes instantly with professional, customizable templates",
        features: [
          "Instant visual updates",
          "Professional templates",
          "ATS-friendly designs",
          "Responsive layouts",
        ],
      },
      {
        id: "design-panel",
        icon: "palette",
        title: "Design Panel",
        description: "Fine-tune colors, fonts, and spacing with Figma-inspired controls",
        features: [
          "Custom color palettes",
          "Font pairings",
          "Spacing controls",
          "Design presets",
        ],
      },
    ],
  },

  features: {
    headline: "Everything You Need to Land Your Dream Job",
    items: [
      {
        icon: "bot",
        title: "AI-Powered Editing",
        description:
          "Conversational interface using cutting-edge AI with streaming responses",
      },
      {
        icon: "bar-chart",
        title: "ATS Analysis",
        description:
          "Fine-tuned AI engine that identifies compatibility issues and suggests fixes",
      },
      {
        icon: "file-text",
        title: "Smart Templates",
        description:
          "Industry-optimized templates (Tech, Corporate, Creative) with full customization",
      },
      {
        icon: "download",
        title: "Intelligent Import",
        description: "Parse existing CVs from PDF or LinkedIn exports automatically",
      },
      {
        icon: "target",
        title: "Job Matching",
        description:
          "Vector-based compatibility scoring between your CV and job postings",
      },
      {
        icon: "save",
        title: "Auto-save",
        description: "Never lose your work with continuous cloud synchronization",
      },
    ],
  },

  templates: {
    headline: "Templates that land interviews",
    subheadline: "Recruiter-approved. ATS-loved. 100% customizable.",
    items: [
      {
        id: "modern-tech",
        name: "Modern Tech",
        description: "Clean, minimalist, single-column. Tech recruiters scan it in 10 seconds.",
        category: "Tech",
        preview: "/templates/modern-tech.png",
      },
      {
        id: "traditional-corporate",
        name: "Traditional Corporate",
        description: "Conservative, two-column, maximum info density. For finance, consulting, legal.",
        category: "Corporate",
        preview: "/templates/corporate.png",
      },
      {
        id: "creative",
        name: "Creative",
        description: "Visual with color accents, balanced design. For marketing, design, product.",
        category: "Creative",
        preview: "/templates/creative.png",
      },
    ],
  },

  pricing: {
    headline: "Start Free, Upgrade When Ready",
    subheadline: "Choose the plan that works best for you",
    tiers: [
      {
        id: "free",
        name: "Free",
        price: 0,
        period: "forever",
        description: "Perfect for getting started",
        features: [
          "50 initial credits",
          "10 credits/month refill",
          "3 CVs maximum",
          "Basic templates",
          "PDF export",
        ],
        cta: "Get Started",
        highlighted: false,
      },
      {
        id: "pro",
        name: "Pro",
        price: 9.99,
        period: "month",
        description: "For serious job seekers",
        features: [
          "500 credits/month",
          "Unlimited CVs",
          "All premium templates",
          "ATS analysis",
          "Job matching",
          "Priority support",
        ],
        cta: "Start Pro Trial",
        highlighted: true,
      },
      {
        id: "credits",
        name: "Credits Pack",
        price: 4.99,
        period: "one-time",
        description: "Boost your credits anytime",
        features: [
          "100 additional credits",
          "Never expires",
          "Use with any plan",
          "Instant delivery",
        ],
        cta: "Buy Credits",
        highlighted: false,
      },
    ],
  },

  testimonials: {
    headline: "Loved by Professionals",
    items: [
      {
        quote:
          "AltoCV helped me adapt my CV for 15 different applications in just 2 hours. The AI suggestions were spot-on!",
        author: "Sarah Chen",
        role: "Product Manager",
        company: "Tech Startup",
        avatar: "/avatars/sarah.jpg",
        rating: 5,
      },
      {
        quote:
          "The ATS analysis feature is a game-changer. I finally understand why my CVs weren't getting through.",
        author: "Marcus Rodriguez",
        role: "Software Engineer",
        company: "Fortune 500",
        avatar: "/avatars/marcus.jpg",
        rating: 5,
      },
      {
        quote:
          "I went from struggling to write my CV to having a professional one in 30 minutes. The AI coaching is incredible.",
        author: "Emily Watson",
        role: "Recent Graduate",
        company: "University",
        avatar: "/avatars/emily.jpg",
        rating: 5,
      },
    ],
  },

  finalCta: {
    headline: "Ready to Build Your Perfect CV?",
    subheadline:
      "Join thousands of professionals creating ATS-friendly CVs in minutes",
    cta: "Start Building Free",
    note: "No credit card required",
  },

  footer: {
    tagline: "Built with passion to help professionals create better CVs",
    columns: [
      {
        title: "Product",
        links: [
          { label: "Features", href: "#features" },
          { label: "Pricing", href: "#pricing" },
          { label: "Templates", href: "#templates" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Blog", href: "/blog" },
          { label: "Documentation", href: "/docs" },
          { label: "FAQ", href: "/faq" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Terms of Service", href: "/terms" },
        ],
      },
    ],
  },
} as const;
