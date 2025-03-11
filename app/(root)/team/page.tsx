// app/team/page.tsx
import { Metadata } from "next";

import TeamPageClient from "@/components/shared/pages/team-client-page";

export const metadata: Metadata = {
  title: "Our Team | Landtana Crown Braids",
  description:
    "Meet our talented team of professional braiders and stylists at Landtana Crown Braids in San Antonio.",
};

export default function page() {
  return <TeamPageClient />;
}
