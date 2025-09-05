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
              <div className="text-sm text-muted-foreground">Usuários</div>
            </div>
            
            <div className="text-center p-4 border border-border rounded-lg">
              <Monitor className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{profile.infraestrutura.dispositivosAtuais}</div>
              <div className="text-sm text-muted-foreground">Dispositivos</div>
            </div>
            
            <div className="text-center p-4 border border-border rounded-lg">
              <Wifi className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{profile.infraestrutura.links.length}</div>
              <div className="text-sm text-muted-foreground">Links Internet</div>
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
            <AttackSimulation scenario="firewall" />
            <AttackSimulation scenario="endpoint" />
            <AttackSimulation scenario="backup" />
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

        {/* CTA Final - Castelo de Proteção */}
        <CyberCard className="p-8 text-center relative overflow-hidden" glowing>
          {/* Background com efeito de castelo */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent"></div>
          
          {/* Ameaças sendo bloqueadas - elementos decorativos */}
          <div className="absolute top-4 left-4 text-destructive/30 text-2xl animate-pulse">⚠️</div>
          <div className="absolute top-8 right-6 text-destructive/30 text-xl animate-pulse delay-300">🔥</div>
          <div className="absolute bottom-20 left-8 text-destructive/30 text-lg animate-pulse delay-700">💀</div>
          <div className="absolute bottom-16 right-4 text-destructive/30 text-xl animate-pulse delay-500">🎯</div>
          
          {/* Logo da Concierge como escudo protetor central */}
          <div className="relative z-10 mb-8">
            <div className="relative flex justify-center items-center">
              {/* Efeito de escudo/muro atrás da logo */}
              <div className="absolute w-40 h-40 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full blur-xl"></div>
              <div className="absolute w-32 h-32 bg-gradient-to-br from-success/20 to-success/10 rounded-full blur-lg"></div>
              
              {/* Logo principal da Concierge como centro do escudo */}
              <div className="relative z-20 p-6 bg-background/80 backdrop-blur-sm rounded-full border-4 border-primary/50 shadow-2xl">
                <img 
                  src="/concierge-logo-new.png" 
                  alt="Concierge - Seu Escudo Digital" 
                  className="h-20 w-auto filter drop-shadow-lg"
                />
              </div>
              
              {/* Efeitos de proteção ao redor */}
              <div className="absolute w-48 h-48 border border-primary/30 rounded-full animate-pulse"></div>
              <div className="absolute w-56 h-56 border border-success/20 rounded-full animate-pulse delay-1000"></div>
            </div>
            
            {/* Logo do cliente protegida atrás do escudo */}
            {profile.empresa.logoClienteUrl && (
              <div className="mt-6 relative">
                <div className="flex justify-center">
                  <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-success/50">
                    <img 
                      src={profile.empresa.logoClienteUrl} 
                      alt={`${profile.empresa.nome} - Protegida pela Concierge`} 
                      className="h-12 w-auto"
                    />
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-2 flex items-center justify-center gap-1">
                  <Shield className="h-3 w-3 text-success" />
                  Empresa Protegida
                </div>
              </div>
            )}
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