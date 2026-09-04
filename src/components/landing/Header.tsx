import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface HeaderProps {
  onNavigateToLogin: () => void;
  onNavigateToSignup: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigateToLogin,
  onNavigateToSignup,
}) => {
  const scrollToSection = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 flex items-center justify-center shadow-md shadow-indigo-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-slate-900 text-lg tracking-tight">Núcleo VIP</span>
              <span className="text-slate-400 font-bold text-sm">|</span>
              <span className="font-bold text-indigo-700 text-sm">Studio Prompt Pro</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-indigo-50 text-indigo-700 border border-indigo-200">
                PRO
              </span>
            </div>
            <span className="block text-[11px] text-slate-500 font-medium">
              Engenharia de Prompts com IA Especializada
            </span>
          </div>
        </div>

        {/* Menu Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <button
            onClick={() => scrollToSection('recursos')}
            className="hover:text-indigo-600 transition cursor-pointer"
          >
            Recursos
          </button>
          <button
            onClick={() => scrollToSection('como-funciona')}
            className="hover:text-indigo-600 transition cursor-pointer"
          >
            Como Funciona
          </button>
          <button
            onClick={() => scrollToSection('aplicacoes')}
            className="hover:text-indigo-600 transition cursor-pointer"
          >
            Aplicações
          </button>
          <button
            onClick={() => scrollToSection('planos')}
            className="text-slate-600 hover:text-indigo-600 transition cursor-pointer font-semibold"
          >
            Planos
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="text-indigo-600 hover:text-indigo-800 transition font-bold cursor-pointer"
          >
            Dúvidas (FAQ)
          </button>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateToLogin}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
          >
            Entrar
          </button>

          <button
            onClick={onNavigateToSignup}
            className="px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white shadow-lg shadow-indigo-500/25 flex items-center gap-1.5 transition transform active:scale-95 cursor-pointer"
          >
            <span>Começar por R$ 5,99/mês</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
