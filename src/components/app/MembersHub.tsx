import React, { useState } from 'react';
import {
  Crown,
  Download,
  Lock,
  Search,
  Zap,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import type { MemberResource, PlanType } from '../../types';

interface MembersHubProps {
  onOpenUpgrade: (title?: string, description?: string) => void;
}

export const MEMBERS_RESOURCES: MemberResource[] = [
  // --- PLANO STARTER VIP (R$ 5,99/mês) ---
  {
    id: 'res-guia-prompts',
    title: 'Guia de Engenharia de Prompts com IA Gemini',
    subtitle: 'O método essencial de 5 passos para gerar imagens consistentes e profissionais sem ruídos.',
    category: 'guias',
    requiredPlan: 'trial',
    fileFormat: 'PDF',
    downloadSize: '1.8 MB',
    iconName: 'BookOpen',
    badge: 'Starter VIP',
    previewContent: `GUIA RÁPIDO DE ENGENHARIA DE PROMPTS — NÚCLEO VIP
1. A Fórmula de 5 Elementos: [Sujeito Principal] + [Ação/Pose] + [Ambiente & Atmosfera] + [Iluminação Física] + [Câmera, Lente & Estilo].
2. Como evitar deformações, dedos extras e aberrações visuais comuns em modelos generativos.
3. Parâmetros essenciais e proporções (16:9, 9:16, 1:1) para ChatGPT DALL-E 3 e Flux.
4. Uso de palavras de reforço: volumetric lighting, 8k render, octane render, shallow depth of field.`,
    downloadData: {
      filename: 'guia-engenharia-prompts-gemini-nucleovip.txt',
      content: `======================================================
GUIA DE ENGENHARIA DE PROMPTS - NÚCLEO VIP (STARTER VIP)
======================================================

1. A FÓRMULA DE 5 PILARES DE UM PROMPT PROFISSIONAL:
   [1. Sujeito]: Quem ou o que é o ponto focal? (ex: "A charismatic 35-year-old female cyberpunk hacker")
   [2. Ação & Pose]: O que o sujeito está fazendo? (ex: "typing furiously on a holographic keyboard with laser focus")
   [3. Cenário & Ambiente]: Onde está ocorrendo? (ex: "in a dimly lit neo-Tokyo alley filled with neon sign reflections and steam")
   [4. Iluminação]: Qual a física da luz? (ex: "dramatic cyan and magenta rim light, volumetric fog, moody shadows")
   [5. Câmera & Render]: Aspectos técnicos? (ex: "cinematic 35mm lens, f/1.8 aperture, shallow depth of field, photorealistic 8k")

2. TRUQUES PARA EVITAR ERROS:
   - Nunca use palavras negativas genéricas se o modelo não aceita. Em vez de "sem defeitos", especifique "anatomically correct hands, sharp crystal clear focus".
   - Use termos de fotografia real em vez de apenas "bonito": 'softbox lighting', 'bokeh', 'golden hour', 'wide angle 24mm'.

3. APLICANDO NO CHATGPT DALL-E 3 & FLUX:
   - DALL-E 3: Aceita descrições narrativas longas em linguagem natural.
   - Flux: Responde melhor a termos objetivos, separados por vírgula, com especificações de estilo.
`,
      mimeType: 'text/plain',
    }
  },
  {
    id: 'res-pack-100-prompts',
    title: 'Biblioteca de Presets: +100 Prompts Validados',
    subtitle: 'Packs organizados por Thumbnails de Alto CTR, Personagens Consistentes e Cenas Cinematográficas.',
    category: 'prompts',
    requiredPlan: 'trial',
    fileFormat: 'TXT / PDF',
    downloadSize: '120 KB',
    iconName: 'FileText',
    badge: 'Starter VIP',
    previewContent: `PACK +100 PROMPTS VALIDADOS (CATEGORIZADOS):
- 40 Prompts de Thumbnails YouTube de Alta Conversão (Expressão facial, iluminação de choque)
- 30 Prompts de Personagens e Retratos Hiper-Realistas
- 30 Prompts de Cenas Épicas, Paisagens e Cenários Dark Channel
... Prontos para copiar, colar e gerar no ChatGPT, Flux ou Gemini!`,
    downloadData: {
      filename: 'pack-100-prompts-validados-starter-vip.txt',
      content: `========================================================================
BIBLIOTECA DE PRESETS: +100 PROMPTS VALIDADOS - NÚCLEO VIP (STARTER)
========================================================================

[CATEGORIA 1: THUMBNAILS DE ALTO CTR PARA YOUTUBE]
01. High CTR Tech Review: "Close-up of a shocked young man looking at a glowing holographic smartphone hovering in his hands, vibrant purple and cyan studio lighting, ultra-expressive facial features, 8k, sharp focus, YouTube thumbnail style."
02. Mistery Mystery Shock: "Extreme close-up of human eye reflecting an ancient glowing alien artifact, dark shadowy background, volumetric god rays, intense cinematic look."
03. Finance / Money Thumbnail: "Confident businessman standing next to a giant rising neon green 3D growth chart, rain of glowing digital coins, dramatic dark background with spotlight."
04. Gaming / Action: "Intense gamer in RGB illuminated battlestation wearing futuristic glowing headset, smoke and particle effects, hyper-detailed."
05. Podcast Faceoff: "Split lighting portrait of two debaters staring intently across a sleek modern podcast microphone, warm tungsten vs cold teal rim light."
... [TOTAL DE 40 PROMPTS DE THUMBNAILS]

[CATEGORIA 2: PERSONAGENS & RETRATOS CONSISTENTES]
01. Cyberpunk Investigator: "Portrait of a weathered female detective in a high-collar trench coat, neon rain reflections on wet skin, cybernetic eye glowing amber, 85mm portrait lens, f/1.4."
02. Ancient Warrior: "Hyper-realistic portrait of an old Viking warlord with braided beard and battle scars, volumetric snow storm, cold Nordic natural light."
03. Modern Entrepreneur: "Professional studio portrait of a confident Brazilian woman in minimalist navy blazer, clean neutral studio gradient background, softbox illumination."
... [TOTAL DE 30 PROMPTS DE PERSONAGENS]

[CATEGORIA 3: CENAS CINEMATOGRÁFICAS & DARK CHANNELS]
01. Forbidden Ruins: "Cinematic wide shot of an explorer holding a flare inside a colossal forgotten Egyptian chamber with towering statues, atmospheric dust particles."
02. Deep Space Horizon: "Futuristic scientific spacecraft orbiting a massive turquoise gas giant planet with glowing rings, ultra-high definition NASA photography style."
03. Medieval Foggy Village: "Eerie medieval cobblestone street at midnight, dense ground fog, flickering oil lanterns, gothic silhouettes in the distance."
... [TOTAL DE 30 PROMPTS DE CENAS]
`,
      mimeType: 'text/plain',
    }
  },
  {
    id: 'res-checklist-criacao',
    title: 'Checklist de Validação & Prompt Doctor Quick Guide',
    subtitle: 'Checklist de 6 pontos essenciais para auditar seu prompt antes de gastar recursos de geração.',
    category: 'guias',
    requiredPlan: 'trial',
    fileFormat: 'PDF',
    downloadSize: '850 KB',
    iconName: 'CheckCircle2',
    badge: 'Starter VIP',
    previewContent: `CHECKLIST DE VALIDAÇÃO PROMPT DOCTOR:
[ ] 1. Sujeito principal definido sem termos genéricos?
[ ] 2. Tipo de lente e enquadramento especificados (35mm, 85mm, wide-angle)?
[ ] 3. Iluminação física descrita (volumetric rays, softbox, rim light)?
[ ] 4. Resolução e motor de render configurados (8k, octane, photorealistic)?
[ ] 5. Aspect Ratio (16:9 ou 9:16) correto para a plataforma alvo?
[ ] 6. Ausência de palavras redundantes ou contraditórias?`,
    downloadData: {
      filename: 'checklist-prompt-doctor-nucleovip.txt',
      content: `===========================================================
CHECKLIST DE AUDITORIA DE PROMPTS - PROMPT DOCTOR (STARTER VIP)
===========================================================

Use este checklist para validar seus prompts antes de gerar:

1. CLAREZA DO SUJEITO
   [ ] O sujeito possui traços específicos (idade, vestimenta, expressão)?
   [ ] Evitou termos vagos como "uma pessoa bonita" ou "coisa legal"?

2. LENTE & ENQUADRAMENTO
   [ ] Close-up / Retrato: Use 85mm ou 105mm (foco nítido, fundo desfocado).
   [ ] Cenário / Paisagem: Use 24mm ou 35mm wide shot.
   [ ] Ação / Dinamismo: Use Dutch angle ou Low-angle shot.

3. ILUMINAÇÃO & ATMOSFERA
   [ ] Descreveu a fonte de luz (Sol poente, neon, softbox de estúdio, fogo)?
   [ ] Adicionou profundidade com 'rim light' (luz de recorte no contorno)?

4. RESOLUÇÃO & RENDER
   [ ] Adicionou tags de acabamento: 'sharp focus', 'subsurface scattering', '8k'.

5. PROPORÇÃO DE TELA (ASPECT RATIO)
   [ ] 16:9 para YouTube e TV.
   [ ] 9:16 para Shorts, Reels, TikTok e Stories.
   [ ] 1:1 para Feed do Instagram e Fotos de Perfil.
`,
      mimeType: 'text/plain',
    }
  },
  {
    id: 'res-template-roteiros-shorts',
    title: 'Template de Roteiros para Vídeos & Shorts (9:16 e 16:9)',
    subtitle: 'Estrutura de alta retenção com Gancho (Hook), História Dinâmica e Chamada para Ação (CTA).',
    category: 'roteiros',
    requiredPlan: 'trial',
    fileFormat: 'TXT / PDF',
    downloadSize: '75 KB',
    iconName: 'Film',
    badge: 'Starter VIP',
    previewContent: `ESTRUTURA DE ROTEIRO DE ALTA RETENÇÃO (SHORTS / REELS):
- 00:00 a 00:03: O Gancho Irresistível (Hook com quebra de padrão visual e auditivo).
- 00:03 a 00:15: O Desenvolvimento Acelerado (Cortes visuais a cada 3 segundos).
- 00:15 a 00:45: O Clímax / Revelação Central.
- 00:45 a 00:59: Loop Perfeito ou CTA de Conversão.`,
    downloadData: {
      filename: 'template-roteiros-shorts-reels-starter.txt',
      content: `==============================================================
TEMPLATE DE ROTEIRO PARA VÍDEOS & SHORTS - NÚCLEO VIP (STARTER)
==============================================================

ESTRUTURA COMPLETA DE 60 SEGUNDOS (FORMATO 9:16):

[CENA 1 - 0:00 a 0:03] - GANCHO DE CHOQUE (HOOK)
- Narração: "Você nunca deveria pesquisar sobre [TEMA] se quiser dormir hoje..."
- Visual Prompt (9:16): "Ultra-detailed dark room, computer screen casting blue light on horrified face, fast zoom-in, 8k."

[CENA 2 - 0:03 a 0:15] - CONTEXTO E CURIOSIDADE
- Narração: "Em 1998, um grupo de cientistas descobriu algo no fundo do oceano que a NASA tentou esconder..."
- Visual Prompt (9:16): "Underwater deep sea submarine discovering glowing monolithic structure on ocean floor, bubbles, volumetric lighting."

[CENA 3 - 0:15 a 0:40] - REVELAÇÃO E DINAMISMO
- Narração: "O sinal emitido não vinha da Terra. E quando traduziram a primeira mensagem, ela dizia exatamente isso..."
- Visual Prompt (9:16): "Vintage analog computer oscilloscope with erratic green waves, military bunker background, cinematic."

[CENA 4 - 0:40 a 0:55] - CLÍMAX
- Narração: "Eles perceberam que o tempo estava correndo ao contrário naquele exato local."
- Visual Prompt (9:16): "Clock spinning backwards violently, glass shattering in slow motion, particles floating, 8k."

[CENA 5 - 0:55 a 1:00] - CTA / LOOP PERFEITO
- Narração: "Comente o que você faria se estivesse lá e siga para a parte 2."
- Visual Prompt (9:16): "Mysterious silhouetted figure standing at the edge of the abyss, dramatic glowing text overlay."
`,
      mimeType: 'text/plain',
    }
  },

  // --- PLANO PRO CREATOR VIP (R$ 14,99/mês) ---
  {
    id: 'res-mega-pack-500',
    title: 'Mega Pack +500 Prompts Profissionais Categorizados',
    subtitle: 'O maior acervo de prompts testados para Thumbnails, Personagens, Cenas 3D, Veo, Kling e Seedance.',
    category: 'prompts',
    requiredPlan: 'pro',
    fileFormat: 'TXT / JSON',
    downloadSize: '3.4 MB',
    iconName: 'Sparkles',
    badge: 'PRO VIP',
    previewContent: `MEGA PACK +500 PROMPTS ORGANIZADOS:
- 120 Prompts de Thumbnails YouTube de Alto CTR
- 120 Prompts de Cenas Cinematográficas de Vídeo (Veo, Kling, Seedance)
- 100 Prompts de Personagens Consistentes & Retratos Hiper-Realistas
- 80 Prompts de Cenários Sci-Fi, Cyberpunk, Fantasia & Espaço
- 80 Prompts de E-commerce, Produtos High-End & Macrofotografia`,
    downloadData: {
      filename: 'mega-pack-500-prompts-pro-creator-nucleovip.txt',
      content: `========================================================================
MEGA PACK +500 PROMPTS PROFISSIONAIS - NÚCLEO VIP PRO CREATOR
========================================================================

[BLOCO 1: THUMBNAILS DE ALTO IMPACTO (120 PROMPTS)]
001. "Shocked detective discovering glowing forbidden scroll, high contrast neon lighting, extreme facial tension, 8k YouTube thumbnail."
002. "Billionaire tech CEO looking at a miniature floating artificial sun in his laboratory, intense golden rim lighting, 35mm lens."
... (+118 Prompts de Thumbnails)

[BLOCO 2: VÍDEO CINEMATOGRÁFICO - VEO, KLING & SEEDANCE (120 PROMPTS)]
001. "Slow motion drone shot descending through thick mountain mist to reveal a glowing ancient crystal citadel, cinematic camera movement, 4k 60fps."
002. "First-person camera running through a futuristic neon rainy alley, cyberpunk hover cars zooming overhead, motion blur, smooth gimbal motion."
... (+118 Prompts de Vídeos)

[BLOCO 3: PERSONAGENS E ROSTOS CONSISTENTES (100 PROMPTS)]
001. "Character Bible Anchor: Caucasian male 30s with silver hair streak, amber cybernetic left eye, wearing dark tactical vest, consistent face structure across all angles, soft studio lighting, 85mm portrait."
... (+99 Prompts de Personagens)

[BLOCO 4: SCI-FI, DARK CHANNELS E MISTÉRIO (80 PROMPTS)]
001. "Deep trench alien research facility, emergency red strobe lights, cracked glass window with giant bioluminescent creature passing by, hyper-detailed."
... (+79 Prompts de Mistério)

[BLOCO 5: E-COMMERCE & PRODUTOS HIGH-END (80 PROMPTS)]
001. "Luxury perfume bottle floating surrounded by splash of clear water and floating rose petals, crystal clear lighting, commercial product advertising style, 8k octane render."
... (+79 Prompts de E-commerce)
`,
      mimeType: 'text/plain',
    }
  },
  {
    id: 'res-character-bible',
    title: 'Character Bible: Módulo de Consistência para Personagens',
    subtitle: 'Template e fichas técnicas para manter o mesmo rosto, roupas, sementes e estilo em múltiplos prompts.',
    category: 'templates',
    requiredPlan: 'pro',
    fileFormat: 'PDF / TXT',
    downloadSize: '1.2 MB',
    iconName: 'Layers',
    badge: 'PRO VIP',
    previewContent: `CHARACTER BIBLE CONSISTENCY KIT:
1. Ficha de Identidade do Personagem (Nome, Idade, Etnia, Cabelo, Olhos, Marcas Únicas).
2. Prompt Âncora (Seed Prompt) para fixação facial contínua.
3. Variações de Poses (Frontal, Perfil 45°, Olhando para a Câmera, Ação Dinâmica).
4. Variações de Iluminação e Cenários mantendo 100% dos traços faciais.`,
    downloadData: {
      filename: 'character-bible-consistencia-personagens-pro.txt',
      content: `===================================================================
CHARACTER BIBLE: KIT DE CONSISTÊNCIA DE PERSONAGENS - NÚCLEO VIP PRO
===================================================================

COMO MANTER O MESMO PERSONAGEM EM 100% DAS SUAS IMAGENS E VÍDEOS:

1. DEFINIÇÃO DA "TAG DE IDENTIDADE ÂNCORA":
   Exemplo: "Ethan Cross, a 34-year-old Scandinavian man with short ash-blonde hair, a small scar through his left eyebrow, intense grey eyes, and sharp jawline."

2. REGRAS DE FIXAÇÃO:
   - Repita a Tag de Identidade Âncora no início de TODOS os prompts.
   - Fixe as mesmas roupas e paleta quando necessário (ex: "wearing a worn brown leather bomber jacket with shearling collar").
   - Varie apenas o CENÁRIO, a POSE e a ILUMINAÇÃO no final do prompt.

3. TEMPLATE DE VARIAÇÃO DE CENAS:
   - Cena 1 (Apresentação): [Tag Âncora] + "standing in a modern loft apartment, morning golden hour sunlight, 85mm portrait, photorealistic 8k."
   - Cena 2 (Ação): [Tag Âncora] + "running through a crowded subway station, motion blur on background, dynamic low angle shot, cinematic."
   - Cena 3 (Tensão): [Tag Âncora] + "sitting in an interrogation room under a single cold spotlight, sweat on forehead, intense expression, close-up shot."
`,
      mimeType: 'text/plain',
    }
  },
  {
    id: 'res-guia-canais-dark',
    title: 'Manual de Canais Dark Lucrativos com IA & Roteirização',
    subtitle: 'Passo a passo completo: nichos mais rentáveis, vozes neurais com ElevenLabs e monetização no YouTube.',
    category: 'guias',
    requiredPlan: 'pro',
    fileFormat: 'PDF',
    downloadSize: '4.6 MB',
    iconName: 'Film',
    badge: 'PRO VIP',
    previewContent: `MANUAL DE CANAIS DARK LUCRATIVOS:
- Os 7 Nichos com maior CPM e engajamento no YouTube e TikTok em 2026.
- Como estruturar roteiros com retenção acima de 70%.
- Criação de vozes neurais ultra-realistas no ElevenLabs com pausas naturais.
- Edição dinâmica com transições automáticas e legendas animadas.
- Estratégias de monetização direta e programas de afiliados.`,
    downloadData: {
      filename: 'manual-canais-dark-lucrativos-nucleovip-pro.txt',
      content: `=============================================================
MANUAL DE CANAIS DARK LUCRATIVOS COM IA - NÚCLEO VIP PRO CREATOR
=============================================================

1. NICHOS DE MAIOR CPM (CUSTO POR MIL VISUALIZAÇÕES):
   - Mistérios Históricos & Arqueologia Proibida (CPM R$ 35 - R$ 70)
   - Finanças, Cripto & Inteligência Artificial (CPM R$ 40 - R$ 90)
   - True Crime & Casos Não Solucionados (CPM R$ 25 - R$ 50)
   - Espaço, Astronomia & Ficção Científica (CPM R$ 25 - R$ 45)

2. INTEGRAÇÃO COM ELEVENLABS:
   - Configure o modelo 'Eleven Multilingual v2'.
   - Stability: 0.45 (permite maior emoção na voz).
   - Similarity: 0.80 (mantém fidelidade do tom).
   - Use pontuações estratégicas (...) e quebras de linha para criar suspense na narração.

3. FLUXO DE PRODUÇÃO DIÁRIO:
   Passo 1: Gere o Roteiro e Cenas no Video Dark Studio do Núcleo VIP.
   Passo 2: Exporte a narração com as tags prontas do ElevenLabs.
   Passo 3: Gere as imagens correspondentes para cada cena.
   Passo 4: Monte no CapCut ou Premiere com trilha sonora atmosférica e legendas dinâmicas.
`,
      mimeType: 'text/plain',
    }
  },
  {
    id: 'res-planner-criador',
    title: 'Planner de Produção de Conteúdo & Calendário Editorial',
    subtitle: 'Planilha estruturada em CSV e PDF para gerenciar roteiros, status de vídeos e métricas de CTR.',
    category: 'templates',
    requiredPlan: 'pro',
    fileFormat: 'CSV / PDF',
    downloadSize: '980 KB',
    iconName: 'BookOpen',
    badge: 'PRO VIP',
    previewContent: `PLANNER DO CRIADOR DE CONTEÚDO:
- Tabela de Ideias & Score de Validação
- Status de Produção (Roteirizado, Imagens Geradas, Editado, Publicado)
- Controle de Métricas e CTR por Vídeo`,
    downloadData: {
      filename: 'planner-producao-conteudo-pro-nucleovip.csv',
      content: 'Data,Tema,Formato,Nicho,Status,CTR Estimado,Link\n2026-09-05,Misterio de Atlantida,9:16,Misterio,Pronto,96%,https://youtube.com\n2026-09-06,A Nova IA da OpenAI,16:9,Tecnologia,Roteirizado,91%,https://youtube.com\n2026-09-07,Caso Criminal Arquivado,9:16,TrueCrime,Gravando,88%,https://youtube.com',
      mimeType: 'text/csv',
    }
  },

  // --- PLANO AGÊNCIA & STUDIO MASTER (R$ 29,99/mês) ---
  {
    id: 'res-super-pack-1000',
    title: 'Super Pack +1000 Prompts Comerciais & High-End',
    subtitle: 'O acervo definitivo para agências, criativos de anúncios Meta/TikTok, E-commerce e marcas de luxo.',
    category: 'prompts',
    requiredPlan: 'agency',
    fileFormat: 'TXT / JSON',
    downloadSize: '7.2 MB',
    iconName: 'Sparkles',
    badge: 'Studio Master',
    previewContent: `SUPER PACK +1000 PROMPTS HIGH-END:
- 300 Prompts de Criativos Publicitários & Meta Ads (Alta Conversão e Vendas)
- 250 Prompts de E-commerce, Cosméticos, Joias, Calçados & Moda
- 200 Prompts de Cinematografia 8k para Vídeos Comerciais de Marcas
- 150 Prompts de Arquitetura, Interiores & Cenografia de Luxo
- 100 Prompts de Identidade Visual de Marcas, Mockups & Embalagens`,
    downloadData: {
      filename: 'super-pack-1000-prompts-comerciais-studio-master.txt',
      content: `==========================================================================
SUPER PACK +1000 PROMPTS COMERCIAIS HIGH-END - NÚCLEO VIP STUDIO MASTER
==========================================================================

[SEÇÃO 1: CRIATIVOS PUBLICITÁRIOS & META ADS (300 PROMPTS)]
001. "Commercial advertising hero shot: Modern luxury smartwatch hovering against a dramatic dark titanium background with splashes of vibrant orange electric energy, sharp studio rim lighting, 8k commercial photo."
002. "Direct-response ad visual: Frustrated consumer in messy chaotic office transitioning into relaxed confident professional with organized glowing holographic tablet, high contrast split visual."
... (+298 Prompts de Meta Ads)

[SEÇÃO 2: E-COMMERCE & PRODUTOS PREMIUM (250 PROMPTS)]
001. "Organic skincare cream jar placed on smooth wet river stones, surrounded by eucalyptus leaves and soft morning mist, softbox diffusion, commercial beauty photography."
... (+249 Prompts de E-commerce)

[SEÇÃO 3: CINEMA COMERCIAL & VÍDEOS DE MARCA (200 PROMPTS)]
001. "Sleek electric luxury SUV driving through a neon-lit futuristic metropolis at twilight, ultra-smooth drone track shot, cinematic anamorphic lens flares, 8k."
... (+199 Prompts de Cinema Comercial)

[SEÇÃO 4: ARQUITETURA & DESIGN DE INTERIORES (150 PROMPTS)]
001. "Ultra-luxury modern minimalist villa cantilevered over the Pacific ocean at sunset, floor-to-ceiling glass walls, warm ambient interior lighting, Architectural Digest magazine cover style."
... (+149 Prompts de Arquitetura)

[SEÇÃO 5: BRANDING & IDENTIDADE VISUAL (100 PROMPTS)]
001. "Premium matte black packaging box with gold embossed foil geometric logo, resting on polished white marble slab, dramatic shadows, photorealistic mockup."
... (+99 Prompts de Branding)
`,
      mimeType: 'text/plain',
    }
  },
  {
    id: 'res-workspace-agency-toolkit',
    title: 'Workspace Toolkit: Organização por Clientes & Campanhas',
    subtitle: 'Metodologia estruturada para gerenciar múltiplos clientes, aprovação de prompts e pastas de entrega.',
    category: 'templates',
    requiredPlan: 'agency',
    fileFormat: 'PDF / JSON',
    downloadSize: '1.5 MB',
    iconName: 'Layers',
    badge: 'Studio Master',
    previewContent: `WORKSPACE AGENCY TOOLKIT:
- Estrutura de pastas por Cliente / Campanha / Formato (Feed, Story, YouTube).
- Ficha de Briefing e Aprovação de Prompts para Clientes.
- Script JSON de exportação e organização automática de bibliotecas internas.`,
    downloadData: {
      filename: 'workspace-agency-toolkit-studio-master.txt',
      content: `========================================================================
WORKSPACE AGENCY TOOLKIT - NÚCLEO VIP STUDIO MASTER
========================================================================

ESTRUTURA DE PRODUÇÃO PARA AGÊNCIAS E EQUIPES:

1. ARQUITETURA DE PASTAS RECOMENDADA:
   /CLIENTE_01_NOME/
      /01_BRIEFINGS_E_IDENTIDADE/
         - brand-identity-bible.json (Paleta, Tom, Lentes fixas)
      /02_PROMPTS_APROVADOS/
         - meta-ads-feed-1080x1080.txt
         - reels-tiktok-9x16.txt
      /03_MATERIAIS_GERADOS/
         - /alta_resolucao/
         - /aprovados_cliente/

2. MODELO DE BRIEFING DE PROMPT COMERCIAL:
   - Nome do Cliente:
   - Objetivo da Campanha (Vendas, Leads, Branding):
   - Paleta de Cores Obrigatória:
   - Elementos Proibidos:
   - Chamada Visual Principal:
`,
      mimeType: 'text/plain',
    }
  },
  {
    id: 'res-contrato-servicos-ia',
    title: 'Contrato Modelo de Prestação de Serviços de IA & Cessão de Direitos',
    subtitle: 'Documento jurídico pronto e editável para fechar contratos de criação de imagem e vídeo com empresas.',
    category: 'templates',
    requiredPlan: 'agency',
    fileFormat: 'DOCX / TXT',
    downloadSize: '580 KB',
    iconName: 'FileText',
    badge: 'Studio Master',
    previewContent: `CONTRATO DE PRESTAÇÃO DE SERVIÇOS DE ENGENHARIA DE PROMPTS & IA:
Cláusula 1: Do Objeto e Entregáveis (Imagens, Roteiros e Prompts).
Cláusula 2: Dos Direitos Autorais e Propriedade Intelectual das Imagens Geradas.
Cláusula 3: Dos Prazos de Entrega, Pagamentos e Políticas de Revisão.
Cláusula 4: Da Confidencialidade e Isenção de Responsabilidade de Plataformas Terceiras.`,
    downloadData: {
      filename: 'contrato-prestacao-servicos-ia-studio-master.txt',
      content: `========================================================================
CONTRATO DE PRESTAÇÃO DE SERVIÇOS DE CRIAÇÃO E IA - STUDIO MASTER
========================================================================

CONTRATO DE PRESTAÇÃO DE SERVIÇOS DE ENGENHARIA DE PROMPTS E CRIAÇÃO DIGITAL

CONTRATANTE: [Nome da Empresa/Cliente], CNPJ/CPF nº [______], com sede em [______].
CONTRATADA: [Sua Agência / Seu Nome], CNPJ/CPF nº [______], com sede em [______].

CLÁUSULA 1 - DO OBJETO
1.1. O presente instrumento tem por objeto a prestação de serviços especializados em engenharia de prompts, geração de artes visuais, roteirização e materiais audiovisuais gerados com auxílio de Inteligência Artificial.

CLÁUSULA 2 - DA PROPRIEDADE INTELECTUAL E DIREITOS DE USO
2.1. Após a quitação integral dos valores estipulados, a CONTRATADA cede os direitos patrimoniais de uso comercial das peças finais entregues à CONTRATANTE.

CLÁUSULA 3 - DOS PRAZOS E REVISÕES
3.1. A entrega dos materiais será realizada no prazo de [X] dias úteis após a aprovação do briefing.
3.2. A CONTRATANTE terá direito a até [2] rodadas de revisões e ajustes de prompts.

[Assinaturas das Partes]
`,
      mimeType: 'text/plain',
    }
  },
  {
    id: 'res-projeto3-sourcecode',
    title: 'Código-Fonte Completo do Projeto 3 (Python CLI + FFmpeg + Automação)',
    subtitle: 'Script CLI automatizado para gerar e renderizar centenas de vídeos MP4 em lote no seu computador.',
    category: 'ferramentas',
    requiredPlan: 'agency',
    fileFormat: 'ZIP / Python',
    downloadSize: '420 KB',
    iconName: 'Code2',
    badge: 'Studio Master',
    previewContent: `YOUTUBE VIDEO GENERATOR (PROJETO 3 PYTHON):
- main.py (Interface de linha de comando com --input, --output, --width, --height, --duration)
- generator/cover_art.py (Geração de imagens via Pollinations.ai / API)
- generator/video_maker.py (Renderização em MP4 com FFmpeg e transições dinâmicas)
- prompts.txt (Lista pré-configurada de prompts de alta definição)
- requirements.txt e README completo com tutorial de execução passo a passo.`,
    downloadData: {
      filename: 'projeto3-youtube-video-generator-python-cli.zip',
      content: `===========================================================================
PROJETO 3: YOUTUBE VIDEO GENERATOR CLI (PYTHON + FFMPEG) - STUDIO MASTER
===========================================================================

INSTRUÇÕES DE INSTALAÇÃO E EXECUÇÃO:

1. REQUISITOS:
   - Python 3.10 ou superior instalado.
   - FFmpeg instalado no sistema e adicionado ao PATH.

2. INSTALAÇÃO DAS DEPENDÊNCIAS:
   pip install -r requirements.txt

3. EXECUÇÃO EM LOTE:
   python main.py --input prompts.txt --output output/ --format 9:16 --duration 5

4. ESTRUTURA DO CÓDIGO INCLUSO:
   - main.py
   - generator/cover_art.py
   - generator/video_maker.py
   - generator/audio_stitcher.py
   - prompts.txt
   - requirements.txt
`,
      mimeType: 'text/plain',
    }
  }
];

export const MembersHub: React.FC<MembersHubProps> = ({ onOpenUpgrade }) => {
  const { plan } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewResource, setPreviewResource] = useState<MemberResource | null>(null);

  const planRank: Record<PlanType, number> = {
    free: 0,
    trial: 1,
    pro: 2,
    agency: 3,
  };

  const userRank = planRank[plan] || 1;

  const filteredResources = MEMBERS_RESOURCES.filter((res) => {
    const matchesCat = selectedCategory === 'todos' || res.category === selectedCategory;
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleDownload = (resource: MemberResource) => {
    const requiredRank = planRank[resource.requiredPlan];
    if (userRank < requiredRank) {
      onOpenUpgrade(
        `Desbloqueie o recurso "${resource.title}"`,
        `Este material exclusivo faz parte do plano ${resource.requiredPlan === 'agency' ? 'Studio Master' : 'PRO Creator VIP'}. Faça seu upgrade agora!`
      );
      return;
    }

    if (resource.downloadData) {
      const blob = new Blob([resource.downloadData.content], { type: resource.downloadData.mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = resource.downloadData.filename;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      alert(`Baixando ${resource.title}...`);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold shadow-2xs">
          <Crown className="w-3.5 h-3.5 text-amber-600" />
          <span>Central de Membros & Downloads VIP</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Área de Membros & <span className="gradient-text">Materiais Exclusivos</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
          Acesse e baixe packs de prompts, guias em PDF, templates comerciais, planilhas e o código-fonte do Projeto 3 de acordo com seu plano.
        </p>
      </div>

      {/* Plan Status Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-indigo-50 via-purple-50 to-amber-50 border border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-slate-200 flex items-center justify-center text-indigo-600">
            <Crown className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Seu Plano Atual:</span>
              <span className="px-2 py-0.5 rounded-md text-xs font-black uppercase tracking-wider bg-indigo-600 text-white">
                {plan === 'agency' ? 'Studio Master' : plan === 'pro' ? 'PRO Creator VIP' : 'Starter VIP'}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              {plan === 'agency'
                ? 'Você possui acesso total a todos os materiais, templates comerciais e código-fonte da plataforma.'
                : plan === 'pro'
                ? 'Acesso a todos os materiais PRO + Mega Pack +500 Prompts, Character Bible e Guias Dark.'
                : 'Você está no plano Starter VIP. Acesse os materiais Starter ou faça upgrade para o PRO VIP para liberar todos os +500 prompts e manuais.'}
            </p>
          </div>
        </div>

        {plan !== 'agency' && (
          <button
            type="button"
            onClick={() => onOpenUpgrade()}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-500/20 flex items-center gap-2 transition transform active:scale-95 cursor-pointer shrink-0"
          >
            <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span>Fazer Upgrade</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto p-1 bg-slate-100 rounded-2xl border border-slate-200 text-xs font-bold">
          {['todos', 'prompts', 'guias', 'templates', 'ferramentas'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl transition cursor-pointer capitalize whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat === 'todos' ? 'Todos os Materiais' : cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar material..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition"
          />
        </div>
      </div>

      {/* Materials Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((res) => {
          const requiredRank = planRank[res.requiredPlan];
          const isUnlocked = userRank >= requiredRank;

          return (
            <div
              key={res.id}
              className={`p-6 rounded-3xl border transition-all flex flex-col justify-between relative bg-white ${
                isUnlocked
                  ? 'border-slate-200 shadow-xs hover:border-indigo-300 hover:shadow-md'
                  : 'border-slate-200/80 bg-slate-50/70 opacity-90'
              }`}
            >
              <div>
                {/* Badge Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    res.requiredPlan === 'agency'
                      ? 'bg-purple-100 text-purple-800'
                      : res.requiredPlan === 'pro'
                      ? 'bg-indigo-100 text-indigo-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {res.badge || res.fileFormat}
                  </span>

                  <span className="text-[10px] text-slate-400 font-mono font-semibold">
                    {res.downloadSize || res.fileFormat}
                  </span>
                </div>

                {/* Title and Subtitle */}
                <h3 className="text-base font-black text-slate-900 leading-snug">{res.title}</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">{res.subtitle}</p>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
                {isUnlocked ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setPreviewResource(res)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
                    >
                      Visualizar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownload(res)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Baixar</span>
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      onOpenUpgrade(
                        `Desbloqueie o material "${res.title}"`,
                        `Faça upgrade para o plano ${res.requiredPlan === 'agency' ? 'Studio Master' : 'PRO Creator VIP'} para acessar este recurso imediatamente.`
                      )
                    }
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-200/80 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-300 border border-transparent text-slate-600 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5 text-amber-600" />
                    <span>Bloqueado • Fazer Upgrade</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Preview Modal */}
      {previewResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden relative">
            <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">Prévia do Material</span>
                <h3 className="text-lg font-black text-slate-900">{previewResource.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewResource(null)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 max-h-96 overflow-y-auto">
              <pre className="text-xs font-mono bg-slate-900 text-slate-100 p-4 rounded-2xl whitespace-pre-wrap leading-relaxed">
                {previewResource.previewContent}
              </pre>
            </div>

            <div className="p-6 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setPreviewResource(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition cursor-pointer"
              >
                Fechar
              </button>
              <button
                type="button"
                onClick={() => {
                  handleDownload(previewResource);
                  setPreviewResource(null);
                }}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Baixar Arquivo Completo</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
