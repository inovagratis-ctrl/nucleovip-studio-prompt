import React, { useState } from 'react';
import { X, Trash2, Copy, Check, Sparkles, Clock, ArrowRight } from 'lucide-react';
import { useHistory } from '../../context/HistoryContext';
import type { GeneratedPromptResult } from '../../types';
import { AI_MODELS } from '../../services/promptEngine';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPrompt: (prompt: GeneratedPromptResult) => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  onSelectPrompt,
}) => {
  const { history, clearHistory, removeFromHistory } = useHistory();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/30 backdrop-blur-xs transition-opacity">
      <div className="w-full max-w-md bg-white border-l border-slate-200 h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-600" />
            <h3 className="font-extrabold text-slate-900 text-base">Histórico Recente</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold">
              {history.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                title="Limpar Histórico"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* List in Light Theme */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {history.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto text-slate-400">
                <Sparkles className="w-6 h-6 text-indigo-500" />
              </div>
              <p className="text-sm font-bold text-slate-800">Nenhum prompt salvo ainda</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Seus prompts gerados aparecerão automaticamente aqui no seu histórico sincronizado.
              </p>
            </div>
          ) : (
            history.map((item) => {
              const model = AI_MODELS.find((m) => m.id === item.model);
              const isCopied = copiedId === item.id;

              return (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 hover:bg-white hover:shadow-md transition space-y-3"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-indigo-700 uppercase tracking-wider text-[10px]">
                      {model?.name || item.model}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <p className="text-xs text-slate-800 font-mono line-clamp-3 bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                    {item.optimizedPrompt}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectPrompt(item);
                        onClose();
                      }}
                      className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-bold cursor-pointer"
                    >
                      <span>Carregar no Studio</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleCopy(item.id, item.optimizedPrompt)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition text-xs flex items-center gap-1 cursor-pointer"
                        title="Copiar"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={() => removeFromHistory(item.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                        title="Excluir"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
