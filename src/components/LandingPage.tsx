
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, CheckCircle, Users, Zap, Star, ArrowRight, AlertTriangle } from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  const problems = [
    {
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
      title: "Suas plantas estão morrendo?",
      description: "Você rega demais ou de menos, sem saber o que fazer quando as folhas ficam amarelas ou secas."
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-orange-500" />,
      title: "Não sabe que planta é essa?",
      description: "Encontrou uma planta no quintal mas não sabe se é medicinal, comestível ou tóxica."
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-red-600" />,
      title: "Sem ajuda profissional",
      description: "Em Angola é difícil encontrar agrônomos ou especialistas para ajudar com suas plantas."
    }
  ];

  const features = [
    {
      icon: <Camera className="w-8 h-8 text-green-600" />,
      title: "Tire uma foto, saiba tudo",
      description: "Nossa IA identifica a planta, diagnóstica problemas e diz se precisa de água, sol ou adubo."
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-600" />,
      title: "Diagnóstico instantâneo",
      description: "Detecta pragas, doenças, falta de nutrientes e te dá soluções práticas em segundos."
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: "Comunidade angolana",
      description: "Conecte-se com outros cuidadores de plantas em Angola e troque experiências."
    }
  ];

  const testimonials = [
    {
      name: "Maria Santos",
      location: "Luanda",
      text: "Salvou minhas plantas! Agora sei exatamente quando regar e que adubo usar.",
      rating: 5
    },
    {
      name: "João Kumba", 
      location: "Benguela",
      text: "Descobri que tinha plantas medicinais no quintal que nem sabia. Muito útil!",
      rating: 5
    },
    {
      name: "Ana Ferreira",
      location: "Huambo", 
      text: "Perfeito para quem tem horta em casa. As dicas são certeiras.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="inline-flex items-center space-x-2 bg-green-100 rounded-full px-4 py-2 mb-4">
              <span className="text-2xl">🇦🇴</span>
              <span className="text-green-800 font-medium">Feito especialmente para Angola</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Suas plantas estão
            <span className="text-green-600"> morrendo</span>?
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            <span className="font-semibold text-red-600">Pare de perder plantas por não saber como cuidar!</span> 
            Com o Cuida Planta, você tira uma foto e nossa IA te diz exatamente o que fazer - 
            funciona perfeitamente com o clima angolano.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold"
              onClick={onGetStarted}
            >
              <Camera className="w-5 h-5 mr-2" />
              Experimentar Grátis Agora
            </Button>
            <div className="text-sm text-gray-500">
              ✅ Sem cartão de crédito • ✅ 3 análises grátis
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                <span>+1.200 plantas identificadas</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                <span>+500 usuários em Angola</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="bg-red-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Reconhece esses problemas?
            </h2>
            <p className="text-xl text-gray-600">
              Você não está sozinho. Esses são os maiores desafios de quem cuida de plantas em Angola.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {problems.map((problem, index) => (
              <Card key={index} className="bg-white border-red-200 hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4">
                    {problem.icon}
                  </div>
                  <CardTitle className="text-lg font-semibold text-red-700">
                    {problem.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    {problem.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              A solução que você precisa chegou!
            </h2>
            <p className="text-xl text-gray-600">
              Cuida Planta usa inteligência artificial para resolver todos os seus problemas com plantas.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-green-200">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-green-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Como funciona? É muito simples!
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Tire uma foto</h3>
                <p className="text-gray-600">Da sua planta com o celular ou computador</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">IA analisa</h3>
                <p className="text-gray-600">Nossa inteligência artificial identifica e diagnostica</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Receba soluções</h3>
                <p className="text-gray-600">Instruções claras sobre cuidados e tratamentos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              O que dizem os angolanos que já usam
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Pare de perder plantas hoje mesmo!
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Junte-se a centenas de angolanos que já salvaram suas plantas com o Cuida Planta. 
            Comece grátis agora!
          </p>
          
          <Button 
            size="lg" 
            className="bg-white text-green-600 hover:bg-green-50 px-8 py-4 text-lg font-semibold"
            onClick={onGetStarted}
          >
            Começar Agora Grátis
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <p className="text-green-100 mt-4">
            ✅ 3 análises grátis • ✅ Sem compromisso • ✅ Cancele quando quiser
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
