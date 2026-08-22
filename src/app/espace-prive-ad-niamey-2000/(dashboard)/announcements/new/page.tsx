import AnnouncementForm from "@/components/admin/AnnouncementForm";

export const dynamic = "force-dynamic";

export default function NewAnnouncementPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-ink sm:text-3xl">
        Nouvelle annonce
      </h1>
      <p className="mt-1 text-sm text-muted">
        Rédigez un communiqué pour la page Annonces du site.
      </p>
      <div className="mt-8">
        <AnnouncementForm />
      </div>
    </div>
  );
}
