import React, { useState } from 'react';
import { CheckCircle2, Zap, Shield, ArrowRight } from 'lucide-react';
import { PLANS_CONFIG, type PlanPricing } from '../../config/plans';

interface PricingSectionProps {
  onNavigateToSignup: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onNavigateToSignup }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const handlePlanCheckout = (plan: PlanPricing) => {
    const checkoutUrl = billingCycle === 'monthly' ? plan.checkoutUrlMonthly : plan.checkoutUrlYearly;
    if (checkoutUrl && !checkoutUrl.includes('exemplo-')) {
      window.open(checkoutUrl, '_blank');
    } else {
      if (checkoutUrl) {
        window.open(checkoutUrl, '_blank');
      } else {
        onNavigateToSignup();
      }
    }
  };

  return (
    <section id="planos" className="py-20 sm:py-28 bg-white relative overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3.5 py-1 rounded-full border border-indigo-100">
            Planos & Preços
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Invista no seu poder criativo com IA
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Escolha o plano ideal para suas produções. Acesso imediato e cancelamento a qualquer momento com garantia incondicional.
          </p>

          {/* Billing Switcher */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center border border-slate-200 text-xs font-bold shadow-2xs">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2.5 rounded-xl transition cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Cobrança Mensal
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('yearly')}
                className={`px-5 py-2.5 rounded-xl transition flex items-center gap-2 cursor-pointer ${
                  billingCycle === 'yearly'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Cobrança Anual</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-black">
                  Economize 33%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {PLANS_CONFIG.map((plan) => {
            const isPro = plan.id === 'pro';
            const isStarter = plan.id === 'trial';
            const price = billingCycle === 'monthly'
              ? plan.monthlyPrice.toFixed(2).replace('.', ',')
              : (plan.yearlyPrice / 12).toFixed(2).replace('.', ',');

            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  isPro
                    ? 'bg-gradient-to-b from-indigo-50/90 via-white to-white border-2 border-indigo-500 shadow-2xl scale-100 lg:scale-105 z-10'
                    : isStarter
                    ? 'bg-gradient-to-b from-amber-50/40 via-white to-white border-2 border-amber-300 shadow-md'
                    : 'bg-slate-50 border border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-md'
                }`}
              >
                {/* Popular / Special Badge */}
                {plan.badge && (
                  <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-white text-[11px] font-black uppercase tracking-wider shadow-md ${
                    isPro
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600'
                      : isStarter
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                      : 'bg-slate-800'
                  }`}>
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-black text-slate-900">{plan.name}</h3>
                  </div>

                  <p className="text-xs text-slate-500 min-h-[36px] leading-relaxed mb-6">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6 pb-6 border-b border-slate-200/80">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-slate-900">
                        R$ {price}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        /mês
                      </span>
                    </div>
                    {billingCycle === 'yearly' && plan.yearlyPrice > 0 ? (
                      <p className="text-[11px] font-bold text-indigo-700 mt-1">
                        Faturado anualmente por R$ {plan.yearlyPrice.toFixed(2).replace('.', ',')}
                      </p>
                    ) : (
                      <p className="text-[11px] font-bold text-slate-500 mt-1">
                        Cobrança mensal sem fidelidade
                      </p>
                    )}
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 mb-8">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      O que está incluído:
                    </span>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${
                          isStarter ? 'text-amber-600' : 'text-emerald-600'
                        }`} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action CTA */}
                <div>
                  <button
                    type="button"
                    onClick={() => handlePlanCheckout(plan)}
                    className={`w-full py-3.5 px-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      isPro
                        ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                        : isStarter
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white shadow-lg shadow-amber-500/20'
                        : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-300'
                    }`}
                  >
                    {isStarter ? (
                      <>
                        <Zap className="w-4 h-4 text-white fill-white" />
                        <span>Assinar Starter VIP (R$ {price}/mês)</span>
                      </>
                    ) : isPro ? (
                      <>
                        <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                        <span>Assinar PRO Creator VIP</span>
                      </>
                    ) : (
                      <>
                        <span>Assinar Studio Master</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Transparency Box */}
        <div className="mt-12 max-w-3xl mx-auto p-6 rounded-3xl bg-slate-50 border border-slate-200 text-center space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Transparência & Condições de Assinatura:
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Tenha acesso completo ao Studio Prompt Pro a partir de apenas <strong>R$ 5,99/mês</strong>. Sem multas, sem taxas ocultas e com total liberdade para cancelar a qualquer momento diretamente pelo painel com apenas 1 clique.
          </p>
        </div>

        {/* Security and Guarantees */}
        <div className="mt-16 text-center flex items-center justify-center gap-6 text-xs text-slate-500 font-medium flex-wrap">
          <span className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-emerald-600" />
            Pagamento 100% Seguro e Criptografado
          </span>
          <span>•</span>
          <span>Garantia incondicional de 7 dias</span>
          <span>•</span>
          <span>Acesso imediato liberado após o pagamento</span>
        </div>
      </div>
    </section>
  );
};
