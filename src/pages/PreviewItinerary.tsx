import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, Clock, User } from "lucide-react";

const PreviewItinerary = () => {
  const navigate = useNavigate();
  const [animateMap, setAnimateMap] = useState(false);
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    // Trigger animations on mount
    setTimeout(() => setAnimateMap(true), 500);
    setTimeout(() => setShowCards(true), 1200);
  }, []);

  const itineraryDays = [
    {
      day: 1,
      title: "Bangkok Café Crawl",
      activities: [
        "📍 Wallflowers Café, Luka Bangkok",
        "🍜 Midnight Pad Thai Tour", 
        "🛏️ Stay at Riva Surya"
      ],
      source: "IG Reel from @megha.chaos",
      thumbnail: "https://images.unsplash.com/photo-1561713528-cdb93dee84ea?auto=format&fit=crop&w=400&q=80",
      tags: ["café", "food", "hotel"]
    },
    {
      day: 2,
      title: "Chiang Mai Temple Trail",
      activities: [
        "📍 Wat Phra Singh Temple",
        "🍵 Traditional Tea Ceremony",
        "🛏️ Rachamankha Hotel"
      ],
      source: "TikTok from @wanderlust_th",
      thumbnail: "https://images.unsplash.com/photo-1520637836862-4d197d17c50a?auto=format&fit=crop&w=400&q=80",
      tags: ["temple", "culture", "hotel"]
    },
    {
      day: 3,
      title: "Krabi Beach Escape",
      activities: [
        "📍 Railay Beach Climbing",
        "🛥️ Island Hopping Tour",
        "🛏️ Rayavadee Resort"
      ],
      source: "WhatsApp from Alex",
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80",
      tags: ["beach", "adventure", "resort"]
    }
  ];

  const mapPins = [
    { city: "Bangkok", x: "45%", y: "60%", delay: 0 },
    { city: "Chiang Mai", x: "42%", y: "35%", delay: 300 },
    { city: "Krabi", x: "38%", y: "75%", delay: 600 }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="container mx-auto px-4 pt-8 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Here's your trip, built from your saved dreams
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We've clustered your Thailand content into a ready-to-edit itinerary
          </p>
        </div>

        {/* Animated Map Section */}
        <div className="relative w-full max-w-4xl mx-auto mb-16">
          <div className="relative bg-gradient-to-br from-blue-50 to-emerald-50 rounded-3xl p-8 h-64 overflow-hidden">
            {/* Map Background */}
            <div className="absolute inset-0 opacity-10">
              <img 
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80" 
                alt="Thailand map" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Animated Pins */}
            {mapPins.map((pin, index) => (
              <div
                key={pin.city}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ${
                  animateMap ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-20px]'
                }`}
                style={{ 
                  left: pin.x, 
                  top: pin.y,
                  transitionDelay: `${pin.delay}ms`
                }}
              >
                <div className="relative">
                  <MapPin className="w-8 h-8 text-coral-500 animate-bounce" style={{ animationDelay: `${pin.delay + 700}ms` }} />
                  <span className="absolute top-10 left-1/2 transform -translate-x-1/2 text-sm font-medium bg-white px-2 py-1 rounded-full shadow-md whitespace-nowrap">
                    {pin.city}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Itinerary Cards */}
        <div className={`transition-all duration-1000 ${showCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid gap-8 md:gap-6">
            {itineraryDays.map((dayPlan, index) => (
              <Card 
                key={dayPlan.day} 
                className="group hover:shadow-lg transition-all duration-300 overflow-hidden"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Thumbnail */}
                    <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden">
                      <img 
                        src={dayPlan.thumbnail} 
                        alt={dayPlan.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        Day {dayPlan.day}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="md:w-2/3 p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-4">
                          {dayPlan.title}
                        </h3>
                        
                        <div className="space-y-2 mb-4">
                          {dayPlan.activities.map((activity, idx) => (
                            <p key={idx} className="text-muted-foreground">
                              {activity}
                            </p>
                          ))}
                        </div>
                        
                        {/* Tags */}
                        <div className="flex gap-2 mb-4">
                          {dayPlan.tags.map((tag) => (
                            <span 
                              key={tag}
                              className="px-3 py-1 bg-coral-50 text-coral-600 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        {/* Source */}
                        <p className="text-sm text-muted-foreground mb-4">
                          🗂️ Source: {dayPlan.source}
                        </p>
                      </div>
                      
                      {/* Customize CTA */}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="self-start group-hover:bg-coral-50 group-hover:border-coral-200 transition-colors"
                      >
                        Customize this day
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Button 
            onClick={() => navigate('/show-my-trip')}
            size="lg"
            className="bg-coral-500 hover:bg-coral-600 text-white px-8 py-4 text-lg"
          >
            → Show My Trip
          </Button>
        </div>
      </div>

      {/* Sticky CTA for mobile */}
      <div className="fixed bottom-4 left-4 right-4 md:hidden">
        <Button 
          onClick={() => navigate('/show-my-trip')}
          className="w-full bg-coral-500 hover:bg-coral-600 text-white"
          size="lg"
        >
          → Show My Trip
        </Button>
      </div>
    </div>
  );
};

export default PreviewItinerary;