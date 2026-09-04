import React from 'react';
import { Sparkles, LogOut, History, Wand2, ArrowLeftRight, SlidersHorizontal, User as UserIcon, Zap, Crown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import type { ActiveTab } from '../../types';

interface AppNavbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onToggleHistory: () => void;
  onOpenUpgrade: () => void;
  historyCount: number;
}

export const AppNavbar: React.FC<AppNavbarProps> = ({
  activeTab,
  onTabChange,
  onToggleHistory,
  onOpenUpgrade,
  historyCount,
}) => {
  const { user, logout, plan } = useAuth();
  const isPro = plan === 'pro' || plan === 'agency';

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 flex items-center justify-center shadow-md shadow-indigo-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight">Núcleo VIP</span>
              <span className="text-slate-300 font-bold text-xs">|</span>
              <span className="font-black text-indigo-700 text-xs sm:text-sm tracking-tight">Studio Prompt Pro</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-black border ${
                plan === 'agency'
                  ? 'bg-purple-50 text-purple-700 border-purple-200'
                  : plan === 'pro'
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                  : plan === 'trial'
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}>
                {plan === 'agency' ? 'STUDIO MASTER' : plan === 'pro' ? 'PRO VIP' : 'STARTER VIP'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block">Engenheiro de Prompts Multi-IA</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold overflow-x-auto">
          <button
            onClick={() => onTabChange('generate')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition cursor-pointer whitespace-nowrap ${
              activeTab === 'generate'
                ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>Gerar Prompt</span>
          </button>

          <button
            onClick={() => onTabChange('videodark')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition cursor-pointer whitespace-nowrap ${
              activeTab === 'videodark'
                ? 'bg-white text-purple-700 shadow-xs border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>🎬 Criador de Conteúdo</span>
          </button>

          <button
            onClick={() => onTabChange('members')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition cursor-pointer whitespace-nowrap ${
              activeTab === 'members'
                ? 'bg-white text-amber-700 shadow-xs border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Crown className="w-3.5 h-3.5 text-amber-500" />
            <span>💎 Central de Membros</span>
          </button>

          <button
            onClick={() => onTabChange('optimize')}
            className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition cursor-pointer whitespace-nowrap ${
              activeTab === 'optimize'
                ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Otimizar</span>
          </button>

          <button
            onClick={() => onTabChange('compare')}
            className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition cursor-pointer whitespace-nowrap ${
              activeTab === 'compare'
                ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/60'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Comparar</span>
          </button>
        </nav>

        {/* User actions & Upgrade Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Plan Quota Pill / Upgrade Button */}
          {!isPro ? (
            <button
              onClick={onOpenUpgrade}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-white text-xs font-black shadow-sm shadow-amber-500/20 transition transform active:scale-95 cursor-pointer"
            >
              <Crown className="w-3.5 h-3.5" />
              <span>{plan === 'trial' ? 'Upgrade PRO VIP' : 'Assinar PRO'}</span>
            </button>
          ) : (
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
              <Zap className="w-3.5 h-3.5 fill-emerald-600" />
              <span>Acesso Ilimitado</span>
            </div>
          )}

          <button
            onClick={onToggleHistory}
            className="relative p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-300 transition shadow-xs cursor-pointer"
            title="Histórico de Prompts"
          >
            <History className="w-4 h-4" />
            {historyCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                {historyCount > 9 ? '9+' : historyCount}
              </span>
            )}
          </button>

          <div className="hidden md:flex items-center gap-2 pl-2 border-l border-slate-200 text-xs">
            <div className="w-7 h-7 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold">
              <UserIcon className="w-3.5 h-3.5" />
            </div>
            <div className="text-left">
              <p className="text-slate-900 font-bold text-xs leading-none truncate max-w-[120px]">{user?.name || 'Criador'}</p>
              <p className="text-[10px] text-emerald-600 font-medium leading-none mt-1">Conectado</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50 text-xs font-semibold transition shadow-xs cursor-pointer"
            title="Sair da sessão"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sair</span>
          </button>
        </div>
      </div>
    </header>
  );
};
