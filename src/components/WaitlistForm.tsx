import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { WaitlistModal } from "./WaitlistModal";

export const WaitlistForm = ({ className = "", size = "default", compact = false }: { className?: string; size?: "default" | "lg"; compact?: boolean }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    // For demo purposes, navigate to login instead of showing waitlist
    navigate('/login');
  };

  return (
    <>
      <div className={`${compact ? 'w-full' : 'max-w-md mx-auto'} ${className}`}>
        <Button 
          onClick={handleClick}
          className={`btn-coral whitespace-nowrap ${compact ? "px-4 py-2 w-full" : size === "lg" ? "h-12 px-8" : "px-6 py-3 w-full"}`}
        >
          {compact ? "Join" : "→ Build My Travel Inbox"}
        </Button>
      </div>
      
      <WaitlistModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};