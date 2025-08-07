import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CTASample = () => {
  const navigate = useNavigate();

  return (
    <div className="section-padding bg-gradient-to-br from-coral/5 to-coral/10">
      <div className="section-container text-center">
        <Card className="max-w-2xl mx-auto bg-white/90 backdrop-blur-md border border-coral/20 shadow-xl">
          <CardContent className="p-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-coral animate-gentle-bounce" />
              <h2 className="text-3xl font-bold">Try a sample trip</h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-6">
              See how your saves transform into day-wise plans
            </p>
            
            <Button 
              onClick={() => navigate('/preview-itinerary?tripId=thailand-2024-sample')}
              className="bg-coral hover:bg-coral-dark text-white btn-hover-glow px-8 py-3 text-lg font-medium"
            >
              <Eye className="w-5 h-5 mr-2" />
              Preview Thailand Trip
            </Button>
            
            <p className="text-sm text-muted-foreground mt-4">
              ✨ No signup required • Interactive demo
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CTASample;