import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, Save, X, ArrowLeft, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { useServices, useCreateService, useUpdateService, useDeleteService } from '@/api/services';
import { Service } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

const serviceSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  icon: z.string().optional(),
  price: z.string().optional(),
});

type ServiceFormData = z.infer<typeof serviceSchema>;

function ServicesManagement() {
  const [isAddingService, setIsAddingService] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data: services = [], isLoading } = useServices();
  const createService = useCreateService();
  const updateService = useUpdateService();
  const deleteService = useDeleteService();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
  });

  const onSubmit = async (data: ServiceFormData) => {
    try {
      if (editingId) {
        await updateService.mutateAsync({ id: editingId, ...data });
        toast.success('Service updated successfully');
        setEditingId(null);
      } else {
        await createService.mutateAsync(data);
        toast.success('Service added successfully');
        setIsAddingService(false);
      }
      reset();
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const startEdit = (service: Service) => {
    setEditingId(service._id);
    setIsAddingService(false);
    reset({
      title: service.title,
      description: service.description,
      icon: service.icon,
      price: service.price,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    reset();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      try {
        await deleteService.mutateAsync(id);
        toast.success('Service deleted successfully');
      } catch (error) {
        toast.error('Failed to delete service');
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-[#010409]/80 backdrop-blur-md sticky top-0 z-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Link
                to="/"
                className="group flex items-center text-slate-400 hover:text-blue-400 transition-colors"
              >
                <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                <span className="font-bold">Portfolio</span>
              </Link>
              <h1 className="text-2xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Services Hub
              </h1>
            </div>
            <button
              onClick={() => {
                setIsAddingService(true);
                setEditingId(null);
                reset({ title: '', description: '', icon: '', price: '' });
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl flex items-center shadow-lg shadow-blue-500/20 transition-all active:scale-95"
            >
              <Plus size={20} className="mr-2" />
              <span className="font-bold">Add Service</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <AnimatePresence mode="wait">
          {(isAddingService || editingId) && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass rounded-3xl p-8 mb-10"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-black text-white">
                  {editingId ? 'Edit Service' : 'Add New Service'}
                </h2>
                <button
                  onClick={editingId ? cancelEdit : () => setIsAddingService(false)}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400 ml-1">Service Title</label>
                    <input
                      {...register('title')}
                      className={`w-full px-4 py-3 bg-[#010409]/50 border-2 ${
                        errors.title ? 'border-red-500' : 'border-white/5'
                      } rounded-xl focus:outline-none focus:border-blue-500 transition-all text-white font-bold`}
                      placeholder="e.g. Web Development"
                    />
                    {errors.title && <p className="text-red-500 text-xs mt-1 ml-1">{errors.title.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400 ml-1">Price / Range</label>
                    <input
                      {...register('price')}
                      className="w-full px-4 py-3 bg-[#010409]/50 border-2 border-white/5 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-white font-bold"
                      placeholder="e.g. $500 - $1000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 ml-1">Description</label>
                  <textarea
                    {...register('description')}
                    rows={4}
                    className={`w-full px-4 py-3 bg-[#010409]/50 border-2 ${
                      errors.description ? 'border-red-500' : 'border-white/5'
                    } rounded-xl focus:outline-none focus:border-blue-500 transition-all text-white font-bold resize-none`}
                    placeholder="Describe what you offer in detail..."
                  ></textarea>
                  {errors.description && <p className="text-red-500 text-xs mt-1 ml-1">{errors.description.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 ml-1">Icon (Emoji or Icon Name)</label>
                  <input
                    {...register('icon')}
                    className="w-full px-4 py-3 bg-[#010409]/50 border-2 border-white/5 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-white font-bold"
                    placeholder="💻, 🚀, Code, etc."
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={editingId ? cancelEdit : () => setIsAddingService(false)}
                    className="px-6 py-2.5 rounded-xl text-slate-400 font-bold hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-8 py-2.5 rounded-xl font-black flex items-center shadow-lg shadow-blue-500/20 transition-all active:scale-95"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin mr-2" size={20} /> : <Save size={20} className="mr-2" />}
                    {editingId ? 'Update Service' : 'Create Service'}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Services Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="animate-spin text-blue-500" size={48} />
            <p className="text-slate-500 font-bold animate-pulse">Loading your services...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {services.map((service: Service) => (
                <motion.div
                  key={service._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -5 }}
                  className="group glass rounded-3xl overflow-hidden transition-all duration-300"
                >
                  <div className="p-8">
                    <div className="w-14 h-14 bg-blue-900/30 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                      {service.icon || '📦'}
                    </div>
                    <h3 className="text-xl font-black text-white mb-3 group-hover:text-blue-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-400 line-clamp-3 mb-6 leading-relaxed font-medium">
                      {service.description}
                    </p>
                    {service.price && (
                      <div className="inline-block px-3 py-1 bg-green-900/20 text-green-400 text-xs font-black rounded-lg uppercase tracking-widest">
                        {service.price}
                      </div>
                    )}
                  </div>
                  <div className="px-6 py-4 bg-white/5 flex justify-end space-x-3 border-t border-white/5">
                    <button
                      onClick={() => startEdit(service)}
                      className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {!isLoading && services.length === 0 && !isAddingService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 glass rounded-3xl border-2 border-dashed border-white/10"
          >
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Plus className="text-slate-600" size={40} />
            </div>
            <h3 className="text-xl font-black text-white mb-2">No services found</h3>
            <p className="text-slate-500 max-w-sm mx-auto mb-8 font-bold">
              Start by adding your first service to showcase your professional offerings.
            </p>
            <button
              onClick={() => setIsAddingService(true)}
              className="text-blue-400 font-black hover:underline"
            >
              Add your first service
            </button>
          </motion.div>
        )}
      </main>
    </div>
  );
}

export default ServicesManagement;
