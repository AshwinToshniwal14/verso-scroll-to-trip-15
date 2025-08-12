import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BookingSummaryProps {
  pricePerPerson?: number;
  nights?: number;
  urgencyText?: string;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({ pricePerPerson = 899, nights = 5, urgencyText = "3 spots left" }) => {
  const total = pricePerPerson * 2; // assume 2 guests for preview
  return (
    <aside aria-label="Booking summary" className="space-y-3">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-baseline justify-between">
            <h4 className="font-semibold">Your trip</h4>
            <span className="text-xs bg-coral/10 text-coral px-2 py-1 rounded-full">{urgencyText}</span>
          </div>
          <div className="mt-2 text-sm text-muted-foreground">{nights} nights • 2 guests</div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm">Price per person</span>
            <span className="font-medium">${pricePerPerson}</span>
          </div>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-sm">Total</span>
            <span className="font-semibold">${total}</span>
          </div>
          <Button className="w-full mt-4 bg-coral text-white">Book Now</Button>
          <ul className="mt-3 text-xs text-muted-foreground space-y-1 list-disc pl-4">
            <li>Free cancellation within 24h</li>
            <li>Airport pickup included</li>
            <li>24/7 support</li>
          </ul>
        </CardContent>
      </Card>
    </aside>
  );
};

export default BookingSummary;
