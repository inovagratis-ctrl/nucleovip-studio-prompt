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
  // --- PLANO TESTE 7 DIAS (R$ 2,99) ---
  {
    id: 'res-guia-prompts',
    title: 'Guia Rápido de Engenharia de Prompts com IA',
    subtitle: 'O método essencial para obter imagens consistentes e profissionais sem ruídos.',
    category: 'guias',
    requiredPlan: 'trial',
    fileFormat: 'PDF',
    downloadSize: '1.4 MB',
    iconName: 'BookOpen',
    badge: 'Starter VIP',
    previewContent: `GUIA RÁPIDO DE ENGENHARIA DE PROMPTS — NÚCLEO VIP
1. A Fórmula de 5 Elementos: [Sujeito] + [Ação/Pose] + [Ambiente & Atmosfera] + [Iluminação] + [Câmera & Estilo Técnico].
2. Como evitar dedos extras e aberrações visuais.
3. Configuração de proporções e aspect ratios para cada modelo de IA (ChatGPT, Flux, Midjourney).`,
    downloadData: {
      filename: 'guia-rapido-engenharia-prompts-nucleovip.pdf',
      content: 'Guia Rápido de Engenharia de Prompts - Núcleo VIP\n\n1. Estrutura de Prompts\n2. Parâmetros e Lentes\n3. Consistência Visual',
      mimeType: 'text/plain',
    }
  },
  {
    id: 'res-pack-50-prompts',
    title: 'Mini Pack: 50 Prompts Validados para Thumbnails & Cenas',
    subtitle: '50 prompts prontos de alta conversão para YouTube, Instagram e Dark Channels.',
    category: 'prompts',
    requiredPlan: 'trial',
    fileFormat: 'TXT',
    downloadSize: '45 KB',
    iconName: 'FileText',
    badge: 'Starter VIP',
    previewContent: `PACK 50 PROMPTS VALIDADOS:
01. High CTR YouTube Thumbnail - Shocked man pointing at glowing futuristic cube, dramatic rim lighting, 8k.
02. Cinematic Medieval Castle at sunset, fog rolling over hills, 35mm cine lens.
03. Cyberpunk Detective in rain-soaked Tokyo street, neon reflections.
... (+47 Prompts prontos para copiar)`,
    downloadData: {
      filename: 'pack-50-prompts-validados-nucleovip.txt',
      content: 'PACK 50 PROMPTS VALIDADOS - NUCLEO VIP\n\n01. High CTR Thumbnail: Shocked expression, volumetric light, 8k\n02. Cinematic Landscape: 35mm anamorphic lens, shallow DoF\n03. Dark Channel Mistery: Foggy forest, god rays, eerie lighting',
      mimeType: 'text/plain',
    }
  },
  {
    id: 'res-checklist-criacao',
    title: 'Checklist de 6 Pontos para Criação de Prompts',
    subtitle: 'Guia de bolso para validar seu prompt antes de gastar créditos de geração.',
    category: 'guias',
    requiredPlan: 'trial',
    fileFormat: 'PDF',
    downloadSize: '820 KB',
    iconName: 'CheckCircle2',
    badge: 'Starter VIP',
    previewContent: `CHECKLIST DE OURO PARA PROMPTS:
[ ] 1. Sujeito principal definido com clareza (sem termos vagos)?
[ ] 2. Tipo de lente e enquadramento especificados (ex: 35mm, 85mm portrait, wide shot)?
[ ] 3. Iluminação física descrita (ex: volumetric god rays, softbox, neon rim light)?
[ ] 4. Resolução e renderizador (ex: photorealistic 8k, Unreal Engine 5 render)?
[ ] 5. Relação de aspecto (16:9 ou 9:16) adequada para a plataforma?
[ ] 6. Ausência de palavras proibidas ou contraditórias?`,
    downloadData: {
      filename: 'checklist-criacao-prompts-nucleovip.txt',
      content: 'CHECKLIST DE CRIACAO DE PROMPTS - NUCLEO VIP\n\n1. Sujeito\n2. Lente\n3. Luz\n4. Render\n5. Aspect Ratio\n6. Consistência',
      mimeType: 'text/plain',
    }
  },

  // --- PLANO PRO CREATOR VIP (R$ 14,99/mês) ---
  {
    id: 'res-mega-pack-500',
    title: 'Mega Pack +500 Prompts Profissionais Categorizados',
    subtitle: 'O maior acervo de prompts testados para Thumbnails, Personagens, Cenas 3D e Vídeos.',
    category: 'prompts',
    requiredPlan: 'pro',
    fileFormat: 'TXT / JSON',
    downloadSize: '2.8 MB',
    iconName: 'Sparkles',
    badge: 'PRO VIP',
    previewContent: `MEGA PACK +500 PROMPTS ORGANIZADOS:
- 120 Prompts de Thumbnails YouTube de Alto CTR
- 100 Prompts de Cenas Cinematográficas de Vídeo (Veo, Kling, Seedance)
- 90 Prompts de Personagens Consistentes & Retratos Hiper-Realistas
- 80 Prompts de Cenários Sci-Fi, Cyberpunk & Fantasia
- 60 Prompts de E-commerce & Fotografia de Produto High-End
- 50 Prompts de Iluminação & Câmeras de Cinema`,
    downloadData: {
      filename: 'mega-pack-500-prompts-pro-nucleovip.txt',
      content: 'MEGA PACK +500 PROMPTS PROFISSIONAIS - NUCLEO VIP PRO\n\n[SECAO 1: THUMBNAILS]\n... [SECAO 2: CENAS CINEMATOGRAFICAS]\n... [SECAO 3: PERSONAGENS CONSISTENTES]',
      mimeType: 'text/plain',
    }
  },
  {
    id: 'res-guia-canais-dark',
    title: 'Manual de Canais Dark Lucrativos com IA',
    subtitle: 'Passo a passo completo de roteirização, vozes sintéticas, edição dinâmica e monetização.',
    category: 'guias',
    requiredPlan: 'pro',
    fileFormat: 'PDF',
    downloadSize: '4.2 MB',
    iconName: 'Film',
    badge: 'PRO VIP',
    previewContent: `MANUAL DE CANAIS DARK LUCRATIVOS COM IA:
Capítulo 1: Os 7 Nichos com maior CPM e engajamento no YouTube.
Capítulo 2: Como estruturar roteiros com retenção de mais de 70%.
Capítulo 3: Criando vozes neurais realistas e sem parecer robô.
Capítulo 4: Geração de imagens e vídeos em lote com IA.
Capítulo 5: Estratégias de SEO, Títulos e Thumbnails irresistíveis.`,
    downloadData: {
      filename: 'manual-canais-dark-lucrativos-nucleovip.pdf',
      content: 'MANUAL DE CANAIS DARK LUCRATIVOS COM IA - NUCLEO VIP PRO',
      mimeType: 'text/plain',
    }
  },
  {
    id: 'res-character-bible',
    title: 'Character Bible Template & Fichas de Consistência',
    subtitle: 'Template pronto para manter o mesmo rosto, roupas e sementes em múltiplos prompts.',
    category: 'templates',
    requiredPlan: 'pro',
    fileFormat: 'PDF / TXT',
    downloadSize: '1.1 MB',
    iconName: 'Layers',
    badge: 'PRO VIP',
    previewContent: `CHARACTER BIBLE TEMPLATE:
- Ficha de Identidade do Personagem (Nome, Idade, Etnia, Cabelo, Olhos, Cicatrizes)
- Prompt Âncora (Seed Prompt) para fixação facial
- Variações de Poses (Frontal, Perfil 45°, Olhando para a Câmera, Ação em Movimento)
- Variações de Iluminação mantendo a mesma identidade`,
    downloadData: {
      filename: 'character-bible-template-nucleovip.txt',
      content: 'CHARACTER BIBLE TEMPLATE - NUCLEO VIP PRO\n\nFicha de Identidade:\nPrompt Ancora:\nVariações de Pose:',
      mimeType: 'text/plain',
    }
  },
  {
    id: 'res-planner-criador',
    title: 'Planner de Produção de Conteúdo & Calendário Editorial',
    subtitle: 'Planilha estruturada para organizar suas ideias, roteiros e cronograma de postagens.',
    category: 'templates',
    requiredPlan: 'pro',
    fileFormat: 'PDF / CSV',
    downloadSize: '950 KB',
    iconName: 'BookOpen',
    badge: 'PRO VIP',
    previewContent: `PLANNER DO CRIADOR DE CONTEÚDO:
- Tabela de Ideias & Score de Validação
- Status de Produção (Roteirizado, Imagens Geradas, Editado, Publicado)
- Controle de Métricas e CTR por Vídeo`,
    downloadData: {
      filename: 'planner-producao-conteudo-nucleovip.csv',
      content: 'Data,Tema,Formato,Nicho,Status,CTR Estimado,Link\n2026-09-05,Misterio de Atlantida,9:16,Misterio,Pronto,96%,https://youtube.com',
      mimeType: 'text/csv',
    }
  },

  // --- PLANO AGÊNCIA & STUDIO MASTER (R$ 29,99/mês) ---
  {
    id: 'res-super-pack-1000',
    title: 'Super Pack +1000 Prompts Comerciais & High-End',
    subtitle: 'O acervo definitivo para agências, criativos de anúncios Meta/TikTok e campanhas de escala.',
    category: 'prompts',
    requiredPlan: 'agency',
    fileFormat: 'TXT / JSON',
    downloadSize: '6.4 MB',
    iconName: 'Sparkles',
    badge: 'Studio Master',
    previewContent: `SUPER PACK +1000 PROMPTS HIGH-END:
- 300 Prompts de Criativos Publicitários & Meta Ads (Alta Conversão)
- 250 Prompts de E-commerce, Joias, Cosméticos & Lifestyle
- 200 Prompts de Cinematografia 8k para Vídeos Comerciais
- 150 Prompts de Arquitetura, Interiores & Cenografia Luxo
- 100 Prompts de Identidade Visual de Marcas & Mockups`,
    downloadData: {
      filename: 'super-pack-1000-prompts-comerciais-studio-master.txt',
      content: 'SUPER PACK +1000 PROMPTS COMERCIAIS - STUDIO MASTER\n\n[SECAO 1: META ADS]\n... [SECAO 2: E-COMMERCE]\n... [SECAO 3: CINEMA COMERCIAL]',
      mimeType: 'text/plain',
    }
  },
  {
    id: 'res-contrato-servicos-ia',
    title: 'Contrato Modelo de Prestação de Serviços de IA & Direitos',
    subtitle: 'Documento jurídico editável para fechar projetos de criação com clientes e empresas.',
    category: 'templates',
    requiredPlan: 'agency',
    fileFormat: 'DOCX / PDF',
    downloadSize: '540 KB',
    iconName: 'FileText',
    badge: 'Studio Master',
    previewContent: `CONTRATO DE PRESTAÇÃO DE SERVIÇOS DE ENGENHARIA DE PROMPTS & IA:
Cláusula 1: Do Objeto e Entregáveis.
Cláusula 2: Dos Direitos Autorais e Propriedade Intelectual das Imagens/Vídeos.
Cláusula 3: Dos Prazos, Pagamentos e Revisões.
Cláusula 4: Da Confidencialidade e Isenção de Responsabilidade.`,
    downloadData: {
      filename: 'contrato-prestacao-servicos-ia-nucleovip.txt',
      content: 'CONTRATO DE PRESTACAO DE SERVICOS DE IA - NUCLEO VIP STUDIO MASTER',
      mimeType: 'text/plain',
    }
  },
  {
    id: 'res-projeto3-sourcecode',
    title: 'Código-Fonte Completo do Gerador em Massa (Projeto 3 Python + FFmpeg)',
    subtitle: 'Script CLI automatizado para gerar centenas de vídeos MP4 em lote no seu computador.',
    category: 'ferramentas',
    requiredPlan: 'agency',
    fileFormat: 'ZIP / Python',
    downloadSize: '350 KB',
    iconName: 'Code2',
    badge: 'Studio Master',
    previewContent: `YOUTUBE VIDEO GENERATOR (PROJETO 3):
- main.py (CLI com suporte a --input, --output, --width, --height, --duration)
- generator/cover_art.py (Geração de imagens via Pollinations.ai)
- generator/video_maker.py (Renderização em MP4 com FFmpeg)
- prompts.txt (Lista pré-configurada de prompts de alta definição)
- requirements.txt e README completo de instalação.`,
    downloadData: {
      filename: 'projeto3-youtube-video-generator-python.zip',
      content: 'PROJETO 3 YOUTUBE VIDEO GENERATOR PYTHON CLI\n\nExecute: python main.py --input prompts.txt --output output/',
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
                {plan === 'agency' ? 'Studio Master' : plan === 'pro' ? 'PRO Creator VIP' : plan === 'trial' ? 'Teste 7 Dias' : 'Degustação'}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              {plan === 'agency'
                ? 'Você possui acesso total a todos os materiais e códigos da plataforma.'
                : plan === 'pro'
                ? 'Acesso a todos os materiais PRO + Mega Pack +500 Prompts e Guias Dark.'
                : 'Você está no plano Teste. Faça upgrade para o PRO VIP para liberar todos os +500 prompts e manuais.'}
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
