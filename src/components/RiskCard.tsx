import { RiskItem } from '@/types/profile';
import { CyberCard } from './CyberCard';

interface RiskCardProps {
  risk: RiskItem;
}

export function RiskCard({ risk }: RiskCardProps) {
  const getBorderColor = (): string => {
    switch (risk.categoria) {
      case 'alto':
        return 'border-t-destructive';
      case 'moderado':
        return 'border-t-warning';
      case 'baixo':
        return 'border-t-success';
      default:
        return 'border-t-muted';
    }
  };

  const getBarColor = (): string => {
    switch (risk.categoria) {
      case 'alto':
        return 'bg-destructive';
      case 'moderado':
        return 'bg-warning';
      case 'baixo':
        return 'bg-success';
      default:
        return 'bg-muted';
    }
  };

  const getCategoryColor = (): string => {
    switch (risk.categoria) {
      case 'alto':
        return 'text-destructive';
      case 'moderado':
        return 'text-warning';
      case 'baixo':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <CyberCard className={`p-6 border-t-4 ${getBorderColor()} ${risk.categoria === 'alto' ? 'bg-destructive/20 border-destructive' : ''} hover:scale-[1.02] transition-transform`}>
      <div className="flex flex-col h-full">
        <h3 className={`text-lg font-semibold mb-4 min-h-[3rem] flex items-center ${risk.categoria === 'alto' ? 'text-destructive' : 'text-foreground'}`}>
          {risk.titulo}
        </h3>
        
        <div className="flex items-center justify-center mb-4">
          <div className="relative w-20 h-20">
            <div className="w-full h-full rounded-full bg-background border-4 border-muted flex items-center justify-center">
              <span className="text-2xl font-bold">{risk.probabilidade}%</span>
            </div>
            {/* Barra circular de progresso */}
            <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="hsl(var(--muted))"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke={`hsl(var(--${risk.categoria === 'alto' ? 'destructive' : risk.categoria === 'moderado' ? 'warning' : 'success'}))`}
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${(risk.probabilidade / 100) * 251.2} 251.2`}
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        <div className="mb-3 text-center">
          <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full bg-background/50 ${getCategoryColor()}`}>
            {risk.categoria.charAt(0).toUpperCase() + risk.categoria.slice(1)}
          </span>
        </div>

        <div className="flex-1 space-y-3 text-center">
          <p className="text-sm text-muted-foreground">{risk.explicacao}</p>
        </div>
      </div>
    </CyberCard>
  );
}