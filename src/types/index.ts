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

export type ActiveTab = 'generate' | 'optimize' | 'compare';
