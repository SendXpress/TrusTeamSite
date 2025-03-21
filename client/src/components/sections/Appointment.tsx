import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { apiRequest } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { enUS, es, pt } from 'date-fns/locale';
import { useLanguage } from '@/hooks/use-language';

const dateLocales: Record<string, Locale> = {
  en: enUS,
  es: es,
  pt: pt,
};

const timeSlots = [
  '9:00 AM', '10:30 AM', '1:00 PM', 
  '2:30 PM', '4:00 PM', '5:30 PM'
];

// Schema for appointment form
const appointmentSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  phone: z.string().optional(),
  date: z.date({ required_error: "Please select a date." }),
  time: z.string({ required_error: "Please select a time slot." }),
  projectDescription: z.string().optional(),
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

export function Appointment() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { language } = useLanguage();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  
  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      projectDescription: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: AppointmentFormValues) => {
      return await apiRequest('POST', '/api/appointments', data);
    },
    onSuccess: () => {
      toast({
        title: t('appointment.success.title'),
        description: t('appointment.success.description'),
      });
      form.reset();
      setSelectedTimeSlot(null);
    },
    onError: (error) => {
      toast({
        title: t('appointment.error.title'),
        description: t('appointment.error.description'),
        variant: 'destructive',
      });
      console.error('Appointment error:', error);
    },
  });

  function onSubmit(data: AppointmentFormValues) {
    mutate(data);
  }

  const handleTimeSlotSelect = (time: string) => {
    setSelectedTimeSlot(time);
    form.setValue('time', time);
  };

  return (
    <div id="appointment" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 font-['Inter']">
              {t('appointment.title')}
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              {t('appointment.description')}
            </p>
            <div className="mt-8 bg-gray-50 rounded-lg p-6">
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900">{t('appointment.why.title')}</h3>
                <ul className="mt-2 list-disc pl-5 text-gray-500">
                  <li>{t('appointment.why.reasons.expert')}</li>
                  <li>{t('appointment.why.reasons.solutions')}</li>
                  <li>{t('appointment.why.reasons.estimate')}</li>
                  <li>{t('appointment.why.reasons.methodology')}</li>
                  <li>{t('appointment.why.reasons.payModel')}</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">{t('appointment.prepare.title')}</h3>
                <ul className="mt-2 list-disc pl-5 text-gray-500">
                  <li>{t('appointment.prepare.items.description')}</li>
                  <li>{t('appointment.prepare.items.requirements')}</li>
                  <li>{t('appointment.prepare.items.timeline')}</li>
                  <li>{t('appointment.prepare.items.budget')}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 lg:mt-0">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-8">
                <h3 className="text-xl font-medium text-gray-900 text-center mb-8">
                  {t('appointment.form.title')}
                </h3>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Date picker */}
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>{t('appointment.form.date')}</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start text-left font-normal"
                                >
                                  {field.value ? (
                                    format(field.value, 'PPP', { locale: dateLocales[language] })
                                  ) : (
                                    <span className="text-muted-foreground">{t('appointment.form.selectDate')}</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                locale={dateLocales[language]}
                                disabled={{ before: new Date() }}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Time slots */}
                    <div className="mb-6">
                      <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('appointment.form.timeSlots')}</FormLabel>
                            <div className="grid grid-cols-3 gap-2 mt-1">
                              {timeSlots.map((time) => (
                                <Button
                                  key={time}
                                  type="button"
                                  variant={selectedTimeSlot === time ? "default" : "outline"}
                                  className="h-auto py-2 justify-center text-sm"
                                  onClick={() => handleTimeSlotSelect(time)}
                                >
                                  {time}
                                </Button>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    {/* Name */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('appointment.form.name')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('appointment.form.namePlaceholder')} {...field} />
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
                          <FormLabel>{t('appointment.form.email')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('appointment.form.emailPlaceholder')} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Project Description */}
                    <FormField
                      control={form.control}
                      name="projectDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('appointment.form.project')}</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder={t('appointment.form.projectPlaceholder')} 
                              className="resize-none" 
                              rows={3} 
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
                      {isPending ? t('common.submitting') : t('appointment.form.submit')}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
