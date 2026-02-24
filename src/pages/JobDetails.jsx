import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Clock, Briefcase, ShieldCheck, 
  MapPin, Users, Star, CheckCircle2, Share2, 
  Zap, ArrowUpRight, DollarSign, Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';

const JobDetails = ({ jobs = [] }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Refined find logic to ensure it catches the job regardless of ID type
  const job = jobs.find(j => String(j.id) === String(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!job) return (
    <div className="h-screen flex flex-col items-center justify-center space-y-6">
      <div className="w-24 h-24 bg-slate-100 rounded-[40px] flex items-center justify-center animate-pulse">
         <Briefcase className="text-slate-300" size={40} />
      </div>
      <h2 className="text-4xl font-black uppercase tracking-tighter text-slate-900 italic">Gig Not Found</h2>
      <button onClick={() => navigate('/explore')} className="px-10 py-4 bg-black text-white rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-indigo-600 transition-all">
        Back to Marketplace
      </button>
    </div>
  );

  // Helper to format budget display
  const displayPrice = job.budget?.startsWith('$') ? job.budget : `$${job.budget}`;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto pb-32 px-6"
    >
      {/* 1. TOP NAVIGATION BAR */}
      <div className="flex justify-between items-center mb-12">
        <button 
          onClick={() => navigate(-1)} 
          className="group flex items-center gap-2 text-slate-400 font-black uppercase text-[10px] tracking-[0.2em] hover:text-indigo-600 transition-all"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to feed
        </button>
        <div className="flex gap-4">
          <button className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 transition-colors">
            <Share2 size={18} />
          </button>
          <button className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-indigo-600 transition-colors">
            <Star size={18} />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        
        {/* 2. LEFT CONTENT (8 COLUMNS) */}
        <div className="lg:col-span-8 space-y-10">
          <section className="bg-white border border-slate-100 rounded-[48px] p-10 md:p-16 shadow-sm">
            <div className="space-y-6 mb-12">
              <div className="flex flex-wrap items-center gap-4">
                <span className="bg-indigo-600 text-white px-4 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest">
                  {job.type || 'Fixed Project'}
                </span>
                <span className="text-[10px] font-bold text-slate-300 uppercase flex items-center gap-1.5">
                  <Clock size={14} /> Posted {job.posted || 'recently'}
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 leading-[0.9] italic">
                {job.title}
              </h1>
            </div>

            {/* QUICK STATS GRID */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-10 border-y border-slate-50 mb-12">
              <StatCard label="Budget" value={displayPrice} sub="Verified" />
              <StatCard label="Duration" value="2-4 Weeks" sub="Est. Time" />
              <StatCard label="Level" value={job.level || "Expert"} sub="Experience" />
              <StatCard label="Proposals" value="12" sub="Active bids" />
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-indigo-600">The Mission</h3>
                <div className="text-slate-600 leading-relaxed text-xl font-medium whitespace-pre-wrap">
                  {job.description || "No description provided for this project."}
                </div>
              </div>

              {/* DELIVERABLES (Dynamic-ish) */}
              <div className="space-y-6 pt-10">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-indigo-600 italic">Key Deliverables</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {(job.deliverables || ['High-fidelity UI Kit', 'Responsive Dashboard', 'Interactive Prototypes', 'Documentation']).map((d, i) => (
                    <div key={i} className="flex gap-4 items-center p-5 bg-slate-50 border border-slate-100 rounded-3xl group hover:border-indigo-200 transition-colors">
                      <div className="bg-white p-2 rounded-xl text-indigo-600 shadow-sm"><Zap size={16} fill="currentColor"/></div>
                      <span className="text-sm font-bold text-slate-700">{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* TAGS */}
            <div className="mt-16 pt-10 border-t border-slate-50">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 tracking-[0.3em]">Required Stack</h3>
              <div className="flex flex-wrap gap-2">
                {job.tags?.map(tag => (
                  <span key={tag} className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest hover:border-black transition-all cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* 3. RIGHT SIDEBAR (4 COLUMNS) */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
          <div className="bg-slate-950 text-white rounded-[48px] p-10 shadow-2xl overflow-hidden relative group">
            <div className="relative z-10 space-y-8">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-2">Project Worth</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-6xl font-black tracking-tighter">{displayPrice}</span>
                </div>
              </div>

              <div className="space-y-5 pt-8 border-t border-white/10">
                <SidebarInfoItem icon={<ShieldCheck size={18}/>} title="Payment" value="Verified" />
                <SidebarInfoItem icon={<MapPin size={18}/>} title="Location" value={job.location || 'Remote'} />
                <SidebarInfoItem icon={<Calendar size={18}/>} title="Type" value={job.type} />
              </div>

              <button 
                onClick={() => navigate(`/job/${job.id}/apply`)}
                className="w-full mt-4 py-6 bg-white text-black hover:bg-indigo-600 hover:text-white rounded-[28px] font-black uppercase tracking-[0.2em] text-[11px] transition-all active:scale-95 flex items-center justify-center gap-2 group"
              >
                Submit Proposal <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
            
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-600/20 rounded-full blur-3xl group-hover:bg-indigo-600/40 transition-all" />
          </div>

          <div className="bg-white border border-slate-100 rounded-[40px] p-10 space-y-6">
            <div className="flex justify-between items-center">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Client History</h4>
              <div className="flex text-amber-400"><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/></div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-2xl font-black tracking-tighter">98%</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Hire Rate</p>
              </div>
              <div>
                <p className="text-2xl font-black tracking-tighter">$200k+</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Total Spent</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

// SUB-COMPONENTS
const StatCard = ({ label, value, sub }) => (
  <div>
    <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 italic">{label}</p>
    <p className="text-2xl font-black text-slate-900 tracking-tighter leading-none mb-1">{value}</p>
    <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{sub}</p>
  </div>
);

const SidebarInfoItem = ({ icon, title, value }) => (
  <div className="flex items-center gap-4 group">
    <div className="p-2.5 bg-white/5 rounded-xl text-indigo-400 border border-white/5 transition-colors">
      {icon}
    </div>
    <div>
      <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{title}</p>
      <p className="text-sm font-black">{value}</p>
    </div>
  </div>
);

export default JobDetails;