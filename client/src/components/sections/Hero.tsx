import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

export function Hero() {
  const { t } = useTranslation();
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div id="home" className="relative bg-gradient-to-r from-blue-600 to-green-600 overflow-hidden">
      <div className="absolute inset-y-0 w-full h-full bg-black opacity-40"></div> {/* Fundo mais sutil */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="pt-10 pb-20 sm:pt-16 sm:pb-32 lg:pt-24 lg:pb-32">
          <div className="text-center text-white">
            <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl font-['Inter']">
              <span className="block">{t('hero.title1')}</span>
              <span className="block text-green-500">{t('hero.title2')}</span>
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl font-medium text-white bg-opacity-70 p-4 rounded-lg shadow-md">
              {t('hero.description')}
            </p>
            <div className="mt-12 max-w-md mx-auto sm:max-w-none sm:flex sm:justify-center">
              <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                <Button 
                    variant="default"
                    size="lg"
                    className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-700 hover:bg-blue-600 sm:px-8"
                    onClick={() => scrollToSection('contact')}
                  >
                  {t('hero.contactButton')}
                </Button>
                <Button 
                  variant="default" 
                  size="lg"
                  className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-500 hover:bg-green-600 sm:px-8"
                  onClick={() => scrollToSection('waitlist')}
                >
                  {t('hero.waitlistButton')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
