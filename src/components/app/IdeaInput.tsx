import React from 'react';
import { Sparkles, Loader2, Lightbulb } from 'lucide-react';

interface IdeaInputProps {
  idea: string;
  onChangeIdea: (idea: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const EXAMPLE_IDEAS = [
  'Um guerreiro medieval caminhando por uma floresta misteriosa durante o pôr do sol.',
  'Cyborg samurai em uma Tóquio futurista com chuva de neon e reflexos na poça.',
  'Close-up cinematográfico de uma mulher idosa sábia com olhar intenso e rugas detalhadas.',
  'Plano aéreo de um castelo flutuante sobre nuvens douradas ao amanhecer.'
];

export const IdeaInput: React.FC<IdeaInputProps> = ({
  idea,
  onChangeIdea,
  onGenerate,
  isLoading,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      onGenerate();
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
          3. Descreva sua ideia
        </label>
        <span className="text-[11px] font-medium text-slate-400">Pressione Ctrl + Enter para gerar</span>
      </div>

      <div className="relative">
        <textarea
          rows={4}
          value={idea}
          onChange={(e) => onChangeIdea(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Um guerreiro medieval caminhando por uma floresta misteriosa durante o pôr do sol."
          className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm sm:text-base focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition resize-none leading-relaxed shadow-inner"
        />
        <div className="absolute right-3 bottom-3 text-[11px] font-medium text-slate-400">
          {idea.length} caracteres
        </div>
      </div>

      {/* Suggested quick inspirations */}
      <div className="flex items-center gap-1.5 flex-wrap pt-1">
        <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
          <Lightbulb className="w-3 h-3 text-amber-500" />
          Exemplos rápidos:
        </span>
        {EXAMPLE_IDEAS.map((ex, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onChangeIdea(ex)}
            className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 text-slate-600 hover:text-indigo-700 transition truncate max-w-[280px] shadow-2xs cursor-pointer"
            title={ex}
          >
            "{ex}"
          </button>
        ))}
      </div>

      {/* Main CTA Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onGenerate}
          disabled={isLoading || !idea.trim()}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-base shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-3 transition-all transform active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Construindo Engenharia de Prompt Especializada...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-indigo-100" />
              <span>Gerar Prompt</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
