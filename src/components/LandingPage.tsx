
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, CheckCircle, Users, Zap, Star, ArrowRight, AlertTriangle, Leaf, Sun, Droplets, Menu, X } from "lucide-react";
import heroImage from "@/assets/hero-woman-plants.jpg";

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const problems = [
    {
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
      title: "Suas plantas estão morrendo?",
      description: "Você rega demais ou de menos, sem saber o que fazer quando as folhas ficam amarelas ou secas.",
      gradient: "from-red-50 to-orange-50"
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-orange-500" />,
      title: "Não sabe que planta é essa?",
      description: "Encontrou uma planta no quintal mas não sabe se é medicinal, comestível ou tóxica.",
      gradient: "from-orange-50 to-yellow-50"
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-red-600" />,
      title: "Sem ajuda profissional",
      description: "Em Angola é difícil encontrar agrônomos ou especialistas para ajudar com suas plantas.",
      gradient: "from-red-50 to-pink-50"
    }
  ];

  const features = [
    {
      icon: <Camera className="w-8 h-8 text-green-600" />,
      title: "Tire uma foto, saiba tudo",
      description: "Nossa IA identifica a planta, diagnóstica problemas e diz se precisa de água, sol ou adubo.",
      gradient: "from-green-100 to-emerald-100",
      delay: "0ms"
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-600" />,
      title: "Diagnóstico instantâneo",
      description: "Detecta pragas, doenças, falta de nutrientes e te dá soluções práticas em segundos.",
      gradient: "from-blue-100 to-cyan-100",
      delay: "200ms"
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: "Comunidade angolana",
      description: "Conecte-se com outros cuidadores de plantas em Angola e troque experiências.",
      gradient: "from-purple-100 to-pink-100",
      delay: "400ms"
    }
  ];

  const testimonials = [
    {
      name: "Maria Santos",
      location: "Luanda",
      text: "Salvou minhas plantas! Agora sei exatamente quando regar e que adubo usar.",
      rating: 5,
      avatar: "MS",
      gradient: "from-green-400 to-blue-500"
    },
    {
      name: "João Kumba", 
      location: "Benguela",
      text: "Descobri que tinha plantas medicinais no quintal que nem sabia. Muito útil!",
      rating: 5,
      avatar: "JK",
      gradient: "from-purple-400 to-pink-500"
    },
    {
      name: "Ana Ferreira",
      location: "Huambo", 
      text: "Perfeito para quem tem horta em casa. As dicas são certeiras.",
      rating: 5,
      avatar: "AF",
      gradient: "from-orange-400 to-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-green-100 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Cuida Planta
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#como-funciona" className="text-gray-700 hover:text-green-600 font-medium transition-colors">Como Funciona</a>
              <a href="#testemunhos" className="text-gray-700 hover:text-green-600 font-medium transition-colors">Testemunhos</a>
              <a href="#precos" className="text-gray-700 hover:text-green-600 font-medium transition-colors">Preços</a>
              <Button 
                onClick={onGetStarted}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-2 rounded-xl shadow-lg transition-all duration-300 hover:shadow-green-500/25"
              >
                Começar Grátis
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-green-100 pt-4">
              <div className="flex flex-col space-y-3">
                <a href="#como-funciona" className="text-gray-700 hover:text-green-600 font-medium transition-colors">Como Funciona</a>
                <a href="#testemunhos" className="text-gray-700 hover:text-green-600 font-medium transition-colors">Testemunhos</a>
                <a href="#precos" className="text-gray-700 hover:text-green-600 font-medium transition-colors">Preços</a>
                <Button 
                  onClick={onGetStarted}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-2 rounded-xl shadow-lg transition-all duration-300 w-full"
                >
                  Começar Grátis
                </Button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-bounce delay-1000">
          <Leaf className="w-12 h-12 text-green-400 opacity-60" />
        </div>
        <div className="absolute top-40 right-20 animate-bounce delay-2000">
          <Sun className="w-10 h-10 text-yellow-400 opacity-60" />
        </div>
        <div className="absolute bottom-40 left-20 animate-bounce delay-3000">
          <Droplets className="w-8 h-8 text-blue-400 opacity-60" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="text-left">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight drop-shadow-2xl">
                Suas plantas estão
                <span className="text-green-400 block"> morrendo</span>?
              </h1>
            
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed drop-shadow-lg">
                <span className="font-bold text-red-400 text-2xl">Pare de perder plantas por não saber como cuidar!</span> 
                <br />
                Com o Cuida Planta, você tira uma foto e nossa IA te diz exatamente o que fazer.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 mb-8">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-10 py-6 text-xl font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-green-500/25"
                  onClick={onGetStarted}
                >
                  <Camera className="w-6 h-6 mr-3" />
                  Experimentar Grátis Agora
                </Button>
                <div className="flex items-center text-white/80 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  ✅ Sem cartão de crédito • ✅ 3 análises grátis
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 text-sm text-white/80">
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                  <span className="font-semibold">+1.200 plantas identificadas</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <CheckCircle className="w-5 h-5 text-blue-400 mr-2" />
                  <span className="font-semibold">+500 usuários em Angola</span>
                </div>
              </div>
            </div>
            
            {/* Right side - Feature highlights */}
            <div className="hidden lg:block">
              <div className="space-y-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-green-200 transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <Camera className="w-8 h-8 text-green-600 mr-3" />
                    <h3 className="font-bold text-gray-800">Identificação Instantânea</h3>
                  </div>
                  <p className="text-gray-600">Tire uma foto e saiba exatamente que planta é</p>
                </div>
                
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-blue-200 transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <Zap className="w-8 h-8 text-blue-600 mr-3" />
                    <h3 className="font-bold text-gray-800">Diagnóstico Inteligente</h3>
                  </div>
                  <p className="text-gray-600">Detecta problemas e dá soluções práticas</p>
                </div>
                
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-purple-200 transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <Users className="w-8 h-8 text-purple-600 mr-3" />
                    <h3 className="font-bold text-gray-800">Comunidade Angolana</h3>
                  </div>
                  <p className="text-gray-600">Conecte-se com outros cuidadores de plantas</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="relative py-20 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-20 h-20 bg-red-200/30 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-orange-200/30 rounded-full animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Reconhece esses problemas?
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
              Você não está sozinho. Esses são os maiores desafios de quem cuida de plantas em Angola.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {problems.map((problem, index) => (
              <Card 
                key={index} 
                className={`bg-gradient-to-br ${problem.gradient} border-2 border-red-200/50 hover:border-red-300 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-fade-in backdrop-blur-sm`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-6 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                    {problem.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-red-800">
                    {problem.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-center leading-relaxed">
                    {problem.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-20 w-24 h-24 bg-green-200/30 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 left-20 w-40 h-40 bg-emerald-200/30 rounded-full animate-pulse delay-2000"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              A solução que você precisa chegou!
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
              Cuida Planta usa inteligência artificial para resolver todos os seus problemas com plantas.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`bg-gradient-to-br ${feature.gradient} border-2 border-green-200/50 hover:border-green-400 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-fade-in backdrop-blur-sm`}
                style={{ animationDelay: feature.delay }}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-6 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-center leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Como funciona? É muito simples!
            </h2>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { step: "1", title: "Tire uma foto", desc: "Da sua planta com o celular ou computador", color: "from-green-500 to-emerald-600" },
                { step: "2", title: "IA analisa", desc: "Nossa inteligência artificial identifica e diagnostica", color: "from-blue-500 to-cyan-600" },
                { step: "3", title: "Receba soluções", desc: "Instruções claras sobre cuidados e tratamentos", color: "from-purple-500 to-pink-600" }
              ].map((item, index) => (
                <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 300}ms` }}>
                  <div className={`w-20 h-20 bg-gradient-to-br ${item.color} text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-2xl transform hover:scale-110 transition-all duration-300`}>
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">{item.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-20 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              O que dizem os angolanos que já usam
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-fade-in bg-white/80 backdrop-blur-sm border-2 border-gray-200/50" style={{ animationDelay: `${index * 200}ms` }}>
                <CardContent className="pt-8">
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic text-lg leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center">
                    <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.gradient} rounded-full flex items-center justify-center text-white font-bold mr-4 shadow-lg`}>
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full animate-pulse delay-2000"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Pare de perder plantas hoje mesmo!
          </h2>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in delay-300">
            Junte-se a centenas de angolanos que já salvaram suas plantas com o Cuida Planta. 
            Comece grátis agora!
          </p>
          
          <Button 
            size="lg" 
            className="bg-white text-green-700 hover:bg-green-50 px-12 py-6 text-xl font-bold rounded-2xl shadow-2xl transform hover:scale-110 transition-all duration-300 animate-fade-in delay-500"
            onClick={onGetStarted}
          >
            Começar Agora Grátis
            <ArrowRight className="w-6 h-6 ml-3" />
          </Button>
          
          <p className="text-green-100 mt-8 text-lg animate-fade-in delay-700">
            ✅ 3 análises grátis • ✅ Sem compromisso • ✅ Cancele quando quiser
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
