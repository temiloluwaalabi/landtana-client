// @flow
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { Category } from "@/types";

import MaxWidthContainer from "../max-width-container";

type Props = {
  categories: Category[];
};
export const ServicesArchiveClient = (props: Props) => {
  const filteredCategories = props.categories.sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );
  return (
    <MaxWidthContainer className="!py-[40px]">
      <div>
        <div className="relative flex flex-col justify-center space-y-10">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-center font-cormorant text-6xl font-bold text-accent">
              Our Expertise
            </h2>
            <p className="text-center text-2xl font-normal text-[#2F201A]">
              We always provide the best service for you
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {filteredCategories.map((service) => (
              <div
                key={service.id}
                className="relative  flex h-[300px] w-full items-center justify-center rounded-[20px] 2xl:h-[400px]"
              >
                <Link
                  href={`/services/category/${service.id}`}
                  className="absolute left-0 top-0 z-50 size-full"
                />
                <Image
                  src={
                    "https://res.cloudinary.com/davidleo/image/upload/v1739748137/landtana/92c01e2888429b399fe39527925d03db_oveh9w.png"
                  }
                  fill
                  className="rounded-[20px] object-cover"
                  alt={service.name}
                />
                <div className="absolute bottom-0 mb-6 flex h-[150px] w-[70%] items-center justify-center rounded-[6px] bg-white/85">
                  <h4 className="max-w-[130px] text-center text-2xl font-semibold text-black">
                    {service.name}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MaxWidthContainer>
  );
};
