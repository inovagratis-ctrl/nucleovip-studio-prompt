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
    description: 'Acesso completo de 7 dias por uma taxa simbólica para você testar sem compromisso.',
    monthlyPrice: 2.99,
    yearlyPrice: 2.99,
    features: [
      '7 dias de acesso total à plataforma',
      'Engenharia de prompts com IA Gemini Pro',
      'Modelos de Imagem (ChatGPT DALL-E 3 e Nano Banana Flux/SDXL)',
      'Ferramenta Otimizador de Prompts (Antes vs Depois)',
      'Categorias completas: Thumbnails, Personagens e Cenas',
      'Histórico salvo na nuvem',
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
    description: 'Para criadores de conteúdo, YouTubers e designers que buscam prompts de altíssimo nível.',
    monthlyPrice: 14.99,
    yearlyPrice: 119.90, // ~R$ 9,99/mês
    features: [
      'Gerações de prompts ILIMITADAS todos os dias',
      'Todos os 5 Modelos de Imagem & Vídeo (Veo, Kling, Seedance, ChatGPT, Flux)',
      'Modo Comparativo Multi-IA lado a lado liberado',
      'Refinamento em linguagem natural com Gemini Pro',
      '🎁 BÔNUS: Pack com +500 Prompts Prontos de Alta Conversão',
      '🚀 SERVIÇO: Atualizações contínuas de novos parâmetros de IA',
      'Sincronização ilimitada de histórico na nuvem (Supabase)',
      'Suporte rápido por WhatsApp e E-mail',
    ],
    checkoutUrlMonthly: import.meta.env.VITE_CHECKOUT_PRO_MONTHLY || 'https://pay.kiwify.com.br/exemplo-pro-mensal',
    checkoutUrlYearly: import.meta.env.VITE_CHECKOUT_PRO_YEARLY || 'https://pay.kiwify.com.br/exemplo-pro-anual',
  },
  {
    id: 'agency',
    name: 'Agência & Studio Master',
    badge: 'Mais Completo',
    description: 'Solução completa para agências, produtores de canais Dark e prestadores de serviços.',
    monthlyPrice: 29.99,
    yearlyPrice: 239.90, // ~R$ 19,99/mês
    features: [
      'TUDO do Plano PRO Creator VIP incluído',
      '🎁 SUPER BÔNUS: Pack +1.000 Prompts para Canais Dark, Shorts & Reels Virais',
      '📚 BÔNUS EXCLUSIVO: E-book Guia do Mestre em Engenharia de Prompts',
      '💼 SERVIÇO: Licença de Uso Comercial Ilimitada (venda para clientes)',
      '⚡ Prioridade Máxima de Processamento no Gemini Pro',
      'Acesso Antecipado a Novos Modelos (Midjourney v7, OpenAI Sora)',
      'Suporte VIP Direto no WhatsApp',
    ],
    checkoutUrlMonthly: import.meta.env.VITE_CHECKOUT_AGENCY_MONTHLY || 'https://pay.kiwify.com.br/exemplo-agency-mensal',
    checkoutUrlYearly: import.meta.env.VITE_CHECKOUT_AGENCY_YEARLY || 'https://pay.kiwify.com.br/exemplo-agency-anual',
  },
];
