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
import { 
  ArrowLeft, 
  Edit, 
  Download, 
  Users, 
  Monitor, 
  Wifi, 
  Shield, 
  AlertTriangle
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
    // Implementação simplificada - em produção seria mais robusta
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Apresentação ${profile.empresa.nome} - Concierge</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; background: #0B1220; color: #D7D8D8; }
            .header { text-align: center; margin-bottom: 30px; }
            .section { margin-bottom: 30px; padding: 20px; background: #1a2332; border-radius: 8px; }
            .risk-item { margin: 10px 0; padding: 15px; border-left: 4px solid #E63946; background: #2a3342; }
            .logo { max-height: 60px; margin: 10px; }
          </style>
        </head>
        <body>
          <div class="header">
            <img src="/concierge-logo.png" class="logo" alt="Concierge">
            ${profile.empresa.logoClienteUrl ? `<img src="${profile.empresa.logoClienteUrl}" class="logo" alt="Cliente">` : ''}
            <h1>Apresentação de Segurança Digital</h1>
            <h2>${profile.empresa.nome}</h2>
          </div>
          
          <div class="section">
            <h3>Visão Geral</h3>
            <p><strong>Empresa:</strong> ${profile.empresa.nome}</p>
            <p><strong>Setor:</strong> ${profile.empresa.setor}</p>
            <p><strong>Usuários:</strong> ${profile.infraestrutura.usuariosAtuais}</p>
            <p><strong>Dispositivos:</strong> ${profile.infraestrutura.dispositivosAtuais}</p>
          </div>
          
          <div class="section">
            <h3>Riscos Identificados</h3>
            ${risks.map(risk => `
              <div class="risk-item">
                <h4>${risk.titulo} (${risk.probabilidade}%)</h4>
                <p>${risk.explicacao}</p>
                <p><strong>Mitigação:</strong> ${risk.mitigacaoSugerida}</p>
              </div>
            `).join('')}
          </div>
        </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `apresentacao-${profile.empresa.nome.replace(/\s+/g, '-').toLowerCase()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
          </div>
        </div>

        {/* Visão Geral */}
        <CyberCard className="p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            Visão Geral - {profile.empresa.nome}
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
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
            </div>
            
            <div className="text-center p-4 border border-border rounded-lg">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{profile.infraestrutura.timeTI}</div>
              <div className="text-sm text-muted-foreground">Time TI</div>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-muted-foreground mb-2">
              <strong>Setor:</strong> {profile.empresa.setor}
            </p>
            <p className="text-muted-foreground mb-2">
              <strong>Contato:</strong> {profile.infraestrutura.contatoNome} ({profile.infraestrutura.contatoCargo})
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {profile.infraestrutura.links.map((link, index) => (
                <Badge key={index} variant="secondary">
                  {link.provedor} - {link.velocidade}
                </Badge>
              ))}
            </div>
            
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
            <div className="h-[400px]">
              <AttackSimulation scenario="firewall" />
            </div>
            <div className="h-[400px]">
              <AttackSimulation scenario="endpoint" />
            </div>
            <div className="h-[400px]">
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
          
          {/* Ameaças tentando atacar - animadas */}
          <div className="absolute top-10 left-10 text-red-500 text-3xl animate-bounce">💥</div>
          <div className="absolute top-20 right-12 text-red-500 text-2xl animate-pulse delay-300">🔥</div>
          <div className="absolute bottom-32 left-16 text-red-500 text-2xl animate-ping delay-700">⚠️</div>
          <div className="absolute bottom-40 right-8 text-red-500 text-3xl animate-bounce delay-500">🎯</div>
          <div className="absolute top-1/3 left-4 text-red-500 text-2xl animate-pulse delay-1000">💀</div>
          <div className="absolute top-1/2 right-4 text-red-500 text-2xl animate-bounce delay-200">🚨</div>
          
          {/* Movimento das ameaças sendo bloqueadas */}
          <div className="absolute top-16 left-1/4 w-2 h-2 bg-red-500 rounded-full animate-ping opacity-75"></div>
          <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse delay-500 opacity-60"></div>
          <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-red-500 rounded-full animate-bounce delay-300 opacity-50"></div>
          
          {/* Area de proteção com logo da Concierge */}
          <div className="relative z-10 mb-8 flex flex-col items-center">
            <div className="relative flex flex-col items-center">
              {/* Logo do cliente vulnerável (se houver) */}
              {profile.empresa.logoClienteUrl && (
                <div className="mb-8 relative">
                  <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-yellow-400 animate-pulse">
                    <img 
                      src={profile.empresa.logoClienteUrl} 
                      alt={`${profile.empresa.nome} - Precisa de Proteção`} 
                      className="h-12 w-auto"
                    />
                  </div>
                  <div className="text-xs text-yellow-400 mt-2 flex items-center justify-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    Vulnerável
                  </div>
                </div>
              )}
              
              {/* Escudo protetor da Concierge */}
              <div className="relative">
                {/* Efeito de escudo/proteção */}
                <div className="absolute w-44 h-44 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute w-36 h-36 bg-gradient-to-br from-success/30 to-success/10 rounded-full blur-lg animate-pulse delay-500"></div>
                
                {/* Logo principal da Concierge como escudo */}
                <div className="relative z-20 p-8 bg-background/90 backdrop-blur-sm rounded-full border-4 border-primary shadow-2xl">
                  <img 
                    src="/concierge-logo-new.png" 
                    alt="Concierge - Seu Escudo Digital" 
                    className="h-24 w-auto filter drop-shadow-lg"
                  />
                </div>
                
                {/* Ondas de proteção */}
                <div className="absolute w-52 h-52 border-2 border-primary/40 rounded-full animate-ping -top-4 -left-4"></div>
                <div className="absolute w-60 h-60 border border-success/30 rounded-full animate-pulse delay-1000 -top-8 -left-8"></div>
                <div className="absolute w-68 h-68 border border-primary/20 rounded-full animate-ping delay-2000 -top-12 -left-12"></div>
              </div>
              
              {/* Logo do cliente protegida */}
              {profile.empresa.logoClienteUrl && (
                <div className="mt-8 relative">
                  <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-success">
                    <img 
                      src={profile.empresa.logoClienteUrl} 
                      alt={`${profile.empresa.nome} - Protegida pela Concierge`} 
                      className="h-12 w-auto"
                    />
                  </div>
                  <div className="text-xs text-success mt-2 flex items-center justify-center gap-1">
                    <Shield className="h-3 w-3" />
                    Empresa Protegida
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