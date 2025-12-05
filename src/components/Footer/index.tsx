"use client";
import { MapPin, Phone } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="py-16" style={{ backgroundColor: "#000919", color: "hsl(var(--primary-foreground))" }}>
      <div className="container mx-auto px-4">
        {/* Grid principal */}
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6 md:col-span-1">
            <Image
              src="/Logo_Instituto_do_sorriso.svg"
              alt="Logo Instituto do Sorriso"
              width={180}
              height={45}
              className="mx-auto md:ml-auto"
            />
          </div>

          {/* Contact */}
          <div className="space-y-6 md:col-span-1">
            <h4 className="text-xl font-semibold" style={{ color: "#0077FF" }}>Contato</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 flex-shrink-0" style={{ color: "hsl(var(--primary))" }} />
                <div style={{ color: "rgb(255 255 255 / 0.9)" }}>
                  <p>Rua Cel. Joaquim Piza, 664</p>
                  <p>Centro, Garça - SP</p>
                  <p>CEP: 17400-000</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0" style={{ color: "hsl(var(--primary))" }} />
                <div style={{ color: "rgb(255 255 255 / 0.9)" }}>
                  <p>(14) 99684-7415</p>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6 md:col-span-1">
            <h4 className="text-xl font-semibold" style={{ color: "#0077FF" }}>Nossos Serviços</h4>
            <ul className="space-y-2">
              {["Lentes de Contato Dental", "Clareamento"].map((service) => (
                <li
                  key={service}
                  className="cursor-pointer transition-colors"
                  style={{ color: "rgb(255 255 255 / 0.9)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(var(--primary))")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgb(255 255 255 / 0.9)")}
                  onClick={() => {
                    const element = document.getElementById(service.replace(/\s+/g, "-"));
                    if (element) element.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Linha inferior */}
        <div className="border-t mt-12 pt-8" style={{ borderColor: "rgb(255 255 255 / 0.2)" }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p style={{ color: "rgb(255 255 255 / 0.6)" }}>© 2025 Instituto do Sorriso. Todos os direitos reservados.</p>
            {/* Powered by Mavellium */}
            <div className="flex flex-row items-center md:justify-self-end mt-8 md:mt-0 text-center md:text-right">
              <span className="block text-md" style={{ color: "hsl(var(--secondary))" }}>Desenvolvido por</span>
              <Image
                src="/logo-Mavellium.png"
                alt="Logo Mavellium"
                width={110}
                height={45}
                className="mx-auto md:ml-auto"
              />
            </div>
            <div className="flex items-center gap-4" style={{ color: "rgb(255 255 255 / 0.6)" }}>
              <span>Dr. Calebe Jr. - CRO/RT: 108562/SP</span>
              <span>|</span>
              <span>Dra. Luana - CRO/RT: 108581/SP</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
