import { useState, useEffect } from 'react';

export type Language = 'en' | 'es' | 'pt';

// Usando uma abordagem mais simples para o idioma, sem contexto do React
export function useLanguage() {
  // Try to get language from localStorage or default to 'pt'
  const getStoredLanguage = (): Language => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('language') as Language) || 'pt';
    }
    return 'pt';
  };
  
  const [language, setLanguageState] = useState<Language>(getStoredLanguage());

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    // Save to localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', newLanguage);
    }
  };

  // Detectar o idioma do navegador na inicialização
  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (!storedLanguage) {
      // Se não houver idioma armazenado, use o idioma do navegador (ou pt como padrão)
      const browserLang = navigator.language.split('-')[0];
      const supportedLang = ['en', 'es', 'pt'].includes(browserLang) 
        ? browserLang as Language 
        : 'pt';
      setLanguage(supportedLang);
    }
  }, []);

  return { language, setLanguage };
}

// Componente vazio apenas para manter a compatibilidade com imports existentes
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}