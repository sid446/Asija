import AboutUs from "@/components/About";
import Hero from "@/components/Hero";
import Image from "next/image";
import Services from "@/components/Services";

export default function Home() {
  return (
    <div className="max-h-screen max-w-screen">
      <Hero/>
      <AboutUs/>
      {/* <Services/> */}

    </div>
  );
}
