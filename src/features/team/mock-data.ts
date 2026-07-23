import type { Differential, TeamMember } from "@/features/team/types";

/**
 * Mock del equipo de la inmobiliaria. Reemplazar por datos reales
 * cuando la empresa entregue biografías y fotos oficiales.
 * Fotos: randomuser.me (habilitado en `next.config.ts`).
 */
export const MOCK_TEAM: TeamMember[] = [
  {
    id: "team-001",
    name: "María Fernández",
    role: "Directora Comercial",
    bio: "20 años de trayectoria en el mercado inmobiliario. Especialista en propiedades residenciales de alta gama.",
    photoUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    photoAlt: "Retrato de María Fernández",
  },
  {
    id: "team-002",
    name: "Diego Álvarez",
    role: "Broker Senior",
    bio: "Enfocado en operaciones comerciales y locales. Certificado por CUCICBA.",
    photoUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    photoAlt: "Retrato de Diego Álvarez",
  },
  {
    id: "team-003",
    name: "Lucía Ramos",
    role: "Asesora de Alquileres",
    bio: "Acompaña a inquilinos y propietarios en todo el proceso de alquiler y renovación.",
    photoUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    photoAlt: "Retrato de Lucía Ramos",
  },
  {
    id: "team-004",
    name: "Martín Sosa",
    role: "Tasador Oficial",
    bio: "Análisis de valuaciones basado en comparables reales de mercado y tendencias zonales.",
    photoUrl: "https://randomuser.me/api/portraits/men/76.jpg",
    photoAlt: "Retrato de Martín Sosa",
  },
];

export const DIFFERENTIALS: Differential[] = [
  {
    id: "diff-trust",
    title: "Trato humano y transparente",
    description:
      "Cada operación es acompañada personalmente por un asesor. Sin letra chica.",
    icon: "Handshake",
  },
  {
    id: "diff-experience",
    title: "20 años en el mercado",
    description:
      "Miles de operaciones cerradas nos avalan como referentes en zona norte y CABA.",
    icon: "Award",
  },
  {
    id: "diff-tech",
    title: "Tecnología aplicada",
    description:
      "Herramientas modernas para búsqueda inteligente, tasación y atención 24/7.",
    icon: "TrendingUp",
  },
  {
    id: "diff-network",
    title: "Red de clientes activos",
    description:
      "Base de compradores e inquilinos calificados que acelera cada operación.",
    icon: "Users",
  },
];
