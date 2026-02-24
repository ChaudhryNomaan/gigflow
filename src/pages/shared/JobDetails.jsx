import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Clock, Briefcase, ShieldCheck, 
  MapPin, Star, Zap, ArrowUpRight, Calendar,
  FileText, Globe, Bookmark, Share2, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const JobDetails = ({ jobs = [] }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  
  // Refined find logic to ensure it catches the job regardless of ID type
  const job = jobs.find(j => String(j.id) === String(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!job) return (
    <div className="h-screen flex flex-col items-center justify-center space-y-6 bg-[#FDFDFF]">
      <motion.div 
        animate={{ scale: [1, 1.1, 1] }} 
        transition={{ repeat: Infinity, duration: 2 }}
        className="w-24 h-24 bg-slate-100 rounded-[40px] flex items-center justify-center"
      >
         <Briefcase className="text-slate-300" size={40} />
      </motion.div>
      <h2 className="text-4xl font-black uppercase tracking-tighter text-slate-900 italic">Mission Missing</h2>
      <button onClick={() => navigate('/explore')} className="px-10 py-5 bg-black text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-100">
        Return to Feed
      </button>
    </div>
  );

  const displayPrice = job.budget?.startsWith('$') ? job.budget : `$${job.budget}`;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto pb-32 px-6 pt-10"
    >
      {/* 1. INTERFACE HEADER */}
      <div className="flex justify-between items-center mb-16">
        <button 
          onClick={() => navigate(-1)} 
          className="group flex items-center gap-3 text-slate-400 font-black uppercase text-[10px] tracking-[0.3em] hover:text-indigo-600 transition-all"
        >
          <div className="p-2 bg-white border border-slate-100 rounded-lg group-hover:border-indigo-200 transition-colors">
            <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          </div>
          Back to Terminal
        </button>
        
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all">
            <Share2 size={14} /> Share
          </button>
          <button 
            onClick={() => setIsSaved(!isSaved)}
            className={`flex items-center gap-2 px-5 py-3 border rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
              isSaved ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-white border-slate-100 text-slate-400'
            }`}
          >
            <Bookmark size={14} fill={isSaved ? "currentColor" : "none"} /> {isSaved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        
        {/* 2. CORE BRIEFING (8 COLUMNS) */}
        <div className="lg:col-span-8 space-y-10">
          <section className="bg-white border border-slate-100 rounded-[56px] p-8 md:p-16 shadow-sm relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/30 blur-[100px] -z-10" />

            <div className="space-y-8 mb-16">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-100">
                  <ShieldCheck size={12} /> Escrow Funded
                </div>
                <span className="text-[10px] font-black text-slate-300 uppercase flex items-center gap-1.5 tracking-widest">
                  <Clock size={14} /> Open {job.posted || '2h ago'}
                </span>
              </div>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 leading-[0.85] italic uppercase">
                {job.title}
              </h1>
            </div>

            {/* PERFORMANCE METRICS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-slate-50 mb-16">
              <MetricBox label="Project Budget" value={displayPrice} status="Verified" />
              <MetricBox label="Target Duration" value="30 Days" status="Estimate" />
              <MetricBox label="Skill Floor" value={job.level || "Elite"} status="Required" />
              <MetricBox label="Competition" value="Low" status="8 Proposals" />
            </div>

            {/* PROJECT BODY */}
            <div className="space-y-12">
              <div className="space-y-6">
                <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-600 flex items-center gap-3">
                   <div className="h-[1px] w-8 bg-indigo-200" /> Executive Summary
                </h3>
                <div className="text-slate-600 leading-relaxed text-xl font-medium max-w-2xl">
                  {job.description || "The client has not provided a full description for this mandate yet. Please refer to the deliverables below for technical requirements."}
                </div>
              </div>

              {/* DYNAMIC DELIVERABLES */}
              <div className="space-y-8 pt-6">
                <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-600 flex items-center gap-3 italic">
                  <div className="h-[1px] w-8 bg-indigo-200" /> Handoff Requirements
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {(job.deliverables || ['System Architecture Docs', 'Frontend Interface v1', 'API Integration', 'Security Audit']).map((d, i) => (
                    <motion.div 
                      whileHover={{ x: 5 }}
                      key={i} 
                      className="flex gap-5 items-center p-6 bg-slate-50 border border-slate-100 rounded-[32px] group hover:bg-white hover:border-indigo-600/20 transition-all duration-300"
                    >
                      <div className="bg-white p-3 rounded-2xl text-indigo-600 shadow-sm border border-slate-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <Zap size={18} fill="currentColor"/>
                      </div>
                      <span className="text-sm font-black uppercase tracking-tight text-slate-800">{d}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* TECH STACK */}
            <div className="mt-20 pt-12 border-t border-slate-50">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-8">Required Infrastructure</h3>
              <div className="flex flex-wrap gap-3">
                {job.tags?.map(tag => (
                  <span key={tag} className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all cursor-default shadow-lg shadow-slate-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* 3. SUBMISSION TERMINAL (4 COLUMNS) */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-10">
          <div className="bg-slate-900 text-white rounded-[56px] p-10 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 space-y-10">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 mb-4 italic">Guaranteed Payout</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-7xl font-black tracking-tighter leading-none">{displayPrice}</span>
                  <span className="text-indigo-400 font-black text-xs uppercase tracking-widest">USD</span>
                </div>
              </div>

              <div className="space-y-6 pt-10 border-t border-white/10">
                <SidebarStat icon={<ShieldCheck className="text-emerald-400"/>} title="Payment System" value="GigFlow Escrow" />
                <SidebarStat icon={<MapPin className="text-indigo-400"/>} title="Jurisdiction" value={job.location || 'Global/Remote'} />
                <SidebarStat icon={<Calendar className="text-indigo-400"/>} title="Project Start" value="Immediate" />
              </div>

              <button 
                onClick={() => navigate(`/job/${job.id}/apply`)}
                className="w-full mt-4 py-8 bg-indigo-600 text-white hover:bg-white hover:text-slate-900 rounded-[32px] font-black uppercase tracking-[0.3em] text-[12px] transition-all active:scale-95 flex items-center justify-center gap-3 group shadow-2xl shadow-indigo-900/40"
              >
                Draft Proposal <ArrowUpRight size={20} strokeWidth={3} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
            
            {/* Visual Decoration */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]" />
          </div>

          {/* CLIENT REPUTATION CARD */}
          <div className="bg-white border border-slate-100 rounded-[48px] p-10 space-y-8">
            <div className="flex justify-between items-center">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 italic">Client Scorecard</h4>
              <div className="flex gap-1 text-amber-400">
                {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor"/>)}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-1">
                <p className="text-3xl font-black tracking-tighter text-slate-900">98%</p>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Hire Velocity</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-black tracking-tighter text-slate-900">$200k+</p>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Capital Spent</p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-50">
               <div className="flex items-center gap-3 text-slate-400">
                  <Info size={14} />
                  <p className="text-[10px] font-bold uppercase tracking-tight leading-snug">Member since Oct 2024. Avg. payment speed: 4h.</p>
               </div>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

// ATOMIC COMPONENTS
const MetricBox = ({ label, value, status }) => (
  <div>
    <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] mb-2">{label}</p>
    <p className="text-3xl font-black text-slate-900 tracking-tighter leading-none mb-2 italic">{value}</p>
    <div className="flex items-center gap-1.5">
       <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{status}</p>
    </div>
  </div>
);

const SidebarStat = ({ icon, title, value }) => (
  <div className="flex items-center gap-5 group">
    <div className="p-3 bg-white/5 rounded-2xl border border-white/5 group-hover:bg-white/10 transition-colors">
      {icon}
    </div>
    <div>
      <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-0.5">{title}</p>
      <p className="text-sm font-black text-white tracking-tight">{value}</p>
    </div>
  </div>
);

export default JobDetails;