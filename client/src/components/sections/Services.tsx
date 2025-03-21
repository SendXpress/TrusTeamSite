import { useTranslation } from 'react-i18next';
import { constants } from '@/utils/constants';

export function Services() {
  const { t } = useTranslation();

  return (
    <div id="services" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl font-['Inter']">
            {t('services.title')}
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            {t('services.description')}
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {constants.services.map((service, index) => (
            <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-12 w-12 bg-primary-500 rounded-md flex items-center justify-center">
                    <i className={`${service.icon} text-white text-2xl`}></i>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{t(`services.items.${service.id}.title`)}</h3>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-base text-gray-500">
                    {t(`services.items.${service.id}.description`)}
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-3">
                <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                  {t('services.learnMore')} <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
