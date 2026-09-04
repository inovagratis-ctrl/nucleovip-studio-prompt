import React, { useState } from 'react';
import { Sparkles, MessageSquarePlus, Send, Loader2 } from 'lucide-react';

interface RefinementBoxProps {
  onRefine: (instruction: string) => void;
  isRefining: boolean;
}

const QUICK_PROMPTS = [
  'Deixe mais cinematográfico.',
  'Quero uma iluminação mais dramática.',
  'Deixe o personagem mais realista.',
  'Adicione movimento de câmera.'
];

export const RefinementBox: React.FC<RefinementBoxProps> = ({ onRefine, isRefining }) => {
  const [instruction, setInstruction] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!instruction.trim() || isRefining) return;
    onRefine(instruction);
    setInstruction('');
  };

  const handleQuickClick = (text: string) => {
    if (isRefining) return;
    onRefine(text);
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquarePlus className="w-4 h-4 text-indigo-600" />
          <h4 className="text-sm font-bold text-slate-900">Refinamento em Linguagem Natural</h4>
        </div>
        <span className="text-[11px] font-medium text-slate-500">Ajuste o prompt preservando a essência</span>
      </div>

      {/* Fast Preset Chips */}
      <div className="flex items-center gap-2 flex-wrap">
        {QUICK_PROMPTS.map((quick, idx) => (
          <button
            key={idx}
            type="button"
            disabled={isRefining}
            onClick={() => handleQuickClick(quick)}
            className="text-xs px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 font-medium transition flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-indigo-600" />
            <span>"{quick}"</span>
          </button>
        ))}
      </div>

      {/* Custom Refinement Input */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          placeholder="Ex: Quero um clima mais sombrio com névoa e raios roxos..."
          disabled={isRefining}
          className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isRefining || !instruction.trim()}
          className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md shadow-indigo-500/25 flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer"
        >
          {isRefining ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Refinar</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
