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
import Loader from "@/components/ui/Loader";   // ← ADD THIS
import FAQAccordion from "@/components/FaqInteractable";
import { useState, useEffect } from 'react';

interface HeroContent {
  showFAQ: boolean;
  showSnowfall: boolean;
  // Add other properties as needed
}

export default function Home() {
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSnowfall, setShowSnowfall] = useState(true);

  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        const res = await fetch('/api/home-content');
        const data = await res.json();
        console.log('Home page fetched hero content:', data);
        console.log('showFAQ value:', data.showFAQ, 'Boolean:', Boolean(data.showFAQ));
        console.log('showSnowfall value:', data.showSnowfall, 'Boolean:', Boolean(data.showSnowfall));
        setHeroContent({
          ...data,
          showSnowfall: data.showSnowfall !== undefined ? data.showSnowfall : true
        });
        setShowSnowfall(data.showSnowfall !== undefined ? data.showSnowfall : true);
      } catch (error) {
        console.error('Failed to fetch hero content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroContent();

    // Poll every 10 seconds to check for updates
    const interval = setInterval(fetchHeroContent, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Loader – appears first */}
      <Loader />

      <div className="relative">
        <Navbar showSnowfall={showSnowfall} />
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
            {!loading && heroContent && Boolean(heroContent.showFAQ) && (
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