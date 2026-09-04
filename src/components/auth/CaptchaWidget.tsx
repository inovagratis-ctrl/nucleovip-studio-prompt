import React, { useState } from 'react';
import { ShieldCheck, Check, RefreshCw } from 'lucide-react';

interface CaptchaWidgetProps {
  onVerified: (isVerified: boolean) => void;
  isVerified: boolean;
}

export const CaptchaWidget: React.FC<CaptchaWidgetProps> = ({ onVerified, isVerified }) => {
  const [isVerifying, setIsVerifying] = useState(false);

  const handleClick = () => {
    if (isVerified || isVerifying) return;
    setIsVerifying(true);

    // Simula validação de telemetria / análise anti-bot (500ms)
    setTimeout(() => {
      setIsVerifying(false);
      onVerified(true);
    }, 600);
  };

  return (
    <div
      onClick={handleClick}
      className={`p-3 rounded-2xl border transition-all select-none cursor-pointer flex items-center justify-between ${
        isVerified
          ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900 shadow-2xs'
          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
      }`}
    >
      <div className="flex items-center gap-3">
        {/* Checkbox button */}
        <div
          className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${
            isVerified
              ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
              : isVerifying
              ? 'bg-white border-indigo-400'
              : 'bg-white border-slate-300 hover:border-slate-400'
          }`}
        >
          {isVerified ? (
            <Check className="w-4 h-4 stroke-[3]" />
          ) : isVerifying ? (
            <RefreshCw className="w-3.5 h-3.5 text-indigo-600 animate-spin" />
          ) : null}
        </div>

        <div>
          <span className="text-xs font-bold block">
            {isVerified ? 'Verificação concluída' : 'Não sou um robô'}
          </span>
          <span className="text-[10px] text-slate-500 font-medium block">
            {isVerified ? 'Humano verificado com sucesso' : 'Clique para verificação de segurança'}
          </span>
        </div>
      </div>

      {/* Security Badge */}
      <div className="flex flex-col items-end text-slate-400 pr-1">
        <ShieldCheck className={`w-4 h-4 ${isVerified ? 'text-emerald-600' : 'text-slate-400'}`} />
        <span className="text-[9px] font-bold tracking-tight text-slate-400 mt-0.5">Anti-Bot Shield</span>
      </div>
    </div>
  );
};
