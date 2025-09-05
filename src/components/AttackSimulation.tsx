import { CyberCard } from './CyberCard';
import { Button } from '@/components/ui/button';
import { PlayCircle, RotateCcw, Shield } from 'lucide-react';
import { useState } from 'react';

interface SimulationStep {
  time: string;
  message: string;
  status: 'warning' | 'success' | 'info';
}

const simulationStepsWithoutProtection = {
  firewall: [
    { time: '00:01', message: 'Scanner de vulnerabilidades inicia varredura', status: 'warning' as const },
    { time: '00:05', message: 'Portas abertas identificadas', status: 'warning' as const },
    { time: '00:15', message: 'Brute force em andamento', status: 'danger' as const },
    { time: '01:30', message: 'Acesso não autorizado obtido', status: 'danger' as const },
    { time: '02:00', message: 'Sistema comprometido', status: 'danger' as const },
  ],
  endpoint: [
    { time: '00:01', message: 'Arquivo executável baixado', status: 'warning' as const },
    { time: '00:05', message: 'Arquivo executado pelo usuário', status: 'warning' as const },
    { time: '00:30', message: 'Criptografia de arquivos iniciada', status: 'danger' as const },
    { time: '02:00', message: 'Dados sequestrados', status: 'danger' as const },
    { time: '02:30', message: 'Nota de resgate exibida', status: 'danger' as const },
  ],
  backup: [
    { time: '00:01', message: 'Ransomware detectado no servidor', status: 'warning' as const },
    { time: '00:10', message: 'Backups locais criptografados', status: 'danger' as const },
    { time: '01:00', message: 'Tentativa de recuperação falha', status: 'danger' as const },
    { time: '24:00', message: 'Perda total de dados', status: 'danger' as const },
  ]
};

const simulationSteps = {
  firewall: [
    { time: '00:01', message: 'Scanner de vulnerabilidades inicia varredura', status: 'warning' as const },
    { time: '00:02', message: 'IPS Concierge detecta padrão de scan', status: 'info' as const },
    { time: '00:03', message: 'IP atacante bloqueado automaticamente', status: 'success' as const },
    { time: '00:04', message: 'Alerta enviado para SOC 24/7', status: 'success' as const },
  ],
  endpoint: [
    { time: '00:01', message: 'Arquivo executável baixado', status: 'warning' as const },
    { time: '00:02', message: 'EDR detecta comportamento suspeito', status: 'info' as const },
    { time: '00:03', message: 'Processo malicioso terminado', status: 'success' as const },
    { time: '00:04', message: 'Endpoint isolado preventivamente', status: 'success' as const },
  ],
  backup: [
    { time: '00:01', message: 'Criptografia detectada no servidor', status: 'warning' as const },
    { time: '00:02', message: 'Backup imutável preservado', status: 'info' as const },
    { time: '00:03', message: 'Restore iniciado automaticamente', status: 'success' as const },
    { time: '00:04', message: 'Sistema restaurado com sucesso', status: 'success' as const },
  ]
};

const scenarioTitles = {
  firewall: 'Tentativa de Invasão Externa',
  endpoint: 'Execução de Ransomware',
  backup: 'Recuperação Pós-Incidente'
};

interface AttackSimulationProps {
  scenario: 'firewall' | 'endpoint' | 'backup';
}

export function AttackSimulation({ scenario }: AttackSimulationProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [mode, setMode] = useState<'sem' | 'com' | null>(null);

  const steps = simulationSteps[scenario];

  const startSimulation = (selectedMode: 'sem' | 'com') => {
    setMode(selectedMode);
    setIsPlaying(true);
    setCurrentStep(0);

    const steps = selectedMode === 'com' ? simulationSteps[scenario] : simulationStepsWithoutProtection[scenario];
    
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, selectedMode === 'com' ? 800 : 1200);
  };

  const reset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setMode(null);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <div className="w-2 h-2 rounded-full bg-success" />;
      case 'danger':
        return <div className="w-2 h-2 rounded-full bg-destructive" />;
      case 'warning':
        return <div className="w-2 h-2 rounded-full bg-warning" />;
      case 'info':
        return <div className="w-2 h-2 rounded-full bg-primary" />;
      default:
        return <div className="w-2 h-2 rounded-full bg-muted" />;
    }
  };

  const getCurrentSteps = () => {
    return mode === 'com' ? simulationSteps[scenario] : simulationStepsWithoutProtection[scenario];
  };

  return (
    <CyberCard className="p-6">
      <h3 className="text-lg font-semibold mb-4">{scenarioTitles[scenario]}</h3>
      
      <div className="flex gap-2 mb-4">
        <Button
          variant={mode === 'sem' ? 'destructive' : 'outline'}
          size="sm"
          onClick={() => startSimulation('sem')}
          disabled={isPlaying}
        >
          Sem Concierge
        </Button>
        <Button
          variant={mode === 'com' ? 'default' : 'outline'}
          size="sm"
          onClick={() => startSimulation('com')}
          disabled={isPlaying}
          className="bg-primary text-primary-foreground"
        >
          Com Concierge
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={reset}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {mode && (
        <div className="space-y-3 mb-4">
          <div className={`text-sm font-medium mb-2 ${mode === 'com' ? 'text-success' : 'text-destructive'}`}>
            {mode === 'com' ? 'Com Proteção Concierge - 100%' : 'Sem Proteção - Vulnerável'}
          </div>
          <div className="w-full bg-muted rounded-full h-2 mb-4">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${mode === 'com' ? 'bg-success' : 'bg-destructive'}`}
              style={{ width: `${((currentStep + 1) / getCurrentSteps().length) * 100}%` }}
            />
          </div>
          
          <div className="space-y-2">
            {getCurrentSteps().map((step, index) => (
              <div 
                key={index}
                className={`flex items-center gap-3 text-sm p-2 rounded transition-all duration-300 ${
                  index <= currentStep 
                    ? mode === 'com' 
                      ? 'bg-success/10 text-success' 
                      : step.status === 'danger' 
                        ? 'bg-destructive/10 text-destructive'
                        : 'bg-warning/10 text-warning'
                    : 'text-muted-foreground'
                }`}
              >
                <span className="text-xs font-mono w-12">{step.time}</span>
                {getStatusIcon(step.status)}
                <span className="flex-1">{step.message}</span>
              </div>
            ))}
          </div>
          
          {currentStep >= getCurrentSteps().length - 1 && !isPlaying && (
            <div className={`border rounded-lg p-4 mt-4 ${
              mode === 'com' 
                ? 'bg-success/10 border-success/20' 
                : 'bg-destructive/10 border-destructive/20'
            }`}>
              <div className={`flex items-center gap-2 font-medium ${
                mode === 'com' ? 'text-success' : 'text-destructive'
              }`}>
                <Shield className="h-4 w-4" />
                {mode === 'com' ? 'Ataque Bloqueado com Sucesso!' : 'Sistema Comprometido!'}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {mode === 'com' 
                  ? 'A proteção Concierge impediu o ataque e manteve a operação segura.'
                  : 'Sem proteção adequada, o ataque foi bem-sucedido causando danos significativos.'
                }
              </p>
            </div>
          )}
        </div>
      )}

      {!mode && (
        <div className="bg-muted/10 border border-muted/20 rounded-lg p-4">
          <div className="text-muted-foreground font-medium">Selecione um cenário</div>
          <p className="text-sm text-muted-foreground mt-1">
            Compare a diferença entre ter ou não ter proteção Concierge.
          </p>
        </div>
      )}
    </CyberCard>
  );
}