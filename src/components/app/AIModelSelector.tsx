import React from 'react';
import { Sparkles, Video, Image as ImageIcon } from 'lucide-react';
import { AI_MODELS } from '../../services/promptEngine';
import type { AIModelType } from '../../types';

interface AIModelSelectorProps {
  selectedModel: AIModelType;
  onSelectModel: (model: AIModelType) => void;
}

export const AIModelSelector: React.FC<AIModelSelectorProps> = ({
  selectedModel,
  onSelectModel,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
          2. Para qual IA?
        </label>
        <span className="text-[11px] font-semibold text-indigo-600">Engenharia adaptativa por modelo</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {AI_MODELS.map((model) => {
          const isSelected = selectedModel === model.id;
          return (
            <button
              key={model.id}
              type="button"
              onClick={() => onSelectModel(model.id)}
              className={`p-3.5 rounded-2xl text-left transition-all relative overflow-hidden border flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-b from-indigo-50/90 to-white border-indigo-400 shadow-md ring-2 ring-indigo-500/20'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1">
                  {model.type === 'video' ? (
                    <Video className="w-2.5 h-2.5 text-blue-600" />
                  ) : (
                    <ImageIcon className="w-2.5 h-2.5 text-purple-600" />
                  )}
                  {model.badge}
                </span>
                {isSelected && (
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                )}
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm tracking-tight">{model.name}</h4>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {model.tagline}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-medium">
                <span>Ratios: {model.supportedRatios.join(', ')}</span>
                {model.maxDuration && <span>{model.maxDuration}</span>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
