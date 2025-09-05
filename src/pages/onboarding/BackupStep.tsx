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

export function BackupStep() {
  const { profile, updateProfile, setCurrentStep } = useProfile();
  const [formData, setFormData] = useState({
    possuiBackup: profile.backup.possuiBackup,
    tipoBackup: profile.backup.tipoBackup,
    backupGerenciavel: profile.backup.backupGerenciavel,
    fazTesteRestore: profile.backup.fazTesteRestore,
    observacoes: profile.observacoesPorEtapa.etapa5
  });

  const handleNext = () => {
    updateProfile({
      backup: {
        possuiBackup: formData.possuiBackup,
        tipoBackup: formData.tipoBackup,
        backupGerenciavel: formData.backupGerenciavel,
        fazTesteRestore: formData.fazTesteRestore
      },
      observacoesPorEtapa: {
        ...profile.observacoesPorEtapa,
        etapa5: formData.observacoes
      }
    });
    setCurrentStep('objetivos');
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <ProgressBar currentStep={5} totalSteps={6} className="mb-8" />
        
        <CyberCard className="p-8">
          <h2 className="text-2xl font-semibold mb-6">Backup e Continuidade</h2>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="possui-backup"
                checked={formData.possuiBackup}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, possuiBackup: !!checked }))}
              />
              <Label htmlFor="possui-backup">Possui estrutura de backup</Label>
            </div>

            {formData.possuiBackup && (
              <div className="space-y-4 ml-6">
                <div className="space-y-2">
                  <Label htmlFor="tipo-backup">Tipo de backup realizado</Label>
                  <Input
                    id="tipo-backup"
                    value={formData.tipoBackup}
                    onChange={(e) => setFormData(prev => ({ ...prev, tipoBackup: e.target.value }))}
                    placeholder="Ex: Backup local em HD externo, Backup em nuvem, Backup híbrido"
                    className="bg-input border-border"
                  />
                  <p className="text-xs text-muted-foreground">
                    Descreva como e onde são feitos os backups
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="backup-gerenciavel"
                    checked={formData.backupGerenciavel}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, backupGerenciavel: !!checked }))}
                  />
                  <Label htmlFor="backup-gerenciavel">Backup é gerenciável/automatizado</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="teste-restore"
                    checked={formData.fazTesteRestore}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, fazTesteRestore: !!checked }))}
                  />
                  <Label htmlFor="teste-restore">Realiza testes de restore regulares</Label>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                value={formData.observacoes}
                onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
                placeholder="Informações adicionais sobre backup e continuidade..."
                className="bg-input border-border min-h-20"
              />
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentStep('seguranca')}
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