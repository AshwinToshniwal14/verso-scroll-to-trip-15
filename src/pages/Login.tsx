import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import baliBeach from '@/assets/bali-beach-tiktok.jpg';
import lisbonCafe from '@/assets/lisbon-cafe-reel.jpg';

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = () => {
    login();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Blurred background with floating content */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-8 w-16 h-16 rounded-lg bg-gray-200 animate-pulse"></div>
        <div className="absolute top-40 right-12 w-20 h-20 rounded-lg bg-gray-300 animate-pulse delay-100"></div>
        <div className="absolute bottom-32 left-16 w-14 h-14 rounded-lg bg-gray-200 animate-pulse delay-200"></div>
        <div className="absolute bottom-48 right-8 w-18 h-18 rounded-lg bg-gray-300 animate-pulse delay-300"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-sm space-y-8 text-center">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-slate-black">
              We've organized your travel chaos.
            </h1>
            <p className="text-lg text-slate-light">
              From your 17 saved reels across IG and WhatsApp.
            </p>
          </div>

          {/* Preview of saved Thailand content */}
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-4 opacity-60">
              <img 
                src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=400&q=80" 
                alt="Phuket beach villa" 
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="text-sm text-slate-light">
                <div className="font-medium">Thailand • 17 items</div>
                <div className="text-xs">Ready to organize</div>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=400&q=80" 
                alt="Chiang Mai temple" 
                className="w-12 h-12 rounded-lg object-cover"
              />
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <Button 
              onClick={handleLogin}
              className="w-full bg-coral hover:bg-coral/90 text-white py-6 text-lg font-medium rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              → Reveal My Trip
            </Button>
            
            <p className="text-xs text-slate-light">
              No login needed — just magic.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;