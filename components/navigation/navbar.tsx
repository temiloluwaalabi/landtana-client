/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ChevronDown, ChevronRight, LogOutIcon, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { authMenuRoutes, NavbarRoutes, navbarROutes } from "@/config/routes";
import useSession from "@/hooks/use-session";
import { cn } from "@/lib/utils";
// import { Logo } from "./logo";

import { Logo } from "./logo";
import { LogoutModal } from "../dialogs/logout-modal";
import MaxWidthContainer from "../shared/max-width-container";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";

type NavbarProps = {
  className?: string;
  menuClasss?: string;
  transparent?: boolean;
  isLogeedIn: boolean;
};
interface ContentProps extends NavbarProps {
  otherClasses?: string;
  sticky?: boolean;
  routes: NavbarRoutes[];
}

interface MainNavbar extends NavbarProps {
  type: "LEFT" | "CENTER";
}

const NavContent = ({ otherClasses, routes }: ContentProps) => {
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = React.useState("");

  React.useEffect(() => {
    // Update the hash when it changes
    const updateHash = () => setCurrentHash(window.location.hash);
    updateHash(); // Set initial value
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, [currentHash]);
  return (
    <NavigationMenu className={cn("max-w-full w-full z-50", otherClasses)}>
      <NavigationMenuList className="space-x-5">
        {routes.map((nav) => {
          const isActive =
            currentHash === nav.href || // Match hash
            `${pathname}${currentHash}` === nav.href; // Match full path with hash
          return (
            <NavigationMenuItem key={nav.href}>
              <NavigationMenuLink
                href={nav.href}
                active={isActive}
                className={cn(
                  "!bg-transparent hover:!bg-secondary text-base text-black uppercase",
                  navigationMenuTriggerStyle(),
                  isActive &&
                    "!text-primary font-bold underline underline-offset-4 text-white",
                )}
              >
                {nav.name}
              </NavigationMenuLink>
            </NavigationMenuItem>
            // <React.Fragment key={nav.href}>
            //   {nav.dropdownItems && nav.dropdownItems.length > 0 ? (
            //     <NavigationMenuItem className="">
            //       <NavigationMenuTrigger className="!bg-transparent hover:!bg-secondary text-base uppercase">
            //         {nav.name}
            //       </NavigationMenuTrigger>
            //       <NavigationMenuContent className="">
            //         <ul className="grid w-48 gap-3 p-4">
            //           {nav.dropdownItems.map((item) => (
            //             <NavigationMenuLink
            //               key={item.href}
            //               href={item.href}
            //               active={isActive}
            //               className={cn(
            //                 "!bg-transparent hover:!bg-secondary ",
            //                 navigationMenuTriggerStyle()
            //               )}
            //             >
            //               {item.name}
            //             </NavigationMenuLink>
            //           ))}
            //         </ul>
            //       </NavigationMenuContent>
            //     </NavigationMenuItem>
            //   ) : (

            //   )}
            // </React.Fragment>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const LeftNavbar = (props: NavbarProps) => {
  const pathname = usePathname();
  const [openSheet, setopenSheet] = React.useState(false);
  const [currentHash, setCurrentHash] = React.useState("");

  React.useEffect(() => {
    // Update the hash when it changes
    const updateHash = () => setCurrentHash(window.location.hash);
    updateHash(); // Set initial value
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, [currentHash]);
  return (
    <nav className={cn("flex items-center justify-between", props.className)}>
      <div className={cn("relative")}>
        <Link className="absolute left-0 top-0 z-50 size-full" href="/" />
        <div className=" relative flex size-[75px] items-center rounded-full bg-black p-2">
          <Image
            src={
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
      <div className="hidden items-center gap-[30px] lg:flex">
        <NavContent routes={navbarROutes} isLogeedIn={props.isLogeedIn} />
      </div>
      <div className="z-50 hidden items-center gap-[30px] lg:flex">
        {/* Contact Button (Desktop) */}
        <Button className="z-50 hidden bg-primary hover:bg-secondary/90 lg:inline-flex">
          Contact Us
        </Button>
      </div>
      <Sheet open={openSheet} onOpenChange={setopenSheet}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="size-6" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <div className="flex flex-col items-start gap-4">
            {navbarROutes.map((route) => {
              const isActive =
                currentHash === route.href || // Match hash
                `${pathname}${currentHash}` === route.href; // Match full path with hash

              return (
                <SheetClose key={route.name}>
                  <Link
                    href={route.href}
                    className={cn(
                      "text-lg text-black font-fira font-normal",
                      isActive && "text-primary underline underline-offset-8",
                    )}
                  >
                    {route.name}
                  </Link>
                </SheetClose>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

const CenterLogoNavbar = (props: NavbarProps) => {
  const pathname = usePathname();
  const [openSheet, setopenSheet] = React.useState(false);
  const [currentHash, setCurrentHash] = React.useState("");
  const { session } = useSession();
  const [openAuthMenu, setOpenAuthMenu] = React.useState(false);
  // const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  React.useEffect(() => {
    // Update the hash when it changes
    const updateHash = () => setCurrentHash(window.location.hash);
    updateHash(); // Set initial value
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, [currentHash]);
  return (
    <nav
      className={cn(
        "flex items-center justify-between lg:grid gap-2 lg:grid-cols-12 ",
        props.className,
      )}
    >
      <Sheet open={openSheet} onOpenChange={setopenSheet}>
        <SheetTrigger asChild className="z-50 lg:hidden">
          <div className="flex size-[40px] cursor-pointer items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-white">
            <Menu className="size-7" />
          </div>
        </SheetTrigger>
        <SheetContent>
          <div className="flex flex-col items-start gap-4">
            {navbarROutes.map((route) => {
              const isActive =
                currentHash === route.href || // Match hash
                `${pathname}${currentHash}` === route.href; // Match full path with hash

              return (
                <SheetClose key={route.name} asChild>
                  <Link
                    href={route.href}
                    className={cn(
                      "text-lg text-black font-fira font-normal",
                      isActive && "text-primary underline underline-offset-8",
                    )}
                  >
                    {route.name}
                  </Link>
                </SheetClose>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
      <div className="col-span-5 hidden items-center gap-[30px] lg:flex">
        <NavContent
          isLogeedIn={props.isLogeedIn}
          routes={navbarROutes.slice(0, 4)}
          otherClasses="justify-start"
        />
      </div>
      {/* <div className={cn(" relative flex justify-center lg:hidden")}>
        <Logo />
      </div> */}
      <div
        className={cn(
          " relative items-center flex col-span-2  justify-center  2xl:justify-start ",
        )}
      >
        <Logo />
      </div>
      <div className="z-50 col-span-5 hidden items-center justify-between gap-4 lg:flex ">
        <NavContent
          isLogeedIn={props.isLogeedIn}
          routes={navbarROutes.slice(4)}
          otherClasses="justify-start"
        />
        <div>
          {props.isLogeedIn === true ? (
            <DropdownMenu open={openAuthMenu} onOpenChange={setOpenAuthMenu}>
              <DropdownMenuTrigger>
                <div className="relative flex items-center gap-2">
                  <Avatar>
                    <AvatarFallback>CN</AvatarFallback>
                    {/* <AvatarImage src={props.avatar || ""} /> */}
                  </Avatar>
                  {/* <div>
                    <h4>
                      {session.first_name}
                      {session.email}
                    </h4>
                    <p>{props.loggedInUser.phone_no}</p>
                  </div> */}
                  <ChevronDown
                    className={cn(" size-4", openAuthMenu && "rotate-180")}
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                side="bottom"
                sideOffset={5}
                className="w-[328px] rounded-md p-3"
              >
                <Card className="flex flex-col gap-0 border-none p-0 shadow-none outline-none">
                  <CardHeader className="!flex flex-row items-center gap-4  p-0">
                    <div className="">
                      <Avatar
                        className={cn(
                          "!h-12 w-12 sm:!h-16 sm:w-16 border-2 cursor-pointer border-gray-0 dark:border-gray-100",
                        )}
                      >
                        <AvatarImage
                          src={""}
                          className="!z-10 cursor-pointer"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="space-y-1">
                      <h2 className="font-mont text-base font-semibold">
                        {session.first_name}
                      </h2>
                      <p className="font-mont text-sm font-normal">Online</p>
                    </div>
                  </CardHeader>
                  <DropdownMenuSeparator className="my-2 bg-primary opacity-25" />
                  <CardContent className=" !p-0">
                    {authMenuRoutes.map((route, id) => {
                      const pathnameExistsInDropdowns: any =
                        route.dropdownItems?.filter(
                          (dropdownItem) => dropdownItem.href === pathname,
                        );
                      // const isOpen = openIndex === id;
                      const isDropdownOpen = Boolean(
                        pathnameExistsInDropdowns?.length,
                      );
                      const isActive = pathname === (route.href as string);

                      return (
                        <div
                          key={route.name + "-" + id}
                          onSelect={(e) => e.preventDefault()}
                        >
                          {route?.dropdownItems &&
                          route?.dropdownItems.length ? (
                            <Collapsible
                              defaultOpen={isDropdownOpen}
                              className="group/collapsible"
                              // open={isOpen}
                              // onOpenChange={(newOpenState) =>
                              //   handleOpenChange(id, newOpenState)
                              // }
                            >
                              <CollapsibleTrigger
                                className="w-full cursor-pointer"
                                asChild
                              >
                                <p
                                  className={cn(
                                    "flex  h-full items-center w-full text-black justify-between py-3 gap-2 mb-2 hover:px-2 hover:rounded-md",
                                    isActive && "text-primary ",
                                  )}
                                >
                                  <div className="flex items-center gap-2">
                                    {route.icon && (
                                      <route.icon className="size-4" />
                                    )}{" "}
                                    <p className="text-14_medium font-semibold">
                                      {route.name}
                                    </p>
                                  </div>
                                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                </p>
                              </CollapsibleTrigger>
                              <CollapsibleContent className="rounded-xl  px-2">
                                {route.dropdownItems.map((item, index) => {
                                  const isChildActive =
                                    pathname === (item.href as string);
                                  return (
                                    <div
                                      key={item.name + index}
                                      className="flex items-center gap-2"
                                    >
                                      {item.icon && (
                                        <item.icon className="size-4" />
                                      )}{" "}
                                      <Link
                                        href={item.href}
                                        className={cn(
                                          "text-14_medium font-semibold flex  h-full items-center py-3 gap-2 cursor-pointer ",
                                          isChildActive && "text-primary",
                                        )}
                                      >
                                        {item.name}
                                      </Link>
                                    </div>
                                  );
                                })}
                              </CollapsibleContent>
                            </Collapsible>
                          ) : (
                            <p className="text-base text-primary ">
                              <Link href={route.href || "/"}>{route.name}</Link>
                            </p>
                          )}
                        </div>
                      );
                    })}
                    {/*  <DropdownMenuSeparator className="bg-primary-blackishGreen my-4 opacity-25" />
                    {authMenuRoutes.slice(3).map((route, id) => {
                      const pathnameExistsInDropdowns: any =
                        route.dropdownItems?.filter(
                          (dropdownItem) => dropdownItem.href === pathname
                        );
                      // const isOpen = openIndex === id;
                      const isDropdownOpen = Boolean(
                        pathnameExistsInDropdowns?.length
                      );
                      const isActive = pathname === (route.href as string);

                      return (
                        <DropdownMenuItem
                          onSelect={(e) => e.preventDefault()}
                          key={route.name + "-" + id}
                        >
                          {route?.href ? (
                            route.dropdownItems &&
                            route.dropdownItems.length && (
                              <Collapsible
                                defaultOpen={isDropdownOpen}
                                className="group/collapsible"
                                // open={isOpen}
                                // onOpenChange={(newOpenState) =>
                                //   handleOpenChange(id, newOpenState)
                                // }
                              >
                                <CollapsibleTrigger className="w-full">
                                  <p
                                    key={`${route} - ${id}`}
                                    className={cn(
                                      "flex  h-full items-center w-full hover:bg-light-800 justify-between py-3 gap-2 mb-2 hover:px-2 hover:rounded-md",

                                      isActive && "text-primary "
                                    )}
                                  >
                                    <div className="flex items-center gap-2">
                                      <>{route.icon}</>
                                      <Link
                                        href={route.href}
                                        className="text-14_medium font-semibold"
                                      >
                                        {route.name}
                                      </Link>
                                    </div>
                                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                  </p>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="rounded-xl  px-2">
                                  {route.dropdownItems.map((item, index) => {
                                    const isChildActive =
                                      pathname === (item.href as string);
                                    return (
                                      <div
                                        key={item.name + index}
                                        className="flex items-center gap-2"
                                      >
                                        <>{route.icon}</>
                                        <Link
                                          href={item.href}
                                          className={cn(
                                            "text-14_medium font-semibold flex  h-full items-center py-3 gap-2 ",
                                            isChildActive && "text-primary"
                                          )}
                                        >
                                          {item.name}
                                        </Link>
                                      </div>
                                    );
                                  })}
                                </CollapsibleContent>
                              </Collapsible>
                            )
                          ) : (
                            <p>{route.name}</p>
                          )}
                        </DropdownMenuItem>
                      );
                    })} */}

                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <LogoutModal
                        trigger={
                          <Button
                            variant={"ghost"}
                            className="flex w-full items-center justify-start p-0 hover:bg-red-600 hover:px-2 hover:text-white"
                          >
                            <LogOutIcon className="mr-2 size-4" />
                            Logout
                          </Button>
                        }
                      />
                    </DropdownMenuItem>
                  </CardContent>
                </Card>{" "}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button className="z-50">
              <Link className="" href={"/sign-in"}>
                Sign In
              </Link>
            </Button>
          )}
        </div>
      </div>
      <div className="lg:hidden">
        <Button className="z-50">
          <Link className="" href={"/sign-in"}>
            Sign In
          </Link>
        </Button>
      </div>
    </nav>
  );
};

export const Navbar = (props: MainNavbar) => {
  return (
    <MaxWidthContainer className="!z-50 w-full bg-white !py-[10px] shadow-md">
      {props.type === "CENTER" ? (
        <CenterLogoNavbar isLogeedIn={props.isLogeedIn} />
      ) : (
        <LeftNavbar isLogeedIn={props.isLogeedIn} />
      )}
    </MaxWidthContainer>
  );
};
