import { cn } from '@/lib/utils';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function ProgressBar({ currentStep, totalSteps, className }: ProgressBarProps) {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between text-sm text-muted-foreground mb-2">
        <span>Progresso</span>
        <span>{currentStep} de {totalSteps}</span>
      </div>
      <div className="w-full bg-secondary rounded-full h-2">
        <div 
          className="h-2 rounded-full gradient-cyber transition-cyber"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}