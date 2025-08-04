import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
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
  Edit3,
  Mic,
  Sparkles,
  Play,
  Star,
  Luggage
} from "lucide-react";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [currentView, setCurrentView] = useState("home"); // home, saved, trips, chat

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Filter day sections based on selected location
  const getFilteredDaySections = () => {
    const daySections = [
      {
        id: "bangkok",
        title: "Day 1 & 2: Cultural Heart of Bangkok",
        locations: ["Bangkok"],
        badge: { text: "Creator Favourite", color: "bg-orange-100 text-orange-700 border-orange-200" },
        image: "/lovable-uploads/adc9a232-4eaf-487d-a742-b589704cdc8f.png",
        description: "Bangkok, Thailand's vibrant capital, is known for its ornate temples, bustling street markets, and incredible street food scene. Experience the cultural heart of Thailand through authentic flavors and historic landmarks.",
        tags: ["Street Food Tours", "Temple Visits", "Sky Bar"],
        source: "@bangkok_foodie_tales • Instagram"
      },
      {
        id: "phuket",
        title: "Day 3 & 4: Tropical Paradise in Phuket",
        locations: ["Phuket", "Koh Phi Phi"],
        badge: { text: "Popular with your friends", color: "bg-blue-100 text-blue-700 border-blue-200" },
        image: "/lovable-uploads/70ed9a32-2f15-4f6f-83a8-61719ca3c2de.png",
        description: "Phuket, Thailand's largest island, is known for its beautiful beaches, vibrant nightlife, and rich culture. Visitors can enjoy a variety of outdoor activities, explore local markets and temples, and try delicious Thai cuisine.",
        tags: ["Beach Resorts", "Island Hopping", "Nightlife"],
        source: "Thailand Travel Guide • TikTok"
      },
      {
        id: "krabi",
        title: "Day 5 & 6: Adventure in Krabi",
        locations: ["Krabi"],
        badge: { text: "Creator Favourite", color: "bg-green-100 text-green-700 border-green-200" },
        image: "/lovable-uploads/edfefd31-e9be-4269-a9c8-e098d69fbe86.png",
        description: "Krabi province offers stunning limestone karsts, pristine beaches, and incredible rock climbing opportunities. Experience the natural beauty of Thailand through boat tours and outdoor adventures.",
        tags: ["Limestone Cliffs", "Kayaking", "Rock Climbing"],
        source: "@krabi_adventures • Instagram"
      },
      {
        id: "samui",
        title: "Day 7-9: Luxury Escape in Koh Samui",
        locations: ["Koh Samui"],
        badge: { text: "Popular with your friends", color: "bg-purple-100 text-purple-700 border-purple-200" },
        image: "/lovable-uploads/b7f95780-cac4-461d-a389-3a5cbc33c28d.png",
        description: "Koh Samui offers luxury resorts, pristine beaches, and a more relaxed island atmosphere. Perfect for unwinding with spa treatments, beachfront dining, and sunset views.",
        tags: ["Luxury Resorts", "Spa Treatments", "Beach Clubs"],
        source: "Luxury Travel Thailand • WhatsApp"
      },
      {
        id: "phangan",
        title: "Day 10 & 11: Full Moon Paradise in Koh Phangan",
        locations: ["Koh Phangan"],
        badge: { text: "Creator Favourite", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
        image: "/lovable-uploads/0147a9e5-789a-47b0-b445-73d474847b02.png",
        description: "Koh Phangan is famous for its Full Moon Parties, pristine beaches, and bohemian atmosphere. Experience the island's unique blend of party culture and natural beauty.",
        tags: ["Full Moon Party", "Beach Bars", "Yoga Retreats"],
        source: "@phangan_nights • TikTok"
      }
    ];

    if (selectedFilter === "All") {
      return daySections;
    }

    return daySections.filter(section => 
      section.locations.some(location => 
        location.toLowerCase().includes(selectedFilter.toLowerCase()) ||
        selectedFilter.toLowerCase().includes(location.toLowerCase())
      )
    );
  };

  const handleDayCardClick = (sectionId: string) => {
    navigate('/preview-itinerary');
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
    },
    {
      id: 5,
      type: "beach",
      location: "Krabi",
      source: "IG",
      preview: "Beachfront Resort Paradise",
      timeSaved: "1d ago",
      image: "/lovable-uploads/b7f95780-cac4-461d-a389-3a5cbc33c28d.png"
    },
    {
      id: 6,
      type: "view",
      location: "Koh Phi Phi",
      source: "WA",
      preview: "Aerial Beach Resort View",
      timeSaved: "3d ago",
      image: "/lovable-uploads/70ed9a32-2f15-4f6f-83a8-61719ca3c2de.png"
    },
    {
      id: 7,
      type: "activity",
      location: "Krabi",
      source: "TT",
      preview: "Kayaking Adventure",
      timeSaved: "5d ago",
      image: "/lovable-uploads/0147a9e5-789a-47b0-b445-73d474847b02.png"
    },
    {
      id: 8,
      type: "nature",
      location: "Railay",
      source: "IG",
      preview: "Limestone Cliffs Boat Tour",
      timeSaved: "1w ago",
      image: "/lovable-uploads/edfefd31-e9be-4269-a9c8-e098d69fbe86.png"
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

  // Homepage data
  const forYouData = [
    {
      type: "continuation",
      title: "Continue Planning Bangkok",
      progress: 72,
      image: "/lovable-uploads/adc9a232-4eaf-487d-a742-b589704cdc8f.png",
      timeToComplete: "37s to build"
    },
    {
      type: "new",
      title: "Phuket Luxury Escapes",
      reason: "Based on your saved villas",
      image: "/lovable-uploads/70ed9a32-2f15-4f6f-83a8-61719ca3c2de.png"
    }
  ];

  const jumpBackInData = [
    {
      title: "Bangkok Food Hop",
      lastAccessed: "2 hours ago",
      days: 14,
      image: "/lovable-uploads/adc9a232-4eaf-487d-a742-b589704cdc8f.png"
    },
    {
      title: "Chiang Mai Wildlife",
      lastAccessed: "Yesterday",
      days: 7,
      image: "/lovable-uploads/edfefd31-e9be-4269-a9c8-e098d69fbe86.png"
    }
  ];

  const discoverData = [
    {
      name: "Vietnam Food Trail",
      reason: "Similar to your Bangkok saves",
      image: "/lovable-uploads/b7f95780-cac4-461d-a389-3a5cbc33c28d.png"
    },
    {
      name: "Bali Beach Retreats",
      reason: "Popular with Phuket lovers",
      image: "/lovable-uploads/70ed9a32-2f15-4f6f-83a8-61719ca3c2de.png"
    },
    {
      name: "Malaysian Rainforests",
      reason: "Like your Chiang Mai interests",
      image: "/lovable-uploads/edfefd31-e9be-4269-a9c8-e098d69fbe86.png"
    }
  ];

  const AppSidebar = () => {
    const { state } = useSidebar();

    const navItems = [
      { title: "Home", icon: Home, id: "home", active: currentView === "home" },
      { title: "Saved", icon: Heart, id: "saved", active: currentView === "saved" },
      { title: "Trips", icon: Luggage, id: "trips", active: currentView === "trips" },
      { title: "Chat", icon: MessageCircle, id: "chat", active: currentView === "chat", badge: "3" },
    ];

    return (
      <Sidebar collapsible="icon">
        <SidebarContent>
          <div className="p-4">
            {state === "expanded" && (
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-bold flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-coral" />
                  Verso
                </h1>
                <Button onClick={handleLogout} variant="ghost" size="sm">
                  Logout
                </Button>
              </div>
            )}
            
            {state === "collapsed" && (
              <div className="flex justify-center mb-6">
                <Sparkles className="h-6 w-6 text-coral" />
              </div>
            )}
          </div>

          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                     <SidebarMenuButton 
                      asChild 
                      className={item.active ? "bg-muted text-primary font-medium" : "hover:bg-muted/50"}
                    >
                      <div 
                        className="flex items-center cursor-pointer relative"
                        onClick={() => setCurrentView(item.id)}
                      >
                        <item.icon className="h-4 w-4 mr-3" />
                        {state === "expanded" && (
                          <>
                            <span>{item.title}</span>
                            {item.badge && (
                              <Badge className="ml-auto h-5 w-5 p-0 flex items-center justify-center text-xs bg-coral text-white">
                                {item.badge}
                              </Badge>
                            )}
                          </>
                        )}
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {state === "expanded" && (
            <>
              {/* Platform Filter */}
              <div className="px-4 mt-6">
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
            </>
          )}
        </SidebarContent>
      </Sidebar>
    );
  };

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex w-full bg-background">
        {/* Header with Sidebar Trigger */}
        <header className="fixed top-0 left-0 right-0 h-12 flex items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
          <SidebarTrigger className="ml-2" />
        </header>

        <AppSidebar />

        {/* Main Content */}
        <main className="flex-1 flex flex-col pt-12 pb-20 lg:pb-28">
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 lg:p-6">
              {/* Render different views based on currentView */}
              {currentView === "home" && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Where to today, Ashwin?</h1>
                    <p className="text-muted-foreground">Hey there, I'm here to assist you in planning your experience. Ask me anything travel related.</p>
                  </div>

                  {/* Three Core Sections Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Section 1: For You */}
                    <div className="space-y-4">
                      <h2 className="text-xl font-bold">For You</h2>
                      <div className="space-y-4">
                        {forYouData.map((item, idx) => (
                          <Card key={idx} className="hover:shadow-md transition-all duration-200 cursor-pointer">
                            <div className="relative">
                              <img 
                                src={item.image} 
                                alt={item.title}
                                className="w-full h-32 object-cover rounded-t-lg"
                              />
                              {item.type === "continuation" && (
                                <Badge className="absolute top-2 right-2 bg-coral text-white">
                                  {item.progress}% ready
                                </Badge>
                              )}
                            </div>
                            <CardContent className="p-4">
                              <h3 className="font-medium mb-2">{item.title}</h3>
                              {item.type === "continuation" && (
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  <span>{item.timeToComplete}</span>
                                </div>
                              )}
                              {item.type === "new" && (
                                <p className="text-xs text-muted-foreground">{item.reason}</p>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Section 2: Jump Back In */}
                    <div className="space-y-4">
                      <h2 className="text-xl font-bold">Jump Back In</h2>
                      <div className="space-y-4">
                        {jumpBackInData.map((trip, idx) => (
                          <Card key={idx} className="hover:shadow-md transition-all duration-200 cursor-pointer">
                            <div className="relative">
                              <img 
                                src={trip.image} 
                                alt={trip.title}
                                className="w-full h-32 object-cover rounded-t-lg"
                              />
                            </div>
                            <CardContent className="p-4">
                              <h3 className="font-medium mb-2">{trip.title}</h3>
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>{trip.lastAccessed}</span>
                                <span>{trip.days} days</span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Section 3: Discover */}
                    <div className="space-y-4">
                      <h2 className="text-xl font-bold">Discover South East Asia</h2>
                      <div className="space-y-4">
                        {discoverData.map((destination, idx) => (
                          <Card key={idx} className="hover:shadow-md transition-all duration-200 cursor-pointer">
                            <div className="relative">
                              <img 
                                src={destination.image} 
                                alt={destination.name}
                                className="w-full h-32 object-cover rounded-t-lg"
                              />
                            </div>
                            <CardContent className="p-4">
                              <h3 className="font-medium mb-2">{destination.name}</h3>
                              <p className="text-xs text-muted-foreground">{destination.reason}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentView === "saved" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Saved Content</h1>
                  </div>

                  <Tabs defaultValue="destinations" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="destinations">Destinations</TabsTrigger>
                      <TabsTrigger value="lists">Saved Lists</TabsTrigger>
                      <TabsTrigger value="domestic">Domestic Escapes</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="destinations" className="space-y-6">
                      <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-xl font-bold">Thailand</h2>
                          <Badge variant="secondary">25 saved dreams</Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          {[
                            { name: "Bangkok", count: 12, image: "/lovable-uploads/adc9a232-4eaf-487d-a742-b589704cdc8f.png" },
                            { name: "Phuket", count: 8, image: "/lovable-uploads/70ed9a32-2f15-4f6f-83a8-61719ca3c2de.png" },
                            { name: "Chiang Mai", count: 5, image: "/lovable-uploads/edfefd31-e9be-4269-a9c8-e098d69fbe86.png" }
                          ].map((location, idx) => (
                            <Card key={idx} className="hover:shadow-md transition-all duration-200 cursor-pointer">
                              <div className="relative">
                                <img 
                                  src={location.image} 
                                  alt={location.name}
                                  className="w-full h-24 object-cover rounded-t-lg"
                                />
                                <Badge className="absolute top-2 right-2 bg-coral text-white">
                                  {location.count}
                                </Badge>
                              </div>
                              <CardContent className="p-3">
                                <h3 className="font-medium text-sm">{location.name}</h3>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                        
                        <div className="border-t pt-4">
                          <h3 className="font-medium mb-3">Contributors</h3>
                          <div className="flex items-center gap-4">
                            {[
                              { name: "You", count: 15 },
                              { name: "Sarah", count: 8 },
                              { name: "Raj", count: 2 }
                            ].map((contributor, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-xs font-medium">
                                  {contributor.name[0]}
                                </div>
                                <div>
                                  <p className="text-sm font-medium">{contributor.name}</p>
                                  <p className="text-xs text-muted-foreground">{contributor.count} saves</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="lists" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                          { title: "Top Cocktail Bars in Bangalore", count: "12 venues", image: "/lovable-uploads/c45a5501-917b-40c4-b954-3a8382ce76ce.png", tags: ["Nightlife", "Local"] },
                          { title: "New Restaurants (Last Month)", count: "8 spots", image: "/lovable-uploads/adc9a232-4eaf-487d-a742-b589704cdc8f.png" },
                          { title: "Best Ramen in Your City", count: "5 specialists", image: "/lovable-uploads/b7f95780-cac4-461d-a389-3a5cbc33c28d.png" }
                        ].map((list, idx) => (
                          <Card key={idx} className="hover:shadow-md transition-all duration-200 cursor-pointer">
                            <div className="relative">
                              <img 
                                src={list.image} 
                                alt={list.title}
                                className="w-full h-32 object-cover rounded-t-lg"
                              />
                            </div>
                            <CardContent className="p-4">
                              <h3 className="font-medium mb-2">{list.title}</h3>
                              <p className="text-sm text-muted-foreground mb-2">{list.count}</p>
                              {list.tags && (
                                <div className="flex gap-1">
                                  {list.tags.map((tag, tagIdx) => (
                                    <Badge key={tagIdx} variant="secondary" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="domestic" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                          { title: "Karnataka Monsoons", description: "Coffee estates & waterfalls", season: "June-Sept", image: "/lovable-uploads/edfefd31-e9be-4269-a9c8-e098d69fbe86.png" },
                          { title: "Weekend Hikes near Bangalore", count: "15 trails", distance: "<100km", image: "/lovable-uploads/b7f95780-cac4-461d-a389-3a5cbc33c28d.png" },
                          { title: "Luxury Beach Getaways", locations: ["Goa", "Gokarna"], image: "/lovable-uploads/70ed9a32-2f15-4f6f-83a8-61719ca3c2de.png" }
                        ].map((escape, idx) => (
                          <Card key={idx} className="hover:shadow-md transition-all duration-200 cursor-pointer">
                            <div className="relative">
                              <img 
                                src={escape.image} 
                                alt={escape.title}
                                className="w-full h-32 object-cover rounded-t-lg"
                              />
                            </div>
                            <CardContent className="p-4">
                              <h3 className="font-medium mb-2">{escape.title}</h3>
                              {escape.description && <p className="text-sm text-muted-foreground mb-1">{escape.description}</p>}
                              {escape.season && <p className="text-xs text-muted-foreground">Season: {escape.season}</p>}
                              {escape.count && <p className="text-sm text-muted-foreground mb-1">{escape.count}</p>}
                              {escape.distance && <p className="text-xs text-muted-foreground">Distance: {escape.distance}</p>}
                              {escape.locations && (
                                <div className="flex gap-1 mt-2">
                                  {escape.locations.map((location, locIdx) => (
                                    <Badge key={locIdx} variant="secondary" className="text-xs">
                                      {location}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}

              {currentView === "trips" && (
                <div className="space-y-6">
                  {/* Header */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-2xl font-bold">Welcome back, Ashwin</h1>
                      <p className="text-muted-foreground">We've organized your 25 saved dreams from Thailand into a complete itinerary</p>
                    </div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <Badge variant="secondary" className="text-coral font-medium">72% ready</Badge>
                        <Badge variant="secondary">6 must-eats</Badge>
                        <Badge variant="secondary">3 cafes</Badge>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate('/preview-itinerary')}
                          className="flex items-center gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          Full Itinerary
                        </Button>
                      </div>
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

                  {/* Day-wise Itinerary Sections */}
                  <div className="space-y-8">
                    {getFilteredDaySections().map((section) => (
                      <div 
                        key={section.id} 
                        className="space-y-4 cursor-pointer hover:shadow-lg transition-all duration-200 p-4 rounded-lg border border-transparent hover:border-border"
                        onClick={() => handleDayCardClick(section.id)}
                      >
                        <div className="flex items-center justify-between">
                          <h2 className="text-xl font-bold">{section.title}</h2>
                          <Badge className={section.badge.color}>{section.badge.text}</Badge>
                        </div>
                        <div className="lg:flex lg:gap-6">
                          <div className="lg:w-1/3 mb-4 lg:mb-0">
                            <img 
                              src={section.image} 
                              alt={section.title}
                              className="w-full h-48 object-cover rounded-lg"
                            />
                          </div>
                          <div className="lg:w-2/3 space-y-3">
                            <p className="text-muted-foreground">
                              {section.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {section.tags.map((tag, idx) => (
                                <Badge key={idx} variant="secondary">{tag}</Badge>
                              ))}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Source: <a href="#" className="text-coral hover:underline">{section.source}</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentView === "chat" && (
                <div className="space-y-6 max-w-4xl mx-auto">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto">
                      <div className="w-16 h-16 bg-gradient-to-br from-coral to-orange-300 rounded-full flex items-center justify-center">
                        🌍
                      </div>
                    </div>
                    <h1 className="text-3xl font-bold">Where to today, Ashwin?</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      Hey there, I'm here to assist you in planning your experience. Ask me anything travel related.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground mb-3">Quick suggestions:</p>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          🌿 <span>Add nature day</span>
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          🍜 <span>More food experiences</span>
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          ⚡ <span>Faster pace</span>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <Input 
                        placeholder="Ask anything..." 
                        className="pr-24 rounded-full border-2 bg-background h-12"
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full hover:bg-muted">
                          <Mic className="h-4 w-4 text-coral" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full hover:bg-muted">
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full hover:bg-muted">
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
                      <span className="w-4 h-4 rounded-full bg-muted flex items-center justify-center">⚠</span>
                      Verso can make mistakes. Check important info.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Sticky Chat Interface - Always Visible at Bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40 lg:block hidden">
          <div className="p-4 space-y-3">
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-sm text-muted-foreground">Let me know if you'd like to adjust the pace or add special interests!</p>
            </div>
            
            <div className="space-y-2">
              <div className="relative">
                <Input 
                  placeholder="Ask anything..." 
                  className="pr-24 rounded-full border-2 bg-background"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full hover:bg-muted">
                    <Mic className="h-4 w-4 text-coral" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full hover:bg-muted">
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full hover:bg-muted">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <span className="w-4 h-4 rounded-full bg-muted flex items-center justify-center">⚠</span>
                Verso can make mistakes. Check important info.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-10">
          <div className="grid grid-cols-4 gap-1 p-2">
            <Button 
              variant={currentView === "home" ? "default" : "ghost"} 
              size="sm" 
              className="flex flex-col gap-1 h-auto py-2"
              onClick={() => setCurrentView("home")}
            >
              <Home className="h-4 w-4" />
              <span className="text-xs">Home</span>
            </Button>
            <Button 
              variant={currentView === "saved" ? "default" : "ghost"} 
              size="sm" 
              className="flex flex-col gap-1 h-auto py-2"
              onClick={() => setCurrentView("saved")}
            >
              <Heart className="h-4 w-4" />
              <span className="text-xs">Saved</span>
            </Button>
            <Button 
              variant={currentView === "trips" ? "default" : "ghost"} 
              size="sm" 
              className="flex flex-col gap-1 h-auto py-2"
              onClick={() => setCurrentView("trips")}
            >
              <Luggage className="h-4 w-4" />
              <span className="text-xs">Trips</span>
            </Button>
            <Button 
              variant={currentView === "chat" ? "default" : "ghost"} 
              size="sm" 
              className="flex flex-col gap-1 h-auto py-2 relative"
              onClick={() => setCurrentView("chat")}
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs">Chat</span>
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs bg-coral text-white">
                3
              </Badge>
            </Button>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;