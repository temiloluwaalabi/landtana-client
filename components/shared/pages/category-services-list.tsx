"use client";
// @flow
import * as React from "react";

import { ServicePriceCard } from "@/components/cards/service-price-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category, Service } from "@/types";

import MaxWidthContainer from "../max-width-container";
import PageTitleHeader from "../page-title-header";
type Props = {
  services: Service[];
  category: Category;
};
export const CategoryServiceList = ({ services, category }: Props) => {
  const filteredServices = services.sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );
  return (
    <MaxWidthContainer className="!py-[40px]">
      <PageTitleHeader
        page={category.name}
        showCrumbs
        lastItem={category.name.toLowerCase()}
      />

      <div className="relative flex flex-col justify-center space-y-10 p-0">
        <div className="flex w-full flex-col items-start justify-start space-y-4 p-0">
          <h2 className="p-0 text-left font-cormorant text-4xl font-bold text-accent">
            Explore Our {category.name} Services
          </h2>
          <div className="h-1 w-20 rounded-full bg-gradient-to-r from-accent to-pink-400" />
        </div>
        <Tabs defaultValue="all">
          <TabsList className="custom-scrollbar mb-2 flex size-full h-auto items-start justify-start gap-3 overflow-hidden overflow-x-scroll bg-transparent p-0 lg:mb-4">
            <TabsTrigger
              className="rounded-[60px] text-sm data-[state=active]:bg-primary   data-[state=active]:text-white lg:text-base"
              value="all"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              className="rounded-[60px] text-sm data-[state=active]:bg-primary   data-[state=active]:text-white lg:text-base"
              value="box-braid"
            >
              Box Braids
            </TabsTrigger>
            <TabsTrigger
              className="rounded-[60px] text-sm data-[state=active]:bg-primary   data-[state=active]:text-white lg:text-base"
              value="twists"
            >
              Twists
            </TabsTrigger>
            <TabsTrigger
              className="rounded-[60px] text-sm data-[state=active]:bg-primary   data-[state=active]:text-white lg:text-base"
              value="crochet"
            >
              Crochet
            </TabsTrigger>
            <TabsTrigger
              className="rounded-[60px] text-sm data-[state=active]:bg-primary   data-[state=active]:text-white lg:text-base"
              value="cornrows"
            >
              Cornrows
            </TabsTrigger>
            <TabsTrigger
              className="rounded-[60px] text-sm data-[state=active]:bg-primary   data-[state=active]:text-white lg:text-base"
              value="weavons"
            >
              Wig/Weavons
            </TabsTrigger>
            <TabsTrigger
              className="rounded-[60px] text-sm data-[state=active]:bg-primary   data-[state=active]:text-white lg:text-base"
              value="others"
            >
              Others
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="all"
            className="flex w-full flex-col items-center gap-10 py-6"
          >
            <div className="grid w-full gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredServices.slice(0, 12).map((service) => (
                <ServicePriceCard key={service.id} service={service} />
              ))}
            </div>
            <Button className="mt-5 rounded-md border border-secondary bg-transparent text-secondary">
              View More Services{" "}
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </MaxWidthContainer>
  );
};
