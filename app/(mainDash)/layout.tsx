import { cookies } from "next/headers";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { DashboardHeader } from "@/components/layout/header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import TokenProvider from "@/providers/token-provider";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";
  return (
    <TokenProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <SidebarInset className="w-full dark:bg-dark-200">
          <DashboardHeader name="Temiloluwa" />
          <main className="relative size-full ">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </TokenProvider>
  );
};

export default DashboardLayout;
