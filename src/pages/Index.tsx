
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";
import PlantAnalysis from "@/components/PlantAnalysis";
import PlantGuide from "@/components/PlantGuide";
import Community from "@/components/Community";
import PricingPlans from "@/components/PricingPlans";
import LandingPage from "@/components/LandingPage";
import AuthPage from "@/components/AuthPage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { user, loading } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">🌱</span>
          </div>
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-green-600" />
          <p className="text-gray-600">Carregando Cuida Planta...</p>
        </div>
      </div>
    );
  }

  // Show auth page
  if (showAuth && !user) {
    return (
      <AuthPage 
        onBack={() => setShowAuth(false)}
        onSuccess={() => setShowAuth(false)}
      />
    );
  }

  // Show landing page for non-authenticated users
  if (!user) {
    return (
      <LandingPage 
        onGetStarted={() => setShowAuth(true)}
      />
    );
  }

  // Show dashboard for authenticated users
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="hidden">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="analyze">Analisar</TabsTrigger>
            <TabsTrigger value="guide">Guia</TabsTrigger>
            <TabsTrigger value="community">Comunidade</TabsTrigger>
            <TabsTrigger value="plans">Planos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="mt-0">
            <Dashboard />
          </TabsContent>
          
          <TabsContent value="analyze" className="mt-0">
            <PlantAnalysis />
          </TabsContent>
          
          <TabsContent value="guide" className="mt-0">
            <PlantGuide />
          </TabsContent>
          
          <TabsContent value="community" className="mt-0">
            <Community />
          </TabsContent>
          
          <TabsContent value="plans" className="mt-0">
            <PricingPlans />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
