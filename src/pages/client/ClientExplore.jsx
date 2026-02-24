import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Star, Heart, ChevronDown, Sparkles, 
  Zap, SlidersHorizontal, Check 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ClientExplore = ({ talents = [] }) => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Most Recent");
  const [activeCategory, setActiveCategory] = useState("All");
  const [savedIds, setSavedIds] = useState([]);
  const [sortBy, setSortBy] = useState("newest");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const categories = ["All", "Product", "Frontend", "Motion", "Brand", "UX"];
  const sortOptions = [
    { label: "Newest First", value: "newest" },
    { label: "Highest Rate", value: "rate-high" },
    { label: "Top Rated", value: "rating" }
  ];

  const baseTalents = useMemo(() => talents.length > 0 ? talents : [
    { id: '01', name: "Alex Rivera", role: "Product Systems", rate: 150, tags: ["React", "Systems"], status: "Available", category: "Product", rating: 4.9, trending: true },
    { id: '02', name: "Sarah Chen", role: "Frontend Engine", rate: 130, tags: ["WebGL", "Three.js"], status: "Busy", category: "Frontend", rating: 5.0, trending: true },
    { id: '03', name: "Marcus Vane", role: "Motion Strategy", rate: 160, tags: ["Lottie", "AEP"], status: "Available", category: "Motion", rating: 4.8, trending: false },
    { id: '04', name: "Elena Rossi", role: "Brand Identity", rate: 140, tags: ["Strategy", "Type"], status: "Available", category: "Brand", rating: 4.9, trending: true },
    { id: '05', name: "David Park", role: "SaaS Specialist", rate: 120, tags: ["Next.js", "UI"], status: "Available", category: "Product", rating: 4.7, trending: false },
    { id: '06', name: "Julia Smit", role: "UX Researcher", rate: 110, tags: ["Data", "Ethno"], status: "Busy", category: "UX", rating: 5.0, trending: false },
  ], [talents]);

  const toggleSave = (e, id) => {
    e.stopPropagation();
    setSavedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const filteredTalents = useMemo(() => {
    let result = baseTalents.filter(t => {
      const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            t.role.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || t.category === activeCategory;
      let matchesTab = true;
      if (activeTab === "Trending") matchesTab = t.trending === true;
      if (activeTab === "Saved") matchesTab = savedIds.includes(t.id);
      return matchesSearch && matchesCategory && matchesTab;
    });
    if (sortBy === "rate-high") result.sort((a, b) => b.rate - a.rate);
    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);
    if (sortBy === "newest") result.sort((a, b) => b.id.localeCompare(a.id));
    return result;
  }, [searchQuery, activeCategory, activeTab, savedIds, sortBy, baseTalents]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 space-y-8 md:space-y-12 overflow-hidden">
      
      {/* --- HERO SECTION (Fixed Overflow) --- */}
      <div className="relative bg-slate-900 rounded-[32px] md:rounded-[48px] p-6 sm:p-10 md:p-16 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/5 text-indigo-300 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-white/10">
            <Sparkles size={14} className="animate-pulse text-indigo-400" /> Premium Artisans
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter italic leading-none">
            Forge Your <br/> <span className="text-indigo-500 underline decoration-indigo-500/30">Masterpiece</span>
          </h1>

          <div className="relative group w-full max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
            <input 
              type="text"
              placeholder="Search talent..."
              className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white font-bold text-sm outline-none focus:bg-white/10 focus:border-indigo-500/50 transition-all placeholder:text-slate-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* --- NAVIGATION & FILTERS --- */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100">
          <div className="flex gap-8 overflow-x-auto no-scrollbar w-full sm:w-auto">
            {["Most Recent", "Trending", "Saved"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-[10px] font-black uppercase tracking-widest pb-4 relative transition-all whitespace-nowrap ${
                  activeTab === tab ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab} {tab === "Saved" && savedIds.length > 0 && `(${savedIds.length})`}
                {activeTab === tab && (
                  <motion.div layoutId="navIndicator" className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600" />
                )}
              </button>
            ))}
          </div>
          
          <div className="pb-4 relative w-full sm:w-auto">
            <button 
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-900 bg-slate-50 px-4 py-2 rounded-xl"
            >
              <SlidersHorizontal size={14} /> {sortOptions.find(o => o.value === sortBy)?.label}
            </button>
            <AnimatePresence>
              {isSortOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                  className="absolute right-0 mt-2 w-44 bg-white border border-slate-100 rounded-xl shadow-xl z-50 p-1"
                >
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { setSortBy(opt.value); setIsSortOpen(false); }}
                      className="w-full text-left px-4 py-2 text-[9px] font-black uppercase hover:bg-slate-50 rounded-lg transition-colors"
                    >
                      {opt.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Categories (No scrollbar) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 -mx-2 px-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
                activeCategory === cat 
                ? 'bg-slate-900 text-white border-slate-900 shadow-lg' 
                : 'bg-white text-slate-400 border-slate-100 hover:border-indigo-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* --- TALENT GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
        <AnimatePresence mode="popLayout">
          {loading ? (
            [...Array(6)].map((_, i) => <div key={i} className="h-64 bg-slate-50 rounded-[32px] animate-pulse" />)
          ) : filteredTalents.length > 0 ? (
            filteredTalents.map((t) => (
              <motion.div 
                key={t.id} layout
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                whileHover={{ y: -5 }}
                className="group bg-white border border-slate-100 rounded-[32px] p-6 sm:p-8 hover:shadow-xl transition-all cursor-pointer relative"
              >
                <button 
                  onClick={(e) => toggleSave(e, t.id)}
                  className={`absolute top-6 right-6 p-2.5 rounded-xl transition-all z-20 ${
                    savedIds.includes(t.id) ? 'bg-rose-50 text-rose-500' : 'bg-slate-50 text-slate-200'
                  }`}
                >
                  <Heart size={18} fill={savedIds.includes(t.id) ? "currentColor" : "none"} />
                </button>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Star size={12} className="text-amber-400" fill="currentColor" />
                      <span className="text-[10px] font-black text-slate-400">{t.rating} / 5.0</span>
                    </div>
                    <h3 className="text-2xl font-black tracking-tighter text-slate-900 italic uppercase leading-none">{t.name}</h3>
                    <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">{t.role}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5">
                    {t.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[8px] font-black uppercase text-slate-400 bg-slate-50 px-2 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-black text-slate-300 uppercase mb-1">Rate</span>
                      <span className="text-xl font-black text-slate-900 italic">${t.rate}<span className="text-[10px] not-italic text-slate-400">/hr</span></span>
                    </div>
                    <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-colors">
                      Profile
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-slate-50 rounded-[32px] border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-black uppercase text-xs tracking-widest">No results found</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

export default ClientExplore;