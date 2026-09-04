export const TRIAL_DAYS = 7;

export interface PlanPricing {
  id: 'trial' | 'pro' | 'agency' | 'free';
  name: string;
  badge?: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  popular?: boolean;
  features: string[];
  checkoutUrlMonthly?: string;
  checkoutUrlYearly?: string;
}

export const PLANS_CONFIG: PlanPricing[] = [
  {
    id: 'trial',
    name: 'Teste 7 Dias',
    badge: 'Degustação VIP',
    description: 'Acesso completo de 7 dias para você testar e comprovar a qualidade sem compromisso.',
    monthlyPrice: 2.99,
    yearlyPrice: 2.99,
    features: [
      '7 dias de acesso total à plataforma',
      'Engenharia de prompts com IA Gemini Pro',
      'Modelos de Imagem (ChatGPT DALL-E 3 e Nano Banana Flux/SDXL)',
      '🩺 Prompt Doctor: Auditoria e diagnóstico de prompts fracos',
      '📚 Biblioteca de Presets (seleção introdutória)',
      'Categorias: Thumbnails, Personagens e Cenas',
      'Histórico salvo na nuvem',
      'Suporte por E-mail',
      'Sem fidelidade: cancele quando quiser',
    ],
    checkoutUrlMonthly: import.meta.env.VITE_CHECKOUT_TRIAL || 'https://pay.kiwify.com.br/exemplo-trial-7dias',
    checkoutUrlYearly: import.meta.env.VITE_CHECKOUT_TRIAL || 'https://pay.kiwify.com.br/exemplo-trial-7dias',
  },
  {
    id: 'pro',
    name: 'PRO Creator VIP',
    badge: 'Mais Vendido',
    popular: true,
    description: 'Para criadores de conteúdo, YouTubers e designers que exigem consistência e alta produção.',
    monthlyPrice: 14.99,
    yearlyPrice: 119.90, // ~R$ 9,99/mês
    features: [
      'Gerações de prompts ILIMITADAS todos os dias',
      'Todos os 5 Modelos de Imagem & Vídeo (Veo, Kling, Seedance, ChatGPT, Flux)',
      '🎬 Video Prompt Lab: Estruturação avançada para vídeos (câmera, ritmo, ação)',
      '🩺 Prompt Doctor: Auditoria completa e reescrita de prompts',
      '👤 Character Bible: Módulo de consistência para personagens',
      '⚡ Comparador Multi-IA: Geração simultânea lado a lado',
      '📚 Biblioteca Completa de Prompts & Presets (+500 Prompts)',
      'Sincronização ilimitada de histórico na nuvem (Supabase)',
      'Suporte por E-mail',
    ],
    checkoutUrlMonthly: import.meta.env.VITE_CHECKOUT_PRO_MONTHLY || 'https://pay.kiwify.com.br/exemplo-pro-mensal',
    checkoutUrlYearly: import.meta.env.VITE_CHECKOUT_PRO_YEARLY || 'https://pay.kiwify.com.br/exemplo-pro-anual',
  },
  {
    id: 'agency',
    name: 'Agência & Studio Master',
    badge: 'Operação em Equipe',
    description: 'Para agências, canais Dark em escala e produtoras que precisam padronizar a produção.',
    monthlyPrice: 29.99,
    yearlyPrice: 239.90, // ~R$ 19,99/mês
    features: [
      'TUDO do Plano PRO Creator VIP incluído',
      '🏢 Workspace para Agências: Organização separada por cliente/campanha',
      '🎨 Construtor de Identidade Visual: Salve paletas, estilos e regras de marca',
      '📦 Exportação Profissional em Lote (TXT, PDF, CSV, JSON)',
      '📁 Pacotes de Templates Comerciais (Anúncios, Meta Ads, E-commerce, Shorts/Reels)',
      '👥 Compartilhamento e duplicação de bibliotecas internas',
      'Suporte Prioritário por E-mail',
    ],
    checkoutUrlMonthly: import.meta.env.VITE_CHECKOUT_AGENCY_MONTHLY || 'https://pay.kiwify.com.br/exemplo-agency-mensal',
    checkoutUrlYearly: import.meta.env.VITE_CHECKOUT_AGENCY_YEARLY || 'https://pay.kiwify.com.br/exemplo-agency-anual',
  },
];
