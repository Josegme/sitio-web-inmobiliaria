import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import type { TeamMember } from "@/features/team/types";

interface TeamMemberCardProps {
  member: TeamMember;
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <Card className="overflow-hidden p-0 text-center">
      <div className="relative aspect-square w-full overflow-hidden bg-muted">
        <Image
          src={member.photoUrl}
          alt={member.photoAlt}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover"
        />
      </div>
      <CardContent className="flex flex-col gap-1 p-5">
        <h3 className="font-heading text-lg">{member.name}</h3>
        <p className="text-sm font-medium text-primary">{member.role}</p>
        <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
      </CardContent>
    </Card>
  );
}
