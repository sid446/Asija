
import AboutUs from "@/components/About";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import  Navbar  from "@/components/Navbar";
import IndustriesFlowMenu from "@/components/Industry";
import Career from "@/components/Carrer";




export default function Home() {

  return (
    <div className="relative">
      {/* Fixed Hero Background */}
      <Navbar />
      <Hero />
      
      {/* Scrolling Content */}
      <div className="relative z-40">
        {/* Spacer to push content down initially */}
        <div className="h-[100vh] sm:h-[90vh]" />
        
        {/* Content that scrolls over hero */}
        <AboutUs />
        <Services />
        <IndustriesFlowMenu />
        <Career />
        
      </div>
    </div>
  );
}