import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { CompanyStory } from "@/features/team/components/CompanyStory";
import { Differentials } from "@/features/team/components/Differentials";
import { TeamMemberCard } from "@/features/team/components/TeamMemberCard";
import { MOCK_TEAM } from "@/features/team/mock-data";

export const metadata: Metadata = {
  title: "Quiénes Somos",
  description:
    "Conocé nuestra historia, nuestro equipo y los diferenciales que nos convierten en una inmobiliaria de referencia.",
};

export default function AboutPage() {
  return (
    <>
      <CompanyStory />

      <section className="py-16 sm:py-20" aria-labelledby="team-heading">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Nuestro equipo"
            title="Personas que trabajan con y para vos"
            description="Un equipo interdisciplinario que combina experiencia comercial, técnica y legal."
            align="center"
            className="mx-auto"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {MOCK_TEAM.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </Container>
      </section>

      <Differentials />
    </>
  );
}
