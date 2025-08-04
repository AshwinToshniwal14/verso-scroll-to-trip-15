import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ContentBubble } from "./ContentBubble";
import { ThailandCluster } from "./ThailandCluster";
import { Button } from "@/components/ui/button";

const savedContent = [
  {
    id: 1,
    thumbnail: "/lovable-uploads/55ad0a6f-7b9b-4086-826c-11e491c23603.png", // Krabi kayaking with limestone cliffs
    source: "IG",
    location: "Krabi island hopping",
    type: "reel"
  },
  {
    id: 2,
    thumbnail: "/lovable-uploads/8006d940-cc72-415d-ad51-54765e172984.png", // Bangkok street food day scene
    source: "WA",
    location: "Bangkok hidden café",
    type: "forward"
  },
  {
    id: 3,
    thumbnail: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=400&q=80", // Thai temple with golden architecture
    source: "TT",
    location: "Chiang Mai temple tour",
    type: "video"
  },
  {
    id: 4,
    thumbnail: "/lovable-uploads/944d03be-0191-41af-ac23-8e000d614722.png", // Bangkok rooftop sunset view
    source: "IG",
    location: "Bangkok rooftop views",
    type: "post"
  },
  {
    id: 5,
    thumbnail: "/lovable-uploads/c45a5501-917b-40c4-b954-3a8382ce76ce.png", // Bangkok night street food market
    source: "WA",
    location: "Chatuchak weekend market",
    type: "forward"
  },
  {
    id: 6,
    thumbnail: "/lovable-uploads/7b58305b-628b-4e49-819e-c86113305a31.png", // Phuket beach villa with pool
    source: "TT", 
    location: "Phuket sunset beach",
    type: "video"
  }
];

export const TravelInbox = () => {
  const navigate = useNavigate();
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
          Welcome back, Ashwin.
        </h1>
        <p className="text-lg text-[#2D3439]/70">
          Your <span className="font-semibold">17 saved dreams</span> from Thailand are now organized.
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

          {/* Right: Thailand Itinerary Preview */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 max-w-sm mx-auto">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-[#2D3439] mb-2">Bangkok Street Food Hop</h3>
                <p className="text-sm text-[#2D3439]/60">🍜 6 must-eats • ☕ 3 cafes • 🕒 37s to build</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <img 
                    src="/lovable-uploads/c45a5501-917b-40c4-b954-3a8382ce76ce.png" 
                    alt="Bangkok street food vendor" 
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-sm text-[#2D3439]">Chatuchak Market</div>
                    <div className="text-xs text-[#2D3439]/60">Street Food Tour</div>
                  </div>
                  <div className="text-xs text-coral font-medium">Day 1</div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <img 
                    src="/lovable-uploads/adc9a232-4eaf-487d-a742-b589704cdc8f.png" 
                    alt="Bangkok skyline rooftop view" 
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-sm text-[#2D3439]">Sky Bar Bangkok</div>
                    <div className="text-xs text-[#2D3439]/60">Rooftop Experience</div>
                  </div>
                  <div className="text-xs text-coral font-medium">Day 1</div>
                </div>
              </div>
              
              <Button 
                onClick={() => navigate('/preview-itinerary')}
                className="w-full bg-coral hover:bg-coral/90 text-white font-medium py-3 text-sm"
              >
                → Preview Itinerary
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-4 z-50 md:hidden">
        <Button 
          onClick={() => navigate('/preview-itinerary')}
          className="w-full bg-[#FF7A64] hover:bg-[#FF7A64]/90 text-white font-semibold py-3 text-base animate-pulse"
        >
          → Show My Trip
        </Button>
      </div>

      {/* Desktop Floating CTA */}
      <div className="hidden md:block fixed bottom-8 right-8 z-50">
        <Button 
          onClick={() => navigate('/preview-itinerary')}
          className="bg-[#FF7A64] hover:bg-[#FF7A64]/90 text-white font-semibold px-8 py-3 text-base animate-pulse shadow-lg"
        >
          → Show My Trip
        </Button>
      </div>
    </div>
  );
};