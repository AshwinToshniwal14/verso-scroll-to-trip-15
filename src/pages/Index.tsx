import { Hero } from "@/components/Hero";
import { ChaosToCalm } from "@/components/ChaosToCalm";
import { InboxToItinerary } from "@/components/InboxToItinerary";
import { SocialProofFinal } from "@/components/SocialProofFinal";
import { TripsBecomeFlywheel } from "@/components/TripsBecomeFlywheel";
import { EmbeddedWaitlist } from "@/components/EmbeddedWaitlist";
import { StickyCTA } from "@/components/StickyCTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero - Save anything. We build everything. */}
      <Hero />
      
      {/* Inbox → Itinerary Animation */}
      <InboxToItinerary />
      
      {/* Chaos to Calm - Before/After Mobile Flow */}
      <ChaosToCalm />
      
      {/* Social Proof + Final CTA */}
      <SocialProofFinal />
      
      {/* Trips Become Guides Flywheel */}
      <TripsBecomeFlywheel />
      
      {/* Embedded Waitlist Form */}
      <EmbeddedWaitlist />
      
      {/* Sticky CTA */}
      <StickyCTA />
      
      {/* Minimal Footer */}
      <Footer />
    </div>
  );
};

export default Index;