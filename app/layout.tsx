import type { Metadata } from "next";

import "./globals.css";
import { Navbar } from "@/components/navigation/navbar";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import Providers from "@/providers/tansack-provider";

// import { getUserAction } from "./actions/users.action";
import { getSession } from "./actions/session.action";
import { cormorant, iSans, lora } from "./fonts";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  // const user = await getUserAction();
  // console.log("LAYOUT USER", user.user);
  return (
    <html lang="en">
      <body
        className={cn(
          cormorant.variable,
          lora.variable,
          iSans.variable,
          "font-lora antialiased"
        )}
      >
        <Providers>
          <Toaster />
          <Navbar type="CENTER" isLogeedIn={session.isLoggedIn || false} />
          {children}
        </Providers>
        {/* <BeforeFooter /> */}
      </body>
    </html>
  );
}
