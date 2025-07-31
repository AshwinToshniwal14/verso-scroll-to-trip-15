import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const EmbeddedWaitlist = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      // Here you would typically send to your backend
      console.log("Waitlist signup:", email);
    }
  };

  if (submitted) {
    return (
      <section id="waitlist" className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-coral/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">✈️</span>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3">
                You're in!
              </h2>
              <p className="text-muted-foreground">
                We'll email you when Verso is ready for your travels.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="waitlist" className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Join the Waitlist
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Get early access to Verso — your travel inbox for saved reels.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-12 text-center border-gray-200 focus:border-coral focus:ring-coral"
            />
            <Button 
              type="submit"
              className="w-full h-12 bg-coral hover:bg-coral/90 text-white font-medium"
            >
              → Get Early Access
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};