import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageSquare, Copy, Check, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { useContactModal } from '../store/useContactModalStore';

export default function ContactModal() {
  const { isOpen, openModal, closeModal } = useContactModal();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeModal]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('abenilee740@gmail.com');
    setCopied(true);
    toast.success('Email copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Please enter your name');
      return;
    }

    const subject = encodeURIComponent(`Project Inquiry from ${name}`);
    const body = encodeURIComponent(
      `Hi Abenezer,\n\nMy name is ${name}${email ? ` (${email})` : ''}.\n\n${message || "I'd like to connect regarding an opportunity or project."}\n\nBest regards,\n${name}`
    );

    const mailtoUrl = `mailto:abenilee740@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
    toast.success('Opening your email client addressed to abenilee740@gmail.com!');
  };

  const handleOpenGmail = () => {
    if (!name.trim()) {
      toast.error('Please enter your name first');
      return;
    }
    const subject = encodeURIComponent(`Project Inquiry from ${name}`);
    const body = encodeURIComponent(
      `Hi Abenezer,\n\nMy name is ${name}${email ? ` (${email})` : ''}.\n\n${message || "I'd like to connect regarding an opportunity or project."}\n\nBest regards,\n${name}`
    );
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=abenilee740@gmail.com&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');
    toast.success('Opening Web Gmail composer!');
  };

  return (
    <>
      {/* Floating Messaging Action Button (Bottom Right) */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={openModal}
        className="fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full bg-slateTeal text-white border-2 border-slate-900 shadow-neo flex items-center justify-center cursor-pointer hover:bg-slateTeal-dark transition-all group"
        aria-label="Open message composer"
      >
        <MessageSquare size={22} className="stroke-[2.2] group-hover:scale-110 transition-transform" />
        
        {/* Pulsing Green Online Indicator Dot */}
        <span className="absolute top-1 right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slateTeal" />
        </span>
      </motion.button>

      {/* Modal Dialog Backdrop & Card matching uploaded design */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 320 }}
              className="relative w-full max-w-[500px] bg-[#0C1117] border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col text-white"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header: TO: ABENEZER ASCHALEW */}
              <div className="flex items-center justify-between px-7 py-5 border-b border-white/10">
                <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-slate-400 uppercase select-none">
                  TO: &nbsp;ABENEZER &nbsp;ASCHALEW
                </span>
                
                <button
                  onClick={closeModal}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                  aria-label="Close message composer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body: Conversational Form */}
              <form onSubmit={handleSend} className="p-7 sm:p-9 space-y-7">
                {/* Field 1: Name */}
                <div className="flex flex-wrap items-baseline gap-2.5 text-lg sm:text-xl font-normal leading-relaxed text-slate-100">
                  <span className="whitespace-nowrap font-sans font-medium text-white">Hi my name is</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="your name"
                    autoFocus
                    required
                    className="flex-grow min-w-[160px] bg-transparent border-b border-slate-600 focus:border-white text-white placeholder:text-slate-500 font-sans text-lg sm:text-xl pb-0.5 outline-none transition-colors"
                  />
                </div>

                {/* Field 2: Email */}
                <div className="flex flex-wrap items-baseline gap-2.5 text-lg sm:text-xl font-normal leading-relaxed text-slate-100">
                  <span className="whitespace-nowrap font-sans font-medium text-white">and my email is</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your email address"
                    className="flex-grow min-w-[200px] bg-transparent border-b border-slate-600 focus:border-white text-white placeholder:text-slate-500 font-sans text-lg sm:text-xl pb-0.5 outline-none transition-colors"
                  />
                </div>

                {/* Field 3: Topic / Message */}
                <div className="flex flex-col gap-2 pt-1">
                  <span className="font-sans font-medium text-lg sm:text-xl text-white">
                    I'd like to talk about
                  </span>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="your project, idea, or role details..."
                    className="w-full bg-slate-900/60 border border-white/10 rounded-xl p-3.5 text-white placeholder:text-slate-500 font-sans text-base outline-none focus:border-white transition-colors resize-none"
                  />
                </div>

                {/* Send Button & Actions */}
                <div className="pt-2 space-y-3">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-full bg-white text-slate-950 font-bold text-sm sm:text-base flex items-center justify-center gap-2 hover:bg-slate-100 active:scale-[0.99] transition-all cursor-pointer shadow-lg"
                  >
                    <span>Send Message (Email Client)</span>
                    <ArrowRight size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={handleOpenGmail}
                    className="w-full py-2.5 px-4 rounded-full bg-white/10 hover:bg-white/15 text-slate-200 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 border border-white/15 transition-all cursor-pointer"
                  >
                    <span>Or compose directly in Web Gmail</span>
                  </button>

                  <p className="text-[11px] font-mono text-center text-slate-400">
                    Dispatches directly to <span className="text-sky-300">abenilee740@gmail.com</span>
                  </p>
                </div>
              </form>

              {/* Footer: email bar matching screenshot */}
              <div className="px-7 py-4 border-t border-white/10 bg-[#090D12] flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="font-mono text-xs sm:text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2 group cursor-pointer"
                  title="Click to copy email address"
                >
                  <span>abenilee740@gmail.com</span>
                  {copied ? (
                    <Check size={14} className="text-emerald-400" />
                  ) : (
                    <Copy size={13} className="text-slate-500 group-hover:text-slate-300 transition-colors" />
                  )}
                </button>

                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest hidden sm:inline">
                  DIRECT INBOX
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
