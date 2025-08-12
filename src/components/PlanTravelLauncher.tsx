import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { useNavigate } from "react-router-dom";
import { Compass } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import PlanTravel from "./PlanTravel";

const PlanTravelLauncher: React.FC = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    if (isMobile) setOpen(true);
    else navigate("/dashboard?view=plan");
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        size="icon"
        aria-label="Plan Travel"
        className="fixed bottom-6 left-6 h-14 w-14 rounded-full bg-coral hover:bg-coral-dark text-white shadow-xl hover:shadow-2xl transition-all duration-300 z-50 btn-hover-glow"
      >
        <Compass className="h-6 w-6" />
      </Button>

      {/* Mobile bottom sheet */}
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Plan Travel</DrawerTitle>
          </DrawerHeader>
          <div className="p-4">
            <PlanTravel />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default PlanTravelLauncher;
