import { useTranslation } from 'react-i18next';

export function Certifications() {
  const { t } = useTranslation();

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Título e descrição */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {t('certifications.title')}
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
            {t('certifications.description')}
          </p>
        </div>

        {/* Grid de Certificações */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Microsoft */}
          <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="h-20 w-20 bg-primary-500 flex items-center justify-center rounded-full shadow-md">
            <img src="/images/microsoft-certified-technology-specialist-125x125.webp" alt="Microsoft Certified" />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-gray-900">Microsoft</h3>
            <ul className="mt-3 text-gray-600 text-base space-y-1">
              <li>{t('certifications.microsoft.mct')}</li>
              <li>{t('certifications.microsoft.mcsa')}</li>
              <li>{t('certifications.microsoft.mcp')}</li>
              <li>{t('certifications.microsoft.mcts')}</li>
            </ul>
          </div>

          {/* VMware */}
          <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="h-20 w-20 bg-primary-500 flex items-center justify-center rounded-full shadow-md">
              <img src="/images/vcp-1.png" alt="VMware Certified" />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-gray-900">VMware</h3>
            <ul className="mt-3 text-gray-600 text-base space-y-1">
              <li>{t('certifications.vmware.vsp')}</li>
              <li>{t('certifications.vmware.vtsp')}</li>
            </ul>
          </div>

          {/* Outras certificações (exemplo) */}
          <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="h-20 w-20 bg-primary-500 flex items-center justify-center rounded-full shadow-md">
            <img src="/images/ISO-27001-2-1.png" alt="ISO-27001" />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-gray-900">Segurança</h3>
            <ul className="mt-3 text-gray-600 text-base space-y-1">
              <li>{t('ISO-27001')}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}