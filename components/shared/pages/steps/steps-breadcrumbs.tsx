// @flow
import * as React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useBookingStore } from "@/lib/use-booking-store";
import { cn } from "@/lib/utils";

const defaultFormatter = (crumb: string) => {
  return crumb
    .replace(/[-_]/g, " ")
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toUpperCase() : word.toLowerCase()
    );
};
export const StepsBreadcrumbs = () => {
  const steps = [
    {
      step: 1,
      title: "Book Service",
    },
    {
      step: 2,
      title: "Select Service",
    },
    {
      step: 3,
      title: "Select Addons",
    },
    {
      step: 4,
      title: "Select Date & Time",
    },
    {
      step: 5,
      title: "Confirmation",
    },
  ];
  const { step, updateState } = useBookingStore();
  // Filter steps to show only up to the current step
  const visibleSteps = steps.filter((crumb) => crumb.step <= step);
  return (
    <Breadcrumb className="mb-10">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {visibleSteps.map((crumb, index) => {
          const isLast = index === visibleSteps.length - 1;
          const formattedCrumb = defaultFormatter(crumb.title);

          return (
            <React.Fragment key={crumb.title}>
              <BreadcrumbItem
                className={cn(
                  "cursor-pointer",
                  isLast && "font-semibold text-black"
                )}
                onClick={() => updateState({ step: crumb.step })}
              >
                {formattedCrumb}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
