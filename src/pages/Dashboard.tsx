import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import { format, addDays, differenceInDays } from "date-fns";
import { cn } from "@/lib/utils";
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
  Luggage,
  CalendarIcon,
  Minus,
  Coffee,
  UtensilsCrossed,
  Mountain,
  Baby,
  UsersIcon,
  Camera,
  Compass,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  ChevronDown
} from "lucide-react";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [currentView, setCurrentView] = useState("trips"); // home, saved, trips, chat
  
  // Modal states
  const [showDateModal, setShowDateModal] = useState(false);
  const [showTravelersModal, setShowTravelersModal] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showMustEatsModal, setShowMustEatsModal] = useState(false);
  const [showExperiencesModal, setShowExperiencesModal] = useState(false);
  
  // Trip planning state
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [selectedTravelerType, setSelectedTravelerType] = useState("couple");
  const [selectedBudget, setSelectedBudget] = useState("sensible");
  const [selectedCountry, setSelectedCountry] = useState("Thailand");
  const [countryQuery, setCountryQuery] = useState("");
  const [countryPopoverOpen, setCountryPopoverOpen] = useState(false);

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
    navigate(`/preview-itinerary?tripId=thailand-2024-${sectionId}`);
  };

  // Sample data for modals
  const progressData = {
    completed: [
      { title: "Accommodation", cost: "$840", status: "complete" },
      { title: "Local Transportation", cost: "$150", status: "complete" }
    ],
    pending: [
      { title: "Flights", cost: "$320", status: "pending" },
      { title: "Activities", completed: 4, total: 6, cost: "$180", status: "partial" }
    ],
    totalCost: 1490
  };

  const mustEatsData = [
    {
      name: "Jay Fai",
      type: "Michelin Star Street Food",
      location: "Bangkok",
      source: "@bangkok_foodie (IG)",
      image: "/lovable-uploads/adc9a232-4eaf-487d-a742-b589704cdc8f.png"
    },
    {
      name: "Thipsamai Pad Thai",
      type: "World Famous",
      location: "Bangkok",
      source: "Sarah's save",
      image: "/lovable-uploads/c45a5501-917b-40c4-b954-3a8382ce76ce.png"
    },
    {
      name: "Kan Eang@Pier",
      type: "Seafood Paradise",
      location: "Phuket",
      source: "@phuket_eats (TikTok)",
      image: "/lovable-uploads/70ed9a32-2f15-4f6f-83a8-61719ca3c2de.png"
    }
  ];

  const experiencesData = [
    {
      name: "Khlong Boat Tour",
      type: "Hidden Canal Adventure",
      location: "Bangkok",
      uniqueness: "Off-beat",
      image: "/lovable-uploads/adc9a232-4eaf-487d-a742-b589704cdc8f.png"
    },
    {
      name: "Ethical Elephant Sanctuary",
      type: "Wildlife",
      location: "Chiang Mai",
      uniqueness: "Conservation Focused",
      image: "/lovable-uploads/edfefd31-e9be-4269-a9c8-e098d69fbe86.png"
    },
    {
      name: "Secret Lagoon Kayaking",
      type: "Hidden Paradise",
      location: "Krabi",
      uniqueness: "Local Secret",
      image: "/lovable-uploads/7b58305b-628b-4e49-819e-c86113305a31.png"
    }
  ];

  const getDaysCount = () => {
    if (startDate && endDate) {
      return differenceInDays(endDate, startDate) + 1;
    }
    return 14; // default
  };

  // Sample data
  const trips = [
    {
      id: "thailand-2024-bangkok",
      title: "Bangkok Food Hop",
      progress: 72,
      stats: "6 eats • 3 cafes",
      locations: ["Chatuchak", "Sky Bar"],
      timeToComplete: "Building... 37s left",
      isBuilding: true
    },
    {
      id: "thailand-2024-phuket",
      title: "Phuket Luxury Escape", 
      progress: 45,
      stats: "2 villas • 4 beaches",
      locations: ["Patong", "Kata Beach"],
      timeToComplete: "Trip last updated 2h ago",
      isBuilding: false
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
    <Card className="mb-4 hover:shadow-md transition-all duration-200 cursor-pointer border-l-4 border-l-coral hover:scale-[1.02]">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{trip.title}</CardTitle>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{trip.stats}</span>
          <Clock className="h-3 w-3" />
          <span className={trip.isBuilding ? "text-coral font-medium" : ""}>{trip.timeToComplete}</span>
          {trip.isBuilding && <div className="w-2 h-2 bg-coral rounded-full animate-pulse" />}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">{trip.progress}% ready</span>
          <span className="text-xs font-medium text-coral">{trip.progress}%</span>
        </div>
        <Progress value={trip.progress} className="h-2 mb-2" />
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {trip.locations.map((location, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs px-2 py-0">
                {location}
              </Badge>
            ))}
          </div>
          <Button
            size="sm"
            className="h-6 px-2 text-xs bg-coral hover:bg-coral-dark text-white"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/preview-itinerary?tripId=${trip.id}`);
            }}
          >
            Continue
          </Button>
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

    const getSourceHandle = (source: string) => {
      switch(source) {
        case 'IG': return '@bangkok_eats';
        case 'WA': return 'Sarah';
        case 'TT': return '@tiktok_travel';
        default: return source;
      }
    };

    const isLinkedToTrip = Math.random() > 0.5; // Mock logic
    
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
          {isLinkedToTrip && (
            <Badge className="absolute top-2 left-2 bg-coral text-white text-xs">
              Used in Bangkok Trip - Day 2
            </Badge>
          )}
        </div>
        <CardContent className="p-3">
          <div className="flex items-start justify-between mb-1">
            <h4 className="font-medium text-sm leading-tight">{item.preview}</h4>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{item.location}</span>
            </div>
            <span>{item.price || item.timeSaved}</span>
          </div>
          <div className="text-xs text-muted-foreground">
            {getSourceHandle(item.source)} ({item.source})
          </div>
          <div className="flex gap-1 mt-2">
            {/* Theme chips */}
            <Badge variant="outline" className="text-xs">Local</Badge>
            <Badge variant="outline" className="text-xs">Vegan</Badge>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Homepage data
  const forYouData = [
    {
      type: "continuation",
      title: "Bangkok Food Hop",
      progress: 72,
      image: "/lovable-uploads/adc9a232-4eaf-487d-a742-b589704cdc8f.png",
      timeToComplete: "Building... 37s left",
      tripId: "thailand-2024-bangkok",
      isBuilding: true
    },
    {
      type: "new",
      title: "Phuket Luxury Escapes",
      reason: "Based on your saved villas",
      image: "/lovable-uploads/70ed9a32-2f15-4f6f-83a8-61719ca3c2de.png",
      tripId: "thailand-2024-phuket"
    }
  ];

  const jumpBackInData = [
    {
      title: "Bangkok Food Hop",
      lastAccessed: "2 hours ago",
      days: 11,
      image: "/lovable-uploads/adc9a232-4eaf-487d-a742-b589704cdc8f.png",
      tripId: "thailand-2024-bangkok"
    },
    {
      title: "Chiang Mai Wildlife",
      lastAccessed: "Yesterday",
      days: 7,
      image: "/lovable-uploads/edfefd31-e9be-4269-a9c8-e098d69fbe86.png",
      tripId: "thailand-2024-chiang-mai"
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

  const guidesData = [
    {
      title: "Thailand",
      places: 5,
      image: "/lovable-uploads/adc9a232-4eaf-487d-a742-b589704cdc8f.png",
      author: "lucieslivkova",
      location: "Thailand"
    },
    {
      title: "Toddlers and Thai adventure",
      places: 24,
      image: "/lovable-uploads/70ed9a32-2f15-4f6f-83a8-61719ca3c2de.png",
      author: "nomaradness",
      location: "Thailand"
    },
    {
      title: "Krabi Nature Circuits",
      places: 31,
      image: "/lovable-uploads/edfefd31-e9be-4269-a9c8-e098d69fbe86.png",
      author: "verso_travel",
      location: "Thailand"
    },
    {
      title: "Bangkok Foodie Week",
      places: 18,
      image: "/lovable-uploads/c45a5501-917b-40c4-b954-3a8382ce76ce.png",
      author: "verified_creator",
      location: "Thailand"
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
                    <TooltipProvider>
                      <Tooltip delayDuration={1000}>
                        <TooltipTrigger asChild>
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
                        </TooltipTrigger>
                        {state === "collapsed" && (
                          <TooltipContent side="right">
                            <p>{item.title}</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
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
      <div className="min-h-screen flex w-full overflow-x-hidden bg-background">
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
    <div className="space-y-4 mb-4">
      <div className="flex items-center gap-3">
        <Popover open={countryPopoverOpen} onOpenChange={setCountryPopoverOpen}>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-1 font-semibold">
              {selectedCountry}
              <ChevronDown className="h-4 w-4" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={countryQuery || selectedCountry}
                  onChange={(e) => setCountryQuery(e.target.value)}
                  className="pl-9 rounded-full"
                />
              </div>
              <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Use current location
              </button>
              <div>
                <div className="text-xs text-muted-foreground mb-2">Recent locations</div>
                <div className="space-y-2">
                  {[
                    { name: "Thailand", sub: "Country", img: "/lovable-uploads/adc9a232-4eaf-487d-a742-b589704cdc8f.png" },
                    { name: "Norway", sub: "Country", img: "/lovable-uploads/9ad3c331-19eb-4ce1-9065-2a902eda5bdc.png" },
                    { name: "Southern Province", sub: "Sri Lanka", img: "/lovable-uploads/70ed9a32-2f15-4f6f-83a8-61719ca3c2de.png" },
                    { name: "Bali", sub: "Indonesia", img: "/lovable-uploads/8006d940-cc72-415d-ad51-54765e172984.png" },
                    { name: "Bengaluru", sub: "Karnataka, India", img: "/lovable-uploads/821fb983-af77-4d9e-b33e-effe2be267b1.png" }
                  ].map((c) => (
                    <button
                      key={c.name}
                      onClick={() => { setSelectedCountry(c.name); setCountryPopoverOpen(false); }}
                      className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-muted"
                    >
                      <img src={c.img} alt={c.name} className="w-9 h-9 rounded-md object-cover" />
                      <div className="text-left">
                        <div className="text-sm font-medium">{c.name}</div>
                        <div className="text-xs text-muted-foreground">{c.sub}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search" className="pl-9 h-11 rounded-full bg-muted" />
        </div>

        <Button variant="outline" className="rounded-full">
          <Filter className="h-4 w-4 mr-2" /> Filters
        </Button>
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Where to today, Ashwin?</h1>
        <p className="text-muted-foreground">Hey there, I'm here to assist you in planning your experience. Ask me anything travel related.</p>
      </div>
    </div>

    {/* Three Core Sections Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Section 1: For You */}
                    <div className="space-y-4">
                      <h2 className="text-xl font-bold">For You</h2>
                      <div className="space-y-4">
                        {forYouData.map((item, idx) => (
                          <Card key={idx} className="cursor-pointer hover:shadow-lg transition-shadow">
                            <div className="relative">
                              <img src={item.image} alt={item.title} className="w-full h-40 object-cover rounded-t-lg" />
                              {item.type === "continuation" && (
                                <div className="absolute top-2 right-2 bg-coral text-white px-2 py-1 rounded text-xs font-medium">
                                  {item.progress}% ready
                                </div>
                              )}
                            </div>
                            <CardContent className="p-4">
                              <h3 className="font-semibold mb-2">{item.title}</h3>
                              {item.reason && <p className="text-sm text-muted-foreground">{item.reason}</p>}
                              {item.timeToComplete && <p className="text-sm text-coral">{item.timeToComplete}</p>}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Section 2: Jump Back In */}
                    <div className="space-y-4">
                      <h2 className="text-xl font-bold">Jump Back In</h2>
                      <div className="space-y-4">
                        {jumpBackInData.map((item, idx) => (
                          <Card key={idx} className="cursor-pointer hover:shadow-lg transition-shadow">
                            <div className="relative">
                              <img src={item.image} alt={item.title} className="w-full h-40 object-cover rounded-t-lg" />
                            </div>
                            <CardContent className="p-4">
                              <h3 className="font-semibold mb-2">{item.title}</h3>
                              <div className="flex justify-between text-sm text-muted-foreground">
                                <span>{item.lastAccessed}</span>
                                <span>{item.days} days</span>
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
                        {discoverData.map((item, idx) => (
                          <Card key={idx} className="cursor-pointer hover:shadow-lg transition-shadow">
                            <div className="relative">
                              <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-t-lg" />
                            </div>
                            <CardContent className="p-4">
                              <h3 className="font-semibold mb-2">{item.name}</h3>
                              <p className="text-sm text-muted-foreground">{item.reason}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Guides Section */}
                <section className="space-y-4 mt-6">
                  <h2 className="text-xl font-bold">Guides</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {guidesData.map((g, idx) => (
                      <Card key={idx} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                        <div className="relative">
                          <img src={g.image} alt={`${g.title} guide`} className="w-full h-56 object-cover" />
                          <Badge className="absolute top-2 left-2 bg-black/70 text-white text-xs">
                            {g.places} places
                          </Badge>
                          <div className="absolute right-2 top-2 bg-white/80 rounded-full px-2 py-1 text-[10px] font-medium">
                            Verified
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold leading-tight">{g.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <MapPin className="h-3 w-3" /> {g.location}
                          </div>
                          <div className="text-xs text-muted-foreground mt-2">by {g.author}</div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          )}

              {currentView === "saved" && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Your Saved Travel Dreams</h1>
                    <p className="text-muted-foreground">All your travel inspiration in one place</p>
                  </div>

                  <Tabs defaultValue="destinations" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="destinations">Destinations</TabsTrigger>
                      <TabsTrigger value="saved-lists">Saved Lists</TabsTrigger>
                      <TabsTrigger value="domestic">Domestic Escapes</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="destinations" className="space-y-6">
                      <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold">Thailand</h3>
                            <p className="text-muted-foreground">25 saved dreams</p>
                          </div>
                          <div className="flex -space-x-2">
                            <div className="w-8 h-8 rounded-full bg-coral text-white flex items-center justify-center text-sm font-medium border-2 border-white">A</div>
                            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-medium border-2 border-white">S</div>
                            <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-medium border-2 border-white">R</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {[
                            { name: "Bangkok", count: 12, image: "/lovable-uploads/adc9a232-4eaf-487d-a742-b589704cdc8f.png" },
                            { name: "Phuket", count: 8, image: "/lovable-uploads/70ed9a32-2f15-4f6f-83a8-61719ca3c2de.png" },
                            { name: "Chiang Mai", count: 5, image: "/lovable-uploads/edfefd31-e9be-4269-a9c8-e098d69fbe86.png" }
                          ].map((location) => (
                            <Card key={location.name} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                              <div className="relative">
                                <img src={location.image} alt={location.name} className="w-full h-32 object-cover" />
                                <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                                  <div className="text-white">
                                    <h4 className="font-semibold">{location.name}</h4>
                                    <p className="text-sm opacity-90">{location.count} saves</p>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </Card>

                      {/* UAE destination */}
                      <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold">United Arab Emirates</h3>
                            <p className="text-muted-foreground">18 saved dreams</p>
                          </div>
                          <div className="flex -space-x-2">
                            <div className="w-8 h-8 rounded-full bg-coral text-white flex items-center justify-center text-sm font-medium border-2 border-white">A</div>
                            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-medium border-2 border-white">S</div>
                            <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-medium border-2 border-white">R</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            { name: "Dubai", count: 10, image: "/lovable-uploads/75ae7313-3617-4155-aa86-a98edcbc0d16.png" },
                            { name: "Abu Dhabi", count: 8, image: "/lovable-uploads/944ceb5e-c60e-4779-83d5-5f2c5187cc4e.png" }
                          ].map((location) => (
                            <Card key={location.name} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                              <div className="relative">
                                <img src={location.image} alt={location.name} className="w-full h-32 object-cover" />
                                <div className="absolute inset-0 bg-black/30 flex items-end p-4">
                                  <div className="text-white">
                                    <h4 className="font-semibold">{location.name}</h4>
                                    <p className="text-sm opacity-90">{location.count} saves</p>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </Card>
                    </TabsContent>

                    <TabsContent value="saved-lists" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                          { title: "Top Cocktail Bars in Bangalore", count: "12 venues", image: "/lovable-uploads/ea4841bb-744b-4573-a24d-1cc19c322390.png", tags: ["Nightlife", "Local"] },
                          { title: "New Restaurants (Last Month)", count: "8 spots", image: "/lovable-uploads/ee81d6e4-f144-4d3e-8320-5fd7e161f776.png", tags: ["Food", "New"] },
                          { title: "Best Ramen in Your City", count: "5 specialists", image: "/lovable-uploads/70ed9a32-2f15-4f6f-83a8-61719ca3c2de.png", tags: ["Japanese", "Comfort"] }
                        ].map((list, idx) => (
                          <Card key={idx} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                            <img src={list.image} alt={list.title} className="w-full h-40 object-cover" />
                            <CardContent className="p-4">
                              <h4 className="font-semibold mb-2">{list.title}</h4>
                              <p className="text-sm text-muted-foreground mb-3">{list.count}</p>
                              <div className="flex gap-1">
                                {list.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                                ))}
                              </div>
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
                          { title: "Luxury Beach Getaways", locations: "Goa • Gokarna", image: "/lovable-uploads/70ed9a32-2f15-4f6f-83a8-61719ca3c2de.png" }
                        ].map((escape, idx) => (
                          <Card key={idx} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                            <img src={escape.image} alt={escape.title} className="w-full h-40 object-cover" />
                            <CardContent className="p-4">
                              <h4 className="font-semibold mb-2">{escape.title}</h4>
                              <p className="text-sm text-muted-foreground mb-2">{escape.description}</p>
                              {escape.season && <Badge variant="outline" className="text-xs">{escape.season}</Badge>}
                              {escape.count && <Badge variant="outline" className="text-xs">{escape.count}</Badge>}
                              {escape.distance && <Badge variant="outline" className="text-xs">{escape.distance}</Badge>}
                              {escape.locations && <Badge variant="outline" className="text-xs">{escape.locations}</Badge>}
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
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Your Thailand Adventure</h1>
                    <p className="text-muted-foreground">We've organized your trip into a beautiful itinerary ready for your journey.</p>
                  </div>

                  {/* Interactive Filters */}
                  <div className="flex gap-2 mb-6 overflow-x-auto whitespace-nowrap sm:flex-wrap no-scrollbar">
                    <Dialog open={showDateModal} onOpenChange={setShowDateModal}>
                      <DialogTrigger asChild>
                        <div className="flex items-center gap-1 px-3 py-2 rounded-full bg-muted/50 text-sm cursor-pointer hover:bg-muted transition-colors">
                          <Calendar className="h-4 w-4" />
                          <span>{startDate && endDate ? `${format(startDate, "MMM d")} - ${format(endDate, "MMM d")}` : "When"}</span>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Select Travel Dates</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                           <div className="space-y-4">
                             <div>
                               <label className="text-sm font-medium mb-2 block">Start Date</label>
                               <CalendarComponent
                                 mode="single"
                                 selected={startDate}
                                 onSelect={setStartDate}
                                 className="rounded-md border w-full"
                               />
                             </div>
                             <div>
                               <label className="text-sm font-medium mb-2 block">End Date</label>
                               <CalendarComponent
                                 mode="single"
                                 selected={endDate}
                                 onSelect={setEndDate}
                                 disabled={(date) => startDate ? date < startDate : false}
                                 className="rounded-md border w-full"
                               />
                             </div>
                           </div>
                          {startDate && endDate && (
                            <div className="text-center p-4 bg-muted rounded-lg">
                              <span className="text-lg font-semibold">{getDaysCount()} days</span>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Dialog open={showTravelersModal} onOpenChange={setShowTravelersModal}>
                      <DialogTrigger asChild>
                        <div className="flex items-center gap-1 px-3 py-2 rounded-full bg-muted/50 text-sm cursor-pointer hover:bg-muted transition-colors">
                          <Users className="h-4 w-4" />
                          <span>{adults + children} travelers</span>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Who's Traveling?</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">Adults</span>
                              <div className="flex items-center gap-3">
                                <Button variant="outline" size="sm" onClick={() => setAdults(Math.max(1, adults - 1))}>
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-8 text-center">{adults}</span>
                                <Button variant="outline" size="sm" onClick={() => setAdults(adults + 1)}>
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-medium">Children</span>
                              <div className="flex items-center gap-3">
                                <Button variant="outline" size="sm" onClick={() => setChildren(Math.max(0, children - 1))}>
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-8 text-center">{children}</span>
                                <Button variant="outline" size="sm" onClick={() => setChildren(children + 1)}>
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">Travel Style</label>
                            <div className="grid grid-cols-2 gap-2">
                              {[
                                { id: "couple", label: "Couple", icon: "💑" },
                                { id: "friends", label: "Friends", icon: "👥" },
                                { id: "solo", label: "Solo", icon: "🚶" },
                                { id: "family", label: "Family", icon: "👨‍👩‍👧‍👦" }
                              ].map((type) => (
                                <button
                                  key={type.id}
                                  onClick={() => setSelectedTravelerType(type.id)}
                                  className={cn(
                                    "p-3 rounded-lg border text-sm font-medium transition-colors",
                                    selectedTravelerType === type.id 
                                      ? "bg-primary text-primary-foreground border-primary" 
                                      : "bg-background hover:bg-muted"
                                  )}
                                >
                                  <div className="text-lg mb-1">{type.icon}</div>
                                  {type.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Dialog open={showBudgetModal} onOpenChange={setShowBudgetModal}>
                      <DialogTrigger asChild>
                        <div className="flex items-center gap-1 px-3 py-2 rounded-full bg-muted/50 text-sm cursor-pointer hover:bg-muted transition-colors">
                          <DollarSign className="h-4 w-4" />
                          <span>Budget</span>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>What's Your Budget?</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { id: "budget", label: "Budget", icon: "💰", range: "$", desc: "Value conscious" },
                            { id: "sensible", label: "Sensible", icon: "💸", range: "$$", desc: "Good balance" },
                            { id: "upscale", label: "Upscale", icon: "✨", range: "$$$", desc: "Premium choices" },
                            { id: "luxury", label: "Luxury", icon: "💎", range: "$$$$", desc: "No compromises" }
                          ].map((budget) => (
                            <button
                              key={budget.id}
                              onClick={() => setSelectedBudget(budget.id)}
                              className={cn(
                                "p-4 rounded-lg border text-left transition-colors",
                                selectedBudget === budget.id 
                                  ? "bg-primary text-primary-foreground border-primary" 
                                  : "bg-background hover:bg-muted"
                              )}
                            >
                              <div className="text-2xl mb-2">{budget.icon}</div>
                              <div className="font-medium">{budget.label}</div>
                              <div className="text-sm opacity-70">{budget.range}</div>
                              <div className="text-xs opacity-60 mt-1">{budget.desc}</div>
                            </button>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {/* Progress Summary */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <Dialog open={showProgressModal} onOpenChange={setShowProgressModal}>
                        <DialogTrigger asChild>
                          <div className="text-2xl font-bold text-coral cursor-pointer hover:opacity-80 transition-opacity">72% ready</div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-lg">
                          <DialogHeader>
                            <DialogTitle>Trip Progress</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-6">
                            <div className="flex items-center justify-center">
                              <div className="relative w-24 h-24">
                                <svg className="w-24 h-24 transform -rotate-90">
                                  <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-muted" />
                                  <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" 
                                    strokeDasharray={`${2 * Math.PI * 40}`} strokeDashoffset={`${2 * Math.PI * 40 * (1 - 0.72)}`} 
                                    className="text-coral" />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className="text-2xl font-bold">72%</span>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-medium text-green-700 mb-2 flex items-center gap-2">
                                  <CheckCircle className="h-4 w-4" />
                                  Completed
                                </h4>
                                {progressData.completed.map((item, idx) => (
                                  <div key={idx} className="flex justify-between items-center py-2 border-b">
                                    <span>{item.title}</span>
                                    <span className="font-medium">{item.cost}</span>
                                  </div>
                                ))}
                              </div>
                              <div>
                                <h4 className="font-medium text-orange-700 mb-2 flex items-center gap-2">
                                  <AlertCircle className="h-4 w-4" />
                                  Pending
                                </h4>
                                {progressData.pending.map((item, idx) => (
                                  <div key={idx} className="flex justify-between items-center py-2 border-b">
                                    <div>
                                      <span>{item.title}</span>
                                      {item.completed && <span className="text-sm text-muted-foreground ml-2">({item.completed}/{item.total})</span>}
                                    </div>
                                    <span className="font-medium">{item.cost}</span>
                                  </div>
                                ))}
                              </div>
                              <div className="pt-4 border-t">
                                <div className="flex justify-between items-center font-bold text-lg">
                                  <span>Total Estimated</span>
                                  <span className="text-coral">${progressData.totalCost}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <div className="flex gap-2">
                        <Dialog open={showMustEatsModal} onOpenChange={setShowMustEatsModal}>
                          <DialogTrigger asChild>
                            <Badge variant="secondary" className="bg-orange-100 text-orange-700 cursor-pointer hover:bg-orange-200 transition-colors">6 must-eats</Badge>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Must-Eat Places</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4">
                              {mustEatsData.map((place, idx) => (
                                <div key={idx} className="flex gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                  <img src={place.image} alt={place.name} className="w-20 h-20 object-cover rounded-lg" />
                                  <div className="flex-1">
                                    <h4 className="font-semibold">{place.name}</h4>
                                    <p className="text-sm text-muted-foreground">{place.type}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                      <MapPin className="h-3 w-3" />
                                      <span className="text-sm">{place.location}</span>
                                    </div>
                                    <div className="text-xs text-muted-foreground mt-1">{place.source}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Dialog open={showExperiencesModal} onOpenChange={setShowExperiencesModal}>
                          <DialogTrigger asChild>
                            <Badge variant="secondary" className="bg-blue-100 text-blue-700 cursor-pointer hover:bg-blue-200 transition-colors">3 experiences</Badge>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Off-Beat Experiences</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4">
                              {experiencesData.map((exp, idx) => (
                                <div key={idx} className="flex gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                  <img src={exp.image} alt={exp.name} className="w-20 h-20 object-cover rounded-lg" />
                                  <div className="flex-1">
                                    <h4 className="font-semibold">{exp.name}</h4>
                                    <p className="text-sm text-muted-foreground">{exp.type}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                      <MapPin className="h-3 w-3" />
                                      <span className="text-sm">{exp.location}</span>
                                      <Badge variant="outline" className="text-xs">{exp.uniqueness}</Badge>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                    <Button 
                      onClick={() => navigate('/preview-itinerary?tripId=thailand-2024-bangkok')}
                      className="bg-coral hover:bg-coral/90 text-white hover:scale-105 transition-all duration-200"
                      size="sm"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Detailed Itinerary
                    </Button>
                  </div>

                   {/* Location Filter Pills */}
                   <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                     {["All", "Bangkok", "Phuket", "Chiang Mai", "Krabi"].map((filter) => (
                       <Button
                         key={filter}
                         variant={selectedFilter === filter ? "default" : "outline"}
                         size="sm"
                         onClick={() => setSelectedFilter(filter)}
                         className={cn(
                           "whitespace-nowrap",
                           selectedFilter === filter && "bg-coral hover:bg-coral/90 text-white"
                         )}
                       >
                         {filter}
                       </Button>
                     ))}
                   </div>

                   {/* Itinerary Day Sections */}
                   <div className="space-y-6">
                     {getFilteredDaySections().map((daySection) => (
                       <Card 
                         key={daySection.id} 
                         className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
                         onClick={() => handleDayCardClick(daySection.id)}
                       >
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                           <div className="relative">
                             <img 
                               src={daySection.image} 
                               alt={daySection.title}
                               className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                             />
                             <div className="absolute inset-0 bg-black/20" />
                             <div className="absolute top-4 left-4">
                               <Badge className={`${daySection.badge.color} border text-xs font-medium`}>
                                 {daySection.badge.text}
                               </Badge>
                             </div>
                           </div>
                           <div className="p-6 flex flex-col justify-between bg-white">
                             <div>
                               <h3 className="text-xl md:text-2xl font-bold mb-3">{daySection.title}</h3>
                               <p className="text-sm text-muted-foreground mb-4">{daySection.description}</p>
                               <div className="flex flex-wrap gap-1 mb-4">
                                 {daySection.tags.map((tag, tagIdx) => (
                                   <Badge key={tagIdx} variant="outline" className="text-xs">
                                     {tag}
                                   </Badge>
                                 ))}
                               </div>
                             </div>
                             <p className="text-xs text-muted-foreground">{daySection.source}</p>
                           </div>
                         </div>
                       </Card>
                     ))}
                   </div>
                </div>
              )}

              {currentView === "chat" && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Chat with Verso AI</h1>
                    <p className="text-muted-foreground">Ask anything about your travel plans</p>
                  </div>

                  {/* Chat Interface */}
                  <Card className="h-96">
                    <CardContent className="p-6 h-full flex flex-col">
                      <div className="flex-1 space-y-4">
                        <div className="bg-muted p-4 rounded-lg">
                          <p className="text-sm">Let me know if you'd like to adjust the pace or add special interests!</p>
                          <div className="flex gap-2 mt-3">
                            <Badge variant="outline" className="cursor-pointer hover:bg-muted">🌿 Add nature day</Badge>
                            <Badge variant="outline" className="cursor-pointer hover:bg-muted">🍜 More food experiences</Badge>
                            <Badge variant="outline" className="cursor-pointer hover:bg-muted">⚡ Faster pace</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-4 border-t">
                        <Input placeholder="Ask anything..." className="flex-1" />
                        <Button size="sm">
                          <Mic className="h-4 w-4" />
                        </Button>
                        <Button size="sm" className="bg-coral hover:bg-coral/90">
                          Send
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">⏰ AI may make mistakes - verify important details</p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t">
          <div className="grid grid-cols-4 gap-1 p-2">
            {[
              { title: "Home", icon: Home, id: "home" },
              { title: "Saved", icon: Heart, id: "saved" },
              { title: "Trips", icon: Luggage, id: "trips" },
              { title: "Chat", icon: MessageCircle, id: "chat" }
            ].map((item) => (
              <button
                key={item.title}
                onClick={() => setCurrentView(item.id)}
                className={cn(
                  "flex flex-col items-center gap-1 p-3 rounded-lg transition-colors",
                  currentView === item.id 
                    ? "bg-coral text-white" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;