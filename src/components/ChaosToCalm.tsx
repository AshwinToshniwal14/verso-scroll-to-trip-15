import { useEffect, useRef, useState } from "react";
import organizedContent from "@/assets/organized-content.jpg";

export const ChaosToCalm = () => {
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
    <section ref={sectionRef} className="py-16 bg-warm-white">
      <div className="max-w-sm mx-auto px-4">
        
        {/* Section Header removed per request to avoid repetition */}

        {/* Simplified Platform Grid */}
        <div className={`mb-8 transition-all duration-1000 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-1 gap-4 mb-6">
            <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📸</span>
                <span className="font-medium text-gray-700">Instagram</span>
              </div>
              <div className="text-sm text-coral font-medium bg-coral/10 px-3 py-1 rounded-full">
                Tag @Verso
              </div>
            </div>
            
            <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">💬</span>
                <span className="font-medium text-gray-700">WhatsApp</span>
              </div>
              <div className="text-sm text-coral font-medium bg-coral/10 px-3 py-1 rounded-full">
                Forward to Bot
              </div>
            </div>
            
            <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🎵</span>
                <span className="font-medium text-gray-700">TikTok</span>
              </div>
              <div className="text-sm text-coral font-medium bg-coral/10 px-3 py-1 rounded-full">
                Send to Inbox
              </div>
            </div>
          </div>
          
          {/* Callout removed per request */}
        </div>

        {/* Transformation Arrow */}
        <div className="flex justify-center mb-8">
          <div className={`transform transition-all duration-1000 delay-500 ${inView ? 'scale-110 rotate-0 text-coral' : 'scale-90 rotate-90 text-gray-300'}`}>
            <span className="text-4xl">↓</span>
          </div>
        </div>

        {/* After - Organized View */}
        <div className={`transition-all duration-1000 delay-700 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <img 
              src={organizedContent} 
              alt="Organized travel content in Verso dashboard" 
              className="w-full h-80 object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end">
              <div className="p-6 text-white w-full">
                <h3 className="text-lg font-semibold mb-2">After: Found in seconds</h3>
                <p className="text-sm opacity-90">Verso organizes it into a bookable plan</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};