import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Check, X, ArrowLeft, DollarSign, MessageSquare, 
  ExternalLink, Briefcase, Star, Zap, UserCheck 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ViewProposals({ proposals, setProposals, jobs }) {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const currentJob = jobs.find(j => j.id === parseInt(jobId));
  const jobProposals = proposals.filter(p => p.jobId === parseInt(jobId));

  const updateStatus = (proposalId, status) => {
    setProposals(prev => prev.map(p => 
      p.id === proposalId ? { ...p, status } : p
    ));
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 animate-in fade-in duration-700">
      
      {/* 1. TOP NAVIGATION & JOB INFO */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="space-y-4">
          <button 
            onClick={() => navigate(-1)} 
            className="group flex items-center gap-2 text-slate-400 font-black uppercase text-[10px] tracking-widest hover:text-indigo-600 transition-all"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> Back to Dashboard
          </button>
          <div className="space-y-1">
            <h1 className="text-5xl font-black tracking-tighter text-slate-900 leading-none">
              {currentJob?.title}
            </h1>
            <div className="flex items-center gap-4 pt-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100">
                {jobProposals.length} Applications
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Budget: {currentJob?.budget || currentJob?.displayBudget}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 transition-all shadow-sm">
            <ExternalLink size={20} />
          </button>
        </div>
      </div>

      {/* 2. PROPOSALS LIST */}
      <div className="grid gap-10">
        {jobProposals.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-slate-100 rounded-[56px] py-40 text-center space-y-4">
            <div className="w-20 h-20 bg-slate-50 rounded-[32px] flex items-center justify-center mx-auto text-slate-200">
              <UserCheck size={40} />
            </div>
            <p className="text-slate-400 font-black uppercase text-[11px] tracking-[0.3em]">Waiting for the perfect match...</p>
          </div>
        ) : (
          <AnimatePresence>
            {jobProposals.map((proposal, index) => (
              <motion.div 
                key={proposal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white border rounded-[56px] p-10 lg:p-14 transition-all overflow-hidden ${
                  proposal.status === 'hired' ? 'border-emerald-500 shadow-2xl shadow-emerald-500/10' : 'border-slate-100 shadow-sm hover:shadow-xl'
                }`}
              >
                {/* Visual Flair for Hired/Top Match */}
                {proposal.status === 'hired' && (
                  <div className="absolute top-0 right-0 bg-emerald-500 text-white px-8 py-2 rounded-bl-[32px] text-[10px] font-black uppercase tracking-widest">
                    Selected Partner
                  </div>
                )}

                <div className="flex flex-col lg:flex-row gap-12">
                  
                  {/* PROFILE & COVER LETTER */}
                  <div className="flex-1 space-y-10">
                    <div className="flex items-start gap-6">
                      <div className="relative">
                        <div className={`w-24 h-24 rounded-[36px] flex items-center justify-center text-white font-black text-4xl shadow-2xl ${
                          proposal.status === 'hired' ? 'bg-emerald-500' : 'bg-slate-950'
                        }`}>
                          {proposal.freelancerName.charAt(0)}
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-2xl shadow-lg">
                          <Star size={16} className="text-amber-400 fill-amber-400"/>
                        </div>
                      </div>
                      <div className="space-y-1 pt-2">
                        <h3 className="text-3xl font-black text-slate-900 tracking-tighter italic">
                          {proposal.freelancerName}
                        </h3>
                        <div className="flex items-center gap-3">
                          <p className="text-indigo-600 font-black text-[11px] uppercase tracking-widest">
                            {proposal.bid} Bid
                          </p>
                          <span className="w-1 h-1 bg-slate-200 rounded-full"/>
                          <p className="text-slate-400 font-bold text-[11px] uppercase tracking-widest">
                            Top 1% Talent
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-3">
                        <MessageSquare size={14} className="text-indigo-500"/> Cover Letter
                      </h4>
                      <div className="bg-slate-50/50 border border-slate-50 p-10 rounded-[48px] relative group">
                        <p className="text-slate-700 leading-relaxed font-medium text-xl whitespace-pre-wrap">
                          {proposal.coverLetter}
                        </p>
                      </div>
                    </div>

                    {/* PORTFOLIO ATTACHMENTS */}
                    {proposal.portfolio && proposal.portfolio.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-3">
                          <Briefcase size={14} className="text-indigo-500"/> Work Evidence
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {proposal.portfolio.map((link, i) => (
                            <a 
                              key={i} 
                              href={link.startsWith('http') ? link : `https://${link}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-4 bg-white border border-slate-100 px-8 py-5 rounded-[24px] hover:border-indigo-600 hover:bg-slate-50 transition-all group"
                            >
                              <div className="w-8 h-8 bg-slate-900 rounded-xl flex items-center justify-center text-white group-hover:bg-indigo-600 transition-colors">
                                <ExternalLink size={14} />
                              </div>
                              <span className="text-xs font-black text-slate-800 tracking-tight">{link}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ACTION SIDEBAR */}
                  <div className="lg:w-72 flex flex-col gap-3 justify-start pt-12">
                    {proposal.status === 'pending' ? (
                      <>
                        <button 
                          onClick={() => updateStatus(proposal.id, 'hired')}
                          className="group w-full py-6 bg-slate-900 text-white rounded-[24px] font-black uppercase text-[11px] tracking-[0.2em] hover:bg-indigo-600 transition-all shadow-2xl flex items-center justify-center gap-3"
                        >
                          <Zap size={16} fill="white"/> Hire Talent
                        </button>
                        <button 
                          className="w-full py-6 bg-white border border-slate-100 text-slate-900 rounded-[24px] font-black uppercase text-[11px] tracking-[0.2em] hover:bg-slate-50 transition-all flex items-center justify-center gap-3"
                        >
                          <MessageSquare size={16}/> Interview
                        </button>
                        <button 
                          onClick={() => updateStatus(proposal.id, 'declined')}
                          className="w-full py-6 text-slate-400 hover:text-rose-500 font-black uppercase text-[10px] tracking-widest transition-colors"
                        >
                          Decline Proposal
                        </button>
                      </>
                    ) : (
                      <div className={`w-full py-8 rounded-[32px] font-black uppercase text-xs tracking-[0.2em] text-center flex flex-col items-center gap-2 ${
                        proposal.status === 'hired' 
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                          : 'bg-slate-50 text-slate-400 border border-slate-100'
                      }`}>
                        {proposal.status === 'hired' ? (
                          <>
                            <Check size={24} strokeWidth={3}/> Project Secured
                          </>
                        ) : 'Decision: Declined'}
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