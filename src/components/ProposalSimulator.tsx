import { useState } from 'react';
import { CyberCard } from './CyberCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function ProposalSimulator() {
  const [custoImplantacao, setCustoImplantacao] = useState(15000);
  const [custoMensal, setCustoMensal] = useState(2500);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Cálculo simplificado de perda evitada (baseado nos valores padrão do ROI)
  const perdaEvitada = 125000; // Seria calculado dinamicamente com base no perfil real
  const investimentoTotal = custoImplantacao + (custoMensal * 12);
  const roi = ((perdaEvitada - investimentoTotal) / investimentoTotal) * 100;

  return (
    <CyberCard className="p-8 mb-6">
      <h2 className="text-2xl font-semibold mb-6">Proposta Concierge</h2>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div>
          <h3 className="font-semibold mb-4 text-primary">Concierge Firewall</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• Proteção contra invasões</li>
            <li>• Monitoramento contínuo 24/7</li>
            <li>• Conformidade LGPD</li>
            <li>• Controle de acessos</li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4 text-primary">Concierge Endpoint</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• Defesa contra ransomware</li>
            <li>• Resposta automatizada</li>
            <li>• Proteção para trabalho remoto</li>
            <li>• Prevenção de vazamentos</li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4 text-primary">Concierge Backup</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• Backups automáticos</li>
            <li>• Recuperação rápida</li>
            <li>• Conformidade LGPD</li>
            <li>• Testes de restore regulares</li>
          </ul>
        </div>
      </div>

      {/* Card de investimento editável */}
      <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5 p-8 rounded-2xl">
        <h3 className="text-2xl font-semibold text-center mb-8">Investimento e Retorno</h3>
        
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="mb-4">
              <Label htmlFor="implantacao" className="text-lg font-medium">Implantação</Label>
              <Input
                id="implantacao"
                type="number"
                value={custoImplantacao}
                onChange={(e) => setCustoImplantacao(Number(e.target.value))}
                className="mt-2 text-center text-xl font-bold bg-background"
              />
            </div>
            <div className="text-3xl font-bold text-primary">
              {formatCurrency(custoImplantacao)}
            </div>
            <div className="text-sm text-muted-foreground mt-1">Perdas Evitadas</div>
          </div>

          <div>
            <div className="mb-4">
              <Label htmlFor="mensal" className="text-lg font-medium">Mensalidade</Label>
              <Input
                id="mensal"
                type="number"
                value={custoMensal}
                onChange={(e) => setCustoMensal(Number(e.target.value))}
                className="mt-2 text-center text-xl font-bold bg-background"
              />
            </div>
            <div className="text-3xl font-bold text-primary">
              {formatCurrency(custoMensal)}
            </div>
            <div className="text-sm text-muted-foreground mt-1">Investimento Total</div>
          </div>

          <div>
            <div className="text-4xl font-bold text-success mb-2">
              {roi > 0 ? roi.toFixed(0) : '0'}%
            </div>
            <div className="text-sm text-muted-foreground">ROI em 12 meses</div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-lg text-muted-foreground">
            Com a solução Concierge completa, você reduz o risco de incidentes de <span className="text-danger font-semibold">75% para apenas 5%</span> ao ano, 
            gerando um retorno sobre investimento de <span className="text-success font-bold">{roi.toFixed(0)}%</span> em 12 meses.
          </p>
        </div>
      </div>
    </CyberCard>
  );
}