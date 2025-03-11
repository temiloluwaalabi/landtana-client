/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

import { Button, buttonVariants } from "../ui/button";

interface PageTitleHeaderProps {
  page: string;
  showPage?: boolean;
  addLink?: string;
  onAddClick?: () => void;
  addLabel?: string;
  lastItem?: string;
  showCrumbs?: boolean;
  showBtn?: boolean;
  secondBtn?: React.ReactNode;
  breadcrumbFormatter?: (crumb: string, index: number) => string;
  homeCrumb?: { label: string; href: string };
  className?: string;
  addType?: string;
  showbtn?: boolean;
  addDialog?: boolean;
  dialogContent?: React.ReactNode;
}
export const defaultFormatter = (crumb: string) => {
  return crumb
    .replace(/[-_]/g, " ")
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toUpperCase() : word.toLowerCase()
    );
};

const PageTitleHeader = ({
  page,
  addLink,
  showPage,
  lastItem,
  addType,
  showCrumbs,
  showbtn,
  addLabel,
  onAddClick,
  showBtn = !!addLink || !!onAddClick,
  homeCrumb = { label: "Home", href: "/" },
  addDialog,
  breadcrumbFormatter = defaultFormatter,
  className,
  dialogContent,
  secondBtn,
}: PageTitleHeaderProps) => {
  const pathname = usePathname();
  const parts = pathname.split("/");
  parts.shift();
  const breadcrumbs = parts;

  const AddButton = () => {
    const label = addLabel;
    const buttonClass = cn(
      buttonVariants({ variant: "default" }),
      "gap-2 hover:bg-red-900"
    );

    if (addLink) {
      return (
        <Link href={addLink} className={buttonClass}>
          <Plus className="size-4" />
          <span>{label}</span>
        </Link>
      );
    }

    return (
      <Button onClick={onAddClick} className={buttonClass}>
        <Plus className="size-4" />
        <span>{label}</span>
      </Button>
    );
  };

  return (
    <section
      className={cn(
        "mb-2 flex flex-wrap items-center justify-between gap-4 md:mb-4 2xl:mb-6",
        className
      )}
    >
      {" "}
      <div className="flex flex-col items-start gap-1">
        {showPage && (
          <h1 className="dark:text-light-200 text-xl font-bold tracking-tight md:text-2xl">
            {page}
          </h1>
        )}

        {showCrumbs && (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={homeCrumb.href}>
                  {homeCrumb.label}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                const href = `/${breadcrumbs.slice(0, index + 1).join("/")}`;
                const formattedCrumb = breadcrumbFormatter(crumb, index);

                return (
                  <React.Fragment key={crumb}>
                    <BreadcrumbItem>
                      {!isLast ? (
                        <BreadcrumbLink href={href}>
                          {formattedCrumb}
                        </BreadcrumbLink>
                      ) : (
                        <span className="font-medium text-foreground">
                          {lastItem || formattedCrumb}
                        </span>
                      )}
                    </BreadcrumbItem>
                    {!isLast && <BreadcrumbSeparator />}
                  </React.Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {secondBtn}
        {showBtn && <AddButton />}
        {dialogContent}
      </div>
      {/* <div className="my-2 flex gap-2 md:my-0 md:ml-auto">
        {addLink && !addDialog && (
          <Link
            href={addLink}
            className="light-border-2 text-dark400_light500 flex items-center gap-2 rounded-md  border p-2"
          >
            <Plus />
            Add New {removeS(page)}
          </Link>
        )}
        <div>{secondBtn}</div>
      </div> */}
      {/* {dialogContent} */}
    </section>
  );
};

export default PageTitleHeader;
