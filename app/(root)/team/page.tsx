// app/team/page.tsx
import { Instagram, Facebook } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Our Team | Landtana Crown Braids",
  description:
    "Meet our talented team of professional braiders and stylists at Landtana Crown Braids in San Antonio.",
};

interface TeamMember {
  name: string;
  title: string;
  bio: string;
  image: string;
  specialties: string[];
  social?: {
    instagram?: string;
    facebook?: string;
  };
}

export default function TeamPage() {
  // You would replace this with your actual team data
  const teamMembers: TeamMember[] = [
    {
      name: "Jane Doe",
      title: "Master Braider & Salon Owner",
      bio: "With over 10 years of experience in the hair braiding industry, Jane founded Landtana Crown Braids with a vision to create a space where the art of braiding is celebrated. Specializing in intricate protective styles, she has developed a reputation for creating beautiful, long-lasting braids that honor both tradition and contemporary trends.",
      image: "/api/placeholder/400/500",
      specialties: ["Box Braids", "Goddess Braids", "Cornrow Designs"],
      social: {
        instagram: "https://instagram.com/janedoe",
        facebook: "https://facebook.com/janedoe",
      },
    },
    {
      name: "Maria Johnson",
      title: "Senior Braider",
      bio: "Known for her precision and speed, Maria excels in box braids, Senegalese twists, and cornrow designs. With 7 years of experience, she brings creativity and technical expertise to every client's experience.",
      image: "/api/placeholder/400/500",
      specialties: ["Senegalese Twists", "Box Braids", "Knotless Braids"],
      social: {
        instagram: "https://instagram.com/mariaj",
      },
    },
    {
      name: "Aisha Williams",
      title: "Braiding Specialist",
      bio: "Aisha's specialty lies in creating innovative faux locs and goddess braids. Her gentle approach and attention to detail ensure that clients leave not only with gorgeous styles but also with a comfortable experience.",
      image: "/api/placeholder/400/500",
      specialties: ["Faux Locs", "Goddess Braids", "Passion Twists"],
      social: {
        instagram: "https://instagram.com/aishawilliams",
      },
    },
    {
      name: "Tiffany Lee",
      title: "Junior Stylist",
      bio: "The newest addition to our team, Tiffany brings fresh perspectives and contemporary styling ideas. Trained by our senior stylists, she specializes in crochet braids and modern protective styles.",
      image: "/api/placeholder/400/500",
      specialties: ["Crochet Braids", "Feed-in Braids", "Bohemian Styles"],
      social: {
        instagram: "https://instagram.com/tiffanylee",
        facebook: "https://facebook.com/tiffanylee",
      },
    },
  ];

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-4 text-center text-4xl font-bold tracking-tight">
          Meet Our Team
        </h1>
        <p className="mx-auto mb-12 max-w-3xl text-center text-xl text-gray-700">
          At Landtana Crown Braids, our stylists are artists who bring
          creativity, expertise, and passion to every appointment. Each member
          of our team is extensively trained in various braiding techniques and
          committed to providing you with exceptional service.
        </p>

        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {teamMembers.map((member, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="md:flex">
                <div className="relative h-64 md:h-auto md:w-1/3">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <h2 className="mb-1 text-2xl font-semibold">{member.name}</h2>
                  <p className="mb-4 text-gray-600">{member.title}</p>
                  <p className="mb-4 text-gray-700">{member.bio}</p>

                  <h3 className="mb-2 font-medium">Specialties:</h3>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {member.specialties.map((specialty, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-gray-100 px-3 py-1 text-sm"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>

                  {member.social && (
                    <div className="flex gap-3">
                      {member.social.instagram && (
                        <a
                          href={member.social.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-pink-600"
                        >
                          <Instagram size={20} />
                        </a>
                      )}
                      {member.social.facebook && (
                        <a
                          href={member.social.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-blue-600"
                        >
                          <Facebook size={20} />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="rounded-lg bg-gray-50 p-8 text-center">
          <h2 className="mb-4 text-2xl font-semibold">Join Our Team</h2>
          <p className="mx-auto mb-6 max-w-2xl text-gray-700">
            Are you passionate about the art of braiding? We&apos;re always
            looking for talented stylists to join our team. Send your portfolio
            and resume to careers@landtanacrownbraids.com.
          </p>
          <Button asChild>
            <a href="mailto:careers@landtanacrownbraids.com">Apply Today</a>
          </Button>
        </div>
      </div>
    </main>
  );
}
