import { useEffect, useRef, useState } from "react";

export const InboxToItinerary = () => {
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
    <section ref={sectionRef} className="py-12 bg-white">
      <div className="max-w-sm mx-auto px-4">
        {/* Booking Partners */}
        <div className={`text-center transition-all duration-1000 delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-sm text-gray-500 mb-3">Book with trusted partners</p>
          <div className="flex justify-center items-center space-x-4 text-gray-600">
            <span className="text-sm font-medium">Booking.com</span>
            <span className="text-gray-300">•</span>
            <span className="text-sm font-medium">Expedia</span>
            <span className="text-gray-300">•</span>
            <span className="text-sm font-medium">Skyscanner</span>
          </div>
        </div>
      </div>
    </section>
  );
};