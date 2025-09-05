export const riskConfig = {
  firewall: {
    semFirewall: {
      probabilidade: 85,
      titulo: "Alto risco de intrusão externa",
      explicacao: "Sem proteção de perímetro, a rede está completamente exposta a ataques externos",
      mitigacaoSugerida: "Firewall Concierge com IPS integrado"
    },
    firewallSoho: {
      probabilidade: 60,
      titulo: "Risco moderado de bypass de segurança",
      explicacao: "Firewalls domésticos não possuem recursos empresariais de detecção",
      mitigacaoSugerida: "Upgrade para Firewall empresarial gerenciado"
    }
  },
  vpn: {
    vpnSemMfa: {
      probabilidade: 70,
      titulo: "Alto risco de credenciais comprometidas",
      explicacao: "Acesso VPN sem autenticação multifator facilita invasão por credenciais vazadas",
      mitigacaoSugerida: "VPN segura com MFA obrigatório"
    },
    muitosAcessosVpn: {
      probabilidade: 55,
      titulo: "Risco de acesso não autorizado",  
      explicacao: "Muitos acessos VPN aumentam a superfície de ataque",
      mitigacaoSugerida: "Controle rigoroso de acessos e monitoramento"
    }
  },
  wifi: {
    redeUnica: {
      probabilidade: 50,
      titulo: "Risco de movimento lateral",
      explicacao: "Rede WiFi única permite que invasores se movam livremente entre dispositivos",
      mitigacaoSugerida: "Segmentação de rede e isolamento de dispositivos"
    }
  },
  endpoint: {
    antivirusBasico: {
      probabilidade: 75,
      titulo: "Alto risco de detecção tardia de ransomware",
      explicacao: "Antivírus por assinatura não detecta ameaças avançadas em tempo real",
      mitigacaoSugerida: "Solução EDR/XDR com resposta automatizada"
    },
    semGerenciamento: {
      probabilidade: 65,
      titulo: "Risco de proteção inconsistente",
      explicacao: "Sem gerenciamento centralizado, endpoints podem ficar desprotegidos",
      mitigacaoSugerida: "Console de gerenciamento unificado"
    }
  },
  backup: {
    semBackup: {
      probabilidade: 90,
      titulo: "Risco crítico de perda total de dados",
      explicacao: "Sem backup, qualquer incidente pode resultar em perda permanente",
      mitigacaoSugerida: "Sistema de backup imutável automatizado"
    },
    backupSemTeste: {
      probabilidade: 70,
      titulo: "Risco de backup inútil em emergência",
      explicacao: "Backups não testados podem falhar no momento crítico",
      mitigacaoSugerida: "Testes regulares de restore com validação"
    },
    backupMutavel: {
      probabilidade: 60,
      titulo: "Risco de backup comprometido por ransomware",
      explicacao: "Backups acessíveis podem ser criptografados junto com os dados originais",
      mitigacaoSugerida: "Backup imutável em nuvem segura"
    }
  }
};