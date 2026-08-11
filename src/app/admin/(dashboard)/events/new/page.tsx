import EventForm from "@/components/admin/EventForm";

export default function NewEventPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-ink sm:text-3xl">
        Nouvel événement
      </h1>
      <p className="mt-1 text-sm text-muted">
        Ajoutez un événement ou une annonce de l&apos;église.
      </p>
      <div className="mt-8">
        <EventForm />
      </div>
    </div>
  );
}
