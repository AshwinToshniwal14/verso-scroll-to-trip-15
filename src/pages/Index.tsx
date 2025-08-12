import { Hero } from "@/components/Hero";
import { ChaosToCalm } from "@/components/ChaosToCalm";
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

        {/* Guides - mobile scroll, desktop grid */}
        <section id="guides" className="mt-8">
          <div className="max-w-6xl mx-auto px-4">
            <header className="mb-3">
              <h2 className="text-xl font-bold text-primary">Guides</h2>
              <p className="text-sm text-muted-foreground">Handpicked trips and lists near you</p>
            </header>
            <div className="flex gap-4 overflow-x-auto snap-x pb-2 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible">
              {[
                { title: "Thailand", places: 5, image: "/lovable-uploads/adc9a232-4eaf-487d-a742-b589704cdc8f.png" },
                { title: "Bangkok Food", places: 8, image: "/lovable-uploads/c45a5501-917b-40c4-b954-3a8382ce76ce.png" },
                { title: "Phuket Beaches", places: 6, image: "/lovable-uploads/70ed9a32-2f15-4f6f-83a8-61719ca3c2de.png" },
                { title: "Chiang Mai Wild", places: 4, image: "/lovable-uploads/edfefd31-e9be-4269-a9c8-e098d69fbe86.png" },
              ].map((g, idx) => (
                <div key={idx} className="min-w-[240px] snap-start md:min-w-0 rounded-xl overflow-hidden border bg-card hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img src={g.image} alt={`${g.title} travel guide`} className="w-full h-40 object-cover" loading="lazy" />
                    <span className="absolute top-2 left-2 text-xs bg-black/70 text-white rounded-full px-2 py-0.5">{g.places} places</span>
                  </div>
                  <div className="p-3">
                    <div className="font-medium leading-tight">{g.title}</div>
                    <div className="text-xs text-muted-foreground">Curated by Verso</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials">
          <SocialProofFinal />
        </section>

        <section id="plan">
          <EmbeddedWaitlist />
        </section>

        {/* Additional narrative sections */}
        <ChaosToCalm />
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
