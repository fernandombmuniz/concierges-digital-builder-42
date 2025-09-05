import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, StickyNote } from 'lucide-react';
import { useProfile } from '@/contexts/ProfileContext';

export function NotasInternas() {
  const { profile } = useProfile();
  const [isOpen, setIsOpen] = useState(false);

  const hasNotes = Object.values(profile.observacoesPorEtapa).some(nota => nota.trim() !== '');

  if (!hasNotes) {
    return null;
  }

  const etapas = [
    { nome: 'Informações da Empresa', nota: profile.observacoesPorEtapa.etapa1 },
    { nome: 'Infraestrutura', nota: profile.observacoesPorEtapa.etapa2 },
    { nome: 'Conectividade', nota: profile.observacoesPorEtapa.etapa3 },
    { nome: 'Segurança', nota: profile.observacoesPorEtapa.etapa4 },
    { nome: 'Backup', nota: profile.observacoesPorEtapa.etapa5 },
    { nome: 'Objetivos', nota: profile.observacoesPorEtapa.etapa6 }
  ].filter(etapa => etapa.nota.trim() !== '');

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 w-full justify-start bg-muted/20 border-muted"
        >
          <StickyNote className="h-4 w-4" />
          Notas Internas
          {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-4 mt-4">
        {etapas.map((etapa, index) => (
          <div key={index} className="p-4 bg-secondary/20 rounded-lg border border-border">
            <h4 className="font-medium text-sm text-primary mb-2">{etapa.nome}</h4>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{etapa.nota}</p>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}