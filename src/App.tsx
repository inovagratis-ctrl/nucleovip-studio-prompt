import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { HistoryProvider } from './context/HistoryContext';
import { LandingPage } from './components/landing/LandingPage';
import { LoginPage } from './components/auth/LoginPage';
import { SignupPage } from './components/auth/SignupPage';
import { StudioPromptProApp } from './components/app/StudioPromptProApp';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

type AppRoute = 'landing' | 'login' | 'signup' | 'app';

const MainRouter: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'app') return 'app';
    if (hash === 'login') return 'login';
    if (hash === 'signup') return 'signup';
    return 'landing';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'app') setCurrentRoute('app');
      else if (hash === 'login') setCurrentRoute('login');
      else if (hash === 'signup') setCurrentRoute('signup');
      else setCurrentRoute('landing');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (route: AppRoute) => {
    setCurrentRoute(route);
    window.location.hash = route === 'landing' ? '' : route;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If already authenticated and visits login/signup, redirect to app
  useEffect(() => {
    if (isAuthenticated && (currentRoute === 'login' || currentRoute === 'signup')) {
      navigateTo('app');
    }
  }, [isAuthenticated, currentRoute]);

  if (currentRoute === 'login') {
    return (
      <LoginPage
        onNavigateToSignup={() => navigateTo('signup')}
        onNavigateToLanding={() => navigateTo('landing')}
        onSuccess={() => navigateTo('app')}
      />
    );
  }

  if (currentRoute === 'signup') {
    return (
      <SignupPage
        onNavigateToLogin={() => navigateTo('login')}
        onNavigateToLanding={() => navigateTo('landing')}
        onSuccess={() => navigateTo('app')}
      />
    );
  }

  if (currentRoute === 'app') {
    return (
      <ProtectedRoute onRedirectToLogin={() => navigateTo('login')}>
        <StudioPromptProApp />
      </ProtectedRoute>
    );
  }

  return (
    <LandingPage
      onNavigateToLogin={() => navigateTo('login')}
      onNavigateToSignup={() => navigateTo('signup')}
    />
  );
};

export default function App() {
  return (
    <AuthProvider>
      <HistoryProvider>
        <MainRouter />
      </HistoryProvider>
    </AuthProvider>
  );
}
