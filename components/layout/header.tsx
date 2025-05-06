"use client";

import * as React from "react";

import { getGreeting } from "@/hooks/use-greeting";

import { ModeToggle } from "./toggle-mode";
import { SidebarTrigger } from "../ui/sidebar";

// import useSession from "@/hooks/use-session";

type Props = {
  name: string;
};
export const DashboardHeader = (props: Props) => {
  // const { session } = useSession();
  return (
    <div className="flex w-full items-center justify-between border-b px-4 py-[14px] pr-[20px]  lg:pr-[24px] 2xl:pr-[38px]">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <h2 className="mt-2 font-poppins text-sm font-light text-black dark:text-white md:text-lg lg:mt-0 2xl:text-xl">
          {getGreeting(props.name)}
        </h2>
      </div>
      <div className="flex items-center gap-2">
        <ModeToggle />
      </div>
    </div>
  );
};
