import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign, 
  MessageCircle, 
  Plus, 
  Heart, 
  Home,
  Filter,
  Clock,
  ChevronRight,
  Eye,
  Edit3
} from "lucide-react";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Sample data
  const trips = [
    {
      title: "Bangkok Street Food Hop",
      progress: 72,
      stats: "6 eats • 3 cafes",
      locations: ["Chatuchak", "Sky Bar"],
      timeToComplete: "37s to build"
    },
    {
      title: "Phuket Luxury Escape", 
      progress: 45,
      stats: "2 villas • 4 beaches",
      locations: ["Patong", "Kata Beach"],
      timeToComplete: "2m to complete"
    }
  ];

  const savedContent = [
    {
      id: 1,
      type: "cafe",
      location: "Bangkok",
      source: "IG",
      preview: "Chatuchak Market Street Food",
      timeSaved: "4mo ago",
      image: "/lovable-uploads/adc9a232-4eaf-487d-a742-b589704cdc8f.png"
    },
    {
      id: 2,
      type: "stay",
      location: "Phuket", 
      source: "WA",
      preview: "Private Villa Pool View",
      price: "$220/night",
      image: "/lovable-uploads/8006d940-cc72-415d-ad51-54765e172984.png"
    },
    {
      id: 3,
      type: "activity",
      location: "Krabi",
      source: "TT", 
      preview: "Railay Beach Kayaking",
      timeSaved: "1w ago",
      image: "/lovable-uploads/7b58305b-628b-4e49-819e-c86113305a31.png"
    },
    {
      id: 4,
      type: "view",
      location: "Bangkok",
      source: "IG",
      preview: "Sky Bar Rooftop Experience", 
      timeSaved: "2d ago",
      image: "/lovable-uploads/c45a5501-917b-40c4-b954-3a8382ce76ce.png"
    }
  ];

  const TripCard = ({ trip }: { trip: typeof trips[0] }) => (
    <Card className="mb-4 hover:shadow-md transition-all duration-200 cursor-pointer border-l-4 border-l-coral">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{trip.title}</CardTitle>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{trip.stats}</span>
          <Clock className="h-3 w-3" />
          <span>{trip.timeToComplete}</span>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">{trip.progress}% ready</span>
          <span className="text-xs font-medium text-coral">{trip.progress}%</span>
        </div>
        <Progress value={trip.progress} className="h-2 mb-2" />
        <div className="flex gap-1">
          {trip.locations.map((location, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs px-2 py-0">
              {location}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const SavedCard = ({ item }: { item: typeof savedContent[0] }) => {
    const sourceColors = {
      IG: "bg-gradient-to-r from-purple-500 to-pink-500",
      WA: "bg-green-500", 
      TT: "bg-black"
    };
    
    return (
      <Card className="group hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer">
        <div className="relative">
          <img 
            src={item.image} 
            alt={item.preview}
            className="w-full h-32 object-cover rounded-t-lg"
          />
          <Badge 
            className={`absolute top-2 right-2 text-white text-xs ${sourceColors[item.source as keyof typeof sourceColors]}`}
          >
            {item.source}
          </Badge>
        </div>
        <CardContent className="p-3">
          <div className="flex items-start justify-between mb-1">
            <h4 className="font-medium text-sm leading-tight">{item.preview}</h4>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{item.location}</span>
            </div>
            <span>{item.price || item.timeSaved}</span>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 bottom-0 w-60 bg-card border-r border-border">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-xl font-bold">Verso</h1>
            <Button onClick={handleLogout} variant="ghost" size="sm">
              Logout
            </Button>
          </div>
          
          <nav className="space-y-2 mb-8">
            <Button variant="default" className="w-full justify-start">
              <Home className="h-4 w-4 mr-2" />
              Trips
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Heart className="h-4 w-4 mr-2" />
              Saved
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Plus className="h-4 w-4 mr-2" />
              New Trip
            </Button>
            <Button variant="ghost" className="w-full justify-start relative">
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat
              <Badge className="ml-auto h-5 w-5 p-0 flex items-center justify-center text-xs bg-coral text-white">3</Badge>
            </Button>
          </nav>

          {/* Platform Filter */}
          <Card className="mb-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Saved From</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                  <span>Instagram</span>
                </div>
                <span className="text-muted-foreground">8</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>WhatsApp</span>
                </div>
                <span className="text-muted-foreground">6</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-black"></div>
                  <span>TikTok</span>
                </div>
                <span className="text-muted-foreground">3</span>
              </div>
            </CardContent>
          </Card>

          {/* Trip Cards */}
          <div>
            <h3 className="font-medium text-sm mb-3 text-muted-foreground">Recent Trips</h3>
            {trips.map((trip, idx) => (
              <TripCard key={idx} trip={trip} />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-60">
        <div className="lg:grid lg:grid-cols-3 lg:gap-6 p-4 lg:p-6">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold">Welcome back, Ashwin</h1>
                <p className="text-muted-foreground">17 saved dreams from Thailand</p>
              </div>

              {/* Filters */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {["All", "Bangkok", "Phuket", "Chiang Mai", "Krabi"].map((filter) => (
                    <Button
                      key={filter}
                      variant={selectedFilter === filter ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedFilter(filter)}
                      className="whitespace-nowrap"
                    >
                      {filter}
                    </Button>
                  ))}
                </div>
                
                <div className="hidden lg:flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">When</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">2 travelers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Budget</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedContent.map((item) => (
                <SavedCard key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Itinerary Preview Panel */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Bangkok Street Food Hop
                  <Badge variant="secondary" className="text-coral">72% ready</Badge>
                </CardTitle>
                <p className="text-sm text-muted-foreground">6 must-eats • 3 cafes • 37s to build</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold">🍜</div>
                    <div className="text-sm font-medium">6</div>
                    <div className="text-xs text-muted-foreground">Must-Eats</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">☕</div>
                    <div className="text-sm font-medium">3</div>
                    <div className="text-xs text-muted-foreground">Cafes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">📍</div>
                    <div className="text-sm font-medium">8</div>
                    <div className="text-xs text-muted-foreground">Locations</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Day 1 Preview</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                      <img 
                        src="/lovable-uploads/adc9a232-4eaf-487d-a742-b589704cdc8f.png" 
                        alt="Chatuchak Market"
                        className="w-8 h-8 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">Chatuchak Market</div>
                        <div className="text-xs text-muted-foreground">9AM • Street Food Tour</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                      <img 
                        src="/lovable-uploads/c45a5501-917b-40c4-b954-3a8382ce76ce.png" 
                        alt="Sky Bar Bangkok"
                        className="w-8 h-8 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">Sky Bar Bangkok</div>
                        <div className="text-xs text-muted-foreground">1PM • Rooftop Experience</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button 
                    className="w-full bg-coral hover:bg-coral/90 text-white"
                    onClick={() => navigate('/preview-itinerary')}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview Full Itinerary
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Edit3 className="h-4 w-4 mr-2" />
                    Customize
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="grid grid-cols-4 gap-1 p-2">
          <Button variant="default" size="sm" className="flex flex-col gap-1 h-auto py-2">
            <Home className="h-4 w-4" />
            <span className="text-xs">Trips</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col gap-1 h-auto py-2">
            <Heart className="h-4 w-4" />
            <span className="text-xs">Saved</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col gap-1 h-auto py-2">
            <Plus className="h-4 w-4" />
            <span className="text-xs">New</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex flex-col gap-1 h-auto py-2 relative"
            onClick={() => setChatOpen(true)}
          >
            <MessageCircle className="h-4 w-4" />
            <span className="text-xs">Chat</span>
            <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs bg-coral text-white">3</Badge>
          </Button>
        </div>
      </div>

      {/* Chat FAB (Desktop) */}
      <Button
        className="hidden lg:flex fixed bottom-6 right-6 h-14 w-14 rounded-full bg-coral hover:bg-coral/90 text-white shadow-lg"
        onClick={() => setChatOpen(true)}
      >
        <MessageCircle className="h-6 w-6" />
        <Badge className="absolute -top-2 -right-2 h-6 w-6 p-0 flex items-center justify-center text-xs bg-secondary text-white">
          3
        </Badge>
      </Button>

      {/* Chat Modal */}
      {chatOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 lg:bg-transparent lg:pointer-events-none">
          <div className="lg:fixed lg:bottom-20 lg:right-6 lg:w-80 lg:h-96 bg-card lg:rounded-lg lg:shadow-xl lg:pointer-events-auto h-full w-full lg:h-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-medium">Trip Assistant</h3>
              <Button variant="ghost" size="sm" onClick={() => setChatOpen(false)}>×</Button>
            </div>
            <div className="p-4 space-y-4 h-64 overflow-y-auto">
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-sm">I found 3 boutique hotels near your saved cafes in Bangkok. Want to see them?</p>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" variant="outline" className="text-xs">Show me</Button>
                  <Button size="sm" variant="outline" className="text-xs">Add to trip</Button>
                </div>
              </div>
            </div>
            <div className="p-4 border-t">
              <Input placeholder="Ask anything travel related..." />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;