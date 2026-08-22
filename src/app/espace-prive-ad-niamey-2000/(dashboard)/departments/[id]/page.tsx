import { notFound } from "next/navigation";
import DepartmentForm from "@/components/admin/DepartmentForm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EditDepartmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const department = await prisma.department.findUnique({
    where: { id: Number(id) },
  });
  if (!department) notFound();

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-ink sm:text-3xl">
        Modifier le département
      </h1>
      <p className="mt-1 text-sm text-muted">{department.nameFr}</p>
      <div className="mt-8">
        <DepartmentForm department={department} />
      </div>
    </div>
  );
}
