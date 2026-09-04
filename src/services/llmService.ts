import type { AIModelType, CategoryType, GeneratedPromptResult } from '../types';
import { buildEngineeredPrompt, optimizeExistingPrompt, refinePromptWithInstruction, AI_MODELS } from './promptEngine';

export interface GenerationRequest {
  idea: string;
  category: CategoryType;
  model: AIModelType;
}

const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

// Chamada direta à API do Google Gemini
async function callGeminiApi(systemPrompt: string, userMessage: string): Promise<string> {
  if (!geminiApiKey || geminiApiKey.startsWith('AQ.') === false && geminiApiKey.length < 20) {
    throw new Error('Chave do Gemini não configurada.');
  }

  // Tenta Gemini 1.5 Flash ou Gemini 2.0 Flash
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`;

  const payload = {
    contents: [
      {
        role: 'user',
        parts: [
          { text: `${systemPrompt}\n\nENTRADA DO USUÁRIO:\n${userMessage}` }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 800,
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `Erro HTTP ${response.status} na API do Gemini`);
  }

  const data = await response.json();
  const textOutput = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!textOutput) {
    throw new Error('Resposta vazia da API do Gemini.');
  }

  return textOutput.trim();
}

// Gerador Principal usando Gemini AI ao vivo com fallback inteligente
export async function generateStudioPrompt(req: GenerationRequest): Promise<GeneratedPromptResult> {
  if (!req.idea || req.idea.trim().length < 3) {
    throw new Error('Por favor, descreva sua ideia com pelo menos 3 caracteres.');
  }

  const targetModelInfo = AI_MODELS.find(m => m.id === req.model);
  const engineOutput = buildEngineeredPrompt(req.idea, req.category, req.model);

  let finalPrompt = engineOutput.prompt;

  if (geminiApiKey) {
    try {
      const systemInstruction = `Você é um Diretor de Fotografia e Engenheiro Especialista em Prompts para Inteligência Artificial (Studio Prompt Pro).
Sua tarefa é converter a ideia do usuário em um prompt cinematográfico em INGLÊS, altamente detalhado, profissional e calibrado especificamente para o motor: ${targetModelInfo?.name} (${targetModelInfo?.badge}).
Categoria de criação: ${req.category}.

Diretrizes obrigatórias:
1. Retorne APENAS o texto final do prompt em inglês (sem introduções, sem aspas externas, sem explicações).
2. Inclua detalhes de iluminação volumétrica, lente de câmera (ex: 35mm, 85mm anamorphic), composição, paleta de cores e atmosfera.
3. Se o modelo for de vídeo (Veo, Kling, Seedance), adicione direção de movimento de câmera e física.
4. Se o modelo for de imagem (ChatGPT, Nano Banana/Flux), adicione tags de alta fidelidade e enquadramento.`;

      const geminiResult = await callGeminiApi(systemInstruction, req.idea);
      if (geminiResult && geminiResult.length > 20) {
        // Limpa possíveis aspas externas
        finalPrompt = geminiResult.replace(/^["']|["']$/g, '').trim();
      }
    } catch (e: any) {
      console.warn('Usando motor local de prompt engineering (Gemini fallback):', e.message);
    }
  } else {
    await new Promise((resolve) => setTimeout(resolve, 600));
  }

  const result: GeneratedPromptResult = {
    id: `ps-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    timestamp: Date.now(),
    originalIdea: req.idea.trim(),
    category: req.category,
    model: req.model,
    optimizedPrompt: finalPrompt,
    recommendations: engineOutput.recommendations,
    breakdown: engineOutput.breakdown
  };

  return result;
}

export async function optimizeExistingPromptService(
  existingPrompt: string,
  model: AIModelType,
  category: CategoryType
): Promise<{ original: string; optimized: string; improvements: string[] }> {
  if (!existingPrompt || existingPrompt.trim().length < 4) {
    throw new Error('Forneça um prompt válido para otimização.');
  }

  const baseResult = optimizeExistingPrompt(existingPrompt, model, category);
  let optimized = baseResult.optimized;

  if (geminiApiKey) {
    try {
      const systemInstruction = `Você é o otimizador do Studio Prompt Pro. Reescreva e aprimore o prompt a seguir em INGLÊS com detalhes técnicos de iluminação, lentes e pós-processamento para o modelo ${model}. Retorne APENAS o prompt final otimizado.`;
      const geminiRes = await callGeminiApi(systemInstruction, existingPrompt);
      if (geminiRes && geminiRes.length > 20) {
        optimized = geminiRes.replace(/^["']|["']$/g, '').trim();
      }
    } catch (e) {
      console.warn('Fallback para otimizador local:', e);
    }
  } else {
    await new Promise((resolve) => setTimeout(resolve, 600));
  }

  return {
    original: existingPrompt,
    optimized,
    improvements: baseResult.improvements
  };
}

export async function refinePromptService(
  currentPrompt: string,
  instruction: string,
  model: AIModelType
): Promise<string> {
  if (!instruction || instruction.trim().length < 2) {
    throw new Error('Digite uma instrução de refinamento válida.');
  }

  if (geminiApiKey) {
    try {
      const systemInstruction = `Você é o assistente de refinamento do Studio Prompt Pro.
Receba o prompt atual e a instrução de alteração do usuário.
Modifique o prompt em INGLÊS incorporando a instrução, mas PRESERVANDO todo o restante da cena, personagem e estilo.
Retorne APENAS o prompt final modificado.`;
      
      const userMessage = `PROMPT ATUAL:\n${currentPrompt}\n\nINSTRUÇÃO DE AJUSTE:\n${instruction}`;
      const refined = await callGeminiApi(systemInstruction, userMessage);
      if (refined && refined.length > 20) {
        return refined.replace(/^["']|["']$/g, '').trim();
      }
    } catch (e) {
      console.warn('Fallback para refinador local:', e);
    }
  } else {
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  return refinePromptWithInstruction(currentPrompt, instruction, model);
}
