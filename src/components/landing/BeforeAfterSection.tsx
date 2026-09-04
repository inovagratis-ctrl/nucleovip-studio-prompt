import React, { useState } from 'react';
import { Sparkles, ArrowRight, Wand2, Eye, Video, UserCheck, Flame } from 'lucide-react';

interface DemoCase {
  id: string;
  title: string;
  icon: any;
  badge: string;
  model: string;
  userIdea: string;
  engineeredPrompt: string;
  resultDescription: string;
  resultHighlights: string[];
}

const DEMO_CASES: DemoCase[] = [
  {
    id: 'thumbnail',
    title: 'Thumbnail de Alto CTR',
    icon: Flame,
    badge: 'YouTube & Canais Dark',
    model: 'ChatGPT Images (DALL-E 3)',
    userIdea: '"Homem assustado olhando para tela brilhante no escuro."',
    engineeredPrompt: 'Ultra-dramatic YouTube thumbnail composition, extreme close-up of a shocked young man with wide glowing eyes illuminated by an eerie blue monitor glow, pitch-black background with subtle smoke particles, bold high-contrast facial lighting, sharp focus on facial expression, hyper-expressive 3D cinematic style, vibrant saturation, 8k resolution, aspect ratio 16:9.',
    resultDescription: 'Thumbnail de altíssimo impacto visual que dispara a taxa de cliques (CTR) no YouTube.',
    resultHighlights: [
      'Contraste extremo para chamar atenção no feed',
      'Expressão facial hiper-realista e nítida',
      'Iluminação colorida volumétrica',
    ],
  },
  {
    id: 'character',
    title: 'Personagem Consistente',
    icon: UserCheck,
    badge: 'Consistência & Storytelling',
    model: 'Nano Banana (Flux / Midjourney)',
    userIdea: '"Guerreiro nórdico de barba ruiva com cicatriz no olho."',
    engineeredPrompt: 'Masterpiece character portrait: grizzled Nordic warrior, 38 years old, braided thick ginger beard, deep scar across left eye, pierced leather armor with bronze wolf pauldrons, intense gaze. Volumetric northern twilight lighting, soft rim light highlighting hair strands, shallow depth of field, 85mm portrait lens, photorealistic skin pores and textures, Unreal Engine 5 render, 8k.',
    resultDescription: 'Personagem com traços faciais e detalhes anatômicos perfeitamente estruturados para reutilização em várias cenas.',
    resultHighlights: [
      'Características faciais fixadas para continuidade',
      'Textura de pele e tecidos em nível 8K',
      'Iluminação de retrato cinematográfico 85mm',
    ],
  },
  {
    id: 'video',
    title: 'Vídeo Cinematográfico',
    icon: Video,
    badge: 'Veo / Kling / Seedance',
    model: 'Google Veo & Kling AI',
    userIdea: '"Drone sobrevoando cidade cyberpunk na chuva."',
    engineeredPrompt: 'Cinematic continuous drone flyover shot: gliding smoothly between towering futuristic skyscrapers in a rain-drenched cyberpunk metropolis at night. Giant neon holographic advertisements cast vivid reflections on wet asphalt below. Fast camera descent, dynamic motion blur, atmospheric fog, photorealistic octane render, 60fps fluid motion.',
    resultDescription: 'Prompt com dinâmica de movimento, direção de câmera e taxa de quadros calibrada para IA de vídeo.',
    resultHighlights: [
      'Instruções de física e movimento de câmera',
      'Reflexos de luz na chuva com motion blur',
      'Taxa de fluidez calibrada para geradores de vídeo',
    ],
  },
];

export const BeforeAfterSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('thumbnail');
  const activeCase = DEMO_CASES.find((c) => c.id === activeTab) || DEMO_CASES[0];

  return (
    <section className="py-20 sm:py-28 relative bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3.5 py-1 rounded-full border border-indigo-200 inline-flex items-center gap-1.5 shadow-2xs">
            <Eye className="w-3.5 h-3.5 text-indigo-600" />
            Demonstração Real
          </span>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Veja a Transformação em 3 Etapas
          </h2>

          <p className="text-slate-600 text-sm sm:text-base">
            Veja como uma ideia simples do usuário é transformada em engenharia de alta fidelidade para gerar imagens e vídeos perfeitos.
          </p>

          {/* Tab selector */}
          <div className="pt-4 flex items-center justify-center gap-2 flex-wrap">
            {DEMO_CASES.map((c) => {
              const Icon = c.icon;
              const isSelected = activeTab === c.id;

              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveTab(c.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{c.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3-Column Demonstration Table (Manus.ai Spec) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Column 1: Entrada (Ideia Simples) */}
          <div className="lg:col-span-3 bg-slate-50 p-6 rounded-3xl border border-slate-200 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  1. Entrada do Usuário
                </span>
                <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-full">
                  Ideia Bruta
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-800 font-medium text-sm leading-relaxed shadow-xs min-h-[120px] flex items-center">
                {activeCase.userIdea}
              </div>
            </div>

            <div className="text-[11px] text-slate-500 leading-relaxed border-t border-slate-200/80 pt-3">
              ❌ Prompts comuns geram imagens genéricas e sem profundidade.
            </div>
          </div>

          {/* Arrow Separator on Desktop */}
          <div className="hidden lg:flex lg:col-span-1 items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-2xs">
              <Wand2 className="w-5 h-5" />
            </div>
          </div>

          {/* Column 2: Engenharia (Prompt Adaptado) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-indigo-50/80 via-white to-white p-6 sm:p-7 rounded-3xl border-2 border-indigo-500 shadow-xl flex flex-col justify-between space-y-4 relative">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span className="text-xs font-black uppercase tracking-wider text-indigo-700">
                    2. Engenharia Studio Prompt Pro
                  </span>
                </div>
                <span className="text-[10px] bg-indigo-600 text-white font-bold px-2 py-0.5 rounded-full">
                  {activeCase.model}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs leading-relaxed shadow-inner select-all min-h-[140px]">
                {activeCase.engineeredPrompt}
              </div>
            </div>

            <div className="text-[11px] font-bold text-indigo-700 border-t border-indigo-100 pt-3 flex items-center justify-between">
              <span>⚡ Calibrado para o modelo</span>
              <span className="text-[10px] bg-indigo-100 px-2 py-0.5 rounded font-mono">Copiar com 1 clique</span>
            </div>
          </div>

          {/* Column 3: Resultado (O que o cliente recebe) */}
          <div className="lg:col-span-3 bg-slate-900 text-white p-6 rounded-3xl shadow-xl flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                  3. Resultado na IA
                </span>
                <span className="text-[10px] bg-white/10 text-slate-200 font-bold px-2 py-0.5 rounded-full">
                  {activeCase.badge}
                </span>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed min-h-[60px]">
                {activeCase.resultDescription}
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Garantias Técnicas:
                </span>
                {activeCase.resultHighlights.map((hl, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-[11px] text-amber-300 font-medium border-t border-slate-800 pt-3">
              ✨ Pronto para publicação e vendas
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

