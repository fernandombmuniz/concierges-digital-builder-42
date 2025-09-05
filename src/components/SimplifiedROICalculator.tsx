import { useState } from 'react';
import { CyberCard } from './CyberCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TrendingUp, Calculator } from 'lucide-react';

export function SimplifiedROICalculator() {
  const [custoIncidente, setCustoIncidente] = useState(100000);
  const [probabilidadeSemProtecao, setProbabilidadeSemProtecao] = useState(75);
  
  // Custos fixos da solução
  const custoImplantacao = 15000;
  const custoMensal = 2500;
  const custoAnual = custoImplantacao + (custoMensal * 12);

  // Eficácia individual dos controles
  const eficaciaFirewall = 70;
  const eficaciaEndpoint = 80;
  const eficaciaBackup = 85;

  // Cálculos
  const perdaEsperadaSemControles = (probabilidadeSemProtecao / 100) * custoIncidente;
  
  const perdaComFirewall = perdaEsperadaSemControles * (1 - eficaciaFirewall / 100);
  const perdaComEndpoint = perdaEsperadaSemControles * (1 - eficaciaEndpoint / 100);
  const perdaComBackup = perdaEsperadaSemControles * (1 - eficaciaBackup / 100);
  
  // Redução combinada (multiplicativa)
  const reducaoCombinada = 1 - ((1 - eficaciaFirewall/100) * (1 - eficaciaEndpoint/100) * (1 - eficaciaBackup/100));
  const perdaComTodos = perdaEsperadaSemControles * (1 - reducaoCombinada);
  
  const economiaAnual = perdaEsperadaSemControles - perdaComTodos;
  const roi = ((economiaAnual - custoAnual) / custoAnual) * 100;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <CyberCard className="p-8 mb-6">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <TrendingUp className="h-6 w-6 text-success" />
        ROI e Impacto Financeiro
      </h2>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Parâmetros Editáveis */}
        <div>
          <h3 className="font-semibold mb-4">Parâmetros Editáveis</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="custo-incidente">Custo Médio de um Incidente</Label>
              <Input
                id="custo-incidente"
                type="number"
                value={custoIncidente}
                onChange={(e) => setCustoIncidente(Number(e.target.value))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="probabilidade">Probabilidade sem Proteção (%)</Label>
              <Input
                id="probabilidade"
                type="number"
                min="0"
                max="100"
                value={probabilidadeSemProtecao}
                onChange={(e) => setProbabilidadeSemProtecao(Number(e.target.value))}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Eficácia Separada */}
        <div>
          <h3 className="font-semibold mb-4">Eficácia por Solução</h3>
          <div className="space-y-4">
            <div className="p-4 bg-secondary/20 border border-border rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Apenas Firewall ({eficaciaFirewall}%)</div>
              <div className="text-lg font-bold text-primary">
                {formatCurrency(perdaComFirewall)}
              </div>
            </div>
            
            <div className="p-4 bg-secondary/20 border border-border rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Apenas Endpoint ({eficaciaEndpoint}%)</div>
              <div className="text-lg font-bold text-primary">
                {formatCurrency(perdaComEndpoint)}
              </div>
            </div>
            
            <div className="p-4 bg-secondary/20 border border-border rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Apenas Backup ({eficaciaBackup}%)</div>
              <div className="text-lg font-bold text-primary">
                {formatCurrency(perdaComBackup)}
              </div>
            </div>
            
            <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Todos Juntos ({(reducaoCombinada * 100).toFixed(1)}%)</div>
              <div className="text-xl font-bold text-success">
                {formatCurrency(perdaComTodos)}
              </div>
            </div>
          </div>
        </div>

        {/* Resultados Finais */}
        <div>
          <h3 className="font-semibold mb-4">ROI Calculado</h3>
          <div className="space-y-4">
            <div className="p-4 bg-danger/10 border border-danger/20 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Perda Esperada Sem Controles</div>
              <div className="text-xl font-bold text-danger">
                {formatCurrency(perdaEsperadaSemControles)}
              </div>
            </div>

            <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Investimento Anual</div>
              <div className="text-xl font-bold text-primary">
                {formatCurrency(custoAnual)}
              </div>
            </div>

            <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">ROI em 12 meses</div>
              <div className="text-3xl font-bold text-success">
                {roi.toFixed(1)}%
              </div>
            </div>

            <div className="text-sm space-y-1 pt-4 border-t border-border">
              <div className="flex justify-between text-success">
                <span>Economia Anual:</span>
                <span className="font-bold">{formatCurrency(economiaAnual)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Explicação do Cálculo */}
      <div className="mt-8 p-6 bg-muted/20 rounded-lg">
        <h4 className="font-semibold mb-3 flex items-center gap-2">
          <Calculator className="h-4 w-4" />
          Como o cálculo foi feito:
        </h4>
        <div className="text-sm text-muted-foreground space-y-2">
          <p>1. <strong>Perda esperada sem controles:</strong> {probabilidadeSemProtecao}% × {formatCurrency(custoIncidente)} = {formatCurrency(perdaEsperadaSemControles)}</p>
          <p>2. <strong>Eficácia combinada:</strong> Firewall (70%) + Endpoint (80%) + Backup (85%) = {(reducaoCombinada * 100).toFixed(1)}% de proteção</p>
          <p>3. <strong>Perda residual:</strong> {formatCurrency(perdaEsperadaSemControles)} × {((1 - reducaoCombinada) * 100).toFixed(1)}% = {formatCurrency(perdaComTodos)}</p>
          <p>4. <strong>Economia anual:</strong> {formatCurrency(perdaEsperadaSemControles)} - {formatCurrency(perdaComTodos)} = {formatCurrency(economiaAnual)}</p>
          <p>5. <strong>ROI:</strong> ({formatCurrency(economiaAnual)} - {formatCurrency(custoAnual)}) ÷ {formatCurrency(custoAnual)} × 100 = {roi.toFixed(1)}%</p>
        </div>
      </div>
    </CyberCard>
  );
}