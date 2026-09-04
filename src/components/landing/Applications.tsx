import React from 'react';
import { Layout, User, Image, Video, CheckCircle2 } from 'lucide-react';

export const Applications: React.FC = () => {
  const apps = [
    {
      title: 'Thumbnails',
      description: 'Prompts estruturados para criar imagens de alto impacto visual para YouTube.',
      icon: <Layout className="w-6 h-6 text-amber-600" />,
      bgIcon: 'bg-amber-50 border-amber-200/60',
      features: [
        'Separação de planos e contraste agressivo',
        'Expressões faciais dramáticas para CTR elevado',
        'Espaço dedicado para tipografia e grafismos'
      ],
      tag: 'YouTube & Social'
    },
    {
      title: 'Personagens',
      description: 'Prompts detalhados para definir aparência, roupas, estilo visual, iluminação e características de personagens.',
      icon: <User className="w-6 h-6 text-indigo-600" />,
      bgIcon: 'bg-indigo-50 border-indigo-200/60',
      features: [
        'Anatomia precisa e texturas de pele/cabelo',
        'Consistência estética para múltiplas gerações',
        'Iluminação de estúdio (Rembrandt, Ring light)'
      ],
      tag: 'Consistência & Conceito'
    },
    {
      title: 'Cenas',
      description: 'Prompts para criação de ambientes, composições cinematográficas e storytelling visual.',
      icon: <Image className="w-6 h-6 text-purple-600" />,
      bgIcon: 'bg-purple-50 border-purple-200/60',
      features: [
        'Worldbuilding épico e atmosférico',
        'Lentes cine (24mm anamórfica, 35mm, 85mm)',
        'Iluminação volumétrica e profundidade de campo'
      ],
      tag: 'Cinematografia'
    },
    {
      title: 'Vídeos',
      description: 'Prompts especializados para geração de vídeos considerando ação, ambiente, enquadramento, movimento de câmera, atmosfera e outros elementos relevantes.',
      icon: <Video className="w-6 h-6 text-cyan-600" />,
      bgIcon: 'bg-cyan-50 border-cyan-200/60',
      features: [
        'Controle de dinâmica de câmera (dolly, pan, orbit)',
        'Continuidade temporal e física realista',
        'Ritmo e ambiência calibrados para geradores de vídeo'
      ],
      tag: 'IA de Vídeo (Veo/Kling)'
    }
  ];

  return (
    <section id="aplicacoes" className="py-20 sm:py-28 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3.5 py-1 rounded-full border border-purple-100">
            Aplicações Criativas
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            O que você pode criar com o Studio Prompt Pro
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Especializações exclusivas pensadas especificamente para criadores de conteúdo, cineastas e designers.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {apps.map((app, idx) => (
            <div
              key={idx}
              className="bg-slate-50 p-6 rounded-3xl border border-slate-200/80 hover:bg-white hover:border-indigo-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl ${app.bgIcon} border flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs`}>
                    {app.icon}
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">
                    {app.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">{app.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {app.description}
                </p>

                <div className="space-y-2 pt-4 border-t border-slate-200/60">
                  {app.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
