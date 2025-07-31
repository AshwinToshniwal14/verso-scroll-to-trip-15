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
              Ready to build your travel inbox?
            </h1>
            <p className="text-lg text-slate-light">
              Login to see what you've saved.
            </p>
          </div>

          {/* Preview of saved content */}
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-4 opacity-60">
              <img 
                src={baliBeach} 
                alt="Saved content preview" 
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="text-sm text-slate-light">
                <div className="font-medium">Thailand • 17 items</div>
                <div className="text-xs">Ready to organize</div>
              </div>
              <img 
                src={lisbonCafe} 
                alt="Saved content preview" 
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
              → Continue to Dashboard
            </Button>
            
            <p className="text-xs text-slate-light">
              Dummy login - no credentials needed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;