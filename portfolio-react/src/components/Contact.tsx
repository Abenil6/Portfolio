import { Mail, Phone, MapPin, Twitter, Linkedin, Github, Instagram, Send, Loader2, Sparkles } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import api from '@/lib/axios';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
  { icon: Mail, title: 'Email', value: 'abenilee740@gmail.com', href: 'mailto:abenilee740@gmail.com', color: 'from-blue-500 to-indigo-500' },
  { icon: Phone, title: 'Phone', value: '+251944167574', href: 'tel:+251944167574', color: 'from-indigo-500 to-purple-500' },
  { icon: MapPin, title: 'Location', value: 'Addis Ababa, Ethiopia', color: 'from-purple-500 to-pink-500' },
];

function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await api.post('/contact', data);
      toast.success('Message sent! I will respond within 24 hours.');
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please reach out via email.');
    }
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-xs font-black uppercase tracking-[0.3em] text-blue-400 bg-blue-900/40 rounded-full border border-blue-800/50"
          >
            <Sparkles size={14} /> Available for hire
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-white tracking-tighter"
          >
            Let's Start <span className="text-gradient">Something</span>
          </motion.h2>
        </div>

        <div className="glass rounded-[3.5rem] overflow-hidden border-white/5 shadow-2xl">
          <div className="lg:flex">
            {/* Dark Sidebar */}
            <div className="lg:w-2/5 bg-slate-950/50 p-12 lg:p-16 text-white relative border-r border-white/5">
              <h3 className="text-3xl font-black mb-8 tracking-tight">Contact <br/>Details</h3>
              <p className="text-slate-400 mb-12 text-lg font-medium leading-relaxed">
                I'm currently looking for new opportunities and my inbox is always open. 
              </p>

              <div className="space-y-10">
                {contactInfo.map((info, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ x: 10 }}
                    className="flex items-center group"
                  >
                    <div className={`w-14 h-14 bg-gradient-to-br ${info.color} rounded-2xl flex items-center justify-center mr-6 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform`}>
                      <info.icon size={28} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{info.title}</p>
                      {info.href ? (
                        <a href={info.href} className="text-lg font-bold hover:text-blue-400 transition-colors">
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-lg font-bold">{info.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-16 pt-10 border-t border-slate-800">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Social Portals</p>
                <div className="flex gap-4">
                  {[Twitter, Linkedin, Github, Instagram].map((Icon, i) => (
                    <motion.a 
                      key={i}
                      whileHover={{ y: -5, backgroundColor: "#3b82f6" }}
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center transition-all border border-white/5"
                    >
                      <Icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:w-3/5 p-12 lg:p-16">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="group relative">
                    <label className="absolute -top-3 left-4 bg-slate-900 px-2 text-[10px] font-black uppercase tracking-widest text-slate-500 z-10 transition-colors group-focus-within:text-blue-400">Name</label>
                    <input
                      {...register('name')}
                      className={`w-full px-6 py-5 bg-slate-900/50 border-2 ${errors.name ? 'border-red-500' : 'border-white/5'} rounded-[1.5rem] focus:outline-none focus:border-blue-500 transition-all font-bold text-white`}
                      placeholder="John Wick"
                    />
                  </div>
                  <div className="group relative">
                    <label className="absolute -top-3 left-4 bg-slate-900 px-2 text-[10px] font-black uppercase tracking-widest text-slate-500 z-10 transition-colors group-focus-within:text-blue-400">Email</label>
                    <input
                      {...register('email')}
                      className={`w-full px-6 py-5 bg-slate-900/50 border-2 ${errors.email ? 'border-red-500' : 'border-white/5'} rounded-[1.5rem] focus:outline-none focus:border-blue-500 transition-all font-bold text-white`}
                      placeholder="john@wick.com"
                    />
                  </div>
                </div>

                <div className="group relative">
                  <label className="absolute -top-3 left-4 bg-slate-900 px-2 text-[10px] font-black uppercase tracking-widest text-slate-500 z-10 transition-colors group-focus-within:text-blue-400">Subject</label>
                  <input
                    {...register('subject')}
                    className={`w-full px-6 py-5 bg-slate-900/50 border-2 ${errors.subject ? 'border-red-500' : 'border-white/5'} rounded-[1.5rem] focus:outline-none focus:border-blue-500 transition-all font-bold text-white`}
                    placeholder="Collaboration"
                  />
                </div>

                <div className="group relative">
                  <label className="absolute -top-3 left-4 bg-slate-900 px-2 text-[10px] font-black uppercase tracking-widest text-slate-500 z-10 transition-colors group-focus-within:text-blue-400">Message</label>
                  <textarea
                    {...register('message')}
                    rows={6}
                    className={`w-full px-6 py-5 bg-slate-900/50 border-2 ${errors.message ? 'border-red-500' : 'border-white/5'} rounded-[1.5rem] focus:outline-none focus:border-blue-500 transition-all font-bold text-white resize-none`}
                    placeholder="Your message here..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full relative group overflow-hidden bg-blue-600 text-white py-6 rounded-[2rem] font-black text-xl flex items-center justify-center transition-all shadow-2xl hover:shadow-blue-500/40 active:scale-95 disabled:opacity-50"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {isSubmitting ? <Loader2 className="animate-spin" /> : <>Send Message <Send size={24} /></>}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
