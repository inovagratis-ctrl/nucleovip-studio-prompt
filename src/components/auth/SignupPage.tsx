import React, { useState } from 'react';
import { Sparkles, Lock, Mail, User as UserIcon, ArrowRight, AlertCircle, Loader2, Cloud, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { CaptchaWidget } from './CaptchaWidget';

interface SignupPageProps {
  onNavigateToLogin: () => void;
  onNavigateToLanding: () => void;
  onSuccess: () => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({
  onNavigateToLogin,
  onNavigateToLanding,
  onSuccess,
}) => {
  const { signup, isCloudConnected } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Armadilha para bots
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 1. Verificação Honeypot (Robôs preenchem campos ocultos automaticamente)
    if (honeypot) {
      setError('Tentativa de acesso automatizado bloqueada.');
      return;
    }

    // 2. Verificação de Captcha
    if (!isCaptchaVerified) {
      setError('Por favor, marque a caixa de verificação "Não sou um robô" para prosseguir.');
      return;
    }

    setIsSubmitting(true);

    try {
      await signup(name, email, password, confirmPassword);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Erro ao criar conta.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden bg-slate-50">
      {/* Background ambient glows */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-indigo-100/70 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-purple-100/60 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <button
              onClick={onNavigateToLanding}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:border-indigo-300 transition shadow-2xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Núcleo VIP • Studio Prompt Pro</span>
            </button>

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white border border-slate-200 text-slate-600 shadow-2xs">
              {isCloudConnected ? (
                <>
                  <Cloud className="w-3 h-3 text-emerald-600" />
                  <span className="text-emerald-700">Supabase Cloud</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3 h-3 text-indigo-600" />
                  <span>Modo Local / Demo</span>
                </>
              )}
            </span>
          </div>

          <h1 className="text-3xl font-black tracking-tight text-slate-900 mb-2">
            Criar sua <span className="gradient-text">Conta Grátis</span>
          </h1>
          <p className="text-sm text-slate-600">
            Comece a gerar prompts ultra-otimizados no <span className="text-indigo-600 font-bold">Núcleo VIP — Studio Prompt Pro</span> agora mesmo.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200/90 relative">
          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-start gap-2.5 leading-relaxed">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot invisível para enganar robôs */}
            <input
              type="text"
              name="hp_field"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Nome
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome completo"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                E-mail
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu.email@exemplo.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Senha
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Confirmar senha
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repita sua senha"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                />
              </div>
            </div>

            {/* Captcha Anti-Bot Widget */}
            <div className="pt-1">
              <CaptchaWidget
                isVerified={isCaptchaVerified}
                onVerified={setIsCaptchaVerified}
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-sm font-bold shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Criando sua conta...</span>
                  </>
                ) : (
                  <>
                    <span>Criar Conta Grátis</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              Já possui uma conta?{' '}
              <button
                type="button"
                onClick={onNavigateToLogin}
                className="text-indigo-600 hover:text-indigo-700 font-bold ml-1 underline-offset-2 hover:underline cursor-pointer"
              >
                Entrar
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
