import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="text-7xl font-bold text-primary-soft">404</p>
      <h1 className="mt-4 font-serif text-2xl font-bold text-ink">
        Page introuvable
      </h1>
      <p className="mt-2 max-w-md text-muted">
        La page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>
      <Link
        href="/fr"
        className="mt-8 inline-flex rounded-full bg-primary-dark px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
