import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import ResetPasswordForm from "@/components/admin/ResetPasswordForm";
import { getSession } from "@/lib/auth";
import { churchName } from "@/lib/i18n";

export const metadata = {
  title: "Nouveau mot de passe — AD Niamey 2000",
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const session = await getSession();
  if (session) redirect("/admin");

  const { token } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-white to-slate-200 px-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-6">
        <Image
          src="/adlogo.jpg"
          alt={churchName}
          width={96}
          height={96}
          className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-xl ring-2 ring-primary-soft"
        />
        {token ? (
          <ResetPasswordForm token={token} />
        ) : (
          <div className="w-full space-y-4 rounded-3xl border border-primary-soft bg-white p-8 text-center shadow-xl">
            <h1 className="font-serif text-2xl font-bold text-ink">
              Lien invalide
            </h1>
            <p className="text-sm text-muted">
              Le lien de réinitialisation est manquant ou incomplet.
            </p>
          </div>
        )}
        <Link
          href="/admin/login"
          className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-medium text-ink transition hover:bg-slate-100"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Retour à la connexion
        </Link>
      </div>
    </div>
  );
}
