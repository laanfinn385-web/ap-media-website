import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import PainSection from "@/components/PainSection";
import SolutionSection from "@/components/SolutionSection";
import HowItWorks from "@/components/HowItWorks";
import AboutMe from "@/components/AboutMe";
import Reviews from "@/components/Reviews";
import GuaranteeSection from "@/components/GuaranteeSection";
import WhatYouGet from "@/components/WhatYouGet";
import ScarcitySection from "@/components/ScarcitySection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <PainSection />
        <SolutionSection />
        <HowItWorks />
        <AboutMe />
        <Reviews />
        <GuaranteeSection />
        <WhatYouGet />
        <ScarcitySection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
