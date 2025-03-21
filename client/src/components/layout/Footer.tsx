import { useTranslation } from 'react-i18next';
import { Link } from 'wouter';

export function Footer() {
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
    <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-white font-['Inter']">TrusTeam</span>
            </div>
            <p className="mt-4 text-base text-gray-300">
              {t('footer.description')}
            </p>
            <div className="mt-6 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">GitHub</span>
                <i className="fab fa-github text-xl"></i>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              {t('footer.services')}
            </h3>
            <ul role="list" className="mt-4 space-y-3">
              <li>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}
                  className="text-base text-gray-300 hover:text-white"
                >
                  {t('footer.webDev')}
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}
                  className="text-base text-gray-300 hover:text-white"
                >
                  {t('footer.mobileDev')}
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}
                  className="text-base text-gray-300 hover:text-white"
                >
                  {t('footer.database')}
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}
                  className="text-base text-gray-300 hover:text-white"
                >
                  {t('footer.cloud')}
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}
                  className="text-base text-gray-300 hover:text-white"
                >
                  {t('footer.security')}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              {t('footer.company')}
            </h3>
            <ul role="list" className="mt-4 space-y-3">
              <li>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
                  className="text-base text-gray-300 hover:text-white"
                >
                  {t('footer.about')}
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); scrollToSection('team'); }}
                  className="text-base text-gray-300 hover:text-white"
                >
                  {t('footer.team')}
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">
                  {t('footer.careers')}
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">
                  {t('footer.blog')}
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">
                  {t('footer.privacy')}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between">
          <p className="text-base text-gray-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} TrusTeam. {t('footer.copyright')}
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-base text-gray-400 hover:text-white">
              {t('footer.privacy')}
            </a>
            <a href="#" className="text-base text-gray-400 hover:text-white">
              {t('footer.terms')}
            </a>
            <a href="#" className="text-base text-gray-400 hover:text-white">
              {t('footer.cookies')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
