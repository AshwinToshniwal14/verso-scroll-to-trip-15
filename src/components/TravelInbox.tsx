import { useState, useEffect } from "react";
import { ContentBubble } from "./ContentBubble";
import { ThailandCluster } from "./ThailandCluster";
import { Button } from "@/components/ui/button";

const savedContent = [
  {
    id: 1,
    thumbnail: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=400&q=80",
    source: "IG",
    location: "Phuket beach villa",
    type: "reel"
  },
  {
    id: 2,
    thumbnail: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=400&q=80",
    source: "WA",
    location: "Bangkok café",
    type: "forward"
  },
  {
    id: 3,
    thumbnail: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=400&q=80",
    source: "TT",
    location: "Koh Phi Phi boat tour",
    type: "video"
  },
  {
    id: 4,
    thumbnail: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=400&q=80",
    source: "IG",
    location: "Chiang Mai temple",
    type: "post"
  },
  {
    id: 5,
    thumbnail: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?auto=format&fit=crop&w=400&q=80",
    source: "WA",
    location: "Bangkok rooftop bar",
    type: "forward"
  }
];

export const TravelInbox = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const [showCluster, setShowCluster] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setIsAnimated(true), 500);
    const timer2 = setTimeout(() => setShowCluster(true), 2500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Header */}
      <div className="pt-8 pb-6 px-4 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-[#2D3439] mb-2">
          Welcome back, traveler.
        </h1>
        <p className="text-lg text-[#2D3439]/70">
          We've organized your <span className="font-semibold">17 saved dreams</span> from Thailand.
        </p>
      </div>

      {/* Content Area */}
      <div className="relative px-4 pb-20">
        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Floating Content Bubbles */}
          <div className="relative h-[400px] mb-8">
            {savedContent.map((content, index) => (
              <ContentBubble
                key={content.id}
                content={content}
                index={index}
                isAnimated={isAnimated}
                isMobile={true}
              />
            ))}
          </div>

          {/* Thailand Cluster */}
          {showCluster && (
            <div className="animate-fade-in">
              <ThailandCluster />
            </div>
          )}
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex gap-8 max-w-6xl mx-auto">
          {/* Left: Inbox Cluster */}
          <div className="flex-1">
            <div className="relative h-[500px]">
              {savedContent.map((content, index) => (
                <ContentBubble
                  key={content.id}
                  content={content}
                  index={index}
                  isAnimated={isAnimated}
                  isMobile={false}
                />
              ))}
            </div>
            
            {showCluster && (
              <div className="mt-8 animate-fade-in">
                <ThailandCluster />
              </div>
            )}
          </div>

          {/* Right: Itinerary Preview Placeholder */}
          <div className="flex-1 flex items-center justify-center text-[#2D3439]/30">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-100 rounded-lg mb-4 mx-auto"></div>
              <p className="text-sm">Itinerary preview will appear here</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-4 z-50 md:hidden">
        <Button 
          className="w-full bg-[#FF7A64] hover:bg-[#FF7A64]/90 text-white font-semibold py-3 text-base animate-pulse"
        >
          → Build My Thailand Trip
        </Button>
      </div>

      {/* Desktop Floating CTA */}
      <div className="hidden md:block fixed bottom-8 right-8 z-50">
        <Button 
          className="bg-[#FF7A64] hover:bg-[#FF7A64]/90 text-white font-semibold px-8 py-3 text-base animate-pulse shadow-lg"
        >
          → Build My Thailand Trip
        </Button>
      </div>
    </div>
  );
};