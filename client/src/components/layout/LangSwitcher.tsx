import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function LangSwitcher() {
  const { language, setLanguage } = useLanguage();
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const languageFullLabels: Record<string, string> = {
    en: 'English EN-US',
    es: 'Español ES-ES',
    pt: 'Português PT-BR'
  };

  // Função para mudar o idioma garantindo que a mudança seja aplicada em todos os lugares
  const handleLanguageChange = (newLang: 'en' | 'es' | 'pt') => {
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
    document.documentElement.lang = newLang;
    setOpen(false);
  };

  // Este efeito garante que o idioma seja sincronizado com o i18n
  useEffect(() => {
    if (language && language !== i18n.language) {
      i18n.changeLanguage(language);
      document.documentElement.lang = language;
    }
  }, [language, i18n]);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1 h-9 px-3 min-w-[120px]">
          <span>{languageFullLabels[language]}</span>
          <ChevronDown className="h-4 w-4 ml-auto" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem onClick={() => handleLanguageChange('en')} className="flex items-center justify-between py-2 cursor-pointer">
          <span className="font-medium">English</span>
          <span className="text-xs text-gray-500 ml-2">EN-US</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange('es')} className="flex items-center justify-between py-2 cursor-pointer">
          <span className="font-medium">Español</span>
          <span className="text-xs text-gray-500 ml-2">ES-ES</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange('pt')} className="flex items-center justify-between py-2 cursor-pointer">
          <span className="font-medium">Português</span>
          <span className="text-xs text-gray-500 ml-2">PT-BR</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
