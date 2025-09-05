import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { CyberCard } from '@/components/CyberCard';
import { AppLayout } from '@/components/AppLayout';
import { ProgressBar } from '@/components/ProgressBar';
import { useProfile } from '@/contexts/ProfileContext';

export function SegurancaStep() {
  const { profile, updateProfile, setCurrentStep } = useProfile();
  const [formData, setFormData] = useState({
    possuiFirewall: profile.seguranca.possuiFirewall,
    firewallTipo: profile.seguranca.firewallTipo,
    firewallModelo: profile.seguranca.firewallModelo,
    firewallLocadoOuComprado: profile.seguranca.firewallLocadoOuComprado,
    firewallLicencaAtiva: profile.seguranca.firewallLicencaAtiva,
    possuiAntivirusEndpoint: profile.seguranca.possuiAntivirusEndpoint,
    antivirusTipo: profile.seguranca.antivirusTipo,
    antivirusCategoria: profile.seguranca.antivirusCategoria,
    antivirusGerenciado: profile.seguranca.antivirusGerenciado,
    observacoes: profile.observacoesPorEtapa.etapa4
  });

  const handleNext = () => {
    updateProfile({
      seguranca: {
        possuiFirewall: formData.possuiFirewall,
        firewallTipo: formData.firewallTipo,
        firewallModelo: formData.firewallModelo,
        firewallLocadoOuComprado: formData.firewallLocadoOuComprado,
        firewallLicencaAtiva: formData.firewallLicencaAtiva,
        possuiAntivirusEndpoint: formData.possuiAntivirusEndpoint,
        antivirusTipo: formData.antivirusTipo,
        antivirusCategoria: formData.antivirusCategoria,
        antivirusGerenciado: formData.antivirusGerenciado
      },
      observacoesPorEtapa: {
        ...profile.observacoesPorEtapa,
        etapa4: formData.observacoes
      }
    });
    setCurrentStep('backup');
  };

  const isValid = true; // Nenhum campo obrigatório

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <ProgressBar currentStep={4} totalSteps={6} className="mb-8" />
        
        <CyberCard className="p-8">
          <h2 className="text-2xl font-semibold mb-6">Segurança Atual</h2>
          
          <div className="space-y-6">
            {/* Firewall */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="possui-firewall"
                  checked={formData.possuiFirewall}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, possuiFirewall: !!checked }))}
                />
                <Label htmlFor="possui-firewall">Possui Firewall?</Label>
              </div>

              {formData.possuiFirewall && (
                <div className="space-y-4 ml-6">
                  <div className="space-y-2">
                    <Label htmlFor="firewall-tipo">Tipo</Label>
                    <Input
                      id="firewall-tipo"
                      value={formData.firewallTipo}
                      onChange={(e) => setFormData(prev => ({ ...prev, firewallTipo: e.target.value }))}
                      placeholder="Ex: UTM, NGFW, Tradicional"
                      className="bg-input border-border"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="firewall-modelo">Modelo</Label>
                    <Input
                      id="firewall-modelo"
                      value={formData.firewallModelo}
                      onChange={(e) => setFormData(prev => ({ ...prev, firewallModelo: e.target.value }))}
                      placeholder="Ex: SonicWall TZ300, Fortinet 40F"
                      className="bg-input border-border"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="firewall-locado-comprado">É locado ou comprado?</Label>
                    <Input
                      id="firewall-locado-comprado"
                      value={formData.firewallLocadoOuComprado}
                      onChange={(e) => setFormData(prev => ({ ...prev, firewallLocadoOuComprado: e.target.value }))}
                      placeholder="Ex: Locado, Comprado, Próprio"
                      className="bg-input border-border"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="firewall-licenca-ativa"
                      checked={formData.firewallLicencaAtiva}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, firewallLicencaAtiva: !!checked }))}
                    />
                    <Label htmlFor="firewall-licenca-ativa">Possui licença ativa</Label>
                  </div>
                </div>
              )}
            </div>

            {/* Antivírus/Endpoint */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="possui-antivirus-endpoint"
                  checked={formData.possuiAntivirusEndpoint}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, possuiAntivirusEndpoint: !!checked }))}
                />
                <Label htmlFor="possui-antivirus-endpoint">Possui Antivírus/Endpoint?</Label>
              </div>

              {formData.possuiAntivirusEndpoint && (
                <div className="space-y-4 ml-6">
                  <div className="space-y-2">
                    <Label htmlFor="antivirus-tipo">Tipo</Label>
                    <Input
                      id="antivirus-tipo"
                      value={formData.antivirusTipo}
                      onChange={(e) => setFormData(prev => ({ ...prev, antivirusTipo: e.target.value }))}
                      placeholder="Ex: Kaspersky, Bitdefender, Windows Defender"
                      className="bg-input border-border"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="antivirus-categoria">Categoria</Label>
                    <Input
                      id="antivirus-categoria"
                      value={formData.antivirusCategoria}
                      onChange={(e) => setFormData(prev => ({ ...prev, antivirusCategoria: e.target.value }))}
                      placeholder="Ex: Endpoint, EDR, XDR, Assinatura"
                      className="bg-input border-border"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="antivirus-gerenciado"
                      checked={formData.antivirusGerenciado}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, antivirusGerenciado: !!checked }))}
                    />
                    <Label htmlFor="antivirus-gerenciado">Possui gerenciamento</Label>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                value={formData.observacoes}
                onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
                placeholder="Informações adicionais sobre segurança atual..."
                className="bg-input border-border min-h-20"
              />
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentStep('conectividade')}
            >
              Voltar
            </Button>
            <Button
              onClick={handleNext}
              className="gradient-cyber text-white"
            >
              Próximo
            </Button>
          </div>
        </CyberCard>
      </div>
    </AppLayout>
  );
}