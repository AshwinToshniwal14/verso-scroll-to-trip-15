import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState("");
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up to mailing service
    alert("Subscribed! 🎉");
  };
  return (
    <form onSubmit={onSubmit} className="space-y-2">
      <div className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 rounded-md border px-3 py-2 bg-background"
          aria-label="Email address"
        />
        <Button type="submit" className="bg-coral text-white">Subscribe</Button>
      </div>
      <p className="text-xs text-muted-foreground">Get 3 inspiring trips every month.</p>
    </form>
  );
};

export default NewsletterSignup;
