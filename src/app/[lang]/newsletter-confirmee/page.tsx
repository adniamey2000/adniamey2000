import Link from "next/link";

export default function NewsletterConfirmPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="mx-auto max-w-md space-y-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h1 className="font-serif text-2xl font-bold text-ink sm:text-3xl">
          E-mail confirmé
        </h1>
        <p className="text-sm leading-relaxed text-muted">
          Votre adresse e-mail a bien été vérifiée. Vous recevrez désormais les actualités et les annonces de l&apos;AD Niamey 2000.
        </p>
        <Link
          href="/fr"
          className="inline-block rounded-full bg-primary-dark px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
