// @flow
import Image from "next/image";
import * as React from "react";

export const ProfessionalCard = () => {
  return (
    <div className="relative flex w-fit flex-col gap-1 lg:w-fit">
      <div className="relative h-[300px] lg:h-[300px]">
        <Image
          src="https://res.cloudinary.com/davidleo/image/upload/v1739748138/landtana/a4ae835795f7033b83f7ebf019ce8bd0_r8h7d7.png"
          alt="Box Braid"
          fill
          className="relative z-10 size-full rounded-[32px] border-[3px] border-primary object-cover object-top"
        />
      </div>

      <div className="z-10 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <h3 className="font-cormorant text-2xl font-bold text-gray-900">
            ANITA ABAWAH
          </h3>
          <h3 className="font-cormorant text-2xl font-bold text-primary">
            4.5
          </h3>
        </div>
        <p className="font-lora text-base font-normal text-gray-900">
          Specializes in Hair Braiding. Over 7years + experience{" "}
        </p>
        <a
          href="#"
          className="flex items-center gap-1 text-base font-semibold text-secondary hover:underline"
        >
          Read Bio <span className="ml-1">&rarr;</span>
        </a>
      </div>
    </div>
  );
};
