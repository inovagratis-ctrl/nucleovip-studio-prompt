import React from 'react';
import { Layout, User, Image, Video } from 'lucide-react';
import { CATEGORIES } from '../../services/promptEngine';
import type { CategoryType } from '../../types';

interface CategorySelectorProps {
  selectedCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout':
        return <Layout className="w-5 h-5" />;
      case 'User':
        return <User className="w-5 h-5" />;
      case 'Image':
        return <Image className="w-5 h-5" />;
      case 'Video':
        return <Video className="w-5 h-5" />;
      default:
        return <Layout className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
        1. O que você deseja criar?
      </label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`p-4 rounded-2xl text-left transition-all relative overflow-hidden flex flex-col justify-between border cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-b from-indigo-50/90 to-white border-indigo-400 shadow-md ring-2 ring-indigo-500/20'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-2xs'
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 right-0 w-12 h-12 bg-indigo-500/10 rounded-bl-full pointer-events-none" />
              )}
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`p-2 rounded-xl ${
                    isSelected ? 'bg-indigo-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {getIcon(cat.iconName)}
                </div>
                {isSelected && (
                  <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                    Ativo
                  </span>
                )}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{cat.name}</h4>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
