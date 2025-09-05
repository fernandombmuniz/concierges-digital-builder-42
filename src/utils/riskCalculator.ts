import { Profile, RiskItem } from '@/types/profile';
import { riskConfig } from '@/config/riskConfig';

export function computeRisks(profile: Profile): RiskItem[] {
  const risks: RiskItem[] = [];

  // Análise de Firewall
  const firewallTipo = profile.seguranca.firewallTipo.toLowerCase();
  if (firewallTipo.includes('não possui') || firewallTipo === '') {
    risks.push({
      ...riskConfig.firewall.semFirewall,
      fatorCausador: "Ausência de firewall detectada",
      categoria: 'alto'
    });
  } else if (firewallTipo.includes('soho') || firewallTipo.includes('doméstico') || firewallTipo.includes('tp-link') || firewallTipo.includes('d-link')) {
    risks.push({
      ...riskConfig.firewall.firewallSoho,
      fatorCausador: `Firewall doméstico: ${profile.seguranca.firewallTipo}`,
      categoria: 'moderado'
    });
  }

  // Análise de VPN
  if (profile.conectividade.usaVPN) {
    if (profile.conectividade.acessosVPNQuantidade > 10) {
      risks.push({
        ...riskConfig.vpn.muitosAcessosVpn,
        fatorCausador: `${profile.conectividade.acessosVPNQuantidade} acessos VPN simultâneos`,
        categoria: 'moderado'
      });
    }
    
    // Assumir risco se não mencionar MFA no uso da VPN
    if (!profile.conectividade.usoVPN.toLowerCase().includes('mfa') && 
        !profile.conectividade.usoVPN.toLowerCase().includes('duplo fator') &&
        !profile.conectividade.usoVPN.toLowerCase().includes('2fa')) {
      risks.push({
        ...riskConfig.vpn.vpnSemMfa,
        fatorCausador: "VPN sem menção de autenticação multifator",
        categoria: 'alto'
      });
    }
  }

  // Análise de WiFi
  if (profile.conectividade.wifiTipo === 'unica' && profile.infraestrutura.dispositivosAtuais > 20) {
    risks.push({
      ...riskConfig.wifi.redeUnica,
      fatorCausador: `Rede única com ${profile.infraestrutura.dispositivosAtuais} dispositivos`,
      categoria: 'moderado'
    });
  }

  // Análise de Endpoint
  const antivirus = profile.seguranca.antivirusTipo.toLowerCase();
  const categoriaAntivirus = profile.seguranca.antivirusCategoria.toLowerCase();
  
  if (antivirus.includes('windows defender') || categoriaAntivirus.includes('assinatura')) {
    risks.push({
      ...riskConfig.endpoint.antivirusBasico,
      fatorCausador: `Proteção básica: ${profile.seguranca.antivirusTipo}`,
      categoria: 'alto'
    });
  }

  if (!profile.seguranca.antivirusGerenciado) {
    risks.push({
      ...riskConfig.endpoint.semGerenciamento,
      fatorCausador: "Endpoint sem gerenciamento centralizado",
      categoria: 'moderado'
    });
  }

  // Análise de Backup
  if (!profile.backup.possuiBackup) {
    risks.push({
      ...riskConfig.backup.semBackup,
      fatorCausador: "Empresa não possui sistema de backup",
      categoria: 'alto'
    });
  } else {
    if (!profile.backup.fazTesteRestore) {
      risks.push({
        ...riskConfig.backup.backupSemTeste,
        fatorCausador: "Backup sem testes de restore validados",
        categoria: 'alto'
      });
    }
    
    if (!profile.backup.tipoBackup.toLowerCase().includes('imutável') && 
        !profile.backup.tipoBackup.toLowerCase().includes('cloud') &&
        !profile.backup.tipoBackup.toLowerCase().includes('offsite')) {
      risks.push({
        ...riskConfig.backup.backupMutavel,
        fatorCausador: `Tipo de backup: ${profile.backup.tipoBackup}`,
        categoria: 'moderado'
      });
    }
  }

  return risks.sort((a, b) => b.probabilidade - a.probabilidade);
}