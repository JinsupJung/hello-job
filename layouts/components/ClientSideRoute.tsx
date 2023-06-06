"use client";
import Link from "next/link";

function ClientSideRoute({
  children,
  route,
}: {
  children: React.ReactNode;
  route: string;
}) {
    console.log('ClientSideRoute = ', route)
  return <Link href={route}>{children}</Link>;
}
export default ClientSideRoute;