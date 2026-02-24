import React from 'react';
import { Clock, Send, Trash2, ExternalLink, AlertCircle, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Proposals = ({ jobs = [], appliedJobs = [], setAppliedJobs }) => {
  
  // Filter jobs that the user has applied to
  const activeProposals = Array.isArray(jobs) && Array.isArray(appliedJobs)
    ? jobs.filter(j => appliedJobs.includes(j.id))
    : [];

  const handleWithdraw = (jobId) => {
    // A more modern confirmation UI would be better, but native works for now
    if (window.confirm("Are you sure you want to withdraw this proposal? This action cannot be undone.")) {
      setAppliedJobs(appliedJobs.filter(id => id !== jobId));
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em]">
            <Zap size={10} fill="currentColor" /> Freelancer Dashboard
          </div>
          <h2 className="text-5xl font-black uppercase tracking-tighter text-slate-900 leading-none">My Proposals</h2>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.1em]">Tracking your active pipeline</p>
        </div>

        <div className="flex items-center gap-4 bg-white border border-slate-100 p-2 pl-6 rounded-3xl shadow-sm">
          <div className="flex flex-col">
            <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Active Bids</span>
            <span className="text-2xl font-black text-slate-900 leading-tight">{activeProposals.length}</span>
          </div>
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white">
            <Send size={20} />
          </div>
        </div>
      </div>
      
      {activeProposals.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-slate-100 rounded-[56px] py-32 text-center">
          <div className="w-24 h-24 bg-slate-50 rounded-[40px] flex items-center justify-center mx-auto mb-8 text-slate-200">
            <Send size={40} />
          </div>
          <h3 className="text-2xl font-black uppercase text-slate-800 tracking-tighter mb-3">Your desk is clear</h3>
          <p className="text-slate-400 font-medium max-w-sm mx-auto leading-relaxed mb-10">
            You haven't pitched any projects yet. The marketplace is waiting for your expertise.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-indigo-600 transition-all hover:-translate-y-1 shadow-2xl active:scale-95"
          >
            Explore Gigs <Zap size={14} fill="currentColor" />
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {activeProposals.map((job, index) => (
            <div 
              key={job.id} 
              className="bg-white border border-slate-100 p-8 rounded-[48px] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/5 transition-all group relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col md:flex-row items-start gap-8 flex-1">
                <div className="w-20 h-20 bg-slate-900 text-white rounded-[28px] flex flex-col items-center justify-center shrink-0 group-hover:bg-indigo-600 transition-colors duration-500">
                  <span className="text-[9px] font-black uppercase tracking-tighter opacity-60">Status</span>
                  <Clock size={24} />
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-[9px] font-black text-indigo-600 uppercase bg-indigo-50 px-3 py-1 rounded-full tracking-widest border border-indigo-100">
                        {job.category}
                      </span>
                      <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">
                        Applied recently
                      </span>
                    </div>
                    <h3 className="font-black text-3xl text-slate-900 tracking-tighter leading-tight group-hover:text-indigo-600 transition-colors">
                      {job.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full">
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-ping" />
                      <span className="text-[10px] font-black text-amber-600 uppercase tracking-[0.15em]">In Review</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Est. Value</span>
                      <span className="text-sm font-black text-slate-900">{job.displayBudget || job.budget}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full lg:w-auto pt-8 lg:pt-0 border-t lg:border-t-0 border-slate-50">
                <Link 
                  to={`/job/${job.id}`}
                  className="flex-1 lg:flex-none flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white bg-slate-50 hover:bg-slate-900 px-8 py-5 rounded-2xl transition-all"
                >
                  <ExternalLink size={14} /> Open
                </Link>
                <button 
                  onClick={() => handleWithdraw(job.id)}
                  className="flex-1 lg:flex-none flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest text-rose-500 hover:text-white bg-white hover:bg-rose-500 border border-rose-100 hover:border-rose-500 px-8 py-5 rounded-2xl transition-all"
                >
                  <Trash2 size={14} /> Withdraw
                </button>
              </div>
            </div>
          ))}
          
          <div className="bg-slate-900 p-8 rounded-[40px] flex items-start gap-6 border border-slate-800 shadow-2xl">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center shrink-0">
              <AlertCircle className="text-indigo-400" size={24} />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-slate-100 font-black uppercase tracking-widest">Proposal Protocol</p>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                Withdrawing a proposal is permanent. You will be removed from the candidate pool and the client will be notified. Ensure you've communicated via chat if a project scope change is the reason for withdrawal.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Proposals;