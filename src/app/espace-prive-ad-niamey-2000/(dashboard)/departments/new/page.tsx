import DepartmentForm from "@/components/admin/DepartmentForm";

export default function NewDepartmentPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-ink sm:text-3xl">
        Nouveau département
      </h1>
      <p className="mt-1 text-sm text-muted">
        Ajoutez un département de l&apos;église.
      </p>
      <div className="mt-8">
        <DepartmentForm />
      </div>
    </div>
  );
}
