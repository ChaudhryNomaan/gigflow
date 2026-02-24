import React, { useState } from 'react';
import { 
  Search, MapPin, CheckCircle, Star, 
  Filter, Sparkles, ArrowUpRight, Zap 
} from 'lucide-react';
import { motion } from 'framer-motion';

const TalentDiscovery = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const talents = [
    { 
      name: "Liza M.", 
      role: "Senior Product Designer", 
      rate: "$150", 
      location: "London, UK",
      skills: ["Figma", "React", "UX", "Branding"],
      rating: "5.0",
      jobs: 42
    },
    { 
      name: "Marcus V.", 
      role: "Full Stack Engineer", 
      rate: "$120", 
      location: "Berlin, DE",
      skills: ["Node.js", "AWS", "Python", "SQL"],
      rating: "4.9",
      jobs: 89
    },
    { 
      name: "Sarah K.", 
      role: "AI/ML Specialist", 
      rate: "$180", 
      location: "San Francisco, US",
      skills: ["PyTorch", "OpenAI", "Next.js"],
      rating: "5.0",
      jobs: 24
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24 animate-in fade-in duration-700">
      
      {/* 1. DISCOVERY HEADER & SEARCH */}
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em]">
              <Sparkles size={12} fill="currentColor"/> Elite Talent Network
            </div>
            <h2 className="text-5xl font-black uppercase tracking-tighter text-slate-900 leading-none">Discover Experts</h2>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em]">Direct access to the world's top 1%</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
            <input 
              className="w-full bg-white border border-slate-100 p-6 pl-16 rounded-[28px] text-slate-900 font-bold outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-100 transition-all shadow-sm"
              placeholder="Search by skill, role, or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="bg-white border border-slate-100 p-6 rounded-[28px] text-slate-900 flex items-center gap-3 px-8 hover:bg-slate-50 transition-all font-black uppercase text-[10px] tracking-widest shadow-sm">
            <Filter size={18}/> Filters
          </button>
        </div>
      </div>

      {/* 2. TALENT GRID */}
      <div className="grid lg:grid-cols-2 gap-8">
        {talents.map((t, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -8 }}
            className="bg-white border border-slate-100 p-10 rounded-[48px] shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all group relative"
          >
            <div className="flex items-start justify-between mb-8">
              <div className="flex gap-6 items-center">
                <div className="w-24 h-24 bg-slate-950 text-white rounded-[32px] flex items-center justify-center text-4xl font-black shadow-xl group-hover:bg-indigo-600 transition-colors duration-500">
                  {t.name[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{t.name}</h3>
                    <CheckCircle className="text-indigo-500" size={20}/>
                  </div>
                  <p className="text-indigo-600 font-black uppercase text-[11px] tracking-[0.2em]">{t.role}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-slate-900 tracking-tighter">{t.rate}<span className="text-xs text-slate-400 font-bold">/hr</span></p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <Star className="text-amber-400 fill-amber-400" size={14}/>
                  <span className="text-xs font-black text-slate-900">{t.rating}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-10">
              {t.skills.map(s => (
                <span key={s} className="bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:bg-white group-hover:border-indigo-100 transition-all">
                  {s}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-8 border-t border-slate-50">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <MapPin size={14}/>
                  <span className="text-[10px] font-bold uppercase tracking-widest">{t.location}</span>
                </div>
                <div className="w-1 h-1 bg-slate-200 rounded-full"/>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{t.jobs} Projects</span>
              </div>
              <button className="flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-600 transition-all active:scale-95 shadow-lg">
                View Portfolio <ArrowUpRight size={14}/>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3. PROMO CARD */}
      <div className="bg-indigo-600 rounded-[48px] p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <Zap size={200} fill="white"/>
        </div>
        <div className="relative z-10 space-y-2">
          <h4 className="text-3xl font-black tracking-tighter">Need a custom team?</h4>
          <p className="text-indigo-100 font-medium opacity-80">Our recruitment experts can hand-pick a squad for your specific requirements.</p>
        </div>
        <button className="relative z-10 bg-white text-indigo-600 px-10 py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] hover:bg-slate-900 hover:text-white transition-all">
          Contact Concierge
        </button>
      </div>
    </div>
  );
};

export default TalentDiscovery;