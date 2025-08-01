
import { useState } from "react";
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";
import PlantAnalysis from "@/components/PlantAnalysis";
import PlantGuide from "@/components/PlantGuide";
import Community from "@/components/Community";
import PricingPlans from "@/components/PricingPlans";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
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
