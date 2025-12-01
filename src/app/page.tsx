import About from "@/components/About";
import Benefits from "@/components/Benefits";
import ButtonWhatsapp from "@/components/ButtonWhatsapp";
import Contact from "@/components/Contact";
import Details from "@/components/Details";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SectionImage from "@/components/SectionImage";
import SectionVideo from "@/components/SectionVideo";
import Specialists from "@/components/Specialists";
import Testimonials from "@/components/Testimonials";
import Treatments from "@/components/Treatments";
import { Types } from "@/components/Types";
import { Whitening } from "@/components/Whitening";
import Xray from "@/components/Xray";

export default function Home() {
  return (
    <>
      <main>
        <Hero></Hero>
        <SectionImage></SectionImage>
        <Types></Types>
        <Details></Details>
        <Benefits></Benefits>
        <About></About>
        <Whitening></Whitening>
        <Specialists></Specialists>
        {/* <Testimonials></Testimonials> */}
        <Contact></Contact>
      </main>
      <Footer></Footer>
      <ButtonWhatsapp></ButtonWhatsapp>
    </>
  );
}
