import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlayCircle, CheckCircle2, SaveAll, Landmark } from "lucide-react";
import { track } from "@/lib/analytics";

const steps = [
  { id: 0, label: "Save content", icon: SaveAll },
  { id: 1, label: "Auto‑organize", icon: Landmark },
  { id: 2, label: "Plan trip", icon: PlayCircle },
  { id: 3, label: "Book & go", icon: CheckCircle2 },
];

const HowItWorks: React.FC = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const ActiveIcon = useMemo(() => steps[active].icon, [active]);
  const stepMedia = [
    { type: "image", src: "/lovable-uploads/fecf991b-a2fb-4a4f-b66a-03f68073fdcf.png", alt: "Send to Verso from Instagram, WhatsApp, TikTok" },
    { type: "image", src: "/lovable-uploads/b46855c2-8558-4896-a8b4-af86c6c92b6f.png", alt: "Auto-organized content, found in seconds" },
    { type: "itinerary" },
    { type: "booking" },
  ] as const;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((s) => (s + 1) % steps.length), 3500);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section id="how-it-works" className="py-16" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">How it works</h2>

        {/* Overview bar */}
        <div className="flex gap-3 overflow-x-auto pb-2 mb-8">
          {steps.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setActive(idx)}
              className={
                "flex items-center gap-2 px-4 py-2 rounded-full border transition-all whitespace-nowrap min-w-max " +
                (active === idx ? "bg-coral text-white shadow ring-2 ring-primary/40" : "hover:bg-muted/60")
              }
              aria-current={active === idx ? "step" : undefined}
            >
              <s.icon className="h-4 w-4" /> {s.label}
            </button>
          ))}
        </div>

        {/* Detail card */}
        <div className="rounded-xl border p-6 grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">{steps[active].label}</h3>
            <p className="text-muted-foreground mb-4">
              A quick look at how Verso helps you {steps[active].label.toLowerCase()} in seconds.
            </p>
            <Button
              variant="coral"
              onClick={() => {
                track("how_it_works_cta_click", { step: steps[active].label });
                const el = document.getElementById("plan");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Build my first trip
            </Button>
          </div>
          <div className="aspect-video rounded-lg bg-muted overflow-hidden relative">
            {stepMedia[active].type === "image" && (
              <>
                {/* Micro-demo image with gradient overlay */}
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <img
                  src={(stepMedia[active] as any).src}
                  alt={(stepMedia[active] as any).alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </>
            )}

            {stepMedia[active].type === "itinerary" && (
              <div className="p-4 grid gap-3">
                <div className="rounded-md border bg-background p-3">
                  <div className="text-sm font-medium">Day 1: Bangkok street food</div>
                  <div className="text-xs text-muted-foreground">Saved posts → mapped to itinerary</div>
                </div>
                <div className="rounded-md border bg-background p-3">
                  <div className="text-sm font-medium">Day 2: Temples & Old City</div>
                  <div className="text-xs text-muted-foreground">Auto-grouped activities</div>
                </div>
                <div className="rounded-md border bg-background p-3">
                  <div className="text-sm font-medium">Day 3: Rooftop views</div>
                  <div className="text-xs text-muted-foreground">Creator‑verified picks</div>
                </div>
              </div>
            )}

            {stepMedia[active].type === "booking" && (
              <div className="h-full w-full grid place-items-center p-4">
                <div className="max-w-sm w-full rounded-xl border bg-background p-4 shadow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Trip total</span>
                    <span className="font-semibold">$2,180</span>
                  </div>
                  <Button className="w-full bg-coral text-white">One‑click Book All</Button>
                  <ul className="mt-3 text-xs text-muted-foreground space-y-1">
                    <li>Flights • Hotels • Activities</li>
                    <li>Free cancellation (24h)</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
