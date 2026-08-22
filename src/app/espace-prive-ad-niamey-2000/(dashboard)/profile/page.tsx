import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import ProfileEditor from "@/components/admin/ProfileEditor";

export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Changer le mot de passe — AD Niamey 2000",
  robots: { index: false, follow: false },
};

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect("/espace-prive-ad-niamey-2000/login");

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-ink">Sécurité</h1>
      <p className="mt-1 text-sm text-muted">
        Modifier votre mot de passe.
      </p>
      <div className="mt-8 max-w-lg">
        <ProfileEditor />
      </div>
    </div>
  );
}
