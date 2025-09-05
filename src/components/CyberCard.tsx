import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface CyberCardProps {
  children: ReactNode;
  className?: string;
  glowing?: boolean;
  gradient?: boolean;
}

export function CyberCard({ children, className, glowing = false, gradient = false }: CyberCardProps) {
  return (
    <div 
      className={cn(
        "cyber-card transition-cyber",
        glowing && "cyber-glow",
        gradient && "gradient-cyber",
        className
      )}
    >
      {children}
    </div>
  );
}