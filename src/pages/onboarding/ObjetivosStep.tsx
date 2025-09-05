import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { CyberCard } from '@/components/CyberCard';
import { AppLayout } from '@/components/AppLayout';
import { ProgressBar } from '@/components/ProgressBar';
import { useProfile } from '@/contexts/ProfileContext';

export function ObjetivosStep() {
  const { profile, updateProfile, setCurrentStep } = useProfile();
  const [formData, setFormData] = useState({
    lgpd: profile.objetivos.lgpd,
    vpnSegura: profile.objetivos.vpnSegura,
    backupImutavel: profile.objetivos.backupImutavel,
    gestaoIncidentes: profile.objetivos.gestaoIncidentes,
    reduzirRiscos: profile.objetivos.reduzirRiscos,
    protecaoEndpoints: profile.objetivos.protecaoEndpoints,
    monitoramento247: profile.objetivos.monitoramento247,
    auditoriaCompliance: profile.objetivos.auditoriaCompliance,
    observacoes: profile.observacoesPorEtapa.etapa6
  });

  const handleGeneratePresentation = () => {
    updateProfile({
      objetivos: {
        lgpd: formData.lgpd,
        vpnSegura: formData.vpnSegura,
        backupImutavel: formData.backupImutavel,
        gestaoIncidentes: formData.gestaoIncidentes,
        reduzirRiscos: formData.reduzirRiscos,
        protecaoEndpoints: formData.protecaoEndpoints,
        monitoramento247: formData.monitoramento247,
        auditoriaCompliance: formData.auditoriaCompliance
      },
      observacoesPorEtapa: {
        ...profile.observacoesPorEtapa,
        etapa6: formData.observacoes
      }
    });
    setCurrentStep('presentation');
  };

  const objetivos = [
    { key: 'lgpd', label: 'Conformidade LGPD', description: 'Adequação às normas de proteção de dados' },
    { key: 'vpnSegura', label: 'Conectividade segura com VPN', description: 'Acesso remoto protegido e confiável' },
    { key: 'backupImutavel', label: 'Backup seguro e imutável', description: 'Proteção contra ransomware e perda de dados' },
    { key: 'gestaoIncidentes', label: 'Gestão de Incidentes', description: 'Resposta rápida e eficaz a ameaças' },
    { key: 'reduzirRiscos', label: 'Reduzir riscos de segurança', description: 'Minimizar vulnerabilidades e exposições' },
    { key: 'protecaoEndpoints', label: 'Proteção com Endpoints', description: 'Segurança avançada em dispositivos' },
    { key: 'monitoramento247', label: 'Monitoramento 24/7', description: 'Vigilância constante da infraestrutura' },
    { key: 'auditoriaCompliance', label: 'Auditoria e Compliance', description: 'Conformidade com regulamentações do setor' }
  ];

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <ProgressBar currentStep={6} totalSteps={6} className="mb-8" />
        
        <CyberCard className="p-8">
          <h2 className="text-2xl font-semibold mb-6">Objetivos Principais</h2>
          <p className="text-muted-foreground mb-6">
            Selecione os objetivos mais importantes para sua empresa em relação à segurança digital:
          </p>
          
          <div className="space-y-6">
            <div className="space-y-4">
              {objetivos.map((objetivo) => (
                <div key={objetivo.key} className="flex items-start space-x-3 p-4 border border-border rounded-lg hover:bg-secondary/50 transition-cyber">
                  <Checkbox
                    id={objetivo.key}
                    checked={formData[objetivo.key as keyof typeof formData] as boolean}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, [objetivo.key]: !!checked }))}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label htmlFor={objetivo.key} className="text-sm font-medium cursor-pointer">
                      {objetivo.label}
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      {objetivo.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="observacoes">Observações Finais</Label>
              <Textarea
                id="observacoes"
                value={formData.observacoes}
                onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
                placeholder="Informações adicionais, requisitos específicos ou prioridades especiais..."
                className="bg-input border-border min-h-24"
              />
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentStep('backup')}
            >
              Voltar
            </Button>
            <Button
              onClick={handleGeneratePresentation}
              className="gradient-cyber text-white font-semibold px-8"
            >
              Gerar Apresentação
            </Button>
          </div>
        </CyberCard>
      </div>
    </AppLayout>
  );
}