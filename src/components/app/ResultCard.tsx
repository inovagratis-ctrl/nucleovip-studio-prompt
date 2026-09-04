import React, { useState } from 'react';
import { Copy, Check, Sparkles, Sliders, Info } from 'lucide-react';
import type { GeneratedPromptResult } from '../../types';
import { AI_MODELS, CATEGORIES } from '../../services/promptEngine';

interface ResultCardProps {
  result: GeneratedPromptResult;
  onRefinePrompt?: (instruction: string) => void;
  isRefining?: boolean;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  result,
}) => {
  const [copied, setCopied] = useState(false);

  const modelInfo = AI_MODELS.find((m) => m.id === result.model);
  const categoryInfo = CATEGORIES.find((c) => c.id === result.category);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result.optimizedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-indigo-200 overflow-hidden shadow-xl relative transition-all">
      {/* Top Banner */}
      <div className="px-6 py-4 bg-gradient-to-r from-indigo-50/90 via-purple-50/60 to-white border-b border-indigo-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-slate-900 font-extrabold text-base flex items-center gap-2">
              Prompt Otimizado
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200">
                {modelInfo?.name}
              </span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Categoria: <span className="text-slate-800 font-semibold">{categoryInfo?.name}</span>
            </p>
          </div>
        </div>

        {/* Action button: Copiar Prompt */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer ${
              copied
                ? 'bg-emerald-600 text-white shadow-emerald-500/25'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/25'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copiado com Sucesso!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar Prompt</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-6 space-y-6">
        {/* The Full Engineered Prompt */}
        <div className="relative group">
          <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 font-mono text-sm sm:text-base leading-relaxed tracking-normal select-all relative overflow-hidden shadow-md">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-indigo-400 to-cyan-400" />
            <p className="pl-2 whitespace-pre-wrap">{result.optimizedPrompt}</p>
          </div>
        </div>

        {/* Recommendations Grid */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <Sliders className="w-3.5 h-3.5 text-indigo-600" />
            Recomendações Técnicas para o Modelo
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {result.recommendations.aspectRatio && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Aspect Ratio</span>
                <span className="text-xs font-extrabold text-indigo-700 mt-0.5 block">{result.recommendations.aspectRatio}</span>
              </div>
            )}

            {result.recommendations.duration && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Duração Ideal</span>
                <span className="text-xs font-extrabold text-indigo-700 mt-0.5 block">{result.recommendations.duration}</span>
              </div>
            )}

            {result.recommendations.style && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 sm:col-span-2">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Estilo Recomendado</span>
                <span className="text-xs font-semibold text-slate-800 mt-0.5 block truncate">{result.recommendations.style}</span>
              </div>
            )}

            {result.recommendations.framing && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 sm:col-span-2">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Enquadramento / Lente</span>
                <span className="text-xs font-semibold text-slate-800 mt-0.5 block truncate">{result.recommendations.framing}</span>
              </div>
            )}

            {result.recommendations.lighting && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 sm:col-span-2">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Iluminação Recomendada</span>
                <span className="text-xs font-semibold text-slate-800 mt-0.5 block truncate">{result.recommendations.lighting}</span>
              </div>
            )}

            {result.recommendations.cameraMovement && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 sm:col-span-2">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">Movimento de Câmera</span>
                <span className="text-xs font-semibold text-slate-800 mt-0.5 block truncate">{result.recommendations.cameraMovement}</span>
              </div>
            )}
          </div>

          {result.recommendations.engineTips && (
            <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-900 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <span className="font-medium">{result.recommendations.engineTips}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
