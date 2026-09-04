import React from 'react';
import { Header } from './Header';
import { HeroSection } from './HeroSection';
import { HowItWorks } from './HowItWorks';
import { Applications } from './Applications';
import { MultiAiSection } from './MultiAiSection';
import { ComparativeSection } from './ComparativeSection';
import { BeforeAfterSection } from './BeforeAfterSection';
import { PricingSection } from './PricingSection';
import { FaqSection } from './FaqSection';
import { FinalCta } from './FinalCta';
import { Footer } from './Footer';

interface LandingPageProps {
  onNavigateToLogin: () => void;
  onNavigateToSignup: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigateToLogin,
  onNavigateToSignup,
}) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white flex flex-col">
      <Header
        onNavigateToLogin={onNavigateToLogin}
        onNavigateToSignup={onNavigateToSignup}
      />
      <main className="flex-1">
        <HeroSection onNavigateToSignup={onNavigateToSignup} />
        <HowItWorks />
        <Applications />
        <MultiAiSection />
        <ComparativeSection />
        <BeforeAfterSection />
        <PricingSection onNavigateToSignup={onNavigateToSignup} />
        <FaqSection />
        <FinalCta onNavigateToSignup={onNavigateToSignup} />
      </main>
      <Footer
        onNavigateToLogin={onNavigateToLogin}
        onNavigateToSignup={onNavigateToSignup}
      />
    </div>
  );
};
