import { useState } from 'react';
import { CyberCard } from './CyberCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { TrendingUp, Calculator, BarChart3 } from 'lucide-react';

export function SimplifiedROICalculator() {
  const [custoIncidente, setCustoIncidente] = useState(100000);
  const [probabilidadeSemProtecao, setProbabilidadeSemProtecao] = useState(75);
  const [investimentoAnual, setInvestimentoAnual] = useState(45000);
  
  // Sliders para eficácia com ranges realistas
  const [eficaciaFirewall, setEficaciaFirewall] = useState([85]); // 40-99%
  const [eficaciaEndpoint, setEficaciaEndpoint] = useState([99]); // 95-100%
  const [eficaciaBackup, setEficaciaBackup] = useState([55]); // 30-90%

  // Cálculos corrigidos conforme especificação
  // ALE0 = Probabilidade sem proteção × Custo do incidente
  const ale0 = (probabilidadeSemProtecao / 100) * custoIncidente;
  
  // Firewall: Reduz probabilidade
  const probabilidadeComFirewall = (probabilidadeSemProtecao / 100) * (1 - eficaciaFirewall[0] / 100);
  const perdaComFirewall = probabilidadeComFirewall * custoIncidente;
  
  // Endpoint: Reduz probabilidade
  const probabilidadeComEndpoint = (probabilidadeSemProtecao / 100) * (1 - eficaciaEndpoint[0] / 100);
  const perdaComEndpoint = probabilidadeComEndpoint * custoIncidente;
  
  // Backup: Não reduz probabilidade, mas reduz impacto
  const perdaComBackup = (probabilidadeSemProtecao / 100) * custoIncidente * (1 - eficaciaBackup[0] / 100);
  
  // Cenário combinado (Firewall + Endpoint + Backup)
  const probabilidadeResidual = (probabilidadeSemProtecao / 100) * (1 - eficaciaFirewall[0] / 100) * (1 - eficaciaEndpoint[0] / 100);
  const impactoResidual = custoIncidente * (1 - eficaciaBackup[0] / 100);
  const perdaCombinada = probabilidadeResidual * impactoResidual;
  
  const economiaAnual = ale0 - perdaCombinada;
  const roi = ((economiaAnual - investimentoAnual) / investimentoAnual) * 100;

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

      {/* Parâmetros Interativos */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="font-semibold mb-4">Parâmetros Base</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="custo-incidente">Custo médio do incidente (R$)</Label>
              <Input
                id="custo-incidente"
                type="number"
                value={custoIncidente}
                onChange={(e) => setCustoIncidente(Number(e.target.value))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="probabilidade">Probabilidade sem proteção (%)</Label>
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
            <div>
              <Label htmlFor="investimento">Investimento anual em segurança (R$)</Label>
              <Input
                id="investimento"
                type="number"
                value={investimentoAnual}
                onChange={(e) => setInvestimentoAnual(Number(e.target.value))}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Eficácia dos Controles</h3>
          <div className="space-y-6">
            <div>
              <Label className="text-sm font-medium">
                Firewall (NGFW): {eficaciaFirewall[0]}% - Reduz probabilidade
              </Label>
              <Slider
                value={eficaciaFirewall}
                onValueChange={setEficaciaFirewall}
                max={99}
                min={40}
                step={1}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>40%</span>
                <span>99%</span>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium">
                Endpoint (EDR/NGAV): {eficaciaEndpoint[0]}% - Reduz probabilidade
              </Label>
              <Slider
                value={eficaciaEndpoint}
                onValueChange={setEficaciaEndpoint}
                max={100}
                min={95}
                step={1}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>95%</span>
                <span>100%</span>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium">
                Backup: {eficaciaBackup[0]}% - Reduz impacto
              </Label>
              <Slider
                value={eficaciaBackup}
                onValueChange={setEficaciaBackup}
                max={90}
                min={30}
                step={1}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>30%</span>
                <span>90%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resultados */}
      <div className="grid lg:grid-cols-4 gap-6 mb-8">
        <div className="p-4 bg-danger/10 border border-danger/20 rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">Perda esperada sem controles (ALE0)</div>
          <div className="text-xl font-bold text-danger">
            {formatCurrency(ale0)}
          </div>
        </div>

        <div className="p-4 bg-secondary/20 border border-border rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">Apenas Firewall</div>
          <div className="text-lg font-bold text-primary">
            {formatCurrency(perdaComFirewall)}
          </div>
        </div>

        <div className="p-4 bg-secondary/20 border border-border rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">Apenas Endpoint</div>
          <div className="text-lg font-bold text-primary">
            {formatCurrency(perdaComEndpoint)}
          </div>
        </div>

        <div className="p-4 bg-secondary/20 border border-border rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">Apenas Backup</div>
          <div className="text-lg font-bold text-primary">
            {formatCurrency(perdaComBackup)}
          </div>
        </div>
      </div>

      {/* Resultado Final */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-success/10 border border-success/20 rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">Todos os controles juntos</div>
          <div className="text-2xl font-bold text-success">
            {formatCurrency(perdaCombinada)}
          </div>
        </div>

        <div className="p-6 bg-primary/10 border border-primary/20 rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">Economia anual</div>
          <div className="text-2xl font-bold text-primary">
            {formatCurrency(economiaAnual)}
          </div>
        </div>

        <div className="p-6 bg-success/10 border border-success/20 rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">ROI (% em 12 meses)</div>
          <div className="text-3xl font-bold text-success">
            {roi.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Gráfico Comparativo Antes/Depois */}
      <div className="mb-8 p-6 bg-muted/20 rounded-lg">
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          Comparativo Antes/Depois
        </h4>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-2">Antes (Sem proteção)</div>
            <div className="h-20 bg-danger/20 rounded flex items-center justify-center">
              <span className="text-xl font-bold text-danger">{formatCurrency(ale0)}</span>
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-2">Depois (Com todos os controles)</div>
            <div className="h-20 bg-success/20 rounded flex items-center justify-center">
              <span className="text-xl font-bold text-success">{formatCurrency(perdaCombinada)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Explicação do Cálculo */}
      <div className="mb-8 p-6 bg-muted/20 rounded-lg">
        <h4 className="font-semibold mb-3 flex items-center gap-2">
          <Calculator className="h-4 w-4" />
          Como o cálculo foi feito:
        </h4>
        <div className="text-sm text-muted-foreground space-y-2">
          <p>1. <strong>Perda esperada sem controles (ALE0):</strong> {probabilidadeSemProtecao}% × {formatCurrency(custoIncidente)} = {formatCurrency(ale0)}</p>
          <p>2. <strong>Firewall:</strong> Probabilidade residual = {probabilidadeSemProtecao}% × (1 - {eficaciaFirewall[0]}%) = {(probabilidadeComFirewall * 100).toFixed(2)}%</p>
          <p>3. <strong>Endpoint:</strong> Probabilidade residual = {probabilidadeSemProtecao}% × (1 - {eficaciaEndpoint[0]}%) = {(probabilidadeComEndpoint * 100).toFixed(2)}%</p>
          <p>4. <strong>Backup:</strong> Reduz impacto em {eficaciaBackup[0]}%, mantendo probabilidade = {formatCurrency(perdaComBackup)}</p>
          <p>5. <strong>Cenário combinado:</strong> Prob. residual = {(probabilidadeResidual * 100).toFixed(2)}% × Impacto residual = {formatCurrency(perdaCombinada)}</p>
          <p>6. <strong>ROI:</strong> ({formatCurrency(economiaAnual)} - {formatCurrency(investimentoAnual)}) ÷ {formatCurrency(investimentoAnual)} × 100 = {roi.toFixed(1)}%</p>
        </div>
      </div>

      {/* Nota Metodológica */}
      <div className="p-6 bg-warning/10 border border-warning/20 rounded-lg">
        <h4 className="font-semibold mb-3">⚠️ Nota Metodológica</h4>
        <div className="text-sm text-muted-foreground space-y-2">
          <p>
            Esses cálculos são <strong>estimativas ilustrativas</strong> com base em fontes independentes de 2025. 
            Os percentuais variam conforme produto, configuração e maturidade operacional.
          </p>
          <div className="mt-4">
            <p className="font-medium text-foreground mb-2">Fontes:</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>AV-Comparatives Business Real-World Test 2025 (EDR/NGAV: 94,7%–100% de proteção)</li>
              <li>CyberRatings.org 2025 (Firewalls: 37,01%–99,87% de proteção contra exploits/evasões)</li>
              <li>Sophos State of Ransomware 2025 (97% recuperaram dados, 54% usaram backup, 49% pagaram resgate)</li>
              <li>Veeam Ransomware Trends 2025 (10% recuperaram &gt;90%, 57% recuperaram &lt;50%)</li>
              <li>Verizon DBIR 2025 (exploração de vulnerabilidades em alta; vetores por tipo de ataque)</li>
            </ul>
          </div>
        </div>
      </div>
    </CyberCard>
  );
}