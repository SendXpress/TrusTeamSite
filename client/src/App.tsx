import { Switch, Route, useLocation } from "wouter";
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
      <Route path="/:lang?" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

// App com a funcionalidade de idioma usando useLanguage
function App() {
  const { i18n } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const [location] = useLocation();

  useEffect(() => {
    // Extrai o idioma da URL (ex: /es, /en)
    const langFromUrl = location.split("/")[1] || "en"; // Padrão para "en"
    
    if (langFromUrl !== language) {
      setLanguage(langFromUrl);
    }
  }, [location, language, setLanguage]);

  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
      document.documentElement.lang = language;
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
