"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react";
import gsap from "gsap";

const Details = () => {
    const [activeFeature, setActiveFeature] = useState(-1);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
    const titlesRef = useRef<(HTMLHeadingElement | null)[]>([]);
    const descriptionsRef = useRef<(HTMLDivElement | null)[]>([]);
    const sectionRef = useRef<HTMLDivElement>(null);
    const buttonsContainerRef = useRef<HTMLDivElement>(null);
    const navigationButtonsRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const mobileTextContainerRef = useRef<HTMLDivElement>(null);

    const features = [
        {
            id: 1,
            title: "Lente de Contato",
            description: `Anúncios no Meta Ads (Facebook, Instagram e WhatsApp), Google Ads, LinkedIn Ads, TikTok Ads, Kwai Ads e Native Advertising.

      Desenvolvemos campanhas de mídia paga nas principais plataformas do mercado, como Google, Meta, TikTok, Kwai e muito mais, sempre focadas em gerar resultados reais para o seu negócio.`,
            image: "/explore-bg.png"
        },
        {
            id: 2,
            title: "Formato",
            description: `Criamos conteúdos alinhados às estratégias, capazes de atrair os clientes certos para o seu negócio e aumentar as vendos.

                      Produzimos textos, storytelling, vídeos curtos, infográficos, artes e outros formatos de conteúdo.`,
            image: "/explore-bg.png",
        },
        {
            id: 3,
            title: "Tamanho",
            description: "Criamos a página ideal para o seu objetivo de negócio, de acordo com sua identidade visual e público-alvo.",
            image: "/explore-bg.png",
        },
        {
            id: 4,
            title: "Espaços indesejados",
            description: `Automatizamos o atendimento da sua empresa com chatbots inteligentes para WhatsApp, Instagram, site e outras redes sociais.

Criamos soluções personalizadas com IA para responder mensagens, captar leads e integrar seus canais de comunicação, economizando tempo e aumentando resultados.`,
            image: "/explore-bg.png",
        },
        {
            id: 5,
            title: "Fraturas",
            description: `Integramos o CRM aos canais de atendimento e automação, garantindo uma experiência de relacionamento centralizada, com dados unificados e gestão inteligente dos contatos.`,
            image: "/explore-bg.png",
        },
        {
            id: 6,
            title: "Desgastes",
            description: `Fazemos sua marca aparecer no topo das buscas do Google e nas respostas das IAs generativas.

Usamos estratégias de SEO (Search Engine Optimization) e GEO (Generative Engine Optimization) para aumentar sua visibilidade tanto nos mecanismos de busca tradicionais quanto nas novas plataformas de Inteligência Artificial, como ChatGPT, Gemini, Copilot e Perplexity.`,
            image: "/explore-bg.png",
        },
        {
            id: 7,
            title: "Cor",
            description: `Mapeamos e otimizamos seus processos de venda para aumentar a produtividade e reduzir gargalos.

Aplicamos metodologias de BPM (Business Process Management) para redesenhar fluxos, integrar equipes e implementar rotinas eficientes.

Treinamos sua equipe para operar os novos processos com segurança e foco em resultados.`,
            image: "/explore-bg.png",
        }
    ];

    // Efeito para marcar que o componente está montado
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Funções para mostrar e esconder botões de navegação
    const showNavigationButtons = () => {
        if (navigationButtonsRef.current && isMounted) {
            gsap.to(navigationButtonsRef.current, {
                opacity: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    };

    const hideNavigationButtons = () => {
        if (navigationButtonsRef.current && isMounted) {
            gsap.to(navigationButtonsRef.current, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    };

    // Funções para mostrar e esconder botão de fechar
    const showCloseButton = () => {
        if (closeButtonRef.current && isMounted) {
            gsap.to(closeButtonRef.current, {
                opacity: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    };

    const hideCloseButton = () => {
        if (closeButtonRef.current && isMounted) {
            gsap.to(closeButtonRef.current, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    };

    // Animação de entrada sequencial
    useEffect(() => {
        if (!isMounted || !buttonsContainerRef.current) return;

        const buttons = buttonsContainerRef.current.querySelectorAll('.feature-button');
        
        // Animação simples sem ScrollTrigger para evitar problemas
        gsap.fromTo(buttons,
            {
                opacity: 0,
                scale: 0.8,
                y: 20
            },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "back.out(1.5)",
                delay: 0.2
            }
        );

        // Configurar estado inicial dos botões de navegação e fechar
        if (navigationButtonsRef.current) {
            gsap.set(navigationButtonsRef.current, {
                opacity: 0
            });
        }
        if (closeButtonRef.current) {
            gsap.set(closeButtonRef.current, {
                opacity: 0
            });
        }
    }, [isMounted]);

    // Função para animação do texto no mobile
    const animateMobileTextTransition = (newIndex: number) => {
        if (!mobileTextContainerRef.current || !isMounted) return;

        const tl = gsap.timeline({
            onComplete: () => {
                setActiveFeature(newIndex);
                // Animação de entrada
                gsap.fromTo(mobileTextContainerRef.current,
                    {
                        opacity: 0,
                        y: 20
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                        ease: "power2.out",
                        onComplete: () => {
                            setIsTransitioning(false);
                        }
                    }
                );
            }
        });

        // Animação de saída
        tl.to(mobileTextContainerRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.3,
            ease: "power2.in"
        });
    };

    // Função para mobile
    const handleMobileNavigation = (direction: 'previous' | 'next') => {
        if (isTransitioning || !isMounted) return;

        setIsTransitioning(true);

        let newIndex;
        if (direction === 'next') {
            newIndex = activeFeature === -1 ? 0 : (activeFeature + 1) % features.length;
        } else {
            newIndex = activeFeature === -1 ? features.length - 1 : (activeFeature - 1 + features.length) % features.length;
        }

        animateMobileTextTransition(newIndex);
    };

    const resetButtonToInactive = (index: number) => {
        if (buttonsRef.current[index] && isMounted) {
            gsap.to(buttonsRef.current[index], {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        }

        if (titlesRef.current[index] && isMounted) {
            gsap.to(titlesRef.current[index], {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        }

        if (descriptionsRef.current[index] && isMounted) {
            gsap.to(descriptionsRef.current[index], {
                opacity: 0,
                y: -10,
                duration: 0.2,
                ease: "power2.in"
            });
        }
    };

    const handleFeatureChange = (index: number) => {
        if (isTransitioning || !isMounted) return;

        // Se já está ativo, não faz nada
        if (index === activeFeature) {
            return;
        }

        // Se clicou em um botão diferente
        setIsTransitioning(true);

        const tl = gsap.timeline({
            onComplete: () => {
                setActiveFeature(index);
                setIsTransitioning(false);
                // Mostrar botões de navegação e fechar quando um botão estiver ativo
                showNavigationButtons();
                showCloseButton();
            }
        });

        // Fechar botão ativo atual se houver
        if (activeFeature !== -1) {
            resetButtonToInactive(activeFeature);
        }

        // Abrir novo botão
        if (buttonsRef.current[index]) {
            tl.to(buttonsRef.current[index], {
                scale: 1.05,
                duration: 0.3,
                ease: "back.out(1.7)"
            }, 0.2);

            if (descriptionsRef.current[index]) {
                tl.to(descriptionsRef.current[index], {
                    opacity: 1,
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                }, 0.3);
            }
        }
    };

    // ADICIONANDO AS FUNÇÕES FALTANTES
    const handlePrevious = () => {
        if (!isMounted || isTransitioning) return;
        
        const newIndex =
            activeFeature === -1
                ? features.length - 1
                : activeFeature > 0
                    ? activeFeature - 1
                    : features.length - 1;

        handleFeatureChange(newIndex);
    };

    const handleNext = () => {
        if (!isMounted || isTransitioning) return;
        
        const newIndex =
            activeFeature === -1
                ? 0
                : activeFeature < features.length - 1
                    ? activeFeature + 1
                    : 0;

        handleFeatureChange(newIndex);
    };

    const handleCloseFeature = () => {
        if (activeFeature === -1 || isTransitioning || !isMounted) return;

        setIsTransitioning(true);
        resetButtonToInactive(activeFeature);

        const tl = gsap.timeline({
            onComplete: () => {
                setActiveFeature(-1);
                setIsTransitioning(false);
                // Esconder botões de navegação e fechar quando fechar o botão ativo
                hideNavigationButtons();
                hideCloseButton();
            }
        });
    };

    // Inicialização
    useEffect(() => {
        if (!isMounted) return;
        
        buttonsRef.current.forEach((button, index) => {
            if (button) {
                gsap.set(button, { scale: 1 });
            }
            if (descriptionsRef.current[index]) {
                gsap.set(descriptionsRef.current[index], {
                    opacity: activeFeature === index ? 1 : 0,
                    y: activeFeature === index ? 0 : 10
                });
            }
        });
    }, [isMounted, activeFeature]);

    return (
        <section ref={sectionRef} className="common-padding bg-[#000919] py-20 px-6 md:px-12 lg:px-10">
            <div className="mx-auto relative max-w-[1520px]">
                <h1 className="sm:text-[32px] text-[24px] text-[#B9C2D8] font-bold text-[#B9C2D8] mb-10">
                    Veja os detalhes da sua lente de contato
                </h1>

                {/* DESKTOP VERSION */}
                <div className="hidden lg:flex flex-row gap-8 items-center bg-black rounded-4xl p-10 py-25 relative overflow-hidden">
                    {/* Background Image Container */}
                    <div className="absolute inset-0 w-full h-full">
                        {isMounted ? (
                            <Image
                                src={activeFeature >= 0 ? features[activeFeature].image : "/details-bg.png"}
                                alt="Feature background"
                                fill
                                className="object-cover object-center"
                                priority
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-800 animate-pulse" />
                        )}
                        {/* Overlay escuro para melhor legibilidade do texto */}
                        <div className="absolute inset-0 bg-black/50"></div>
                    </div>

                    {/* Conteúdo sobreposto à imagem de fundo */}
                    <div className="relative z-10 flex flex-row gap-8 items-center w-full">
                        <div className="flex items-center gap-4 w-1/4">
                            <div ref={navigationButtonsRef} className="flex flex-col gap-4 mt-2">
                                <Button
                                    onClick={handlePrevious}
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-[#00122F] hover:bg-[#00122F]/80 transition-colors"
                                    disabled={isTransitioning}
                                >
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                    </svg>
                                </Button>

                                <Button
                                    onClick={handleNext}
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-[#00122F] hover:bg-[#00122F]/80 transition-colors"
                                    disabled={isTransitioning}
                                >
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </Button>
                            </div>

                            <div className="flex-1">
                                <div className="sticky top-24">
                                    <div ref={buttonsContainerRef} className="flex-col space-y-4">
                                        {features.map((feature, index) => (
                                            <button
                                                key={feature.id}
                                                ref={(el) => { (buttonsRef.current[index] = el) }}
                                                onClick={() => handleFeatureChange(index)}
                                                className={`feature-button text-left flex flex-col transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${activeFeature === index
                                                        ? "bg-[#00122F] rounded-4xl p-6"
                                                        : "bg-[#00122F] hover:bg-[#00122F]/70 rounded-4xl px-5 py-4"
                                                    }`}
                                                style={{
                                                    cursor: isTransitioning ? "not-allowed" : "pointer",
                                                    opacity: isMounted ? 1 : 0,
                                                    transform: isMounted ? 'scale(1)' : 'scale(0.8)'
                                                }}
                                                disabled={isTransitioning}
                                            >
                                                <h3
                                                    ref={(el) => { (titlesRef.current[index] = el) }}
                                                    className="font-semibold lg:text-md md:text-sm text-white flex items-center justify-start text-start"
                                                >
                                                    {activeFeature !== index && (
                                                        <Icon icon="solar:add-circle-linear" className="w-5 h-5 mr-2 flex-shrink-0" />
                                                    )}
                                                    {feature.title}
                                                </h3>

                                                <div
                                                    ref={(el) => { (descriptionsRef.current[index] = el) }}
                                                    className={`transition-all duration-400 overflow-hidden ${activeFeature === index
                                                            ? "opacity-100 max-h-[200px] max-w-[300px] mt-4"
                                                            : "opacity-0 max-h-0 max-w-0"
                                                        }`}
                                                >
                                                    <p className="text-sm text-white mb-3 whitespace-pre-line">{feature.description}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                             
                        </div>
                       
                    </div>
                    <Button
                            ref={closeButtonRef}
                            onClick={handleCloseFeature}
                            className="absolute top-2 right-2 z-20 w-8 h-8 m-10 flex items-center justify-center rounded-full bg-[#00122F] hover:bg-[#00122F]/70 transition-colors"
                            style={{ opacity: 0 }}
                            disabled={isTransitioning}
                        >
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </Button>
                </div>

                {/* MOBILE/TABLET VERSION */}
                <div className="lg:hidden bg-black rounded-4xl p-6 relative overflow-hidden">
                    {/* Background Image para Mobile */}
                    <div className="absolute inset-0 w-full h-full">
                        {isMounted ? (
                            <Image
                                src={activeFeature >= 0 ? features[activeFeature].image : "/explore-bg.png"}
                                alt={activeFeature >= 0 ? features[activeFeature].title : "Feature background"}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-800 animate-pulse" />
                        )}
                        {/* Overlay escuro para melhor legibilidade do texto */}
                        <div className="absolute inset-0 bg-black/60"></div>
                    </div>

                    {/* Conteúdo sobreposto */}
                    <div className="relative z-10">
                        <div className="rounded-3xl overflow-hidden mb-6">
                            <div className="aspect-video relative bg-transparent">
                                {/* Container vazio mantido para manter o layout */}
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-4 mb-4">
                            <Button
                                onClick={() => handleMobileNavigation('previous')}
                                disabled={isTransitioning || !isMounted}
                                className="w-12 h-12 flex items-center justify-center rounded-full bg-[#00122F] hover:bg-[#00122F]/80 transition-colors flex-shrink-0 disabled:opacity-50 z-20"
                            >
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </Button>

                            <div
                                ref={mobileTextContainerRef}
                                className="flex-1 text-center min-h-[80px] flex items-center justify-center px-2"
                                style={{ opacity: isMounted ? 1 : 0 }}
                            >
                                {activeFeature >= 0 ? (
                                    <div className="w-full bg-black/40 backdrop-blur-sm rounded-2xl p-4">
                                        <h3 className="font-semibold text-lg text-white mb-2">
                                            {features[activeFeature].title}
                                        </h3>
                                        <p className="text-sm text-gray-300 mb-2">
                                            {features[activeFeature].description}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-4">
                                        <p className="text-gray-200 font-medium">Toque nas setas para explorar</p>
                                    </div>
                                )}
                            </div>

                            <Button
                                onClick={() => handleMobileNavigation('next')}
                                disabled={isTransitioning || !isMounted}
                                className="w-12 h-12 flex items-center justify-center rounded-full bg-[#00122F] hover:bg-[#00122F]/80 transition-colors flex-shrink-0 disabled:opacity-50 z-20"
                            >
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Button>
                        </div>

                        {isMounted && (
                            <div className="flex justify-center mt-4 gap-2 relative z-20">
                                {features.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            if (!isTransitioning) {
                                                setIsTransitioning(true);
                                                animateMobileTextTransition(index);
                                            }
                                        }}
                                        disabled={isTransitioning}
                                        className={`w-3 h-3 rounded-full transition-colors ${index === activeFeature ? "bg-white" : "bg-gray-600"
                                            } ${isTransitioning ? "opacity-50" : "opacity-100"}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Details;