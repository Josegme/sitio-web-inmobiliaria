export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  photoAlt: string;
}

export interface Differential {
  id: string;
  title: string;
  description: string;
  /** Nombre del icono de lucide-react a renderizar (ej. "Shield", "Handshake"). */
  icon: "Shield" | "Handshake" | "Award" | "TrendingUp" | "Users" | "Clock";
}
