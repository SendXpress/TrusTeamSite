import { useTranslation } from 'react-i18next';

export function PaymentModel() {
  const { t } = useTranslation();

  const features = [
    {
      icon: "fas fa-puzzle-piece",
      title: 'paymentModel.features.modules'
    },
    {
      icon: "fas fa-code",
      title: 'paymentModel.features.sourceCode'
    },
    {
      icon: "fas fa-sync-alt",
      title: 'paymentModel.features.agile'
    }
  ];

  const processSteps = [
    'paymentModel.process.requirements',
    'paymentModel.process.development',
    'paymentModel.process.validation',
    'paymentModel.process.payment',
    'paymentModel.process.support'
  ];

  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Texto e Benefícios */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900">
              {t('paymentModel.title')}{' '}
              <span className="text-primary-600">{t('paymentModel.titleHighlight')}</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">{t('paymentModel.description')}</p>

            <div className="mt-8 space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 text-white">
                    <i className={`${feature.icon} text-xl`}></i>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {t(feature.title)}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          {/* Processo de Pagamento */}
          <div className="bg-white shadow-lg rounded-2xl p-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-primary-600 uppercase">
                {t('paymentModel.processTitle')}
              </h3>
            </div>
            <ul className="mt-6 space-y-5">
              {processSteps.map((step, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
                    <i className="fas fa-check"></i>
                  </span>
                  <p className="text-gray-700">{t(step)}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
