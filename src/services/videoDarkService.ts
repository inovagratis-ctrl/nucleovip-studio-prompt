import type { VideoDarkProject, VideoFormat, VideoNiche, VideoTone, VideoScene, VideoTitleOption } from '../types';

const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

interface GenerateVideoDarkParams {
  topic: string;
  format: VideoFormat;
  niche: VideoNiche;
  tone: VideoTone;
}

export const NICHE_LABELS: Record<VideoNiche, string> = {
  curiosidades: 'Curiosidades & Fatos Inacreditáveis',
  misterio: 'Mistérios & Casos Não Resolvidos',
  historia: 'História & Impérios Antigos',
  tecnologia: 'Futuro, IA & Tecnologia',
  financas: 'Finanças, Riqueza & Mentalidade',
  espaco: 'Espaço Sideral, Astronomia & Cosmos',
  ficcao: 'Ficção Científica & Universos Paralelos',
  truecrime: 'True Crime & Psicologia Sombria',
};

export const TONE_LABELS: Record<VideoTone, string> = {
  cinematic: 'Cinematográfico & Épico (Voz Imponente)',
  suspense: 'Suspense & Tensão (Voz Misteriosa)',
  energetic: 'Viral & Alto Impacto (Dinâmico)',
  educational: 'Fascinante & Educativo (Voz Clara)',
  dramatic: 'Dramático & Emocionante (Profundo)',
};

export function getSceneImageUrl(prompt: string, format: VideoFormat, seed?: number): string {
  const cleanPrompt = encodeURIComponent(
    `${prompt}, ultra cinematic, photorealistic, 8k resolution, cinematic lighting, master masterpiece`
  );
  const width = format === '9:16' ? 576 : 1024;
  const height = format === '9:16' ? 1024 : 576;
  const randomSeed = seed || Math.floor(Math.random() * 100000);
  return `https://image.pollinations.ai/prompt/${cleanPrompt}?width=${width}&height=${height}&seed=${randomSeed}&nologo=true&model=flux`;
}

async function callGeminiApiJson(prompt: string): Promise<any> {
  if (!geminiApiKey || (geminiApiKey.startsWith('AQ.') === false && geminiApiKey.length < 20)) {
    throw new Error('Chave do Gemini não configurada.');
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`;

  const payload = {
    contents: [
      {
        role: 'user',
        parts: [{ text: prompt }]
      }
    ],
    generationConfig: {
      temperature: 0.8,
      maxOutputTokens: 2048,
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
    throw new Error(`Erro na API Gemini: ${response.status}`);
  }

  const data = await response.json();
  const textOutput = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!textOutput) {
    throw new Error('Resposta vazia da API do Gemini.');
  }

  const jsonMatch = textOutput.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }
  return JSON.parse(textOutput);
}

export async function generateDarkVideoProject(params: GenerateVideoDarkParams): Promise<VideoDarkProject> {
  const { topic, format, niche, tone } = params;
  const isShort = format === '9:16';
  const targetDuration = isShort ? '45-60 segundos (Short/Reel)' : '3 a 5 minutos (Vídeo Longo YouTube)';
  const sceneCount = isShort ? 6 : 8;

  if (geminiApiKey) {
    try {
      const prompt = `Você é um roteirista profissional de canais Dark do YouTube.
Gere a estrutura completa de um vídeo no formato ${format} (${isShort ? 'Shorts 9:16' : 'Vídeo Longo 16:9'}) sobre "${topic}".
Nicho: ${NICHE_LABELS[niche]}
Tom: ${TONE_LABELS[tone]}
Exatamente ${sceneCount} cenas.

Responda ESTRITAMENTE em formato JSON com esta estrutura:
{
  "hooks": ["Gancho 1", "Gancho 2", "Gancho 3"],
  "titles": [
    { "title": "Título 1", "ctrScore": 96, "triggers": ["Curiosidade", "Urgência"] },
    { "title": "Título 2", "ctrScore": 92, "triggers": ["Mistério", "Segredo"] },
    { "title": "Título 3", "ctrScore": 89, "triggers": ["Revelação"] },
    { "title": "Título 4", "ctrScore": 86, "triggers": ["Inédito"] },
    { "title": "Título 5", "ctrScore": 84, "triggers": ["Alerta"] }
  ],
  "description": "Descrição envolvente para o YouTube com hashtags.",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6"],
  "scenes": [
    {
      "sceneNumber": 1,
      "timeRange": "0:00 - 0:05",
      "narration": "Texto narrado em português",
      "visualPrompt": "Prompt em inglês para IA de imagem/vídeo",
      "cameraMovement": "ex: Slow zoom in"
    }
  ]
}`;

      const parsed = await callGeminiApiJson(prompt);

      const scenesWithImages: VideoScene[] = (parsed.scenes || []).map((s: any, idx: number) => ({
        sceneNumber: s.sceneNumber || idx + 1,
        timeRange: s.timeRange || `0:${(idx * 6).toString().padStart(2, '0')} - 0:${((idx + 1) * 6).toString().padStart(2, '0')}`,
        narration: s.narration || '',
        visualPrompt: s.visualPrompt || '',
        cameraMovement: s.cameraMovement || 'Cinematic slow push in',
        aspectRatio: format,
        generatedImageUrl: getSceneImageUrl(s.visualPrompt || topic, format, idx + 42),
      }));

      return {
        id: `dark-${Date.now()}`,
        timestamp: Date.now(),
        topic,
        format,
        niche,
        tone,
        estimatedDuration: targetDuration,
        hooks: parsed.hooks || [
          `Você não vai acreditar no que aconteceu com ${topic}.`,
          `Existe um segredo sobre ${topic} que poucos conhecem.`,
          `E se tudo o que você sabe sobre ${topic} for uma mentira?`,
        ],
        selectedHookIndex: 0,
        titles: parsed.titles || [
          { title: `O Mistério Oculto de ${topic} Revelado`, ctrScore: 95, triggers: ['Curiosidade', 'Revelação'] },
          { title: `Por Que Ninguém Fala Sobre Isso? (${topic})`, ctrScore: 91, triggers: ['Mistério', 'Urgência'] },
        ],
        tags: parsed.tags || ['curiosidades', 'misterio', 'darkchannel', 'ia'],
        description: parsed.description || `Descubra as verdades mais surpreendentes sobre ${topic}.`,
        scenes: scenesWithImages,
      };
    } catch (err) {
      console.warn('Fallback para gerador interno estruturado:', err);
    }
  }

  return createFallbackDarkProject(topic, format, niche, tone);
}

function createFallbackDarkProject(
  topic: string,
  format: VideoFormat,
  niche: VideoNiche,
  tone: VideoTone
): VideoDarkProject {
  const isShort = format === '9:16';
  const duration = isShort ? '45-60s (Short/Reel)' : '3-5 min (Vídeo Longo YouTube)';
  
  const hooks = [
    `Você sabia que existe um lado oculto sobre ${topic} que poucos conhecem?`,
    `Atenção: o que aconteceu com ${topic} pode mudar sua perspectiva para sempre.`,
    `E se eu te disser que a história oficial sobre ${topic} esconde uma verdade chocante?`,
  ];

  const titles: VideoTitleOption[] = [
    { title: `A Verdade Inacreditável Sobre ${topic} (Revelado)`, ctrScore: 96, triggers: ['Curiosidade Extrema', 'Revelação'] },
    { title: `O Que Eles NÃO Querem Que Você Saiba Sobre ${topic}`, ctrScore: 93, triggers: ['Mistério', 'Quebra de Padrão'] },
    { title: `Como ${topic} Mudou o Mundo Em Silêncio`, ctrScore: 89, triggers: ['Transformação', 'História'] },
    { title: `O Maior Enigma de ${topic} Finalmente Explicado`, ctrScore: 87, triggers: ['Urgência', 'Explicação'] },
    { title: `Pare Tudo: Isso Vai Te Surpreender Sobre ${topic}`, ctrScore: 85, triggers: ['Alerta', 'Gancho Rápido'] },
  ];

  const sceneCount = isShort ? 6 : 8;
  const scenes: VideoScene[] = [];

  const cameraMoves = [
    'Dramatic slow zoom in on focal point',
    'Low angle heroic camera pan upward',
    'Cinematic tracking drone shot moving forward',
    'Subtle handheld tension shake with shallow DoF',
    'Wide panoramic sweep with volumetric lighting',
    'Extreme close-up macro focus pull',
    'Atmospheric slow motion 60fps pan',
    'Epic establishing aerial orbit shot',
  ];

  for (let i = 1; i <= sceneCount; i++) {
    const startTime = (i - 1) * (isShort ? 7 : 20);
    const endTime = i * (isShort ? 7 : 20);
    const timeRange = `${Math.floor(startTime / 60)}:${(startTime % 60).toString().padStart(2, '0')} - ${Math.floor(endTime / 60)}:${(endTime % 60).toString().padStart(2, '0')}`;
    
    const narrationSteps = [
      `No coração de ${topic}, tudo começou com um acontecimento que desafiou todas as expectativas da época.`,
      `Documentos e relatos antigos indicam que algo muito além do comum estava se desenvolvendo nas sombras.`,
      `Conforme os especialistas aprofundaram as investigações, pistas inesperadas começaram a surgir.`,
      `O que parecia ser apenas uma coincidência rapidamente se transformou no centro de um grande mistério.`,
      `Aqueles que tentaram desvendar os segredos deixaram registros fascinantes que permanecem até hoje.`,
      `E a pergunta que fica é: até onde estamos dispostos a ir para compreender toda a verdade sobre ${topic}?`,
      `Se você chegou até aqui, inscreva-se no canal para não perder as próximas revelações exclusivas.`,
      `Deixe seu like e comente abaixo qual é a sua teoria sobre este grande enigma.`
    ];

    const visualPrompt = isShort
      ? `Vertical 9:16 framing, central focus: dramatic cinematic shot related to ${topic}, atmospheric moody lighting, volumetric light beams, photorealistic Unreal Engine 5 render, 8k resolution, highly detailed texture.`
      : `Cinematic 16:9 widescreen: epic establishing shot related to ${topic}, anamorphic lens flare, rich cinematic color grade, 35mm film grain, 8k master masterpiece.`;

    scenes.push({
      sceneNumber: i,
      timeRange,
      narration: narrationSteps[i - 1] || `Detalhe fascinante sobre ${topic} que conecta os pontos finais da história.`,
      visualPrompt,
      cameraMovement: cameraMoves[(i - 1) % cameraMoves.length],
      aspectRatio: format,
      generatedImageUrl: getSceneImageUrl(`${topic} scene ${i} ${niche}`, format, i + 100),
    });
  }

  return {
    id: `dark-${Date.now()}`,
    timestamp: Date.now(),
    topic,
    format,
    niche,
    tone,
    estimatedDuration: duration,
    hooks,
    selectedHookIndex: 0,
    titles,
    tags: [topic.toLowerCase().replace(/\s+/g, ''), 'curiosidades', 'fatos', 'misterios', 'darkchannel', 'ia', 'documentario'],
    description: `Descubra a história e os segredos fascinantes por trás de ${topic}. Deixe seu like e inscreva-se para mais conteúdos épicos!\n\n#${topic.replace(/\s+/g, '')} #Curiosidades #CanaisDark`,
    scenes,
  };
}
