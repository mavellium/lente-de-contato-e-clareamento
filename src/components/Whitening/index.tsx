"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import WhiteningDetails from "../WhiteningDetails";
import WhiteningBenefits from "../WhiteningBenefits";



export function Whitening() {
  useGSAP(() => {
    // Configurar a animação com ScrollTrigger
    gsap.to("#card", {
      opacity: 1,
      y: 0,
      duration: 2,
      stagger: 0.5,

      scrollTrigger: {
        trigger: "#roi", // Elemento que dispara a animação
        start: "top 70%",       // Quando o topo da seção chegar a 70% da viewport
        end: "bottom 20%",      // Quando o fundo da seção chegar a 20% da viewport
        toggleActions: "play none none none", // Ação: play quando entrar, nada quando sair
        markers: false, // Defina como true para ver marcadores (útil para debug)
      },
    });
  }, []);
  return (
    <>
    <section className="flex flex-col w-full justify-center items-center bg-transparent py-10 md:py-20 px-4 sm:px-6 lg:px-8" id="whitening">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-6 md:gap-8 lg:gap-10 w-full max-w-6xl">
        
        {/* Primeiro Card */}
        <div id="card" className="bg-[#000919] w-full max-w-[400px] lg:max-w-none lg:w-1/2 h-auto md:min-h-[500px] lg:min-h-[850px] flex flex-col justify-between items-center rounded-3xl p-6 sm:px-8 sm:pt-8 pb-0 opacity-0 translate-y-20">
          <div className="w-full">
            <h2 className="text-[#0073E6] font-bold text-lg sm:text-xl md:text-xl mb-4 sm:mb-6">
              Diga adeus à vergonha de sorrir.
              <span className="block text-[#B9C3D8] text-base sm:text-lg md:text-xl font-bold mt-2">
                Você não precisa mais esconder o sorriso nas fotos ou colocar a mão na boca ao rir.
              </span>
            </h2>
          </div>
          <div className="flex justify-center items-end w-full mt-4">
            <Image
              src="/celular.png"
              width={500}
              height={500}
              alt="Celular"
              className="w-110"
            />
          </div>
        </div>

        {/* Segundo Card */}
        <div id="card" className="bg-[#011638] w-full max-w-[400px] lg:max-w-none lg:w-1/2 h-auto md:min-h-[500px] lg:min-h-[850px] flex flex-col justify-between items-center rounded-3xl p-6 sm:px-8 sm:pt-8 opacity-0 translate-y-20">
          <div className="w-full">
            <h2 className="text-[#0073E6] font-bold text-lg sm:text-xl md:text-xl mb-4 sm:mb-6">
              Aumentar seu ROI e diminuir seu CAC.
              <span className="block text-[#B9C3D8] text-base sm:text-lg md:text-xl font-bold mt-2">
                Protocolo de alta potência realizado sob supervisão de nossos especialistas. 
                Garante dentes significativamente mais claros imediatamente e é ideal para quem 
                busca resultados rápidos e duradouros.
              </span>
            </h2>
          </div>
          <div className="flex justify-center w-full mt-4">
            <Image
              src="/clareamento-image.png"
              width={500}
              height={500}
              alt="Celular"
              className="w-full"
            />
          </div>
        </div>

      </div>
    </section>
    <WhiteningDetails></WhiteningDetails>
    <WhiteningBenefits></WhiteningBenefits>
    </>
  );
}