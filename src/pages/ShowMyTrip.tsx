import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";
import { CalendarIcon, Users, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

const ShowMyTrip = () => {
  const navigate = useNavigate();
  const [tripTitle, setTripTitle] = useState("Thailand Escape");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [planSolo, setPlanSolo] = useState(false);
  const [coTravelers, setCoTravelers] = useState<string[]>([]);
  const [newTraveler, setNewTraveler] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);

  const contentThumbnails = [
    { type: "café", count: 3, image: "https://images.unsplash.com/photo-1561713528-cdb93dee84ea?auto=format&fit=crop&w=150&q=80" },
    { type: "temples", count: 2, image: "https://images.unsplash.com/photo-1520637836862-4d197d17c50a?auto=format&fit=crop&w=150&q=80" },
    { type: "beaches", count: 1, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=150&q=80" }
  ];

  const addCoTraveler = () => {
    if (newTraveler.trim() && !coTravelers.includes(newTraveler.trim())) {
      setCoTravelers([...coTravelers, newTraveler.trim()]);
      setNewTraveler("");
    }
  };

  const removeCoTraveler = (traveler: string) => {
    setCoTravelers(coTravelers.filter(t => t !== traveler));
  };

  const handleLockTrip = () => {
    setShowConfetti(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Let's make it real
            </h1>
            <p className="text-xl text-muted-foreground">
              4 days. 3 cities. Built from your reels.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Step 1: Trip Title */}
              <Card className={`transition-all duration-500 ${currentStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="w-8 h-8 bg-coral-500 text-white rounded-full flex items-center justify-center text-sm">1</span>
                    Name Your Adventure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Label htmlFor="trip-title" className="text-base font-medium">
                    Trip Title
                  </Label>
                  <Input
                    id="trip-title"
                    value={tripTitle}
                    onChange={(e) => setTripTitle(e.target.value)}
                    className="mt-2 text-lg"
                    placeholder="Thailand Escape"
                    onFocus={() => setCurrentStep(Math.max(currentStep, 1))}
                  />
                </CardContent>
              </Card>

              {/* Step 2: Dates */}
              <Card className={`transition-all duration-500 delay-200 ${currentStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="w-8 h-8 bg-coral-500 text-white rounded-full flex items-center justify-center text-sm">2</span>
                    Pick Your Dates
                  </CardTitle>
                  <p className="text-muted-foreground">Rough dates? Add them here. We'll sort the rest.</p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-base font-medium">Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal mt-2",
                              !startDate && "text-muted-foreground"
                            )}
                            onFocus={() => setCurrentStep(Math.max(currentStep, 2))}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {startDate ? format(startDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={setStartDate}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div>
                      <Label className="text-base font-medium">End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal mt-2",
                              !endDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {endDate ? format(endDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={setEndDate}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Step 3: Co-travelers */}
              <Card className={`transition-all duration-500 delay-400 ${currentStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="w-8 h-8 bg-coral-500 text-white rounded-full flex items-center justify-center text-sm">3</span>
                    Bring Your Crew
                  </CardTitle>
                  <p className="text-muted-foreground">Bring your crew. Or go solo. Either way, it's your trip.</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="plan-solo"
                      checked={planSolo}
                      onCheckedChange={setPlanSolo}
                    />
                    <Label htmlFor="plan-solo" className="text-base">Plan solo</Label>
                  </div>

                  {!planSolo && (
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Instagram handle or email"
                          value={newTraveler}
                          onChange={(e) => setNewTraveler(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addCoTraveler()}
                          onFocus={() => setCurrentStep(Math.max(currentStep, 3))}
                        />
                        <Button 
                          onClick={addCoTraveler}
                          size="icon"
                          variant="outline"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {coTravelers.length > 0 && (
                        <div className="space-y-2">
                          {coTravelers.map((traveler) => (
                            <div key={traveler} className="flex items-center justify-between bg-muted p-2 rounded">
                              <span className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                {traveler}
                              </span>
                              <Button
                                onClick={() => removeCoTraveler(traveler)}
                                size="icon"
                                variant="ghost"
                                className="h-6 w-6"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Lock Trip CTA */}
              <div className="text-center pt-8">
                <Button 
                  onClick={handleLockTrip}
                  size="lg"
                  className="bg-coral-500 hover:bg-coral-600 text-white px-8 py-4 text-lg relative overflow-hidden"
                >
                  {showConfetti && (
                    <div className="absolute inset-0 bg-gradient-to-r from-coral-400 to-coral-600 animate-pulse" />
                  )}
                  <span className="relative">→ Lock This Trip</span>
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Content</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    We organized your 17 saved dreams from Thailand
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {contentThumbnails.map((content) => (
                      <div key={content.type} className="flex items-center gap-3">
                        <img 
                          src={content.image} 
                          alt={content.type}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-medium capitalize">{content.type}</p>
                          <p className="text-sm text-muted-foreground">{content.count} saved</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Budget Estimate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-coral-500">$120</p>
                    <p className="text-muted-foreground">avg spend per day</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Confetti effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="text-6xl animate-bounce">🎉</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowMyTrip;