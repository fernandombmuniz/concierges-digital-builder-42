import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CyberCard } from '@/components/CyberCard';
import { AppLayout } from '@/components/AppLayout';
import { ProgressBar } from '@/components/ProgressBar';
import { useProfile } from '@/contexts/ProfileContext';

export function ConectividadeStep() {
  const { profile, updateProfile, setCurrentStep } = useProfile();
  const [formData, setFormData] = useState({
    wifiTipo: (profile.conectividade.wifiTipo || '') as 'segmentada' | 'unica' | '',
    apsQuantidade: profile.conectividade.apsQuantidade || 0,
    apMarca: profile.conectividade.apMarca,
    apModelo: profile.conectividade.apModelo,
    switchGerenciavel: profile.conectividade.switchGerenciavel,
    possuiSaasIaas: profile.conectividade.possuiSaasIaas,
    servicoSaasIaas: profile.conectividade.servicoSaasIaas,
    usaVPN: profile.conectividade.usaVPN,
    acessosVPNQuantidade: profile.conectividade.acessosVPNQuantidade || 0,
    usoVPN: profile.conectividade.usoVPN,
    observacoes: profile.observacoesPorEtapa.etapa3
  });

  const handleNext = () => {
    updateProfile({
      conectividade: {
        wifiTipo: formData.wifiTipo,
        apsQuantidade: formData.apsQuantidade,
        apMarca: formData.apMarca,
        apModelo: formData.apModelo,
        switchGerenciavel: formData.switchGerenciavel,
        possuiSaasIaas: formData.possuiSaasIaas,
        servicoSaasIaas: formData.servicoSaasIaas,
        usaVPN: formData.usaVPN,
        acessosVPNQuantidade: formData.acessosVPNQuantidade,
        usoVPN: formData.usoVPN
      },
      observacoesPorEtapa: {
        ...profile.observacoesPorEtapa,
        etapa3: formData.observacoes
      }
    });
    setCurrentStep('seguranca');
  };

  const isValid = true; // Nenhum campo obrigatório

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <ProgressBar currentStep={3} totalSteps={6} className="mb-8" />
        
        <CyberCard className="p-8">
          <h2 className="text-2xl font-semibold mb-6">Conectividade e Acesso</h2>
          
          <div className="space-y-6">
            {/* Estrutura de Wi-Fi vem primeiro */}
            <div className="space-y-4">
              <Label>Estrutura de Wi-Fi</Label>
              <RadioGroup
                value={formData.wifiTipo}
                onValueChange={(value: 'segmentada' | 'unica') => setFormData(prev => ({ ...prev, wifiTipo: value }))}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="segmentada" id="wifi-segmentada" />
                  <Label htmlFor="wifi-segmentada">Rede segmentada (diferentes VLANs)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="unica" id="wifi-unica" />
                  <Label htmlFor="wifi-unica">Rede única (todos na mesma rede)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="aps-quantidade">Quantidade de APs</Label>
                <Input
                  id="aps-quantidade"
                  type="number"
                  min="0"
                  value={formData.apsQuantidade}
                  onChange={(e) => setFormData(prev => ({ ...prev, apsQuantidade: parseInt(e.target.value) || 0 }))}
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ap-marca">Marca do AP</Label>
                <Input
                  id="ap-marca"
                  value={formData.apMarca}
                  onChange={(e) => setFormData(prev => ({ ...prev, apMarca: e.target.value }))}
                  placeholder="Ex: Ubiquiti, TP-Link"
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ap-modelo">Modelo do AP</Label>
                <Input
                  id="ap-modelo"
                  value={formData.apModelo}
                  onChange={(e) => setFormData(prev => ({ ...prev, apModelo: e.target.value }))}
                  placeholder="Ex: UAP-AC-LR"
                  className="bg-input border-border"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="switch-gerenciavel"
                checked={formData.switchGerenciavel}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, switchGerenciavel: !!checked }))}
              />
              <Label htmlFor="switch-gerenciavel">Possui switch gerenciável</Label>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="possui-saas-iaas"
                  checked={formData.possuiSaasIaas}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, possuiSaasIaas: !!checked }))}
                />
                <Label htmlFor="possui-saas-iaas">Possui SaaS ou IaaS</Label>
              </div>
              
              {formData.possuiSaasIaas && (
                <div className="space-y-2 ml-6">
                  <Label htmlFor="servico-saas-iaas">Qual serviço e para que é usado?</Label>
                  <Textarea
                    id="servico-saas-iaas"
                    value={formData.servicoSaasIaas}
                    onChange={(e) => setFormData(prev => ({ ...prev, servicoSaasIaas: e.target.value }))}
                    placeholder="Ex: AWS para hospedagem, Office 365 para e-mail"
                    className="bg-input border-border min-h-16"
                  />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="usa-vpn"
                  checked={formData.usaVPN}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, usaVPN: !!checked }))}
                />
                <Label htmlFor="usa-vpn">Utiliza VPN</Label>
              </div>
              
              {formData.usaVPN && (
                <div className="space-y-4 ml-6">
                  <div className="space-y-2">
                    <Label htmlFor="acessos-vpn">Quantidade de acessos simultâneos via VPN</Label>
                    <Input
                      id="acessos-vpn"
                      type="number"
                      min="0"
                      value={formData.acessosVPNQuantidade}
                      onChange={(e) => setFormData(prev => ({ ...prev, acessosVPNQuantidade: parseInt(e.target.value) || 0 }))}
                      className="bg-input border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="uso-vpn">Como é utilizada a VPN?</Label>
                    <Textarea
                      id="uso-vpn"
                      value={formData.usoVPN}
                      onChange={(e) => setFormData(prev => ({ ...prev, usoVPN: e.target.value }))}
                      placeholder="Ex: Acesso remoto, home office, conectar filiais, etc."
                      className="bg-input border-border min-h-20"
                    />
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
                placeholder="Informações adicionais sobre conectividade..."
                className="bg-input border-border min-h-20"
              />
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentStep('infraestrutura')}
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