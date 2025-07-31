import { useEffect, useRef, useState } from "react";
import lisbonCafe from "@/assets/lisbon-cafe-reel.jpg";
import baliBeach from "@/assets/bali-beach-tiktok.jpg";
import versoDashboard from "@/assets/verso-dashboard.jpg";

export const VersoMagic = () => {
  const [inView, setInView] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % 3);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [inView]);

  const steps = [
    {
      title: "Saved from TikTok",
      description: "Kyoto Ramen",
      image: baliBeach,
      icon: "🎵",
      action: "Send to Verso"
    },
    {
      title: "Add to Trip", 
      description: "mapped nearby",
      image: lisbonCafe,
      icon: "📍",
      action: "Auto-organize"
    },
    {
      title: "Book with Verso",
      description: "aggregates Expedia, Booking",
      image: versoDashboard,
      icon: "✈️",
      action: "Book All"
    }
  ];

  return (
    <section ref={sectionRef} className="section-padding bg-white">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className={`text-center mb-16 scroll-reveal ${inView ? 'visible' : ''}`}>
          <h2 className="section-headline mb-4">
            Save anything. We build everything.
          </h2>
          <p className="body-large max-w-2xl mx-auto text-gray-600">
            12 reels in → 3-day trip out.
          </p>
        </div>

        {/* Horizontal Scroll Animation */}
        <div className="max-w-6xl mx-auto">
          <div className={`swipe-container md:grid md:grid-cols-3 md:gap-8 scroll-reveal ${inView ? 'visible' : ''}`}>
            
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`swipe-card transition-all duration-700 ${
                  currentStep === index ? 'scale-105 shadow-2xl' : 'scale-95 opacity-70'
                }`}
              >
                <div className="content-card">
                  <div className="relative overflow-hidden">
                    <img 
                      src={step.image} 
                      alt={step.description}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 rounded-full p-2">
                      <span className="text-xl">{step.icon}</span>
                    </div>
                    {currentStep === index && (
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-coral text-white px-3 py-1 rounded-full text-sm font-medium">
                          {step.action}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-medium text-primary mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
          </div>
        </div>

        {/* Partner Bar */}
        <div className={`mt-20 text-center scroll-reveal stagger-2 ${inView ? 'visible' : ''}`}>
          <div className="flex justify-center items-center space-x-8 opacity-60 hover:opacity-100 transition-opacity">
            <span className="text-lg font-medium text-gray-600">Booking.com</span>
            <span className="text-gray-400">•</span>
            <span className="text-lg font-medium text-gray-600">Expedia</span>
            <span className="text-gray-400">•</span>
            <span className="text-lg font-medium text-gray-600">Skyscanner</span>
          </div>
        </div>

      </div>
    </section>
  );
};