import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WaitlistModal = ({ isOpen, onClose }: WaitlistModalProps) => {
  const [submitted, setSubmitted] = useState(false);

  // Listen for Typeform submission
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin === 'https://admin.typeform.com' || event.origin === 'https://form.typeform.com') {
        if (event.data.type === 'form_submit') {
          setSubmitted(true);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Reset submitted state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);
    }
  }, [isOpen]);

  if (submitted) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md mx-auto bg-white border-0 shadow-2xl">
          <DialogHeader className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-8 w-8"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-coral/10 rounded-full flex items-center justify-center">
              <span className="text-2xl">✈️</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-black mb-3">
              You're in!
            </h2>
            <p className="text-slate-light mb-6">
              We'll email you when Verso is ready for your travels.
            </p>
            <Button 
              onClick={onClose}
              className="bg-coral hover:bg-coral/90 text-white px-6"
            >
              Continue Exploring
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl mx-auto bg-white border-0 shadow-2xl p-0 overflow-hidden">
        <DialogHeader className="relative p-4 border-b border-gray-100">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 h-8 w-8 z-10"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="text-center pr-8">
            <h2 className="text-xl font-bold text-slate-black">
              Join the Waitlist
            </h2>
            <p className="text-sm text-slate-light mt-1">
              Get early access to Verso
            </p>
          </div>
        </DialogHeader>
        
        <div className="h-[500px] md:h-[600px]">
          <iframe
            src="https://form.typeform.com/to/mLxflcXh?typeform-embed=embed-widget&embed-opacity=0&embed-transparent=1"
            className="w-full h-full border-none"
            frameBorder="0"
            allow="camera; microphone; autoplay; encrypted-media;"
            title="Verso Waitlist Form"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};