import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, Wand2 } from 'lucide-react';

interface HeroSectionProps {
  onNavigateToSignup: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigateToSignup }) => {
  return (
    <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
      {/* Soft Light Gradients Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[500px] bg-gradient-to-tr from-indigo-100/60 via-purple-100/50 to-cyan-100/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-indigo-100 text-indigo-700 text-xs font-bold mb-8 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Núcleo VIP • Studio Prompt Pro</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] max-w-4xl mx-auto">
          Crie imagens e vídeos de IA mais <span className="gradient-text">consistentes e cinematográficos</span>
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
          Transforme uma ideia simples em prompts adaptados para diferentes modelos de imagem e vídeo, com controle de composição, câmera, iluminação, movimento e estilo — <strong className="text-slate-900 font-semibold">sem passar horas testando prompts às cegas</strong>.
        </p>

        {/* Transparent Disclaimer Box */}
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-indigo-50/70 border border-indigo-100/80 text-indigo-900 text-xs font-medium max-w-2xl mx-auto text-center">
          <span>💡</span>
          <span><strong>Como funciona:</strong> O Studio Prompt Pro cria a engenharia exata do prompt. Você copia e cola com 1 clique no modelo de IA da sua escolha (ChatGPT/DALL-E 3, Midjourney, Flux, Veo, Kling ou Seedance).</span>
        </div>

        {/* CTA Container */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3">
          <button
            onClick={onNavigateToSignup}
            className="px-8 py-4 rounded-2xl text-base font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white shadow-xl shadow-indigo-500/25 flex items-center gap-3 transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-indigo-100" />
            <span>Teste 7 dias por R$ 2,99</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Acesso imediato ao teste • Planos a partir de R$ 14,99/mês • Cancele quando quiser
          </p>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-600 flex-wrap">
          <div className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Garantia incondicional de 7 dias</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-indigo-600" />
            <span>Acesso Completo Núcleo VIP</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-cyan-600" />
            <span>5 Modelos de IA Integrados</span>
          </div>
        </div>

        {/* Hero Interactive UI Preview Mockup in Clean Light Mode */}
        <div className="mt-14 relative max-w-4xl mx-auto rounded-3xl p-2 bg-gradient-to-b from-indigo-100 via-slate-100 to-white shadow-xl border border-slate-200/80">
          <div className="bg-white rounded-2xl p-4 sm:p-6 text-left border border-slate-200 shadow-sm overflow-hidden">
            {/* Window bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="ml-2 text-xs font-mono text-slate-500">studioprompt.pro/app</span>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                Live Studio Engine
              </span>
            </div>

            {/* Mocked UI Content */}
            <div className="pt-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-5 space-y-3">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Ideia do Usuário:</span>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium leading-relaxed">
                  "Um cavaleiro medieval caminhando em uma floresta misteriosa durante o pôr do sol."
                </div>
                <div className="flex gap-2">
                  <span className="px-2 py-1 rounded-md bg-slate-100 text-[10px] text-slate-700 font-mono font-medium">Cena</span>
                  <span className="px-2 py-1 rounded-md bg-indigo-50 text-[10px] text-indigo-700 font-mono font-medium">ChatGPT Images (DALL-E 3)</span>
                </div>
              </div>

              <div className="md:col-span-2 flex justify-center">
                <div className="w-9 h-9 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-xs">
                  <Wand2 className="w-4 h-4" />
                </div>
              </div>

              <div className="md:col-span-5 space-y-2">
                <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider">Engenharia Otimizada:</span>
                <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-200 text-[11px] text-slate-800 font-mono leading-relaxed select-all">
                  "Breathtaking cinematic wide shot: medieval knight clad in weathered steel plate armor walking through an ancient misty forest at golden hour. Volumetric sunbeams pierce through the canopy, casting dramatic shadows. 35mm cine lens, shallow DoF, 8k resolution."
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
