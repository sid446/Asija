'use client';

import AboutUs from "@/components/About";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Navbar from "@/components/Navbar";
import IndustriesFlowMenu from "@/components/Industry";
import Career from "@/components/Carrer";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Loader from "@/components/ui/Loader";   // ← ADD THIS
import FAQs from "@/components/FAQ";
import FAQAccordion from "@/components/FaqInteractable";

export default function Home() {
  return (
    <>
      {/* Loader – appears first */}
      <Loader />

      <div className="relative">
        <Navbar />
        <Hero />

        <div className="relative z-40">
          <div className="h-[100vh] sm:h-[90vh]" />
          <AboutUs />
          <Services />
          <IndustriesFlowMenu />
          <Career />
          <Contact />
          <FAQAccordion/>
          <Footer />
        </div>
      </div>
    </>
  );
}