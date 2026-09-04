export const TRIAL_DAYS = 30;

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
    name: 'Starter VIP',
    badge: 'Mais Acessível',
    description: 'Ideal para quem quer começar a criar prompts profissionais e vídeos com IA com alto custo-benefício.',
    monthlyPrice: 5.99,
    yearlyPrice: 47.90, // ~R$ 3,99/mês
    features: [
      'Acesso mensal completo à plataforma',
      'Engenharia de prompts com IA Gemini AI',
      'Modelos de Imagem: ChatGPT DALL-E 3 & Flux',
      '🎬 Criador de Conteúdo em Vídeo & Shorts (9:16 e 16:9)',
      '🩺 Prompt Doctor: Auditoria e otimização de prompts',
      '📚 Biblioteca de Presets (+100 Prompts Validados)',
      'Categorias: Thumbnails, Personagens e Cenas',
      'Histórico completo salvo na nuvem',
      '📥 Download de Roteiros e Materiais em (.TXT e PDF)',
      'Suporte por E-mail',
      'Sem fidelidade: Cancele a qualquer momento com 1 clique',
    ],
    checkoutUrlMonthly: import.meta.env.VITE_CHECKOUT_STARTER_MONTHLY || 'https://pay.cakto.com.br/3fa8t5v_1085807',
    checkoutUrlYearly: import.meta.env.VITE_CHECKOUT_STARTER_YEARLY || 'https://pay.cakto.com.br/5ybjaep',
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
      '🎬 Criador de Conteúdo em Vídeo Avançado + Exportação ElevenLabs',
      '🩺 Prompt Doctor: Auditoria completa e reescrita de prompts',
      '👤 Character Bible: Módulo de consistência para personagens',
      '⚡ Comparador Multi-IA: Geração simultânea lado a lado',
      '📚 Biblioteca Completa de Prompts & Presets (+500 Prompts)',
      'Sincronização ilimitada de histórico na nuvem (Supabase)',
      'Suporte prioritário por E-mail',
    ],
    checkoutUrlMonthly: import.meta.env.VITE_CHECKOUT_PRO_MONTHLY || 'https://pay.cakto.com.br/pvufpys_1085829',
    checkoutUrlYearly: import.meta.env.VITE_CHECKOUT_PRO_YEARLY || 'https://pay.cakto.com.br/r2zfq48',
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
      '💻 Código-Fonte Completo do Projeto 3 (Python CLI + Automação)',
      'Suporte VIP Prioritário por E-mail',
    ],
    checkoutUrlMonthly: import.meta.env.VITE_CHECKOUT_AGENCY_MONTHLY || 'https://pay.cakto.com.br/pqd58v4_1085842',
    checkoutUrlYearly: import.meta.env.VITE_CHECKOUT_AGENCY_YEARLY || 'https://pay.cakto.com.br/yxxtp4s',
  },
];
