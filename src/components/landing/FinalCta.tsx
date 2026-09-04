import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface FinalCtaProps {
  onNavigateToSignup: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onNavigateToSignup }) => {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-cyan-50 p-10 sm:p-16 rounded-3xl border border-indigo-100 shadow-xl relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-indigo-200 text-indigo-700 text-xs font-bold mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Comece agora em menos de 1 minuto</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-2xl mx-auto">
            Pare de perder tempo tentando descobrir o <span className="gradient-text">prompt perfeito</span>.
          </h2>

          <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
            Transforme suas ideias em prompts profissionais com o <strong>Studio Prompt Pro</strong>.
          </p>

          <div className="mt-8 flex justify-center">
            <button
              onClick={onNavigateToSignup}
              className="px-8 py-4 rounded-2xl text-base font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white shadow-xl shadow-indigo-500/25 flex items-center gap-3 transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-indigo-100" />
              <span>Começar Grátis</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
