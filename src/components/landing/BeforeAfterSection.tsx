import React from 'react';
import { Sparkles, CheckCircle2, XCircle } from 'lucide-react';

export const BeforeAfterSection: React.FC = () => {
  const elements = [
    'Personagem com traços e vestimenta definidos',
    'Ambiente e profundidade de cena',
    'Composição e enquadramento de câmera (35mm)',
    'Iluminação volumétrica e chiaroscuro',
    'Atmosfera sensorial e partículas de névoa',
    'Estilo visual e parâmetros técnicos calibrados'
  ];

  return (
    <section className="py-20 sm:py-28 relative bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
            Antes e Depois
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Veja a Diferença na Prática
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Compreenda visualmente o salto qualitativo que uma engenharia de prompt especializada entrega às suas imagens e vídeos.
          </p>
        </div>

        {/* Before vs After Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* ANTES */}
          <div className="bg-white p-8 rounded-3xl border border-red-200/80 shadow-xs flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-red-600">
                <XCircle className="w-5 h-5 shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Antes (Ideia Comum / Prompt Genérico)
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 font-sans text-base sm:text-lg italic leading-relaxed">
                "Um cavaleiro caminhando em uma floresta."
              </div>

              <div className="p-4 rounded-xl bg-red-50/40 border border-red-100 space-y-2 text-xs text-slate-600">
                <p className="font-bold text-red-900">Problemas de prompts comuns:</p>
                <p>• Resultados imprevisíveis e genéricos</p>
                <p>• Falta de iluminação volumétrica e sensação de profundidade</p>
                <p>• Sem controle de lente, paleta de cores ou textura de materiais</p>
              </div>
            </div>

            <span className="text-xs font-medium text-slate-500">Resultado: Imagem sem impacto visual ou qualidade profissional.</span>
          </div>

          {/* DEPOIS */}
          <div className="bg-white p-8 rounded-3xl border border-indigo-200 shadow-lg flex flex-col justify-between space-y-6 relative">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-indigo-600">
                  <Sparkles className="w-5 h-5 shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Depois (Studio Prompt Pro)
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Engenharia Completa
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-indigo-50/50 border border-indigo-200/70 text-slate-900 font-mono text-xs sm:text-sm leading-relaxed shadow-inner">
                "Breathtaking cinematic wide shot: solitary knight in weathered plate armor walking through an ancient misty pine forest at golden hour. Volumetric sunlight god rays pierce dense fog, creating strong rim lighting along the armor contours. Shot on 35mm anamorphic cine lens, shallow depth of field, 8k resolution, photorealistic masterwork."
              </div>

              {/* Elements Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {elements.map((el, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{el}</span>
                  </div>
                ))}
              </div>
            </div>

            <span className="text-xs text-indigo-700 font-semibold">
              Resultado: Criação cinematográfica, com atmosfera épica e qualidade de cinema.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
