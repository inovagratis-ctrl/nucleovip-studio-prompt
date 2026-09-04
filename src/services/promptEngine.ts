import type { AIModelInfo, AIModelType, CategoryInfo, CategoryType, GeneratedPromptResult, PromptRecommendation } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'thumbnail',
    name: 'Thumbnail',
    iconName: 'Layout',
    description: 'Imagens de alto impacto visual para YouTube com separação de planos e foco em CTR.',
    priorities: [
      'Composição e hierarquia visual de alto contraste',
      'Expressão facial emotiva e marcante',
      'Separação nítida entre sujeito e fundo (rim light / bokeh)',
      'Espaço reservado para inserção de texto e grafismos',
      'Cores vibrantes calibradas para miniaturas de YouTube'
    ]
  },
  {
    id: 'personagem',
    name: 'Personagem',
    iconName: 'User',
    description: 'Prompts detalhados para personagens consistentes, vestimentas, feições e estilo.',
    priorities: [
      'Características físicas detalhadas (idade, olhos, cabelo)',
      'Vestimentas, texturas de tecido e acessórios',
      'Expressão facial e linguagem corporal definida',
      'Ângulo e iluminação de retrato de estúdio ou ambiente',
      'Traços permanentes para consistência em múltiplas gerações'
    ]
  },
  {
    id: 'cena',
    name: 'Cena',
    iconName: 'Image',
    description: 'Ambientes cinematográficos, iluminação volumétrica, perspectiva e storytelling visual.',
    priorities: [
      'Worldbuilding e ambientação espacial imersiva',
      'Iluminação volumétrica (golden hour, neon, chiaroscuro)',
      'Composição de câmera (grande angular, lente 35mm, 85mm)',
      'Profundidade de campo (DoF) e camadas de fundo',
      'Storytelling dramático e atmosfera sensorial'
    ]
  },
  {
    id: 'video',
    name: 'Vídeo',
    iconName: 'Video',
    description: 'Prompts para modelos de vídeo com dinâmica de câmera, movimento do sujeito e continuidade.',
    priorities: [
      'Direção de movimento do sujeito e física realista',
      'Movimento de câmera preciso (dolly in, pan, orbit, drone shot)',
      'Ritmo, timing e continuidade temporal da cena',
      'Atmosfera sonora / ambiência implícita',
      'Parâmetros cinemáticos suportados pelo modelo de vídeo'
    ]
  }
];

export const AI_MODELS: AIModelInfo[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT Images',
    type: 'image',
    badge: 'DALL-E 3 Core',
    tagline: 'Linguagem natural rica, narrativa descritiva e detalhes cinematográficos.',
    supportedRatios: ['16:9', '1:1', '9:16'],
    promptStyle: 'Narrative descriptive English, high detail lighting, camera angle, realistic texture physics',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'nanobanana',
    name: 'Nano Banana',
    type: 'image',
    badge: 'Flux / SDXL Ultra',
    tagline: 'Engenharia de pesos, tags técnicas de precisão e ultra-definição.',
    supportedRatios: ['16:9', '1:1', '9:16', '4:5', '21:9'],
    promptStyle: 'Raw technical tokens, dynamic weight tags, master quality lighting, 8k render details',
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 'veo',
    name: 'Veo',
    type: 'video',
    badge: 'Google Veo Pro',
    tagline: 'Vídeo cinematográfico fotorrealista com dinâmica física precisa e controle de câmera.',
    supportedRatios: ['16:9', '9:16'],
    maxDuration: '10s (High FPS)',
    promptStyle: 'Cinematic direction, precise camera movement (dolly/pan), temporal consistency, photorealistic physics',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'kling',
    name: 'Kling',
    type: 'video',
    badge: 'Kling 1.5 HD',
    tagline: 'Alta dinâmica de movimento, expressões fluidas e cinemática oriental de ponta.',
    supportedRatios: ['16:9', '9:16', '1:1'],
    maxDuration: '10s',
    promptStyle: 'Fluid kinetic motion, detailed micro-expressions, dynamic lighting shifts, high coherence',
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 'seedance',
    name: 'Seedance',
    type: 'video',
    badge: 'Seedance Motion AI',
    tagline: 'Estilização artística vibrante, transições suaves e atmosfera visual expressiva.',
    supportedRatios: ['16:9', '9:16'],
    maxDuration: '8s',
    promptStyle: 'Aesthetic fluid motion, vibrant color harmony, atmospheric particle effects, stylized choreography',
    color: 'from-cyan-500 to-blue-600'
  }
];

// Gerador Inteligente de Engenharia de Prompt Especializado
export function buildEngineeredPrompt(
  idea: string,
  category: CategoryType,
  model: AIModelType
): { prompt: string; recommendations: PromptRecommendation; breakdown: GeneratedPromptResult['breakdown'] } {
  const cleanIdea = idea.trim();

  let subjectDesc = '';
  let envDesc = '';
  let compLighting = '';
  let styleAtmos = '';
  let techDetails = '';
  let finalPrompt = '';
  const recommendations: PromptRecommendation = {
    aspectRatio: '16:9',
  };

  // 1. Extração semântica da ideia
  if (category === 'thumbnail') {
    recommendations.aspectRatio = '16:9';
    recommendations.style = 'High CTR Commercial YouTube Thumbnail';
    recommendations.framing = 'Close-up on subject face with clear background separation';
    recommendations.lighting = 'Punchy volumetric rim lighting, high-contrast neon accents';
    recommendations.engineTips = 'Deixe o terço superior direito livre para texto de thumbnail. Cores saturadas para chamar atenção no feed.';

    subjectDesc = `Extreme high-impact YouTube thumbnail focal point: ${cleanIdea}, intense expressive facial emotion conveying shock and authority, hyper-crisp sharp eyes looking directly toward the viewer`;
    envDesc = `dynamic contextual background with subtle motion blur, strong separation between foreground hero and background`;
    compLighting = `split lighting with intense neon teal and warm amber rim-lights outlining silhouette, dramatic highlights, HDR high dynamic range`;
    styleAtmos = `hyper-commercial digital art style, ultra-saturated color palette, 8k crisp details, octane render aesthetic, maximum click-through visual tension`;
    techDetails = `--ar 16:9 --v 6.1 --style raw --q 2`;

    if (model === 'chatgpt') {
      finalPrompt = `High-energy YouTube thumbnail master shot: ${cleanIdea}. A hyper-expressive central figure with an intense, captivating emotion looking at the camera. Striking rim lighting with vivid cyan and warm amber tones creates a razor-sharp separation from the dynamic blurred background. High contrast, sharp facial focus, vibrant color grading optimized for maximum viewer engagement, negative space on one side for typography, cinematic 8k studio clarity.`;
    } else if (model === 'nanobanana') {
      finalPrompt = `(extreme high CTR YouTube thumbnail:1.3), ${cleanIdea}, hyper-expressive dramatic subject, sharp facial details, (intense rim lighting:1.2), glowing neon backlight silhouette, high-contrast dynamic composition, bokeh depth of field background, vivid saturation, commercial color grading, 8k UHD, masterpiece quality, unreal engine 5 render, cinematic poster aesthetic`;
    } else if (model === 'veo') {
      finalPrompt = `High-impact 16:9 animated thumbnail sequence: ${cleanIdea}. Smooth subtle zoom-in on the expressive subject while background lighting pulses with dramatic neon gradients. Sharp edge illumination, hyper-realistic skin and material reflections, intense visual curiosity, 4k cinematic frame rate.`;
    } else if (model === 'kling') {
      finalPrompt = `Hyper-dynamic thumbnail opening shot: ${cleanIdea}. Subject displays sudden energetic expression toward the lens, subtle electric atmospheric particles drifting, high-contrast rim light contours, ultra-smooth micro-movements, 4k sharp focus.`;
    } else {
      finalPrompt = `Vibrant stylized thumbnail visual: ${cleanIdea}, glowing chromatic edges, dramatic expressive pose, punchy comic-cinema contrast, dynamic fluid lighting, cinematic polish, ultra-vivid color harmonics.`;
    }
  } else if (category === 'personagem') {
    recommendations.aspectRatio = model === 'chatgpt' ? '1:1' : '9:16';
    recommendations.style = 'Photorealistic Master Character Design';
    recommendations.framing = 'Three-quarter portrait / bust shot with cinematic lens';
    recommendations.lighting = 'Key light Rembrandt style with soft subsurface scattering on skin';
    recommendations.engineTips = 'Mantenha detalhes consistentes como cor de olhos, formato de cabelo e texturas de roupa para reutilização.';

    subjectDesc = `Consistent character study: ${cleanIdea}, defined facial structure, realistic skin pores, detailed eye reflections, bespoke styled outfit with intricate weave textures`;
    envDesc = `moody ambient setting subtly echoing character lore, soft atmospheric haze`;
    compLighting = `Rembrandt studio key light at 45 degrees, subtle soft fill light, delicate hair highlight rim`;
    styleAtmos = `cinematic character concept art, tactile realistic materials, cinematic anamorphic bokeh, 85mm portrait lens, f/1.8 aperture`;
    techDetails = `--ar 9:16 --v 6.1 --chaos 10`;

    if (model === 'chatgpt') {
      finalPrompt = `Full character design portrait: ${cleanIdea}. The character has distinct, memorable facial features with natural skin texture, finely detailed hair strands, and expressive eyes full of personality. Wearing intricately textured garments tailored to their background. Captured with an 85mm f/1.4 portrait lens, soft studio Rembrandt lighting with delicate golden edge highlights, elegant atmospheric background with subtle depth of field.`;
    } else if (model === 'nanobanana') {
      finalPrompt = `(masterpiece character portrait:1.3), ${cleanIdea}, highly detailed facial anatomy, subsurface scattering on skin, lifelike eyes with realistic reflection, (intricate costume fabrics and detailed accessories:1.2), 85mm portrait lens, shallow depth of field, natural soft ambient lighting, cinematic rim light, photorealistic, 8k resolution, raw photo style, hyper-detailed`;
    } else if (model === 'veo') {
      finalPrompt = `Cinematic character turnaround and presence shot: ${cleanIdea}. Slow smooth orbital camera movement around the character, natural breathing and micro-facial shifts, fabric swaying gently in soft ambient wind, photorealistic cinematic lighting with shallow depth of field, 4k 60fps.`;
    } else if (model === 'kling') {
      finalPrompt = `Hyper-detailed character motion clip: ${cleanIdea}. Character makes a natural subtle head turn and confident gaze directly into the camera lens, micro-expressions on eyes and lips, lifelike hair motion, cinematic studio illumination, high dynamic realism.`;
    } else {
      finalPrompt = `Stylized expressive character showcase: ${cleanIdea}. Flowing silhouette, intricate costume details, subtle rhythmic breathing animation, soft glowing rim light, elegant color palette with artistic atmospheric aura.`;
    }
  } else if (category === 'cena') {
    recommendations.aspectRatio = '16:9';
    recommendations.style = 'Epic Cinematic Environment & Worldbuilding';
    recommendations.framing = 'Wide-angle establishing shot, 24mm anamorphic lens';
    recommendations.lighting = 'Dramatic volumetric god rays, dual-tone color temperature';
    recommendations.engineTips = 'Use proporções 16:9 ou 21:9 para reforçar a sensação de tela de cinema e escala épica.';

    subjectDesc = `Epic environmental panorama: ${cleanIdea}, grand scale architectural and natural elements meticulously detailed`;
    envDesc = `layered atmospheric depth with morning mist, floating dust motes, rich terrain textures and weather effects`;
    compLighting = `volumetric golden hour sunlight cutting through atmosphere, heavy chiaroscuro contrasts, cinematic teal and orange color grade`;
    styleAtmos = `cinematography by Roger Deakins, 35mm film grain, anamorphic lens flare, IMAX composition, breathtaking sense of scale`;
    techDetails = `--ar 16:9 --v 6.1 --stylize 400`;

    if (model === 'chatgpt') {
      finalPrompt = `Breathtaking cinematic wide establishing shot: ${cleanIdea}. Majestic visual storytelling with incredible architectural and environmental scale. Volumetric sunlight beams pierce through atmospheric mist, casting deep, dramatic shadows and golden highlights. Shot on an anamorphic 35mm cine lens with subtle lens flare, rich textures, layered depth from foreground to distant horizon, timeless cinematic mood.`;
    } else if (model === 'nanobanana') {
      finalPrompt = `(ultra wide cinematic establishing scene:1.3), ${cleanIdea}, epic scale, intricate worldbuilding details, (volumetric god rays and atmospheric fog:1.2), cinematic color grading, teal and orange palette, IMAX 70mm composition, photorealistic textures, hyper-detailed landscape, octane render, 8k resolution, award-winning cinematography`;
    } else if (model === 'veo') {
      finalPrompt = `Cinematic drone sweeping shot over ${cleanIdea}. The camera glides smoothly forward through atmospheric mist and volumetric sunbeams, revealing vast panoramic depth and living environmental details. Flawless physics, natural wind movement across foliage/structures, photorealistic cinematic color grading, 4k UHD.`;
    } else if (model === 'kling') {
      finalPrompt = `Slow cinematic push-in tracking shot through ${cleanIdea}. Environmental particles drift gracefully through golden shafts of light, subtle environmental ambient shifts, immense depth of field, ultra-fluid natural motion, 4k high dynamic range.`;
    } else {
      finalPrompt = `Atmospheric stylized cinematic vista: ${cleanIdea}. Sweeping motion over scenic vistas, rich painterly lighting, dynamic cloud formations, vibrant lighting accents, fluid ambient motion.`;
    }
  } else {
    // video
    recommendations.aspectRatio = '16:9';
    recommendations.duration = model === 'seedance' ? '8s' : '10s';
    recommendations.cameraMovement = 'Dynamic Dolly-in + gentle Crane tilt down';
    recommendations.lighting = 'Cinematic practical lights with subtle atmospheric bloom';
    recommendations.engineTips = 'Especifique a direção do movimento do sujeito e o tipo de lente para evitar transições bruscas de cena.';

    subjectDesc = `Dynamic video action sequence: ${cleanIdea}, fluid natural movement and accurate physical momentum`;
    envDesc = `living dynamic environment with moving particles, shifting reflections and atmospheric wind`;
    compLighting = `cinematic directional key light, high shutter speed clarity, balanced exposure across motion`;
    styleAtmos = `directed by Denis Villeneuve, 4k cine-motion, smooth 60fps interpolation, zero motion stutter, seamless physical realism`;
    techDetails = `Camera: Dolly In 4m/s | FrameRate: 60fps | Motion Coherence: Ultra`;

    if (model === 'chatgpt') {
      finalPrompt = `Cinematic motion-directed scene: ${cleanIdea}. The main subject moves purposefully through the space with realistic weight and momentum. The camera performs a smooth, low-angle tracking shot, keeping focus tight while the background shifts with authentic optical parallax. Volumetric lighting and atmospheric particles enhance the cinematic tempo, shot on 35mm cinema glass.`;
    } else if (model === 'nanobanana') {
      finalPrompt = `(dynamic cinematic action frame:1.3), ${cleanIdea}, fluid character kinetic momentum, motion blur trails, (smooth tracking camera angle:1.2), high shutter speed, cinematic practical lighting, 8k UHD frame grab, unreal engine 5 physics, photorealistic motion capture quality`;
    } else if (model === 'veo') {
      finalPrompt = `Full cinematic video sequence (10s): ${cleanIdea}. Camera starts on an establishing mid-shot then executes a smooth dolly-in forward while tilting up subtly. Subject performs realistic organic actions with natural momentum. Atmospheric dust particles catch the ambient rim lighting. Photorealistic physics, perfectly consistent lighting, 4k 60fps.`;
    } else if (model === 'kling') {
      finalPrompt = `Ultra-smooth cinematic video generation: ${cleanIdea}. Camera executes a dynamic orbital arc tracking the central action. Hyper-realistic micro-movements, accurate fabric and hair physics reacting to motion, continuous temporal coherence, high-definition cinematic rendering without morphing artifacts.`;
    } else {
      finalPrompt = `Fluid stylized action video sequence: ${cleanIdea}. Smooth camera drift, expressive choreography, glowing particle trails responding to movement, harmonious color transitions, seamless frame-to-frame motion flow.`;
    }
  }

  return {
    prompt: finalPrompt,
    recommendations,
    breakdown: {
      subject: subjectDesc,
      environment: envDesc,
      compositionAndLighting: compLighting,
      styleAndAtmosphere: styleAtmos,
      technicalSettings: techDetails
    }
  };
}

// Otimizador de prompt pré-existente
export function optimizeExistingPrompt(
  existingPrompt: string,
  model: AIModelType,
  category: CategoryType
): { original: string; optimized: string; improvements: string[] } {
  const result = buildEngineeredPrompt(existingPrompt, category, model);
  
  const improvements = [
    'Remoção de termos genéricos e adição de vocabulário técnico de iluminação',
    `Adaptação da sintaxe e estrutura de pesos exclusiva para o modelo ${AI_MODELS.find(m => m.id === model)?.name}`,
    'Inclusão de especificações precisas de lente, composição e profundidade de campo',
    'Definição de atmosfera volumétrica e controle de cores para máxima qualidade visual'
  ];

  return {
    original: existingPrompt,
    optimized: result.prompt,
    improvements
  };
}

// Refinador em linguagem natural
export function refinePromptWithInstruction(
  currentPrompt: string,
  instruction: string,
  _model: AIModelType
): string {
  const cleanInst = instruction.trim().toLowerCase();
  
  if (cleanInst.includes('cinematogr') || cleanInst.includes('filme')) {
    return `${currentPrompt}, shot on 35mm anamorphic lens, cinematic color grading, volumetric golden lighting, film grain, directed by Roger Deakins aesthetic`;
  }
  if (cleanInst.includes('dramátic') || cleanInst.includes('ilumina')) {
    return `${currentPrompt}, dramatic high-contrast chiaroscuro lighting, deep mysterious shadows, intense glowing rim-light accents, evocative mood`;
  }
  if (cleanInst.includes('realista') || cleanInst.includes('realismo') || cleanInst.includes('foto')) {
    return `${currentPrompt}, hyper-realistic raw photograph, 8k UHD, intricate natural micro-textures, lifelike reflections, photoreal master quality`;
  }
  if (cleanInst.includes('câmera') || cleanInst.includes('movimento') || cleanInst.includes('drone')) {
    return `${currentPrompt}, dynamic smooth continuous camera orbit with slow motion tracking, fluid parallax depth, stabilized cinematic crane shot`;
  }
  if (cleanInst.includes('neon') || cleanInst.includes('cyber') || cleanInst.includes('futur')) {
    return `${currentPrompt}, cyberpunk aesthetic, vibrant glowing neon blues and magenta highlights, reflections on wet asphalt, futuristic high-tech ambience`;
  }

  return `${currentPrompt}, enhanced with ${instruction.trim()}, refined visual composition, master quality rendering`;
}
