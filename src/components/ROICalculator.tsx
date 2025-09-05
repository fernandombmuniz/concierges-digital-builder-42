import { useState } from 'react';
import { CyberCard } from './CyberCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TrendingUp } from 'lucide-react';

interface ROIParams {
  custoIncidenteRansomware: number;
  custoBreachDados: number;
  custoHoraIndisponibilidade: number;
  horasMediasParada: number;
  probRansomware: number;
  probBreach: number;
  probIndisponibilidade: number;
  eficaciaFirewall: number;
  eficaciaEndpoint: number;
  eficaciaBackup: number;
  custoImplantacao: number;
  custoMensal: number;
}

export function ROICalculator() {
  const [params, setParams] = useState<ROIParams>({
    custoIncidenteRansomware: 50000,
    custoBreachDados: 75000,
    custoHoraIndisponibilidade: 2500,
    horasMediasParada: 24,
    probRansomware: 35,
    probBreach: 25,
    probIndisponibilidade: 45,
    eficaciaFirewall: 70,
    eficaciaEndpoint: 80,
    eficaciaBackup: 85,
    custoImplantacao: 15000,
    custoMensal: 2500,
  });

  const calculateROI = () => {
    // Perda esperada sem controles
    const perdaRansomware = (params.probRansomware / 100) * params.custoIncidenteRansomware;
    const perdaBreach = (params.probBreach / 100) * params.custoBreachDados;
    const perdaIndisponibilidade = (params.probIndisponibilidade / 100) * 
      (params.custoHoraIndisponibilidade * params.horasMediasParada);
    
    const perdaSemControles = perdaRansomware + perdaBreach + perdaIndisponibilidade;

    // Reduções com controles
    const reducaoFirewall = params.eficaciaFirewall / 100;
    const reducaoEndpoint = params.eficaciaEndpoint / 100;
    const reducaoBackup = params.eficaciaBackup / 100;

    // Redução combinada (multiplicativa)
    const reducaoProbCombinada = 1 - ((1 - reducaoFirewall) * (1 - reducaoEndpoint));
    const perdaAposFirewallEndpoint = perdaSemControles * (1 - reducaoProbCombinada);
    const perdaCombinada = perdaAposFirewallEndpoint * (1 - reducaoBackup);

    const custoTotal = params.custoImplantacao + (params.custoMensal * 12);
    const perdaEvitada = perdaSemControles - perdaCombinada;
    const roi = ((perdaEvitada - custoTotal) / custoTotal) * 100;

    return {
      perdaSemControles,
      perdaComFirewall: perdaSemControles * (1 - reducaoFirewall),
      perdaComEndpoint: perdaSemControles * (1 - reducaoEndpoint),
      perdaComBackup: perdaSemControles * (1 - reducaoBackup),
      perdaCombinada,
      custoTotal,
      perdaEvitada,
      roi
    };
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const results = calculateROI();

  return (
    <CyberCard className="p-8 mb-6">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <TrendingUp className="h-6 w-6 text-success" />
        ROI e Impacto Financeiro (Editável)
      </h2>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Parâmetros de Custo */}
        <div>
          <h3 className="font-semibold mb-4">Custos de Incidentes</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="custoRansomware">Custo Médio Ransomware</Label>
              <Input
                id="custoRansomware"
                type="number"
                value={params.custoIncidenteRansomware}
                onChange={(e) => setParams(prev => ({ 
                  ...prev, 
                  custoIncidenteRansomware: Number(e.target.value) 
                }))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="custoBreach">Custo Médio Breach</Label>
              <Input
                id="custoBreach"
                type="number"
                value={params.custoBreachDados}
                onChange={(e) => setParams(prev => ({ 
                  ...prev, 
                  custoBreachDados: Number(e.target.value) 
                }))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="custoHora">Custo por Hora Parada</Label>
              <Input
                id="custoHora"
                type="number"
                value={params.custoHoraIndisponibilidade}
                onChange={(e) => setParams(prev => ({ 
                  ...prev, 
                  custoHoraIndisponibilidade: Number(e.target.value) 
                }))}
                className="mt-1"
              />
            </div>

            <h4 className="font-medium mt-6">Probabilidades (%)</h4>
            <div>
              <Label htmlFor="probRansomware">Ransomware</Label>
              <Input
                id="probRansomware"
                type="number"
                min="0"
                max="100"
                value={params.probRansomware}
                onChange={(e) => setParams(prev => ({ 
                  ...prev, 
                  probRansomware: Number(e.target.value) 
                }))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="probBreach">Breach de Dados</Label>
              <Input
                id="probBreach"
                type="number"
                min="0"
                max="100"
                value={params.probBreach}
                onChange={(e) => setParams(prev => ({ 
                  ...prev, 
                  probBreach: Number(e.target.value) 
                }))}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Eficácia dos Controles */}
        <div>
          <h3 className="font-semibold mb-4">Eficácia dos Controles (%)</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="eficaciaFirewall">Firewall</Label>
              <Input
                id="eficaciaFirewall"
                type="number"
                min="0"
                max="100"
                value={params.eficaciaFirewall}
                onChange={(e) => setParams(prev => ({ 
                  ...prev, 
                  eficaciaFirewall: Number(e.target.value) 
                }))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="eficaciaEndpoint">Endpoint</Label>
              <Input
                id="eficaciaEndpoint"
                type="number"
                min="0"
                max="100"
                value={params.eficaciaEndpoint}
                onChange={(e) => setParams(prev => ({ 
                  ...prev, 
                  eficaciaEndpoint: Number(e.target.value) 
                }))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="eficaciaBackup">Backup</Label>
              <Input
                id="eficaciaBackup"
                type="number"
                min="0"
                max="100"
                value={params.eficaciaBackup}
                onChange={(e) => setParams(prev => ({ 
                  ...prev, 
                  eficaciaBackup: Number(e.target.value) 
                }))}
                className="mt-1"
              />
            </div>

            <h4 className="font-medium mt-6">Custos da Solução</h4>
            <div>
              <Label htmlFor="custoImplantacao">Implantação</Label>
              <Input
                id="custoImplantacao"
                type="number"
                value={params.custoImplantacao}
                onChange={(e) => setParams(prev => ({ 
                  ...prev, 
                  custoImplantacao: Number(e.target.value) 
                }))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="custoMensal">Mensal</Label>
              <Input
                id="custoMensal"
                type="number"
                value={params.custoMensal}
                onChange={(e) => setParams(prev => ({ 
                  ...prev, 
                  custoMensal: Number(e.target.value) 
                }))}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Resultados */}
        <div>
          <h3 className="font-semibold mb-4">Resultados Calculados</h3>
          <div className="space-y-4">
            <div className="p-4 bg-danger/10 border border-danger/20 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Perda Esperada Sem Controles</div>
              <div className="text-xl font-bold text-danger">
                {formatCurrency(results.perdaSemControles)}
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-border">
                <span>Com Firewall:</span>
                <span className="font-medium">{formatCurrency(results.perdaComFirewall)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span>Com Endpoint:</span>
                <span className="font-medium">{formatCurrency(results.perdaComEndpoint)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span>Com Backup:</span>
                <span className="font-medium">{formatCurrency(results.perdaComBackup)}</span>
              </div>
            </div>

            <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Perda com Solução Completa</div>
              <div className="text-xl font-bold text-success">
                {formatCurrency(results.perdaCombinada)}
              </div>
            </div>

            <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">ROI em 12 meses</div>
              <div className="text-3xl font-bold text-primary">
                {results.roi.toFixed(1)}%
              </div>
            </div>

            <div className="text-sm space-y-1 pt-4 border-t border-border">
              <div className="flex justify-between">
                <span>Custo Total (12m):</span>
                <span className="font-medium">{formatCurrency(results.custoTotal)}</span>
              </div>
              <div className="flex justify-between text-success">
                <span>Economia Anual:</span>
                <span className="font-bold">{formatCurrency(results.perdaEvitada)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CyberCard>
  );
}