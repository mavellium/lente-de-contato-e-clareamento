"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, MessageCircle } from "lucide-react";

const Contact = () => {
  const handleWhatsAppClick = (message: string) => {
    window.open(`https://wa.me/5514996847415?text=${encodeURIComponent(message)}`, '_blank');
  };

  
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-[#010A1B] via-[#06204D] to-[#041737]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#B9C3D8]">
            Entre em{" "}
            <span className="text-[#0077FF] font-bold">
              Contato Conosco
            </span>
          </h2>
          <p className="text-lg text-[#BFD1EA] max-w-2xl mx-auto">
            Estamos prontos para atendê-lo! Escolha a forma mais conveniente para entrar em contato.
          </p>
        </div>

        <div className="grid lg:grid-cols xl:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
          {/* WhatsApp */}
          <Card className="p-6 text-center border-[#22C55E] hover:border-[#22C55E] transition-all duration-300 hover:shadow-[0_10px_25px_-5px_rgba(178,212,247,0.2)] bg-[#000B1F] group">
            <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg
                width="32"
                height="32"
                viewBox="0 0 56 56"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                className="sm:w-9 sm:h-9 w-7 h-7"
              >
                <path d="M47.8392 8.14813C45.2589 5.55563 42.1858 3.50005 38.799 2.10116C35.4123 0.702273 31.7795 -0.0119368 28.1126 0.000150906C12.7477 0.000150906 0.225126 12.4601 0.225126 27.7481C0.225126 32.6481 1.5196 37.4081 3.9397 41.608L0 56L14.7739 52.136C18.8543 54.348 23.4412 55.524 28.1126 55.524C43.4774 55.524 56 43.064 56 27.7761C56 20.3561 53.1015 13.3841 47.8392 8.14813ZM28.1126 50.82C23.9477 50.82 19.8673 49.7 16.2935 47.6L15.4492 47.096L6.66935 49.392L9.00502 40.88L8.44221 40.012C6.12777 36.3358 4.89909 32.086 4.89648 27.7481C4.89648 15.0361 15.3085 4.67614 28.0844 4.67614C34.2754 4.67614 40.1005 7.08413 44.4623 11.4521C46.6224 13.5909 48.3342 16.1352 49.4984 18.9374C50.6626 21.7396 51.256 24.7439 51.2442 27.7761C51.3005 40.488 40.8884 50.82 28.1126 50.82ZM40.8322 33.5721C40.1286 33.2361 36.6955 31.5561 36.0764 31.3041C35.4291 31.0801 34.9789 30.9681 34.5005 31.6401C34.0221 32.3401 32.6995 33.9081 32.3055 34.3561C31.9116 34.8321 31.4894 34.8881 30.7859 34.5241C30.0824 34.1881 27.8312 33.4321 25.1859 31.0801C23.1035 29.2321 21.7246 26.9641 21.3025 26.2641C20.9085 25.5641 21.2462 25.2001 21.6121 24.8361C21.9216 24.5281 22.3156 24.0241 22.6533 23.6321C22.991 23.2401 23.1317 22.9321 23.3568 22.4841C23.5819 22.0081 23.4693 21.6161 23.3005 21.2801C23.1317 20.9441 21.7246 17.5281 21.1618 16.1281C20.599 14.7841 20.008 14.9521 19.5859 14.9241H18.2352C17.7568 14.9241 17.0251 15.0921 16.3779 15.7921C15.7588 16.4921 13.9578 18.1721 13.9578 21.5881C13.9578 25.0041 16.4623 28.3081 16.8 28.7561C17.1377 29.2321 21.7246 36.2321 28.7035 39.2281C30.3638 39.956 31.6583 40.376 32.6714 40.684C34.3317 41.216 35.8513 41.132 37.0613 40.964C38.4121 40.768 41.198 39.284 41.7608 37.6601C42.3518 36.0361 42.3518 34.6641 42.1548 34.3561C41.9578 34.0481 41.5357 33.9081 40.8322 33.5721Z" />
              </svg>
            </div>

            <h3 className="text-lg font-bold mb-2 text-[#B9C3D8]">WhatsApp</h3>
            <p className="text-sm text-[#BFD1EA] mb-4">
              Converse diretamente com nossa equipe
            </p>

            <div className="space-y-1 mb-4">
              <p className="text-sm text-green-600 font-medium">📱 (14) 99684-7415</p>
              <p className="text-xs text-[#BFD1EA]">Resposta rápida</p>
            </div>

            <Button
              onClick={() =>
                handleWhatsAppClick(
                  "Olá! Gostaria de agendar uma avaliação e saber mais sobre Clareamento e Lente de Contato Dental"
                )
              }
              variant="outline"
              className="w-full border-green-500 text-green-500 hover:bg-green-500 hover:text-white h-10 flex items-center justify-center gap-2 group transition-all duration-300"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 56 56"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className="sm:w-9 sm:h-9 w-7 h-7 text-green-500 group-hover:text-white transition-colors duration-300"
              >
                <path d="M47.8392 8.14813C45.2589 5.55563 42.1858 3.50005 38.799 2.10116C35.4123 0.702273 31.7795 -0.0119368 28.1126 0.000150906C12.7477 0.000150906 0.225126 12.4601 0.225126 27.7481C0.225126 32.6481 1.5196 37.4081 3.9397 41.608L0 56L14.7739 52.136C18.8543 54.348 23.4412 55.524 28.1126 55.524C43.4774 55.524 56 43.064 56 27.7761C56 20.3561 53.1015 13.3841 47.8392 8.14813ZM28.1126 50.82C23.9477 50.82 19.8673 49.7 16.2935 47.6L15.4492 47.096L6.66935 49.392L9.00502 40.88L8.44221 40.012C6.12777 36.3358 4.89909 32.086 4.89648 27.7481C4.89648 15.0361 15.3085 4.67614 28.0844 4.67614C34.2754 4.67614 40.1005 7.08413 44.4623 11.4521C46.6224 13.5909 48.3342 16.1352 49.4984 18.9374C50.6626 21.7396 51.256 24.7439 51.2442 27.7761C51.3005 40.488 40.8884 50.82 28.1126 50.82ZM40.8322 33.5721C40.1286 33.2361 36.6955 31.5561 36.0764 31.3041C35.4291 31.0801 34.9789 30.9681 34.5005 31.6401C34.0221 32.3401 32.6995 33.9081 32.3055 34.3561C31.9116 34.8321 31.4894 34.8881 30.7859 34.5241C30.0824 34.1881 27.8312 33.4321 25.1859 31.0801C23.1035 29.2321 21.7246 26.9641 21.3025 26.2641C20.9085 25.5641 21.2462 25.2001 21.6121 24.8361C21.9216 24.5281 22.3156 24.0241 22.6533 23.6321C22.991 23.2401 23.1317 22.9321 23.3568 22.4841C23.5819 22.0081 23.4693 21.6161 23.3005 21.2801C23.1317 20.9441 21.7246 17.5281 21.1618 16.1281C20.599 14.7841 20.008 14.9521 19.5859 14.9241H18.2352C17.7568 14.9241 17.0251 15.0921 16.3779 15.7921C15.7588 16.4921 13.9578 18.1721 13.9578 21.5881C13.9578 25.0041 16.4623 28.3081 16.8 28.7561C17.1377 29.2321 21.7246 36.2321 28.7035 39.2281C30.3638 39.956 31.6583 40.376 32.6714 40.684C34.3317 41.216 35.8513 41.132 37.0613 40.964C38.4121 40.768 41.198 39.284 41.7608 37.6601C42.3518 36.0361 42.3518 34.6641 42.1548 34.3561C41.9578 34.0481 41.5357 33.9081 40.8322 33.5721Z" />
              </svg>
              Enviar Mensagem
            </Button>
          </Card>

          {/* Localização */}
          <Card className="p-6 text-center border-[#0077FF] hover:border-[#0077FF] transition-all duration-300 hover:shadow-[0_10px_25px_-5px_rgba(178,212,247,0.2)] bg-[#012159] group">
            <div className="w-14 h-14 bg-[rgb(0,119,255)] rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <MapPin className="w-7 h-7 text-white" />
            </div>

            <h3 className="text-lg font-bold mb-2 text-[#B9C3D8]">Localização</h3>
            <p className="text-sm text-[#BFD1EA] mb-4">
              Clínica no centro de Garça
            </p>

            <div className="space-y-1 mb-4">
              <p className="text-sm font-medium text-[#B9C3D8]">R. Cel. Joaquim Piza, 664</p>
              <p className="text-xs text-[#BFD1EA]">Ferrarópolis, Garça - SP, 17402-084</p>
            </div>

            <Button
              onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=R.+Coronel+Joaquim+Piza+664,+Garça+SP', '_blank')}
              variant="outline"
              className="w-full border-[rgb(0,119,255)] text-[rgb(0,119,255)] bg-[#00102C] hover:bg-[rgb(0,119,255)] hover:text-white h-10"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Ver no Mapa
            </Button>
          </Card>

          {/* Horários */}
          <Card className="p-6 text-center border-[#0077FF] hover:border-[#0077FF] transition-all duration-300 hover:shadow-[0_10px_25px_-5px_rgba(178,212,247,0.2)] bg-[#02348D] group">
            <div className="w-14 h-14 bg-[rgb(0,119,255)] rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Clock className="w-7 h-7 text-white" />
            </div>

            <h3 className="text-lg font-bold mb-2 text-[#B9C3D8]">Horários</h3>
            <p className="text-sm text-[#BFD1EA] mb-4">
              Funcionamento da clínica
            </p>

            <div className="space-y-1 mb-4">
              <p className="text-xs text-[#BFD1EA]">Seg à Sex: 8h às 18h</p>
              <p className="text-xs text-[#BFD1EA]">Sábados: 8h às 12h</p>
            </div>

            <Button
              onClick={() => handleWhatsAppClick("Olá! Gostaria de agendar uma Consulta.")}
              variant="outline"
              className="w-full border-[rgb(0,119,255)] text-[rgb(0,119,255)] bg-[#00102C] hover:bg-[rgb(0,119,255)] hover:text-white h-10"
            >
              <Clock className="w-4 h-4 mr-2" />
              Agendar Consulta
            </Button>
          </Card>
        </div>

        {/* CTA Final */}
        <div className="text-center mt-12 p-8 rounded-xl 
                border border-[#0077FF] 
                bg-[#011331]
                transition-all duration-300 
                hover:shadow-[0_10px_25px_-5px_rgba(178,212,247,0.2)]">
          <h3 className="text-xl font-bold mb-4 text-[#B9C3D8]">
            Estamos aqui para cuidar do seu sorriso
          </h3>
          <p className="text-[#BFD1EA] mb-6 max-w-2xl mx-auto leading-relaxed">
            Nossa equipe especializada está pronta para atendê-lo com o cuidado e atenção que você merece.
            Entre em contato conosco e descubra como podemos ajudá-lo a recuperar sua confiança e qualidade de vida.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => handleWhatsAppClick("Olá! Gostaria de agendar uma avaliação e saber mais sobre Clareamento e Lente de Contato Dental")}
              size="lg"
              className="font-medium h-12 px-8"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Falar com Nossa Equipe
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
