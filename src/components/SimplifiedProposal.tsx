import { useState } from 'react';
import { CyberCard } from './CyberCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShoppingCart } from 'lucide-react';

export function SimplifiedProposal() {
  const [custoImplantacao, setCustoImplantacao] = useState(15000);
  const [custoMensal, setCustoMensal] = useState(2500);

  const investimentoTotal12Meses = custoImplantacao + (custoMensal * 12);
  const custoIncidenteMedio = 100000; // Valor base para comparação

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div>
      {/* Investimento do Cliente */}
      <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5 p-8 rounded-2xl">
        <h3 className="text-2xl font-semibold text-center mb-8">Investimento do Cliente</h3>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="text-center">
            <div className="mb-4">
              <Label htmlFor="implantacao" className="text-lg font-medium">Implantação (paga uma vez)</Label>
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
            <div className="text-sm text-muted-foreground mt-1">Uma única vez</div>
          </div>

          <div className="text-center">
            <div className="mb-4">
              <Label htmlFor="mensal" className="text-lg font-medium">Mensalidade (recorrente)</Label>
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
            <div className="text-sm text-muted-foreground mt-1">Por mês</div>
          </div>
        </div>

        {/* Comparação de Custos */}
        <div className="grid md:grid-cols-2 gap-8 text-center">
          <div className="p-6 bg-background/50 rounded-xl">
            <h4 className="text-lg font-semibold mb-2">Investimento Total (12 meses)</h4>
            <div className="text-3xl font-bold text-primary mb-2">
              {formatCurrency(investimentoTotal12Meses)}
            </div>
            <div className="text-sm text-muted-foreground">
              Proteção completa por um ano
            </div>
          </div>
          
          <div className="p-6 bg-danger/10 rounded-xl border border-danger/20">
            <h4 className="text-lg font-semibold mb-2">Custo de um Incidente</h4>
            <div className="text-3xl font-bold text-danger mb-2">
              {formatCurrency(custoIncidenteMedio)}
            </div>
            <div className="text-sm text-muted-foreground">
              Ransomware, vazamento ou parada
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-lg text-muted-foreground">
            <span className="text-success font-semibold">Investir na proteção sai {((custoIncidenteMedio / investimentoTotal12Meses) * 100 - 100).toFixed(0)}% mais barato</span> do que lidar com as consequências de um ataque. 
            Com a solução Concierge completa, você reduz o risco de incidentes de <span className="text-danger font-semibold">75% para apenas 5%</span> ao ano.
          </p>
        </div>
      </div>
    </div>
  );
}