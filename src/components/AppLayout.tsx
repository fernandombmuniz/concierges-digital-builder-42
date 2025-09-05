import { ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
  showLogo?: boolean;
}

export function AppLayout({ children, showLogo = true }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {showLogo && (
        <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col items-center">
              <img 
                src="/concierge-logo-new.png" 
                alt="Concierge Segurança Digital" 
                className="h-24 w-auto mb-4"
              />
              <h1 className="text-2xl font-bold gradient-cyber bg-clip-text text-transparent">
                Concierge Interactive Experience
              </h1>
            </div>
          </div>
        </header>
      )}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}