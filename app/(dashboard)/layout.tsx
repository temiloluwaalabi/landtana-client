export default function DashboardLayput({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="size-full">{children}</main>;
}
