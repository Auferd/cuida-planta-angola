
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, TrendingUp, Droplets, Sun, Calendar, Plus } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import PlantAnalysis from "./PlantAnalysis";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [recentAnalysis, setRecentAnalysis] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load user's plant analyses from database
  const loadUserAnalyses = async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setRecentAnalysis([]);
        return;
      }

      const { data: analyses, error } = await supabase
        .from('plant_analyses')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error loading analyses:', error);
        return;
      }

      const formattedAnalyses = analyses?.map(analysis => ({
        id: analysis.id,
        name: analysis.species?.split('(')[0]?.trim() || 'Planta não identificada',
        status: analysis.health_score >= 80 ? 'Saudável' : 
                analysis.health_score >= 60 ? 'Atenção' : 'Precisa cuidados',
        lastAnalyzed: new Date(analysis.created_at).toLocaleDateString('pt-BR'),
        health: analysis.health_score || 0,
        hydration: analysis.hydration_status || 'Não informado',
        species: analysis.species,
        image_url: analysis.image_url
      })) || [];

      setRecentAnalysis(formattedAnalyses);
    } catch (error) {
      console.error('Error in loadUserAnalyses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load analyses when component mounts
  useEffect(() => {
    loadUserAnalyses();
    
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
        loadUserAnalyses();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

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
          <Button 
            onClick={() => setShowAnalysis(true)}
            className="bg-white text-green-600 hover:bg-green-50"
          >
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
            {isLoading ? (
              <div className="text-center py-8">
                <div className="text-gray-500">Carregando suas análises...</div>
              </div>
            ) : recentAnalysis.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-500 mb-4">Você ainda não analisou nenhuma planta</div>
                <Button 
                  onClick={() => setShowAnalysis(true)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Fazer Primeira Análise
                </Button>
              </div>
            ) : recentAnalysis.map((plant) => (
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
                     <span>Analisada: {plant.lastAnalyzed}</span>
                     <span>Hidratação: {plant.hydration}</span>
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
          
          {!isLoading && recentAnalysis.length > 0 && (
            <div className="mt-4 text-center">
              <Button 
                onClick={() => setShowAnalysis(true)}
                variant="outline" 
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Analisar Nova Planta
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Plant Analysis Modal */}
      {showAnalysis && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-green-700">Análise de Plantas com IA</h2>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowAnalysis(false)}
                >
                  ✕ Fechar
                </Button>
              </div>
               <PlantAnalysis onAnalysisComplete={() => {
                 setShowAnalysis(false);
                 loadUserAnalyses(); // Reload the analyses list
               }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
