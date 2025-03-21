import { useTranslation } from 'react-i18next';
import { apiRequest } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Schema for waitlist form
const waitlistSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  company: z.string().optional(),
  interest: z.string().min(1, { message: "Please select an area of interest." }),
  newsletter: z.boolean().default(false),
});

type WaitlistFormValues = z.infer<typeof waitlistSchema>;

export function Waitlist() {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  const form = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      interest: '',
      newsletter: false,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: WaitlistFormValues) => {
      return await apiRequest('POST', '/api/waitlist', data);
    },
    onSuccess: () => {
      toast({
        title: t('waitlist.success.title'),
        description: t('waitlist.success.description'),
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: t('waitlist.error.title'),
        description: t('waitlist.error.description'),
        variant: 'destructive',
      });
      console.error('Waitlist error:', error);
    },
  });

  function onSubmit(data: WaitlistFormValues) {
    mutate(data);
  }

  return (
    <div id="waitlist" className="bg-gradient-to-r from-primary-600 to-secondary-600 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white font-['Inter']">
            {t('waitlist.title')}
          </h2>
          <p className="mt-3 max-w-md mx-auto text-xl text-black font-medium bg-white bg-opacity-80 p-4 rounded-lg shadow">
            {t('waitlist.description')}
          </p>
        </div>
        <div className="mt-12 mx-auto max-w-md">
          <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('waitlist.form.name')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('waitlist.form.namePlaceholder')} {...field} />
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
                      <FormLabel>{t('waitlist.form.email')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('waitlist.form.emailPlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Company (Optional) */}
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('waitlist.form.company')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('waitlist.form.companyPlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Interested In */}
                <FormField
                  control={form.control}
                  name="interest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('waitlist.form.interest')}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('waitlist.form.interestPlaceholder')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="web">{t('waitlist.form.interests.web')}</SelectItem>
                          <SelectItem value="mobile">{t('waitlist.form.interests.mobile')}</SelectItem>
                          <SelectItem value="database">{t('waitlist.form.interests.database')}</SelectItem>
                          <SelectItem value="cloud">{t('waitlist.form.interests.cloud')}</SelectItem>
                          <SelectItem value="security">{t('waitlist.form.interests.security')}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Newsletter checkbox */}
                <FormField
                  control={form.control}
                  name="newsletter"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          {t('waitlist.form.newsletter')}
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isPending}
                >
                  {isPending ? t('common.submitting') : t('waitlist.form.submit')}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
