import React, { useState } from 'react';
import { ArrowLeftRight, Copy, Check } from 'lucide-react';

export const ComparativeSection: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const samples = [
    {
      model: 'ChatGPT Images',
      type: 'Imagem (DALL-E 3)',
      prompt: 'A cinematic high-detail shot of a medieval cyber-knight standing atop a misty ancient ridge at dusk. The armor features glowing circuit inlays integrated with hammered Damascus steel. Volumetric golden hour sunlight pierces through mist, shot on 35mm cine lens, rich narrative depth.',
      tag: 'Narrativa Cinematográfica'
    },
    {
      model: 'Nano Banana',
      type: 'Imagem (Flux/SDXL)',
      prompt: '(masterpiece:1.2), (medieval cyber-knight:1.3), glowing cyan circuit accents, weathered damascus armor, misty mountain ridge, (volumetric god rays:1.2), 35mm anamorphic photography, unreal engine 5 render, 8k resolution, raw photo style, hyper-detailed',
      tag: 'Tags e Pesos Técnicos'
    },
    {
      model: 'Veo',
      type: 'Vídeo Cinematográfico',
      prompt: 'Cinematic 10s sequence: Camera executes a slow forward dolly-in toward the medieval cyber-knight on the ridge. Subtle atmospheric wind blows fabric while circuit lights gently pulse. Golden hour sun flares realistically across the lens, 4k UHD 60fps.',
      tag: 'Dinâmica de Câmera & Física'
    }
  ];

  const handleCopy = (idx: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Recurso Exclusivo</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Uma ideia. <span className="gradient-text">Diferentes IAs.</span> Prompts diferentes.
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Você fornece uma única ideia e recebe versões simultâneas e especializadas, cada uma adaptada milimetricamente para seu respectivo gerador de inteligência artificial.
          </p>
        </div>

        {/* Side-by-side Comparative Preview Cards in Light Theme */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {samples.map((sample, idx) => (
            <div
              key={idx}
              className="bg-slate-50 p-6 rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-indigo-300 hover:bg-white transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{sample.model}</h3>
                    <p className="text-[11px] font-medium text-slate-500">{sample.type}</p>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {sample.tag}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-800 font-mono text-xs leading-relaxed min-h-[160px] select-all shadow-inner">
                  "{sample.prompt}"
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between">
                <span className="text-[11px] font-medium text-slate-500">Engenharia Automática</span>
                <button
                  onClick={() => handleCopy(idx, sample.prompt)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-xs font-bold transition border border-slate-200 hover:border-indigo-200 cursor-pointer"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
