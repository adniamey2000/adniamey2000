import { prisma } from "@/lib/prisma";
import type { Dict } from "@/lib/i18n";

export default async function DonationSection({ dict }: { dict: Dict }) {
  const donations = await prisma.donationInfo.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <section className="bg-gradient-to-b from-white to-primary-soft/30">
      <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
        <h2 className="font-serif text-3xl font-bold sm:text-4xl">
          {dict.home.donation.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted">
          {dict.home.donation.text}
        </p>
        {donations.length > 0 && (
          <div className="mx-auto mt-10 grid max-w-2xl gap-5 sm:grid-cols-3">
            {donations.map((donation) => (
              <div
                key={donation.id}
                className="group rounded-2xl border border-primary-soft bg-white p-6 shadow-sm transition duration-300 hover:border-primary/30 hover:shadow-md"
              >
                <p className="text-sm font-semibold text-primary-dark">
                  {donation.label}
                </p>
                <p className="mt-2 text-lg font-bold text-ink">
                  {donation.value}
                </p>
              </div>
            ))}
          </div>
        )}
        <p className="mx-auto mt-8 max-w-2xl text-sm italic text-muted">
          {dict.home.donation.note}
        </p>
      </div>
    </section>
  );
}
