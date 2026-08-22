import GalleryUploadForm from "@/components/admin/GalleryUploadForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const images = await prisma.galleryImage.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <div>
        <h1 className="font-serif text-2xl font-bold text-ink sm:text-3xl">
          Galerie
        </h1>
        <p className="mt-1 text-sm text-muted">
          Ajoutez ou supprimez les photos affichées sur la page Galerie.
        </p>
      </div>

      <div className="mt-8">
        <GalleryUploadForm />
      </div>

      <div className="mt-10">
        <h2 className="font-serif text-lg font-bold text-ink">
          Photos ({images.length})
        </h2>
        {images.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-primary-soft bg-white p-10 text-center text-sm text-muted">
            Aucune photo pour le moment.
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {images.map((image) => (
              <div
                key={image.id}
                className="overflow-hidden rounded-2xl border border-primary-soft bg-white shadow-sm"
              >
                <div className="relative aspect-[3/2] w-full bg-slate-100">
                  <img
                    src={image.url}
                    alt={image.captionFr || image.captionEn || "Photo de la galerie"}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <p className="truncate text-sm font-medium text-ink">
                    {image.captionFr || image.captionEn || "—"}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-muted">
                      {new Intl.DateTimeFormat("fr-FR").format(image.createdAt)}
                    </span>
                    <DeleteButton url={`/api/admin/gallery/${image.id}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
