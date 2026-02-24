import React from 'react';
import { User, Briefcase, Star, ChevronRight } from 'lucide-react';

const Onboarding = () => {
  return (
    <div className="max-w-xl mx-auto py-20">
      <div className="bg-white border border-slate-100 p-12 rounded-[56px] shadow-2xl space-y-10">
        <div className="space-y-2">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white">
            <Star size={24} fill="currentColor"/>
          </div>
          <h2 className="text-4xl font-black tracking-tighter text-slate-900">Start your journey.</h2>
          <p className="text-slate-400 font-medium">Choose your primary path on GigFlow.</p>
        </div>

        <div className="space-y-4">
          <button className="w-full p-8 border-2 border-slate-100 rounded-[32px] flex items-center gap-6 hover:border-indigo-600 hover:bg-indigo-50/30 transition-all group">
            <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
              <User size={32}/>
            </div>
            <div className="text-left">
              <h4 className="font-black text-slate-900 text-xl tracking-tight">I'm a Freelancer</h4>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Ready to find elite gigs</p>
            </div>
          </button>

          <button className="w-full p-8 border-2 border-slate-100 rounded-[32px] flex items-center gap-6 hover:border-indigo-600 hover:bg-indigo-50/30 transition-all group">
            <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <Briefcase size={32}/>
            </div>
            <div className="text-left">
              <h4 className="font-black text-slate-900 text-xl tracking-tight">I'm a Client</h4>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Ready to hire top 1% talent</p>
            </div>
          </button>
        </div>

        <button className="w-full py-5 bg-black text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-100">
          Continue <ChevronRight size={16}/>
        </button>
      </div>
    </div>
  );
};

export default Onboarding;