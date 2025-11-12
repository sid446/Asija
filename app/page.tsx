import AboutUs from "@/components/About";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import  Navbar  from "@/components/Navbar";

export default function Home() {
  return (
    <div className="relative">
      {/* Fixed Hero Background */}
      <Navbar />
      <Hero />
      
      {/* Scrolling Content */}
      <div className="relative z-40">
        {/* Spacer to push content down initially */}
        <div className="h-[60vh] sm:h-[90vh]" />
        
        {/* Content that scrolls over hero */}
        <AboutUs />
        <Services />
      </div>
    </div>
  );
}