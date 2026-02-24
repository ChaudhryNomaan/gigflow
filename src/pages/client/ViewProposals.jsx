import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Check, X, ArrowLeft, MessageSquare, 
  ExternalLink, Briefcase, Star, Zap, UserCheck,
  Filter, Eye, MoreHorizontal, Trophy
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ViewProposals({ proposals, setProposals, jobs }) {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');

  const currentJob = jobs.find(j => j.id === parseInt(jobId));
  
  // Filtering logic
  const jobProposals = proposals.filter(p => p.jobId === parseInt(jobId));
  const filteredProposals = jobProposals.filter(p => {
    if (activeFilter === 'all') return true;
    return p.status === activeFilter;
  });

  const updateStatus = (proposalId, status) => {
    setProposals(prev => prev.map(p => 
      p.id === proposalId ? { ...p, status } : p
    ));
  };

  const stats = {
    total: jobProposals.length,
    hired: jobProposals.filter(p => p.status === 'hired').length,
    pending: jobProposals.filter(p => p.status === 'pending').length
  };

  return (
    <div className="max-w-7xl mx-auto py-8 md:py-16 px-4 sm:px-8">
      
      {/* 1. MISSION CONTROL HEADER */}
      <header className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-16">
        <div className="space-y-6 max-w-2xl">
          <button 
            onClick={() => navigate(-1)} 
            className="group flex items-center gap-2 text-slate-400 font-black uppercase text-[10px] tracking-[0.2em] hover:text-indigo-600 transition-all"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> Return to Command
          </button>
          
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 leading-[0.9]">
              Reviewing <span className="text-indigo-600 italic">Candidates.</span>
            </h1>
            <p className="text-slate-400 font-bold text-lg">{currentJob?.title}</p>
          </div>

          <div className="flex flex-wrap gap-3">
             <div className="bg-white border border-slate-100 px-5 py-3 rounded-2xl flex items-center gap-3 shadow-sm">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Budget</span>
                <span className="text-sm font-black italic text-slate-900">{currentJob?.displayBudget || `$${currentJob?.budget}`}</span>
             </div>
             <div className="bg-indigo-600 px-5 py-3 rounded-2xl flex items-center gap-3 shadow-lg shadow-indigo-200">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Active Briefings</span>
                <span className="text-sm font-black text-white">{stats.total}</span>
             </div>
          </div>
        </div>

        {/* 2. FILTER SYSTEM */}
        <div className="w-full lg:w-auto flex flex-col sm:flex-row bg-slate-100/50 p-2 rounded-[24px] gap-1">
          {['all', 'pending', 'hired', 'declined'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-[18px] text-[10px] font-black uppercase tracking-widest transition-all ${
                activeFilter === filter 
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {filter} {filter === 'all' ? '' : `(${jobProposals.filter(p => p.status === filter).length})`}
            </button>
          ))}
        </div>
      </header>

      {/* 3. PROPOSALS FEED */}
      <div className="grid gap-8">
        {filteredProposals.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="bg-white border-2 border-dashed border-slate-100 rounded-[56px] py-32 text-center"
          >
            <div className="w-20 h-20 bg-slate-50 rounded-[32px] flex items-center justify-center mx-auto text-slate-200 mb-6">
              <Filter size={40} />
            </div>
            <p className="text-slate-400 font-black uppercase text-[11px] tracking-[0.3em]">No {activeFilter} missions found</p>
          </motion.div>
        ) : (
          <AnimatePresence mode='popLayout'>
            {filteredProposals.map((proposal, index) => (
              <motion.div 
                key={proposal.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`group relative bg-white border-2 rounded-[48px] p-8 md:p-12 transition-all ${
                  proposal.status === 'hired' ? 'border-emerald-500 shadow-xl shadow-emerald-500/5' : 'border-slate-50 hover:border-indigo-100 shadow-sm'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                  
                  {/* CANDIDATE INFO */}
                  <div className="lg:col-span-8 space-y-8">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-slate-900 rounded-[28px] flex items-center justify-center text-white font-black text-3xl shrink-0">
                        {proposal.freelancerName.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase">{proposal.freelancerName}</h3>
                          {proposal.status === 'hired' && (
                            <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest">
                              <Trophy size={12} /> Hired
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-indigo-600 font-black text-[10px] uppercase tracking-widest flex items-center gap-1">
                            <DollarSign size={12} /> {proposal.bid}
                          </span>
                          <span className="flex items-center gap-1 text-amber-500 font-black text-[10px] uppercase tracking-widest">
                            <Star size={12} className="fill-amber-500" /> 4.9
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-lg leading-relaxed text-slate-600 line-clamp-3 group-hover:line-clamp-none transition-all duration-500">
                        {proposal.coverLetter}
                      </p>
                      
                      {/* RICH PORTFOLIO PREVIEW */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {proposal.portfolio?.map((link, i) => (
                          <a key={i} href="#" className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl text-[10px] font-bold text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                            <ExternalLink size={12} /> Preview Work {i + 1}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ACTION PANEL */}
                  <div className="lg:col-span-4 flex flex-col justify-center gap-3 bg-slate-50/50 p-6 md:p-8 rounded-[36px]">
                    {proposal.status === 'pending' ? (
                      <>
                        <button 
                          onClick={() => updateStatus(proposal.id, 'hired')}
                          className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 shadow-lg"
                        >
                          <Zap size={14} fill="white"/> Accept Proposal
                        </button>
                        <button 
                          onClick={() => navigate(`/proposals/review/${proposal.id}`)}
                          className="w-full py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                        >
                          <Eye size={14}/> Full Dossier
                        </button>
                        <button 
                          onClick={() => updateStatus(proposal.id, 'declined')}
                          className="w-full py-2 text-slate-400 hover:text-rose-500 font-black uppercase text-[9px] tracking-widest transition-colors mt-2"
                        >
                          Dismiss
                        </button>
                      </>
                    ) : (
                      <div className={`text-center py-6 rounded-2xl border ${
                        proposal.status === 'hired' ? 'bg-emerald-500/5 border-emerald-100 text-emerald-600' : 'bg-slate-100 border-slate-200 text-slate-400'
                      }`}>
                         <p className="text-[10px] font-black uppercase tracking-[0.3em]">
                            {proposal.status === 'hired' ? 'Partner Selected' : 'Proposal Archived'}
                         </p>
                         {proposal.status === 'hired' && (
                           <button className="mt-4 text-[9px] font-black uppercase underline tracking-widest">Open Workspace</button>
                         )}
                      </div>
                    )}
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}