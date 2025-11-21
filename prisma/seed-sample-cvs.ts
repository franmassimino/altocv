import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Buscar el primer usuario existente
  const firstUser = await prisma.user.findFirst()

  if (!firstUser) {
    console.log('No users found. Please create a user first.')
    return
  }

  console.log(`Creating sample CVs for user: ${firstUser.email}`)

  // CV de ejemplo 1: Software Engineer
  const cv1 = await prisma.cV.create({
    data: {
      userId: firstUser.id,
      title: "Software Engineer Resume",
      templateId: "modern-professional",
      atsScore: 87,
      lastAnalyzedAt: new Date(),
      content: {
        personalInfo: {
          fullName: "María González",
          email: "maria.gonzalez@email.com",
          phone: "+34 612 345 678",
          location: "Madrid, España",
          linkedin: "linkedin.com/in/mariagonzalez",
          portfolio: "mariagonzalez.dev"
        },
        summary: "Full Stack Developer con 5+ años de experiencia en desarrollo web. Especializada en React, Node.js y arquitecturas cloud. Apasionada por crear soluciones escalables y centradas en el usuario.",
        experience: [
          {
            id: "exp1",
            company: "Tech Solutions S.L.",
            position: "Senior Full Stack Developer",
            location: "Madrid, España",
            startDate: "2021-03",
            endDate: null,
            current: true,
            description: "Lideré el desarrollo de una plataforma SaaS que alcanzó 10,000+ usuarios activos. Implementé arquitectura de microservicios con Node.js y React. Reduje los tiempos de carga en un 40% mediante optimización de rendimiento.",
            achievements: [
              "Implementé CI/CD pipeline reduciendo deployment time en 60%",
              "Mentoricé a 3 desarrolladores junior",
              "Migré la infraestructura a AWS, reduciendo costos en 30%"
            ]
          },
          {
            id: "exp2",
            company: "Digital Innovators",
            position: "Full Stack Developer",
            location: "Barcelona, España",
            startDate: "2019-06",
            endDate: "2021-02",
            current: false,
            description: "Desarrollé aplicaciones web con React y Node.js. Colaboré con equipos de diseño y producto para crear experiencias de usuario intuitivas.",
            achievements: [
              "Desarrollé 15+ features que aumentaron user engagement en 25%",
              "Implementé testing automatizado con Jest y Cypress"
            ]
          }
        ],
        education: [
          {
            id: "edu1",
            institution: "Universidad Politécnica de Madrid",
            degree: "Grado en Ingeniería Informática",
            field: "Ingeniería del Software",
            location: "Madrid, España",
            startDate: "2015-09",
            endDate: "2019-06",
            description: "Especialización en desarrollo de software y arquitecturas web"
          }
        ],
        skills: {
          technical: [
            "JavaScript/TypeScript",
            "React.js",
            "Node.js",
            "Next.js",
            "PostgreSQL",
            "MongoDB",
            "AWS",
            "Docker",
            "Git"
          ],
          soft: [
            "Liderazgo de equipo",
            "Comunicación efectiva",
            "Resolución de problemas",
            "Trabajo en equipo"
          ]
        },
        languages: [
          { language: "Español", level: "Nativo" },
          { language: "Inglés", level: "Avanzado (C1)" }
        ]
      },
      designSettings: {
        template: "modern-professional",
        colors: {
          primary: "#2563eb",
          secondary: "#64748b",
          accent: "#0ea5e9"
        },
        font: {
          heading: "Inter",
          body: "Inter"
        },
        spacing: "comfortable"
      }
    }
  })

  // CV de ejemplo 2: Marketing Manager
  const cv2 = await prisma.cV.create({
    data: {
      userId: firstUser.id,
      title: "Marketing Manager CV",
      templateId: "elegant-minimal",
      atsScore: 92,
      lastAnalyzedAt: new Date(),
      content: {
        personalInfo: {
          fullName: "Carlos Martínez",
          email: "carlos.martinez@email.com",
          phone: "+34 678 901 234",
          location: "Valencia, España",
          linkedin: "linkedin.com/in/carlosmartinez"
        },
        summary: "Marketing Manager con 7+ años de experiencia en estrategias digitales y growth marketing. Track record de aumentar ROI en campañas digitales y liderar equipos multidisciplinarios.",
        experience: [
          {
            id: "exp1",
            company: "E-Commerce Global",
            position: "Marketing Manager",
            location: "Valencia, España",
            startDate: "2020-01",
            endDate: null,
            current: true,
            description: "Lidero estrategia de marketing digital para plataforma de e-commerce con 500K+ usuarios. Gestiono presupuesto de €200K anuales en campañas paid media.",
            achievements: [
              "Aumenté el ROI de campañas digitales en 150% año tras año",
              "Lideré lanzamiento de 3 productos con 50K+ usuarios en primer mes",
              "Implementé estrategia de email marketing que generó €1M en revenue",
              "Construí equipo de marketing de 8 personas"
            ]
          },
          {
            id: "exp2",
            company: "StartUp Marketing Pro",
            position: "Digital Marketing Specialist",
            location: "Madrid, España",
            startDate: "2017-06",
            endDate: "2019-12",
            current: false,
            description: "Gestioné campañas de paid media (Google Ads, Facebook Ads, LinkedIn) para clientes B2B y B2C.",
            achievements: [
              "Gestioné +€500K en presupuesto de campañas digitales",
              "Reduje CPA en 35% mediante optimización de campañas"
            ]
          }
        ],
        education: [
          {
            id: "edu1",
            institution: "Universidad de Valencia",
            degree: "Grado en Marketing y Comunicación",
            field: "Marketing Digital",
            location: "Valencia, España",
            startDate: "2013-09",
            endDate: "2017-06",
            description: "Enfoque en marketing digital y análisis de datos"
          }
        ],
        skills: {
          technical: [
            "Google Ads",
            "Facebook Ads",
            "Google Analytics",
            "SEO/SEM",
            "Email Marketing",
            "CRM (HubSpot, Salesforce)",
            "Marketing Automation",
            "A/B Testing",
            "Data Analysis"
          ],
          soft: [
            "Liderazgo de equipos",
            "Pensamiento estratégico",
            "Análisis de datos",
            "Comunicación",
            "Creatividad"
          ]
        },
        languages: [
          { language: "Español", level: "Nativo" },
          { language: "Inglés", level: "Avanzado (C1)" },
          { language: "Francés", level: "Intermedio (B1)" }
        ],
        certifications: [
          {
            name: "Google Ads Certification",
            issuer: "Google",
            date: "2023-05"
          },
          {
            name: "HubSpot Inbound Marketing",
            issuer: "HubSpot Academy",
            date: "2022-11"
          }
        ]
      },
      designSettings: {
        template: "elegant-minimal",
        colors: {
          primary: "#1e293b",
          secondary: "#64748b",
          accent: "#8b5cf6"
        },
        font: {
          heading: "Playfair Display",
          body: "Inter"
        },
        spacing: "compact"
      }
    }
  })

  console.log(`✅ Created 2 sample CVs:`)
  console.log(`   - ${cv1.title} (ID: ${cv1.id})`)
  console.log(`   - ${cv2.title} (ID: ${cv2.id})`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
