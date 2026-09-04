import React, { useState } from 'react';
import { SlidersHorizontal, Sparkles, Copy, Check, Loader2, Wand2, CheckCircle2 } from 'lucide-react';
import type { AIModelType, CategoryType } from '../../types';
import { AI_MODELS, CATEGORIES } from '../../services/promptEngine';
import { optimizeExistingPromptService } from '../../services/llmService';
import { useHistory } from '../../context/HistoryContext';

export const OptimizePromptTool: React.FC = () => {
  const { addToHistory } = useHistory();
  const [inputPrompt, setInputPrompt] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('cena');
  const [selectedModel, setSelectedModel] = useState<AIModelType>('chatgpt');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ original: string; optimized: string; improvements: string[] } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleOptimize = async () => {
    if (!inputPrompt.trim() || isLoading) return;
    setIsLoading(true);
    try {
      const res = await optimizeExistingPromptService(inputPrompt, selectedModel, selectedCategory);
      setResult(res);

      addToHistory({
        id: `opt-${Date.now()}`,
        timestamp: Date.now(),
        originalIdea: `[Otimização] ${inputPrompt.substring(0, 40)}...`,
        category: selectedCategory,
        model: selectedModel,
        optimizedPrompt: res.optimized,
        recommendations: { aspectRatio: '16:9' },
        breakdown: {
          subject: 'Refinado via Otimizador de Prompt',
          environment: 'Ambiente enriquecido',
          compositionAndLighting: 'Iluminação técnica adicionada',
          styleAndAtmosphere: 'Estilo cinematográfico adaptado',
          technicalSettings: 'Parâmetros calibrados'
        }
      });
    } catch (err: any) {
      alert(err.message || 'Erro ao otimizar prompt.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.optimized);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Tool Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Ferramenta de Upgrade de Prompt</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          Otimizar Prompt Existente
        </h2>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto">
          Cole qualquer prompt simples ou genérico. Nossa IA especializada aplicará regras de cinematografia, iluminação e vocabulário técnico para o modelo de IA selecionado.
        </p>
      </div>

      {/* Inputs Section */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        {/* Model & Category Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Categoria Alvo
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as CategoryType)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:bg-white focus:outline-none focus:border-indigo-500 transition"
            >
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.description.substring(0, 30)}...)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Modelo de IA de Destino
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value as AIModelType)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:bg-white focus:outline-none focus:border-indigo-500 transition"
            >
              {AI_MODELS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} — {m.badge}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Input Textarea */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Cole seu prompt original abaixo:
          </label>
          <textarea
            rows={3}
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Ex: Um guerreiro em uma floresta escura com espada brilhante."
            className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition resize-none"
          />
        </div>

        {/* Action button */}
        <button
          type="button"
          onClick={handleOptimize}
          disabled={isLoading || !inputPrompt.trim()}
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-sm shadow-md shadow-indigo-500/25 flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analisando e Reescrevendo Prompt...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4" />
              <span>Otimizar e Transformar Prompt</span>
            </>
          )}
        </button>
      </div>

      {/* ANTES & DEPOIS Result Card in Light Theme */}
      {result && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-indigo-200 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              Comparativo de Transformação
            </h3>
            <button
              onClick={handleCopy}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/25'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado!' : 'Copiar Otimizado'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ANTES */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  ANTES (Prompt Original)
                </h4>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 text-sm leading-relaxed min-h-[120px]">
                "{result.original}"
              </div>
            </div>

            {/* DEPOIS */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                  DEPOIS (Prompt Otimizado pelo Studio Prompt Pro)
                </h4>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-sm leading-relaxed min-h-[120px] shadow-md select-all">
                {result.optimized}
              </div>
            </div>
          </div>

          {/* Melhorias aplicadas */}
          <div className="pt-4 border-t border-slate-100">
            <h5 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">
              Engenharias Aplicadas:
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {result.improvements.map((imp, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{imp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
