"use client";

const benefits = [
  {
    title: "Dentes Amarelados?",
    description:
      "O Clareamento devolve o brilho e remove manchas de café/alimentos sem danificar o esmalte.",
  },
  {
    title: "Formato ou Tamanho Irregular?",
    description:
      "As Lentes de Contato corrigem desgastes, dentes pequenos ou formatos indesejados.",
  },
  {
    title: "Espaços (Diastemas)?",
    description:
      "Fechamos espaços entre os dentes para um sorriso alinhado e harmônico.",
  },
];

const WhiteningBenefits = () => {
  return (
    <section className="py-16 sm:py-20 bg-transparent">
      <div className="mx-auto max-w-[1400px] px-4">

        {/* TÍTULO */}
        <div className="px-2 sm:px-10 mb-10 sm:mb-16 w-full">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#B9C2D8] leading-tight">
            Para quem é o Clareamento
          </h1>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group p-6 sm:p-8 bg-[#02348D] font-medium rounded-3xl
              shadow-[0_4px_20px_-4px_rgba(52,66,86,0.1)]
              hover:shadow-[0_8px_30px_-8px_rgba(52,66,86,0.15)]
              transition-all duration-300 hover:scale-[1.03]
              border border-[rgba(52,66,86,0.25)]"
            >
              {/* TÍTULO DO CARD */}
              <h2 className="text-2xl sm:text-3xl text-[#B9C2D8] mb-3 leading-tight">
                {benefit.title}
              </h2>

              {/* DESCRIÇÃO */}
              <p className="text-[#B9C2D8] text-lg sm:text-xl leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default WhiteningBenefits;
