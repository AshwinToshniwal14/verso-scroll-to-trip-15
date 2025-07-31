import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, MessageCircle, Plane, Inbox, MapIcon, Settings, Heart } from "lucide-react";

const PreviewItinerary = () => {
  const navigate = useNavigate();
  const [animateMap, setAnimateMap] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [showContentFlow, setShowContentFlow] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);

  useEffect(() => {
    // Trigger animations in sequence
    setTimeout(() => setShowContentFlow(true), 500);
    setTimeout(() => setShowTimeline(true), 1500);
    setTimeout(() => setAnimateMap(true), 2000);
    setTimeout(() => setShowCards(true), 2500);
  }, []);

  // Thailand-specific content tiles for the organization animation
  const contentTiles = [
    {
      id: 1,
      title: "Chiang Mai temple",
      thumbnail: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=300&q=80", // Golden Wat Phra Singh
      source: "TT",
      location: "Chiang Mai",
      type: "video"
    },
    {
      id: 2,
      title: "Bangkok rooftop bar",
      thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=300&q=80", // Bangkok skyline at night
      source: "IG", 
      location: "Bangkok",
      type: "reel"
    },
    {
      id: 3,
      title: "Railay Beach kayaking",
      thumbnail: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=300&q=80", // Krabi limestone cliffs
      source: "WA",
      location: "Krabi", 
      type: "forward"
    },
    {
      id: 4,
      title: "Bangkok street food",
      thumbnail: "https://images.unsplash.com/photo-1563492065_75925f1a3c?auto=format&fit=crop&w=300&q=80", // Thai street vendor
      source: "IG",
      location: "Bangkok",
      type: "post"
    }
  ];

  const itineraryDays = [
    {
      day: 1,
      title: "Bangkok Rooftops & Night Markets",
      emoji: "🏙️",
      activities: [
        "📍 Sky Bar rooftop cocktails",
        "🍜 Chatuchak night market tour", 
        "🛏️ Stay at Mandarin Oriental"
      ],
      source: "IG Reel from @megha.chaos",
      thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80",
      tags: ["rooftop", "nightlife", "food"]
    },
    {
      day: 2,
      title: "Temple Mornings, Tuk-Tuk City Hop",
      emoji: "🛕",
      activities: [
        "📍 Wat Phra Singh golden temple",
        "🛺 Tuk-tuk city tour",
        "🛏️ Rachamankha boutique hotel"
      ],
      source: "TikTok from @wanderlust_th",
      thumbnail: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=400&q=80",
      tags: ["temple", "culture", "transport"]
    },
    {
      day: 3,
      title: "Island Escape – Railay & Phi Phi",
      emoji: "🏝️",
      activities: [
        "📍 Railay Beach rock climbing",
        "🛥️ Phi Phi Island hopping",
        "🛏️ Rayavadee luxury resort"
      ],
      source: "WhatsApp from Alex",
      thumbnail: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=400&q=80",
      tags: ["beach", "adventure", "islands"]
    }
  ];

  const mapPins = [
    { city: "Bangkok", x: "45%", y: "60%", delay: 0 },
    { city: "Chiang Mai", x: "42%", y: "35%", delay: 300 },
    { city: "Krabi", x: "38%", y: "75%", delay: 600 }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Side Navigation */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <div className="bg-white rounded-2xl shadow-lg p-3 space-y-4">
          <button className="p-3 rounded-xl bg-coral-50 text-coral-600">
            <Inbox className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-xl hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors">
            <MapIcon className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-xl hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors">
            <Heart className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-xl hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors">
            <MessageCircle className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-xl hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Floating Chat Icon */}
      <button className="fixed bottom-6 right-6 bg-coral-500 hover:bg-coral-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50">
        <MessageCircle className="w-6 h-6" />
      </button>

      <div className="container mx-auto px-4 pt-8 pb-12">
        {/* 1. Post-Itinerary Preview Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              📦 We've unpacked your saved content.
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Your Thailand trip is now a tidy timeline. See what's been stitched together from your reels, chats, and pins.
            </p>
          </div>

          {/* Content Flow Animation */}
          <div className="max-w-5xl mx-auto mb-12">
            {/* Scattered Content Tiles */}
            <div className="relative h-96 mb-8">
              {contentTiles.map((tile, index) => (
                <div
                  key={tile.id}
                  className={`absolute w-32 h-32 rounded-2xl overflow-hidden shadow-lg transition-all duration-1000 ease-out ${
                    showContentFlow ? 'opacity-100' : 'opacity-0'
                  } ${
                    showTimeline 
                      ? 'transform translate-x-0 translate-y-0' 
                      : index === 0 ? 'transform -translate-x-32 -translate-y-16'
                      : index === 1 ? 'transform translate-x-32 -translate-y-8'  
                      : index === 2 ? 'transform -translate-x-24 translate-y-16'
                      : 'transform translate-x-40 translate-y-8'
                  }`}
                  style={{
                    left: showTimeline ? `${20 + index * 20}%` : '50%',
                    top: showTimeline ? '50%' : '30%',
                    transitionDelay: `${index * 200}ms`
                  }}
                >
                  <img 
                    src={tile.thumbnail} 
                    alt={tile.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-medium">
                    {tile.source}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <p className="text-white text-xs font-medium">{tile.title}</p>
                  </div>
                </div>
              ))}
              
              {/* Timeline Strip */}
              <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 delay-1000 ${
                showTimeline ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}>
                <div className="bg-gradient-to-r from-coral-100 to-emerald-100 rounded-full h-1 w-80"></div>
                <div className="flex justify-between items-center mt-4">
                  <div className="bg-coral-500 text-white px-3 py-1 rounded-full text-sm font-medium">Day 1</div>
                  <div className="bg-coral-400 text-white px-3 py-1 rounded-full text-sm font-medium">Day 2</div>
                  <div className="bg-coral-300 text-white px-3 py-1 rounded-full text-sm font-medium">Day 3</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mb-4">
            <Button 
              onClick={() => navigate('/show-my-trip')}
              size="lg"
              className="bg-coral-500 hover:bg-coral-600 text-white px-8 py-4 text-lg"
            >
              → Show My Trip
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            See how we've mapped your moments into a real journey.
          </p>
        </div>

        {/* 2. Show My Trip Preview Section */}
        <div className={`transition-all duration-1000 delay-1000 ${showCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-3xl p-8 mb-16">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column: Trip Overview Card */}
              <div className="lg:col-span-1">
                <Card className="sticky top-8">
                  <CardContent className="p-6">
                    <div className="relative">
                      {/* Map Background */}
                      <div className="absolute inset-0 opacity-20 rounded-lg overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80" 
                          alt="Thailand map" 
                          className="w-full h-full object-cover blur-sm"
                        />
                      </div>
                      
                      <div className="relative z-10 space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-2xl font-bold">Trip Overview</h3>
                          <Button variant="outline" size="sm">✏️ Edit</Button>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-coral-500" />
                            <span className="font-medium">Thailand</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">📆</span>
                            <span>6 days</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">👥</span>
                            <span>2 adults</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">🎯</span>
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Draft</span>
                          </div>
                        </div>

                        {/* Map Pins */}
                        {mapPins.map((pin, index) => (
                          <div
                            key={pin.city}
                            className={`absolute w-2 h-2 bg-coral-500 rounded-full transition-all duration-700 ${
                              animateMap ? 'opacity-100' : 'opacity-0'
                            }`}
                            style={{ 
                              left: pin.x, 
                              top: pin.y,
                              transitionDelay: `${pin.delay}ms`
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column: Day-Wise Strip */}
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-xl font-bold mb-6">Your Journey Timeline</h3>
                
                {itineraryDays.map((day, index) => (
                  <Card 
                    key={day.day}
                    className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-coral-100 rounded-full flex items-center justify-center text-2xl">
                            {day.emoji}
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold mb-2">
                            Day {day.day}: {day.title}
                          </h4>
                          <p className="text-muted-foreground text-sm">
                            {day.activities[0]} • {day.activities[1]}
                          </p>
                        </div>
                        
                        <div className="flex-shrink-0">
                          <img 
                            src={day.thumbnail}
                            alt={day.title}
                            className="w-16 h-16 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
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