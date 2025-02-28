// @flow
import { ArrowRight, Facebook, Instagram, Youtube } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { Logo } from "./logo";
import MaxWidthContainer from "../shared/max-width-container";
import { Button } from "../ui/button";

export const MainFooter = () => {
  return (
    <footer className="bg-accent">
      <MaxWidthContainer className="">
        <div className="grid grid-cols-12 gap-14  text-white">
          <div className="col-span-4 space-y-4">
            <h3 className="text-lg font-medium uppercase">Salon Hours</h3>
            <div className="space-y-2">
              <p className="flex items-center justify-between font-lora text-sm font-normal">
                <span>Sunday</span>
                <span>Closed</span>
              </p>
              <p className="flex items-center justify-between font-lora text-sm font-normal">
                <span>Monday</span>
                <span>8:00am - 6:00pm</span>
              </p>
              <p className="flex items-center justify-between font-lora text-sm font-normal">
                <span>Tuesday</span>
                <span>8:00am - 8:00pm</span>
              </p>
              <p className="flex items-center justify-between font-lora text-sm font-normal">
                <span>Wednesday</span>
                <span>8:00am - 8:00pm</span>
              </p>
              <p className="flex items-center justify-between font-lora text-sm font-normal">
                <span>Thursday</span>
                <span>8:00am - 8:00pm</span>
              </p>
              <p className="flex items-center justify-between font-lora text-sm font-normal">
                <span>Friday</span>
                <span>8:00am - 7:00pm</span>
              </p>
              <p className="flex items-center justify-between font-lora text-sm font-normal">
                <span>Saturday</span>
                <span>8:00am - 5:00pm</span>
              </p>
            </div>
            <div className="text-xs">
              <p>*Need earlier or later? Ask about our availability</p>
              <p>**Hours vary slightly according to appts on particular day</p>
            </div>
          </div>
          <div className="col-span-5 space-y-4">
            <h3 className="text-lg font-medium uppercase">Menu</h3>
            <div className="grid grid-cols-3 gap-10">
              <div className="space-y-2">
                <h6 className="text-base font-medium underline">About</h6>
                <div className="flex flex-col gap-2 text-sm">
                  <Link href="/about/staff">Our Staff</Link>
                  <Link href="/about/staff">Our Salon</Link>
                  <Link href="/about/staff">General Policies</Link>
                  <Link href="/about/staff">Our Salon</Link>
                  <Link href="/about/staff">Our Salon</Link>
                  <Link href="/about/staff">Our Salon</Link>
                </div>
              </div>
              <div className="space-y-2">
                <h6 className="text-base font-medium underline">Services</h6>
                <div className="flex flex-col gap-2 text-sm">
                  <Link href="/about/staff">Hair cuts</Link>
                  <Link href="/about/staff">Hair Coloring</Link>
                  <Link href="/about/staff">Barbing</Link>
                  <Link href="/about/staff">Barbing</Link>
                  <Link href="/about/staff">Barbing</Link>
                  <Link href="/about/staff">Barbing</Link>
                </div>
              </div>
              <div className="space-y-2">
                <h6 className="text-base font-medium underline">Others</h6>
                <div className="flex flex-col gap-2 text-xs">
                  <Link href="/about/staff">Blog</Link>
                  <Link href="/about/staff">FAQs</Link>
                  <Link href="/about/staff">Privacy Policies</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-3 space-y-4">
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Booking 24/7</h3>
              <div className="rounded-full border border-white p-1">
                <Button className="w-full rounded-full bg-white text-primary hover:bg-secondary hover:text-white">
                  Book Online <ArrowRight />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Our Location</h3>
              <p className="flex flex-col text-sm">
                <span className="text-sm font-bold uppercase">
                  Landtana Crown Braids
                </span>
                <span className="underline">
                  6923 W Loop 1604 N suite 214, San Antonio, TX 78254
                </span>
                <span>(830) 350-6003</span>
              </p>
              <p>
                <Link
                  href="https://www.google.com/maps?daddr=6923+W+Loop+1604+N+suite+214,+San+Antonio,+TX+78254"
                  className="font-bold underline"
                >
                  Get Directions
                </Link>
              </p>
              <div className="flex items-center gap-2">
                <div className="relative flex size-10 items-center justify-center rounded-full border">
                  <Link
                    href="https://www.facebook.com/share/1E7hwFDthG/?mibextid=wwXIfr"
                    className="absolute left-0 top-0 z-10 size-full"
                  />

                  <Facebook className="size-4" />
                </div>
                <div className="relative flex size-10 items-center justify-center rounded-full border">
                  <Link
                    href="https://www.instagram.com/landtanacrownbraids"
                    className="absolute left-0 top-0 z-10 size-full"
                  />
                  <Instagram className="size-4" />
                </div>
                <div className="relative flex size-10 items-center justify-center rounded-full border">
                  <Link
                    href="https://youtube.com/@landtanacrownbraids?si=4icQcgwRzjJEmf54"
                    className="absolute left-0 top-0 z-10 size-full"
                  />
                  <Youtube className="size-4" />
                </div>
                <div className="relative flex size-10 items-center justify-center rounded-full border">
                  <Link
                    href="https://www.instagram.com/landtanacrownbraids"
                    className="absolute left-0 top-0 z-10 size-full"
                  />
                  <Instagram className="size-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-between border-t pt-6 text-white">
          <div>
            <p>©2025 Landtana Crown Braids</p>
          </div>
          <div>
            <Logo
              bgClass="bg-white size-[60px]"
              logoLink="https://res.cloudinary.com/davidleo/image/upload/v1739272858/landtana/WhatsApp_Image_2025-02-11_at_09.19.09_b530cecd-removebg-preview_tb50q3.png"
            />
          </div>
          <div>
            <Link href="https://davidleotech.com">
              Designed By DavidLeoTech
            </Link>
          </div>
        </div>
      </MaxWidthContainer>
    </footer>
  );
};
