import DonationsEditor from "@/components/admin/DonationsEditor";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDonationsPage() {
  const items = await prisma.donationInfo.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-ink sm:text-3xl">
        Dons
      </h1>
      <p className="mt-1 text-sm text-muted">
        Les informations de don affichées sur le site.
      </p>
      <div className="mt-8">
        <DonationsEditor items={items} />
      </div>
    </div>
  );
}
