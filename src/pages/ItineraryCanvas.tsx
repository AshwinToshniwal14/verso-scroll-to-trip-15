import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  Edit3, 
  Trash2,
  Plus,
  User,
  Heart,
  Compass,
  Luggage,
  Pin,
  Menu,
  X
} from "lucide-react";

const ItineraryCanvas = () => {
  const [expandedDays, setExpandedDays] = useState<number[]>([1, 2, 3]);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Trip data with Thailand content
  const tripData = {
    title: "Your Thailand Trip — Visual Planner",
    summary: {
      totalItems: 17,
      sources: { instagram: 8, whatsapp: 6, tiktok: 3 },
      progress: 72,
      locations: ["Phuket", "Bangkok", "Koh Phi Phi", "Krabi"],
      categories: { cafes: 8, stays: 3, activities: 6 }
    },
    days: [
      {
        id: 1,
        title: "Bangkok Discovery",
        date: "Nov 15",
        region: "Bangkok",
        emoji: "🏙️",
        items: [
          {
            id: 1,
            title: "Grand Palace & Wat Phra Kaew",
            category: "temple",
            source: "IG",
            image: "/lovable-uploads/26235063-c122-45e5-a7a4-131e729e9878.png",
            time: "9:00 AM"
          },
          {
            id: 2,
            title: "Wat Pho Reclining Buddha",
            category: "temple", 
            source: "WA",
            image: "/lovable-uploads/50450ba1-2407-4d4f-97c3-6bb955cac313.png",
            time: "11:00 AM"
          },
          {
            id: 3,
            title: "Chatuchak Weekend Market",
            category: "food",
            source: "TT",
            image: "/lovable-uploads/8006d940-cc72-415d-ad51-54765e172984.png",
            time: "2:00 PM"
          },
          {
            id: 4,
            title: "Sky Bar Bangkok",
            category: "bar",
            source: "IG",
            image: "/lovable-uploads/944d03be-0191-41af-ac23-8e000d614722.png",
            time: "6:00 PM"
          }
        ]
      },
      {
        id: 2,
        title: "Island Paradise",
        date: "Nov 16",
        region: "Phi Phi Islands",
        emoji: "🏝️",
        items: [
          {
            id: 5,
            title: "Maya Bay Viewpoint",
            category: "lookout",
            source: "IG",
            image: "/lovable-uploads/6e44b0a4-b54c-42cb-a07f-f40dc198a542.png",
            time: "8:00 AM"
          },
          {
            id: 6,
            title: "Beach Villa Phuket",
            category: "stay",
            source: "WA",
            image: "/lovable-uploads/f9a25f59-e52c-43b0-b86a-8d60b6f2292d.png",
            time: "Check-in 3:00 PM"
          }
        ]
      },
      {
        id: 3,
        title: "Krabi Adventure",
        date: "Nov 17",
        region: "Krabi",
        emoji: "🚣‍♀️",
        items: [
          {
            id: 7,
            title: "Railay Beach Kayaking",
            category: "activity",
            source: "TT",
            image: "/lovable-uploads/55ad0a6f-7b9b-4086-826c-11e491c23603.png",
            time: "10:00 AM"
          }
        ]
      }
    ]
  };

  const filters = ["All", "Cafes", "Temples", "Activities", "Stays", "Lookouts"];
  const destinations = ["All", "Bangkok", "Phuket", "Phi Phi Islands", "Krabi"];

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'IG': return '🟣';
      case 'WA': return '🟢';
      case 'TT': return '⚫️';
      default: return '📱';
    }
  };

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'food': return '🍜';
      case 'temple': return '🏛️';
      case 'activity': return '🏃‍♀️';
      case 'stay': return '🛏️';
      case 'bar': return '🍸';
      case 'lookout': return '👁️';
      default: return '📍';
    }
  };

  const toggleDay = (dayId: number) => {
    setExpandedDays(prev => 
      prev.includes(dayId) 
        ? prev.filter(id => id !== dayId)
        : [...prev, dayId]
    );
  };

  const sidebarItems = [
    { icon: MessageCircle, label: "Threads", active: false },
    { icon: Compass, label: "Explore", active: false },
    { icon: Heart, label: "Saved", active: false },
    { icon: Luggage, label: "Trips", active: true },
    { icon: Pin, label: "Inspiration", active: false },
    { icon: Plus, label: "Create", active: false },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Sidebar */}
      <div className={`${isSidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 bg-white border-r border-border overflow-hidden lg:relative fixed lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} z-40 h-full`}>
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-coral-500">Verso</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="space-y-2 mb-8">
            {sidebarItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                  item.active 
                    ? 'bg-coral-50 text-coral-600 border border-coral-200' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </div>
            ))}
          </nav>

          {/* Trip Summary */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold">🇹🇭 Thailand</h3>
                  <span className="text-sm text-muted-foreground">{tripData.summary.totalItems} items</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Itinerary ready</span>
                    <span className="font-semibold text-coral-500">{tripData.summary.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-coral-500 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${tripData.summary.progress}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-sm">
                  <span>🟣 {tripData.summary.sources.instagram}</span>
                  <span>🟢 {tripData.summary.sources.whatsapp}</span>
                  <span>⚫️ {tripData.summary.sources.tiktok}</span>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs">☕ {tripData.summary.categories.cafes}</Badge>
                  <Badge variant="secondary" className="text-xs">🛏 {tripData.summary.categories.stays}</Badge>
                  <Badge variant="secondary" className="text-xs">✨ auto-clustered</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile */}
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
            <div className="w-8 h-8 bg-coral-500 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <span className="font-medium">Profile</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-border p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">{tripData.title}</h1>
          </div>
        </header>

        {/* Filters Bar */}
        <div className="bg-white border-b border-border p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search activities, places..." 
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <div className="flex gap-2">
                {filters.map((filter) => (
                  <Button
                    key={filter}
                    variant={selectedFilter === filter ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter(filter)}
                    className={selectedFilter === filter ? "bg-coral-500 hover:bg-coral-600" : ""}
                  >
                    {filter}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Day Cards Horizontal Scroll */}
        <div className="bg-white border-b border-border p-4">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {tripData.days.map((day) => (
              <Card
                key={day.id}
                className={`min-w-64 cursor-pointer transition-all duration-200 hover:shadow-md ${
                  expandedDays.includes(day.id) ? 'ring-2 ring-coral-500' : ''
                }`}
                onClick={() => toggleDay(day.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{day.emoji}</span>
                      <div>
                        <h3 className="font-semibold">Day {day.id}</h3>
                        <p className="text-sm text-muted-foreground">{day.date}</p>
                      </div>
                    </div>
                    {expandedDays.includes(day.id) ? 
                      <ChevronUp className="h-4 w-4 text-muted-foreground" /> : 
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    }
                  </div>
                  <p className="text-sm font-medium text-coral-600">{day.region}</p>
                  <p className="text-xs text-muted-foreground mt-1">{day.items.length} activities</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Itinerary Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6 space-y-8">
            {tripData.days.map((day) => (
              <div
                key={day.id}
                className={`transition-all duration-300 ${
                  expandedDays.includes(day.id) ? 'opacity-100' : 'opacity-50'
                }`}
              >
                {expandedDays.includes(day.id) && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{day.emoji}</span>
                        <div>
                          <h2 className="text-2xl font-bold">{day.title}</h2>
                          <p className="text-muted-foreground">{day.date} • {day.region}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Collapse All
                        </Button>
                        <Button variant="outline" size="sm">
                          Expand All
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {day.items.map((item, index) => (
                        <Card
                          key={item.id}
                          className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer hover-scale"
                          style={{ 
                            animationDelay: `${index * 100}ms`,
                            animation: 'fade-in 0.5s ease-out forwards'
                          }}
                        >
                          <div className="aspect-video relative">
                            <img 
                              src={item.image} 
                              alt={item.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
                              {getSourceIcon(item.source)} {item.source}
                            </div>
                            <div className="absolute top-3 right-3 flex gap-2">
                              <Badge className="bg-coral-500 text-white">
                                {getCategoryEmoji(item.category)}
                              </Badge>
                            </div>
                            
                            {/* Hover Actions */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                                <Button size="sm" variant="secondary">
                                  <Edit3 className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="secondary">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                          
                          <CardContent className="p-4">
                            <h3 className="font-semibold mb-1">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.time}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Panel */}
      {isChatOpen && (
        <div className="w-80 bg-white border-l border-border flex flex-col">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold">Trip Assistant</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsChatOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1 p-4 space-y-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm">Want to add a hidden café for Day 2?</p>
            </div>
          </div>
          
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input placeholder="Ask about your trip..." className="flex-1" />
              <Button size="sm" className="bg-coral-500 hover:bg-coral-600">
                Send
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Chat Button */}
      {!isChatOpen && (
        <Button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 bg-coral-500 hover:bg-coral-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}
    </div>
  );
};

export default ItineraryCanvas;