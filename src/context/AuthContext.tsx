import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, PlanType } from '../types';
import { supabase, isSupabaseConfigured } from '../services/supabaseClient';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isCloudConnected: boolean;
  plan: PlanType;
  dailyGenerationsUsed: number;
  maxDailyGenerations: number;
  canGenerate: () => boolean;
  incrementGenerationCount: () => void;
  upgradePlan: (newPlan: PlanType) => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, confirmPassword: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_AUTH_STORAGE_KEY = 'prompt_studio_user_session';
const LOCAL_USERS_DB_KEY = 'prompt_studio_registered_users';
const DAILY_USAGE_KEY = 'prompt_studio_daily_usage';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dailyGenerationsUsed, setDailyGenerationsUsed] = useState<number>(0);

  // Inicializar contador diário
  useEffect(() => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const savedUsage = localStorage.getItem(DAILY_USAGE_KEY);
      if (savedUsage) {
        const parsed = JSON.parse(savedUsage);
        if (parsed.date === today) {
          setDailyGenerationsUsed(parsed.count || 0);
        } else {
          // Novo dia, zera o contador
          localStorage.setItem(DAILY_USAGE_KEY, JSON.stringify({ date: today, count: 0 }));
          setDailyGenerationsUsed(0);
        }
      }
    } catch (e) {
      console.error('Erro ao ler uso diário:', e);
    }
  }, []);

  // Carregar usuário e plano
  useEffect(() => {
    // 1. Verificar se há parâmetros de ativação imediata da Cakto na URL
    try {
      const searchStr = window.location.search || (window.location.hash.includes('?') ? window.location.hash.split('?')[1] : '');
      const params = new URLSearchParams(searchStr);
      const urlPlan = params.get('plan') || params.get('plano');
      const status = params.get('status') || params.get('payment_status') || 'approved';
      const customerEmail = params.get('email') || params.get('customer_email') || params.get('buyer_email') || '';
      const customerName = params.get('name') || params.get('customer_name') || params.get('buyer_name') || '';

      if (urlPlan && (status === 'approved' || status === 'success' || status === 'paid' || status === 'pago' || !params.has('status'))) {
        let mappedPlan: PlanType = 'trial';
        if (urlPlan.toLowerCase().includes('agency') || urlPlan.toLowerCase().includes('master')) mappedPlan = 'agency';
        else if (urlPlan.toLowerCase().includes('pro')) mappedPlan = 'pro';
        else if (urlPlan.toLowerCase().includes('starter') || urlPlan.toLowerCase().includes('trial')) mappedPlan = 'trial';

        localStorage.setItem('prompt_studio_activated_plan', mappedPlan);
        localStorage.setItem('prompt_studio_just_purchased', mappedPlan);

        const newVipUser: User = {
          id: `usr_cakto_${Date.now()}`,
          name: customerName || (customerEmail ? customerEmail.split('@')[0] : 'Membro VIP'),
          email: customerEmail || 'membro@nucleovip.com.br',
          createdAt: new Date().toISOString(),
          plan: mappedPlan,
        };

        setUser(newVipUser);
        localStorage.setItem(LOCAL_AUTH_STORAGE_KEY, JSON.stringify(newVipUser));
        setIsLoading(false);
        window.location.hash = 'app';
        return;
      }
    } catch (e) {
      console.warn('Erro ao processar ativação de URL Cakto:', e);
    }

    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session }, error }) => {
        if (!error && session?.user) {
          const userPlan = (session.user.user_metadata?.plan as PlanType) || 'trial';
          setUser({
            id: session.user.id,
            name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'Usuário',
            email: session.user.email || '',
            createdAt: session.user.created_at,
            plan: userPlan,
          });
        }
        setIsLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          const userPlan = (session.user.user_metadata?.plan as PlanType) || 'trial';
          setUser({
            id: session.user.id,
            name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'Usuário',
            email: session.user.email || '',
            createdAt: session.user.created_at,
            plan: userPlan,
          });
        } else {
          setUser(null);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    } else {
      try {
        const savedUser = localStorage.getItem(LOCAL_AUTH_STORAGE_KEY);
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (e) {
        console.error('Erro ao restaurar sessão local:', e);
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  const plan: PlanType = user?.plan || (localStorage.getItem('prompt_studio_activated_plan') as PlanType) || 'trial';
  const maxDailyGenerations = 999999;

  const canGenerate = (): boolean => {
    return true;
  };

  const incrementGenerationCount = () => {
    const today = new Date().toISOString().split('T')[0];
    const newCount = dailyGenerationsUsed + 1;
    setDailyGenerationsUsed(newCount);
    localStorage.setItem(DAILY_USAGE_KEY, JSON.stringify({ date: today, count: newCount }));
  };

  const upgradePlan = (newPlan: PlanType) => {
    if (!user) return;
    const updatedUser: User = {
      ...user,
      plan: newPlan,
    };
    setUser(updatedUser);
    localStorage.setItem(LOCAL_AUTH_STORAGE_KEY, JSON.stringify(updatedUser));
    localStorage.setItem('prompt_studio_activated_plan', newPlan);

    if (isSupabaseConfigured && supabase) {
      supabase.auth.updateUser({
        data: { plan: newPlan },
      }).then();
    }
  };

  const signup = async (name: string, email: string, password: string, confirmPassword: string) => {
    setIsLoading(true);

    if (!name.trim()) {
      setIsLoading(false);
      throw new Error('Por favor, informe seu nome completo.');
    }
    if (!email.includes('@') || !email.includes('.')) {
      setIsLoading(false);
      throw new Error('Por favor, informe um e-mail válido.');
    }
    if (password.length < 6) {
      setIsLoading(false);
      throw new Error('A senha deve ter no mínimo 6 caracteres.');
    }
    if (password !== confirmPassword) {
      setIsLoading(false);
      throw new Error('As senhas não coincidem.');
    }

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            plan: 'free',
          },
        },
      });

      if (error) {
        setIsLoading(false);
        throw new Error(error.message);
      }

      if (data.user) {
        const newUser: User = {
          id: data.user.id,
          name,
          email,
          createdAt: data.user.created_at,
          plan: 'free',
        };
        setUser(newUser);
      }
      setIsLoading(false);
      return;
    }

    // Fallback local
    await new Promise((resolve) => setTimeout(resolve, 500));
    const usersListJson = localStorage.getItem(LOCAL_USERS_DB_KEY) || '[]';
    const usersList: Array<{ name: string; email: string; passwordHash: string; plan?: PlanType }> = JSON.parse(usersListJson);

    if (usersList.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      setIsLoading(false);
      throw new Error('Este e-mail já está cadastrado. Faça login ou use outro.');
    }

    const newUserObj = {
      name,
      email: email.toLowerCase(),
      passwordHash: btoa(password),
      plan: 'free' as PlanType,
    };
    usersList.push(newUserObj);
    localStorage.setItem(LOCAL_USERS_DB_KEY, JSON.stringify(usersList));

    const authenticatedUser: User = {
      id: `usr_${Date.now()}`,
      name,
      email: email.toLowerCase(),
      createdAt: new Date().toISOString(),
      plan: 'free',
    };

    setUser(authenticatedUser);
    localStorage.setItem(LOCAL_AUTH_STORAGE_KEY, JSON.stringify(authenticatedUser));
    setIsLoading(false);
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    if (!email.includes('@')) {
      setIsLoading(false);
      throw new Error('Por favor, informe um e-mail válido.');
    }
    if (!password) {
      setIsLoading(false);
      throw new Error('Por favor, digite sua senha.');
    }

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (!error && data.user) {
          setUser({
            id: data.user.id,
            name: data.user.user_metadata?.name || data.user.email?.split('@')[0] || 'Usuário',
            email: data.user.email || '',
            createdAt: data.user.created_at,
            plan: (data.user.user_metadata?.plan as PlanType) || 'trial',
          });
          setIsLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Supabase login fallback:', err);
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 300));
    const usersListJson = localStorage.getItem(LOCAL_USERS_DB_KEY) || '[]';
    const usersList: Array<{ name: string; email: string; passwordHash: string; plan?: PlanType }> = JSON.parse(usersListJson);

    const foundUser = usersList.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (foundUser) {
      const authenticatedUser: User = {
        id: `usr_${Date.now()}`,
        name: foundUser.name,
        email: foundUser.email,
        createdAt: new Date().toISOString(),
        plan: foundUser.plan || 'trial',
      };
      setUser(authenticatedUser);
      localStorage.setItem(LOCAL_AUTH_STORAGE_KEY, JSON.stringify(authenticatedUser));
      setIsLoading(false);
      return;
    }

    const demoUser: User = {
      id: `usr_demo_${Date.now()}`,
      name: email.split('@')[0],
      email: email.toLowerCase(),
      createdAt: new Date().toISOString(),
      plan: 'trial',
    };
    setUser(demoUser);
    localStorage.setItem(LOCAL_AUTH_STORAGE_KEY, JSON.stringify(demoUser));
    setIsLoading(false);
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem(LOCAL_AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isCloudConnected: isSupabaseConfigured,
        plan,
        dailyGenerationsUsed,
        maxDailyGenerations,
        canGenerate,
        incrementGenerationCount,
        upgradePlan,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
