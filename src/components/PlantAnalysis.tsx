
import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Upload, Loader2, CheckCircle, AlertCircle, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

const PlantAnalysis = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setAnalysisComplete(false);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResult({
        species: "Manjericão (Ocimum basilicum)",
        type: "Planta Medicinal e Culinária",
        health: 75,
        hydration: "Bem hidratada",
        problems: [
          "Algumas folhas amareladas na base",
          "Possível deficiência de nitrogênio"
        ],
        recommendations: [
          "Remover as folhas amareladas",
          "Aplicar adubo rico em nitrogênio",
          "Manter rega 2-3 vezes por semana",
          "Garantir 4-6 horas de sol direto por dia"
        ],
        climate_tips: [
          "Ideal para o clima tropical de Angola",
          "Proteger do sol muito forte nas horas do meio-dia",
          "Durante a estação seca, aumentar a frequência de rega"
        ],
        uses: [
          "Tempero culinário",
          "Chá medicinal para problemas digestivos",
          "Repelente natural de insetos"
        ]
      });
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 3000);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Camera className="w-5 h-5 mr-2 text-green-600" />
            Análise de Plantas com IA
          </CardTitle>
          <CardDescription>
            Tire uma foto da sua planta e descubra tudo sobre ela
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="plant-image">Imagem da Planta</Label>
              <div className="mt-2">
                {!selectedImage ? (
                  <div 
                    onClick={triggerFileInput}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-green-500 transition-colors"
                  >
                    <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-lg font-medium text-gray-600">
                      Clique para fazer upload da imagem
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Ou arraste e solte a imagem aqui
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      PNG, JPG até 10MB
                    </p>
                  </div>
                ) : (
                  <div className="relative">
                    <img 
                      src={selectedImage} 
                      alt="Planta selecionada" 
                      className="w-full h-64 object-cover rounded-lg border"
                    />
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={triggerFileInput}
                      className="absolute top-2 right-2"
                    >
                      Alterar Imagem
                    </Button>
                  </div>
                )}
                
                <Input
                  ref={fileInputRef}
                  id="plant-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>

            {selectedImage && !analysisComplete && (
              <Button 
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analisando... Aguarde
                  </>
                ) : (
                  <>
                    <Camera className="w-4 h-4 mr-2" />
                    Analisar Planta
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {isAnalyzing && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Analisando sua planta...</h3>
                <p className="text-gray-600 mt-2">
                  A nossa IA está identificando a espécie, estado de saúde e necessidades da planta
                </p>
              </div>
              <Progress value={75} className="w-full" />
              <p className="text-sm text-gray-500">Processamento quase concluído...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {analysisComplete && analysisResult && (
        <div className="space-y-4">
          {/* Plant Identification */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <CheckCircle className="w-5 h-5 mr-2" />
                Identificação da Planta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg">{analysisResult.species}</h3>
                  <Badge variant="secondary" className="mt-1">
                    {analysisResult.type}
                  </Badge>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Estado de Saúde</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Progress value={analysisResult.health} className="flex-1" />
                    <span className="text-sm font-medium">{analysisResult.health}%</span>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium">Hidratação</Label>
                  <p className="text-sm text-green-600 mt-1">{analysisResult.hydration}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Problems Detected */}
          {analysisResult.problems.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-orange-700">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Problemas Detectados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysisResult.problems.map((problem: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2">
                      <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{problem}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-blue-700">
                <Info className="w-5 h-5 mr-2" />
                Recomendações de Cuidado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysisResult.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Climate Tips for Angola */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                🇦🇴 Dicas para o Clima de Angola
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysisResult.climate_tips.map((tip: string, index: number) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-orange-500 mt-0.5">☀️</span>
                    <span className="text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Plant Uses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-purple-700">
                ✨ Usos e Benefícios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysisResult.uses.map((use: string, index: number) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-purple-500 mt-0.5">🌿</span>
                    <span className="text-sm">{use}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Save Analysis */}
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Quer salvar esta análise no seu perfil? 
              <Button variant="link" className="p-0 h-auto ml-1">
                Criar conta grátis
              </Button> e tenha acesso ao histórico completo!
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default PlantAnalysis;
