import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Link as LinkIcon, Plus, X, 
  Target, Zap, Clock, DollarSign, ArrowRight, Star, Sparkles,
  ShieldCheck, Info, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ApplyJob({ jobs, setProposals, notify }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = jobs.find(j => String(j.id) === String(id));

  const [formData, setFormData] = useState({
    bid: "",
    duration: "1-2 Weeks",
    coverLetter: "",
    portfolioLinks: [],
    milestones: [{ id: 1, task: "Initial Draft & Strategy", amount: "" }]
  });
  const [tempLink, setTempLink] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- CALCULATIONS ---
  const serviceFee = useMemo(() => 
    formData.bid ? (parseFloat(formData.bid) * 0.1).toFixed(2) : "0.00", 
  [formData.bid]);

  const takeHome = useMemo(() => 
    formData.bid ? (parseFloat(formData.bid) - parseFloat(serviceFee)).toFixed(2) : "0.00", 
  [formData.bid, serviceFee]);

  const milestoneTotal = useMemo(() => 
    formData.milestones.reduce((sum, m) => sum + (parseFloat(m.amount) || 0), 0),
  [formData.milestones]);

  const isMilestoneBalanced = useMemo(() => {
    if (!formData.bid || milestoneTotal === 0) return true;
    return milestoneTotal === parseFloat(formData.bid);
  }, [formData.bid, milestoneTotal]);

  const hasKeywords = useMemo(() => {
    const keywords = ['figma', 'optimized', 'strategy', 'ux', 'performance'];
    return keywords.some(k => formData.coverLetter.toLowerCase().includes(k));
  }, [formData.coverLetter]);

  // --- HANDLERS ---
  const handleMilestoneChange = (mId, field, value) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones.map(m => 
        m.id === mId ? { ...m, [field]: value } : m
      )
    }));
  };

  const addMilestone = () => {
    setFormData(prev => ({
      ...prev,
      milestones: [...prev.milestones, { id: Date.now(), task: "", amount: "" }]
    }));
  };

  const removeMilestone = (mId) => {
    if (formData.milestones.length > 1) {
      setFormData(prev => ({
        ...prev,
        milestones: prev.milestones.filter(m => m.id !== mId)
      }));
    }
  };

  const addLink = () => {
    if (tempLink.trim()) {
      const link = tempLink.startsWith('http') ? tempLink : `https://${tempLink}`;
      if (!formData.portfolioLinks.includes(link)) {
        setFormData(prev => ({ ...prev, portfolioLinks: [...prev.portfolioLinks, link] }));
        setTempLink("");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.bid) return notify("Mission aborted: Proposed rate required.");
    
    if (milestoneTotal > 0 && milestoneTotal !== parseFloat(formData.bid)) {
      return notify(`Error: Milestone total ($${milestoneTotal}) must match your bid ($${formData.bid})`);
    }

    const proposal = {
      ...formData,
      id: Date.now(),
      jobId: job?.id,
      jobTitle: job?.title,
      freelancerName: "Liza M.", 
      status: 'pending',
      appliedAt: new Date().toLocaleDateString()
    };
    
    setProposals(prev => [...prev, proposal]);
    notify(`Dossier dispatched for ${job.title}!`);
    navigate('/');
  };

  if (!job) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="max-w-[1400px] mx-auto py-12 px-6 lg:px-12"
    >
      {/* 1. HEADER SECTION */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
        <div className="space-y-4">
          <button 
            onClick={() => navigate(-1)} 
            className="group flex items-center gap-3 text-slate-400 font-black uppercase text-[10px] tracking-[0.3em] hover:text-indigo-600 transition-all"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Cancel Draft
          </button>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 leading-none italic uppercase">
            Craft <span className="text-indigo-600">Proposal.</span>
          </h1>
        </div>

        {/* REVENUE CALCULATOR CARD */}
        <div className="bg-slate-900 text-white p-8 rounded-[40px] flex items-center gap-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
            <ShieldCheck size={48} />
          </div>
          <div className="relative z-10 flex items-center gap-8">
            <div className="space-y-1">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Net Take-Home</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-emerald-400">${takeHome}</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase">USD</span>
              </div>
            </div>
            <div className="w-[1px] h-12 bg-white/10" />
            <div className="space-y-1">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Elite Fee (10%)</span>
              <p className="text-lg font-black text-rose-400">-${serviceFee}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-12 gap-12">
        
        {/* LEFT: JOB SYNOPSIS (STICKY) */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="lg:sticky lg:top-8 space-y-6">
            <div className="bg-white border border-slate-100 rounded-[48px] p-10 shadow-sm relative overflow-hidden group">
              <div className="relative z-10 space-y-8">
                <div className="space-y-3">
                  <div className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg w-fit text-[9px] font-black uppercase tracking-widest">
                    Briefing Details
                  </div>
                  <h3 className="text-2xl font-black tracking-tight text-slate-900 italic leading-tight">{job.title}</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest mb-1">Max Budget</p>
                    <p className="text-sm font-black text-slate-800">{job.budget}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest mb-1">Experience</p>
                    <p className="text-sm font-black text-slate-800">Expert</p>
                  </div>
                </div>

                <p className="text-sm font-medium leading-relaxed text-slate-500">
                  {job.description}
                </p>
              </div>
            </div>

            {/* AI OPTIMIZATION CARD */}
            <div className={`rounded-[40px] p-8 border-2 transition-all duration-500 ${hasKeywords ? 'bg-emerald-50 border-emerald-200 shadow-emerald-100 shadow-lg' : 'bg-slate-50 border-slate-100'}`}>
              <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center gap-2">
                   <Sparkles size={18} className={hasKeywords ? 'text-emerald-500' : 'text-indigo-400'} />
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">AI Score Optimizer</h4>
                 </div>
                 {hasKeywords && <Check size={16} className="text-emerald-500" />}
              </div>
              <p className="text-[11px] font-bold text-slate-600 leading-relaxed">
                {hasKeywords 
                  ? "Strategy keywords detected! Your proposal is now ranked as 'High Match' for the client's filter."
                  : 'Pro Tip: Mention "Figma" or "Performance Optimization" to align with this client\'s recent hire history.'}
              </p>
            </div>
          </div>
        </aside>

        {/* RIGHT: PROPOSAL EDITOR */}
        <main className="lg:col-span-8">
          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* 1. FINANCIALS & TIMELINE */}
            <section className="bg-white border border-slate-100 rounded-[56px] p-8 md:p-12 shadow-sm">
              <div className="grid md:grid-cols-2 gap-12 mb-12">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2">
                    <DollarSign size={14} /> Global Bid (USD)
                  </label>
                  <div className="relative">
                    <input 
                      type="number" required
                      className="w-full bg-transparent border-b-4 border-slate-100 py-4 text-5xl font-black outline-none focus:border-indigo-600 transition-all tracking-tighter"
                      placeholder="00.00"
                      value={formData.bid}
                      onChange={(e) => setFormData({...formData, bid: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2">
                    <Clock size={14} /> Est. Delivery
                  </label>
                  <select 
                    className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl py-6 px-6 font-black text-slate-700 outline-none focus:border-indigo-100 focus:bg-white transition-all appearance-none cursor-pointer"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  >
                    <option>Less than 1 Week</option>
                    <option>1-2 Weeks</option>
                    <option>2-4 Weeks</option>
                    <option>1 Month +</option>
                  </select>
                </div>
              </div>

              {/* MILESTONE UI */}
              <div className="pt-10 border-t border-slate-50">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-3">
                    <h3 className="text-[11px] font-black uppercase tracking-widest text-slate-900">Payment Phasing</h3>
                    {!isMilestoneBalanced && formData.bid > 0 && (
                      <span className="flex items-center gap-1 text-[9px] font-black text-rose-500 bg-rose-50 px-2 py-1 rounded">
                        <AlertCircle size={12} /> Total must equal ${formData.bid}
                      </span>
                    )}
                  </div>
                  <button type="button" onClick={addMilestone} className="text-[10px] font-black text-indigo-600 uppercase flex items-center gap-2 hover:bg-indigo-50 px-4 py-2 rounded-xl transition-all">
                    <Plus size={14}/> Add Phase
                  </button>
                </div>
                
                <div className="space-y-3">
                  {formData.milestones.map((m, idx) => (
                    <div key={m.id} className="flex flex-col md:flex-row gap-4 items-center bg-slate-50/50 p-4 rounded-[24px] border border-slate-100 group">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-black text-slate-300 border border-slate-100">
                        {idx+1}
                      </div>
                      <input 
                        className="flex-1 bg-transparent border-none outline-none font-bold text-slate-700 text-sm placeholder:text-slate-300" 
                        placeholder="Phase Title (e.g. Design System Handover)"
                        value={m.task}
                        onChange={(e) => handleMilestoneChange(m.id, 'task', e.target.value)}
                      />
                      <div className="w-full md:w-32 relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400">$</span>
                        <input 
                          type="number"
                          className="w-full bg-white rounded-xl py-3 pl-8 pr-4 text-xs font-black outline-none border border-slate-100 focus:border-indigo-400" 
                          placeholder="00" 
                          value={m.amount}
                          onChange={(e) => handleMilestoneChange(m.id, 'amount', e.target.value)}
                        />
                      </div>
                      <button type="button" onClick={() => removeMilestone(m.id)} className="p-2 text-slate-300 hover:text-rose-500 transition-colors">
                        <X size={18}/>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 2. COVER LETTER EDITOR */}
            <section className="bg-white border border-slate-100 rounded-[56px] p-8 md:p-12 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                  <Target size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black tracking-tight uppercase italic text-slate-900">Execution Strategy</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">How will you win this mission?</p>
                </div>
              </div>
              <textarea 
                required
                className="w-full bg-slate-50 border-2 border-transparent rounded-[40px] p-8 md:p-12 min-h-[450px] text-lg font-medium text-slate-700 outline-none focus:bg-white focus:border-indigo-50 transition-all leading-relaxed placeholder:text-slate-300"
                placeholder="Start typing your strategy..."
                value={formData.coverLetter}
                onChange={(e) => setFormData({...formData, coverLetter: e.target.value})}
              />
            </section>

            {/* 3. ATTACHMENTS */}
            <section className="bg-slate-950 rounded-[56px] p-8 md:p-12 text-white shadow-2xl">
               <div className="flex flex-col md:flex-row justify-between md:items-end gap-8 mb-12">
                 <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400">Expertise Evidence</p>
                    <h3 className="text-3xl font-black tracking-tighter italic lowercase">Proof of Work</h3>
                 </div>
                 <div className="flex bg-white/5 p-2 rounded-[24px] border border-white/10 w-full md:w-auto">
                    <input 
                      type="text"
                      className="bg-transparent py-3 px-6 text-sm font-bold outline-none flex-1 md:w-[260px]"
                      placeholder="Paste Portfolio Link..."
                      value={tempLink}
                      onChange={(e) => setTempLink(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLink())}
                    />
                    <button type="button" onClick={addLink} className="p-4 bg-indigo-600 text-white rounded-2xl font-black hover:bg-white hover:text-indigo-600 transition-all">
                      <Plus size={20} />
                    </button>
                 </div>
               </div>

               <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                 <AnimatePresence>
                   {formData.portfolioLinks.map((link, index) => (
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                        key={index} 
                        className="bg-white/5 border border-white/10 p-5 rounded-3xl flex items-center justify-between group hover:bg-white/10 transition-all"
                     >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-400 shrink-0">
                            <LinkIcon size={14} />
                          </div>
                          <p className="text-[10px] font-black uppercase tracking-widest truncate">{link.split('//')[1] || link}</p>
                        </div>
                        <button type="button" onClick={() => removeLink(index)} className="text-slate-500 hover:text-rose-400 p-1"><X size={16}/></button>
                     </motion.div>
                   ))}
                 </AnimatePresence>
               </div>
            </section>

            <button 
              type="submit"
              disabled={!isMilestoneBalanced && formData.bid > 0}
              className={`group relative w-full py-10 rounded-[48px] font-black uppercase tracking-[0.4em] text-[11px] text-white transition-all active:scale-[0.98] shadow-2xl 
                ${isMilestoneBalanced 
                  ? 'bg-indigo-600 hover:bg-slate-900 shadow-indigo-500/20' 
                  : 'bg-slate-400 cursor-not-allowed opacity-50'}`}
            >
              Dispatch Proposal <ArrowRight size={18} className="inline-block ml-4 group-hover:translate-x-2 transition-transform" />
            </button>
          </form>
        </main>
      </div>
    </motion.div>
  );
}