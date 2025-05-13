// @flow
import { ArrowRight } from "lucide-react";
import * as React from "react";

import MaxWidthContainer from "../shared/max-width-container";
import { Button } from "../ui/button";
export const BeforeFooter = () => {
  return (
    <MaxWidthContainer className="relative flex h-[80vh] w-full items-center justify-center">
      <div className="absolute left-0 top-0 z-10 size-full bg-[url(https://res.cloudinary.com/davidleo/image/upload/v1740072896/landtana/hair-salon-148_up2esx.avif)] bg-cover bg-no-repeat " />
      <div className="absolute left-0 top-0 z-20 size-full bg-accent/80" />
      <div className="relative z-50 flex flex-col items-center gap-4 text-white">
        <div>
          <h2 className="font-cormorant max-w-4xl text-center text-6xl font-bold uppercase">
            Indulge in a premium hair styling experience
          </h2>
          <h2 className="font-cormorant max-w-4xl text-center text-6xl font-bold text-yellow-300">
            Tailored for you
          </h2>
        </div>
        <div className="rounded-full border border-white p-1">
          <Button className="w-full rounded-full bg-white text-primary hover:bg-secondary hover:text-white">
            Book Online <ArrowRight />
          </Button>
        </div>
      </div>
    </MaxWidthContainer>
  );
};
