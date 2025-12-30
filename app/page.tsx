'use client';

import dynamic from 'next/dynamic';
import AboutUs from "@/components/About";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Insights from "@/components/Insights";
import Footer from "@/components/Footer";
import Loader from "@/components/ui/Loader";
import FAQAccordion from "@/components/FaqInteractable";
import HoverNavigation from "@/components/HoverNavigation";
import { useAppSelector } from '@/lib/store/hooks';

const Services = dynamic(() => import("@/components/Services"), { ssr: false });
const IndustriesFlowMenu = dynamic(() => import("@/components/Industry"), { ssr: false });
const Career = dynamic(() => import("@/components/Carrer"), { ssr: false });
const Contact = dynamic(() => import("@/components/Contact"), { ssr: false });

export default function Home() {
  const { content: heroContent, loading: heroLoading } = useAppSelector((state) => state.hero);
  const { services, loading: servicesLoading } = useAppSelector((state) => state.services);
  const { insights, loading: insightsLoading } = useAppSelector((state) => state.insights);
  const { regions, loading: regionsLoading } = useAppSelector((state) => state.regions);
  const { faqs, loading: faqsLoading } = useAppSelector((state) => state.faqs);
  const { industries, loading: industriesLoading } = useAppSelector((state) => state.industries);
  const { contactContent, locations, loading: contactLoading } = useAppSelector((state) => state.contact);
  const { content: globalContent, regions: globalRegions, offerings, loading: globalServicesLoading } = useAppSelector((state) => state.globalServices);

  const isLoading = heroLoading || servicesLoading || insightsLoading || regionsLoading || faqsLoading || industriesLoading || contactLoading || globalServicesLoading;
  const hasData = !!(heroContent && services.length > 0 && insights.length > 0 && regions.length > 0 && faqs.length > 0 && industries.length > 0 && contactContent && locations.length > 0 && globalContent && globalRegions.length > 0 && offerings.length > 0);

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
        <HoverNavigation />
        <div id="hero">
          <Hero />
        </div>

        <div className="relative z-40 pointer-events-none">
          <div className="h-screen sm:h-[90vh]" />
          <div className="pointer-events-auto">
            <div id="about">
              <AboutUs />
            </div>
            {!isLoading && heroContent && Boolean(heroContent.showInsights) && (
              <div id="insights">
                <Insights />
              </div>
            )}
            <div id="services">
              <Services />
            </div>
            <div id="industries">
              <IndustriesFlowMenu />
            </div>
            <div id="career">
              <Career />
            </div>
            <div id="contact">
              <Contact />
            </div>
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