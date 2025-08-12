import React, { useMemo, useState } from "react";
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
  const ActiveIcon = useMemo(() => steps[active].icon, [active]);

  return (
    <section id="how-it-works" className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">How it works</h2>

        {/* Overview bar */}
        <div className="flex gap-3 overflow-x-auto pb-2 mb-8">
          {steps.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setActive(idx)}
              className={
                "flex items-center gap-2 px-4 py-2 rounded-full border transition-all " +
                (active === idx ? "bg-coral text-white shadow" : "hover:bg-muted/60")
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
          <div className="aspect-video rounded-lg bg-muted grid place-items-center">
            <ActiveIcon className="h-14 w-14 text-muted-foreground" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
