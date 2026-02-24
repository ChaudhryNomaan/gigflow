import React from 'react';
import { ShieldCheck, MapPin, Globe, Twitter, ArrowUpRight } from 'lucide-react';

const PublicProfile = () => {
  return (
    <div className="max-w-4xl mx-auto py-10 space-y-12">
      <div className="text-center space-y-6">
        <div className="w-32 h-32 bg-slate-900 rounded-[48px] mx-auto flex items-center justify-center text-white text-5xl font-black shadow-2xl">L</div>
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-4xl font-black tracking-tighter text-slate-900">Liza M.</h1>
            <ShieldCheck className="text-indigo-500" size={24}/>
          </div>
          <p className="text-indigo-600 font-black uppercase text-xs tracking-widest">Senior Product Designer</p>
          <div className="flex items-center justify-center gap-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest pt-2">
            <span className="flex items-center gap-1"><MapPin size={12}/> London, UK</span>
            <span className="flex items-center gap-1"><Globe size={12}/> liza.design</span>
          </div>
        </div>
        <div className="flex justify-center gap-3">
          <button className="bg-black text-white px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-600 transition-all shadow-xl">Hire Me</button>
          <button className="bg-white border border-slate-100 px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-50 transition-all">Send Message</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white border border-slate-100 p-10 rounded-[48px] shadow-sm">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-6">About</h3>
          <p className="text-slate-600 font-medium leading-relaxed">Specializing in building high-performance, brutalist-inspired digital products for startups. I blend aesthetics with technical React expertise.</p>
        </div>
        <div className="bg-white border border-slate-100 p-10 rounded-[48px] shadow-sm">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Stats</h3>
          <div className="grid grid-cols-2 gap-6 text-center">
            <div>
              <p className="text-2xl font-black text-slate-900">42</p>
              <p className="text-[9px] font-black text-slate-400 uppercase">Jobs Done</p>
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900">100%</p>
              <p className="text-[9px] font-black text-slate-400 uppercase">Success</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;