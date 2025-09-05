import { useProfile } from '@/contexts/ProfileContext';
import { Welcome } from '@/pages/Welcome';
import { EmpresaStep } from '@/pages/onboarding/EmpresaStep';
import { InfraestruturaStep } from '@/pages/onboarding/InfraestruturaStep';
import { ConectividadeStep } from '@/pages/onboarding/ConectividadeStep';
import { SegurancaStep } from '@/pages/onboarding/SegurancaStep';
import { BackupStep } from '@/pages/onboarding/BackupStep';
import { ObjetivosStep } from '@/pages/onboarding/ObjetivosStep';
import { Presentation } from '@/pages/Presentation';

export function AppRouter() {
  const { currentStep } = useProfile();

  switch (currentStep) {
    case 'welcome':
      return <Welcome />;
    case 'empresa':
      return <EmpresaStep />;
    case 'infraestrutura':
      return <InfraestruturaStep />;
    case 'conectividade':
      return <ConectividadeStep />;
    case 'seguranca':
      return <SegurancaStep />;
    case 'backup':
      return <BackupStep />;
    case 'objetivos':
      return <ObjetivosStep />;
    case 'presentation':
      return <Presentation />;
    default:
      return <EmpresaStep />;
  }
}