import type { Metadata } from "next";

import { FeaturedProperties } from "@/features/properties/components/FeaturedProperties";
import { Hero } from "@/features/home/components/Hero";
import { SubscribeCTA } from "@/features/home/components/SubscribeCTA";
import { ValueProposition } from "@/features/home/components/ValueProposition";

export const metadata: Metadata = {
  title: "Inicio",
  description:
    "Inmobiliaria en Buenos Aires. Compra, venta, alquiler y tasación de propiedades con acompañamiento humano y tecnología moderna.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProposition />
      <FeaturedProperties />
      <SubscribeCTA />
    </>
  );
}
