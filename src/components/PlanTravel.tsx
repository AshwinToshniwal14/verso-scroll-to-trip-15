import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, Compass, MapPin } from "lucide-react";
import StubMap from "./StubMap";
import heroImg from "@/assets/verso-dashboard.jpg";

interface PlanTravelProps {
  destination?: string | null;
}

const PlanTravel: React.FC<PlanTravelProps> = ({ destination }) => {
  const [highlighted, setHighlighted] = useState<string | null>(null);

  const items = useMemo(
    () => [
      { id: "p1", title: "Old Town Walking Trail", meta: "Historic core • 2h", verified: true },
      { id: "p2", title: "Riverfront Night Market", meta: "Street eats • 1.5h", verified: true },
      { id: "p3", title: "Sunset Viewpoint", meta: "Golden hour • 45m", verified: true },
    ],
    []
  );

  const quickActions = [
    { id: "nature", label: "🌿 Add nature day" },
    { id: "food", label: "🍜 More food experiences" },
    { id: "pace", label: "⚡ Faster pace" },
  ];

  return (
    <section aria-label="Plan Travel" className="space-y-4">
      {/* Hero */}
      <div className="relative rounded-xl overflow-hidden border">
        <img
          src={heroImg}
          alt={(destination || "Destination") + " hero image"}
          className="w-full h-40 md:h-56 object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg md:text-xl font-semibold">
              {destination ? `Planning • ${destination}` : "Plan your next trip"}
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground">
              Smart suggestions update your itinerary in real-time
            </p>
          </div>
          <Badge className="bg-black/70 text-white">Verified creators</Badge>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2">
        {quickActions.map((qa) => (
          <Button key={qa.id} variant="outline" className="rounded-full h-9">
            {qa.label}
          </Button>
        ))}
      </div>

      {/* Split/Stacked Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Chat */}
        <Card className="h-full">
          <CardContent className="p-4 flex flex-col gap-3">
            <div className="text-sm text-muted-foreground">
              Share preferences. I’ll adjust the plan and map instantly.
            </div>
            <div className="bg-muted p-3 rounded-lg">
              <div className="text-sm">Try prompts:</div>
              <div className="flex flex-wrap gap-2 mt-2">
                {quickActions.map((qa) => (
                  <Badge key={qa.id} variant="outline" className="cursor-pointer">
                    {qa.label}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="mt-auto flex gap-2 pt-2 border-t">
              <Input placeholder="Ask anything..." className="flex-1" />
              <Button size="sm">
                <Mic className="h-4 w-4" />
              </Button>
              <Button size="sm" className="bg-coral hover:bg-coral/90 text-white">Send</Button>
            </div>
            <p className="text-[11px] text-muted-foreground">⏰ AI may make mistakes — verify important details</p>
          </CardContent>
        </Card>

        {/* Right: Itinerary + Map */}
        <div className="grid grid-rows-2 gap-4">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-3 flex items-center gap-2 border-b">
                <Compass className="h-4 w-4" />
                <h3 className="text-sm font-semibold">Itinerary preview</h3>
              </div>
              <ul className="divide-y">
                {items.map((it) => (
                  <li
                    key={it.id}
                    onMouseEnter={() => setHighlighted(it.id)}
                    onMouseLeave={() => setHighlighted(null)}
                    className="p-3 hover:bg-muted/50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">{it.title}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {it.meta}
                        </div>
                      </div>
                      {it.verified && (
                        <Badge className="text-[10px]">Verified</Badge>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardContent className="p-3 h-full">
              <StubMap highlightedId={highlighted} />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PlanTravel;
