import { Button } from '@/components/ui/button';
import { CyberCard } from '@/components/CyberCard';
import { AppLayout } from '@/components/AppLayout';
import { useProfile } from '@/contexts/ProfileContext';
import { Shield, Zap, Target } from 'lucide-react';

export function Welcome() {
  const { setCurrentStep } = useProfile();

  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Análise de Segurança",
      description: "Identificação personalizada de riscos e vulnerabilidades"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "ROI Calculado",
      description: "Demonstração clara do retorno sobre investimento"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Proposta Sob Medida",
      description: "Solução customizada para suas necessidades específicas"
    }
  ];

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6 gradient-cyber bg-clip-text text-transparent">
            Concierge Interactive Experience
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Vamos criar uma apresentação personalizada que demonstra como podemos proteger sua empresa
            contra ameaças cibernéticas e otimizar seus investimentos em segurança.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <CyberCard key={index} className="p-6 text-center">
              <div className="text-primary mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </CyberCard>
          ))}
        </div>

        <CyberCard className="p-8 text-center" glowing>
          <h2 className="text-2xl font-semibold mb-4">Pronto para começar?</h2>
          <p className="text-muted-foreground mb-6">
            O processo leva apenas alguns minutos e gerará uma apresentação completa
            com análise de riscos, simulações e proposta comercial personalizada.
          </p>
          <Button 
            size="lg" 
            className="gradient-cyber text-white font-semibold px-8"
            onClick={() => setCurrentStep('empresa')}
          >
            Iniciar Onboarding
          </Button>
        </CyberCard>
      </div>
    </AppLayout>
  );
}