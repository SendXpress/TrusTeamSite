import { useTranslation } from 'react-i18next';
import { constants } from '@/utils/constants';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function FAQ() {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 font-['Inter']">
            {t('faq.title')}
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
            {t('faq.description')}
          </p>
        </div>
        <div className="mt-12 max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {constants.faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`} className="border rounded-lg p-2">
                <AccordionTrigger className="text-lg font-medium text-gray-900 py-4 px-2">
                  {t(`faq.items.${faq.id}.question`)}
                </AccordionTrigger>
                <AccordionContent className="text-base text-gray-500 px-2 pb-4 pt-2">
                  {t(`faq.items.${faq.id}.answer`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
