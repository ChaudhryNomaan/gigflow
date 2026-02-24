import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Check, Clock, X, ShieldCheck, MapPin, Globe, Zap, Filter, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Marketplace = ({ jobs = [], proposals = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();

  const categories = ["All", "Design", "Development", "Marketing", "Writing", "Video"];

  const hasApplied = (jobId) => proposals.some(p => p.jobId === jobId);

  const filteredJobs = useMemo(() => {
    if (!Array.isArray(jobs)) return [];
    return jobs.filter(job => {
      const matchesSearch = job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.category?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || job.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, jobs]);

  return (
    <div className="space-y-10 max-w-6xl mx-auto pb-20">
      
      {/* Search & Filter Header */}
      <div className="space-y-6 text-center">
        <div className="relative max-w-2xl mx-auto group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={22} />
          <input 
            type="text" 
            placeholder="Search premium gigs..."
            className="w-full pl-16 pr-6 py-6 bg-white border border-slate-100 rounded-[32px] shadow-sm outline-none focus:border-indigo-500 focus:ring-8 focus:ring-indigo-500/5 transition-all text-xl font-bold tracking-tight"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category Chips */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${
                selectedCategory === cat 
                ? 'bg-black text-white border-black shadow-lg shadow-black/10' 
                : 'bg-white text-slate-400 border-slate-100 hover:border-indigo-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Feed Grid */}
      <div className="grid gap-6">
        <AnimatePresence mode='popLayout'>
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <motion.div 
                key={job.id} 
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => setSelectedJob(job)}
                className="bg-white border border-slate-100 p-8 rounded-[48px] hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-100 transition-all cursor-pointer relative group"
              >
                {hasApplied(job.id) && (
                  <div className="absolute top-8 right-10 bg-emerald-500 text-white text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-emerald-500/20 z-10">
                    <Check size={12} strokeWidth={4}/> Applied
                  </div>
                )}
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black text-indigo-600 uppercase bg-indigo-50 px-4 py-1.5 rounded-xl tracking-[0.15em]">{job.category}</span>
                      <span className="text-[10px] font-bold text-slate-300 uppercase flex items-center gap-1.5"><Clock size={14}/> {job.postedAt || '2h ago'}</span>
                    </div>
                    <h3 className="text-3xl font-black tracking-tighter text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">{job.title}</h3>
                  </div>
                  
                  <div className="md:text-right bg-slate-50 md:bg-transparent p-4 md:p-0 rounded-[24px] w-full md:w-auto">
                    <p className="font-black text-3xl text-slate-900 tracking-tighter">
                      {job.displayBudget || `$${job.budget}`}
                    </p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">
                      {job.type || 'Fixed'} Price
                    </p>
                  </div>
                </div>

                <p className="text-slate-500 leading-relaxed line-clamp-2 mb-8 max-w-3xl font-medium text-lg italic">
                  "{job.description}"
                </p>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8 border-t border-slate-50">
                  <div className="flex flex-wrap gap-2">
                    {(job.tags || job.skills || ['React', 'UI/UX']).map(skill => (
                      <span key={skill} className="text-[9px] font-black bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl uppercase text-slate-500 tracking-wider">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-6 text-slate-400">
                    <span className="text-[10px] font-black uppercase flex items-center gap-2"><ShieldCheck size={16} className="text-indigo-500"/> Verified</span>
                    <span className="text-[10px] font-black uppercase flex items-center gap-2"><MapPin size={16}/> {job.location || 'Remote'}</span>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-40">
               <div className="w-24 h-24 bg-slate-50 rounded-[40px] flex items-center justify-center mx-auto mb-6">
                <Search className="text-slate-200" size={40}/>
               </div>
               <p className="text-slate-400 font-black uppercase text-xs tracking-[0.2em]">No matching gigs found</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Detail Slide-over */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-[100] flex items-center justify-end">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedJob(null)}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-2xl h-full bg-white shadow-2xl p-12 md:p-16 overflow-y-auto border-l border-slate-100"
            >
              <button 
                onClick={() => setSelectedJob(null)}
                className="absolute top-10 right-10 p-4 bg-slate-50 hover:bg-black hover:text-white rounded-2xl transition-all group"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>

              <div className="mt-12 space-y-12">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                    <Sparkles size={12} /> Premium Listing
                  </div>
                  <h2 className="text-5xl font-black tracking-tighter text-slate-900 leading-none">{selectedJob.title}</h2>
                </div>

                <div className="grid grid-cols-2 gap-6">
                   <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Budget Range</p>
                      <p className="text-3xl font-black text-slate-900 tracking-tighter">
                        {selectedJob.displayBudget || `$${selectedJob.budget}`}
                      </p>
                   </div>
                   <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Project Type</p>
                      <p className="text-2xl font-black text-slate-900 tracking-tighter">Ongoing Contract</p>
                   </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                    <Zap size={14} className="text-amber-500"/> Scope of Work
                  </h4>
                  <p className="text-slate-600 leading-relaxed text-xl font-medium whitespace-pre-wrap">
                    {selectedJob.description}
                  </p>
                </div>

                <div className="pt-10 border-t border-slate-100">
                  <button 
                    disabled={hasApplied(selectedJob.id)}
                    onClick={() => {
                      navigate(`/job/${selectedJob.id}/apply`);
                      setSelectedJob(null);
                    }}
                    className={`w-full py-7 rounded-[32px] font-black uppercase tracking-[0.2em] text-xs transition-all shadow-2xl ${
                      hasApplied(selectedJob.id) 
                      ? 'bg-emerald-500 text-white cursor-default' 
                      : 'bg-indigo-600 text-white hover:bg-black hover:-translate-y-1 shadow-indigo-500/30'
                    }`}
                  >
                    {hasApplied(selectedJob.id) ? "Application Received" : "Start Your Proposal"}
                  </button>
                  <p className="text-center text-[10px] font-bold text-slate-400 uppercase mt-6 tracking-widest">
                    Average response time: 24 hours
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Marketplace;