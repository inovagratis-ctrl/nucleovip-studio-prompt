export type CategoryType = 'thumbnail' | 'personagem' | 'cena' | 'video';

export type AIModelType = 'chatgpt' | 'nanobanana' | 'veo' | 'kling' | 'seedance';

export type PlanType = 'trial' | 'pro' | 'agency' | 'free';

export interface CategoryInfo {
  id: CategoryType;
  name: string;
  iconName: string;
  description: string;
  priorities: string[];
}

export interface AIModelInfo {
  id: AIModelType;
  name: string;
  type: 'image' | 'video' | 'multimodal';
  badge: string;
  tagline: string;
  supportedRatios: string[];
  maxDuration?: string;
  promptStyle: string;
  color: string;
}

export interface PromptRecommendation {
  aspectRatio: string;
  style?: string;
  framing?: string;
  duration?: string;
  lighting?: string;
  cameraMovement?: string;
  engineTips?: string;
}

export interface GeneratedPromptResult {
  id: string;
  timestamp: number;
  originalIdea: string;
  category: CategoryType;
  model: AIModelType;
  optimizedPrompt: string;
  recommendations: PromptRecommendation;
  breakdown: {
    subject: string;
    environment: string;
    compositionAndLighting: string;
    styleAndAtmosphere: string;
    technicalSettings: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  plan: PlanType;
}

export type ActiveTab = 'generate' | 'optimize' | 'compare' | 'videodark' | 'members';

export type VideoFormat = '9:16' | '16:9';

export type VideoNiche =
  | 'curiosidades'
  | 'misterio'
  | 'historia'
  | 'tecnologia'
  | 'financas'
  | 'espaco'
  | 'ficcao'
  | 'truecrime';

export type VideoTone = 'cinematic' | 'suspense' | 'energetic' | 'educational' | 'dramatic';

export interface VideoScene {
  sceneNumber: number;
  timeRange: string; // ex: "0:00 - 0:04"
  narration: string;
  visualPrompt: string;
  cameraMovement: string;
  aspectRatio: VideoFormat;
  generatedImageUrl?: string;
}

export interface VideoTitleOption {
  title: string;
  ctrScore: number; // 0 a 100
  triggers: string[]; // ex: ["Curiosidade Extrema", "Medo de Perder", "Urgência"]
}

export interface VideoDarkProject {
  id: string;
  timestamp: number;
  topic: string;
  format: VideoFormat;
  niche: VideoNiche;
  tone: VideoTone;
  estimatedDuration: string;
  hooks: string[];
  selectedHookIndex: number;
  titles: VideoTitleOption[];
  tags: string[];
  description: string;
  scenes: VideoScene[];
}

export interface MemberResource {
  id: string;
  title: string;
  subtitle: string;
  category: 'prompts' | 'guias' | 'roteiros' | 'templates' | 'ferramentas';
  requiredPlan: 'trial' | 'pro' | 'agency';
  fileFormat: string; // 'PDF', 'TXT', 'ZIP', 'JSON'
  downloadSize?: string;
  iconName: string;
  badge?: string;
  previewContent?: string;
  downloadData?: {
    filename: string;
    content: string;
    mimeType: string;
  };
}
