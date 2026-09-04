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

/**
 * Tradutor e limpador de palavras-chave para garantir que o prompt de imagem
 * enviado para o Pollinations / Flux seja 100% em Inglês e altamente descritivo.
 */
export function translateAndEnrichPrompt(topic: string, sceneDesc: string, format: VideoFormat): string {
  // Dicionário de termos comuns para enriquecer caso esteja em português
  let clean = topic.toLowerCase();
  
  const translations: [RegExp, string][] = [
    [/cão|cachorro/gi, 'dog'],
    [/pistoleiro|atirador/gi, 'gunslinger cowboy'],
    [/gato/gi, 'cat'],
    [/guerreiro/gi, 'warrior'],
    [/castelo/gi, 'medieval castle'],
    [/floresta/gi, 'mystical forest'],
    [/espaço|universo/gi, 'deep space cosmos'],
    [/ouro|riqueza/gi, 'golden treasures'],
    [/faroeste/gi, 'wild west desert town'],
    [/antigo|antiga/gi, 'ancient'],
    [/robô|ia/gi, 'futuristic cyborg robot'],
    [/cidade/gi, 'cyberpunk city'],
    [/monstro|criatura/gi, 'legendary mythical creature'],
    [/pirata/gi, 'pirate captain ship'],
    [/alienígena|alien/gi, 'extraterrestrial alien'],
  ];

  let englishTopic = topic;
  for (const [regex, replacement] of translations) {
    englishTopic = englishTopic.replace(regex, replacement);
  }

  const ratioSpec = format === '9:16' ? 'vertical 9:16 framing, central subject' : 'cinematic 16:9 widescreen composition';
  return `${ratioSpec}, ${englishTopic}, ${sceneDesc}, highly detailed character and environment, 8k resolution, cinematic lighting, Unreal Engine 5 render, photorealistic, octane render`;
}

/**
 * Constrói a URL de geração de imagem via Pollinations.ai (Flux) garantindo prompt em inglês
 */
export function getSceneImageUrl(prompt: string, format: VideoFormat, seed?: number): string {
  const width = format === '9:16' ? 576 : 1024;
  const height = format === '9:16' ? 1024 : 576;
  const randomSeed = seed || Math.floor(Math.random() * 1000000);
  
  // Limpa caracteres especiais para a URL
  const cleanPrompt = encodeURIComponent(
    prompt.replace(/[^a-zA-Z0-9, -]/g, ' ').substring(0, 300)
  );

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
      maxOutputTokens: 2500,
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
      const prompt = `Você é um roteirista e diretor de canais Dark do YouTube premiado.
Gere a estrutura de um vídeo no formato ${format} (${isShort ? 'Shorts 9:16' : 'Vídeo Longo 16:9'}) sobre o tema: "${topic}".
Nicho: ${NICHE_LABELS[niche]}
Tom: ${TONE_LABELS[tone]}
Crie exatamente ${sceneCount} cenas.

IMPORTANTE: O campo "visualPrompt" de cada cena DEVE SER OBRIGATORIAMENTE EM INGLÊS com detalhes precisos do personagem principal, ambiente, iluminação e câmera (ex: se o tema for "cão pistoleiro", descreva "anthropomorphic dog dressed as a wild west gunslinger cowboy with leather hat, revolvers, dusty saloon background, dramatic lighting, 8k").

Responda ESTRITAMENTE em formato JSON com esta estrutura:
{
  "hooks": ["Gancho 1", "Gancho 2", "Gancho 3"],
  "titles": [
    { "title": "Título magnético 1", "ctrScore": 96, "triggers": ["Curiosidade", "Urgência"] },
    { "title": "Título magnético 2", "ctrScore": 92, "triggers": ["Mistério", "Quebra de Padrão"] },
    { "title": "Título magnético 3", "ctrScore": 89, "triggers": ["Revelação"] },
    { "title": "Título magnético 4", "ctrScore": 86, "triggers": ["Inédito"] },
    { "title": "Título magnético 5", "ctrScore": 84, "triggers": ["Alerta"] }
  ],
  "description": "Descrição envolvente para o YouTube com parágrafo e hashtags.",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6"],
  "scenes": [
    {
      "sceneNumber": 1,
      "timeRange": "0:00 - 0:06",
      "narration": "Texto narrado em português pelo locutor.",
      "visualPrompt": "Detailed visual prompt in ENGLISH for AI image generator depicting the main character and scene action.",
      "cameraMovement": "Slow cinematic push-in on character face"
    }
  ]
}`;

      const parsed = await callGeminiApiJson(prompt);

      const scenesWithImages: VideoScene[] = (parsed.scenes || []).map((s: any, idx: number) => {
        const visualPromptEnglish = s.visualPrompt || translateAndEnrichPrompt(topic, `scene ${idx + 1}`, format);
        return {
          sceneNumber: s.sceneNumber || idx + 1,
          timeRange: s.timeRange || `0:${(idx * 6).toString().padStart(2, '0')} - 0:${((idx + 1) * 6).toString().padStart(2, '0')}`,
          narration: s.narration || '',
          visualPrompt: visualPromptEnglish,
          cameraMovement: s.cameraMovement || 'Cinematic slow push in',
          aspectRatio: format,
          generatedImageUrl: getSceneImageUrl(visualPromptEnglish, format, idx * 37 + 101),
        };
      });

      return {
        id: `dark-${Date.now()}`,
        timestamp: Date.now(),
        topic,
        format,
        niche,
        tone,
        estimatedDuration: targetDuration,
        hooks: parsed.hooks || [
          `Você não vai acreditar na história inacreditável de ${topic}.`,
          `Existe um segredo sobre ${topic} que poucos conhecem.`,
          `Prepare-se: a verdade sobre ${topic} vai te surpreender do início ao fim.`,
        ],
        selectedHookIndex: 0,
        titles: parsed.titles || [
          { title: `A Lenda Oculta de ${topic} Revelada`, ctrScore: 96, triggers: ['Curiosidade', 'Revelação'] },
          { title: `Por Que Ninguém Esquece ${topic}?`, ctrScore: 92, triggers: ['Mistério', 'Urgência'] },
        ],
        tags: parsed.tags || [topic.toLowerCase().replace(/\s+/g, ''), 'curiosidades', 'misterio', 'darkchannel', 'ia'],
        description: parsed.description || `Descubra as verdades e histórias mais surpreendentes sobre ${topic}.`,
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
    `Você sabia que a verdadeira história sobre ${topic} é muito mais impressionante do que você imagina?`,
    `Atenção: o que aconteceu nos bastidores de ${topic} desafiou todas as regras conhecidas.`,
    `E se eu te disser que existe uma lenda misteriosa por trás de ${topic} que poucos tiveram coragem de contar?`,
  ];

  const titles: VideoTitleOption[] = [
    { title: `A Verdade Inacreditável Sobre ${topic} (Revelado)`, ctrScore: 96, triggers: ['Curiosidade Extrema', 'Revelação'] },
    { title: `O Que Ninguém Te Contou Sobre ${topic}`, ctrScore: 93, triggers: ['Mistério', 'Quebra de Padrão'] },
    { title: `Como ${topic} Dominou Tudo Em Silêncio`, ctrScore: 89, triggers: ['Transformação', 'História'] },
    { title: `O Maior Desafio de ${topic} Finalmente Explicado`, ctrScore: 87, triggers: ['Urgência', 'Explicação'] },
    { title: `Pare Tudo: O Momento Mais Épico de ${topic}`, ctrScore: 85, triggers: ['Alerta', 'Gancho Rápido'] },
  ];

  const sceneCount = isShort ? 6 : 8;
  const scenes: VideoScene[] = [];

  const sceneConcepts = [
    {
      action: 'close up portrait of main character with intense focused gaze',
      narration: `Nas terras áridas e esquecidas, surgiu a lenda de ${topic}, um personagem que impunha respeito por onde passava.`,
      camera: 'Dramatic close-up macro with shallow depth of field'
    },
    {
      action: 'standing proudly in dusty western town, holding classic revolvers, wearing leather duster coat and cowboy hat at golden hour',
      narration: `Dizem que seu reflexo era o mais rápido de toda a região, capaz de desarmar qualquer rival em uma fração de segundo.`,
      camera: 'Low angle heroic tracking shot moving forward'
    },
    {
      action: 'tense standoff duel in front of a rustic wooden saloon, sand storm in background, dramatic sunbeams',
      narration: `Quando o sino da igreja tocou ao meio-dia, o confronto inevitável começou na rua principal da cidade.`,
      camera: 'Wide panoramic cinematic establishing shot'
    },
    {
      action: 'intense action moment firing dual revolvers with smoke and muzzle flash, sparks flying, cinematic slow motion',
      narration: `Com precisão cirúrgica e coragem inabalável, cada movimento provava que sua fama não era apenas um mito.`,
      camera: 'Dynamic 60fps slow-motion action sweep'
    },
    {
      action: 'walking away into the glowing sunset desert horizon, lone silhouette, dramatic rim lighting and dust particles',
      narration: `E assim que a poeira baixou, ele simplesmente caminhou em direção ao horizonte, deixando sua marca para sempre.`,
      camera: 'Epic slow zoom out into landscape sunset'
    },
    {
      action: 'legendary wanted poster on wooden wall or triumphant final look, masterpiece lighting, 8k resolution',
      narration: `Se você gostou desta história épica de ${topic}, deixe seu like e inscreva-se para os próximos episódios!`,
      camera: 'Cinematic slow push in to final insignia'
    },
  ];

  for (let i = 0; i < sceneCount; i++) {
    const concept = sceneConcepts[i % sceneConcepts.length];
    const startTime = i * (isShort ? 7 : 20);
    const endTime = (i + 1) * (isShort ? 7 : 20);
    const timeRange = `${Math.floor(startTime / 60)}:${(startTime % 60).toString().padStart(2, '0')} - ${Math.floor(endTime / 60)}:${(endTime % 60).toString().padStart(2, '0')}`;
    
    const enrichedPrompt = translateAndEnrichPrompt(topic, concept.action, format);

    scenes.push({
      sceneNumber: i + 1,
      timeRange,
      narration: concept.narration,
      visualPrompt: enrichedPrompt,
      cameraMovement: concept.camera,
      aspectRatio: format,
      generatedImageUrl: getSceneImageUrl(enrichedPrompt, format, i * 43 + 77),
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
    tags: [topic.toLowerCase().replace(/\s+/g, ''), 'curiosidades', 'historias', 'darkchannel', 'ia', 'fatos'],
    description: `A lenda e a história completa de ${topic}. Deixe seu like e inscreva-se para mais vídeos incríveis!\n\n#${topic.replace(/\s+/g, '')} #Curiosidades #CanaisDark`,
    scenes,
  };
}
