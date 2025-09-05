import { createContext, useContext, useState, ReactNode } from 'react';
import { Profile, OnboardingStep } from '@/types/profile';

interface ProfileContextType {
  profile: Profile;
  updateProfile: (updates: Partial<Profile>) => void;
  currentStep: OnboardingStep;
  setCurrentStep: (step: OnboardingStep) => void;
  resetProfile: () => void;
}

const initialProfile: Profile = {
  empresa: {
    nome: '',
    setor: '',
    logoClienteUrl: ''
  },
  infraestrutura: {
    usuariosAtuais: 0,
    usuariosPretensao: false,
    usuariosEstimativa: 0,
    dispositivosAtuais: 0,
    dispositivosPretensao: false,
    dispositivosEstimativa: 0,
    links: [],
    timeTI: 0,
    contatoNome: '',
    contatoCargo: ''
  },
  conectividade: {
    wifiTipo: '',
    apsQuantidade: 0,
    apMarca: '',
    apModelo: '',
    switchGerenciavel: false,
    possuiSaasIaas: false,
    servicoSaasIaas: '',
    usaVPN: false,
    acessosVPNQuantidade: 0,
    usoVPN: ''
  },
  seguranca: {
    possuiFirewall: false,
    firewallTipo: '',
    firewallModelo: '',
    firewallLocadoOuComprado: '',
    firewallLicencaAtiva: false,
    possuiAntivirusEndpoint: false,
    antivirusTipo: '',
    antivirusCategoria: '',
    antivirusGerenciado: false
  },
  backup: {
    possuiBackup: false,
    tipoBackup: '',
    backupGerenciavel: false,
    fazTesteRestore: false
  },
  objetivos: {
    lgpd: false,
    vpnSegura: false,
    backupImutavel: false,
    gestaoIncidentes: false,
    reduzirRiscos: false,
    protecaoEndpoints: false,
    monitoramento247: false,
    auditoriaCompliance: false
  },
  observacoesPorEtapa: {
    etapa1: '',
    etapa2: '',
    etapa3: '',
    etapa4: '',
    etapa5: '',
    etapa6: ''
  }
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('empresa');

  const updateProfile = (updates: Partial<Profile>) => {
    setProfile(prev => ({
      ...prev,
      ...updates
    }));
  };

  const resetProfile = () => {
    setProfile(initialProfile);
    setCurrentStep('empresa');
  };

  return (
    <ProfileContext.Provider value={{
      profile,
      updateProfile,
      currentStep,
      setCurrentStep,
      resetProfile
    }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}