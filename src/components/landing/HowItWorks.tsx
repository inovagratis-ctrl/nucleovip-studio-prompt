import React from 'react';
import { PenTool, Cpu, Sparkles, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Descreva sua ideia',
      description: 'O usuário explica de maneira simples e natural o que deseja criar, sem precisar se preocupar com sintaxes complexas.',
      icon: <PenTool className="w-6 h-6 text-indigo-600" />,
      tag: 'Entrada Simples',
      bgIcon: 'bg-indigo-50 border-indigo-100'
    },
    {
      number: '02',
      title: 'Escolha sua IA',
      description: 'Seleciona o modelo específico (ChatGPT Images, Nano Banana, Veo, Kling, Seedance) para o qual deseja otimizar.',
      icon: <Cpu className="w-6 h-6 text-purple-600" />,
      tag: 'Arquitetura Multi-IA',
      bgIcon: 'bg-purple-50 border-purple-100'
    },
    {
      number: '03',
      title: 'Receba seu Prompt Profissional',
      description: 'O Studio Prompt Pro transforma a ideia em um prompt detalhado, volumétrico, com lente, iluminação e parâmetros calibrados.',
      icon: <Sparkles className="w-6 h-6 text-cyan-600" />,
      tag: 'Resultado Ultra-Otimizado',
      bgIcon: 'bg-cyan-50 border-cyan-100'
    }
  ];

  return (
    <section id="como-funciona" className="py-20 sm:py-28 relative bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3.5 py-1 rounded-full border border-indigo-100">
            Fluxo Descomplicado
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Como Funciona
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Em apenas 3 passos, você eleva a qualidade de suas criações de inteligência artificial de comum para cinematográfica.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs hover:shadow-xl hover:border-indigo-300 transition-all duration-300 group flex flex-col justify-between relative"
            >
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl ${step.bgIcon} border flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs`}>
                  {step.icon}
                </div>
                <span className="text-3xl font-black text-slate-200 group-hover:text-indigo-600/30 transition-colors font-mono">
                  {step.number}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider mb-2 block">
                  {step.tag}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-slate-500 group-hover:text-indigo-600 transition">
                <span>Passo {index + 1} de 3</span>
                <ArrowRight className="w-3.5 h-3.5 ml-auto group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
