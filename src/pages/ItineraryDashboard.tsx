import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import ProgressBar from "@/components/ProgressBar";
import BookingSummary from "@/components/BookingSummary";
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

  // Sample itinerary data matching reference images
  const tripData = {
    title: "14-Day Thailand Adventure",
    duration: "Thailand • 14 days • 2 travelers • Budget",
    days: [
      {
        number: 1,
        title: "✈️ Arrival in Bangkok",
        date: "June 12",
        activities: [
          {
            time: "7:00 AM India Time - 10:00 AM India Time",
            title: "Kempegowda Airport",
            type: "travel",
            icon: "✈️",
            details: "Details",
            distance: "1,548 mi",
            image: "/lovable-uploads/94097383-44d1-461e-b0fd-9492ff45dbf5.png"
          },
          {
            time: "12:00 PM Thailand Time - 12:30 PM Thailand Time", 
            title: "Suvarnabhumi International Airport",
            type: "travel",
            icon: "✈️",
            details: "Details",
            distance: "15.44 mi",
            image: "/lovable-uploads/086a8821-7848-454e-b4ee-57f6a0cd77fe.png"
          },
          {
            time: "Check-in 1:00 PM Thailand Time (3 nights)",
            title: "Eastin Grand Hotel Sathorn",
            type: "accommodation",
            icon: "🏨",
            bookable: true,
            image: "/lovable-uploads/ad5778de-929b-4f91-bd99-11c97d9b6c4c.png"
          },
          {
            time: "7:00 PM Thailand Time - 8:30 PM Thailand Time",
            title: "Bang Rak Street Food Stalls",
            type: "food",
            icon: "🍽️",
            image: "/lovable-uploads/821fb983-af77-4d9e-b33e-effe2be267b1.png"
          }
        ]
      },
      {
        number: 2,
        title: "🏛️ Temples & Old City",
        date: "June 13",
        activities: [
          {
            time: "Staying at Eastin Grand Hotel Sathorn",
            title: "Hotel accommodation",
            type: "accommodation",
            distance: "2.65 mi",
            isStaying: true
          },
          {
            time: "9:00 AM - 10:30 AM",
            title: "Wat Pho",
            type: "temple",
            icon: "🏛️",
            link: true,
            distance: "0.4 mi",
            image: "/lovable-uploads/7dc9ce16-babb-48a2-8bc7-5942938f1fe9.png"
          },
          {
            time: "10:45 AM - 12:00 PM",
            title: "Wat Arun Ratchawararam Ratchawaramahawihan",
            type: "temple",
            icon: "🏛️", 
            link: true,
            distance: "0.46 mi",
            image: "/lovable-uploads/0d6cd62c-74d8-4528-b26b-30d2d3333931.png"
          },
          {
            time: "1:00 PM - 2:30 PM",
            title: "Grand Palace",
            type: "attraction",
            icon: "🏰",
            link: true,
            distance: "0.14 mi",
            image: "/lovable-uploads/f11c41d9-eac8-4c73-99cc-c19d8191192f.png"
          },
          {
            time: "2:30 PM - 3:30 PM",
            title: "Temple of the Emerald Buddha (Wat Phra Kaew)",
            type: "temple",
            icon: "🏛️",
            directions: true,
            distance: "0.42 mi",
            image: "/lovable-uploads/f4e9e9ef-3c50-4045-a224-d3f3f8738f01.png"
          },
          {
            time: "3:30 PM - 4:30 PM", 
            title: "THE SIXTH 6th",
            type: "food",
            icon: "🍽️",
            details: "Details",
            distance: "0.65 mi",
            image: "/lovable-uploads/821fb983-af77-4d9e-b33e-effe2be267b1.png"
          },
          {
            time: "5:30 PM - 7:00 PM",
            title: "Rattanakosin Island",
            type: "attraction",
            icon: "📍",
            details: "Details",
            image: "/lovable-uploads/0d6cd62c-74d8-4528-b26b-30d2d3333931.png"
          }
        ]
      },
      {
        number: 3,
        title: "🛍️ Markets & Modern Life",
        date: "June 14",
        activities: [
          {
            time: "Staying at Eastin Grand Hotel Sathorn",
            title: "Hotel accommodation",
            type: "accommodation",
            distance: "5.9 mi",
            isStaying: true
          },
          {
            time: "9:00 AM - 11:00 AM",
            title: "Chatuchak Market",
            type: "market",
            icon: "🛒",
            link: true,
            distance: "3.79 mi",
            image: "/lovable-uploads/f11c41d9-eac8-4c73-99cc-c19d8191192f.png"
          },
          {
            time: "12:00 PM - 2:00 PM",
            title: "Jim Thompson House Museum",
            type: "museum",
            icon: "🏛️",
            link: true,
            distance: "0.49 mi", 
            image: "/lovable-uploads/f4e9e9ef-3c50-4045-a224-d3f3f8738f01.png"
          },
          {
            time: "2:30 PM - 4:30 PM",
            title: "Siam Paragon",
            type: "shopping",
            icon: "🏬",
            directions: true,
            distance: "1.26 mi",
            image: "/lovable-uploads/ad5778de-929b-4f91-bd99-11c97d9b6c4c.png"
          },
          {
            time: "6:30 PM - 8:00 PM",
            title: "Somtum Der",
            type: "food",
            icon: "🍽️",
            details: "Details",
            image: "/lovable-uploads/821fb983-af77-4d9e-b33e-effe2be267b1.png"
          }
        ]
      },
      {
        number: 4,
        title: "🏔️ To Chiang Mai",
        date: "June 15",
        activities: [
          {
            time: "Check-out 7:00 AM",
            title: "Eastin Grand Hotel Sathorn",
            type: "accommodation",
            icon: "🏨",
            bookable: true,
            image: "/lovable-uploads/ad5778de-929b-4f91-bd99-11c97d9b6c4c.png"
          }
        ]
      }
    ]
  };

  const ActivityCard = ({ activity, isLast = false }: { activity: any, isLast?: boolean }) => {
    if (activity.isStaying) {
      return (
        <div className="relative">
          <div className="flex gap-4 p-3 bg-muted/30 rounded-lg border border-dashed border-muted-foreground/30">
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
              <Hotel className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-muted-foreground">{activity.time}</h4>
              {activity.distance && (
                <p className="text-xs text-muted-foreground mt-1">{activity.distance}</p>
              )}
            </div>
          </div>
          {!isLast && (
            <div className="flex justify-center my-3">
              <div className="w-px h-4 bg-border"></div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="relative">
        <div className="flex gap-4 p-3 bg-background rounded-lg border border-border hover:shadow-sm transition-all duration-200">
          {activity.image && (
            <img 
              src={activity.image} 
              alt={activity.title}
              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
            />
          )}
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {activity.icon && <span className="text-sm">{activity.icon}</span>}
                  <h4 className="font-medium text-foreground text-sm">{activity.title}</h4>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                  <Clock className="h-3 w-3" />
                  <span>{activity.time}</span>
                </div>
                {activity.distance && (
                  <p className="text-xs text-muted-foreground">{activity.distance}</p>
                )}
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                {activity.link && (
                  <Button size="sm" variant="outline" className="text-xs h-7 px-3">
                    Link ↗
                  </Button>
                )}
                {activity.details && (
                  <Button size="sm" variant="outline" className="text-xs h-7 px-3">
                    Details
                  </Button>
                )}
                {activity.directions && (
                  <span className="text-xs text-muted-foreground">Directions ↗</span>
                )}
                {activity.bookable && (
                  <Button size="sm" className="bg-black hover:bg-black/90 text-white text-xs h-7 px-4">
                    Book
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {!isLast && (
          <div className="flex justify-center my-3">
            <div className="w-px h-4 bg-border"></div>
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
                <ProgressBar currentStep={2} />
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
            <div className="p-4 space-y-4">
              <BookingSummary pricePerPerson={1099} nights={14} urgencyText="Only 2 left at this price" />
              <div className="mb-2">
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