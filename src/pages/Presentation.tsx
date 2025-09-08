import { AppLayout } from '@/components/AppLayout';
import { CyberCard } from '@/components/CyberCard';
import { RiskCard } from '@/components/RiskCard';
import { AttackSimulation } from '@/components/AttackSimulation';
import { SimplifiedROICalculator } from '@/components/SimplifiedROICalculator';
import { SimplifiedProposal } from '@/components/SimplifiedProposal';
import { NotasInternas } from '@/components/NotasInternas';
import { useProfile } from '@/contexts/ProfileContext';
import { computeRisks } from '@/utils/riskCalculator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { 
  ArrowLeft, 
  Edit, 
  Download, 
  Users, 
  Monitor, 
  Wifi, 
  Shield, 
  AlertTriangle,
  ShieldCheck,
  Database,
  FileText
} from 'lucide-react';

export function Presentation() {
  const { profile, setCurrentStep } = useProfile();
  
  const risks = computeRisks(profile);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const exportToHTML = () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Relatório de Segurança Digital - ${profile.empresa.nome}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
              background: linear-gradient(135deg, #0B1220 0%, #1a2332 100%);
              color: #D7D8D8; 
              line-height: 1.6;
              padding: 20px;
            }
            .container { max-width: 1200px; margin: 0 auto; }
            .header { 
              text-align: center; 
              margin-bottom: 40px; 
              padding: 30px;
              background: linear-gradient(135deg, #1a2332 0%, #2a3342 100%);
              border-radius: 12px;
              border: 1px solid #334155;
            }
            .logos { display: flex; justify-content: center; align-items: center; gap: 30px; margin-bottom: 20px; }
            .logo { max-height: 80px; }
            .client-logo { background: white; padding: 10px; border-radius: 8px; }
            .section { 
              margin-bottom: 30px; 
              padding: 25px; 
              background: linear-gradient(135deg, #1a2332 0%, #2a3342 100%);
              border-radius: 12px; 
              border: 1px solid #334155;
            }
            .section h2 { color: #3B82F6; margin-bottom: 20px; font-size: 1.5rem; }
            .section h3 { color: #60A5FA; margin-bottom: 15px; font-size: 1.2rem; }
            .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 20px 0; }
            .card { 
              background: #2a3342; 
              padding: 20px; 
              border-radius: 8px; 
              border-left: 4px solid #3B82F6;
            }
            .risk-card { border-left-color: #EF4444; }
            .security-card { border-left-color: #10B981; }
            .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
            .info-item { background: #334155; padding: 15px; border-radius: 6px; }
            .status-active { color: #10B981; font-weight: bold; }
            .status-inactive { color: #EF4444; font-weight: bold; }
            .status-warning { color: #F59E0B; font-weight: bold; }
            ul { margin-left: 20px; }
            li { margin-bottom: 8px; }
            .footer { 
              text-align: center; 
              margin-top: 40px; 
              padding: 20px; 
              background: #1a2332; 
              border-radius: 8px;
              font-size: 0.9rem;
              color: #94A3B8;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logos">
                <img src="/concierge-logo-new.png" class="logo" alt="Concierge">
                ${profile.empresa.logoClienteUrl ? `<img src="${profile.empresa.logoClienteUrl}" class="logo client-logo" alt="${profile.empresa.nome}">` : ''}
              </div>
              <h1>Relatório de Segurança Digital</h1>
              <h2>${profile.empresa.nome}</h2>
              <p>Grupo QOS TECNOLOGIA • ISO 27001 • SOC 24/7 • NIST Oriented • 23 anos de experiência</p>
              <p style="margin-top: 10px; font-size: 0.9rem;">Gerado em: ${new Date().toLocaleDateString('pt-BR')}</p>
            </div>
            
            <div class="section">
              <h2>📊 Informações da Empresa</h2>
              <div class="info-grid">
                <div class="info-item"><strong>Nome:</strong> ${profile.empresa.nome}</div>
                <div class="info-item"><strong>Setor:</strong> ${profile.empresa.setor}</div>
                <div class="info-item"><strong>Usuários Atuais:</strong> ${profile.infraestrutura.usuariosAtuais}</div>
                <div class="info-item"><strong>Dispositivos:</strong> ${profile.infraestrutura.dispositivosAtuais}</div>
                <div class="info-item"><strong>Time TI:</strong> ${profile.infraestrutura.timeTI}</div>
                <div class="info-item"><strong>Contato:</strong> ${profile.infraestrutura.contatoNome} (${profile.infraestrutura.contatoCargo})</div>
              </div>
            </div>

            <div class="section">
              <h2>🌐 Infraestrutura e Conectividade</h2>
              <h3>Links de Internet</h3>
              <div class="grid">
                ${profile.infraestrutura.links.map(link => `
                  <div class="card">
                    <strong>Provedor:</strong> ${link.provedor}<br>
                    <strong>Velocidade:</strong> ${link.velocidade}
                    ${link.aumentoPretendido ? `<br><strong>Nova Velocidade:</strong> ${link.novaVelocidade}` : ''}
                  </div>
                `).join('')}
              </div>
              
              <h3>WiFi e Rede</h3>
              <div class="info-grid">
                <div class="info-item"><strong>Tipo WiFi:</strong> ${profile.conectividade.wifiTipo === 'segmentada' ? 'Segmentada' : profile.conectividade.wifiTipo === 'unica' ? 'Única' : 'Não informado'}</div>
                <div class="info-item"><strong>Quantidade APs:</strong> ${profile.conectividade.apsQuantidade}</div>
                <div class="info-item"><strong>Marca AP:</strong> ${profile.conectividade.apMarca}</div>
                <div class="info-item"><strong>Modelo AP:</strong> ${profile.conectividade.apModelo}</div>
                <div class="info-item"><strong>Switch Gerenciável:</strong> ${profile.conectividade.switchGerenciavel ? 'Sim' : 'Não'}</div>
                <div class="info-item"><strong>SaaS/IaaS:</strong> ${profile.conectividade.possuiSaasIaas ? profile.conectividade.servicoSaasIaas : 'Não possui'}</div>
              </div>

              <h3>VPN</h3>
              <div class="info-grid">
                <div class="info-item"><strong>Usa VPN:</strong> ${profile.conectividade.usaVPN ? 'Sim' : 'Não'}</div>
                ${profile.conectividade.usaVPN ? `
                  <div class="info-item"><strong>Acessos VPN:</strong> ${profile.conectividade.acessosVPNQuantidade}</div>
                  <div class="info-item"><strong>Uso VPN:</strong> ${profile.conectividade.usoVPN}</div>
                ` : ''}
              </div>
            </div>

            <div class="section">
              <h2>🛡️ Segurança Atual</h2>
              <div class="grid">
                <div class="card security-card">
                  <h3>Firewall</h3>
                  ${profile.seguranca.possuiFirewall ? `
                    <p><strong>Tipo:</strong> ${profile.seguranca.firewallTipo}</p>
                    <p><strong>Modelo:</strong> ${profile.seguranca.firewallModelo}</p>
                    <p><strong>Status:</strong> ${profile.seguranca.firewallLocadoOuComprado}</p>
                    <p><strong>Licença:</strong> <span class="${profile.seguranca.firewallLicencaAtiva ? 'status-active' : 'status-inactive'}">${profile.seguranca.firewallLicencaAtiva ? 'Ativa' : 'Inativa'}</span></p>
                  ` : '<p class="status-inactive">Não possui firewall</p>'}
                </div>

                <div class="card security-card">
                  <h3>Antivírus/Endpoint</h3>
                  ${profile.seguranca.possuiAntivirusEndpoint ? `
                    <p><strong>Tipo:</strong> ${profile.seguranca.antivirusTipo}</p>
                    <p><strong>Categoria:</strong> ${profile.seguranca.antivirusCategoria}</p>
                    <p><strong>Gerenciamento:</strong> <span class="${profile.seguranca.antivirusGerenciado ? 'status-active' : 'status-warning'}">${profile.seguranca.antivirusGerenciado ? 'Gerenciado' : 'Não Gerenciado'}</span></p>
                  ` : '<p class="status-inactive">Não possui antivírus</p>'}
                </div>

                <div class="card security-card">
                  <h3>Backup</h3>
                  ${profile.backup.possuiBackup ? `
                    <p><strong>Tipo:</strong> ${profile.backup.tipoBackup}</p>
                    <p><strong>Gerenciável:</strong> <span class="${profile.backup.backupGerenciavel ? 'status-active' : 'status-warning'}">${profile.backup.backupGerenciavel ? 'Sim' : 'Não'}</span></p>
                    <p><strong>Teste Restore:</strong> <span class="${profile.backup.fazTesteRestore ? 'status-active' : 'status-inactive'}">${profile.backup.fazTesteRestore ? 'Sim' : 'Não'}</span></p>
                  ` : '<p class="status-inactive">Não possui backup</p>'}
                </div>
              </div>
            </div>

            <div class="section">
              <h2>⚠️ Riscos Identificados</h2>
              <div class="grid">
                ${risks.map(risk => `
                  <div class="card risk-card">
                    <h3>${risk.titulo}</h3>
                    <p><strong>Probabilidade:</strong> ${risk.probabilidade}%</p>
                    <p><strong>Categoria:</strong> ${risk.categoria.toUpperCase()}</p>
                    <p><strong>Explicação:</strong> ${risk.explicacao}</p>
                    <p><strong>Fator Causador:</strong> ${risk.fatorCausador}</p>
                    <p><strong>Mitigação Sugerida:</strong> ${risk.mitigacaoSugerida}</p>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="section">
              <h2>🎯 Objetivos de Segurança</h2>
              <ul>
                ${profile.objetivos.lgpd ? '<li>✅ Conformidade LGPD</li>' : '<li>❌ Conformidade LGPD</li>'}
                ${profile.objetivos.vpnSegura ? '<li>✅ VPN Segura</li>' : '<li>❌ VPN Segura</li>'}
                ${profile.objetivos.backupImutavel ? '<li>✅ Backup Imutável</li>' : '<li>❌ Backup Imutável</li>'}
                ${profile.objetivos.gestaoIncidentes ? '<li>✅ Gestão de Incidentes</li>' : '<li>❌ Gestão de Incidentes</li>'}
                ${profile.objetivos.reduzirRiscos ? '<li>✅ Reduzir Riscos Cibernéticos</li>' : '<li>❌ Reduzir Riscos Cibernéticos</li>'}
                ${profile.objetivos.protecaoEndpoints ? '<li>✅ Proteção de Endpoints</li>' : '<li>❌ Proteção de Endpoints</li>'}
                ${profile.objetivos.monitoramento247 ? '<li>✅ Monitoramento 24/7</li>' : '<li>❌ Monitoramento 24/7</li>'}
                ${profile.objetivos.auditoriaCompliance ? '<li>✅ Auditoria e Compliance</li>' : '<li>❌ Auditoria e Compliance</li>'}
              </ul>
            </div>

            <div class="section">
              <h2>📝 Observações por Etapa</h2>
              ${Object.entries(profile.observacoesPorEtapa).map(([etapa, observacao], index) => 
                observacao ? `
                  <div class="card">
                    <h3>Etapa ${index + 1}</h3>
                    <p>${observacao}</p>
                  </div>
                ` : ''
              ).join('')}
            </div>

            <div class="footer">
              <p><strong>Concierge Segurança Digital</strong></p>
              <p>Grupo QOS TECNOLOGIA | ISO 27001 Certificada | SOC 24/7 | NIST Framework</p>
              <p>23 anos protegendo empresas contra ameaças cibernéticas</p>
              <p style="margin-top: 10px; font-size: 0.8rem;">
                Este relatório foi gerado automaticamente baseado nas informações coletadas durante o processo de avaliação.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio-seguranca-${profile.empresa.nome.replace(/\s+/g, '-').toLowerCase()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportToPDF = async () => {
    try {
      // Create a temporary div with the same content
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = `
        <div style="padding: 20px; font-family: Arial, sans-serif; background: white; color: black;">
          <div style="text-align: center; margin-bottom: 30px; padding: 20px; border-bottom: 2px solid #3B82F6;">
            <h1 style="color: #3B82F6; margin-bottom: 10px;">Relatório de Segurança Digital</h1>
            <h2 style="color: #1a2332; margin-bottom: 5px;">${profile.empresa.nome}</h2>
            <p style="color: #666;">Grupo QOS TECNOLOGIA • ISO 27001 • SOC 24/7</p>
            <p style="font-size: 12px; color: #888;">Gerado em: ${new Date().toLocaleDateString('pt-BR')}</p>
          </div>
          
          <div style="margin-bottom: 25px;">
            <h3 style="color: #3B82F6; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Informações da Empresa</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 15px;">
              <div><strong>Nome:</strong> ${profile.empresa.nome}</div>
              <div><strong>Setor:</strong> ${profile.empresa.setor}</div>
              <div><strong>Usuários:</strong> ${profile.infraestrutura.usuariosAtuais}</div>
              <div><strong>Dispositivos:</strong> ${profile.infraestrutura.dispositivosAtuais}</div>
            </div>
          </div>

          <div style="margin-bottom: 25px;">
            <h3 style="color: #3B82F6; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Segurança Atual</h3>
            <div style="margin-top: 15px;">
              <p><strong>Firewall:</strong> ${profile.seguranca.possuiFirewall ? `${profile.seguranca.firewallTipo} - ${profile.seguranca.firewallModelo}` : 'Não possui'}</p>
              <p><strong>Antivírus:</strong> ${profile.seguranca.possuiAntivirusEndpoint ? `${profile.seguranca.antivirusTipo} - ${profile.seguranca.antivirusCategoria}` : 'Não possui'}</p>
              <p><strong>Backup:</strong> ${profile.backup.possuiBackup ? profile.backup.tipoBackup : 'Não possui'}</p>
            </div>
          </div>

          <div style="margin-bottom: 25px;">
            <h3 style="color: #3B82F6; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Riscos Identificados</h3>
            ${risks.map(risk => `
              <div style="margin: 15px 0; padding: 15px; border-left: 4px solid #EF4444; background: #f9f9f9;">
                <h4 style="color: #EF4444; margin-bottom: 5px;">${risk.titulo} (${risk.probabilidade}%)</h4>
                <p style="margin-bottom: 5px; font-size: 14px;">${risk.explicacao}</p>
                <p style="font-size: 14px;"><strong>Mitigação:</strong> ${risk.mitigacaoSugerida}</p>
              </div>
            `).join('')}
          </div>

          <div style="margin-bottom: 25px;">
            <h3 style="color: #3B82F6; border-bottom: 1px solid #ddd; padding-bottom: 5px;">Objetivos de Segurança</h3>
            <ul style="margin-top: 15px;">
              ${profile.objetivos.lgpd ? '<li>✅ Conformidade LGPD</li>' : '<li>❌ Conformidade LGPD</li>'}
              ${profile.objetivos.vpnSegura ? '<li>✅ VPN Segura</li>' : '<li>❌ VPN Segura</li>'}
              ${profile.objetivos.backupImutavel ? '<li>✅ Backup Imutável</li>' : '<li>❌ Backup Imutável</li>'}
              ${profile.objetivos.gestaoIncidentes ? '<li>✅ Gestão de Incidentes</li>' : '<li>❌ Gestão de Incidentes</li>'}
            </ul>
          </div>
        </div>
      `;
      
      // Temporarily add to body
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      document.body.appendChild(tempDiv);
      
      // Generate canvas from the div
      const canvas = await html2canvas(tempDiv.firstElementChild as HTMLElement, {
        backgroundColor: '#ffffff',
        scale: 2
      });
      
      // Remove temporary div
      document.body.removeChild(tempDiv);
      
      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`relatorio-seguranca-${profile.empresa.nome.replace(/\s+/g, '-').toLowerCase()}.pdf`);
      
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar PDF. Tente novamente.');
    }
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header com logos destacadas */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-8 mb-6">
            <img 
              src="/concierge-logo-new.png" 
              alt="Concierge Segurança Digital" 
              className="h-20 w-auto"
            />
            {profile.empresa.logoClienteUrl && (
              <>
                <div className="w-px h-12 bg-border"></div>
                <img 
                  src={profile.empresa.logoClienteUrl} 
                  alt={profile.empresa.nome} 
                  className="h-16 w-auto bg-white p-2 rounded-lg shadow-lg"
                />
              </>
            )}
          </div>
          
          <h1 className="text-3xl font-bold mb-2">Concierge Segurança Digital</h1>
          <p className="text-primary text-lg">Interactive Experience - {profile.empresa.nome}</p>
          <p className="text-sm text-muted-foreground mt-2">
            Grupo QOS TECNOLOGIA • ISO 27001 • SOC 24/7 • NIST Oriented • 23 anos de experiência
          </p>
        </div>

        {/* Ações */}
        <div className="flex justify-center gap-4 mb-8">
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentStep('welcome')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Nova Apresentação
            </Button>
            <Button
              variant="outline"
              onClick={() => setCurrentStep('empresa')}
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Editar Respostas
            </Button>
            <Button
              onClick={exportToHTML}
              className="gradient-cyber text-white flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Exportar HTML
            </Button>
            <Button
              onClick={exportToPDF}
              variant="outline"
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Exportar PDF
            </Button>
          </div>
        </div>

        {/* Visão Geral */}
        <CyberCard className="p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            Visão Geral - {profile.empresa.nome}
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6 mb-6">
            <div className="text-center p-4 border border-border rounded-lg">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{profile.infraestrutura.usuariosAtuais}</div>
              <div className="text-sm text-muted-foreground">Usuários Atuais</div>
              {profile.infraestrutura.usuariosPretensao && (
                <div className="text-xs text-primary mt-1">
                  Pretende aumentar para {profile.infraestrutura.usuariosEstimativa}
                </div>
              )}
            </div>
            
            <div className="text-center p-4 border border-border rounded-lg">
              <Monitor className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{profile.infraestrutura.dispositivosAtuais}</div>
              <div className="text-sm text-muted-foreground">Dispositivos Atuais</div>
              {profile.infraestrutura.dispositivosPretensao && (
                <div className="text-xs text-primary mt-1">
                  Pretende aumentar para {profile.infraestrutura.dispositivosEstimativa}
                </div>
              )}
            </div>
            
            <div className="text-center p-4 border border-border rounded-lg">
              <Wifi className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{profile.infraestrutura.links.length}</div>
              <div className="text-sm text-muted-foreground">Links Internet Atuais</div>
              {profile.infraestrutura.links.some(link => link.aumentoPretendido) && (
                <div className="text-xs text-primary mt-1">
                  Pretende aumentar velocidade
                </div>
              )}
              <div className="mt-3 space-y-1">
                {profile.infraestrutura.links.map((link, index) => (
                  <div key={index} className="text-xs text-muted-foreground">
                    {link.provedor} - {link.velocidade}
                    {link.aumentoPretendido && link.novaVelocidade && (
                      <span className="text-primary ml-1">→ {link.novaVelocidade}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-center p-4 border border-border rounded-lg">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{profile.infraestrutura.timeTI}</div>
              <div className="text-sm text-muted-foreground">Time TI</div>
            </div>
          </div>

          {/* Cards de Segurança */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 border border-border rounded-lg bg-muted/30">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Firewall</h3>
              </div>
              {profile.seguranca.possuiFirewall ? (
                <div className="space-y-1 text-sm">
                  <div><strong>Tipo:</strong> {profile.seguranca.firewallTipo}</div>
                  <div><strong>Modelo:</strong> {profile.seguranca.firewallModelo}</div>
                  <div><strong>Status:</strong> {profile.seguranca.firewallLocadoOuComprado}</div>
                  <div className={`text-xs px-2 py-1 rounded ${profile.seguranca.firewallLicencaAtiva ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    Licença {profile.seguranca.firewallLicencaAtiva ? 'Ativa' : 'Inativa'}
                  </div>
                </div>
              ) : (
                <div className="text-sm text-destructive">Não possui firewall</div>
              )}
            </div>

            <div className="p-4 border border-border rounded-lg bg-muted/30">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Antivírus</h3>
              </div>
              {profile.seguranca.possuiAntivirusEndpoint ? (
                <div className="space-y-1 text-sm">
                  <div><strong>Tipo:</strong> {profile.seguranca.antivirusTipo}</div>
                  <div><strong>Categoria:</strong> {profile.seguranca.antivirusCategoria}</div>
                  <div className={`text-xs px-2 py-1 rounded ${profile.seguranca.antivirusGerenciado ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {profile.seguranca.antivirusGerenciado ? 'Gerenciado' : 'Não Gerenciado'}
                  </div>
                </div>
              ) : (
                <div className="text-sm text-destructive">Não possui antivírus</div>
              )}
            </div>

            <div className="p-4 border border-border rounded-lg bg-muted/30">
              <div className="flex items-center gap-2 mb-3">
                <Database className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Backup</h3>
              </div>
              {profile.backup.possuiBackup ? (
                <div className="space-y-1 text-sm">
                  <div><strong>Tipo:</strong> {profile.backup.tipoBackup}</div>
                  <div className={`text-xs px-2 py-1 rounded ${profile.backup.backupGerenciavel ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {profile.backup.backupGerenciavel ? 'Gerenciável' : 'Não Gerenciável'}
                  </div>
                  <div className={`text-xs px-2 py-1 rounded mt-1 ${profile.backup.fazTesteRestore ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {profile.backup.fazTesteRestore ? 'Testa Restore' : 'Não Testa Restore'}
                  </div>
                </div>
              ) : (
                <div className="text-sm text-destructive">Não possui backup</div>
              )}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-muted-foreground mb-2">
              <strong>Setor:</strong> {profile.empresa.setor}
            </p>
            <p className="text-muted-foreground mb-2">
              <strong>Contato:</strong> {profile.infraestrutura.contatoNome} ({profile.infraestrutura.contatoCargo})
            </p>
            
            {/* Notas Internas */}
            <div className="mt-6">
              <NotasInternas />
            </div>
          </div>
        </CyberCard>


        {/* Riscos Identificados */}
        <CyberCard className="p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            Riscos Identificados
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {risks.map((risk, index) => (
              <RiskCard key={index} risk={risk} />
            ))}
          </div>
        </CyberCard>

        {/* Simulação de Ataques */}
        <CyberCard className="p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-6">Simulações de Ataque</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="h-[700px]">
              <AttackSimulation scenario="firewall" />
            </div>
            <div className="h-[700px]">
              <AttackSimulation scenario="endpoint" />
            </div>
            <div className="h-[700px]">
              <AttackSimulation scenario="backup" />
            </div>
          </div>
        </CyberCard>

        {/* ROI e Impacto Financeiro */}
        <SimplifiedROICalculator />

        {/* Simulação de Proposta */}
        <SimplifiedProposal />

        {/* Diferenciais QOS */}
        <CyberCard className="p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-6">Diferenciais Concierge</h2>
          
          <div className="space-y-6">
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground mb-4">
                Com ela, a sua empresa contará com a estrutura QOS:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-success mt-2 flex-shrink-0"></div>
                    <span>23 anos de experiência protegendo empresas contra ameaças digitais.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-success mt-2 flex-shrink-0"></div>
                    <span>Certificação ISO 27001, garantindo as melhores práticas de segurança.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-success mt-2 flex-shrink-0"></div>
                    <span>SOC próprio com monitoramento 24/7, resposta rápida a qualquer ameaça.</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-success mt-2 flex-shrink-0"></div>
                    <span>Suporte especializado sem sobrecarga para sua equipe interna.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-success mt-2 flex-shrink-0"></div>
                    <span>Segurança digital sob medida para pequenas e médias empresas, sem custos desnecessários.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-success mt-2 flex-shrink-0"></div>
                    <span>Backup seguro e automatizado, garantindo a recuperação de dados quando necessário.</span>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    🔥 Concierge Firewall - Appliance + Serviço Gerenciado
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    O firewall é a primeira linha de defesa da sua rede contra ataques cibernéticos. 
                    O Concierge Firewall é uma solução que inclui equipamento, licenças e serviços. Assim, sua empresa terá:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span>Proteção contra invasões e controle total do tráfego de internet.</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span>Monitoramento contínuo e suporte especializado 24/7.</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span>Conformidade com a LGPD, protegendo dados de clientes e evitando penalidades legais.</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span>Controle de acessos e navegação, garantindo mais produtividade e segurança.</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    🛡️ Concierge Endpoint - Proteção Gerenciada de Antivírus Corporativo
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Antivírus comum não é suficiente para lidar com ameaças avançadas. O Concierge endpoint abrange licenças e serviços para:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span>Defesa contra ransomware e ataques direcionados.</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span>Monitoramento ativo de dispositivos e resposta automática a ameaças.</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span>Proteção para trabalho remoto e híbrido, garantindo segurança dos computadores e smartphones fora da rede do escritório.</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span>Prevenção contra vazamento de informações principalmente as jurídicas, escolares, médicas, e financeiras.</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    💾 Concierge Backup - Licenças + Serviço Gerenciado
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Perder dados pode significar o fim do seu negócio. O Concierge backup oferece licenças e serviços para:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span>Backups automáticos e criptografados, protegendo seus arquivos contra perda ou sequestro.</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span>Recuperação rápida de dados, evitando interrupções nas operações.</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span>Armazenamento seguro e em conformidade com a LGPD.</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span>Testes de Restore, garantindo que os backups estejam sempre atualizados e acessíveis quando necessário.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CyberCard>

        {/* CTA Final - Proteção Animada */}
        <CyberCard className="p-8 text-center relative overflow-hidden min-h-[500px]" glowing>
          {/* Background com efeito de proteção */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent"></div>
          
          {/* Pontos vermelhos de ameaças espalhados */}
          <div className="absolute top-12 left-12 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute top-16 right-16 w-1 h-1 bg-red-500 rounded-full animate-ping delay-300 opacity-70"></div>
          <div className="absolute bottom-20 left-8 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse delay-700 opacity-60"></div>
          <div className="absolute bottom-16 right-20 w-1 h-1 bg-red-500 rounded-full animate-ping delay-1000 opacity-70"></div>
          <div className="absolute top-1/3 left-4 w-1 h-1 bg-red-500 rounded-full animate-pulse delay-500 opacity-60"></div>
          <div className="absolute top-2/3 right-8 w-1.5 h-1.5 bg-red-500 rounded-full animate-ping delay-200 opacity-70"></div>
          
          {/* Apenas três linhas vermelhas de ataque frontais direcionadas ao castelo */}
          <div className="absolute top-8 left-1/2 w-0.5 h-20 bg-gradient-to-b from-transparent via-red-500 to-red-400 animate-pulse delay-200 opacity-80 origin-top transform -translate-x-1/2 rotate-[5deg]"></div>
          <div className="absolute top-8 left-1/2 w-0.5 h-24 bg-gradient-to-b from-transparent via-red-500 to-red-400 animate-pulse delay-500 opacity-90 origin-top transform -translate-x-1/2"></div>
          <div className="absolute top-8 left-1/2 w-0.5 h-20 bg-gradient-to-b from-transparent via-red-500 to-red-400 animate-pulse delay-800 opacity-80 origin-top transform -translate-x-1/2 -rotate-[5deg]"></div>
          
          {/* Area central com proteção */}
          <div className="relative z-10 mb-8 flex flex-col items-center">
            <div className="relative flex flex-col items-center">
              
              {/* Logo do castelo Concierge (protetor principal) */}
              <div className="relative z-20 mb-4">
                {/* Escudo de proteção emanando do castelo */}
                <div className="absolute w-40 h-40 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-lg animate-pulse -top-8 -left-8"></div>
                <div className="absolute w-36 h-36 bg-gradient-to-br from-success/15 to-transparent rounded-full blur-md animate-pulse delay-500 -top-6 -left-6"></div>
                
                {/* Ondas de proteção */}
                <div className="absolute w-48 h-48 border border-primary/30 rounded-full animate-ping -top-12 -left-12"></div>
                <div className="absolute w-52 h-52 border border-success/20 rounded-full animate-pulse delay-1000 -top-14 -left-14"></div>
                
                {/* Castelo protetor */}
                <div className="relative p-8 bg-background/80 backdrop-blur-sm rounded-xl border-2 border-primary/50 shadow-2xl">
                  <img 
                    src="/lovable-uploads/13dd3521-d3c8-4f6d-b234-5435a5350cfd.png" 
                    alt="Castelo Concierge - Proteção Digital" 
                    className="h-40 w-auto filter drop-shadow-xl"
                  />
                </div>
              </div>
              
              {/* Logo do cliente (protegida atrás do castelo) */}
              {profile.empresa.logoClienteUrl && (
                <div className="relative z-10 -mt-2">
                  <div className="p-3 bg-white rounded-lg shadow-lg border-2 border-primary/20">
                    <img 
                      src={profile.empresa.logoClienteUrl} 
                      alt={profile.empresa.nome} 
                      className="h-12 w-auto opacity-95"
                    />
                  </div>
                </div>
              )}
              
            </div>
          </div>
          
          <h2 className="text-3xl font-bold mb-4 gradient-cyber bg-clip-text text-transparent relative z-10">
            Proteja {profile.empresa.nome} hoje mesmo
          </h2>
          
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto relative z-10">
            Não deixe sua empresa vulnerável. A Concierge é seu escudo digital contra todas as ameaças cibernéticas.
          </p>
          
          {/* Indicadores de proteção */}
          <div className="flex justify-center gap-8 mb-8 relative z-10">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">24/7</div>
              <div className="text-xs text-muted-foreground">Monitoramento</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">100%</div>
              <div className="text-xs text-muted-foreground">Proteção</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">23</div>
              <div className="text-xs text-muted-foreground">Anos</div>
            </div>
          </div>
          
        </CyberCard>
      </div>
    </AppLayout>
  );
}