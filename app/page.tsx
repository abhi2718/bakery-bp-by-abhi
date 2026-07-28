import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import About from "@/components/sections/About";
import Shop from "@/components/sections/Shop";
import LowSugar from "@/components/sections/LowSugar";
import HowItWorks from "@/components/sections/HowItWorks";
import Gallery from "@/components/sections/Gallery";
import HoursContact from "@/components/sections/HoursContact";
import Faq from "@/components/sections/Faq";
import CtaBand from "@/components/sections/CtaBand";

/* The whole page, in the order it appears. Drop a section out by deleting
   its line (and its entry in `nav` in config/site.config.ts). */
export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Shop />
      <LowSugar />
      <HowItWorks />
      <Gallery />
      <HoursContact />
      <Faq />
      <CtaBand />
    </>
  );
}
