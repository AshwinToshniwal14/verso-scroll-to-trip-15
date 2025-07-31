import { TravelInbox } from "@/components/TravelInbox";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header with logout */}
      <div className="absolute top-4 right-4 z-50">
        <Button 
          onClick={handleLogout}
          variant="outline"
          size="sm"
          className="text-slate-light border-slate-light/20 hover:bg-slate-light/10"
        >
          Logout
        </Button>
      </div>
      
      <TravelInbox />
    </div>
  );
};

export default Dashboard;