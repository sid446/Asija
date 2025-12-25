'use client';

import AboutUs from "@/components/About";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Navbar from "@/components/Navbar";
import IndustriesFlowMenu from "@/components/Industry";
import Insights from "@/components/Insights";
import Career from "@/components/Carrer";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Loader from "@/components/ui/Loader";
import FAQAccordion from "@/components/FaqInteractable";
import { useInitializeAppData } from '@/lib/store/useInitializeAppData';

export default function Home() {
  const { isLoading, hasData, heroContent } = useInitializeAppData();

  if (isLoading && !hasData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {/* Loader – appears first */}
      <Loader />

      <div className="relative">
        <Navbar />
        <Hero />

        <div className="relative z-40 pointer-events-none">
          <div className="h-screen sm:h-[90vh]" />
          <div className="pointer-events-auto">
            <AboutUs />
            <Insights />
            <Services />
            <IndustriesFlowMenu />
            <Career />
            <Contact />
            {!isLoading && heroContent && Boolean(heroContent.showFAQ) && (
              <>
                {console.log('Rendering FAQ - showFAQ:', heroContent.showFAQ)}
                <FAQAccordion/>
              </>
            )}
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}