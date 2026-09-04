import React from 'react';
import { Cpu, Sparkles, CheckCircle2 } from 'lucide-react';
import { AI_MODELS } from '../../services/promptEngine';

export const MultiAiSection: React.FC = () => {
  return (
    <section id="recursos" className="py-20 sm:py-28 relative overflow-hidden bg-slate-50/50">
      {/* Background Accent */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Block */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 text-xs font-bold">
              <Cpu className="w-3.5 h-3.5 text-cyan-600" />
              <span>Engenharia Multi-IA Especializada</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Um mesmo prompt <span className="gradient-text">não funciona da mesma maneira</span> em todas as IAs.
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              O <strong className="text-slate-900">Studio Prompt Pro</strong> adapta a engenharia do prompt conforme o modelo de destino. Cada inteligência artificial possui pesos, sintaxes e estruturas de linguagem totalmente distintas.
            </p>

            <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-sm flex items-center gap-3 shadow-xs">
              <Sparkles className="w-5 h-5 text-indigo-600 shrink-0" />
              <span>
                Não somos apenas um gerador de textos genéricos — somos um <strong>Engenheiro de Prompts Multi-IA</strong> de alta precisão.
              </span>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Formatos de tags de peso técnico calibrados para geradores de imagens</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Instruções cinematográficas de física e câmera para modelos de vídeo</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Sintaxe natural narrativa adaptada especificamente para DALL-E / ChatGPT</span>
              </div>
            </div>
          </div>

          {/* Right Cards: The 5 Supported Models in Light Theme */}
          <div className="lg:col-span-6 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Modelos Atualmente Suportados:
            </div>

            <div className="space-y-3">
              {AI_MODELS.map((model) => (
                <div
                  key={model.id}
                  className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-300 hover:shadow-md transition flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800 font-bold text-xs font-mono">
                      {model.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-sm">{model.name}</h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                          {model.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{model.tagline}</p>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono font-semibold px-2 py-1 rounded bg-slate-50 text-slate-600 border border-slate-200 uppercase hidden sm:inline-block">
                    {model.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
