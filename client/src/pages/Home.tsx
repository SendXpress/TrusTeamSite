import { useTranslation } from 'react-i18next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Certifications } from '@/components/sections/Certifications';
import { Services } from '@/components/sections/Services';
import { ExperienceProjects } from '@/components/sections/ExperienceProjects';
import { PaymentModel } from '@/components/sections/PaymentModel';
import { Team } from '@/components/sections/Team';
import { Appointment } from '@/components/sections/Appointment';
import { Waitlist } from '@/components/sections/Waitlist';
import { FAQ } from '@/components/sections/FAQ';
import { Contact } from '@/components/sections/Contact';
import { Helmet } from 'react-helmet';

export default function Home() {
  const { t, i18n } = useTranslation();
  
  return (
    <>
      <Helmet>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        <meta name="keywords" content={t('meta.keywords')} />
        <html lang={i18n.language} />
      </Helmet>
      
      <Navbar />
      
      <main>
        <Hero />
        <Certifications />
        <Services />
        <ExperienceProjects />
        <PaymentModel />
        <Team />
        <Appointment />
        <Waitlist />
        <FAQ />
        <Contact />
      </main>
      
      <Footer />
    </>
  );
}
