import React, { useState } from 'react';
import { X, CheckCircle2, Crown, Zap, Shield, ArrowRight } from 'lucide-react';
import { PLANS_CONFIG } from '../../config/plans';
import { useAuth } from '../../context/AuthContext';
import confetti from 'canvas-confetti';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  reasonTitle?: string;
  reasonDescription?: string;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({
  isOpen,
  onClose,
  reasonTitle = 'Desbloqueie o Poder Ilimitado do Studio Prompt Pro',
  reasonDescription = 'Você atingiu o limite gratuito diário ou tentou acessar um recurso exclusivo para assinantes PRO.',
}) => {
  const { upgradePlan } = useAuth();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [selectedPlanId, setSelectedPlanId] = useState<'pro' | 'agency'>('pro');

  if (!isOpen) return null;

  const proPlan = PLANS_CONFIG.find((p) => p.id === 'pro')!;
  const agencyPlan = PLANS_CONFIG.find((p) => p.id === 'agency')!;
  const currentPlan = selectedPlanId === 'pro' ? proPlan : agencyPlan;

  const price = billingCycle === 'monthly' ? currentPlan.monthlyPrice : currentPlan.yearlyPrice;
  const checkoutUrl = billingCycle === 'monthly' ? currentPlan.checkoutUrlMonthly : currentPlan.checkoutUrlYearly;

  const handleSimulatePayment = () => {
    // Para facilidade de teste local ou redirecionamento real
    if (checkoutUrl && !checkoutUrl.includes('exemplo-')) {
      window.open(checkoutUrl, '_blank');
    } else {
      // Simulação instantânea de ativação PRO
      upgradePlan(selectedPlanId);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#4F46E5', '#7C3AED', '#06B6D4', '#F59E0B'],
        });
      } catch (e) {}
      alert(`🎉 Parabéns! Seu plano foi atualizado para ${currentPlan.name}! Todas as funções foram liberadas.`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Banner */}
        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 p-6 sm:p-8 text-white relative overflow-hidden text-center">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mx-auto mb-3 text-amber-300 shadow-md">
            <Crown className="w-6 h-6" />
          </div>

          <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-indigo-100 border border-white/10">
            Acesso Ilimitado
          </span>

          <h3 className="text-2xl sm:text-3xl font-black mt-3">{reasonTitle}</h3>
          <p className="text-xs sm:text-sm text-indigo-100 mt-2 max-w-lg mx-auto">
            {reasonDescription}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Plan Switcher (Monthly vs Yearly) */}
          <div className="flex items-center justify-center gap-3">
            <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-lg transition cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Mensal
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-2 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
                  billingCycle === 'yearly'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Anual</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-black">
                  -33% OFF
                </span>
              </button>
            </div>
          </div>

          {/* Plan Cards Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* PRO */}
            <div
              onClick={() => setSelectedPlanId('pro')}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                selectedPlanId === 'pro'
                  ? 'border-indigo-500 bg-indigo-50/50 ring-2 ring-indigo-500/20 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 text-base">PRO Creator</span>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                    Mais Popular
                  </span>
                </div>
                <div className="mt-3">
                  <span className="text-2xl font-black text-slate-900">R$ {billingCycle === 'monthly' ? '37' : '24'}</span>
                  <span className="text-xs text-slate-500 font-medium"> /mês</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Gerações ilimitadas e todos os modelos de IA.</p>
              </div>
            </div>

            {/* AGENCY */}
            <div
              onClick={() => setSelectedPlanId('agency')}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                selectedPlanId === 'agency'
                  ? 'border-indigo-500 bg-indigo-50/50 ring-2 ring-indigo-500/20 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 text-base">Agência & Studio</span>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                    Comercial
                  </span>
                </div>
                <div className="mt-3">
                  <span className="text-2xl font-black text-slate-900">R$ {billingCycle === 'monthly' ? '87' : '58'}</span>
                  <span className="text-xs text-slate-500 font-medium"> /mês</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Para canais dark, escala e atendimento a clientes.</p>
              </div>
            </div>
          </div>

          {/* Features Included */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
            <span className="font-bold text-slate-700 uppercase tracking-wider block text-[10px]">
              O que você recebe no {currentPlan.name}:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 font-medium">
              {currentPlan.features.slice(0, 6).map((feat, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="space-y-2 pt-2">
            <button
              type="button"
              onClick={handleSimulatePayment}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-black text-base shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2 transition transform active:scale-95 cursor-pointer"
            >
              <Zap className="w-5 h-5 text-amber-300 fill-amber-300" />
              <span>Assinar Agora ({billingCycle === 'monthly' ? `R$ ${price}/mês` : `R$ ${price}/ano`})</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 font-medium pt-1">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                Garantia incondicional de 7 dias
              </span>
              <span>•</span>
              <span>Cancele quando quiser</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
