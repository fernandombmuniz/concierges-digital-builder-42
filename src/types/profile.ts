export interface LinkInfo {
  provedor: string;
  velocidade: string;
  aumentoPretendido: boolean;
  novaVelocidade?: string;
}

export interface EmpresaInfo {
  nome: string;
  setor: string;
  logoClienteUrl?: string;
}

export interface InfraestruturaInfo {
  usuariosAtuais: number;
  usuariosPretensao: boolean;
  usuariosEstimativa?: number;
  dispositivosAtuais: number;
  dispositivosPretensao: boolean;
  dispositivosEstimativa?: number;
  links: LinkInfo[];
  timeTI: number;
  contatoNome: string;
  contatoCargo: string;
  perfilUso: 'baixo' | 'medio' | 'alto' | '';
}

export interface ConectividadeInfo {
  wifiTipo: 'segmentada' | 'unica' | '';
  apsQuantidade: number;
  apMarca: string;
  apModelo: string;
  switchGerenciavel: boolean;
  possuiSaasIaas: boolean;
  servicoSaasIaas: string;
  usaVPN: boolean;
  acessosVPNQuantidade: number;
  usoVPN: string;
}

export interface SegurancaInfo {
  possuiFirewall: boolean;
  firewallTipo: string;
  firewallModelo: string;
  firewallLocadoOuComprado: string;
  firewallLicencaAtiva: boolean;
  possuiAntivirusEndpoint: boolean;
  antivirusTipo: string;
  antivirusCategoria: string;
  antivirusGerenciado: boolean;
}

export interface BackupInfo {
  possuiBackup: boolean;
  tipoBackup: string;
  backupGerenciavel: boolean;
  fazTesteRestore: boolean;
}

export interface ObjetivosInfo {
  lgpd: boolean;
  vpnSegura: boolean;
  backupImutavel: boolean;
  gestaoIncidentes: boolean;
  reduzirRiscos: boolean;
  protecaoEndpoints: boolean;
  monitoramento247: boolean;
  auditoriaCompliance: boolean;
}

export interface ObservacoesPorEtapa {
  etapa1: string;
  etapa2: string;
  etapa3: string;
  etapa4: string;
  etapa5: string;
  etapa6: string;
}

export interface FirewallSuggestions {
  sonicwall: string;
  fortinet: string;
}

export interface Profile {
  empresa: EmpresaInfo;
  infraestrutura: InfraestruturaInfo;
  conectividade: ConectividadeInfo;
  seguranca: SegurancaInfo;
  backup: BackupInfo;
  objetivos: ObjetivosInfo;
  observacoesPorEtapa: ObservacoesPorEtapa;
  equipamentoSugerido?: FirewallSuggestions;
}

export interface RiskItem {
  titulo: string;
  probabilidade: number;
  explicacao: string;
  fatorCausador: string;
  mitigacaoSugerida: string;
  categoria: 'alto' | 'moderado' | 'baixo';
}

export interface ROICalculation {
  perdaEsperadaSemControles: number;
  perdaComFirewall: number;
  perdaComEndpoint: number;
  perdaComBackup: number;
  perdaCombinada: number;
  custoImplantacao: number;
  custoMensal: number;
  roi: number;
}

export type OnboardingStep = 'welcome' | 'empresa' | 'infraestrutura' | 'conectividade' | 'seguranca' | 'backup' | 'objetivos' | 'presentation';