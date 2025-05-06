"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
// @flow
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import * as React from "react";

import { SIDEBAR_ITEMS } from "@/config";
import { cn } from "@/lib/utils";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../ui/sidebar";

export const SidebarNav = () => {
  const pathname = usePathname();
  return (
    <div className="">
      {SIDEBAR_ITEMS.map((item, index) => {
        const isActive = pathname === (item.href as string);
        const pathnameExistInDropdowns: any = item.dropdownItems?.filter(
          (dropdownItem) => dropdownItem.href === pathname,
        );
        const isDropdown = Boolean(pathnameExistInDropdowns?.length);

        return (
          <SidebarGroup key={item.name + "-" + index} className="">
            {item?.href ? (
              <SidebarGroupContent className="">
                <SidebarMenu className="">
                  {item.dropdownItems ? (
                    <Collapsible
                      defaultOpen={item.isActive || isDropdown}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            tooltip={item.name}
                            className="!h-[40px]"
                          >
                            <a
                              // href={item.href}
                              className={cn(
                                "flex gap-2",
                                isActive && "text-primary !py-3 ",
                              )}
                            >
                              {item.icon && <item.icon className="size-5" />}
                              <span className="text-base">{item.name}</span>
                            </a>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="py-1">
                          <SidebarMenuSub className="space-y-2">
                            {item.dropdownItems.map((subItem) => {
                              // Use more precise logic to determine if the link is active
                              const subItemHref = subItem.href as string;
                              const isChildActive =
                                pathname.trim() === subItemHref;

                              return (
                                <SidebarMenuSubItem key={subItem.name}>
                                  <SidebarMenuSubButton asChild>
                                    <a
                                      href={subItem.href}
                                      className={cn(
                                        "hover:bg-orange-100 py-3 h-[40px]",
                                        isChildActive &&
                                          "!text-white bg-primary hover:!bg-primary",
                                      )}
                                    >
                                      <span className="truncate text-base">
                                        {" "}
                                        {subItem.name}
                                      </span>
                                    </a>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              );
                            })}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild tooltip={item.name}>
                        <a
                          href={item.href}
                          className={cn(
                            "hover:bg-orange-100 py-3 h-[40px]",
                            isActive &&
                              " !text-white bg-primary hover:!bg-primary",
                          )}
                        >
                          {item.icon && <item.icon />}

                          <span className="truncate text-base">
                            {" "}
                            {item.name}
                          </span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            ) : (
              <SidebarGroupLabel
                className={cn("mt-10 !h-fit px-0", index === 0 && "mt-0")}
              >
                {item.name}
              </SidebarGroupLabel>
            )}
          </SidebarGroup>
        );
      })}
    </div>
  );
};
