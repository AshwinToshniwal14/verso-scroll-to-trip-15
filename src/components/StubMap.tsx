import React from "react";

interface StubMapProps {
  highlightedId?: string | null;
}

// Simple stub map with animated pins; replace with Mapbox later
const StubMap: React.FC<StubMapProps> = ({ highlightedId }) => {
  const pins = [
    { id: "p1", top: "20%", left: "25%" },
    { id: "p2", top: "55%", left: "60%" },
    { id: "p3", top: "70%", left: "35%" },
  ];

  return (
    <div className="relative w-full h-64 md:h-full rounded-xl overflow-hidden bg-gradient-to-br from-primary/5 to-muted border">
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundSize: "28px 28px", backgroundImage: "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)" }} />
      {/* Pins */}
      {pins.map((pin) => (
        <div
          key={pin.id}
          className={`absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ${
            highlightedId === pin.id ? "scale-110" : "scale-90"
          }`}
          style={{ top: pin.top, left: pin.left }}
        >
          <div className={`w-3 h-3 rounded-full shadow-md ${
            highlightedId === pin.id ? "bg-coral animate-pulse" : "bg-primary/60"
          }`} />
        </div>
      ))}
      {/* Soft vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/10" />
    </div>
  );
};

export default StubMap;
