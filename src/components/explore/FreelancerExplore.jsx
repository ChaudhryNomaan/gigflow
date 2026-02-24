import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, MapPin, Clock, 
  CheckCircle2, Star, ChevronDown, SlidersHorizontal 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FreelancerExplore = ({ jobs = [] }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter jobs based on search input
  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* LEFT SIDEBAR - FILTERS */}
        <div className="w-full lg:w-64 space-y-8 flex-shrink-0">
          <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <SlidersHorizontal size={16} className="text-indigo-600" />
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-900">Refine Search</h3>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-[9px] font-black uppercase text-slate-400 tracking-tighter">Experience Level</p>
                {['Entry', 'Intermediate', 'Expert'].map(lvl => (
                  <label key={lvl} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded-lg border-slate-200 text-indigo-600 focus:ring-indigo-500" />
                    <span className="text-sm font-bold text-slate-600 group-hover:text-indigo-600 transition-colors">{lvl}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT - JOB FEED */}
        <div className="flex-1 space-y-6">
          {/* SEARCH BAR */}
          <div className="bg-white p-2 rounded-3xl border border-slate-100 shadow-sm flex items-center">
            <div className="relative flex-1">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
              <input 
                type="text" 
                placeholder="Search by tech stack or role..." 
                className="w-full bg-transparent border-none py-5 pl-14 pr-6 outline-none text-lg font-bold placeholder:text-slate-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* JOB LIST */}
          <div className="space-y-4">
            <AnimatePresence mode='popLayout'>
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job, index) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={job.id} 
                    onClick={() => navigate(`/job/${job.id}`)}
                    className="bg-white p-8 rounded-[40px] border border-slate-100 hover:border-indigo-400 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all cursor-pointer group relative overflow-hidden"
                  >
                    <div className="relative z-10 space-y-5">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[9px] font-black uppercase tracking-widest rounded-lg">
                              New Posting
                            </span>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1">
                              <Clock size={12} /> {job.posted || job.postedAt}
                            </p>
                          </div>
                          <h3 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight tracking-tighter">
                            {job.title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 text-[11px] font-black uppercase tracking-widest text-slate-500">
                         <span className="flex items-center gap-1.5"><MapPin size={14} className="text-indigo-400"/> {job.location || 'Global (Remote)'}</span>
                         <span className="px-3 py-1 bg-slate-900 text-white rounded-lg">{job.displayBudget || `$${job.budget}`}</span>
                      </div>

                      <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed font-medium">
                        {job.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {job.tags?.map(tag => (
                          <span key={tag} className="px-4 py-2 bg-slate-50 text-[10px] font-black text-slate-400 uppercase rounded-xl border border-slate-100 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-all">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1.5 text-emerald-600 font-black text-[10px] uppercase tracking-widest">
                            <CheckCircle2 size={14} /> {job.clientStatus || 'Verified Client'}
                          </div>
                          <div className="flex items-center gap-1 text-[10px] font-black text-slate-400">
                            <Star size={14} fill="#fbbf24" stroke="none" /> {job.clientRating || '5.0'}
                          </div>
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-indigo-600 group-hover:translate-x-2 transition-transform">
                          View Details →
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="py-20 text-center bg-white border border-dashed border-slate-200 rounded-[40px]">
                  <p className="text-slate-400 font-black uppercase text-xs tracking-widest">No jobs matching "{searchQuery}"</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerExplore;