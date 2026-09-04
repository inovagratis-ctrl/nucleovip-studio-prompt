import React, { useState } from 'react';
import { ArrowLeftRight, Sparkles, Copy, Check, Loader2 } from 'lucide-react';
import type { AIModelType, CategoryType } from '../../types';
import { AI_MODELS, CATEGORIES, buildEngineeredPrompt } from '../../services/promptEngine';
import { useHistory } from '../../context/HistoryContext';

export const ComparativeMode: React.FC = () => {
  const { addToHistory } = useHistory();
  const [idea, setIdea] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('cena');
  const [selectedModels, setSelectedModels] = useState<AIModelType[]>([
    'chatgpt',
    'nanobanana',
    'veo'
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<
    Array<{ modelId: AIModelType; prompt: string; style: string }>
  >([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleModel = (id: AIModelType) => {
    if (selectedModels.includes(id)) {
      if (selectedModels.length === 1) return;
      setSelectedModels(selectedModels.filter((m) => m !== id));
    } else {
      setSelectedModels([...selectedModels, id]);
    }
  };

  const handleCompare = async () => {
    if (!idea.trim() || isLoading) return;
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 900));

    const generated = selectedModels.map((mId) => {
      const res = buildEngineeredPrompt(idea, selectedCategory, mId);
      return {
        modelId: mId,
        prompt: res.prompt,
        style: res.recommendations.style || res.recommendations.lighting || 'Prompt Especializado'
      };
    });

    setResults(generated);
    setIsLoading(false);

    if (generated.length > 0) {
      const first = generated[0];
      addToHistory({
        id: `comp-${Date.now()}`,
        timestamp: Date.now(),
        originalIdea: `[Comparativo Multi-IA] ${idea.substring(0, 35)}...`,
        category: selectedCategory,
        model: first.modelId,
        optimizedPrompt: first.prompt,
        recommendations: { aspectRatio: '16:9' },
        breakdown: {
          subject: 'Modo Comparativo Multi-IA',
          environment: 'Geração Simultânea',
          compositionAndLighting: `${selectedModels.length} modelos de IA comparados`,
          styleAndAtmosphere: 'Especialização lado a lado',
          technicalSettings: 'Multi-Engine'
        }
      });
    }
  };

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
          <ArrowLeftRight className="w-3.5 h-3.5" />
          <span>Uma ideia. Diferentes IAs. Prompts diferentes.</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          Modo Comparativo Multi-IA
        </h2>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto">
          Digite uma única ideia e veja como o <span className="text-indigo-700 font-bold">Studio Prompt Pro</span> adapta a estrutura, sintaxe e termos para cada gerador de imagem e vídeo simultaneamente.
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        {/* Category & Model Selectors */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Escolha a Categoria
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                    selectedCategory === c.id
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Selecione as IAs para comparar (mínimo 1):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {AI_MODELS.map((m) => {
                const isChecked = selectedModels.includes(m.id);
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => toggleModel(m.id)}
                    className={`p-2.5 rounded-xl text-left border transition flex items-center justify-between text-xs font-bold cursor-pointer ${
                      isChecked
                        ? 'bg-indigo-50 border-indigo-300 text-indigo-900 shadow-2xs'
                        : 'bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    <span className="truncate">{m.name}</span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isChecked ? 'bg-indigo-600' : 'bg-slate-300'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Idea Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Sua Ideia:
            </label>
            <input
              type="text"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Ex: Guerreiro cibernético contemplando uma metrópole ao anoitecer."
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition shadow-inner"
            />
          </div>

          <button
            type="button"
            onClick={handleCompare}
            disabled={isLoading || !idea.trim()}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-md shadow-indigo-500/25 flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Gerando Engenharia para {selectedModels.length} IAs em Paralelo...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Gerar Comparativo Multi-IA ({selectedModels.length} Modelos)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Side-by-side Comparative Cards in Light Theme */}
      {results.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              Resultados Comparativos Lado a Lado
            </h3>
            <span className="text-xs text-slate-500 font-medium">{results.length} modelos processados</span>
          </div>

          <div
            className={`grid gap-4 ${
              results.length === 1
                ? 'grid-cols-1'
                : results.length === 2
                ? 'grid-cols-1 md:grid-cols-2'
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {results.map((res) => {
              const model = AI_MODELS.find((m) => m.id === res.modelId);
              const isCopied = copiedId === res.modelId;

              return (
                <div
                  key={res.modelId}
                  className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 hover:border-indigo-300 hover:shadow-md transition"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{model?.name}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                          {model?.badge}
                        </span>
                      </div>
                      <span className="text-[10px] text-indigo-600 font-bold uppercase">{model?.type}</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs leading-relaxed min-h-[140px] select-all shadow-inner">
                      {res.prompt}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 truncate max-w-[150px]">
                      {model?.promptStyle.substring(0, 30)}...
                    </span>

                    <button
                      onClick={() => handleCopy(res.modelId, res.prompt)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                        isCopied
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? 'Copiado' : 'Copiar'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
