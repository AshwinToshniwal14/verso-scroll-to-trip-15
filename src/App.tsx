import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import PreviewItinerary from "./pages/PreviewItinerary";
import ShowMyTrip from "./pages/ShowMyTrip";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import DestinationPlan from "./pages/DestinationPlan";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HelmetProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/preview-itinerary" element={
                <ProtectedRoute>
                  <PreviewItinerary />
                </ProtectedRoute>
              } />
              <Route path="/show-my-trip" element={
                <ProtectedRoute>
                  <ShowMyTrip />
                </ProtectedRoute>
              } />
              <Route path="/destination-plan" element={
                <ProtectedRoute>
                  <DestinationPlan />
                </ProtectedRoute>
              } />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </HelmetProvider>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
