import { useEffect, useState } from "react";
import { WaitlistForm } from "./WaitlistForm";
import lisbonCafe from "@/assets/lisbon-cafe-reel.jpg";
import baliBeach from "@/assets/bali-beach-tiktok.jpg";
import versoDashboard from "@/assets/verso-dashboard.jpg";

export const Hero = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const transformationSteps = [
    {
      title: "Tag @Verso on Instagram",
      description: "Found amazing Phuket beach villa",
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=400&q=80",
      icon: "📸",
      overlay: "Tag @Verso"
    },
    {
      title: "Appears in Verso Inbox", 
      description: "Auto-categorized as 'Thailand Trip'",
      image: versoDashboard,
      icon: "📥",
      overlay: "Inbox sorts it"
    },
    {
      title: "Trip builds automatically",
      description: "Temples, beaches, street food added",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=400&q=80",
      icon: "🗺️",
      overlay: "Itinerary forms"
    },
    {
      title: "Ready to book",
      description: "One tap books everything",
      image: versoDashboard,
      icon: "✈️",
      overlay: "→ Show My Trip"
    }
  ];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left' && currentStep < transformationSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (direction === 'right' && currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-white px-4 py-8 overflow-hidden">
      {/* Global gradient to improve text contrast */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/5" />
      <div className="w-full max-w-sm mx-auto relative">
        {/* New Hero Copy */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold leading-tight mb-4 text-primary">
            Saved reels in.<br />
            <span className="text-coral">Day-wise itinerary out.</span>
          </h1>
          <h2 className="text-xl mb-6 text-gray-600 font-medium">
            You saved 17 reels. We turned them into a trip.
          </h2>
        </div>

        {/* Content-to-Itinerary Transformation Flow */}
        <div className="mb-8 relative">
          <div 
            className="relative overflow-hidden rounded-2xl"
            onTouchStart={(e) => {
              const touchStart = e.touches[0].clientX;
              e.currentTarget.addEventListener('touchend', (endEvent) => {
                const touchEnd = (endEvent as TouchEvent).changedTouches[0].clientX;
                const diff = touchStart - touchEnd;
                if (Math.abs(diff) > 50) {
                  handleSwipe(diff > 0 ? 'left' : 'right');
                }
              }, { once: true });
            }}
          >
            <div 
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentStep * 100}%)` }}
            >
              {transformationSteps.map((step, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="relative">
                      <img 
                        src={step.image} 
                        alt={step.description}
                        className="w-full h-80 object-cover"
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                      {/* Image gradient overlay for readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                        <span className="text-xl">{step.icon}</span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-coral text-white px-6 py-3 rounded-full text-base font-medium text-center shadow-lg">
                          {step.overlay}
                        </div>
                      </div>
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-semibold text-primary mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 text-base">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop arrow controls */}
            <button
              aria-label="Previous"
              className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full w-10 h-10 items-center justify-center shadow"
              onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
            >
              ‹
            </button>
            <button
              aria-label="Next"
              className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full w-10 h-10 items-center justify-center shadow"
              onClick={() => setCurrentStep((s) => Math.min(transformationSteps.length - 1, s + 1))}
            >
              ›
            </button>
          </div>
          {/* Step Indicators */}
          <div className="flex justify-center mt-6 space-x-3">
            {transformationSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentStep === index ? 'bg-coral w-8' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Updated CTAs */}
        <div className="mb-4 flex flex-col items-center gap-3">
          <div className="w-full">
            <WaitlistForm />
          </div>
          <a href="#how-it-works" className="text-sm text-primary hover:underline">See how it works →</a>
        </div>
        <p className="text-base text-center text-gray-500">Early access • Free travel toolkit</p>

      </div>
    </section>
  );
};