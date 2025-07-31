import { useEffect, useRef, useState } from "react";

export const TripsBecomeFlywheel = () => {
  const [inView, setInView] = useState(false);
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

  return (
    <section ref={sectionRef} className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-sm mx-auto px-4">
        
        <div className={`text-center mb-8 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-2xl font-bold leading-tight mb-3 text-primary">
            Every trip becomes someone else's starting point.
          </h2>
          <p className="text-base text-gray-600">
            With Verso, your travel memories compound.
          </p>
        </div>

        {/* Visual Flow */}
        <div className={`mb-8 transition-all duration-1000 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="space-y-6">
            
            {/* Your Trip */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">✈️</span>
                <span className="font-semibold text-primary">Your Lisbon Trip</span>
              </div>
              <p className="text-gray-600 text-sm">3 days • 12 saved spots • Just completed</p>
            </div>

            {/* Arrow Down */}
            <div className="flex justify-center">
              <div className="text-coral text-2xl animate-bounce">↓</div>
            </div>

            {/* Becomes Guide */}
            <div className="bg-coral/10 rounded-2xl p-6 border border-coral/20">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">📖</span>
                <span className="font-semibold text-coral">Becomes a Guide</span>
              </div>
              <p className="text-gray-600 text-sm">Now helping 47 other travelers plan Lisbon</p>
            </div>

            {/* Arrow Down */}
            <div className="flex justify-center">
              <div className="text-coral text-2xl">↓</div>
            </div>

            {/* Next Traveler */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">🌟</span>
                <span className="font-semibold text-primary">Next Traveler</span>
              </div>
              <p className="text-gray-600 text-sm">Uses your trip as their starting point</p>
            </div>

          </div>
        </div>

        {/* Bottom Message */}
        <div className={`text-center transition-all duration-1000 delay-600 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-white rounded-full px-6 py-3 shadow-lg inline-block border border-gray-100">
            <span className="text-primary font-medium">Your next trip starts here.</span>
            <span className="text-gray-600 mx-2">•</span>
            <span className="text-coral font-medium">Your last one helps the next.</span>
          </div>
        </div>

      </div>
    </section>
  );
};