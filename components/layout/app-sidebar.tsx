"use client";
import * as React from "react";

import { NavUser } from "./nav-user";
import { SidebarNav } from "./sidebar-main";
import { Logo } from "../navigation/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "../ui/sidebar";

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar> & { userRole?: string }) => {
  const user = {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  };

  return (
    <Sidebar
      side="left"
      variant="sidebar"
      collapsible="icon"
      className="!border-r !border-[#E8E8E8] !bg-transparent p-4 dark:!border-dark-400 dark:!bg-dark-200 "
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="cursor-pointer rounded-md hover:bg-white dark:!bg-white">
            <SidebarMenuButton
              size="lg"
              asChild
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground "
            >
              <div className="flex items-center justify-between">
                <Logo
                  bgClass="bg-transparent"
                  className="size-[100px] group-data-[collapsible=icon]:hidden"
                  logoLink="https://res.cloudinary.com/davidleo/image/upload/v1746452381/landtana/landtana_logo_x07115.png"
                />
                <Logo
                  bgClass="bg-transparent"
                  className="hidden size-[100px] group-data-[collapsible=icon]:flex"
                  logoLink="https://res.cloudinary.com/davidleo/image/upload/v1746452256/landtana/Asset_2_nyywsg.png"
                />
                {/* <SidebarTrigger className="cursor-pointer  group-data-[collapsible=icon]:w-full" /> */}
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="custom-scrollbar group-data-[collapsible=icon]:!p-0 ">
        <SidebarNav />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
