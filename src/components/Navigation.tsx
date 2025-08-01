
import { Home, Camera, BookOpen, Users, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface NavigationProps {
  isMobile?: boolean;
}

const Navigation = ({ isMobile = false }: NavigationProps) => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "analyze", label: "Analisar", icon: Camera },
    { id: "guide", label: "Guia", icon: BookOpen },
    { id: "community", label: "Comunidade", icon: Users },
    { id: "plans", label: "Planos", icon: CreditCard },
  ];

  if (isMobile) {
    return (
      <nav className="flex flex-col space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className={`justify-start ${
                activeTab === item.id 
                  ? "bg-green-500 hover:bg-green-600 text-white" 
                  : "hover:bg-green-50"
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon className="w-4 h-4 mr-2" />
              {item.label}
            </Button>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className="flex space-x-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "default" : "ghost"}
            size="sm"
            className={
              activeTab === item.id 
                ? "bg-green-500 hover:bg-green-600 text-white" 
                : "hover:bg-green-50"
            }
            onClick={() => setActiveTab(item.id)}
          >
            <Icon className="w-4 h-4 mr-2" />
            {item.label}
          </Button>
        );
      })}
    </nav>
  );
};

export default Navigation;
