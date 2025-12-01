"use client";
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"; 
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { src: "/hero-dental.avif", alt: "Um sorriso transformado com implantes dentários, com foco na naturalidade." },
    { src: "/hero-dental-2.avif", alt: "Vista detalhada de um implante de titânio, simbolizando a tecnologia segura." },
    { src: "/hero-dental-3.avif", alt: "Paciente sorrindo após o procedimento, celebrando a recuperação da autoestima." },
  ];

  const handleWhatsAppClick = (message: string) => {
    window.open(
      `https://wa.me/5514996847415?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // EFEITO PARA CARROSSEL AUTOMÁTICO
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Muda de slide a cada 5 segundos

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(interval);
  }, [slides.length]);


  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-[#010A1B] via-[#06204D] to-[#041737] overflow-hidden py-16">
      {/* Decoração de Fundo */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#010A1B]/95 to-transparent z-10" />
      <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-[#06204D]/40 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-[#041737]/30 rounded-full blur-3xl opacity-50" />

      <div className="container mx-auto px-4 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Conteúdo Principal */}
          <div className="space-y-8">
            <Badge className="bg-[#031A38] text-white border border-[#0D72F2] hover:bg-[#0D72F2]/70 transition-all duration-300">
              ✨ Mais de 500 sorrisos transformados
            </Badge>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#B9C3D8] max-w-xl">
                Recupere sua{" "}
                <span className="text-[#0073E6] font-bold">autoestima</span>{" "}
                com Implantes Dentários
              </h1>

              <p className="text-xl text-[#BFD1EA] leading-relaxed max-w-lg">
                Agende sua avaliação e conheça o tratamento ideal para você.
                Transforme seu sorriso com tecnologia de ponta e cuidado
                humanizado.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() =>
                  handleWhatsAppClick(
                    "Olá! Gostaria de agendar uma avaliação e saber mais sobre os tratamentos de implante dentário."
                  )
                }
                className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105 rounded-xl"
              >
                🦷 Quero Agendar Minha Avaliação
              </Button>
            </div>
          </div>

          {/* Carrossel de Imagens */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border-3 border-[#003BA1]">
              {/* Substituído Image por img padrão para corrigir o erro de compilação */}
              <Image
                src={slides[currentSlide].src}
                alt={slides[currentSlide].alt}
                width={800}
                height={600}
                // Adicionando a classe object-cover para garantir que a imagem cubra o espaço de forma responsiva
                className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover border-3 border-[#003BA1] transition-all duration-500"
              />
            </div>

            {/* Controles do Carrossel (Acessibilidade e Responsividade) */}
            <button
              onClick={prevSlide}
              aria-label="Slide anterior" // Corrigido acessibilidade
              // Ajuste de responsividade: no mobile, fica ligeiramente para dentro (left-2), evitando corte.
              className="absolute top-1/2 left-2 lg:left-0 xl:-left-6 -translate-y-1/2 bg-[#003BA1]/70 text-white p-3 rounded-full hover:bg-[#003BA1]/90 transition shadow-lg w-12 h-12" 
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Próximo slide" // Corrigido acessibilidade
              // Ajuste de responsividade: no mobile, fica ligeiramente para dentro (right-2), evitando corte.
              className="absolute top-1/2 right-2 lg:right-0 xl:-right-6 -translate-y-1/2 bg-[#003BA1]/70 text-white p-3 rounded-full hover:bg-[#003BA1]/90 transition shadow-lg w-12 h-12" 
            >
              <ChevronRight size={24} />
            </button>

            {/* Indicadores de Ponto (Dots) - Acessibilidade (Área de Toque) */}
            <div className="flex justify-center mt-4 space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Ir para o slide ${index + 1}`} // Corrigido acessibilidade
                  // w-10 h-10 garante o tamanho mínimo de toque de 44x44px.
                  className={`relative w-10 h-10 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full`} 
                >
                    <div className={`w-3 h-3 rounded-full transition-all ${
                        index === currentSlide
                          ? "bg-[#0073E6] scale-110"
                          : "bg-[#B9C3D8]/40 hover:bg-[#B9C3D8]/70"
                      }`}/>
                </button>
              ))}
            </div>

            {/* Elementos Flutuantes */}
            <div className="absolute -top-4 -right-4 bg-[#013AA0] p-4 rounded-xl shadow-md">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-white">Avaliação</span>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-[#00102B] p-4 rounded-xl shadow-md text-center">
              <div className="font-bold text-white text-lg">100%</div>
              <div className="text-xs text-white">Satisfação</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;