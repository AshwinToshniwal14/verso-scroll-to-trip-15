import { useEffect, useState } from "react";
import { WaitlistForm } from "./WaitlistForm";

export const StickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 500;
      setIsVisible(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-4 transition-all duration-500 z-50 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="max-w-sm mx-auto flex flex-col items-center gap-3">
        <div className="text-center">
          <h3 className="font-bold text-primary text-lg">Build your travel inbox</h3>
          <p className="text-sm text-gray-600">Join 8,400+ travelers on the waitlist</p>
        </div>
        <div className="w-full">
          <WaitlistForm compact />
        </div>
      </div>
    </div>
  );
};