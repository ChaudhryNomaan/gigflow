import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserSearch, Briefcase, Zap, ArrowRight, Star, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Gateway({ setRole }) {
  const navigate = useNavigate();

  const handleChoice = (choice) => {
    // 1. Set the role in App.js state
    setRole(choice);
    
    // 2. Direct the user to their specific starting point
    if (choice === 'client') {
      navigate('/client');
    } else {
      navigate('/freelancer');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-6 md:p-12 selection:bg-indigo-500 selection:text-white overflow-hidden relative">
      
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-indigo-100/50 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-slate-200/50 blur-[120px] rounded-full" />
      </div>

      {/* BRAND HEADER */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 flex items-center gap-3 mb-20"
      >
        <div className="bg-slate-900 p-2.5 rounded-2xl text-white shadow-2xl shadow-indigo-200/50">
          <Zap size={28} fill="currentColor" />
        </div>
        <div className="flex flex-col">
          <span className="text-3xl font-black tracking-tighter uppercase italic leading-none text-slate-900">GigFlow<span className="text-indigo-600">.</span></span>
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 mt-1">Institutional Grade</span>
        </div>
      </motion.div>

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 relative z-10">
        
        {/* --- CLIENT CARD --- */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileHover={{ y: -12, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleChoice('client')}
          className="group cursor-pointer bg-white border border-slate-200 hover:border-indigo-600 rounded-[56px] p-10 md:p-14 transition-all shadow-xl shadow-slate-200/50 flex flex-col justify-between min-h-[500px]"
        >
          <div>
            <div className="w-20 h-20 bg-indigo-50 rounded-[28px] flex items-center justify-center mb-10 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 rotate-3 group-hover:rotate-0">
              <UserSearch size={40} strokeWidth={2.5} />
            </div>
            <h2 className="text-5xl font-black tracking-tighter mb-6 italic uppercase text-slate-900 leading-[0.9]">
              Hire <br/> <span className="text-indigo-600">Talent.</span>
            </h2>
            <p className="text-slate-500 font-bold text-lg leading-relaxed max-w-[280px]">
              Access a vetted network of independent engineers & designers.
            </p>
          </div>

          <div className="mt-12 space-y-6">
            <div className="flex gap-2">
               {[1,2,3].map(i => <div key={i} className="flex items-center gap-1 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                  <Star size={10} className="fill-amber-400 text-amber-400" />
                  <span className="text-[9px] font-black uppercase text-slate-400 italic">Vetted</span>
               </div>)}
            </div>
            <div className="flex items-center gap-4 text-slate-900 font-black uppercase text-[11px] tracking-widest group-hover:gap-6 transition-all">
              Launch Project <ArrowRight size={18} className="text-indigo-600" />
            </div>
          </div>
        </motion.div>

        {/* --- FREELANCER CARD --- */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileHover={{ y: -12, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleChoice('freelancer')}
          className="group cursor-pointer bg-slate-900 border border-transparent hover:border-indigo-500 rounded-[56px] p-10 md:p-14 transition-all text-white shadow-2xl shadow-indigo-900/20 flex flex-col justify-between min-h-[500px]"
        >
          <div>
            <div className="w-20 h-20 bg-white/10 rounded-[28px] flex items-center justify-center mb-10 group-hover:bg-indigo-500 transition-all duration-500 -rotate-3 group-hover:rotate-0 backdrop-blur-xl">
              <Briefcase size={40} strokeWidth={2.5} className="text-indigo-400 group-hover:text-white" />
            </div>
            <h2 className="text-5xl font-black tracking-tighter mb-6 italic uppercase leading-[0.9]">
              Find <br/> <span className="text-indigo-400">Work.</span>
            </h2>
            <p className="text-slate-400 font-bold text-lg leading-relaxed max-w-[280px]">
              Own your career. Work on mandates that matter with high-end clients.
            </p>
          </div>

          <div className="mt-12 space-y-6">
            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-3xl border border-white/10 w-fit">
              <Shield size={16} className="text-indigo-400" />
              <span className="text-[10px] font-black uppercase tracking-widest">Instant Payouts Enabled</span>
            </div>
            <div className="flex items-center gap-4 text-white font-black uppercase text-[11px] tracking-widest group-hover:gap-6 transition-all">
              Browse Mandates <ArrowRight size={18} className="text-indigo-400" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* FOOTER METADATA */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-20 flex flex-col items-center gap-4"
      >
        <div className="flex items-center gap-6">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">Secure</span>
          <div className="w-1 h-1 bg-slate-200 rounded-full" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">Global</span>
          <div className="w-1 h-1 bg-slate-200 rounded-full" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">Instant</span>
        </div>
        <div className="px-6 py-2 bg-slate-100 rounded-full border border-slate-200">
           <p className="text-[9px] font-black uppercase text-slate-400 tracking-tighter">System Status: <span className="text-emerald-500">Operational</span></p>
        </div>
      </motion.div>
    </div>
  );
}