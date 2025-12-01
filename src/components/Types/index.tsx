"use client";

import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Icon } from '@iconify/react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { ChevronRight } from "lucide-react";
import "swiper/css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Importar tipos do Swiper
import { Swiper as SwiperType } from 'swiper';

// Registrar o plugin ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Types() {
  const cards = [
    {
      id: 1,
      image: "/lente-dental-bg.png",
      link: "/Servicos/Institucional",
      title: "Desenvolvemos estratégias para fortalecer sua presença digital, gerar confiança e posicionar você como referência na sua área.",
      description:
        "Conteúdo Personalizado + SEO = Mais Pacientes",
    },
    {
      id: 2,
      image: "/lente-dental-bg.png",
      link: "/Servicos/LandingPage",
      title: "Desenvolvemos estratégias para fortalecer sua presença digital, gerar confiança e posicionar você como referência na sua área.",
      description:
        "Conteúdo Personalizado + SEO = Mais Pacientes",
    },
    {
      id: 3,
      image: "/lente-dental-bg.png",
      link: "/Servicos/Ecommerce",
      title: "Desenvolvemos estratégias para fortalecer sua presença digital, gerar confiança e posicionar você como referência na sua área.",
      description:
        "Conteúdo Personalizado + SEO = Mais Pacientes",
    },
    {
      id: 4,
      image: "/lente-dental-bg.png",
      link: "/Servicos/Aplicativo",
      title: "Desenvolvemos estratégias para fortalecer sua presença digital, gerar confiança e posicionar você como referência na sua área.",
      description:
        "Conteúdo Personalizado + SEO = Mais Pacientes",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  
  // CORREÇÃO: Substituir any pelo tipo específico SwiperType
  const swiperRef = useRef<SwiperType | null>(null);
  
  const [isClient, setIsClient] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const desktopCardsRef = useRef<HTMLDivElement>(null);

  // Verifique se está no cliente
  useEffect(() => {
    setIsClient(true);
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth !== null && windowWidth < 768;

  useEffect(() => {
    // autoplay apenas no desktop
    if (isMobile || !isPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cards.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isMobile, isPlaying, cards.length]);

  // controla o autoplay do Swiper no mobile
  useEffect(() => {
    if (!swiperRef.current) return;

    if (isMobile) {
      if (isPlaying) {
        swiperRef.current.autoplay?.start();
      } else {
        swiperRef.current.autoplay?.stop();
      }
    }
  }, [isMobile, isPlaying]);

  const goToSlide = (index: number) => {
    if (isMobile) {
      setActiveIndex(index);
      // CORREÇÃO: Usar swiperRef.current diretamente
      if (swiperRef.current) {
        swiperRef.current.slideTo(index);
      }
    } else {
      setActiveIndex(index);
    }
  };

  // Animação GSAP para os cards desktop
  useGSAP(() => {
    if (!desktopCardsRef.current || isMobile) return;

    const cards = desktopCardsRef.current.querySelectorAll('.desktop-card');
    
    // Configurar estado inicial
    gsap.set(cards, {
      opacity: 0,
      y: 50,
      scale: 0.9
    });

    // Animação com ScrollTrigger
    const animation = gsap.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        markers: false,
      }
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, { dependencies: [isMobile], scope: sectionRef });

  // Animação GSAP para os cards mobile
  useGSAP(() => {
    if (!isMobile) return;

    const cards = document.querySelectorAll('.mobile-card');
    
    // Configurar estado inicial
    gsap.set(cards, {
      opacity: 0,
      y: 30
    });

    // Animação com ScrollTrigger
    const animation = gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        markers: false,
      }
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, { dependencies: [isMobile], scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="py-20 w-full flex flex-col justify-center items-center bg-[#011331] px-4"
      id="setors"
    >
      <div className="container flex flex-col justify-center">
        <h2 className="font-heading ml-5 md:ml-10 lg:ml-20 xl:ml-50 2xl:ml-20 text-start text-2xl mb-5 sm:text-[32px] text-[24px] font-bold text-[#B9C2D8] mb-10">
          Por que escolher a <span className="text-[#0B85FF] font-bold">lente de contato dental?</span>
        </h2>

        {/* 🟢 MOBILE - Swiper */}
        {isMobile && (
          <div className="w-full overflow-visible">
            <Swiper
              modules={[Autoplay]}
              // CORREÇÃO: Tipo correto para onSwiper
              onSwiper={(swiper: SwiperType) => (swiperRef.current = swiper)}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              centeredSlides={true}
              slidesPerView={0.9}
              spaceBetween={16}
              onSlideChange={(swiper: SwiperType) => setActiveIndex(swiper.activeIndex)}
              className="w-full"
            >
              {cards.map((card, index) => (
                <SwiperSlide key={card.id} className="overflow-visible">
                  <motion.div
                    onClick={() => setActiveIndex(index)}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center mobile-card"
                  >
                    {/* 🔧 Card principal mobile ajustado */}
                    <div className="relative overflow-hidden rounded-2xl shadow-md cursor-pointer w-[92vw] max-w-[600px] mx-auto">
                      <Image
                        width={600}
                        height={360}
                        src={card.image}
                        className="object-cover object-center w-full h-[340px] sm:h-[360px] rounded-2xl" 
                        alt={`Imagem do card ${card.title}`}
                      />
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 rounded-2xl flex flex-col items-start p-4 w-[90%]"
                    >
                      <h2 className="text-white text-lg md:text-lg font-bold mb-3 leading-relaxed">
                        {card.title}
                      </h2>
                      <p className="text-white text-start mb-2">
                        {card.description}
                      </p>
                      <a
                        href={card.link}
                        className="flex justify-center items-center gap-1 text-[#0C8BD2] hover:text-[#0C8BD2]/50 transition-colors duration-200 font-medium"
                      >
                        Conheça nossas soluções <ChevronRight className="w-4 h-4 stroke-[2] transition-transform duration-200 group-hover:translate-x-1" />
                      </a>
                    </motion.div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* 🟣 DESKTOP */}
        {isClient && !isMobile && (
          <>
            <div ref={desktopCardsRef} className="flex justify-center flex-wrap gap-6 md:gap-2 relative">
              {cards.map((card, index) => {
                const isActive = index === activeIndex;
                // Use valores padrão seguros enquanto windowWidth é 0
                const activeWidth = windowWidth < 1024 ? 260 : 420;
                const inactiveWidth =
                  windowWidth < 1024 ? 140 :
                    windowWidth < 1536 ? 160 :
                      320;

                return (
                  <motion.div
                    key={card.id}
                    layout
                    className="flex flex-col items-center relative desktop-card"
                    transition={{
                      duration: 0.4,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    style={{ minWidth: inactiveWidth }}
                  >
                    <motion.div
                      layout
                      onClick={() => setActiveIndex(index)}
                      animate={{
                        opacity: isActive ? 1 : 1,
                        width: isActive ? activeWidth : inactiveWidth,
                        scale: isActive ? 1 : 0.97,
                      }}
                      transition={{
                        duration: 0.4,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                      className="relative cursor-pointer overflow-hidden rounded-2xl shadow-md"
                    >
                      <Image
                        width={isActive ? activeWidth : inactiveWidth}
                        height={660}
                        src={card.image}
                        alt={card.description}
                        className="object-cover object-top rounded-2xl w-full h-[660px]"
                      />
                      <motion.div
                        layout
                        className={`absolute inset-0 flex justify-center items-center text-white ${isActive ? "bg-black/20" : "bg-black/50"
                          }`}
                        transition={{
                          duration: 0.4,
                          ease: [0.4, 0, 0.2, 1],
                        }}
                      />
                    </motion.div>

                    <AnimatePresence mode="sync">
                      {isActive && (
                        <motion.div
                          key={`desc-${card.id}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{
                            duration: 0.4,
                            ease: [0.4, 0, 0.2, 1],
                          }}
                          className="absolute top-full mt-4 rounded-2xl p-1 z-10 flex flex-col items-start text-left"
                          style={{
                            width: activeWidth,
                            maxWidth: 360
                          }}
                        >
                          <h2 className="text-white text-md md:text-lg font-bold mb-3 leading-relaxed">
                            {card.title}
                          </h2>
                          <p className="text-white text-sm md:text-md mb-3 leading-relaxed">
                            {card.description}
                          </p>
                          <a
                            href={card.link}
                            className="text-[#0C8BD2] none hover:text-[#0C8BD2]/50 transition-colors duration-200 flex items-center gap-1 font-medium"
                          >
                            Conheça nossas soluções <ChevronRight className="w-4 h-4 stroke-[2] transition-transform duration-200 group-hover:translate-x-1" />
                          </a>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}

        {/* 🔘 CONTROLES PADRONIZADOS - Dots + Play/Pause */}
        <div className="flex items-center justify-center  mt-20 md:mt-80 lg:mt-80 gap-4">
          {/* Dots no estilo Nubank */}
          <div className="flex gap-2 bg-[#000917] h-10 w-auto p-5 rounded-full justify-center items-center">
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1 rounded-full transition-all duration-300 ${index === activeIndex
                    ? "bg-[#4E6FA6] w-8 h-2"  // Ativo - preto e largura maior
                    : "bg-[#233D67] w-2 h-2 hover:bg-[#4E6FA6]"  // Inativos
                  }`}
              ></button>
            ))}
          </div>

          {/* Botão Play/Pause padronizado */}
          <div>
            <Button
              onClick={() => setIsPlaying((prev) => !prev)}
              className="flex items-center bg-[#000917] backdrop-blur-md text-black hover:bg-[#000917]/50 rounded-full px-4 py-4 h-10 shadow-sm"
            >
              {isPlaying ? (
                <Icon icon="solar:pause-bold" className="w-5 h-5 text-[#4E6FA6]" />
              ) : (
                <Icon icon="solar:play-bold" className="w-5 h-5 text-[#4E6FA6]" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}