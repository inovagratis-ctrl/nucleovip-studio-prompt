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
 * Modelos suportados da API Gemini em ordem de prioridade e performance
 */
const GEMINI_MODELS = [
  'gemini-3.5-flash',
  'gemini-3.7-flash',
  'gemini-3.1-flash-lite',
  'gemini-flash-latest',
  'gemini-3.5-flash-lite',
];

/**
 * Extrator e saneador robusto de JSON
 */
function extractJsonFromText(text: string): any {
  if (!text) throw new Error('Resposta vazia da IA.');
  let clean = text.trim();

  if (clean.startsWith('```')) {
    clean = clean.replace(/^```[a-z]*\s*/i, '').replace(/\s*```$/i, '').trim();
  }

  const match = clean.match(/\{[\s\S]*\}/);
  if (match) {
    clean = match[0];
  }

  return JSON.parse(clean);
}

/**
 * Chamada à API Gemini com fallback automático entre múltiplos modelos
 */
async function callGeminiApiWithFallback(prompt: string): Promise<any> {
  if (!geminiApiKey || (geminiApiKey.startsWith('AQ.') === false && geminiApiKey.length < 20)) {
    throw new Error('Chave do Gemini não configurada.');
  }

  let lastError: any = null;

  for (const model of GEMINI_MODELS) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiApiKey}`;
    const payload = {
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        temperature: 0.85,
        maxOutputTokens: 6000,
      }
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        const textOutput = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (textOutput) {
          return extractJsonFromText(textOutput);
        }
      } else {
        lastError = new Error(`Erro no modelo ${model}: ${response.status}`);
      }
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error('Todos os modelos da API do Gemini falharam.');
}

/**
 * Construtor Master de Produção Audiovisual & Prompts
 */
export async function generateDarkVideoProject(params: GenerateVideoDarkParams): Promise<VideoDarkProject> {
  const { topic, format, niche, tone } = params;
  const isShort = format === '9:16';
  const targetDuration = isShort ? '45-60 segundos (Shorts / Reels / TikTok)' : '3 a 5 minutos (Vídeo Longo YouTube)';
  const sceneCount = isShort ? 6 : 8;

  if (geminiApiKey) {
    try {
      const prompt = `Você é um Diretor de Cinema premiado, Roteirista Viral de Shorts/YouTube e Especialista em Engenharia de Prompts de IA (Midjourney v6, Flux.1, Kling, Sora, Runway, Veo) de padrão internacional.

Sua missão é criar uma produção audiovisual COMPLETA, CINEMATOGRÁFICA e HIPERDETALHADA sobre o tema: "${topic}".
Formato: ${format} (${isShort ? 'Shorts / Reels / TikTok (9:16)' : 'Vídeo Longo YouTube (16:9)'}).
Nicho: ${NICHE_LABELS[niche]}
Tom: ${TONE_LABELS[tone]}
Crie exatamente ${sceneCount} cenas sequenciais.

DIRETRIZES FUNDAMENTAIS DE QUALIDADE MÁXIMA:

1. 🎙️ ROTEIRO NARRADO (LOCUÇÃO PARA ELEVENLABS / LOCUTOR PROFISSIONAL):
- Crie storytelling real, dramático e cinematográfico! NUNCA use frases clichês ou copie o tema cru.
- Use pausas dramáticas (...), frases curtas e quebras de linha que criam cadência e retenção máxima nos primeiros segundos.
- Estrutura narrativa sequencial:
  * Cena 1: Abertura cinematográfica que prende a atenção e introduz o mistério/lenda.
  * Cena 2: Revelação do protagonista, reputação e habilidades temidas.
  * Cena 3: O desafio / momento de confronto tenso iminente.
  * Cena 4: O clímax / a ação decisiva em fração de segundo.
  * Cena 5: A resolução épica e o mito que ficou gravado para sempre.
  * Cena 6: Fechamento marcante e chamada para inscrição (CTA) natural.

2. 🎨 PROMPTS DAS CENAS DE IMAGEM E VÍDEO (OBRIGATORIAMENTE EM INGLÊS, PADRÃO MASTER MIDJOURNEY V6 / FLUX / KLING):
- O prompt visual DE CADA CENA deve ser uma ARQUITETURA COMPLETA E HIPERDETALHADA (15 a 25 linhas) contendo:
  - Formato: ${isShort ? 'VERTICAL 9:16' : 'WIDESCREEN 16:9'}
  - Sujeito e Personagem: Descrição física e anatômica precisa (se for animal, ex: "original anthropomorphic male adult stray dog gunslinger named DOG THE KID", detalhes de pelagem, olhos inteligentes e expressivos, cicatrizes). Vestimentas ricas e gastas (chapéu de couro velho oeste desgastado, colete de couro preto, camisa bege de linho, bandana vermelha no pescoço, cinto com coldre vintage e revólveres clássicos).
  - Enquadramento & Câmera: Tipo de plano (CLOSE-UP PORTRAIT, Low-angle Hero Shot, Over-the-shoulder, Wide Panoramic), lente (85mm / 35mm anamorphic), profundidade de campo (shallow depth of field, creamy background bokeh).
  - Cenário / Background: Elementos táteis do ambiente (saloon rústico de madeira envelhecida, balcão, garrafas de vidro, mesas de madeira, silhuetas de outros personagens ao fundo).
  - Iluminação & Atmosfera: Luz dourada de pôr do sol (golden hour) entrando pelas janelas, raios volumétricos de luz (god rays), partículas de poeira suspensas no ar, iluminação de borda dramática (rim lighting) destacando chapéu e ombros, sombras profundas e contrastantes.
  - Composição e Estilo: photorealistic, ultra-detailed realistic textures and fur, cinematic color grading, Unreal Engine 5 render, Octane render, 8k resolution, award-winning cinematography.
  - Restrições Negativas: NO TEXT, NO TITLE, NO LOGO, NO WATERMARK, NO deformed anatomy, NO extra limbs, NO human face (se for animal), NO cartoon style.

3. 🎯 GANCHOS VIRAIS (HOOKS): 3 ganchos magnéticos para os primeiros 3 segundos.
4. 📈 TÍTULOS DE ALTO CTR: 5 títulos magnéticos com análise de CTR (%) e gatilhos mentais.

Responda ESTRITAMENTE em formato JSON com esta estrutura:
{
  "hooks": ["Gancho viral 1", "Gancho viral 2", "Gancho viral 3"],
  "titles": [
    { "title": "Título magnético 1", "ctrScore": 98, "triggers": ["Curiosidade", "Quebra de Padrão"] },
    { "title": "Título magnético 2", "ctrScore": 95, "triggers": ["Mistério", "Urgência"] },
    { "title": "Título magnético 3", "ctrScore": 91, "triggers": ["Lenda", "Ação"] },
    { "title": "Título magnético 4", "ctrScore": 88, "triggers": ["Revelação"] },
    { "title": "Título magnético 5", "ctrScore": 85, "triggers": ["Impacto"] }
  ],
  "description": "Descrição magnética para o YouTube com parágrafos, hashtags e chamada para ação.",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6"],
  "scenes": [
    {
      "sceneNumber": 1,
      "timeRange": "0:00 - 0:08",
      "narration": "Nas terras áridas e esquecidas do Velho Oeste... onde a poeira escondia segredos e o perigo espreitava a cada esquina... surgiu uma lenda.\n\nSeu nome era DOG THE KID.\n\nA pata mais rápida do Oeste.",
      "visualPrompt": "VERTICAL 9:16, cinematic character portrait of an original anthropomorphic male adult stray dog gunslinger named DOG THE KID, standing inside a dusty wooden western saloon...",
      "cameraMovement": "Slow cinematic push-in on protagonist face with shallow depth of field"
    }
  ]
}`;

      const parsed = await callGeminiApiWithFallback(prompt);

      const formattedScenes: VideoScene[] = (parsed.scenes || []).map((s: any, idx: number) => {
        return {
          sceneNumber: s.sceneNumber || idx + 1,
          timeRange: s.timeRange || `0:${(idx * 7).toString().padStart(2, '0')} - 0:${((idx + 1) * 7).toString().padStart(2, '0')}`,
          narration: s.narration || '',
          visualPrompt: s.visualPrompt || '',
          cameraMovement: s.cameraMovement || 'Cinematic slow push-in with shallow depth of field',
          aspectRatio: format,
        };
      });

      return {
        id: `video-${Date.now()}`,
        timestamp: Date.now(),
        topic,
        format,
        niche,
        tone,
        estimatedDuration: targetDuration,
        hooks: parsed.hooks || [
          `Você sabia que a verdadeira história por trás de ${topic} desafiou todas as regras?`,
          `Eles tentaram apagar essa lenda, mas o que aconteceu aqui jamais será esquecido.`,
          `Prepare-se: em menos de um minuto, você vai entender o porquê de ${topic} ser tão temido.`,
        ],
        selectedHookIndex: 0,
        titles: parsed.titles || [
          { title: `A Verdade Oculta Sobre ${topic} Revelada`, ctrScore: 98, triggers: ['Curiosidade', 'Quebra de Padrão'] },
          { title: `Por Que Ninguém Tem Coragem de Falar Sobre ${topic}?`, ctrScore: 94, triggers: ['Mistério', 'Urgência'] },
        ],
        tags: parsed.tags || [topic.toLowerCase().replace(/[^a-z0-9]/g, ''), 'curiosidades', 'historias', 'cinema', 'ia'],
        description: parsed.description || `Conheça a história cinematográfica e épica de ${topic}. Deixe seu like e inscreva-se no canal para mais produções!`,
        scenes: formattedScenes,
      };
    } catch (err) {
      console.warn('Fallback para gerador interno estruturado:', err);
    }
  }

  return createFallbackDarkProject(topic, format, niche, tone);
}

/**
 * Gerador de Alta Fidelidade Local (Fallback Offline de Nível Master)
 */
function createFallbackDarkProject(
  topic: string,
  format: VideoFormat,
  niche: VideoNiche,
  tone: VideoTone
): VideoDarkProject {
  const isShort = format === '9:16';
  const duration = isShort ? '45-60s (Shorts / Reels / TikTok)' : '3-5 min (Vídeo Longo YouTube)';
  const ratioLabel = isShort ? 'VERTICAL 9:16' : 'WIDESCREEN 16:9';

  const hooks = [
    `No lugar onde poucos tinham coragem de pisar... apenas um nome impunha respeito absoluto.`,
    `Diziam que era impossível acompanhar seus movimentos. E quem duvidou... não viveu para contar.`,
    `A lenda que você está prestes a conhecer desafiou todas as leis do Oeste.`,
  ];

  const titles: VideoTitleOption[] = [
    { title: `A Lenda Oculta de ${topic} (A História Completa)`, ctrScore: 98, triggers: ['Curiosidade Extrema', 'Quebra de Padrão'] },
    { title: `Por Que Todos Temiam ${topic}? O Confronto Final`, ctrScore: 95, triggers: ['Mistério', 'Urgência'] },
    { title: `O Momento Em Que ${topic} Fez História`, ctrScore: 91, triggers: ['Ação', 'Transformação'] },
    { title: `O Segredo Que Ninguém Te Contou Sobre ${topic}`, ctrScore: 88, triggers: ['Revelação', 'Exclusividade'] },
    { title: `Apenas 1% Conhece a Verdadeira História de ${topic}`, ctrScore: 85, triggers: ['Alerta', 'Desafio'] },
  ];

  const sceneCount = isShort ? 6 : 8;

  const dynamicStory = [
    {
      narration: `Nas terras áridas e esquecidas do Velho Oeste, onde a poeira escondia segredos e o perigo espreitava a cada esquina...\n\nsurgiu uma lenda.\n\nSeu nome era lendário em cada saloon da fronteira.`,
      camera: 'Low-angle cinematic slow push-in, shallow depth of field',
      promptSubject: 'cinematic character portrait of main character, legendary outlaw standing inside a dusty wooden western saloon with weathered dark brown cowboy hat, worn black leather vest, beige shirt, red bandana, and vintage holster'
    },
    {
      narration: `Diziam que ninguém era capaz de acompanhar seus movimentos.\n\nUm simples olhar...\n\num pequeno movimento...\n\ne quando o rival percebia, já era tarde demais.`,
      camera: 'Extreme close-up macro on eyes and weathered face, intense dramatic gaze',
      promptSubject: 'extreme close-up portrait of character with intense intelligent eyes, detailed textures, battle scars, rim lighting highlighting the cowboy hat and silhouette'
    },
    {
      narration: `Naquele dia, porém, o desafio chegou ao saloon.\n\nO relógio marcou meio-dia.\n\nO silêncio tomou conta da cidade.\n\nE na rua principal, os olhares se cruzaram em um duelo inevitável.`,
      camera: 'Over-the-shoulder wide angle cinematic establishing duel shot',
      promptSubject: 'dramatic standoff duel scene outside the saloon, high noon sunlight, dramatic shadow on the dusty street, atmospheric wind blowing dust clouds'
    },
    {
      narration: `A poeira começou a subir.\n\nEm uma fração de segundo, tudo terminou com precisão cirúrgica.\n\nO som do disparo ecoou pelas montanhas como um trovão.`,
      camera: 'Dynamic 60fps slow-motion action sweep with muzzle flash sparks',
      promptSubject: 'dynamic high-speed action shot firing dual revolvers, realistic smoke and muzzle flash, floating dust particles, explosive volumetric lighting'
    },
    {
      narration: `Quando a poeira finalmente baixou...\n\nele simplesmente ajeitou o chapéu...\n\ndeu meia-volta...\n\ne caminhou tranquilamente em direção ao pôr do sol.`,
      camera: 'Epic wide landscape zoom-out into the glowing golden sunset horizon',
      promptSubject: 'lone hero walking away into the glowing sunset horizon, dramatic backlighting, golden hour volumetric sun rays, long cinematic shadow on the desert sand'
    },
    {
      narration: `Porque naquele lugar, muitos eram perigosos.\n\nMas apenas uma lenda ficou gravada para sempre.\n\nSe você curtiu essa história épica, deixe o like e inscreva-se para o próximo episódio!`,
      camera: 'Cinematic slow push in to vintage wanted poster and final insignia',
      promptSubject: 'vintage aged parchment wanted poster on rustic saloon wooden wall, warm golden lantern light, award-winning cinematic still, 8k resolution'
    }
  ];

  const scenes: VideoScene[] = [];

  for (let i = 0; i < sceneCount; i++) {
    const item = dynamicStory[i % dynamicStory.length];
    const startTime = i * 7;
    const endTime = (i + 1) * 7;
    const timeRange = `0:${startTime.toString().padStart(2, '0')} - 0:${endTime.toString().padStart(2, '0')}`;

    const masterPrompt = `${ratioLabel}, ${item.promptSubject}, related to ${topic}.

BACKGROUND & LIGHTING:
A crowded fictional Old West saloon with aged wooden walls, wooden bar counter, rustic tables, hanging lanterns, glass bottles, and dusty atmosphere. Warm golden sunset light entering through windows, volumetric rays of light (god rays), floating dust particles, dramatic rim lighting around the cowboy hat and shoulders, realistic fabric and leather textures, deep cinematic shadows.

COMPOSITION & VISUAL STYLE:
Strong visual hierarchy, cinematic portrait composition, shallow depth of field, creamy background bokeh, photorealistic, ultra-detailed realistic textures, physically accurate lighting, cinematic color grading, Unreal Engine 5 quality, Octane render, 8k resolution, masterwork cinematography.

NO TEXT, NO TITLE, NO LOGO, NO WATERMARK, NO SUBTITLES, NO deformed anatomy, NO extra limbs, NO cartoon style, NO childish appearance.`;

    scenes.push({
      sceneNumber: i + 1,
      timeRange,
      narration: item.narration,
      visualPrompt: masterPrompt,
      cameraMovement: item.camera,
      aspectRatio: format,
    });
  }

  return {
    id: `video-${Date.now()}`,
    timestamp: Date.now(),
    topic,
    format,
    niche,
    tone,
    estimatedDuration: duration,
    hooks,
    selectedHookIndex: 0,
    titles,
    tags: [topic.toLowerCase().replace(/[^a-z0-9]/g, ''), 'curiosidades', 'historias', 'shorts', 'youtube', 'ia'],
    description: `A história épica e cinematográfica de ${topic}. Deixe seu like e inscreva-se no canal para não perder os próximos lançamentos!\n\n#${topic.replace(/\s+/g, '')} #Shorts #YouTube`,
    scenes,
  };
}
