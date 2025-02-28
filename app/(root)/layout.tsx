import { MainFooter } from "@/components/navigation/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="size-full">{children}</main>
      <MainFooter />
    </>
  );
}
