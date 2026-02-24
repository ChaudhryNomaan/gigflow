import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Toast = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => onClose(), 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed top-24 right-8 z-[100] flex items-center gap-4 bg-slate-900 text-white p-5 rounded-[24px] shadow-2xl border border-white/10 min-w-[320px]"
        >
          <div className="bg-indigo-500 p-2 rounded-xl shadow-lg shadow-indigo-500/40">
            <CheckCircle2 size={18} />
          </div>
          <div className="flex-1">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-0.5">Notification</p>
            <p className="text-sm font-bold tracking-tight">{message}</p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;