import { Hero } from "@/components/Hero";
import { ChaosToCalm } from "@/components/ChaosToCalm";
import { InboxToItinerary } from "@/components/InboxToItinerary";
import { SocialProofFinal } from "@/components/SocialProofFinal";
import { TripsBecomeFlywheel } from "@/components/TripsBecomeFlywheel";
import { EmbeddedWaitlist } from "@/components/EmbeddedWaitlist";
import { StickyCTA } from "@/components/StickyCTA";
import { Footer } from "@/components/Footer";
import CTASample from "@/components/CTASample";
import ChatAssistant from "@/components/ChatAssistant";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Index = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen">
        {/* Hero - Save anything. We build everything. */}
        <Hero />
        
        {/* Inbox → Itinerary Animation */}
        <InboxToItinerary />
        
        {/* Chaos to Calm - Before/After Mobile Flow */}
        <ChaosToCalm />
        
        {/* Social Proof + Final CTA */}
        <SocialProofFinal />
        
        {/* CTA Sample Trip */}
        <CTASample />
        
        {/* Trips Become Guides Flywheel */}
        <TripsBecomeFlywheel />
        
        {/* Embedded Waitlist Form */}
        <EmbeddedWaitlist />
        
        {/* Sticky CTA */}
        <StickyCTA />
        
        {/* Chat Assistant */}
        <ChatAssistant />
        
        {/* Minimal Footer */}
        <Footer />

        {/* Floating Login Icon */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleLoginClick}
              size="icon"
              className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 hover:shadow-xl transition-all duration-300 z-50"
            >
              <User className="h-6 w-6 text-primary" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" className="hidden md:block">
            <p>Log in to see your travel inbox</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default Index;