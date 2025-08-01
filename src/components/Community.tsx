
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, Plus, Users, MapPin, Clock } from "lucide-react";
import { useState } from "react";

const Community = () => {
  const [newPostContent, setNewPostContent] = useState("");
  
  const communityPosts = [
    {
      id: 1,
      author: "Maria Santos",
      location: "Luanda",
      time: "2 horas atrás",
      avatar: "/placeholder.svg",
      content: "Meu manjericão finalmente está crescendo bem! Seguindo as dicas da comunidade sobre rega e sol parcial. Obrigada pessoal! 🌿",
      image: "/placeholder.svg",
      likes: 12,
      comments: 5,
      tags: ["manjericão", "sucesso", "Luanda"],
      category: "Sucesso"
    },
    {
      id: 2,
      author: "João Mukongo",
      location: "Benguela",
      time: "5 horas atrás",
      avatar: "/placeholder.svg",
      content: "Alguém sabe como tratar folhas amareladas na moringa? Estou preocupado que seja falta de nutrientes. A planta está no quintal, recebe sol da manhã.",
      image: "/placeholder.svg",
      likes: 8,
      comments: 12,
      tags: ["moringa", "ajuda", "folhas-amarelas"],
      category: "Ajuda"
    },
    {
      id: 3,
      author: "Ana Ferreira",
      location: "Huambo",
      time: "1 dia atrás",
      avatar: "/placeholder.svg",
      content: "Colhei a primeira safra de hortelã da minha horta urbana! Quem quiser mudas, tenho várias para trocar por outras plantas medicinais 🌱",
      image: "/placeholder.svg",
      likes: 15,
      comments: 8,
      tags: ["hortelã", "troca", "horta-urbana"],
      category: "Troca"
    },
    {
      id: 4,
      author: "Pedro Kiala",
      location: "Lubango",
      time: "2 dias atrás",
      avatar: "/placeholder.svg",
      content: "Descobri que o capim-limão cresce muito bem aqui no Lubango, mesmo com o clima mais fresco. Já estou fazendo chá todos os dias! ☕",
      image: "/placeholder.svg",
      likes: 10,
      comments: 6,
      tags: ["capim-limão", "Lubango", "chá"],
      category: "Dica"
    },
    {
      id: 5,
      author: "Teresa Miguel",
      location: "Cabinda",
      time: "3 dias atrás",
      avatar: "/placeholder.svg",
      content: "Minha avó sempre dizia que a babosa cura tudo! Hoje usei na minha filha que se queimou cozinhando. Realmente funciona! 🙏",
      image: "/placeholder.svg",
      likes: 20,
      comments: 15,
      tags: ["babosa", "medicina-tradicional", "queimadura"],
      category: "Experiência"
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      "Sucesso": "bg-green-100 text-green-800",
      "Ajuda": "bg-orange-100 text-orange-800",
      "Troca": "bg-blue-100 text-blue-800",
      "Dica": "bg-purple-100 text-purple-800",
      "Experiência": "bg-yellow-100 text-yellow-800"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      {/* Community Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-800">
            <Users className="w-6 h-6 mr-2" />
            Comunidade Cuida Planta Angola
          </CardTitle>
          <CardDescription className="text-blue-600">
            Conecte-se com outros amantes de plantas em todo o país. Compartilhe experiências, 
            peça ajuda e troque conhecimento sobre plantas angolanas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-800">1,247</div>
                <div className="text-sm text-blue-600">Membros</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-800">856</div>
                <div className="text-sm text-green-600">Posts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-800">324</div>
                <div className="text-sm text-purple-600">Plantas Trocadas</div>
              </div>
            </div>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Nova Publicação
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Create New Post */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Compartilhar com a Comunidade</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex space-x-3">
              <Avatar>
                <AvatarFallback>EU</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea 
                  placeholder="Compartilhe suas experiências com plantas, peça ajuda ou ofereça dicas para a comunidade..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <Badge variant="outline" className="cursor-pointer hover:bg-green-50">
                  #ajuda
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">
                  #troca
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-purple-50">
                  #dica
                </Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-yellow-50">
                  #sucesso
                </Badge>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Adicionar Foto
                </Button>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  Publicar
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Community Posts */}
      <div className="space-y-4">
        {communityPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* Post Header */}
                <div className="flex items-start justify-between">
                  <div className="flex space-x-3">
                    <Avatar>
                      <AvatarFallback>
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{post.author}</h3>
                        <Badge className={getCategoryColor(post.category)}>
                          {post.category}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <MapPin className="w-3 h-3" />
                        <span>{post.location}</span>
                        <span>•</span>
                        <Clock className="w-3 h-3" />
                        <span>{post.time}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="space-y-3">
                  <p className="text-gray-700 leading-relaxed">{post.content}</p>
                  
                  {/* Post Image */}
                  {post.image && (
                    <div className="w-full h-48 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-4xl">🌱</span>
                    </div>
                  )}
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex space-x-4">
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-500">
                      <Heart className="w-4 h-4 mr-1" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-500">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {post.comments}
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-green-500">
                    <Share2 className="w-4 h-4 mr-1" />
                    Partilhar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" className="w-full">
          Carregar Mais Publicações
        </Button>
      </div>
    </div>
  );
};

export default Community;
