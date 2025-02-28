// @flow
import Image from "next/image";
import * as React from "react";

import RegisterForm from "@/components/forms/register-form";

import MaxWidthContainer from "../max-width-container";
export const SignUpPageClient = () => {
  return (
    <MaxWidthContainer className="absolute left-0 top-0 -z-10 h-screen w-full  overflow-hidden !py-0">
      <div className="grid h-full grid-cols-12 items-center justify-center gap-6">
        <div className="col-span-5 grid h-full grid-cols-2 gap-4">
          <div className="space-y-6">
            <div className="relative h-[250px] w-full">
              <Image
                alt="Image"
                fill
                src="https://res.cloudinary.com/davidleo/image/upload/v1739726300/landtana/IMG-20250114-WA0019_xixtjo.jpg"
                className="rounded-full object-cover"
              />
            </div>
            <div className="relative h-[240px] w-full">
              <Image
                alt="Image"
                fill
                src="https://res.cloudinary.com/davidleo/image/upload/v1739726284/landtana/IMG-20250114-WA0041_tra4t4.jpg"
                className="rounded-full object-cover"
              />
            </div>
            <div className="relative h-[550px] w-full">
              <Image
                alt="Image"
                fill
                src="https://res.cloudinary.com/davidleo/image/upload/v1739726307/landtana/IMG-20250114-WA0035_crydoz.jpg"
                className="rounded-full object-cover"
              />
            </div>
          </div>
          <div className="space-y-6">
            <div className="relative h-[400px] w-full">
              <Image
                alt="Image"
                fill
                src="https://res.cloudinary.com/davidleo/image/upload/v1739726281/landtana/IMG-20250114-WA0022_lqkpls.jpg"
                className="rounded-full object-cover"
              />
            </div>
            <div className="relative h-[240px] w-full">
              <Image
                alt="Image"
                fill
                src="https://res.cloudinary.com/davidleo/image/upload/v1739726280/landtana/IMG-20250114-WA0025_irkyja.jpg"
                className="rounded-full object-cover"
              />
            </div>
            <div className="relative h-[500px] w-full">
              <Image
                alt="Image"
                fill
                src="https://res.cloudinary.com/davidleo/image/upload/v1739726303/landtana/IMG-20250114-WA0024_beh14v.jpg"
                className="rounded-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="col-span-7 flex size-full flex-col space-y-6 pl-32 pt-64">
          <h3 className="font-cormorant text-6xl font-semibold">
            Join Landtana Crown Braids Today!
          </h3>
          <RegisterForm />
        </div>
      </div>
    </MaxWidthContainer>
  );
};
