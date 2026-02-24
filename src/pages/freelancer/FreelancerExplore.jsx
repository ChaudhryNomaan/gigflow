import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, MapPin, Clock, Star, 
  SlidersHorizontal, Heart, 
  ShieldCheck, ArrowUpRight, Bell, ArrowUpDown,
  Laptop, LayoutGrid
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FreelancerExplore = ({ jobs = [] }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [savedJobs, setSavedJobs] = useState([]);
  const [sortBy, setSortBy] = useState("newest");
  
  const [minBudget, setMinBudget] = useState(0);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [onlyVerified, setOnlyVerified] = useState(false);

  // --- ACTIONS ---
  const toggleSave = (e, id) => {
    e.stopPropagation();
    setSavedJobs(prev => prev.includes(id) ? prev.filter(j => j !== id) : [...prev, id]);
  };

  const toggleType = (type) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  // --- REFINED FILTER LOGIC ---
  const filteredJobs = useMemo(() => {
    let pool = activeTab === "saved" ? jobs.filter(j => savedJobs.includes(j.id)) : jobs;
    
    let result = pool.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            job.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const budgetNum = parseInt(job.budget?.toString().replace(/[^0-9]/g, '') || 0);
      const matchesBudget = budgetNum >= minBudget;
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(job.type);
      const matchesVerified = !onlyVerified || job.clientStatus === "Verified Client";
      
      return matchesSearch && matchesBudget && matchesType && matchesVerified;
    });

    if (sortBy === "budget") {
        result.sort((a, b) => parseInt(b.budget) - parseInt(a.budget));
    }
    return result;
  }, [jobs, searchQuery, activeTab, savedJobs, minBudget, selectedTypes, onlyVerified, sortBy]);

  return (
    <div className="min-h-screen bg-[#FDFDFF] text-slate-900 font-sans pb-20">
      
      {/* 1. TOP NAVIGATION BAR */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-30 py-4 mb-8">
        {/* Adjusted to max-w-1440px and px-8 to match your Dashboard */}
        <div className="max-w-[1440px] mx-auto px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-black tracking-tighter text-slate-900 uppercase italic">Explore <span className="text-indigo-600">Missions.</span></h1>
            <div className="hidden md:block h-6 w-[1px] bg-slate-200" />
            <div className="flex items-center gap-2 text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-xl">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                1,240 Openings
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                <input 
                    className="w-full bg-slate-50 border border-slate-100 p-3.5 pl-12 rounded-2xl text-sm font-bold outline-none focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                    placeholder="Search by tech or role..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <button className="p-3.5 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors relative shadow-sm">
                <Bell size={20} className="text-slate-600" />
                <span className="absolute top-3.5 right-3.5 w-2.5 h-2.5 bg-indigo-600 rounded-full border-2 border-white" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN LAYOUT CONTAINER */}
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10">
          
          {/* SIDEBAR FILTERS (3 Columns) */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="bg-white border border-slate-100 rounded-[40px] p-8 shadow-sm space-y-10 sticky top-28">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <SlidersHorizontal size={18} className="text-slate-900" />
                    <h3 className="text-[11px] font-black uppercase tracking-[0.2em]">Filter Intel</h3>
                </div>
                {(minBudget > 0 || selectedTypes.length > 0) && (
                    <button onClick={() => {setMinBudget(0); setSelectedTypes([]);}} className="text-[10px] font-black text-indigo-600 uppercase">Reset</button>
                )}
              </div>

              {/* View Toggle */}
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Workspace</p>
                <div className="flex p-1.5 bg-slate-50 rounded-2xl border border-slate-100">
                    <button onClick={() => setActiveTab('all')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${activeTab === 'all' ? 'bg-white shadow-md text-slate-900' : 'text-slate-400'}`}>
                        <LayoutGrid size={14} /> Feed
                    </button>
                    <button onClick={() => setActiveTab('saved')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${activeTab === 'saved' ? 'bg-white shadow-md text-slate-900' : 'text-slate-400'}`}>
                        <Heart size={14} /> Saved
                    </button>
                </div>
              </div>

              {/* Budget Range */}
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Min. Budget</p>
                    <span className="text-sm font-black text-indigo-600 italic">${minBudget}</span>
                </div>
                <input 
                    type="range" min="0" max="10000" step="500"
                    value={minBudget} onChange={(e) => setMinBudget(e.target.value)}
                    className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-indigo-600" 
                />
              </div>

              {/* Contract Type */}
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Contract</p>
                <div className="space-y-3">
                    {['Fixed-Price', 'Hourly', 'Retainer'].map(type => (
                        <label key={type} className="flex items-center gap-3 cursor-pointer group">
                            <input 
                                type="checkbox" 
                                checked={selectedTypes.includes(type)}
                                onChange={() => toggleType(type)}
                                className="w-5 h-5 rounded-lg border-slate-200 text-indigo-600 focus:ring-0 cursor-pointer" 
                            />
                            <span className="text-xs font-bold text-slate-500 group-hover:text-slate-900 transition-colors uppercase tracking-tight">{type}</span>
                        </label>
                    ))}
                </div>
              </div>

              {/* Verified Toggle */}
              <div className="pt-6 border-t border-slate-50">
                <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Elite Clients Only</span>
                    <button 
                        onClick={() => setOnlyVerified(!onlyVerified)}
                        className={`w-12 h-6 rounded-full relative transition-all shadow-inner ${onlyVerified ? 'bg-indigo-600' : 'bg-slate-200'}`}
                    >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${onlyVerified ? 'right-1' : 'left-1'}`} />
                    </button>
                </label>
              </div>
            </div>
          </aside>

          {/* JOB FEED (9 Columns) */}
          <div className="lg:col-span-9 space-y-6">
            <div className="flex items-center justify-between px-4">
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    Results found: <span className="text-slate-900 italic">{filteredJobs.length}</span>
                </p>
                <div className="flex items-center gap-2 bg-white border border-slate-100 px-4 py-2 rounded-xl shadow-sm">
                    <ArrowUpDown size={14} className="text-indigo-600" />
                    <select 
                        className="text-[11px] font-black uppercase bg-transparent outline-none cursor-pointer text-slate-600"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="newest">Latest Arrivals</option>
                        <option value="budget">Top Budget</option>
                    </select>
                </div>
            </div>

            <div className="space-y-4">
              <AnimatePresence mode='popLayout'>
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={job.id} 
                      onClick={() => navigate(`/job/${job.id}`)}
                      className="bg-white p-8 rounded-[40px] border border-slate-100 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all cursor-pointer group relative overflow-hidden"
                    >
                      <div className="flex flex-col md:flex-row gap-10">
                        {/* Info Block */}
                        <div className="flex-1 space-y-6">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-slate-50 rounded-[22px] flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
                                <Laptop size={22} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tighter uppercase italic leading-none">
                                    {job.title}
                                </h3>
                                <div className="flex items-center gap-4 mt-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <span className="flex items-center gap-1.5"><Clock size={14} className="text-indigo-300"/> {job.posted}</span>
                                    <span className="w-1 h-1 bg-slate-200 rounded-full" />
                                    <span className="flex items-center gap-1.5"><MapPin size={14} className="text-indigo-300"/> {job.location || 'Remote'}</span>
                                </div>
                            </div>
                          </div>

                          <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed font-bold">
                            {job.description}
                          </p>

                          <div className="flex flex-wrap gap-2 pt-2">
                            {job.tags?.map(tag => (
                              <span key={tag} className="px-4 py-1.5 bg-slate-50 text-[10px] font-black text-slate-400 uppercase rounded-xl border border-slate-100 tracking-widest group-hover:bg-white transition-colors">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Action Block */}
                        <div className="md:w-56 flex flex-row md:flex-col justify-between items-center md:items-end gap-6 md:pl-10 md:border-l border-slate-100">
                          <div className="text-right">
                            <p className="text-3xl font-black text-slate-900 tracking-tighter italic">
                                ${job.budget}
                            </p>
                            <p className="text-[10px] font-black text-indigo-400 uppercase mt-1 tracking-[0.2em]">{job.type || 'Fixed'}</p>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <button 
                                onClick={(e) => toggleSave(e, job.id)}
                                className={`p-4 rounded-2xl transition-all shadow-sm ${savedJobs.includes(job.id) ? 'bg-rose-50 text-rose-500 border border-rose-100' : 'bg-white border border-slate-100 text-slate-300 hover:text-rose-400'}`}
                            >
                                <Heart size={20} fill={savedJobs.includes(job.id) ? "currentColor" : "none"} />
                            </button>
                            <div className="p-4 bg-slate-950 text-white rounded-2xl group-hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200">
                                <ArrowUpRight size={20} />
                            </div>
                          </div>

                          <div className="hidden md:flex flex-col items-end gap-2 pt-4 border-t border-slate-50 w-full opacity-60">
                            <div className="flex items-center gap-1.5 text-[9px] font-black text-emerald-600 uppercase tracking-widest">
                                <ShieldCheck size={14} /> Identity Verified
                            </div>
                            <div className="flex items-center gap-1 text-[10px] font-black text-slate-900 uppercase italic">
                                <Star size={12} fill="#fbbf24" stroke="none" /> 5.0 Rating
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="py-32 text-center bg-white border-2 border-dashed border-slate-100 rounded-[56px]">
                    <Search className="mx-auto text-slate-200 mb-6" size={64} />
                    <p className="text-slate-400 font-black uppercase tracking-widest text-sm">No missions located in this sector.</p>
                    <button onClick={() => {setSearchQuery(""); setMinBudget(0);}} className="mt-6 px-8 py-3 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all">Reset Frequency</button>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerExplore;