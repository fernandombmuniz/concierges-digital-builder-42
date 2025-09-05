import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CyberCard } from '@/components/CyberCard';
import { AppLayout } from '@/components/AppLayout';
import { ProgressBar } from '@/components/ProgressBar';
import { useProfile } from '@/contexts/ProfileContext';
import { Upload, X } from 'lucide-react';

export function EmpresaStep() {
  const { profile, updateProfile, setCurrentStep } = useProfile();
  const [formData, setFormData] = useState({
    nome: profile.empresa.nome,
    setor: profile.empresa.setor,
    logoClienteUrl: profile.empresa.logoClienteUrl || '',
    observacoes: profile.observacoesPorEtapa.etapa1
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>(profile.empresa.logoClienteUrl || '');

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setLogoPreview(result);
        setFormData(prev => ({ ...prev, logoClienteUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogoFile(null);
    setLogoPreview('');
    setFormData(prev => ({ ...prev, logoClienteUrl: '' }));
  };

  const handleNext = () => {
    updateProfile({
      empresa: {
        nome: formData.nome,
        setor: formData.setor,
        logoClienteUrl: formData.logoClienteUrl
      },
      observacoesPorEtapa: {
        ...profile.observacoesPorEtapa,
        etapa1: formData.observacoes
      }
    });
    setCurrentStep('infraestrutura');
  };

  const isValid = true; // Nenhum campo obrigatório

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <ProgressBar currentStep={1} totalSteps={6} className="mb-8" />
        
        <CyberCard className="p-8">
          <h2 className="text-2xl font-semibold mb-6">Informações da Empresa</h2>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome da Empresa</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                placeholder="Ex: TechCorp Soluções"
                className="bg-input border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="setor">Setor de Atuação</Label>
              <Input
                id="setor"
                value={formData.setor}
                onChange={(e) => setFormData(prev => ({ ...prev, setor: e.target.value }))}
                placeholder="Ex: Tecnologia, Saúde, Educação, Varejo"
                className="bg-input border-border"
              />
            </div>

            <div className="space-y-2">
              <Label>Logo da Empresa</Label>
              {logoPreview ? (
                <div className="flex items-center gap-4 p-4 border border-border rounded-lg bg-secondary/20">
                  <img 
                    src={logoPreview} 
                    alt="Logo preview" 
                    className="h-16 w-16 object-contain bg-white rounded"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">Logo carregada com sucesso</p>
                    <p className="text-xs text-muted-foreground">
                      {logoFile?.name || 'Logo atual'}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={removeLogo}
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Clique para fazer upload da logo
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                    id="logo-upload"
                  />
                  <Label
                    htmlFor="logo-upload"
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/80 cursor-pointer"
                  >
                    Selecionar Arquivo
                  </Label>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                value={formData.observacoes}
                onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
                placeholder="Informações adicionais sobre a empresa..."
                className="bg-input border-border min-h-20"
              />
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentStep('welcome')}
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