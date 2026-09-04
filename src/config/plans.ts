export const FREE_DAILY_LIMIT = 5;

export interface PlanPricing {
  id: 'free' | 'pro' | 'agency';
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
    id: 'free',
    name: 'Gratuito',
    description: 'Perfeito para experimentar a qualidade da engenharia de prompts.',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      '5 gerações de prompts por dia',
      'Acesso aos modelos ChatGPT e Nano Banana',
      'Categorias: Thumbnail e Cena',
      'Histórico local recente (até 5 prompts)',
      'Recomendações técnicas básicas',
    ],
  },
  {
    id: 'pro',
    name: 'PRO Creator',
    badge: 'Mais Popular',
    popular: true,
    description: 'Para criadores de conteúdo, YouTubers e designers que exigem alta performance.',
    monthlyPrice: 37,
    yearlyPrice: 297, // Economia de 33%
    features: [
      'Gerações de prompts ILIMITADAS',
      'Todos os modelos de IA (Veo, Kling, Seedance, DALL-E, Flux)',
      'Modo Comparativo Multi-IA liberado',
      'Refinador de linguagem natural com Gemini AI ilimitado',
      'Ferramenta de Otimização Antes/Depois',
      'Sincronização ilimitada de histórico na nuvem',
      'Suporte prioritário por WhatsApp/Email',
    ],
    checkoutUrlMonthly: import.meta.env.VITE_CHECKOUT_PRO_MONTHLY || 'https://pay.kiwify.com.br/exemplo-pro-mensal',
    checkoutUrlYearly: import.meta.env.VITE_CHECKOUT_PRO_YEARLY || 'https://pay.kiwify.com.br/exemplo-pro-anual',
  },
  {
    id: 'agency',
    name: 'Agência & Estúdio',
    badge: 'Uso Comercial',
    description: 'Para agências de marketing, canais dark em escala e produtoras de vídeo.',
    monthlyPrice: 87,
    yearlyPrice: 697,
    features: [
      'Tudo incluído no Plano PRO',
      'Prioridade máxima de processamento e velocidade',
      'Presets exclusivos para Canais Dark de Alto CTR',
      'Exportação de prompts em lote (Batch)',
      'Direito de uso comercial para clientes',
      'Acesso antecipado a novos modelos de vídeo',
      'Consultoria de engenharia de prompts',
    ],
    checkoutUrlMonthly: import.meta.env.VITE_CHECKOUT_AGENCY_MONTHLY || 'https://pay.kiwify.com.br/exemplo-agency-mensal',
    checkoutUrlYearly: import.meta.env.VITE_CHECKOUT_AGENCY_YEARLY || 'https://pay.kiwify.com.br/exemplo-agency-anual',
  },
];
