
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Leaf, Heart, Utensils, Shield } from "lucide-react";
import { useState } from "react";

const PlantGuide = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const angolaCatalog = [
    {
      id: 1,
      name: "Manjericão",
      scientific: "Ocimum basilicum",
      category: "Medicinal/Culinária",
      image: "/placeholder.svg",
      uses: ["Tempero", "Chá digestivo", "Repelente natural"],
      climate: "Tropical - ideal para Angola",
      care: "Rega regular, sol parcial, solo bem drenado",
      benefits: "Anti-inflamatório, digestivo, aromático",
      toxicity: "Segura",
      icon: "🌿"
    },
    {
      id: 2,
      name: "Aloe Vera (Babosa)",
      scientific: "Aloe barbadensis",
      category: "Medicinal",
      image: "/placeholder.svg",
      uses: ["Cicatrizante", "Hidratante natural", "Queimaduras"],
      climate: "Resistente ao calor - perfeita para Angola",
      care: "Pouca água, muito sol, solo arenoso",
      benefits: "Cicatrização, hidratação, anti-inflamatório",
      toxicity: "Cuidado interno",
      icon: "🌵"
    },
    {
      id: 3,
      name: "Moringa",
      scientific: "Moringa oleifera",
      category: "Alimentar/Medicinal",
      image: "/placeholder.svg",
      uses: ["Folhas comestíveis", "Chá nutritivo", "Purificação da água"],
      climate: "Nativa de climas quentes - excelente em Angola",
      care: "Cresce facilmente, pouca manutenção",
      benefits: "Rica em vitaminas, proteínas, minerais",
      toxicity: "Segura",
      icon: "🌳"
    },
    {
      id: 4,
      name: "Capim-limão",
      scientific: "Cymbopogon citratus",
      category: "Medicinal/Culinária",
      image: "/placeholder.svg",
      uses: ["Chá calmante", "Tempero", "Repelente de mosquitos"],
      climate: "Tropical - comum em quintais angolanos",
      care: "Cresce em touceiras, rega moderada",
      benefits: "Digestivo, calmante, antibacteriano",
      toxicity: "Segura",
      icon: "🌾"
    },
    {
      id: 5,
      name: "Hortelã",
      scientific: "Mentha spicata",
      category: "Medicinal/Culinária",
      image: "/placeholder.svg",
      uses: ["Chá digestivo", "Tempero", "Aromática"],
      climate: "Adapta-se bem ao clima de Angola",
      care: "Muita água, sombra parcial, solo úmido",
      benefits: "Digestivo, refrescante, anti-séptico",
      toxicity: "Segura",
      icon: "🌿"
    },
    {
      id: 6,
      name: "Rosa do Deserto",
      scientific: "Adenium obesum",
      category: "Ornamental",
      image: "/placeholder.svg",
      uses: ["Decoração", "Jardinagem ornamental"],
      climate: "Resistente à seca - ideal para Angola",
      care: "Pouca água, muito sol, solo bem drenado",
      benefits: "Beleza ornamental, fácil manutenção",
      toxicity: "Tóxica - cuidado com crianças",
      icon: "🌹"
    },
    {
      id: 7,
      name: "Hibisco",
      scientific: "Hibiscus rosa-sinensis",
      category: "Ornamental/Medicinal",
      image: "/placeholder.svg",
      uses: ["Ornamental", "Chá", "Corante natural"],
      climate: "Tropical - floresce bem em Angola",
      care: "Rega regular, sol pleno, solo fértil",
      benefits: "Rico em antioxidantes, ornamental",
      toxicity: "Segura",
      icon: "🌺"
    },
    {
      id: 8,
      name: "Mamão (folhas)",
      scientific: "Carica papaya",
      category: "Medicinal/Alimentar",
      image: "/placeholder.svg",
      uses: ["Chá medicinal", "Tratamento digestivo", "Vermífugo natural"],
      climate: "Tropical - muito comum em Angola",
      care: "Sol pleno, rega regular, solo rico",
      benefits: "Digestivo, vermífugo, enzimas",
      toxicity: "Folhas amargas mas seguras",
      icon: "🌴"
    }
  ];

  const filteredPlants = angolaCatalog.filter(plant =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plant.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plant.uses.some(use => use.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getCategoryIcon = (category: string) => {
    if (category.includes("Medicinal")) return <Heart className="w-4 h-4 text-red-500" />;
    if (category.includes("Culinária") || category.includes("Alimentar")) return <Utensils className="w-4 h-4 text-green-500" />;
    if (category.includes("Ornamental")) return <Leaf className="w-4 h-4 text-purple-500" />;
    return <Leaf className="w-4 h-4 text-green-500" />;
  };

  const getToxicityColor = (toxicity: string) => {
    if (toxicity.includes("Tóxica")) return "bg-red-100 text-red-800";
    if (toxicity.includes("Cuidado")) return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center text-green-800">
            🇦🇴 Guia de Plantas de Angola
          </CardTitle>
          <CardDescription>
            Descubra as plantas mais comuns nos quintais, lavras e jardins angolanos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar plantas por nome, categoria ou uso..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlants.map((plant) => (
          <Card key={plant.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{plant.icon}</span>
                  <div>
                    <CardTitle className="text-lg">{plant.name}</CardTitle>
                    <CardDescription className="text-sm italic">
                      {plant.scientific}
                    </CardDescription>
                  </div>
                </div>
                {getCategoryIcon(plant.category)}
              </div>
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary" className="text-xs">
                  {plant.category}
                </Badge>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${getToxicityColor(plant.toxicity)}`}
                >
                  {plant.toxicity}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-semibold text-sm text-green-700 mb-1">🌍 Clima</h4>
                <p className="text-sm text-gray-600">{plant.climate}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-sm text-blue-700 mb-1">🌱 Cuidados</h4>
                <p className="text-sm text-gray-600">{plant.care}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-sm text-purple-700 mb-1">✨ Usos Principais</h4>
                <div className="flex flex-wrap gap-1">
                  {plant.uses.map((use, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {use}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-sm text-orange-700 mb-1">💊 Benefícios</h4>
                <p className="text-sm text-gray-600">{plant.benefits}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPlants.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Search className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Nenhuma planta encontrada
            </h3>
            <p className="text-gray-500">
              Tente buscar por outro termo ou categoria
            </p>
          </CardContent>
        </Card>
      )}

      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-800">Aviso Importante</h3>
              <p className="text-sm text-yellow-700 mt-1">
                Sempre consulte um profissional de saúde antes de usar plantas medicinais. 
                Algumas plantas podem ser tóxicas para crianças e animais domésticos.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlantGuide;
