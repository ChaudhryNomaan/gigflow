import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowUpRight, Plus, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TalentSkeleton from "./TalentSkeleton";

const ClientExplore = ({ talents = [] }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Simulate initial loading sequence
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const displayTalents = talents.length > 0 ? talents : [
    { id: '01', name: "Alex Rivera", role: "Product Systems", rate: "$150", tags: ["React", "Systems"], status: "Available" },
    { id: '02', name: "Sarah Chen", role: "Frontend Engine", rate: "$130", tags: ["WebGL", "Three.js"], status: "Busy" },
    { id: '03', name: "Marcus Vane", role: "Motion Strategy", rate: "$160", tags: ["Lottie", "AEP"], status: "Available" },
    { id: '04', name: "Elena Rossi", role: "Brand Identity", rate: "$140", tags: ["Strategy", "Type"], status: "Available" },
    { id: '05', name: "David Park", role: "SaaS Specialist", rate: "$120", tags: ["Next.js", "UI"], status: "Available" },
    { id: '06', name: "Julia Smit", role: "UX Researcher", rate: "$110", tags: ["Data", "Ethno"], status: "Busy" },
  ];

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      
      {/* COMPACT HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-16 border-b border-slate-100 pb-8 gap-6 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="flex items-center gap-4">
          <div className="bg-black text-white p-2 rounded-lg">
            <Command size={20} />
          </div>
          <h1 className="text-2xl font-bold tracking-tighter uppercase italic">
            Discovery<span className="not-italic text-slate-400 ml-2">/ Talent</span>
          </h1>
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          <input 
            type="text" 
            placeholder="Search expertise..." 
            className="w-full bg-slate-100 border-none rounded-xl py-2.5 pl-9 pr-4 outline-none text-xs font-bold uppercase tracking-widest placeholder:text-slate-400 focus:ring-2 ring-indigo-500/20 transition-all"
          />
        </div>
      </div>

      {/* GRID AREA */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="wait">
          {loading ? (
            // 1. LOADING STATE: SHOW 6 SKELETONS
            <motion.div 
              key="loader"
              className="contents" // Grid child wrapper
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(6)].map((_, i) => (
                <TalentSkeleton key={i} />
              ))}
            </motion.div>
          ) : (
            // 2. DATA STATE: SHOW REAL CARDS
            <motion.div 
              key="content"
              className="contents"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {displayTalents.map((t, index) => (
                <motion.div 
                  key={t.id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  onClick={() => navigate(`/talent/${t.id}`)}
                  className="group bg-white border border-slate-100 rounded-[24px] p-6 hover:shadow-xl hover:shadow-indigo-500/5 transition-all cursor-pointer relative"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="space-y-1">
                      <span className="text-[9px] font-black text-indigo-600 uppercase tracking-[0.2em]">ID // {t.id}</span>
                      <h3 className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
                        {t.name}
                      </h3>
                    </div>
                    <div className={`w-2 h-2 rounded-full mt-1 ${t.status === 'Available' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]' : 'bg-slate-200'}`} />
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {t.tags.map(tag => (
                      <span key={tag} className="text-[8px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-end justify-between pt-4 border-t border-slate-50">
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Role</p>
                      <p className="text-xs font-black text-slate-800 uppercase italic">{t.role}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Rate</p>
                      <p className="text-lg font-black tracking-tighter text-slate-900">{t.rate}<span className="text-[10px] text-slate-300 ml-0.5">/hr</span></p>
                    </div>
                  </div>

                  {/* Subtle Hover Action */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all">
                    <div className="bg-indigo-600 text-white p-1.5 rounded-lg shadow-lg">
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* POST JOB PLACEHOLDER */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => navigate('/post-job')}
                className="border-2 border-dashed border-slate-100 rounded-[24px] p-6 flex flex-col items-center justify-center text-center hover:border-indigo-200 transition-colors cursor-pointer group"
              >
                <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all mb-3">
                  <Plus size={20} />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-indigo-600">Post a new gig</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ClientExplore;