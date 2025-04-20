import { Calendar, DollarSign, LifeBuoy, Settings, User } from "lucide-react";

export const allRoutes = {
  home: {
    url: "/",
  },
  services: {
    url: "/services",
  },
  gallery: {
    url: "/gallery",
  },
  team: {
    url: "/team",
  },
  about: {
    url: "/about-us",
  },
  faq: {
    url: "/faq",
  },
  contact: {
    url: "/contact-us",
  },
};

export interface NavbarRoutes {
  name: string;
  href: string;
  dropdownItems?: {
    name: string;
    href: string;
  }[];
}

export const navbarROutes: NavbarRoutes[] = [
  {
    name: "Home",
    href: allRoutes.home.url,
  },
  {
    name: "Services",
    href: allRoutes.services.url,
  },
  {
    name: "About Us",
    href: allRoutes.about.url,
    dropdownItems: [
      {
        name: "Our Story",
        href: `${allRoutes.about.url}/story`,
      },
      {
        name: "Team",
        href: `${allRoutes.about.url}/team`,
      },
      {
        name: "Mission",
        href: `${allRoutes.about.url}/mission`,
      },
    ],
  },
  {
    name: "Team",
    href: allRoutes.team.url,
  },
  {
    name: "Salon Gallery",
    href: allRoutes.gallery.url,
  },

  {
    name: "FAQs",
    href: allRoutes.faq.url,
  },
  {
    name: "Contact Us",
    href: allRoutes.contact.url,
  },
];

export interface SidebarItem {
  name: string;
  href?: string;
  isActive?: boolean;
  icon?: React.FC<React.SVGProps<SVGSVGElement> & { className?: string }>;
  dropdownItems?: {
    name: string;
    href: string;
    icon?: React.FC<React.SVGProps<SVGSVGElement> & { className?: string }>;
  }[];
}

export const authMenuRoutes: SidebarItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: User,
  },
  {
    name: "Bookings",
    icon: Calendar,
    href: "/dashboard/bookings",
  },
  {
    name: "Payments",
    icon: DollarSign,
    href: "/dashboard/payments",
    // dropdownItems: [
    //   {
    //     name: "Billing History",
    //     href: "/dashboard/payments/history",
    //     icon: DollarSign,
    //   },
    //   {
    //     name: "Manage Payment Methods",
    //     href: "/dashboard/payments/methods",
    //     icon: DollarSign,
    //   },
    // ],
  },
  {
    name: "Settings",
    icon: Settings,
    href: "/dashboard/settings",

    // dropdownItems: [
    //   {
    //     name: "Profile",
    //     href: "/dashboard/settings/profile",
    //     icon: User,
    //   },
    //   {
    //     name: "Security",
    //     href: "/dashboard/settings/security",
    //     icon: Settings,
    //   },
    // ],
  },
  // {
  //   name: "Support",
  //   href: "/dashboard/support",
  //   icon: LifeBuoy,
  //   dropdownItems: [
  //     {
  //       name: "Help Center",
  //       href: "/dashboard/support/help",
  //       icon: LifeBuoy,
  //     },
  //     {
  //       name: "Contact Support",
  //       href: "/dashboard/support/contact",
  //       icon: LifeBuoy,
  //     },
  //   ],
  // },
];
