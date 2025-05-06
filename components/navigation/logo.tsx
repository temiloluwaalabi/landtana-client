// @flow
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { cn } from "@/lib/utils";
type Props = {
  className?: string;
  logoLink?: string;
  bgClass?: string;
};
export const Logo = (props: Props) => {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center w-fit",
        props.className
      )}
    >
      <Link className="absolute left-0 top-0 z-50 size-full" href="/" />
      <div
        className={cn(
          "bg-black relative flex items-center size-[75px] p-2 rounded-full",
          props.bgClass
        )}
      >
        <Image
          src={
            props.logoLink ||
            "https://res.cloudinary.com/davidleo/image/upload/v1739262236/landtana/landtana_white_logo_fk4adm.png"
          }
          alt="logo"
          width={100}
          height={100}
          className="object-contain"
          quality={100}
        />
        {/* <Logo
      logoLink="https://res.cloudinary.com/davidleo/image/upload/v1739262236/landtana/landtana_white_logo_fk4adm.png"
      className=" object-cover"
    /> */}
      </div>
    </div>
  );
};
