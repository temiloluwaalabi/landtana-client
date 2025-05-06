import { Analytics } from "@vercel/analytics/react";

import { MainFooter } from "@/components/navigation/footer";
import { Navbar } from "@/components/navigation/navbar";
import SocialMediaWidget from "@/components/shared/social-media-widget";

import { getSession } from "../actions/session.action";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <>
      <Analytics />
      <Navbar type="CENTER" isLogeedIn={session.isLoggedIn || false} />
      {/* <PushNotificationManager /> */}

      <main className="size-full">{children}</main>
      <SocialMediaWidget />
      <MainFooter />
    </>
  );
}
