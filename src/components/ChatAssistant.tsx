import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, X, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        size="icon"
        className="fixed bottom-20 right-6 h-14 w-14 rounded-full bg-coral hover:bg-coral-dark text-white shadow-xl hover:shadow-2xl transition-all duration-300 z-50 btn-hover-glow"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-end p-6 z-50">
          <Card className="w-96 h-96 flex flex-col animate-scale-in">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-coral rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-medium">Travel Co-pilot</h3>
                  <p className="text-sm text-muted-foreground">Online</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <CardContent className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-3">
                <div className="bg-muted p-3 rounded-lg max-w-xs">
                  <p className="text-sm">Hi! I'm your travel co-pilot. Need help planning your next adventure?</p>
                </div>
                <div className="bg-muted p-3 rounded-lg max-w-xs">
                  <p className="text-sm">I can help you with:</p>
                  <ul className="text-xs mt-2 space-y-1">
                    <li>• Building itineraries</li>
                    <li>• Finding hidden gems</li>
                    <li>• Budget planning</li>
                    <li>• Local recommendations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask anything..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <Button onClick={handleSend} className="bg-coral hover:bg-coral-dark">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default ChatAssistant;