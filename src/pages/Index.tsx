import { Hero } from "@/components/Hero";

import { InboxToItinerary } from "@/components/InboxToItinerary";
import { SocialProofFinal } from "@/components/SocialProofFinal";
import { TripsBecomeFlywheel } from "@/components/TripsBecomeFlywheel";
import { EmbeddedWaitlist } from "@/components/EmbeddedWaitlist";
import { StickyCTA } from "@/components/StickyCTA";
import { Footer } from "@/components/Footer";
import CTASample from "@/components/CTASample";
import PlanTravelLauncher from "@/components/PlanTravelLauncher";
import Navbar from "@/components/Navbar";
import HowItWorks from "@/components/HowItWorks";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Verso — Plan trips from saved content</title>
        <meta
          name="description"
          content="Turn saved reels and posts into a day‑wise itinerary. Explore how it works, see gallery, testimonials, and plan your trip."
        />
        <link rel="canonical" href="/" />
      </Helmet>
      <Navbar />
      <div className="min-h-screen pt-14">
        <section id="hero">
          <Hero />
        </section>

        <section id="how-it-works">
          <HowItWorks />
        </section>

        <section id="gallery">
          <TripsBecomeFlywheel />
        </section>


        <section id="testimonials">
          <SocialProofFinal />
        </section>

        <section id="plan">
          <EmbeddedWaitlist />
        </section>

        {/* Additional narrative sections */}
        
        <InboxToItinerary />

        <CTASample />
        <StickyCTA />
        <Footer />

        {/* Plan Travel launcher (mobile bottom sheet / desktop route) */}
        <div className="fixed bottom-6 left-6 z-50">
          <PlanTravelLauncher />
        </div>
      </div>
    </>
  );
};

export default Index;
