export const roiConfig = {
  custos: {
    custo_medio_incidente_ransomware: 50000,
    custo_medio_breach_dados: 75000,
    custo_hora_indisponibilidade: 2500,
    horas_medias_parada_por_incidente: 24
  },
  probabilidades: {
    p_ransomware_base: 0.35, // 35% ao ano para PMEs
    p_breach_base: 0.25, // 25% ao ano
    p_indisponibilidade_base: 0.45 // 45% ao ano
  },
  eficacia: {
    firewall_reducao_prob: 0.70, // 70% de redução
    endpoint_reducao_prob: 0.80, // 80% de redução
    backup_reducao_impacto: 0.85 // 85% de redução do impacto
  },
  proposta: {
    custoImplantacao: 15000,
    custoMensal: 2500
  }
};