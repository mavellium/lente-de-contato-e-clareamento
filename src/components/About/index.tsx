'use client'
import Image from "next/image";

export default function About() {
  return (
  <section className="py-16 px-4 sm:px-8 lg:px-10 bg-[#011331]">
    <div className="mx-auto relative max-w-[1520px]">

      {/* SUBTÍTULO */}
      <p className="mb-2 text-center font-bold text-[#0B85FF]
          text-[14px] sm:text-[18px] md:text-[22px] px-5">
        Instituto do Sorriso
      </p>

      {/* TÍTULO */}
      <h1 className="mb-10 text-center font-bold text-[#C5D6EF]
          text-[24px] sm:text-[32px] md:text-[45px] leading-tight px-5">
        Transformando vidas através de sorrisos perfeitos
      </h1>

      {/* IMAGEM */}
      <div className="rounded-2xl overflow-hidden flex justify-center">
        <Image
          src="/15anos-image.png"
          alt="Lente Dental"
          width={1376}
          height={774}
          className="w-full h-auto max-w-[1500px] object-contain"
        />
      </div>

      {/* TEXTO FINAL */}
      <div className="mt-14 text-[#BFD1EA] text-center font-bold
          text-[14px] sm:text-[12px] md:text-[15px] lg:text-[20px] flex flex-col gap-3 px-5">

        <span className="flex flex-col sm:flex-row gap-1 sm:gap-2 justify-center">
          Tecnologia de ponta,
          <span className="font-normal">Equipamentos modernos e técnicas minimamente invasivas.</span>
        </span>

        <span className="flex flex-col sm:flex-row gap-1 sm:gap-2 justify-center">
          Atendimento Humanizado,
          <span className="font-normal">Cuidado personalizado desde a primeira consulta.</span>
        </span>

        <span className="flex flex-col sm:flex-row gap-1 sm:gap-2 justify-center">
          Garantia Total,
          <span className="font-normal">Acompanhamento completo e garantia de satisfação.</span>
        </span>

      </div>

    </div>
  </section>
  );
}