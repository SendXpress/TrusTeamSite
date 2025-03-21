import { useTranslation } from 'react-i18next';
import { apiRequest } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

// Schema for contact form
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  phone: z.string().optional(),
  subject: z.string().min(2, { message: "Subject must be at least 2 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function Contact() {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      return await apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      toast({
        title: t('contact.success.title'),
        description: t('contact.success.description'),
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: t('contact.error.title'),
        description: t('contact.error.description'),
        variant: 'destructive',
      });
      console.error('Contact error:', error);
    },
  });

  function onSubmit(data: ContactFormValues) {
    mutate(data);
  }

  return (
    <div id="contact" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 font-['Inter']">
              {t('contact.title')}
            </h2>
            <p className="mt-3 text-lg text-gray-500">
              {t('contact.description')}
            </p>
            <div className="mt-9 grid grid-cols-1 md:grid-cols-2 gap-8">
  {/* 🇧🇷 Brasil */}
  <div className="p-6 border rounded-lg shadow-sm bg-white">
    <h3 className="text-lg font-semibold text-primary-600 flex items-center">
      <i className="fas fa-flag mr-2"></i> Brasil
    </h3>
    <div className="mt-4 space-y-4">
      {/* Email */}
      <div className="flex items-center">
        <i className="fas fa-envelope text-primary-500 text-lg mr-3"></i>
        <p className="text-gray-600">contato@trusteam.com.br</p>
      </div>
      {/* Telefone */}
      <div className="flex items-center">
        <i className="fas fa-phone text-primary-500 text-lg mr-3"></i>
        <p className="text-gray-600">+55 (21) 98054-3777</p>
      </div>
      {/* Endereço */}
      <div className="flex items-start">
        <i className="fas fa-map-marker-alt text-primary-500 text-lg mr-3"></i>
        <p className="text-gray-600">
          Av. Caetano Gornatti, 1101, Cj 167 <br /> Jundiaí, SP - Brasil
        </p>
      </div>
    </div>
  </div>

  {/* 🇪🇸 Espanha */}
  <div className="p-6 border rounded-lg shadow-sm bg-white">
    <h3 className="text-lg font-semibold text-primary-600 flex items-center">
      <i className="fas fa-flag mr-2"></i> España
    </h3>
    <div className="mt-4 space-y-4">
      {/* Email */}
      <div className="flex items-center">
        <i className="fas fa-envelope text-primary-500 text-lg mr-3"></i>
        <p className="text-gray-600">contato@trusteam.es</p>
      </div>
      {/* Telefone */}
      <div className="flex items-center">
        <i className="fas fa-phone text-primary-500 text-lg mr-3"></i>
        <p className="text-gray-600">+34 611 81 91 55</p>
      </div>
      {/* Endereço */}
      <div className="flex items-start">
        <i className="fas fa-map-marker-alt text-primary-500 text-lg mr-3"></i>
        <p className="text-gray-600">
          Calle de María Ignácia, 1, 1D <br /> Madrid, Madrid - España
        </p>
      </div>
    </div>
  </div>
</div>

            <div className="mt-8 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">LinkedIn</span>
                <i className="fab fa-linkedin text-2xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <i className="fab fa-twitter text-2xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">GitHub</span>
                <i className="fab fa-github text-2xl"></i>
              </a>
            </div>
          </div>
          <div className="mt-12 lg:mt-0">
            <div className="bg-white p-6 shadow rounded-lg sm:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.form.name')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('contact.form.namePlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.form.email')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('contact.form.emailPlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Phone */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.form.phone')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('contact.form.phonePlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Subject */}
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.form.subject')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('contact.form.subjectPlaceholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Message */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('contact.form.message')}</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={t('contact.form.messagePlaceholder')} 
                            className="resize-none" 
                            rows={4} 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isPending}
                  >
                    {isPending ? t('common.submitting') : t('contact.form.submit')}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
