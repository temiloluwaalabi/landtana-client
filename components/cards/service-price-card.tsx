// @flow
import Image from "next/image";
import * as React from "react";

import { DemoInter } from "@/config/constants";

type Props = {
  service: DemoInter;
};
export const ServicePriceCard = (props: Props) => {
  const clipPathValue = `path('M208.547 3.69231C224.543 3.75389 239.874 10.1006 251.232 21.3634C262.591 32.6263 269.068 47.9026 269.265 63.8974C269.335 81.6567 276.374 98.6786 288.868 111.3C301.361 123.922 318.311 131.134 336.068 131.385H336.752C352.634 131.767 367.74 138.328 378.861 149.672C389.982 161.017 396.241 176.251 396.308 192.137V277.607C396.253 293.681 389.835 309.079 378.456 320.433C367.077 331.786 351.664 338.17 335.59 338.188H64.4103C48.3124 338.17 32.8791 331.767 21.4962 320.384C10.1133 309.001 3.71041 293.568 3.69231 277.47V64.4103C3.71041 48.3124 10.1133 32.8791 21.4962 21.4962C32.8791 10.1133 48.3124 3.71041 64.4103 3.69231H208.547Z')`;

  return (
    <div className="relative flex w-[400px] flex-col gap-1">
      <div className="relative h-[350px]">
        <div
          className="absolute inset-0 m-1 size-full bg-primary"
          style={{
            clipPath: clipPathValue,
          }}
        />
        <Image
          src={props.service.imageUrl}
          alt="Box Braid"
          fill
          className="relative inset-[-2px] z-10 size-full object-cover object-center"
          style={{
            clipPath: `path('M208.547 3.69231C224.543 3.75389 239.874 10.1006 251.232 21.3634C262.591 32.6263 269.068 47.9026 269.265 63.8974C269.335 81.6567 276.374 98.6786 288.868 111.3C301.361 123.922 318.311 131.134 336.068 131.385H336.752C352.634 131.767 367.74 138.328 378.861 149.672C389.982 161.017 396.241 176.251 396.308 192.137V277.607C396.253 293.681 389.835 309.079 378.456 320.433C367.077 331.786 351.664 338.17 335.59 338.188H64.4103C48.3124 338.17 32.8791 331.767 21.4962 320.384C10.1133 309.001 3.71041 293.568 3.69231 277.47V64.4103C3.71041 48.3124 10.1133 32.8791 21.4962 21.4962C32.8791 10.1133 48.3124 3.71041 64.4103 3.69231H208.547Z')`,
          }}
        />
      </div>
      <div className="absolute right-0 top-0 mr-2 mt-3 flex size-[100px] items-center justify-center rounded-full border-4 border-primary bg-[#E7FFE3]">
        <h2 className="text-2xl font-bold ">{props.service.rating}</h2>
      </div>

      <div className="z-10 flex flex-col gap-1">
        <h3 className="font-cormorant text-xl font-semibold text-gray-800">
          {props.service.name}
        </h3>
        <p className="font-lora text-2xl font-bold text-gray-900">
          ${props.service.price}
        </p>
        <a
          href="#"
          className="flex items-center gap-1 text-base font-semibold text-secondary hover:underline"
        >
          Book Today <span className="ml-1">&rarr;</span>
        </a>
      </div>

      <div className="absolute right-2 top-2 z-20 mr-2 mt-[30%] -translate-y-1/2">
        <Image
          src="/assets/icons/star-two.svg"
          width={20}
          height={20}
          alt="star"
        />
      </div>
    </div>
  );
};
