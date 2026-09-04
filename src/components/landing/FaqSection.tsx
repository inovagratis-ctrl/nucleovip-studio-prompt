import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Como funciona o Teste de 7 Dias por R$ 2,99?',
    answer: 'Você paga uma taxa simbólica única de apenas R$ 2,99 para ter acesso liberado à plataforma durante 7 dias corridos. Durante esse período, você pode testar a engenharia de prompts, gerar prompts para imagens e vídeos, experimentar o comparador multi-IA e avaliar a qualidade na prática sem compromisso.',
  },
  {
    question: 'O Studio Prompt Pro gera a imagem/vídeo ou cria o prompt?',
    answer: 'O Studio Prompt Pro é um software especializado em Engenharia de Prompts com IA. Ele analisa sua ideia e constrói a instrução técnica perfeita (composição, lentes, iluminação cinematográfica, parâmetros técnicos e sintaxe ideal). Em seguida, você copia o prompt com 1 clique e cola no gerador de sua preferência (como ChatGPT/DALL-E 3, Midjourney, Flux, Veo, Kling, Seedance, etc.), garantindo resultados profissionais na primeira tentativa.',
  },
  {
    question: 'Como funciona a renovação após o período de 7 dias?',
    answer: 'Após os 7 dias de teste, caso você deseje continuar com acesso ilimitado, a assinatura é continuada no plano escolhido (Plano PRO por apenas R$ 14,99/mês ou Plano Studio Master por R$ 29,99/mês). Você pode cancelar a qualquer momento antes da renovação diretamente no seu painel.',
  },
  {
    question: 'Como faço para cancelar minha assinatura?',
    answer: 'O cancelamento é 100% simples e sem burocracia. Você pode cancelar a qualquer momento com apenas 1 clique diretamente na área de configurações da sua conta ou enviando uma mensagem para o nosso suporte.',
  },
  {
    question: 'Posso usar os prompts gerados comercialmente?',
    answer: 'Sim! Todos os prompts, roteiros e artes que você produzir a partir do Studio Prompt Pro pertencem a você. Nos planos PRO e Studio Master você possui licença comercial ilimitada para produzir thumbnails, vídeos para canais Dark, campanhas de clientes e redes sociais.',
  },
  {
    question: 'Quais modelos de IA são suportados?',
    answer: 'Suportamos os principais modelos de ponta do mercado: ChatGPT Images (DALL-E 3), Nano Banana (SDXL, Flux, Midjourney), Google Veo, Kling AI, Seedance Video, além de atualizações contínuas para novos modelos de IA que forem lançados.',
  },
  {
    question: 'Existe garantia de reembolso?',
    answer: 'Sim! Oferecemos garantia incondicional de 7 dias. Se por qualquer motivo você não ficar satisfeito com a qualidade da ferramenta, basta solicitar e devolveremos 100% do seu investimento sem perguntas.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 bg-slate-50 relative overflow-hidden border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3.5 py-1 rounded-full border border-indigo-200 inline-flex items-center gap-1.5 shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
            Tire Suas Dúvidas
          </span>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Perguntas Frequentes (FAQ)
          </h2>

          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Tudo o que você precisa saber sobre o teste de R$ 2,99, planos, modelos de IA e cancelamento.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`rounded-2xl transition-all duration-200 border ${
                  isOpen
                    ? 'bg-white border-indigo-300 shadow-md ring-1 ring-indigo-500/10'
                    : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-bold text-slate-900 text-sm sm:text-base">
                    {item.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-indigo-600 text-white rotate-180'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-4 animate-fadeIn">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Note */}
        <div className="mt-12 p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Ainda tem alguma dúvida?</h4>
              <p className="text-xs text-slate-500">Nosso time de suporte está pronto para te ajudar.</p>
            </div>
          </div>

          <a
            href="mailto:contato@nucleovip.com.br"
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-xs cursor-pointer"
          >
            Falar com Suporte
          </a>
        </div>
      </div>
    </section>
  );
};
