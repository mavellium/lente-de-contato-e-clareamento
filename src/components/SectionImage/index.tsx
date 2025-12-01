'use client'
import Image from "next/image";

export default function SectionImage() {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-10 bg-[#011331]">
      <div className="mx-auto relative max-w-[1520px]">
        <h1 className="mb-5 sm:text-[32px] text-[24px] text-[#B9C2D8] w-full px-5 flex justify-start font-bold text-wrap lg:text-nowrap">
          A tecnologia a favor da sua beleza.
        </h1>
        <div className="rounded-2xl">
          <Image
            src="/lente-dental-bg.png"
            alt="Lente Dental"
            width={180}
            height={45}
            className="w-full max-h-[700px]"

          />
        </div>
      </div>
    </section>
  );
}