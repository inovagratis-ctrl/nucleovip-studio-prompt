import React, { useState, useEffect, useRef } from 'react';
import {
  Clapperboard,
  Sparkles,
  Play,
  Pause,
  Copy,
  Check,
  Download,
  Flame,
  TrendingUp,
  Tag,
  Film,
  Camera,
  RefreshCw,
  Volume2,
  VolumeX,
  Tv,
  Smartphone,
  ArrowRight,
  Maximize2,
  Wand2
} from 'lucide-react';
import type { VideoDarkProject, VideoFormat, VideoNiche, VideoTone, VideoScene } from '../../types';
import { generateDarkVideoProject, getSceneImageUrl, NICHE_LABELS, TONE_LABELS } from '../../services/videoDarkService';
import confetti from 'canvas-confetti';

interface VideoDarkStudioProps {
  onOpenUpgrade?: (title?: string, description?: string) => void;
}

export const VideoDarkStudio: React.FC<VideoDarkStudioProps> = () => {
  const [topic, setTopic] = useState('');
  const [format, setFormat] = useState<VideoFormat>('9:16');
  const [niche, setNiche] = useState<VideoNiche>('curiosidades');
  const [tone, setTone] = useState<VideoTone>('cinematic');
  const [isLoading, setIsLoading] = useState(false);
  const [project, setProject] = useState<VideoDarkProject | null>(null);

  // Player preview & TTS Audio state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  // Active view tab inside project results
  const [activeResultTab, setActiveResultTab] = useState<'storyboard' | 'script' | 'titles' | 'player'>('storyboard');

  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleGenerate = async () => {
    if (!topic.trim() || isLoading) return;
    setIsLoading(true);
    setIsPlaying(false);
    window.speechSynthesis?.cancel();
    setCurrentSceneIdx(0);

    try {
      const generated = await generateDarkVideoProject({
        topic,
        format,
        niche,
        tone,
      });

      setProject(generated);

      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#4F46E5', '#7C3AED', '#EC4899', '#06B6D4'],
        });
      } catch (e) {}
    } catch (err: any) {
      alert(err.message || 'Erro ao gerar projeto de vídeo.');
    } finally {
      setIsLoading(false);
    }
  };

  // Regenerar imagem de uma cena específica com nova seed
  const handleRegenerateSceneImage = (sceneNumber: number) => {
    if (!project) return;
    const newSeed = Math.floor(Math.random() * 1000000);
    const updatedScenes = project.scenes.map((s) => {
      if (s.sceneNumber === sceneNumber) {
        return {
          ...s,
          generatedImageUrl: getSceneImageUrl(s.visualPrompt, project.format, newSeed),
        };
      }
      return s;
    });
    setProject({ ...project, scenes: updatedScenes });
  };

  // TTS Voice Synthesis Function for Brazilian Portuguese
  const speakSceneNarration = (text: string) => {
    if (!isAudioEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.05; // ritmo natural de canal dark
    utterance.pitch = 0.95;

    // Tenta voz em português se disponível
    const voices = window.speechSynthesis.getVoices();
    const ptVoice = voices.find((v) => v.lang.includes('pt') || v.lang.includes('BR'));
    if (ptVoice) utterance.voice = ptVoice;

    speechSynthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  // Video Animator / Player Timer synchronized with Voice
  useEffect(() => {
    let timer: any = null;
    if (isPlaying && project && project.scenes.length > 0) {
      // Fala a narração da cena atual
      speakSceneNarration(project.scenes[currentSceneIdx]?.narration || '');

      timer = setTimeout(() => {
        if (currentSceneIdx >= project.scenes.length - 1) {
          setIsPlaying(false);
          window.speechSynthesis?.cancel();
          setCurrentSceneIdx(0);
        } else {
          setCurrentSceneIdx((prev) => prev + 1);
        }
      }, 5500); // 5.5s por cena no preview
    } else {
      window.speechSynthesis?.cancel();
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isPlaying, currentSceneIdx, project, isAudioEnabled]);

  const handleDownloadScript = () => {
    if (!project) return;
    const content = `🎬 NÚCLEO VIP — STUDIO PROMPT PRO
ESTRUTURA COMPLETA DE VÍDEO DARK & YOUTUBE
=====================================================
TEMA: ${project.topic}
FORMATO: ${project.format} (${project.format === '9:16' ? 'Shorts / Reels (9:16)' : 'Vídeo Longo YouTube (16:9)'})
NICHO: ${NICHE_LABELS[project.niche]}
TOM: ${TONE_LABELS[project.tone]}
DURAÇÃO ESTIMADA: ${project.estimatedDuration}
=====================================================

🎯 GANCHOS VIRAIS SUGERIDOS:
${project.hooks.map((h, i) => `[Opção ${i + 1}] ${h}`).join('\n')}

📈 TÍTULOS MAGNÉTICOS DE ALTO CTR:
${project.titles.map((t) => `[${t.ctrScore}% CTR] ${t.title} (Gatilhos: ${t.triggers.join(', ')})`).join('\n')}

🏷️ TAGS YOUTUBE:
${project.tags.join(', ')}

📝 DESCRIÇÃO:
${project.description}

=====================================================
🎙️ ROTEIRO NARRADO & CENAS CINEMATOGRÁFICAS
=====================================================

${project.scenes
  .map(
    (s) => `--- CENA ${s.sceneNumber} (${s.timeRange}) ---
[Movimento de Câmera]: ${s.cameraMovement}
[Roteiro de Voz]: ${s.narration}
[Prompt IA (${s.aspectRatio})]:
${s.visualPrompt}
`
  )
  .join('\n\n')}
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `video-dark-${project.topic.toLowerCase().replace(/[^a-z0-9]/g, '-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold shadow-2xs">
          <Clapperboard className="w-3.5 h-3.5 text-purple-600" />
          <span>YouTube Dark & Shorts Studio</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Gerador de <span className="gradient-text">Vídeos Dark & Virais</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
          Crie ganchos de alta retenção, roteiros narrados com voz sintetizada, títulos magnéticos de alto CTR e imagens cinematográficas instantâneas adaptadas para 9:16 ou 16:9.
        </p>
      </div>

      {/* Creation Box */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        {/* Step 1: Format Selector (9:16 vs 16:9) */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
            1. Escolha o Formato do Vídeo:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormat('9:16')}
              className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                format === '9:16'
                  ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-500/20 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className={`p-2.5 rounded-xl ${format === '9:16' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-slate-900 text-sm">Shorts / Reels / TikTok (9:16)</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Viral
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Vertical, 45-60s, ritmo dinâmico e enquadramento central.</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setFormat('16:9')}
              className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                format === '16:9'
                  ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-500/20 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className={`p-2.5 rounded-xl ${format === '16:9' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                <Tv className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-slate-900 text-sm">Vídeo Longo YouTube (16:9)</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                    Monetização
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Widescreen, 3 a 5 min, cinematografia em 3 atos.</p>
              </div>
            </button>
          </div>
        </div>

        {/* Step 2: Niche & Tone Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              2. Nicho do Canal Dark:
            </label>
            <select
              value={niche}
              onChange={(e) => setNiche(e.target.value as VideoNiche)}
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:border-indigo-500 transition"
            >
              {Object.entries(NICHE_LABELS).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              3. Tom da Narrativa & Voz:
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as VideoTone)}
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:border-indigo-500 transition"
            >
              {Object.entries(TONE_LABELS).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Step 3: Topic Input & Generate */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            4. Tema ou Personagem Central do Vídeo:
          </label>
          <div className="relative">
            <textarea
              rows={3}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Ex: Um cão pistoleiro solitário no velho oeste enfrentando um bando de coiotes no meio do deserto..."
              className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition resize-none leading-relaxed"
            />
          </div>
        </div>

        {/* Action Button */}
        <div>
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isLoading || !topic.trim()}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-black text-sm sm:text-base shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-3 transition transform active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Roteirizando e gerando imagens cinematográficas com IA...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>Gerar Vídeo Dark & Cenas em IA</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Generated Project Results */}
      {project && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden animate-fadeIn">
          {/* Top Bar with Project Info & Actions */}
          <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 via-indigo-50/40 to-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-indigo-800">
                  {project.format === '9:16' ? '📱 Formato 9:16 (Shorts)' : '🖥️ Formato 16:9 (Longo)'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">
                  {NICHE_LABELS[project.niche]}
                </span>
              </div>
              <h2 className="text-xl font-black text-slate-900 mt-1">{project.topic}</h2>
              <p className="text-xs text-slate-500 mt-0.5">Duração estimada: {project.estimatedDuration} • {project.scenes.length} Cenas Geradas</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleDownloadScript}
                className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-600 font-bold text-xs shadow-xs flex items-center gap-1.5 transition cursor-pointer"
              >
                <Download className="w-4 h-4 text-indigo-600" />
                <span>Baixar Roteiro (.TXT)</span>
              </button>
            </div>
          </div>

          {/* Results Navigation Tabs */}
          <div className="flex border-b border-slate-200 bg-slate-50/80 px-6 gap-2 overflow-x-auto text-xs font-bold">
            <button
              onClick={() => setActiveResultTab('storyboard')}
              className={`py-3.5 px-4 border-b-2 transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeResultTab === 'storyboard'
                  ? 'border-indigo-600 text-indigo-700 bg-white shadow-2xs'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Film className="w-4 h-4" />
              <span>🎬 Storyboard & Imagens ({project.scenes.length})</span>
            </button>

            <button
              onClick={() => setActiveResultTab('player')}
              className={`py-3.5 px-4 border-b-2 transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeResultTab === 'player'
                  ? 'border-indigo-600 text-indigo-700 bg-white shadow-2xs'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Play className="w-4 h-4 text-emerald-600" />
              <span>▶️ Prévia com Áudio & Locução</span>
            </button>

            <button
              onClick={() => setActiveResultTab('script')}
              className={`py-3.5 px-4 border-b-2 transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeResultTab === 'script'
                  ? 'border-indigo-600 text-indigo-700 bg-white shadow-2xs'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>🎙️ Roteiro de Voz Narrado</span>
            </button>

            <button
              onClick={() => setActiveResultTab('titles')}
              className={`py-3.5 px-4 border-b-2 transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeResultTab === 'titles'
                  ? 'border-indigo-600 text-indigo-700 bg-white shadow-2xs'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>📈 Ganchos & Títulos Alto CTR</span>
            </button>
          </div>

          {/* Tab 1: Storyboard & AI Prompts */}
          {activeResultTab === 'storyboard' && (
            <div className="p-6 space-y-6">
              {/* Viral Hook Highlight */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-3">
                <Flame className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-[11px] font-black uppercase tracking-wider text-amber-900">
                    Gancho de Retenção Recomendado (0:00 - 0:04):
                  </span>
                  <p className="text-sm font-semibold text-slate-800 italic">
                    "{project.hooks[0]}"
                  </p>
                </div>
              </div>

              {/* Grid of Scenes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.scenes.map((scene) => (
                  <div
                    key={scene.sceneNumber}
                    className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-indigo-200 hover:shadow-md transition space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      {/* Scene header */}
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-xs border border-indigo-100">
                          Cena {scene.sceneNumber} • {scene.timeRange}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                          <Camera className="w-3.5 h-3.5 text-slate-400" />
                          {scene.cameraMovement}
                        </span>
                      </div>

                      {/* Scene Image Preview */}
                      <div className={`relative rounded-2xl overflow-hidden bg-slate-900 group shadow-inner ${
                        project.format === '9:16' ? 'aspect-[9/16] max-h-80 mx-auto w-48' : 'aspect-video w-full'
                      }`}>
                        {scene.generatedImageUrl ? (
                          <img
                            src={scene.generatedImageUrl}
                            alt={`Cena ${scene.sceneNumber}`}
                            className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs">
                            Gerando imagem...
                          </div>
                        )}

                        {/* Top action badges on hover */}
                        <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition">
                          <button
                            type="button"
                            onClick={() => scene.generatedImageUrl && setFullscreenImage(scene.generatedImageUrl)}
                            className="p-1.5 rounded-lg bg-black/70 hover:bg-black text-white text-xs cursor-pointer"
                            title="Expandir imagem"
                          >
                            <Maximize2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRegenerateSceneImage(scene.sceneNumber)}
                            className="p-1.5 rounded-lg bg-indigo-600/80 hover:bg-indigo-600 text-white text-xs cursor-pointer flex items-center gap-1"
                            title="Regenerar variação desta cena"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Subtitle bar */}
                        <div className="absolute bottom-2 left-2 right-2 p-2 rounded-lg bg-slate-950/85 backdrop-blur-xs text-white text-[10px] line-clamp-2 leading-tight">
                          {scene.narration}
                        </div>
                      </div>

                      {/* Narration voice */}
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                          Texto Narrado:
                        </span>
                        <p className="text-xs text-slate-800 font-medium leading-relaxed">
                          "{scene.narration}"
                        </p>
                      </div>

                      {/* AI Prompt Box */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                            Prompt em Inglês ({project.format}):
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopy(scene.visualPrompt, `prompt-${scene.sceneNumber}`)}
                            className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                          >
                            {copiedKey === `prompt-${scene.sceneNumber}` ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="text-emerald-600">Copiado!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copiar</span>
                              </>
                            )}
                          </button>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-900 text-slate-100 text-[11px] font-mono leading-relaxed select-all">
                          {scene.visualPrompt}
                        </div>
                      </div>
                    </div>

                    {/* Quick Regenerate Button at Bottom */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => handleRegenerateSceneImage(scene.sceneNumber)}
                        className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Gerar Nova Variação da Imagem</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Interactive Video Simulator / Player WITH VOICE TTS */}
          {activeResultTab === 'player' && (
            <div className="p-6 space-y-6 text-center">
              <div className="max-w-md mx-auto space-y-2">
                <h3 className="font-bold text-slate-900 text-base">Simulador de Vídeo com Locução Neural</h3>
                <p className="text-xs text-slate-500">
                  Assista às cenas em sequência animada com a locução do roteiro falada em tempo real em Português!
                </p>
              </div>

              {/* Audio Toggle & Scene Indicators */}
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                    isAudioEnabled
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                      : 'bg-slate-100 border-slate-200 text-slate-500'
                  }`}
                >
                  {isAudioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  <span>{isAudioEnabled ? 'Áudio / Voz Ativada' : 'Áudio Mudo'}</span>
                </button>

                <div className="flex gap-1.5 items-center">
                  {project.scenes.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentSceneIdx(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        currentSceneIdx === idx ? 'bg-indigo-600 scale-125' : 'bg-slate-300 hover:bg-slate-400'
                      }`}
                      title={`Ir para cena ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Video Frame */}
              <div className="flex justify-center">
                <div
                  className={`relative rounded-3xl overflow-hidden bg-slate-950 border-4 border-slate-800 shadow-2xl transition-all ${
                    project.format === '9:16' ? 'w-80 h-[540px]' : 'w-full max-w-2xl aspect-video'
                  }`}
                >
                  {project.scenes[currentSceneIdx]?.generatedImageUrl && (
                    <img
                      key={project.scenes[currentSceneIdx].generatedImageUrl}
                      src={project.scenes[currentSceneIdx].generatedImageUrl}
                      alt="Cena atual"
                      className="w-full h-full object-cover transition-all duration-1000 transform scale-105"
                    />
                  )}

                  {/* Gradient Overlay for subtitles & badges */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/40 flex flex-col justify-between p-5">
                    {/* Top time & badge */}
                    <div className="flex items-center justify-between text-white text-[11px] font-bold">
                      <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-xs border border-white/10">
                        Cena {currentSceneIdx + 1} de {project.scenes.length} ({project.scenes[currentSceneIdx]?.timeRange})
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-red-600 font-black tracking-wider uppercase text-[10px] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        PREVIEW
                      </span>
                    </div>

                    {/* Subtitle narration bar */}
                    <div className="space-y-2 text-center pb-2">
                      <div className="inline-block px-4 py-2.5 rounded-2xl bg-black/85 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-bold shadow-2xl leading-relaxed">
                        "{project.scenes[currentSceneIdx]?.narration}"
                      </div>
                      <p className="text-[10px] text-amber-300 font-mono flex items-center justify-center gap-1">
                        <Camera className="w-3 h-3" />
                        {project.scenes[currentSceneIdx]?.cameraMovement}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setCurrentSceneIdx((prev) => (prev > 0 ? prev - 1 : project.scenes.length - 1));
                  }}
                  className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 text-slate-700 shadow-xs cursor-pointer font-bold text-xs"
                >
                  ◀ Cena Anterior
                </button>

                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white font-black text-sm shadow-xl shadow-indigo-500/25 flex items-center gap-2 cursor-pointer transition transform active:scale-95"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-white" />
                      <span>Pausar Vídeo</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-white" />
                      <span>Dar Play no Vídeo</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCurrentSceneIdx((prev) => (prev < project.scenes.length - 1 ? prev + 1 : 0));
                  }}
                  className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 text-slate-700 shadow-xs cursor-pointer font-bold text-xs"
                >
                  Próxima Cena ▶
                </button>
              </div>
            </div>
          )}

          {/* Tab 3: Full Voiceover Script */}
          {activeResultTab === 'script' && (
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Roteiro Completo para Locução / TTS</h3>
                  <p className="text-xs text-slate-500">Copie e cole direto no ElevenLabs, Clipchamp, CapCut ou leia na gravação.</p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    handleCopy(
                      project.scenes.map((s) => s.narration).join('\n\n'),
                      'full-script'
                    )
                  }
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedKey === 'full-script' ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Roteiro Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copiar Roteiro Integral</span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-4">
                {project.scenes.map((scene) => (
                  <div key={scene.sceneNumber} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex gap-4 items-start">
                    <div className="w-16 shrink-0 text-center">
                      <span className="block font-black text-xs text-indigo-700">CENA {scene.sceneNumber}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{scene.timeRange}</span>
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm text-slate-800 leading-relaxed font-medium">
                        {scene.narration}
                      </p>
                      <span className="text-[11px] text-slate-400 font-mono block">
                        Câmera: {scene.cameraMovement}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Viral Hooks & CTR Titles */}
          {activeResultTab === 'titles' && (
            <div className="p-6 space-y-8">
              {/* Hooks */}
              <div className="space-y-3">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-500" />
                  <span>3 Opções de Ganchos Virais (Primeiros 3 a 5 Segundos):</span>
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {project.hooks.map((hook, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-amber-200 text-amber-900 font-black text-xs flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <p className="text-sm font-semibold text-slate-800">
                          "{hook}"
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(hook, `hook-${idx}`)}
                        className="px-3 py-1.5 rounded-lg bg-white border border-amber-200 hover:border-amber-300 text-amber-800 text-xs font-bold cursor-pointer"
                      >
                        {copiedKey === `hook-${idx}` ? 'Copiado!' : 'Copiar'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTR Titles */}
              <div className="space-y-3">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>5 Sugestões de Títulos Magnéticos com Análise de CTR:</span>
                </h3>
                <div className="space-y-3">
                  {project.titles.map((titleOpt, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-black text-[11px]">
                            {titleOpt.ctrScore}% CTR Estimado
                          </span>
                          {titleOpt.triggers.map((trig, tIdx) => (
                            <span key={tIdx} className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[10px] font-bold">
                              {trig}
                            </span>
                          ))}
                        </div>
                        <p className="text-sm font-bold text-slate-900 mt-1">
                          {titleOpt.title}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(titleOpt.title, `title-${idx}`)}
                        className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-indigo-300 text-slate-700 text-xs font-bold cursor-pointer shrink-0 self-start sm:self-auto"
                      >
                        {copiedKey === `title-${idx}` ? 'Copiado!' : 'Copiar Título'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags and Description */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-indigo-600" />
                    Tags Otimizadas para YouTube:
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(project.tags.join(', '), 'tags')}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                  >
                    {copiedKey === 'tags' ? 'Tags Copiadas!' : 'Copiar Todas as Tags'}
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Fullscreen Image Modal */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md cursor-pointer animate-fadeIn"
          onClick={() => setFullscreenImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
            <img src={fullscreenImage} alt="Fullscreen" className="w-full h-full object-contain" />
            <button
              onClick={() => setFullscreenImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/70 text-white font-bold text-sm hover:bg-black transition"
            >
              ✕ Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
