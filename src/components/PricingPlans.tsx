
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Crown, Camera, Users, BookOpen, MessageSquare, Shield } from "lucide-react";

const PricingPlans = () => {
  const plans = [
    {
      name: "Grátis",
      icon: <Camera className="w-6 h-6" />,
      price: "0",
      currency: "AOA",
      period: "sempre",
      description: "Perfeito para começar a cuidar das suas plantas",
      features: [
        "3 análises de plantas por mês",
        "Identificação básica de espécies",
        "Diagnóstico de saúde simples",
        "Acesso ao guia básico de plantas",
        "Suporte por email",
      ],
      limitations: [
        "Análises limitadas por mês",
        "Sem histórico de plantas",
        "Sem plano de cuidados personalizado"
      ],
      cta: "Começar Grátis",
      popular: false,
      color: "gray"
    },
    {
      name: "PRO",
      icon: <Star className="w-6 h-6" />,
      price: "2.500",
      currency: "AOA",
      period: "mês",
      description: "Ideal para donas de casa e jardineiros dedicados",
      features: [
        "Análises ilimitadas de plantas",
        "Diagnósticos profundos com IA avançada",
        "Plano de cuidados personalizado",
        "Histórico completo das suas plantas",
        "Calendário de irrigação e fertilização",
        "Acesso completo ao guia de plantas angolanas",
        "Participação na comunidade",
        "Suporte prioritário",
        "Exportação de relatórios em PDF"
      ],
      limitations: [],
      cta: "Assinar PRO",
      popular: true,
      color: "green"
    },
    {
      name: "PREMIUM",
      icon: <Crown className="w-6 h-6" />,
      price: "5.000",
      currency: "AOA",
      period: "mês",
      description: "Para agricultores e pequenos negócios",
      features: [
        "Tudo do plano PRO",
        "Análise de múltiplas plantas simultaneamente",
        "Consultoria virtual com especialistas",
        "Relatórios avançados de saúde das plantas",
        "API para integração com outros sistemas",
        "Suporte para hortas e pequenas lavras",
        "Análise de solo por foto",
        "Previsão de pragas e doenças",
        "Suporte WhatsApp 24/7",
        "Sessões de consultoria mensal (1h)"
      ],
      limitations: [],
      cta: "Assinar PREMIUM",
      popular: false,
      color: "purple"
    }
  ];

  const getColorClasses = (color: string, popular = false) => {
    const base = {
      gray: "border-gray-200 bg-white",
      green: "border-green-500 bg-green-50",
      purple: "border-purple-500 bg-purple-50"
    };
    
    if (popular) {
      return `${base[color as keyof typeof base]} ring-2 ring-green-500 ring-offset-2`;
    }
    
    return base[color as keyof typeof base];
  };

  const getButtonClasses = (color: string) => {
    const classes = {
      gray: "bg-gray-600 hover:bg-gray-700 text-white",
      green: "bg-green-600 hover:bg-green-700 text-white",
      purple: "bg-purple-600 hover:bg-purple-700 text-white"
    };
    
    return classes[color as keyof typeof classes];
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Escolha o Plano Ideal para Você
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Desde análises gratuitas até consultoria profissional. 
          Encontre o plano perfeito para cuidar das suas plantas em Angola.
        </p>
        
        <div className="flex items-center justify-center space-x-2 bg-green-50 rounded-full p-1 max-w-md mx-auto">
          <Badge className="bg-green-600 text-white px-4 py-2">🇦🇴</Badge>
          <span className="text-sm font-medium text-green-800">
            Preços especiais para Angola
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <Card 
            key={index} 
            className={`relative ${getColorClasses(plan.color, plan.popular)} transition-all hover:shadow-lg`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-green-600 text-white px-4 py-2 text-sm font-semibold">
                  ⭐ MAIS POPULAR
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center pb-4">
              <div className={`w-16 h-16 mx-auto rounded-full ${
                plan.color === 'gray' ? 'bg-gray-100' :
                plan.color === 'green' ? 'bg-green-100' :
                'bg-purple-100'
              } flex items-center justify-center mb-4`}>
                <div className={
                  plan.color === 'gray' ? 'text-gray-600' :
                  plan.color === 'green' ? 'text-green-600' :
                  'text-purple-600'
                }>
                  {plan.icon}
                </div>
              </div>
              
              <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
              <div className="space-y-2">
                <div className="flex items-baseline justify-center space-x-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-lg font-medium text-gray-600">{plan.currency}</span>
                  <span className="text-gray-500">/{plan.period}</span>
                </div>
                <CardDescription className="text-sm">{plan.description}</CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Features */}
              <div className="space-y-3">
                <h4 className="font-semibold text-green-800 flex items-center">
                  <Check className="w-4 h-4 mr-2" />
                  O que está incluído:
                </h4>
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Limitations */}
              {plan.limitations.length > 0 && (
                <div className="space-y-3 pt-3 border-t">
                  <h4 className="font-semibold text-orange-700 text-sm">
                    Limitações:
                  </h4>
                  <ul className="space-y-1">
                    {plan.limitations.map((limitation, limitIndex) => (
                      <li key={limitIndex} className="flex items-start space-x-2 text-sm text-gray-600">
                        <span className="text-orange-500 mt-0.5">•</span>
                        <span>{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA Button */}
              <Button 
                className={`w-full ${getButtonClasses(plan.color)} font-semibold py-3`}
                size="lg"
              >
                {plan.cta}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Info */}
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Payment Methods */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="font-semibold text-blue-800 flex items-center justify-center">
                <Shield className="w-5 h-5 mr-2" />
                Métodos de Pagamento Seguros
              </h3>
              <div className="flex items-center justify-center space-x-6 text-sm text-blue-600">
                <span>💳 Cartão de Crédito/Débito</span>
                <span>📱 Mobile Money</span>
                <span>🏦 Transferência Bancária</span>
                <span>💰 Pagamento no Balcão</span>
              </div>
              <p className="text-xs text-blue-600">
                Todos os pagamentos são processados de forma segura. Cancele a qualquer momento.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Perguntas Frequentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold">Posso mudar de plano depois?</h4>
                <p className="text-sm text-gray-600">
                  Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. 
                  As mudanças são aplicadas no próximo ciclo de cobrança.
                </p>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold">E se eu não ficar satisfeito?</h4>
                <p className="text-sm text-gray-600">
                  Oferecemos 7 dias de garantia. Se não ficar satisfeito, 
                  devolvemos 100% do seu dinheiro, sem perguntas.
                </p>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold">Funciona offline?</h4>
                <p className="text-sm text-gray-600">
                  A análise de plantas requer internet, mas você pode acessar 
                  o guia de plantas e histórico offline depois de baixados.
                </p>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold">Há desconto para estudantes?</h4>
                <p className="text-sm text-gray-600">
                  Sim! Estudantes angolanos têm 50% de desconto no plano PRO. 
                  Entre em contato conosco com comprovante de matrícula.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <div className="text-center space-y-2">
          <p className="text-gray-600">
            Tem dúvidas sobre qual plano escolher?
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button variant="outline" size="sm">
              <MessageSquare className="w-4 h-4 mr-2" />
              Chat ao Vivo
            </Button>
            <Button variant="outline" size="sm">
              📞 +244 923 456 789
            </Button>
            <Button variant="outline" size="sm">
              ✉️ ajuda@cuidaplanta.ao
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
