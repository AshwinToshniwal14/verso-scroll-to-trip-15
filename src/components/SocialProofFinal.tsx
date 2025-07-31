import { useEffect, useRef, useState } from "react";
import { WaitlistForm } from "./WaitlistForm";
import userTestimonial1 from "@/assets/user-testimonial-1.jpg";
import userTestimonial2 from "@/assets/user-testimonial-2.jpg";

export const SocialProofFinal = () => {
  const [inView, setInView] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
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
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [inView]);

  const testimonials = [
    {
      quote: "Verso turned 50 reels into my Bali itinerary in minutes.",
      name: "Sarah M.",
      role: "Travel Creator",
      image: userTestimonial1,
      trip: "Bali • 12 days"
    },
    {
      quote: "I didn't plan. I just saved stuff. Verso handled the rest.",
      name: "Marcus L.",
      role: "Digital Nomad",
      image: userTestimonial2,
      trip: "Portugal • 3 weeks"
    },
    {
      quote: "Finally one app that gets how I plan my trips.",
      name: "Jessica K.",
      role: "Travel Blogger", 
      image: userTestimonial1,
      trip: "Japan • 10 days"
    }
  ];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left' && currentTestimonial < testimonials.length - 1) {
      setCurrentTestimonial(currentTestimonial + 1);
    } else if (direction === 'right' && currentTestimonial > 0) {
      setCurrentTestimonial(currentTestimonial - 1);
    }
  };

  return (
    <section ref={sectionRef} className="py-16 bg-warm-white">
      <div className="max-w-sm mx-auto px-4">
        
        {/* Section Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl font-bold leading-tight mb-6 text-primary">
            Stop planning. Start traveling.
          </h2>
          <p className="text-lg text-gray-600">See what early users are saying.</p>
        </div>

        {/* Swipeable Testimonial Cards (Tinder-style) */}
        <div className="mb-12">
          <div 
            className="relative h-96 overflow-hidden"
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
            {testimonials.map((testimonial, index) => {
              const offset = index - currentTestimonial;
              const isActive = index === currentTestimonial;
              
              return (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-500 ease-out ${
                    isActive 
                      ? 'z-20 scale-100 opacity-100 translate-x-0' 
                      : offset > 0 
                        ? 'z-10 scale-95 opacity-60 translate-x-8'
                        : 'z-10 scale-95 opacity-60 -translate-x-8'
                  }`}
                  style={{
                    transform: `translateX(${offset * 20}px) scale(${isActive ? 1 : 0.95})`,
                  }}
                >
                  <div className="bg-white rounded-2xl shadow-xl p-8 h-full flex flex-col justify-center text-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-20 h-20 rounded-full mx-auto object-cover mb-6"
                      loading="lazy"
                    />
                    
                    <blockquote className="text-xl font-medium leading-relaxed text-primary mb-6 min-h-[3rem]">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <div className="space-y-2">
                      <div className="font-semibold text-primary text-lg">
                        {testimonial.name}
                      </div>
                      <div className="text-gray-600 text-base">
                        {testimonial.role}
                      </div>
                      <div className="text-coral text-base font-medium">
                        {testimonial.trip}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Navigation Dots */}
          <div className="flex justify-center mt-6 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentTestimonial === index ? 'bg-coral w-8' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className={`text-center transition-all duration-1000 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-4">
            <WaitlistForm />
          </div>
          <p className="text-sm text-gray-500">Trusted by 8,400+ travelers saving 3M+ pieces of content</p>
        </div>

      </div>
    </section>
  );
};