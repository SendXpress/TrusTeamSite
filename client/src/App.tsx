import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import '@/i18n';
import { useLanguage } from "./hooks/use-language";

// Simple Router component
function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

// App com a funcionalidade de idioma usando useLanguage
function App() {
  const { i18n } = useTranslation();
  const { language } = useLanguage();
  
  useEffect(() => {
    // Mudar o idioma sempre que o language mudar e 
    // garantir que a mudança seja aplicada imediatamente
    if (language) {
      // Forçar a atualização do idioma no i18n e no documento
      i18n.changeLanguage(language);
      document.documentElement.lang = language;
      
      // Garantir persistência
      if (typeof window !== 'undefined') {
        localStorage.setItem('language', language);
      }
    }
  }, [language, i18n]);

  return (
    <>
      <Router />
      <Toaster />
    </>
  );
}

export default App;
