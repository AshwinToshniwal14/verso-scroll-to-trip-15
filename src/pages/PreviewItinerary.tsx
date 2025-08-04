import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, MessageCircle, X, Calendar, Users, ArrowRight } from "lucide-react";

const PreviewItinerary = () => {
  const navigate = useNavigate();
  const [showCards, setShowCards] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowCards(true), 300);
  }, []);

  // Content tiles grouped by day with Thailand-specific moments
  const contentByDay = {
    1: [
      {
        id: 1,
        title: "Bangkok rooftop bar",
        thumbnail: "/lovable-uploads/944d03be-0191-41af-ac23-8e000d614722.png",
        source: "IG",
        location: "Bangkok",
        date: "Nov 15"
      },
      {
        id: 2,
        title: "Chatuchak market",
        thumbnail: "/lovable-uploads/8006d940-cc72-415d-ad51-54765e172984.png",
        source: "WA",
        location: "Bangkok",
        date: "Nov 15"
      }
    ],
    2: [
      {
        id: 3,
        title: "Chiang Mai temple",
        thumbnail: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=300&q=80",
        source: "TT",
        location: "Chiang Mai",
        date: "Nov 16"
      }
    ],
    3: [
      {
        id: 4,
        title: "Railay Beach kayaking",
        thumbnail: "/lovable-uploads/55ad0a6f-7b9b-4086-826c-11e491c23603.png",
        source: "WA",
        location: "Krabi",
        date: "Nov 17"
      }
    ]
  };

  const tripPreview = {
    title: "Bangkok Street Food Hop",
    subtext: "6 must-eats · 3 cafes · Built in 37s",
    entries: [
      { title: "Chatuchak Market", type: "Street Food Tour", day: 1, emoji: "🍜" },
      { title: "Sky Bar Bangkok", type: "Rooftop", day: 1, emoji: "🍸" },
      { title: "Railay Beach", type: "Kayaking", day: 3, emoji: "🏝️" }
    ]
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'IG': return '🟣';
      case 'WA': return '🟢';
      case 'TT': return '⚫️';
      default: return '📱';
    }
  };

  const ContentTile = ({ item, index }: { item: any, index: number }) => (
    <div
      className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
        showCards 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="aspect-square relative">
        <img 
          src={item.thumbnail} 
          alt={item.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
          {getSourceIcon(item.source)} {item.source}
        </div>
        <div className="absolute top-3 right-3 bg-coral-500 text-white px-2 py-1 rounded-full text-xs font-medium">
          Day {Object.keys(contentByDay).find(day => contentByDay[day as any].includes(item))}
        </div>
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300">
          <div className="absolute bottom-3 left-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="font-medium text-sm">{item.title}</p>
            <p className="text-xs opacity-90">📍 {item.location} • {item.date}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background relative">
      {/* Chat Icon */}
      <button className="fixed bottom-6 right-6 bg-coral-500 hover:bg-coral-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50">
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* SCREEN 1: Unpacked Content */}
      <div className="container mx-auto px-4 pt-16 pb-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            🧳 We've unpacked your saved content.
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your Thailand trip is now a tidy timeline of moments.
          </p>
        </div>

        {/* Content Grid by Days */}
        <div className="max-w-6xl mx-auto space-y-12">
          {Object.entries(contentByDay).map(([day, items]) => (
            <div key={day} className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-coral-500 text-white px-4 py-2 rounded-full font-semibold">
                  Day {day}
                </div>
                <div className="h-px bg-border flex-1"></div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {items.map((item, index) => (
                  <ContentTile key={item.id} item={item} index={index} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-6 right-20 z-40">
        <Button 
          onClick={() => setShowDrawer(true)}
          size="lg"
          className="bg-coral-500 hover:bg-coral-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <ArrowRight className="w-5 h-5 mr-2" />
          Organize into a Trip
        </Button>
      </div>

      {/* SCREEN 2: Trip Preview Drawer */}
      {showDrawer && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-hidden animate-scale-in">
            {/* Header with trip collage */}
            <div className="relative h-48 bg-gradient-to-br from-coral-500 to-orange-500">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-2 opacity-30">
                  <img src="/lovable-uploads/944d03be-0191-41af-ac23-8e000d614722.png" className="w-16 h-16 rounded-lg object-cover" />
                  <img src="/lovable-uploads/8006d940-cc72-415d-ad51-54765e172984.png" className="w-16 h-16 rounded-lg object-cover" />
                  <img src="/lovable-uploads/55ad0a6f-7b9b-4086-826c-11e491c23603.png" className="w-16 h-16 rounded-lg object-cover" />
                </div>
              </div>
              
              <button 
                onClick={() => setShowDrawer(false)}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="absolute bottom-6 left-6 text-white">
                <h2 className="text-3xl font-bold mb-2">{tripPreview.title}</h2>
                <p className="text-white/90">{tripPreview.subtext}</p>
              </div>
            </div>

            {/* Trip entries */}
            <div className="p-6 space-y-4">
              {tripPreview.entries.map((entry, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                  <div className="text-2xl">{entry.emoji}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{entry.title}</h3>
                    <p className="text-sm text-muted-foreground">{entry.type}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">📍 Day {entry.day}</div>
                </div>
              ))}
              
              <Button 
                onClick={() => navigate('/show-my-trip')}
                className="w-full bg-coral-500 hover:bg-coral-600 text-white mt-6"
                size="lg"
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Preview Itinerary
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* SCREEN 3: Itinerary Readiness Widget */}
      <div className="fixed bottom-24 left-6 z-40">
        <Card className="w-80 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">🇹🇭 Thailand</h3>
                <span className="text-sm text-muted-foreground">17 saved items</span>
              </div>
              
              {/* Progress bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Itinerary ready</span>
                  <span className="font-semibold text-coral-500">72%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-coral-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                </div>
              </div>
              
              {/* Source breakdown */}
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">🟣 8 IG</span>
                <span className="flex items-center gap-1">🟢 6 WA</span>
                <span className="flex items-center gap-1">⚫️ 3 TT</span>
              </div>
              
              {/* Locations */}
              <div className="text-sm text-muted-foreground">
                📍 Phuket, Bangkok, Koh Phi Phi
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">☕ 8 cafes</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">🛏 3 stays</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">✨ auto-clustered</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PreviewItinerary;