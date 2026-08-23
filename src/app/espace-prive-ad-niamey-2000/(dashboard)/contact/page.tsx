import SettingsForm from "@/components/admin/SettingsForm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminContactPage() {
  const settings = await prisma.siteSetting.findMany();
  const map = new Map(settings.map((s) => [s.key, s]));

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-ink sm:text-3xl">
        Contact
      </h1>
      <p className="mt-1 text-sm text-muted">
        Les coordonnées de l&apos;église affichées sur la page Contact et dans
        le pied de page.
      </p>
      <div className="mt-8">
        <SettingsForm
          settings={{
            address: map.get("address") ?? null,
            phone: map.get("phone") ?? null,
            email: map.get("email") ?? null,
            themeYear: map.get("themeYear") ?? null,
            themeText: map.get("themeText") ?? null,
            verseYear: map.get("verseYear") ?? null,
          }}
        />
      </div>
    </div>
  );
}
