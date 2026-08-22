import { redirect } from "next/navigation";
import AdminShell from "./AdminShell";
import { getSession } from "@/lib/auth";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/espace-prive-ad-niamey-2000/login");

  return <AdminShell>{children}</AdminShell>;
}
