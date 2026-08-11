import { prisma } from "@/lib/prisma";
import type { Dict } from "@/lib/i18n";

export default async function DonationSection({ dict }: { dict: Dict }) {
  const donations = await prisma.donationInfo.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <h2 className="font-serif text-3xl font-bold sm:text-4xl">
          {dict.home.donation.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted">
          {dict.home.donation.text}
        </p>
        {donations.length > 0 && (
          <div className="mx-auto mt-8 grid max-w-2xl gap-4 sm:grid-cols-3">
            {donations.map((donation) => (
              <div
                key={donation.id}
                className="rounded-2xl border border-primary-soft bg-primary-soft/50 p-5"
              >
                <p className="text-sm font-semibold text-primary-dark">
                  {donation.label}
                </p>
                <p className="mt-1 text-sm font-medium text-ink">
                  {donation.value}
                </p>
              </div>
            ))}
          </div>
        )}
        <p className="mx-auto mt-6 max-w-2xl text-sm italic text-muted">
          {dict.home.donation.note}
        </p>
      </div>
    </section>
  );
}
