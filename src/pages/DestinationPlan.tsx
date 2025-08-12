import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PlanTravel from "@/components/PlanTravel";
import ProgressBar from "@/components/ProgressBar";
import BookingSummary from "@/components/BookingSummary";

const DestinationPlan: React.FC = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const name = params.get("name") || "Destination";
  const image = params.get("image") || "/lovable-uploads/adc9a232-4eaf-487d-a742-b589704cdc8f.png";

  const thingsToDo = [
    { title: "Street food tour", meta: "Local eats • 2h", img: "/lovable-uploads/adc9a232-4eaf-487d-a742-b589704cdc8f.png" },
    { title: "Old town walk", meta: "Historic core • 1.5h", img: "/lovable-uploads/7b58305b-628b-4e49-819e-c86113305a31.png" },
    { title: "Sunset viewpoint", meta: "Golden hour • 45m", img: "/lovable-uploads/b7f95780-cac4-461d-a389-3a5cbc33c28d.png" },
  ];

  const topAttractions = [
    { title: "Grand Temple", rating: 4.7, img: "/lovable-uploads/c45a5501-917b-40c4-b954-3a8382ce76ce.png" },
    { title: "River Market", rating: 4.6, img: "/lovable-uploads/70ed9a32-2f15-4f6f-83a8-61719ca3c2de.png" },
    { title: "Sky Bar", rating: 4.5, img: "/lovable-uploads/8006d940-cc72-415d-ad51-54765e172984.png" },
    { title: "Island Hop", rating: 4.8, img: "/lovable-uploads/0147a9e5-789a-47b0-b445-73d474847b02.png" },
  ];

  const verifiedItineraries = [
    { title: "3 Days Food & Culture", creator: "@verified_creator", places: 18, img: "/lovable-uploads/adc9a232-4eaf-487d-a742-b589704cdc8f.png" },
    { title: "5 Days Beach & Nature", creator: "@verso_travel", places: 24, img: "/lovable-uploads/70ed9a32-2f15-4f6f-83a8-61719ca3c2de.png" },
    { title: "Family Friendly Week", creator: "@nomaradness", places: 20, img: "/lovable-uploads/edfefd31-e9be-4269-a9c8-e098d69fbe86.png" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold">Plan • {name}</h1>
          <Button variant="ghost" onClick={() => navigate('/')}>Back</Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <ProgressBar currentStep={1} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: content */}
        <section className="lg:col-span-2 space-y-6">
          {/* Hero */}
          <div className="relative rounded-xl overflow-hidden border">
            <img src={image} alt={`${name} hero`} className="w-full h-56 md:h-72 object-cover" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg md:text-xl font-semibold">Discover {name}</h2>
                <p className="text-xs md:text-sm text-muted-foreground">Things to do, top attractions and verified itineraries</p>
              </div>
              <Badge className="bg-black/70 text-white">Verified</Badge>
            </div>
          </div>

          {/* Things to do */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Things to do</h3>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="flex gap-4 overflow-x-auto snap-x pb-2">
              {thingsToDo.map((t) => (
                <Card key={t.title} className="min-w-[260px] snap-start hover:shadow-md transition-shadow">
                  <img src={t.img} alt={t.title} className="w-full h-36 object-cover" loading="lazy" />
                  <CardContent className="p-3">
                    <div className="font-medium">{t.title}</div>
                    <div className="text-xs text-muted-foreground">{t.meta}</div>
                  </CardContent>
                </Card>
              ))}
              <Card className="min-w-[220px] snap-start flex items-center justify-center">
                <CardContent className="p-0">
                  <Button variant="link">View All →</Button>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Top attractions */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Top attractions</h3>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {topAttractions.map((a) => (
                <Card key={a.title} className="overflow-hidden hover:shadow-md transition-shadow">
                  <img src={a.img} alt={a.title} className="w-full aspect-video object-cover" loading="lazy" />
                  <CardContent className="p-3">
                    <div className="text-sm font-medium">{a.title}</div>
                    <div className="text-xs text-muted-foreground">Rating {a.rating}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Curated itineraries */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Curated itineraries from verified travellers</h3>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="flex gap-4 overflow-x-auto snap-x pb-2">
              {verifiedItineraries.map((it) => (
                <Card key={it.title} className="min-w-[260px] snap-start overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img src={it.img} alt={it.title} className="w-full h-36 object-cover" loading="lazy" />
                    <Badge className="absolute top-2 left-2 bg-black/70 text-white text-xs">Verified</Badge>
                  </div>
                  <CardContent className="p-3">
                    <div className="font-medium leading-tight">{it.title}</div>
                    <div className="text-xs text-muted-foreground">by {it.creator} • {it.places} places</div>
                  </CardContent>
                </Card>
              ))}
              <Card className="min-w-[220px] snap-start flex items-center justify-center">
                <CardContent className="p-0">
                  <Button variant="link">View All →</Button>
                </CardContent>
              </Card>
            </div>
          </section>
        </section>

        {/* Right column: Plan Travel + Booking Summary */}
        <aside className="lg:col-span-1 space-y-4">
          <PlanTravel destination={name} />
          <BookingSummary pricePerPerson={899} nights={5} urgencyText="Booked 12 times today" />
        </aside>
      </div>
    </main>
    </div>
  );
};

export default DestinationPlan;
