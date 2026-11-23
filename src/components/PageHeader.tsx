import Image from "next/image";
import { images } from "@/lib/images";

export default function PageHeader({
  title,
  subtitle,
  image,
}: {
  title: string;
  subtitle?: string;
  image?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-[#181F4E]">
      <Image
        src={image ?? images.pageHeader}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[#181F4E]/70" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-white/85">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
