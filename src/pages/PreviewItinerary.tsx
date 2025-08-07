import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  MapPin, MessageCircle, X, Calendar, Users, ArrowRight, 
  MoreVertical, Clock, Plane, Bed, Utensils, Camera, 
  ChevronDown, ChevronRight, Grip, Share, Move, MessageSquare,
  Eye, Trash2, ArrowLeft, ArrowUpRight, Plus, GripVertical
} from "lucide-react";

const PreviewItinerary = () => {
  const navigate = useNavigate();
  const [activeDay, setActiveDay] = useState(1);
  const [activeTab, setActiveTab] = useState("itinerary");
  const [expandedDays, setExpandedDays] = useState<number[]>([1, 2, 3, 4, 5]);
  const [showBookingChat, setShowBookingChat] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showDistances, setShowDistances] = useState(true);
  const [draggedItem, setDraggedItem] = useState<any>(null);
  const [showCommentBox, setShowCommentBox] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{x: number, y: number, item: any} | null>(null);

  // Mock itinerary data
  const tripData = {
    title: "14-Day Thailand Adventure",
    duration: "14 days",
    travelers: "2 travelers", 
    budget: "Budget",
    tags: ["Thailand", "14 days", "2 travelers", "Budget"]
  };

  const ideaItems = [
    {
      id: "idea1",
      type: "experience",
      title: "Elephant Sanctuary Visit",
      location: "Chiang Mai",
      thumbnail: "https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?auto=format&fit=crop&w=300&q=80",
      category: "Wildlife"
    },
    {
      id: "idea2", 
      type: "food",
      title: "Street Food Tour",
      location: "Bangkok",
      thumbnail: "https://images.unsplash.com/photo-1496412705862-e0088f16f791?auto=format&fit=crop&w=300&q=80",
      category: "Culinary"
    },
    {
      id: "idea3",
      type: "activity",
      title: "Rock Climbing",
      location: "Railay",
      thumbnail: "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=300&q=80",
      category: "Adventure"
    }
  ];

  const itineraryData = {
    1: {
      title: "✈️ Arrival in Bangkok",
      items: [
        {
          id: "flight1",
          type: "flight",
          title: "Kempegowda Airport",
          time: "7:00 AM India Time - 10:00 AM India Time",
          distance: "1,548 mi",
          thumbnail: "/lovable-uploads/8006d940-cc72-415d-ad51-54765e172984.png",
          hasDetails: true
        },
        {
          id: "flight2", 
          type: "flight",
          title: "Suvarnabhumbi International Airport",
          time: "12:00 PM Thailand Time - 12:30 PM Thailand Time",
          distance: "15.44 mi",
          thumbnail: "/lovable-uploads/8006d940-cc72-415d-ad51-54765e172984.png",
          hasDetails: true
        },
        {
          id: "hotel1",
          type: "hotel",
          title: "Eastin Grand Hotel Sathorn",
          time: "Check-in 1:00 PM Thailand Time (3 nights)",
          thumbnail: "/lovable-uploads/944d03be-0191-41af-ac23-8e000d614722.png",
          canBook: true
        },
        {
          id: "food1",
          type: "food", 
          title: "Bang Rak Street Food Stalls",
          time: "7:00 PM Thailand Time - 8:30 PM Thailand Time",
          thumbnail: "https://images.unsplash.com/photo-1496412705862-e0088f16f791?auto=format&fit=crop&w=300&q=80"
        }
      ]
    },
    2: {
      title: "🏛️ Temples & Old City",
      items: [
        {
          id: "hotel2",
          type: "staying",
          title: "Staying at Eastin Grand Hotel Sathorn", 
          distance: "2.65 mi",
          thumbnail: "/lovable-uploads/944d03be-0191-41af-ac23-8e000d614722.png"
        },
        {
          id: "temple1",
          type: "activity",
          title: "Wat Pho",
          time: "9:00 AM - 10:30 AM",
          thumbnail: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=300&q=80",
          hasLink: true
        }
      ]
    }
  };

  const mockMapLocations = [
    { id: "bangkok", name: "Bangkok", coords: [13.7563, 100.5018], items: 11 },
    { id: "railay", name: "Railay Beach", coords: [8.0081, 98.8419], items: 20 },
    { id: "phuket", name: "Phuket", coords: [7.8804, 98.3923], items: 12 }
  ];

  const toggleDay = (dayId: number) => {
    setExpandedDays(prev => 
      prev.includes(dayId) 
        ? prev.filter(id => id !== dayId)
        : [...prev, dayId]
    );
  };

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'flight': return <Plane className="w-4 h-4" />;
      case 'hotel': return <Bed className="w-4 h-4" />;
      case 'staying': return <Bed className="w-4 h-4" />;
      case 'food': return <Utensils className="w-4 h-4" />;
      case 'activity': return <Camera className="w-4 h-4" />;
      case 'experience': return <Camera className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  const handleItemClick = (item: any, event: React.MouseEvent) => {
    if (item.canBook) {
      setSelectedItem(item);
      setShowBookingChat(true);
    } else if (item.hasDetails || item.hasLink) {
      // Show details or external link
      console.log("Show details for:", item.title);
    }
  };

  const handleContextMenu = (e: React.MouseEvent, item: any) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      item
    });
  };

  const ContextMenuComponent = ({ x, y, item, onClose }: any) => (
    <div 
      className="fixed bg-white rounded-lg shadow-lg border p-2 z-50 min-w-48"
      style={{ left: x, top: y }}
      onMouseLeave={onClose}
    >
      <div className="space-y-1">
        <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-50 flex items-center gap-2">
          <Eye className="w-4 h-4" /> View details
        </button>
        <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-50 flex items-center gap-2">
          <Clock className="w-4 h-4" /> Select time
        </button>
        <button 
          className="w-full text-left px-3 py-2 rounded hover:bg-gray-50 flex items-center gap-2"
          onClick={() => {
            setShowCommentBox(item.id);
            onClose();
          }}
        >
          <MessageSquare className="w-4 h-4" /> Add a comment
        </button>
        <hr className="my-1" />
        <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-50 flex items-center gap-2">
          <Move className="w-4 h-4" /> Move to ideas
        </button>
        <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-50 flex items-center gap-2 text-gray-400">
          <ArrowLeft className="w-4 h-4" /> Move to previous day
        </button>
        <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-50 flex items-center gap-2">
          <ArrowRight className="w-4 h-4" /> Move to next day
        </button>
        <hr className="my-1" />
        <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-50 flex items-center gap-2 text-red-600">
          <Trash2 className="w-4 h-4" /> Remove
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Left Sidebar - Day Navigator */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Trip Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-xl font-bold">{tripData.title}</h1>
            <Button variant="ghost" size="sm">
              <Share className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Trip Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">Thailand</Badge>
            <Badge variant="secondary">14 days</Badge>
            <Badge variant="secondary">2 travelers</Badge>
            <Badge variant="secondary">Budget</Badge>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto">
          <Tabs value={activeTab} className="h-full">
            <TabsContent value="itinerary" className="h-full p-4 space-y-4">
              {/* Ideas Section */}
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex items-center gap-2 w-full text-left">
                  <ChevronDown className="w-4 h-4" />
                  <span className="font-medium">Ideas</span>
                  <Badge variant="outline">{ideaItems.length} items</Badge>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 space-y-2">
                  {ideaItems.map(item => (
                    <div key={item.id} className="p-3 rounded-lg border border-dashed border-gray-300 bg-gray-50">
                      <div className="flex items-center gap-3">
                        <img src={item.thumbnail} className="w-10 h-10 rounded object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{item.title}</p>
                          <p className="text-xs text-gray-500">{item.location}</p>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>

              {/* Day-wise Itinerary */}
              <div className="space-y-3">
                {Object.entries(itineraryData).map(([dayNum, dayData]) => (
                  <Collapsible 
                    key={dayNum} 
                    open={expandedDays.includes(parseInt(dayNum))}
                    onOpenChange={() => toggleDay(parseInt(dayNum))}
                  >
                    <CollapsibleTrigger 
                      className={`flex items-center gap-2 w-full text-left p-3 rounded-lg hover:bg-gray-50 ${
                        activeDay === parseInt(dayNum) ? 'bg-coral-50 border border-coral-200' : ''
                      }`}
                      onClick={() => setActiveDay(parseInt(dayNum))}
                    >
                      <ChevronRight className={`w-4 h-4 transition-transform ${
                        expandedDays.includes(parseInt(dayNum)) ? 'rotate-90' : ''
                      }`} />
                      <span className="font-medium">Day {dayNum}</span>
                      <span className="text-sm text-gray-500">{dayData.title}</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="ml-6 mt-2 space-y-2">
                      {dayData.items.map(item => (
                        <div key={item.id} className="text-sm text-gray-600 p-2 rounded hover:bg-gray-50">
                          <div className="flex items-center gap-2">
                            {getItemIcon(item.type)}
                            <span className="truncate">{item.title}</span>
                          </div>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="calendar" className="h-full p-4">
              <div className="text-center text-gray-500 mt-8">
                <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Calendar view coming soon</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Main Itinerary Canvas */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl space-y-8">
            {Object.entries(itineraryData).map(([dayNum, dayData]) => (
              <div key={dayNum} className="space-y-4">
                {/* Day Header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Day {dayNum} {dayData.title}</h2>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Day Items */}
                <div className="space-y-4">
                  {dayData.items.map((item, index) => (
                    <div key={item.id} className="relative">
                      {/* Draggable Item Card */}
                      <div 
                        className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all duration-200 cursor-pointer group"
                        onClick={(e) => handleItemClick(item, e)}
                        onContextMenu={(e) => handleContextMenu(e, item)}
                        draggable
                        onDragStart={() => setDraggedItem(item)}
                      >
                        <div className="flex items-center gap-4">
                          {/* Drag Handle */}
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <GripVertical className="w-4 h-4 text-gray-400" />
                          </div>

                          {/* Item Icon */}
                          <div className="flex-shrink-0">
                            {getItemIcon(item.type)}
                          </div>

                          {/* Item Image */}
                          {item.thumbnail && (
                            <img 
                              src={item.thumbnail} 
                              className="w-16 h-16 rounded-lg object-cover"
                              alt={item.title}
                            />
                          )}

                          {/* Item Details */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-lg">{item.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Clock className="w-4 h-4" />
                              <span>{item.time}</span>
                            </div>
                            {item.distance && (
                              <div className="text-sm text-gray-400 mt-1">
                                {item.distance}
                              </div>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2">
                            {item.canBook && (
                              <Button className="bg-black text-white hover:bg-gray-800">
                                Book
                              </Button>
                            )}
                            {item.hasDetails && (
                              <Button variant="outline">
                                Details
                              </Button>
                            )}
                            {item.hasLink && (
                              <Button variant="outline" size="sm">
                                Link <ArrowUpRight className="w-4 h-4 ml-1" />
                              </Button>
                            )}
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Comment Box */}
                        {showCommentBox === item.id && (
                          <div className="mt-4 p-3 bg-gray-50 rounded-lg animate-fade-in">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-6 h-6 bg-coral-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                A
                              </div>
                              <input 
                                type="text" 
                                placeholder="Add a comment..."
                                className="flex-1 bg-transparent outline-none text-sm"
                                autoFocus
                                onBlur={() => setShowCommentBox(null)}
                              />
                              <Button size="sm" variant="ghost">
                                <ArrowUpRight className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Add Button */}
                      {index === dayData.items.length - 1 && (
                        <Button 
                          variant="outline" 
                          className="mt-4 w-auto"
                          size="sm"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Map */}
      <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
        {/* Map Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Map</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Distances</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={showDistances}
                  onChange={(e) => setShowDistances(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-black"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Mock Map */}
        <div className="flex-1 relative bg-gradient-to-br from-blue-100 to-green-100">
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Interactive map</p>
              <p className="text-xs">with location markers</p>
            </div>
          </div>
          
          {/* Mock location markers */}
          {mockMapLocations.map(location => (
            <div 
              key={location.id}
              className="absolute bg-coral-500 text-white rounded-full px-2 py-1 text-xs font-bold shadow-lg"
              style={{
                left: `${Math.random() * 60 + 20}%`,
                top: `${Math.random() * 60 + 20}%`
              }}
            >
              {location.items}
            </div>
          ))}
        </div>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenuComponent 
          x={contextMenu.x}
          y={contextMenu.y}
          item={contextMenu.item}
          onClose={() => setContextMenu(null)}
        />
      )}

      {/* Booking Chat Modal */}
      {showBookingChat && selectedItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center p-4">
          <div className="bg-white rounded-t-3xl w-full max-w-2xl h-96 animate-slide-in-right">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={selectedItem.thumbnail} className="w-12 h-12 rounded-lg object-cover" />
                  <div>
                    <h3 className="font-semibold">{selectedItem.title}</h3>
                    <p className="text-sm text-gray-500">Book your stay</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowBookingChat(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">🤖 AI Assistant</p>
                <p className="font-medium">How far is the nearest metro station from this hotel?</p>
              </div>
              
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-coral-500"
                />
                <Button className="bg-coral-500 hover:bg-coral-600">
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat FAB */}
      <button className="fixed bottom-6 right-6 bg-coral-500 hover:bg-coral-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40">
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
};

export default PreviewItinerary;