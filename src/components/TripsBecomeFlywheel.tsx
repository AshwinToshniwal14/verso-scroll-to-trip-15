import { useEffect, useMemo, useRef, useState } from "react";
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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(false);
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

  // Auto-scroll horizontally like hero carousel
  useEffect(() => {
    if (paused) return;
    const el = containerRef.current;
    if (!el) return;
    const id = setInterval(() => {
      if (!el) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      const next = el.scrollLeft + el.clientWidth * 0.9;
      el.scrollTo({ left: next >= maxScroll ? 0 : next, behavior: 'smooth' });
    }, 3500);
    return () => clearInterval(id);
  }, [paused, filtered.length]);

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
        <div
          ref={containerRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="mt-6 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-pl-4 pr-4 pb-2 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:snap-none"
        >
          {filtered.map((trip, idx) => {
            const isFeature = trip.featured && idx < 2; // show a few larger cards on desktop
            return (
              <article
                key={trip.id}
                className={`group relative overflow-hidden rounded-2xl border bg-card min-w-[80%] sm:min-w-[60%] md:min-w-0 snap-start ${isFeature ? 'md:col-span-2' : ''}`}
                aria-label={`${trip.title} by ${trip.creator}`}
              >
                <img
                  src={trip.image}
                  alt={`${trip.title} in ${trip.location}`}
                  className={`w-full ${isFeature ? 'h-72 md:h-80' : 'h-60 md:h-56'} object-cover transition-transform duration-300 group-hover:scale-105`}
                  loading="lazy"
                />

                {/* Gradient + Text overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 via-black/30 to-transparent text-white">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-semibold leading-tight">{trip.title}</h3>
                      <p className="text-xs opacity-90 truncate">{trip.location} • {trip.length} • {trip.creator}</p>
                    </div>
                    <div className="text-sm font-medium shrink-0">⭐ {trip.rating}</div>
                  </div>
                </div>

                {/* Hover/Tap actions */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                <div className="absolute inset-x-4 bottom-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                  <Button size="sm" variant="coral">Explore Trip</Button>
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