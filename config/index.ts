import { Home, Calendar, Scissors, Settings, Wallet, User } from "lucide-react";

import { allRoutes } from "./routes";

export interface SidebarItem {
  name: string;
  href?: string;
  isActive?: boolean;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  roles?: string[];
  dropdownItems?: {
    name: string;
    href: string;
    icon?: React.FC<React.SVGProps<SVGSVGElement>>;
    roles?: string[];
  }[];
}

export const SIDEBAR_ITEMS: SidebarItem[] = [
  // ==========================
  // 👉 **Main Section**
  // ==========================
  { name: "Overview" }, // Label

  {
    name: "Dashboard",
    href: allRoutes.dashboard.url,
    icon: Home,
  },
  {
    name: "All Bookings",
    href: allRoutes.bookings.url,
    icon: Calendar,
  },
  {
    name: "Services",
    href: allRoutes.services.url,
    icon: Scissors,
    isActive: true,
    dropdownItems: [
      {
        name: "All Services",
        href: allRoutes.services.url,
      },
      {
        name: "Service Categories",
        href: allRoutes.serviceCategories.url,
      },
    ],
  },
  {
    name: "Payments",
    href: allRoutes.payments.url,
    icon: Wallet,
  },

  {
    name: "Settings",
    href: allRoutes.settings.url,
    icon: Settings,
  },
  {
    name: "Profile",
    href: allRoutes.profile.url,
    icon: User,
  },
];
