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
import { LinkInfo } from '@/types/profile';
import { Plus, X } from 'lucide-react';

export function InfraestruturaStep() {
  const { profile, updateProfile, setCurrentStep } = useProfile();
  const [formData, setFormData] = useState({
    usuariosAtuais: profile.infraestrutura.usuariosAtuais || 0,
    usuariosPretensao: profile.infraestrutura.usuariosPretensao,
    usuariosEstimativa: profile.infraestrutura.usuariosEstimativa || 0,
    dispositivosAtuais: profile.infraestrutura.dispositivosAtuais || 0,
    dispositivosPretensao: profile.infraestrutura.dispositivosPretensao,
    dispositivosEstimativa: profile.infraestrutura.dispositivosEstimativa || 0,
    links: profile.infraestrutura.links.length > 0 ? profile.infraestrutura.links : [{ provedor: '', velocidade: '', aumentoPretendido: false, novaVelocidade: '' }],
    timeTI: profile.infraestrutura.timeTI || 0,
    contatoNome: profile.infraestrutura.contatoNome,
    contatoCargo: profile.infraestrutura.contatoCargo,
    observacoes: profile.observacoesPorEtapa.etapa2
  });

  const addLink = () => {
    setFormData(prev => ({
      ...prev,
      links: [...prev.links, { provedor: '', velocidade: '', aumentoPretendido: false, novaVelocidade: '' }]
    }));
  };

  const removeLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index)
    }));
  };

  const updateLink = (index: number, field: keyof LinkInfo, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      links: prev.links.map((link, i) => 
        i === index ? { ...link, [field]: value } : link
      )
    }));
  };

  const handleNext = () => {
    updateProfile({
      infraestrutura: {
        usuariosAtuais: formData.usuariosAtuais,
        usuariosPretensao: formData.usuariosPretensao,
        usuariosEstimativa: formData.usuariosEstimativa,
        dispositivosAtuais: formData.dispositivosAtuais,
        dispositivosPretensao: formData.dispositivosPretensao,
        dispositivosEstimativa: formData.dispositivosEstimativa,
        links: formData.links.filter(link => link.provedor.trim() && link.velocidade.trim()),
        timeTI: formData.timeTI,
        contatoNome: formData.contatoNome,
        contatoCargo: formData.contatoCargo
      },
      observacoesPorEtapa: {
        ...profile.observacoesPorEtapa,
        etapa2: formData.observacoes
      }
    });
    setCurrentStep('conectividade');
  };

  const isValid = true; // Nenhum campo obrigatório

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <ProgressBar currentStep={2} totalSteps={6} className="mb-8" />
        
        <CyberCard className="p-8">
          <h2 className="text-2xl font-semibold mb-6">Infraestrutura Atual</h2>
          
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="usuarios">Número de Usuários</Label>
                <Input
                  id="usuarios"
                  type="number"
                  min="0"
                  value={formData.usuariosAtuais}
                  onChange={(e) => setFormData(prev => ({ ...prev, usuariosAtuais: parseInt(e.target.value) || 0 }))}
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="usuarios-pretensao"
                    checked={formData.usuariosPretensao}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, usuariosPretensao: !!checked }))}
                  />
                  <Label htmlFor="usuarios-pretensao" className="text-sm">
                    Pretende aumentar usuários
                  </Label>
                </div>
                {formData.usuariosPretensao && (
                  <div className="space-y-2">
                    <Label htmlFor="usuarios-estimativa">Estimativa de usuários</Label>
                    <Input
                      id="usuarios-estimativa"
                      type="number"
                      min="0"
                      value={formData.usuariosEstimativa}
                      onChange={(e) => setFormData(prev => ({ ...prev, usuariosEstimativa: parseInt(e.target.value) || 0 }))}
                      className="bg-input border-border"
                      placeholder="Quantidade estimada"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dispositivos">Número de Dispositivos</Label>
                <Input
                  id="dispositivos"
                  type="number"
                  min="0"
                  value={formData.dispositivosAtuais}
                  onChange={(e) => setFormData(prev => ({ ...prev, dispositivosAtuais: parseInt(e.target.value) || 0 }))}
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dispositivos-pretensao"
                    checked={formData.dispositivosPretensao}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, dispositivosPretensao: !!checked }))}
                  />
                  <Label htmlFor="dispositivos-pretensao" className="text-sm">
                    Pretende aumentar dispositivos
                  </Label>
                </div>
                {formData.dispositivosPretensao && (
                  <div className="space-y-2">
                    <Label htmlFor="dispositivos-estimativa">Estimativa de dispositivos</Label>
                    <Input
                      id="dispositivos-estimativa"
                      type="number"
                      min="0"
                      value={formData.dispositivosEstimativa}
                      onChange={(e) => setFormData(prev => ({ ...prev, dispositivosEstimativa: parseInt(e.target.value) || 0 }))}
                      className="bg-input border-border"
                      placeholder="Quantidade estimada"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Links de Internet</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addLink}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Adicionar Link
                </Button>
              </div>
              
              {formData.links.map((link, index) => (
                <div key={index} className="p-4 border border-border rounded-lg bg-secondary/20">
                  <div className="grid md:grid-cols-2 gap-4 mb-3">
                    <div className="space-y-2">
                      <Label>Provedor</Label>
                      <Input
                        value={link.provedor}
                        onChange={(e) => updateLink(index, 'provedor', e.target.value)}
                        placeholder="Ex: Vivo, Claro, NET"
                        className="bg-input border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Velocidade</Label>
                      <Input
                        value={link.velocidade}
                        onChange={(e) => updateLink(index, 'velocidade', e.target.value)}
                        placeholder="Ex: 100Mbps, 1Gbps"
                        className="bg-input border-border"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={link.aumentoPretendido}
                        onCheckedChange={(checked) => updateLink(index, 'aumentoPretendido', !!checked)}
                      />
                      <Label className="text-sm">Pretende aumentar velocidade</Label>
                    </div>
                    
                    {link.aumentoPretendido && (
                      <div className="space-y-2 ml-6">
                        <Label>Nova velocidade pretendida</Label>
                        <Input
                          value={link.novaVelocidade || ''}
                          onChange={(e) => updateLink(index, 'novaVelocidade', e.target.value)}
                          placeholder="Ex: 1Gbps, 500Mbps"
                          className="bg-input border-border"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-end mt-3">
                    {formData.links.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeLink(index)}
                        className="text-destructive hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="time-ti">Pessoas no Time de TI</Label>
              <Input
                id="time-ti"
                type="number"
                min="0"
                value={formData.timeTI}
                onChange={(e) => setFormData(prev => ({ ...prev, timeTI: parseInt(e.target.value) || 0 }))}
                className="bg-input border-border"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contato-nome">Nome do Contato Principal</Label>
                <Input
                  id="contato-nome"
                  value={formData.contatoNome}
                  onChange={(e) => setFormData(prev => ({ ...prev, contatoNome: e.target.value }))}
                  placeholder="Nome completo"
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contato-cargo">Cargo do Contato</Label>
                <Input
                  id="contato-cargo"
                  value={formData.contatoCargo}
                  onChange={(e) => setFormData(prev => ({ ...prev, contatoCargo: e.target.value }))}
                  placeholder="Ex: CTO, Gerente de TI"
                  className="bg-input border-border"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                value={formData.observacoes}
                onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
                placeholder="Informações adicionais sobre a infraestrutura..."
                className="bg-input border-border min-h-20"
              />
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentStep('empresa')}
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