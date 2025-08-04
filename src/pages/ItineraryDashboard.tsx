import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Clock,
  ChevronRight,
  ChevronDown,
  MoreHorizontal,
  Plane,
  Hotel,
  Utensils,
  Camera,
  Menu,
  X
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const ItineraryDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [expandedDays, setExpandedDays] = useState<number[]>([1, 2]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleDay = (dayNumber: number) => {
    setExpandedDays(prev => 
      prev.includes(dayNumber) 
        ? prev.filter(d => d !== dayNumber)
        : [...prev, dayNumber]
    );
  };

  // Sample itinerary data
  const tripData = {
    title: "Bangkok Street Food Hop",
    duration: "14 days • June 12-26, 2024",
    days: [
      {
        number: 1,
        title: "✈️ Arrival in Bangkok",
        date: "June 12",
        activities: [
          {
            time: "7:00 AM - 10:00 AM",
            title: "Kempegowda Airport",
            subtitle: "India Time",
            type: "travel",
            icon: "🛫",
            details: "Flight AI-203",
            image: "/lovable-uploads/5cb040b5-08b5-4975-9724-d8d3e9d7fcea.png"
          },
          {
            time: "12:00 PM - 12:30 PM", 
            title: "Suvarnabhumbi International Airport",
            subtitle: "Thailand Time",
            type: "travel",
            icon: "🛬",
            details: "Taxi booked",
            image: "/lovable-uploads/5cb040b5-08b5-4975-9724-d8d3e9d7fcea.png"
          },
          {
            time: "1:00 PM",
            title: "Eastin Grand Hotel Sathorn",
            subtitle: "Check-in • 3 nights",
            type: "accommodation",
            icon: "🛏️",
            details: "$142/night",
            bookable: true,
            image: "/lovable-uploads/31de207c-20bf-4c4b-998d-e824356aa265.png"
          },
          {
            time: "7:00 PM - 8:30 PM",
            title: "Bang Rak Street Food Stalls",
            subtitle: "Welcome dinner",
            type: "food",
            icon: "🍜",
            image: "/lovable-uploads/5cb040b5-08b5-4975-9724-d8d3e9d7fcea.png"
          }
        ]
      },
      {
        number: 2,
        title: "🏛️ Temples & Old City",
        date: "June 13",
        activities: [
          {
            time: "9:00 AM",
            title: "Wat Arun Temple",
            subtitle: "Temple of Dawn",
            type: "sightseeing",
            icon: "🏛️",
            details: "2 hours visit",
            image: "/lovable-uploads/9ad3c331-19eb-4ce1-9065-2a902eda5bdc.png"
          },
          {
            time: "12:00 PM",
            title: "Chatuchak Weekend Market",
            subtitle: "Street food exploration",
            type: "food",
            icon: "🍜",
            details: "Saved from IG",
            image: "/lovable-uploads/adc9a232-4eaf-487d-a742-b589704cdc8f.png"
          },
          {
            time: "6:00 PM",
            title: "Sky Bar Rooftop",
            subtitle: "Sunset cocktails",
            type: "experience",
            icon: "🍸",
            details: "Saved from TikTok",
            image: "/lovable-uploads/c45a5501-917b-40c4-b954-3a8382ce76ce.png"
          }
        ]
      }
    ]
  };

  const ActivityCard = ({ activity, isLast = false }: { activity: any, isLast?: boolean }) => {
    const typeColors = {
      travel: "bg-blue-50 border-blue-200",
      accommodation: "bg-green-50 border-green-200", 
      food: "bg-orange-50 border-orange-200",
      sightseeing: "bg-purple-50 border-purple-200",
      experience: "bg-pink-50 border-pink-200"
    };

    return (
      <div className="relative">
        <div className={`flex gap-4 p-4 rounded-lg border ${typeColors[activity.type as keyof typeof typeColors] || 'bg-gray-50 border-gray-200'} hover:shadow-md transition-all duration-200`}>
          {activity.image && (
            <img 
              src={activity.image} 
              alt={activity.title}
              className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
            />
          )}
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{activity.icon}</span>
                  <h4 className="font-medium text-foreground">{activity.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{activity.subtitle}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{activity.time}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {activity.details && (
                  <Badge variant="secondary" className="text-xs">
                    {activity.details}
                  </Badge>
                )}
                {activity.bookable && (
                  <Button size="sm" className="bg-coral hover:bg-coral/90 text-white">
                    Book
                  </Button>
                )}
                <Button variant="ghost" size="sm">
                  Details
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {!isLast && (
          <div className="flex justify-center my-2">
            <div className="w-px h-6 bg-border"></div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Collapsible Sidebar */}
      <div className={`fixed left-0 top-0 bottom-0 z-30 transition-all duration-300 ${sidebarOpen ? 'w-60' : 'w-14'} bg-card border-r border-border`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className={`text-xl font-bold transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
              Verso
            </h1>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
          
          <nav className="space-y-2">
            <Button variant="default" className="w-full justify-start">
              <Home className="h-4 w-4 mr-2" />
              {sidebarOpen && <span>Trips</span>}
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Heart className="h-4 w-4 mr-2" />
              {sidebarOpen && <span>Saved</span>}
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Plus className="h-4 w-4 mr-2" />
              {sidebarOpen && <span>New Trip</span>}
            </Button>
            <Button variant="ghost" className="w-full justify-start relative">
              <MessageCircle className="h-4 w-4 mr-2" />
              {sidebarOpen && <span>Chats</span>}
              <Badge className="ml-auto h-5 w-5 p-0 flex items-center justify-center text-xs bg-coral text-white">3</Badge>
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Camera className="h-4 w-4 mr-2" />
              {sidebarOpen && <span>Inspiration</span>}
            </Button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-60' : 'ml-14'}`}>
        <div className="flex h-screen">
          {/* Itinerary Section */}
          <div className="flex-1 overflow-auto">
            <div className="p-6">
              {/* Header */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2">{tripData.title}</h1>
                <p className="text-muted-foreground mb-4">{tripData.duration}</p>
                
                {/* Filter Bar */}
                <div className="flex items-center gap-4 mb-6">
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    When
                  </Button>
                  <Button variant="outline" size="sm">
                    <Users className="h-4 w-4 mr-2" />
                    2 travelers
                  </Button>
                  <Button variant="outline" size="sm">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Budget
                  </Button>
                  <Button variant="outline" size="sm">
                    <MapPin className="h-4 w-4 mr-2" />
                    Bangkok
                  </Button>
                </div>
              </div>

              {/* Day Sections */}
              <div className="space-y-6">
                {tripData.days.map((day, dayIndex) => (
                  <Card key={day.number} className="overflow-hidden">
                    <Collapsible
                      open={expandedDays.includes(day.number)}
                      onOpenChange={() => toggleDay(day.number)}
                    >
                      <CollapsibleTrigger asChild>
                        <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="flex items-center gap-3">
                                <Badge variant="outline" className="text-coral border-coral">
                                  Day {day.number}
                                </Badge>
                                <span>{day.title}</span>
                              </CardTitle>
                              <p className="text-sm text-muted-foreground mt-1">{day.date}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary">{day.activities.length} activities</Badge>
                              <ChevronDown className={`h-4 w-4 transition-transform ${expandedDays.includes(day.number) ? 'rotate-180' : ''}`} />
                            </div>
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent>
                        <CardContent className="pt-0">
                          <div className="space-y-4">
                            {day.activities.map((activity, activityIndex) => (
                              <ActivityCard 
                                key={activityIndex} 
                                activity={activity}
                                isLast={activityIndex === day.activities.length - 1}
                              />
                            ))}
                            
                            <Button variant="outline" className="w-full">
                              <Plus className="h-4 w-4 mr-2" />
                              Add Activity
                            </Button>
                          </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Chat & Tools Panel */}
          <div className="w-80 bg-card border-l border-border overflow-auto">
            <div className="p-4">
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Trip Assistant</h3>
                <p className="text-sm text-muted-foreground">Ask me anything about your Bangkok trip</p>
              </div>

              {/* Chat Messages */}
              <div className="space-y-4 mb-4">
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-sm mb-3">Let me know if you'd like to adjust the pace or add special interests!</p>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" className="text-xs">
                      🌿 Add nature
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs">
                      🍜 More food
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs">
                      ⚡ Faster pace
                    </Button>
                  </div>
                </div>

                <div className="bg-coral/10 rounded-lg p-3">
                  <p className="text-sm">I found 3 boutique hotels near your saved cafes in Bangkok. Want to see them?</p>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline" className="text-xs">Show me</Button>
                    <Button size="sm" variant="outline" className="text-xs">Add to trip</Button>
                  </div>
                </div>
              </div>

              {/* Map Preview */}
              <Card className="mb-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Day 1 Map</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg h-32 flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-coral" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">8 hours scheduled • 4 locations</p>
                </CardContent>
              </Card>

              {/* Input Area */}
              <div className="space-y-3">
                <Input placeholder="Ask anything..." />
                <p className="text-xs text-muted-foreground">⏰ AI can make mistakes. Verify important details.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="grid grid-cols-4 gap-1 p-2">
          <Button variant="default" size="sm" className="flex flex-col gap-1 h-auto py-2">
            <Calendar className="h-4 w-4" />
            <span className="text-xs">Itinerary</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col gap-1 h-auto py-2">
            <MessageCircle className="h-4 w-4" />
            <span className="text-xs">Chat</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col gap-1 h-auto py-2">
            <Plus className="h-4 w-4" />
            <span className="text-xs">Add</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col gap-1 h-auto py-2">
            <MoreHorizontal className="h-4 w-4" />
            <span className="text-xs">More</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ItineraryDashboard;