import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

interface FooterProps {
  onNavigateToLogin: () => void;
  onNavigateToSignup: () => void;
}

export const Footer: React.FC<FooterProps> = ({
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
    <footer className="border-t border-slate-200 bg-slate-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-500 flex items-center justify-center shadow-md shadow-indigo-500/20">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 text-lg tracking-tight">Núcleo VIP</span>
                <span className="text-slate-400 font-bold text-sm">|</span>
                <span className="font-bold text-indigo-700 text-sm">Studio Prompt Pro</span>
              </div>
            </div>

            <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
              Engenharia de Prompts para a nova geração de criadores de imagens e vídeos com IA.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li>
                <button onClick={() => scrollToSection('recursos')} className="hover:text-indigo-600 transition cursor-pointer">
                  Recursos
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('como-funciona')} className="hover:text-indigo-600 transition cursor-pointer">
                  Como Funciona
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('aplicacoes')} className="hover:text-indigo-600 transition cursor-pointer">
                  Aplicações
                </button>
              </li>
            </ul>
          </div>

          {/* Account Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Acesso
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li>
                <button onClick={onNavigateToLogin} className="hover:text-indigo-600 transition cursor-pointer">
                  Entrar no Studio Prompt Pro
                </button>
              </li>
              <li>
                <button onClick={onNavigateToSignup} className="hover:text-indigo-600 transition cursor-pointer">
                  Criar Conta Grátis
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Núcleo VIP — Studio Prompt Pro. Todos os direitos reservados.</p>
          <div className="flex items-center gap-1 font-medium">
            <span>Desenvolvido com</span>
            <Heart className="w-3.5 h-3.5 text-indigo-600 fill-indigo-600" />
            <span>para criadores de IA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
