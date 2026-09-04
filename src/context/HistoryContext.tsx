import React, { createContext, useContext, useState, useEffect } from 'react';
import type { GeneratedPromptResult } from '../types';
import { supabase, isSupabaseConfigured } from '../services/supabaseClient';

interface HistoryContextType {
  history: GeneratedPromptResult[];
  addToHistory: (item: GeneratedPromptResult) => void;
  removeFromHistory: (id: string) => void;
  clearHistory: () => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

const HISTORY_STORAGE_KEY = 'prompt_studio_history_items';

export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<GeneratedPromptResult[]>([]);

  useEffect(() => {
    // 1. Carregar local primeiro para resposta instantânea
    try {
      const saved = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Erro ao ler histórico local:', e);
    }

    // 2. Se o Supabase estiver configurado e o usuário logado, sincronizar com o banco
    if (isSupabaseConfigured && supabase) {
      const client = supabase;
      client.auth.getUser().then(({ data: { user } }) => {
        if (user) {
          client
            .from('prompts_history')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(30)
            .then(({ data, error }) => {
              if (!error && data && data.length > 0) {
                const cloudItems: GeneratedPromptResult[] = data.map((d: any) => ({
                  id: d.id,
                  timestamp: new Date(d.created_at).getTime(),
                  originalIdea: d.original_idea,
                  category: d.category,
                  model: d.model,
                  optimizedPrompt: d.optimized_prompt,
                  recommendations: d.recommendations || { aspectRatio: '16:9' },
                  breakdown: d.breakdown || {
                    subject: '',
                    environment: '',
                    compositionAndLighting: '',
                    styleAndAtmosphere: '',
                    technicalSettings: '',
                  },
                }));
                setHistory(cloudItems);
                localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(cloudItems));
              }
            });
        }
      });
    }
  }, []);

  const addToHistory = (item: GeneratedPromptResult) => {
    setHistory((prev) => {
      const filtered = prev.filter((p) => p.id !== item.id);
      const updated = [item, ...filtered].slice(0, 30);
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });

    // Sincronizar com o Supabase na nuvem se autenticado
    if (isSupabaseConfigured && supabase) {
      const client = supabase;
      client.auth.getUser().then(({ data: { user } }) => {
        if (user) {
          client.from('prompts_history').insert({
            user_id: user.id,
            category: item.category,
            model: item.model,
            original_idea: item.originalIdea,
            optimized_prompt: item.optimizedPrompt,
            recommendations: item.recommendations,
            breakdown: item.breakdown,
          }).then(({ error }) => {
            if (error) {
              console.warn('Nota: Se a tabela prompts_history ainda não foi criada no Supabase, o histórico permanece salvo localmente.', error.message);
            }
          });
        }
      });
    }
  };

  const removeFromHistory = (id: string) => {
    setHistory((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });

    if (isSupabaseConfigured && supabase) {
      supabase.from('prompts_history').delete().eq('id', id).then();
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_STORAGE_KEY);
  };

  return (
    <HistoryContext.Provider
      value={{
        history,
        addToHistory,
        removeFromHistory,
        clearHistory,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistory deve ser usado dentro de um HistoryProvider');
  }
  return context;
};
