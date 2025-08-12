import { useMemo, useState } from "react";
import CategoryFilter from "./CategoryFilter";
import { Button } from "@/components/ui/button";

interface TripCard {
  id: string;
  title: string;
  location: string;
  length: string;
  creator: string;
  image: string;
  rating: number;
  categories: string[];
  featured?: boolean;
}

const ALL_CATEGORIES = ["Beach", "Food", "Culture", "Adventure"] as const;

export const TripsBecomeFlywheel = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const trips = useMemo<TripCard[]>(
    () => [
      { id: "1", title: "Lisbon Cafés & Tiles", location: "Portugal", length: "5 days", creator: "@luisa", image: "/lovable-uploads/50450ba1-2407-4d4f-97c3-6bb955cac313.png", rating: 4.8, categories: ["Food", "Culture"], featured: true },
      { id: "2", title: "Bali Beaches Loop", location: "Indonesia", length: "7 days", creator: "@eko", image: "/lovable-uploads/31de207c-20bf-4c4b-998d-e824356aa265.png", rating: 4.9, categories: ["Beach", "Adventure"], featured: true },
      { id: "3", title: "Bangkok Night Bites", location: "Thailand", length: "3 days", creator: "@mali", image: "/lovable-uploads/ea4841bb-744b-4573-a24d-1cc19c322390.png", rating: 4.7, categories: ["Food", "Culture"] },
      { id: "4", title: "Hanoi Old Quarter", location: "Vietnam", length: "4 days", creator: "@anh", image: "/lovable-uploads/7b58305b-628b-4e49-819e-c86113305a31.png", rating: 4.6, categories: ["Culture"] },
      { id: "5", title: "Phuket Island Hops", location: "Thailand", length: "6 days", creator: "@mark", image: "/lovable-uploads/821fb983-af77-4d9e-b33e-effe2be267b1.png", rating: 4.5, categories: ["Beach", "Adventure"] },
      { id: "6", title: "Singapore Eats", location: "Singapore", length: "3 days", creator: "@li", image: "/lovable-uploads/adc9a232-4eaf-487d-a742-b589704cdc8f.png", rating: 4.6, categories: ["Food"] },
    ],
    []
  );

  const filtered = useMemo(() => {
    if (selected.length === 0) return trips;
    return trips.filter((t) => selected.every((c) => t.categories.includes(c)));
  }, [selected, trips]);

  const toggleCategory = (cat: string) => {
    setSelected((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]));
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-6xl mx-auto px-4">
        <header className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-primary">Discover trips</h2>
          <p className="text-muted-foreground">Pick a vibe and jump in.</p>
        </header>

        {/* Filters */}
        <CategoryFilter
          categories={[...ALL_CATEGORIES]}
          selected={selected}
          onToggle={toggleCategory}
        />

        {/* Gallery */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((trip, idx) => {
            const isFeature = trip.featured && idx < 2; // show a few larger cards
            return (
              <article
                key={trip.id}
                className={`group relative overflow-hidden rounded-2xl border bg-card ${isFeature ? 'sm:col-span-2' : ''}`}
              >
                <img
                  src={trip.image}
                  alt={`${trip.title} in ${trip.location}`}
                  className={`w-full ${isFeature ? 'h-80' : 'h-56'} object-cover transition-transform duration-300 group-hover:scale-105`}
                  loading="lazy"
                />

                {/* Text overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold leading-tight">{trip.title}</h3>
                      <p className="text-xs opacity-90">{trip.location} • {trip.length} • {trip.creator}</p>
                    </div>
                    <div className="text-sm font-medium">⭐ {trip.rating}</div>
                  </div>
                </div>

                {/* Hover actions */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                <div className="absolute inset-x-4 bottom-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                  <Button size="sm" className="bg-coral text-white">Explore Trip</Button>
                  <Button size="sm" variant="secondary">Save to My Trip</Button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};