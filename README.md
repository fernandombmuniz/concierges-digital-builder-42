# Concierge Segurança Digital - Apresentação Interativa

Uma plataforma web interativa para qualificação de clientes e geração automática de apresentações personalizadas de segurança digital.

## 🚀 Funcionalidades

### ✅ Implementado
- **Onboarding Completo**: 6 etapas de qualificação do cliente
- **Sistema de Análise de Riscos**: Cálculo automático baseado nas respostas
- **Calculadora de ROI**: Projeção financeira personalizada
- **Simulação de Ataques**: Cenários interativos de segurança
- **Apresentação Dinâmica**: Geração automática com dados do cliente
- **Exportação HTML**: Arquivo único para compartilhamento
- **Design Responsivo**: Interface otimizada para todos os dispositivos
- **Tema Cybersecurity**: Paleta de cores e estilo futurista

### 📋 Fluxo do Sistema

1. **Tela de Boas-vindas**: Introdução e início do processo
2. **Onboarding (6 etapas)**:
   - Informações da Empresa (nome, setor, logo)
   - Infraestrutura Atual (usuários, dispositivos, links)
   - Conectividade e Acesso (APs, VPN, WiFi)
   - Segurança Atual (firewall, antivírus)
   - Backup e Continuidade (estrutura de backup)
   - Objetivos Principais (metas de segurança)
3. **Apresentação Gerada**: Visualização personalizada
4. **Exportação**: Download em HTML

## 🎨 Design System

### Paleta de Cores
- **Background**: `#0B1220` - Fundo escuro principal
- **Primary**: `#0296A2` - Aqua institucional Concierge
- **Text**: `#D7D8D8` - Texto claro
- **Destructive**: `#E63946` - Alerta e risco
- **Success**: `#06D6A0` - Sucesso e bloqueio

### Componentes Customizados
- **CyberCard**: Cards com bordas futuristas
- **ProgressBar**: Indicador de progresso do onboarding
- **RiskCard**: Exibição de riscos com cores categorizadas
- **AppLayout**: Layout consistente com logo

## 📊 Sistema de Análise

### Cálculo de Riscos
O sistema analisa automaticamente as respostas e identifica:
- Riscos de firewall (ausência, tipo inadequado)
- Vulnerabilidades de VPN (falta de MFA, muitos acessos)
- Problemas de WiFi (rede única, sem segmentação)
- Deficiências de endpoint (antivírus básico, sem gestão)
- Falhas de backup (ausência, sem testes, mutável)

### Cálculo de ROI
Baseado em parâmetros configuráveis:
- **Custos médios**: Ransomware, breach de dados, indisponibilidade
- **Probabilidades**: Estimativas anuais por tipo de incidente
- **Eficácia dos controles**: Redução de probabilidade/impacto

## 🔧 Configuração

### Parâmetros Editáveis

#### Riscos (`src/config/riskConfig.ts`)
- Probabilidades por categoria de risco
- Títulos e explicações personalizáveis
- Sugestões de mitigação

#### ROI (`src/config/roiConfig.ts`)
```typescript
custos: {
  custo_medio_incidente_ransomware: 50000,
  custo_medio_breach_dados: 75000,
  custo_hora_indisponibilidade: 2500
},
probabilidades: {
  p_ransomware_base: 0.35,
  p_breach_base: 0.25,
  p_indisponibilidade_base: 0.45
}
```

## 🏗️ Arquitetura Técnica

### Stack
- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS + Design System personalizado
- **UI Components**: Shadcn/ui customizados
- **State Management**: React Context
- **Icons**: Lucide React

### Estrutura de Pastas
```
src/
├── components/         # Componentes reutilizáveis
│   ├── ui/            # Componentes base (shadcn)
│   ├── CyberCard.tsx  # Card com tema cyber
│   ├── AppLayout.tsx  # Layout principal
│   └── ...
├── pages/             # Páginas principais
│   ├── onboarding/    # Steps do onboarding
│   ├── Welcome.tsx    # Tela inicial
│   └── Presentation.tsx # Apresentação gerada
├── contexts/          # Estado global
├── types/             # Definições TypeScript
├── config/            # Configurações de risco/ROI
├── utils/             # Utilitários e cálculos
└── assets/            # Recursos estáticos
```

### Estado Global (Profile)
```typescript
interface Profile {
  empresa: EmpresaInfo;
  infraestrutura: InfraestruturaInfo;
  conectividade: ConectividadeInfo;
  seguranca: SegurancaInfo;
  backup: BackupInfo;
  objetivos: ObjetivosInfo;
  observacoesPorEtapa: ObservacoesPorEtapa;
}
```

## 🎯 Casos de Uso

### Para Vendedores
- Coleta estruturada de informações do cliente
- Apresentação profissional e personalizada
- Demonstração visual de riscos e soluções
- Cálculo automático de ROI

### Para Clientes
- Processo rápido e intuitivo
- Visualização clara dos riscos atuais
- Entendimento do valor da solução
- Material para análise posterior

## 🔒 Segurança e Privacidade

- **Dados Locais**: Todas as informações ficam no navegador
- **Sem Envio**: Nenhum dado é transmitido para servidores
- **Exportação Segura**: HTML self-contained
- **LGPD Compliant**: Respeita privacidade dos dados

## 🚀 Próximos Passos

### Melhorias Futuras
- [ ] Painel administrativo para edição de configurações
- [ ] Mais cenários de simulação de ataques  
- [ ] Templates de apresentação por setor
- [ ] Integração com CRM (via Supabase)
- [ ] Métricas e analytics de uso
- [ ] Versões em outros idiomas

### Extensões Possíveis
- [ ] Módulo de follow-up automatizado
- [ ] Geração de propostas comerciais
- [ ] Banco de dados de clientes
- [ ] Dashboard para gestores

## 📖 Como Usar

1. **Acesse a aplicação** - A tela de boas-vindas será exibida
2. **Clique em "Iniciar Onboarding"** - Comece o processo de qualificação
3. **Preencha as 6 etapas** - Forneça informações detalhadas da empresa
4. **Visualize a apresentação** - Analise riscos, ROI e simulações
5. **Exporte se necessário** - Baixe em HTML para compartilhar

## 🎨 Personalização

### Cores e Tema
Edite `src/index.css` para ajustar:
- Paleta de cores principal
- Gradientes e sombras
- Animações e transições

### Conteúdo
- **Riscos**: Modifique `src/config/riskConfig.ts`
- **ROI**: Ajuste `src/config/roiConfig.ts`
- **Textos**: Edite diretamente nos componentes

---

**Desenvolvido para Concierge Segurança Digital**  
*Transformando a experiência de vendas em segurança digital*