export type OperationStatus = "activa" | "en-proceso" | "finalizada";

export interface ClientOperation {
  id: string;
  title: string;
  propertyAddress: string;
  operationType: "compra" | "venta" | "alquiler";
  status: OperationStatus;
  updatedAt: string; // ISO
  nextStep?: string;
}

export interface ClientService {
  id: string;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
}

export interface ClientProfile {
  fullName: string;
  email: string;
  memberSince: string; // ISO
}
