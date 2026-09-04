import React, { useState, useEffect } from 'react';
import { AppNavbar } from './AppNavbar';
import { CategorySelector } from './CategorySelector';
import { AIModelSelector } from './AIModelSelector';
import { IdeaInput } from './IdeaInput';
import { ResultCard } from './ResultCard';
import { RefinementBox } from './RefinementBox';
import { OptimizePromptTool } from './OptimizePromptTool';
import { ComparativeMode } from './ComparativeMode';
import { VideoDarkStudio } from './VideoDarkStudio';
import { MembersHub } from './MembersHub';
import { HistoryDrawer } from './HistoryDrawer';
import { UpgradeModal } from './UpgradeModal';
import type { ActiveTab, AIModelType, CategoryType, GeneratedPromptResult } from '../../types';
import { generateStudioPrompt, refinePromptService } from '../../services/llmService';
import { useHistory } from '../../context/HistoryContext';
import { useAuth } from '../../context/AuthContext';
import confetti from 'canvas-confetti';

export const StudioPromptProApp: React.FC = () => {
  const { history, addToHistory } = useHistory();
  const { canGenerate, incrementGenerationCount } = useAuth();
  const [activeTab, setActiveTab] = useState<ActiveTab>(() => {
    // Se acabou de vir da Cakto, abre direto na Área de Membros
    if (localStorage.getItem('prompt_studio_just_purchased')) {
      return 'members';
    }
    return 'generate';
  });
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [upgradeReason, setUpgradeReason] = useState({ title: '', description: '' });
  const [justPurchasedPlan, setJustPurchasedPlan] = useState<string | null>(null);

  // Efeito de celebração pós-compra
  useEffect(() => {
    const purchased = localStorage.getItem('prompt_studio_just_purchased');
    if (purchased) {
      setJustPurchasedPlan(purchased);
      localStorage.removeItem('prompt_studio_just_purchased');
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#4F46E5', '#10B981', '#F59E0B', '#EC4899'],
        });
      } catch (e) {
        // Confetti
      }
    }
  }, []);

  // Generator state
  const [category, setCategory] = useState<CategoryType>('thumbnail');
  const [model, setModel] = useState<AIModelType>('chatgpt');
  const [idea, setIdea] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState<GeneratedPromptResult | null>(null);
  const [isRefining, setIsRefining] = useState(false);

  const handleOpenUpgrade = (title?: string, description?: string) => {
    setUpgradeReason({
      title: title || 'Desbloqueie o Poder Ilimitado do Studio Prompt Pro',
      description: description || 'Gerações infinitas, acesso total a modelos de vídeo e modo comparativo sem restrições.',
    });
    setIsUpgradeModalOpen(true);
  };

  const handleGenerate = async () => {
    if (!idea.trim() || isLoading) return;

    if (!canGenerate()) {
      handleOpenUpgrade(
        'Limite do Período de Teste Atingido',
        'Você usou seu limite de prompts diários do plano de teste. Faça upgrade para o PRO Creator VIP ou Studio Master para ter gerações ilimitadas sem restrições!'
      );
      return;
    }

    setIsLoading(true);

    try {
      const result = await generateStudioPrompt({
        idea,
        category,
        model,
      });

      setCurrentResult(result);
      addToHistory(result);
      incrementGenerationCount();

      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#4F46E5', '#06B6D4', '#7C3AED'],
        });
      } catch (e) {
        // Confetti opcional
      }
    } catch (err: any) {
      alert(err.message || 'Erro ao gerar prompt.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefine = async (instruction: string) => {
    if (!currentResult || isRefining) return;
    setIsRefining(true);

    try {
      const refinedText = await refinePromptService(
        currentResult.optimizedPrompt,
        instruction,
        currentResult.model
      );

      const updatedResult: GeneratedPromptResult = {
        ...currentResult,
        optimizedPrompt: refinedText,
        id: `ref-${Date.now()}`,
      };

      setCurrentResult(updatedResult);
      addToHistory(updatedResult);
    } catch (err: any) {
      alert(err.message || 'Erro ao refinar prompt.');
    } finally {
      setIsRefining(false);
    }
  };

  const handleSelectHistoryPrompt = (item: GeneratedPromptResult) => {
    setActiveTab('generate');
    setCategory(item.category);
    setModel(item.model);
    setIdea(item.originalIdea);
    setCurrentResult(item);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-indigo-500 selection:text-white pb-24">
      {/* Navigation */}
      <AppNavbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onToggleHistory={() => setIsHistoryOpen(true)}
        onOpenUpgrade={() => handleOpenUpgrade()}
        historyCount={history.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        {justPurchasedPlan && (
          <div className="mb-8 p-6 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shrink-0">
                🎉
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black tracking-tight">
                  Parabéns! Seu Plano {justPurchasedPlan === 'agency' ? 'Studio Master' : justPurchasedPlan === 'pro' ? 'PRO Creator VIP' : 'Starter VIP'} está 100% Liberado!
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100 mt-0.5">
                  Seu pagamento foi confirmado com sucesso pela Cakto. Todos os recursos, packs e ferramentas já estão desbloqueados.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setJustPurchasedPlan(null)}
              className="px-4 py-2 rounded-xl bg-white text-emerald-800 text-xs font-bold hover:bg-emerald-50 transition cursor-pointer shrink-0 shadow-sm"
            >
              Começar Agora
            </button>
          </div>
        )}
        {activeTab === 'generate' && (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header / Intro */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Núcleo VIP • <span className="gradient-text">Studio Prompt Pro</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
                Engenharia de prompts avançada para Thumbnails, Personagens, Cenas e Vídeos com inteligência adaptativa por modelo.
              </p>
            </div>

            {/* Form Steps in Light Theme */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 space-y-8 shadow-xl">
              <CategorySelector
                selectedCategory={category}
                onSelectCategory={setCategory}
              />

              <AIModelSelector
                selectedModel={model}
                onSelectModel={setModel}
              />

              <IdeaInput
                idea={idea}
                onChangeIdea={setIdea}
                onGenerate={handleGenerate}
                isLoading={isLoading}
              />
            </div>

            {/* Result Area */}
            {currentResult && (
              <div className="space-y-6">
                <ResultCard
                  result={currentResult}
                  onRefinePrompt={handleRefine}
                  isRefining={isRefining}
                />

                <RefinementBox
                  onRefine={handleRefine}
                  isRefining={isRefining}
                />
              </div>
            )}
          </div>
        )}

        {activeTab === 'optimize' && <OptimizePromptTool />}

        {activeTab === 'compare' && <ComparativeMode />}

        {activeTab === 'videodark' && (
          <VideoDarkStudio onOpenUpgrade={(t, d) => handleOpenUpgrade(t, d)} />
        )}

        {activeTab === 'members' && (
          <MembersHub onOpenUpgrade={(t, d) => handleOpenUpgrade(t, d)} />
        )}
      </main>

      {/* History Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onSelectPrompt={handleSelectHistoryPrompt}
      />

      {/* Upgrade / Monetization Modal */}
      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        reasonTitle={upgradeReason.title}
        reasonDescription={upgradeReason.description}
      />
    </div>
  );
};
