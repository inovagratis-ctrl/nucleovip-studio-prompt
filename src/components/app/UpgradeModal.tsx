import React, { useState } from 'react';
import { X, CheckCircle2, Crown, Zap, Shield, ArrowRight } from 'lucide-react';
import { PLANS_CONFIG } from '../../config/plans';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  reasonTitle?: string;
  reasonDescription?: string;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({
  isOpen,
  onClose,
  reasonTitle = 'Desbloqueie o Poder Total do Núcleo VIP — Studio Prompt Pro',
  reasonDescription = 'Escolha o plano ideal para você criar prompts profissionais sem limites para imagens e vídeos.',
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [selectedPlanId, setSelectedPlanId] = useState<'trial' | 'pro' | 'agency'>('pro');

  if (!isOpen) return null;

  const currentPlan = PLANS_CONFIG.find((p) => p.id === selectedPlanId) || PLANS_CONFIG[1];
  const isTrial = selectedPlanId === 'trial';

  const price = isTrial
    ? '2,99'
    : billingCycle === 'monthly'
    ? currentPlan.monthlyPrice.toFixed(2).replace('.', ',')
    : (currentPlan.yearlyPrice / 12).toFixed(2).replace('.', ',');

  const checkoutUrl = billingCycle === 'monthly' ? currentPlan.checkoutUrlMonthly : currentPlan.checkoutUrlYearly;

  const handleSimulatePayment = () => {
    if (checkoutUrl && !checkoutUrl.includes('exemplo-')) {
      window.open(checkoutUrl, '_blank');
      onClose();
    } else {
      // Quando os links reais da Kiwify forem adicionados nas variáveis de ambiente
      alert(`🔗 Redirecionando para o Checkout Seguro (${currentPlan.name}).\n\nApós a conclusão do pagamento, seu acesso será liberado automaticamente.`);
      if (checkoutUrl) {
        window.open(checkoutUrl, '_blank');
      }
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
        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 p-6 sm:p-7 text-white relative overflow-hidden text-center">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mx-auto mb-2 text-amber-300 shadow-md">
            <Crown className="w-6 h-6" />
          </div>

          <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-indigo-100 border border-white/10">
            Acesso Especial VIP
          </span>

          <h3 className="text-xl sm:text-2xl font-black mt-2">{reasonTitle}</h3>
          <p className="text-xs sm:text-sm text-indigo-100 mt-1 max-w-lg mx-auto">
            {reasonDescription}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 space-y-5">
          {/* Plan Switcher (Monthly vs Yearly) */}
          <div className="flex items-center justify-center gap-3">
            <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-3.5 py-1.5 rounded-lg transition cursor-pointer ${
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
                className={`px-3.5 py-1.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
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

          {/* 3 Plan Cards Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* TRIAL */}
            <div
              onClick={() => setSelectedPlanId('trial')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                selectedPlanId === 'trial'
                  ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-500/20 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs">Teste 7 Dias</span>
                  <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                    Degustação
                  </span>
                </div>
                <div className="mt-2">
                  <span className="text-xl font-black text-slate-900">R$ 2,99</span>
                  <span className="text-[10px] text-slate-500 font-medium"> /7 dias</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Taxa simbólica de teste.</p>
              </div>
            </div>

            {/* PRO */}
            <div
              onClick={() => setSelectedPlanId('pro')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                selectedPlanId === 'pro'
                  ? 'border-indigo-500 bg-indigo-50/50 ring-2 ring-indigo-500/20 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs">PRO Creator VIP</span>
                  <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700">
                    Mais Vendido
                  </span>
                </div>
                <div className="mt-2">
                  <span className="text-xl font-black text-slate-900">
                    R$ {billingCycle === 'monthly' ? '14,99' : '9,99'}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium"> /mês</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Ilimitado + Modelos de Vídeo.</p>
              </div>
            </div>

            {/* AGENCY */}
            <div
              onClick={() => setSelectedPlanId('agency')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                selectedPlanId === 'agency'
                  ? 'border-purple-500 bg-purple-50/50 ring-2 ring-purple-500/20 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs">Studio Master</span>
                  <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-purple-100 text-purple-700">
                    Comercial
                  </span>
                </div>
                <div className="mt-2">
                  <span className="text-xl font-black text-slate-900">
                    R$ {billingCycle === 'monthly' ? '29,99' : '19,99'}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium"> /mês</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Packs Bônus + Canais Dark.</p>
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
              <span>
                {isTrial
                  ? 'Ativar Teste 7 Dias (R$ 2,99)'
                  : `Assinar Agora (${billingCycle === 'monthly' ? `R$ ${price}/mês` : `R$ ${currentPlan.yearlyPrice.toFixed(2).replace('.', ',')}/ano`})`}
              </span>
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
