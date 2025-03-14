import { Analytics } from "@vercel/analytics/react";

import { MainFooter } from "@/components/navigation/footer";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Analytics />
      <main className="size-full">{children}</main>
      <MainFooter />
    </>
  );
}
