import SermonForm from "@/components/admin/SermonForm";

export default function NewSermonPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-ink sm:text-3xl">
        Nouveau sermon
      </h1>
      <p className="mt-1 text-sm text-muted">
        Ajoutez une vidéo YouTube et son résumé.
      </p>
      <div className="mt-8">
        <SermonForm />
      </div>
    </div>
  );
}
