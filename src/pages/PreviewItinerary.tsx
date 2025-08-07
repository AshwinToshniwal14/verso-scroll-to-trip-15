import React, { useState } from 'react';
import { ArrowLeft, Share2, Heart, Calendar, Users, DollarSign, MapPin, Clock, Plane, Bed, UtensilsCrossed, Camera, MoreHorizontal, MessageCircle, Plus, Map as MapIcon, ToggleLeft, ChevronRight, ChevronDown, X, MessageSquare, Send, Star, ExternalLink, Eye, Trash2, Move, GripVertical, Phone, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useNavigate, useSearchParams } from 'react-router-dom';

const PreviewItinerary = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("itinerary");
  const [expandedDays, setExpandedDays] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  const [rightPanelContent, setRightPanelContent] = useState<'map' | 'details' | 'booking'>('map');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showDistances, setShowDistances] = useState(true);
  const [showCommentDropdown, setShowCommentDropdown] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{x: number, y: number, item: any} | null>(null);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const [bookingMessages, setBookingMessages] = useState<Array<{type: 'ai' | 'user', content: string}>>([
    { type: 'ai', content: 'I can help you book this hotel. What dates are you looking for?' }
  ]);
  const [messageInput, setMessageInput] = useState('');
  const [commentText, setCommentText] = useState('');
  const [selectedDetailTab, setSelectedDetailTab] = useState('overview');

  // Mock data for 11 days Thailand itinerary (synced with dashboard)
  const tripData = {
    title: "11-Day Thailand Adventure",
    duration: "11 days",
    travelers: "2 travelers", 
    budget: "Budget",
    tags: ["Thailand", "11 days", "2 travelers", "Budget"]
  };

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
          hasDetails: true,
          description: "Modern airport serving the Bangalore area, with a bus service direct to Mysore.",
          rating: 4.6,
          reviews: "147k reviews",
          location: "Harlur, Karnataka",
          address: "KIAL Rd, Devanahalli\nBengaluru, Karnataka 560300\nIndia",
          website: "www.bengaluruairport.com",
          phone: "+91 80 2201 2001",
          hours: "Open now\nDaily 24 Hours",
          images: [
            "https://images.unsplash.com/photo-1556388158-158dc738725f?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1548094878-84ced0f6896d?auto=format&fit=crop&w=800&q=80"
          ]
        },
        {
          id: "flight2", 
          type: "flight",
          title: "Suvarnabhumbi International Airport",
          time: "12:00 PM Thailand Time - 12:30 PM Thailand Time",
          distance: "15.44 mi",
          thumbnail: "/lovable-uploads/8006d940-cc72-415d-ad51-54765e172984.png",
          hasDetails: true,
          description: "This Bangkok-area airport is one of Asia's busiest & has amenities such as a spa & a playground.",
          rating: 4.3,
          reviews: "48k reviews",
          location: "Racha Thewa, Chang Wat Samut Prakan",
          address: "999, Phang Kaeo Tai,\nAmphoe Ban Phang Nga,\nThailand",
          images: [
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1574016686-5bf33d14862b?auto=format&fit=crop&w=800&q=80"
          ]
        },
        {
          id: "hotel1",
          type: "hotel",
          title: "Eastin Grand Hotel Sathorn",
          time: "Check-in 1:00 PM Thailand Time (3 nights)",
          thumbnail: "/lovable-uploads/944d03be-0191-41af-ac23-8e000d614722.png",
          canBook: true,
          rating: 4.6,
          reviews: "8.2k reviews",
          location: "Bangkok",
          description: "Eastin Grand Hotel Sathorn is a luxury hotel situated in Bangkok's Sathorn business district. The hotel features 390 modern rooms and suites, each offering panoramic city views through floor-to-ceiling windows. Guests can enjoy direct access to the BTS Skytrain via a sky bridge, facilitating easy travel throughout the city.",
          pricePerNight: 119,
          images: [
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"
          ]
        },
        {
          id: "advice1",
          type: "advice",
          title: "reach airport 2 hours early, remind to book an Uber at 4am",
          time: "",
          thumbnail: "",
          isAdvice: true
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
          hasDetails: true,
          canBook: true,
          description: "Famous temple complex known for its giant reclining Buddha and traditional Thai massage school.",
          rating: 4.7,
          reviews: "25k reviews",
          location: "Bangkok",
          images: [
            "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80"
          ]
        }
      ]
    },
    3: { title: "🌊 Water Markets & Floating Tours", items: [] },
    4: { title: "🍜 Culinary Adventures", items: [] },
    5: { title: "✈️ Flight to Chiang Mai", items: [] },
    6: { title: "🏔️ Mountain Temples", items: [] },
    7: { title: "🐘 Elephant Sanctuary", items: [] },
    8: { title: "✈️ Flight to Phuket", items: [] },
    9: { title: "🏖️ Beach Relaxation", items: [] },
    10: { title: "🤿 Island Hopping", items: [] },
    11: { title: "✈️ Departure", items: [] }
  };

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
      case 'food': return <UtensilsCrossed className="w-4 h-4" />;
      case 'activity': return <Camera className="w-4 h-4" />;
      case 'experience': return <Camera className="w-4 h-4" />;
      case 'advice': return <MessageCircle className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  const handleItemHover = (item: any) => {
    setHoveredLocation(item.id);
    setRightPanelContent('map');
  };

  const handleDetailsClick = (item: any) => {
    setSelectedItem(item);
    setRightPanelContent('details');
    setSelectedDetailTab('overview');
  };

  const handleBookClick = (item: any) => {
    setSelectedItem(item);
    if (item.type === 'hotel') {
      setRightPanelContent('booking');
    } else {
      setRightPanelContent('details');
      setSelectedDetailTab('overview');
    }
    setBookingMessages([
      { type: 'ai', content: `I can help you book ${item.title}. What dates are you looking for?` }
    ]);
  };

  const handleContextMenu = (e: React.MouseEvent, item: any) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      item
    });
  };

  const handleCommentClick = (itemId: string) => {
    setShowCommentDropdown(showCommentDropdown === itemId ? null : itemId);
  };

  const addComment = () => {
    if (commentText.trim()) {
      console.log('Adding comment:', commentText);
      setCommentText('');
      setShowCommentDropdown(null);
    }
  };

  const sendMessage = () => {
    if (!messageInput.trim()) return;
    
    setBookingMessages(prev => [
      ...prev,
      { type: 'user', content: messageInput },
      { type: 'ai', content: 'Great! Let me check availability for those dates...' }
    ]);
    setMessageInput('');
  };

  const ContextMenuComponent = ({ x, y, item, onClose }: any) => (
    <div 
      className="fixed bg-white rounded-lg shadow-xl border p-2 z-50 min-w-48"
      style={{ left: x, top: y }}
      onMouseLeave={onClose}
    >
      <div className="space-y-1">
        <button 
          className="w-full text-left px-3 py-2 rounded hover:bg-gray-50 flex items-center gap-2"
          onClick={() => {
            handleDetailsClick(item);
            onClose();
          }}
        >
          <Eye className="w-4 h-4" /> View details
        </button>
        <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-50 flex items-center gap-2">
          <Clock className="w-4 h-4" /> Select time
        </button>
        <button 
          className="w-full text-left px-3 py-2 rounded hover:bg-gray-50 flex items-center gap-2"
          onClick={() => {
            handleCommentClick(item.id);
            onClose();
          }}
        >
          <MessageSquare className="w-4 h-4" /> Add a comment
        </button>
        <hr className="my-1" />
        <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-50 flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Move to previous day
        </button>
        <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-50 flex items-center gap-2">
          <ChevronRight className="w-4 h-4" /> Move to next day
        </button>
        <hr className="my-1" />
        <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-50 flex items-center gap-2 text-red-600">
          <Trash2 className="w-4 h-4" /> Remove
        </button>
      </div>
    </div>
  );

  const MapPanel = () => (
    <div className="h-full bg-gray-100 rounded-lg relative overflow-hidden">
      <div className="absolute top-4 right-4 z-10 bg-white rounded-lg p-2 shadow-sm">
        <div className="flex items-center gap-2 text-sm">
          <span>Distances</span>
          <button 
            onClick={() => setShowDistances(!showDistances)}
            className={`w-10 h-6 rounded-full transition-colors ${showDistances ? 'bg-black' : 'bg-gray-300'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${showDistances ? 'translate-x-5' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>
      <img 
        src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80" 
        alt="Map" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center text-gray-600">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <MapIcon className="w-8 h-8 mx-auto mb-2" />
          <p className="text-sm">Interactive map with location pins</p>
          {hoveredLocation && <p className="text-xs text-gray-500 mt-1">Showing: {hoveredLocation}</p>}
        </div>
      </div>
    </div>
  );

  const DetailsPanel = () => (
    <div className="h-full bg-white rounded-lg overflow-hidden flex flex-col">
      {selectedItem && (
        <>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setRightPanelContent('map')}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
                <ChevronRight className="w-4 h-4 rotate-180" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <Heart className="w-4 h-4" /> Save
              </Button>
              <Badge variant="secondary">Added</Badge>
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-2">{selectedItem.title}</h1>
              
              {selectedItem.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{selectedItem.rating}</span>
                  <span className="text-gray-500">• {selectedItem.reviews}</span>
                  <span className="text-gray-500">• {selectedItem.location}</span>
                </div>
              )}

              {selectedItem.type && (
                <Badge variant="outline" className="mb-4">
                  {selectedItem.type.charAt(0).toUpperCase() + selectedItem.type.slice(1)}
                </Badge>
              )}

              {/* Images */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                {selectedItem.images?.slice(0, 4).map((img: string, idx: number) => (
                  <div key={idx} className={idx === 0 ? "col-span-2" : ""}>
                    <img src={img} alt="" className="rounded-lg aspect-video object-cover w-full" />
                  </div>
                )) || (selectedItem.thumbnail && (
                  <img src={selectedItem.thumbnail} alt="" className="rounded-lg aspect-video object-cover col-span-2" />
                ))}
                {selectedItem.images?.length > 4 && (
                  <Button variant="secondary" size="sm" className="absolute bottom-2 right-2">
                    Show all photos
                  </Button>
                )}
              </div>

              {/* Social proof */}
              {selectedItem.reviews && (
                <div className="flex items-center gap-2 mb-6">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-gray-600">Saved by 2 people</span>
                </div>
              )}

              {/* Tabs */}
              <div className="border-b mb-6">
                <div className="flex gap-6">
                  {['overview', 'guides', 'reviews', 'location'].map((tab) => (
                    <button
                      key={tab}
                      className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                        selectedDetailTab === tab
                          ? 'border-black text-black'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => setSelectedDetailTab(tab)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab content */}
              {selectedDetailTab === 'overview' && (
                <div className="space-y-4">
                  <p className="text-gray-600">
                    {selectedItem.description || "Detailed information about this location..."}
                  </p>

                  {selectedItem.address && (
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 mt-1 text-gray-500" />
                        <div>
                          <h4 className="font-medium">Address</h4>
                          <p className="text-sm text-gray-600 whitespace-pre-line">{selectedItem.address}</p>
                        </div>
                      </div>

                      {selectedItem.website && (
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-gray-500" />
                          <div>
                            <h4 className="font-medium">Website</h4>
                            <a href={`https://${selectedItem.website}`} className="text-sm text-blue-600 hover:underline">
                              {selectedItem.website}
                            </a>
                          </div>
                        </div>
                      )}

                      {selectedItem.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <div>
                            <h4 className="font-medium">Phone</h4>
                            <p className="text-sm text-gray-600">{selectedItem.phone}</p>
                          </div>
                        </div>
                      )}

                      {selectedItem.hours && (
                        <div className="flex items-start gap-2">
                          <Clock className="w-4 h-4 mt-1 text-gray-500" />
                          <div>
                            <h4 className="font-medium">Hours of operation</h4>
                            <p className="text-sm text-green-600">Open now</p>
                            <p className="text-sm text-gray-600">Daily 24 Hours</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {selectedItem.type === 'hotel' && (
                    <div className="border-t pt-4">
                      <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-500">From</p>
                            <p className="font-medium">Oct 31</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">To</p>
                            <p className="font-medium">Nov 3</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">2 travelers</p>
                        <Button className="w-full bg-black text-white hover:bg-gray-800">
                          Check flights
                        </Button>
                      </div>
                    </div>
                  )}

                  {selectedItem.type === 'activity' && (
                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-2">You might want to ask</h4>
                      <div className="space-y-2">
                        <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 flex items-center justify-between">
                          <span className="text-sm">What are the transportation options available to reach {selectedItem.title}?</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {selectedDetailTab === 'guides' && (
                <div className="text-center text-gray-500 py-8">
                  <p>No guides available yet</p>
                </div>
              )}

              {selectedDetailTab === 'reviews' && (
                <div className="text-center text-gray-500 py-8">
                  <p>Reviews will be displayed here</p>
                </div>
              )}

              {selectedDetailTab === 'location' && (
                <div className="text-center text-gray-500 py-8">
                  <p>Location details will be shown here</p>
                </div>
              )}
            </div>
          </div>

          {/* Bottom chat input for details */}
          {selectedDetailTab === 'overview' && (
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input placeholder="Ask anything..." className="flex-1" />
                <Button size="sm">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );

  const BookingPanel = () => (
    <div className="h-full bg-white rounded-lg flex flex-col">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setRightPanelContent('map')}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ChevronRight className="w-4 h-4 rotate-180" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <Heart className="w-4 h-4" /> Save
          </Button>
          <Badge variant="secondary">Added</Badge>
          <Button variant="ghost" size="sm">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Hotel Overview */}
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold mb-2">{selectedItem?.title}</h1>
        
        {selectedItem?.rating && (
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{selectedItem.rating}</span>
            <span className="text-gray-500">• {selectedItem.reviews}</span>
            <span className="text-gray-500">• {selectedItem.location}</span>
          </div>
        )}

        <Badge variant="outline" className="mb-4">Hotel</Badge>

        {/* Hotel Images */}
        {selectedItem?.images && (
          <div className="grid grid-cols-2 gap-2 mb-4">
            <img src={selectedItem.images[0]} alt="" className="rounded-lg aspect-video object-cover col-span-2" />
            {selectedItem.images.slice(1, 4).map((img: string, idx: number) => (
              <img key={idx} src={img} alt="" className="rounded-lg aspect-video object-cover" />
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-4 h-4 text-red-500" />
          <span className="text-sm text-gray-600">Saved by 5 people</span>
        </div>

        {/* Tabs */}
        <div className="border-b mb-4">
          <div className="flex gap-6">
            {['overview', 'rooms', 'amenities', 'reviews', 'location'].map((tab) => (
              <button
                key={tab}
                className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                  selectedDetailTab === tab
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setSelectedDetailTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {selectedDetailTab === 'overview' && (
          <div>
            <p className="text-gray-600 mb-4">
              {selectedItem?.description}
            </p>
          </div>
        )}

        {/* Booking section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold">${selectedItem?.pricePerNight}</span>
            <span className="text-gray-500">per night</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Check in</p>
              <p className="font-medium">Oct 31</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Check out</p>
              <p className="font-medium">Nov 3</p>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 mb-4">2 travelers</p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {bookingMessages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs px-4 py-2 rounded-lg ${
              msg.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input 
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Ask anything..."
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <Button onClick={sendMessage}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Left Sidebar - 50% width */}
      <div className="w-1/2 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-xl font-bold text-gray-900">{tripData.title}</h1>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">Thailand</Badge>
            <Badge variant="secondary">11 days</Badge>
            <Badge variant="secondary">2 travelers</Badge>
            <Badge variant="secondary">Budget</Badge>
          </div>

          <div className="flex border-b">
            <button 
              className={`px-4 py-2 text-sm font-medium border-b-2 ${
                activeTab === 'itinerary' ? 'border-black text-black' : 'border-transparent text-gray-500'
              }`}
              onClick={() => setActiveTab('itinerary')}
            >
              Itinerary
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium border-b-2 ${
                activeTab === 'calendar' ? 'border-black text-black' : 'border-transparent text-gray-500'
              }`}
              onClick={() => setActiveTab('calendar')}
            >
              Calendar
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'itinerary' && (
            <div className="p-4 space-y-4">
              {/* Itinerary 11 days */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg">Itinerary</span>
                  <span className="text-gray-500">11 days</span>
                </div>

                {Object.entries(itineraryData).map(([dayNum, dayData]) => (
                  <div key={dayNum} className="border border-gray-200 rounded-lg">
                    <button 
                      className="w-full p-3 text-left flex items-center gap-2 hover:bg-gray-50"
                      onClick={() => toggleDay(parseInt(dayNum))}
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform ${
                        expandedDays.includes(parseInt(dayNum)) ? '' : '-rotate-90'
                      }`} />
                      <span className="font-medium">Day {dayNum}</span>
                      <span className="text-sm text-gray-500">{dayData.title}</span>
                      <div className="ml-auto flex items-center gap-1">
                        <MoreHorizontal className="w-4 h-4" />
                        <MapIcon className="w-4 h-4" />
                      </div>
                    </button>

                    {expandedDays.includes(parseInt(dayNum)) && dayData.items && (
                      <div className="border-t border-gray-200 p-3 space-y-3">
                        {dayData.items.map((item: any) => (
                          <div key={item.id}>
                            <div 
                              className="flex items-center gap-3 p-3 rounded-lg border hover:shadow-sm transition-all cursor-pointer group relative"
                              onMouseEnter={() => handleItemHover(item)}
                              onContextMenu={(e) => handleContextMenu(e, item)}
                            >
                              <GripVertical className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                              
                              {!item.isAdvice && item.thumbnail && (
                                <img 
                                  src={item.thumbnail} 
                                  alt={item.title}
                                  className="w-12 h-12 rounded-lg object-cover"
                                />
                              )}
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  {getItemIcon(item.type)}
                                  <span className="font-medium text-sm">{item.title}</span>
                                </div>
                                {item.time && (
                                  <div className="flex items-center gap-1 text-xs text-gray-500">
                                    <Clock className="w-3 h-3" />
                                    <span>{item.time}</span>
                                  </div>
                                )}
                                {item.distance && (
                                  <div className="text-xs text-gray-400 mt-1">{item.distance}</div>
                                )}
                              </div>

                              <div className="flex items-center gap-1">
                                {item.canBook && (
                                  <Button 
                                    size="sm" 
                                    className="bg-black text-white hover:bg-gray-800 text-xs px-3"
                                    onClick={() => handleBookClick(item)}
                                  >
                                    Book
                                  </Button>
                                )}
                                {item.hasDetails && (
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="text-xs px-3"
                                    onClick={() => handleDetailsClick(item)}
                                  >
                                    Details
                                  </Button>
                                )}
                                <Button 
                                  size="sm" 
                                  variant="ghost"
                                  onClick={() => handleContextMenu({
                                    preventDefault: () => {},
                                    clientX: 0,
                                    clientY: 0
                                  } as any, item)}
                                >
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="ghost"
                                  onClick={() => handleCommentClick(item.id)}
                                >
                                  <MessageCircle className="w-4 h-4" />
                                  {item.hasComments && <span className="ml-1 text-xs">1</span>}
                                </Button>
                              </div>
                            </div>

                            {/* Comment Dropdown */}
                            {showCommentDropdown === item.id && (
                              <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-start gap-2">
                                  <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs">
                                    A
                                  </div>
                                  <div className="flex-1">
                                    <Input 
                                      placeholder="Add a comment..."
                                      value={commentText}
                                      onChange={(e) => setCommentText(e.target.value)}
                                      className="text-sm mb-2"
                                      autoFocus
                                    />
                                    <div className="flex justify-end gap-2">
                                      <Button size="sm" variant="ghost" onClick={() => setShowCommentDropdown(null)}>
                                        Cancel
                                      </Button>
                                      <Button size="sm" onClick={addComment}>
                                        Add
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'calendar' && (
            <div className="p-4 text-center text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Calendar view coming soon</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - 50% width */}
      <div className="w-1/2 p-6">
        {rightPanelContent === 'map' && <MapPanel />}
        {rightPanelContent === 'details' && <DetailsPanel />}
        {rightPanelContent === 'booking' && <BookingPanel />}
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
    </div>
  );
};

export default PreviewItinerary;