
import { Menu, User, Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Navigation from "./Navigation";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-green-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🌱</span>
              </div>
              <h1 className="text-xl font-bold text-green-800">Cuida Planta</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <Navigation />
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <User className="w-4 h-4" />
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center space-x-2 pb-4 border-b">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">🌱</span>
                  </div>
                  <h1 className="text-xl font-bold text-green-800">Cuida Planta</h1>
                </div>
                <div className="py-4">
                  <Navigation isMobile />
                </div>
                <div className="mt-auto pt-4 border-t">
                  <div className="flex flex-col space-y-2">
                    <Button variant="ghost" className="justify-start">
                      <Bell className="w-4 h-4 mr-2" />
                      Notificações
                    </Button>
                    <Button variant="ghost" className="justify-start">
                      <Settings className="w-4 h-4 mr-2" />
                      Configurações
                    </Button>
                    <Button variant="ghost" className="justify-start">
                      <User className="w-4 h-4 mr-2" />
                      Perfil
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
