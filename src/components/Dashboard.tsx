
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, TrendingUp, Droplets, Sun, Calendar, Plus } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  const recentAnalysis = [
    {
      id: 1,
      name: "Manjericão",
      status: "Saudável",
      lastWatered: "Há 2 dias",
      nextWatering: "Amanhã",
      image: "/placeholder.svg",
      health: 85,
    },
    {
      id: 2,
      name: "Aloe Vera",
      status: "Precisa água",
      lastWatered: "Há 5 dias",
      nextWatering: "Hoje",
      image: "/placeholder.svg",
      health: 60,
    },
    {
      id: 3,
      name: "Rosa do Deserto",
      status: "Excelente",
      lastWatered: "Há 3 dias",
      nextWatering: "Em 2 dias",
      image: "/placeholder.svg",
      health: 95,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Bem-vindo ao Cuida Planta!</h2>
            <p className="text-green-100">
              Cuide das suas plantas com a ajuda da inteligência artificial
            </p>
          </div>
          <Button className="bg-white text-green-600 hover:bg-green-50">
            <Camera className="w-4 h-4 mr-2" />
            Analisar Planta
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Plantas Analisadas</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">23</div>
            <p className="text-xs text-muted-foreground">
              +3 esta semana
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Plantas Saudáveis</CardTitle>
            <Sun className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">18</div>
            <p className="text-xs text-muted-foreground">
              78% das suas plantas
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Precisam Água</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">3</div>
            <p className="text-xs text-muted-foreground">
              Regue hoje
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximas Tarefas</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">5</div>
            <p className="text-xs text-muted-foreground">
              Esta semana
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Suas Plantas</CardTitle>
          <CardDescription>
            Acompanhe o estado das plantas que você analisou recentemente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAnalysis.map((plant) => (
              <div key={plant.id} className="flex items-center space-x-4 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🌿</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{plant.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      plant.health >= 80 ? "bg-green-100 text-green-800" :
                      plant.health >= 60 ? "bg-orange-100 text-orange-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {plant.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <span>Regada: {plant.lastWatered}</span>
                    <span>Próxima: {plant.nextWatering}</span>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Saúde da planta</span>
                      <span>{plant.health}%</span>
                    </div>
                    <Progress value={plant.health} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <Button variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Analisar Nova Planta
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
