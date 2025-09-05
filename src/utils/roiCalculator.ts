import { Profile, ROICalculation } from '@/types/profile';
import { roiConfig } from '@/config/roiConfig';

export function calculateROI(profile: Profile): ROICalculation {
  const { custos, probabilidades, eficacia, proposta } = roiConfig;

  // Cálculo da perda esperada sem controles
  const perdaRansomware = probabilidades.p_ransomware_base * custos.custo_medio_incidente_ransomware;
  const perdaBreach = probabilidades.p_breach_base * custos.custo_medio_breach_dados;
  const perdaIndisponibilidade = probabilidades.p_indisponibilidade_base * 
    (custos.custo_hora_indisponibilidade * custos.horas_medias_parada_por_incidente);

  const perdaEsperadaSemControles = perdaRansomware + perdaBreach + perdaIndisponibilidade;

  // Cálculo com controles individuais
  const perdaComFirewall = perdaEsperadaSemControles * (1 - eficacia.firewall_reducao_prob);
  const perdaComEndpoint = perdaEsperadaSemControles * (1 - eficacia.endpoint_reducao_prob);
  
  // Para backup, reduzimos o impacto financeiro
  const perdaComBackup = perdaEsperadaSemControles * (1 - eficacia.backup_reducao_impacto);

  // Cálculo combinado - aplicamos reduções de forma multiplicativa
  const reducaoFirewall = eficacia.firewall_reducao_prob;
  const reducaoEndpoint = eficacia.endpoint_reducao_prob;
  const reducaoBackupImpacto = eficacia.backup_reducao_impacto;

  // Redução de probabilidade combinada para firewall + endpoint
  const reducaoProbabilidadeCombinada = 1 - ((1 - reducaoFirewall) * (1 - reducaoEndpoint));
  
  // Aplicamos primeiro a redução de probabilidade, depois a redução de impacto do backup
  const perdaAposFirewallEndpoint = perdaEsperadaSemControles * (1 - reducaoProbabilidadeCombinada);
  const perdaCombinada = perdaAposFirewallEndpoint * (1 - reducaoBackupImpacto);

  // Custo total anual da solução
  const custoTotal = proposta.custoImplantacao + (proposta.custoMensal * 12);

  // ROI = (Perda evitada - Custo total) / Custo total
  const perdaEvitada = perdaEsperadaSemControles - perdaCombinada;
  const roi = ((perdaEvitada - custoTotal) / custoTotal) * 100;

  return {
    perdaEsperadaSemControles,
    perdaComFirewall,
    perdaComEndpoint,
    perdaComBackup,
    perdaCombinada,
    custoImplantacao: proposta.custoImplantacao,
    custoMensal: proposta.custoMensal,
    roi
  };
}