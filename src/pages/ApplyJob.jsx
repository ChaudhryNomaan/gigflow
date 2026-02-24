import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Link as LinkIcon, Plus, X, 
  Target, Zap, Clock, DollarSign, ArrowRight, Star, Sparkles
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

  // Check if cover letter mentions keywords (Pro Tip Logic)
  const hasKeywords = useMemo(() => {
    const keywords = ['figma', 'optimized', 'strategy', 'ux'];
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
      setFormData(prev => ({ ...prev, portfolioLinks: [...prev.portfolioLinks, link] }));
      setTempLink("");
    }
  };

  const removeLink = (index) => {
    setFormData(prev => ({
      ...prev,
      portfolioLinks: prev.portfolioLinks.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.bid) return notify("Please provide a proposed rate.");
    
    // Validate if Milestones match the Total Bid
    if (milestoneTotal > 0 && milestoneTotal !== parseFloat(formData.bid)) {
      return notify(`Milestone total ($${milestoneTotal}) must match your bid ($${formData.bid})`);
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
    notify(`Application dispatched for ${job.title}!`);
    navigate('/');
  };

  if (!job) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="max-w-[1440px] mx-auto py-12 px-8"
    >
      {/* 1. HEADER */}
      <div className="flex items-center justify-between mb-16 border-b border-slate-50 pb-10">
        <div className="space-y-4">
          <button 
            onClick={() => navigate(-1)} 
            className="group flex items-center gap-3 text-slate-400 font-black uppercase text-[10px] tracking-[0.3em] hover:text-indigo-600 transition-all"
          >
            <ChevronLeft size={16} /> Exit Editor
          </button>
          <h1 className="text-6xl font-black tracking-tighter text-slate-900 leading-none italic">
            New Proposal<span className="text-indigo-600">.</span>
          </h1>
        </div>
        
        <div className="bg-slate-950 text-white p-6 rounded-[32px] flex items-center gap-6 shadow-2xl">
          <div className="flex flex-col">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Service Fee (10%)</span>
            <span className="text-lg font-black tracking-tight text-rose-400">-${serviceFee}</span>
          </div>
          <div className="w-[1px] h-10 bg-white/10"></div>
          <div className="flex flex-col">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">You'll Receive</span>
            <span className="text-2xl font-black tracking-tight text-emerald-400">${takeHome}</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-16">
        
        {/* LEFT: JOB SYNOPSIS */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-10 h-fit">
          <div className="bg-indigo-600 rounded-[48px] p-10 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 space-y-8">
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Responding to</p>
                <h3 className="text-3xl font-black tracking-tight italic leading-tight">{job.title}</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs font-bold bg-white/10 p-4 rounded-2xl border border-white/10">
                  <DollarSign size={16}/> Budget: {job.budget}
                </div>
                <div className="flex items-center gap-3 text-xs font-bold bg-white/10 p-4 rounded-2xl border border-white/10">
                  <Clock size={16}/> Est. {job.posted || '3 days ago'}
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <p className="text-sm font-medium leading-relaxed opacity-80 line-clamp-4">
                  {job.description}
                </p>
              </div>
            </div>
            <Zap className="absolute -bottom-10 -right-10 text-white opacity-10" size={200} />
          </div>

          {/* Pro Tip Card */}
          <div className={`rounded-[40px] p-8 space-y-4 shadow-sm border transition-all duration-500 ${hasKeywords ? 'bg-emerald-50 border-emerald-100' : 'bg-white border-slate-100'}`}>
            <div className="flex items-center gap-2">
               <Sparkles size={18} className={hasKeywords ? 'text-emerald-500' : 'text-indigo-600'} />
               <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Pro Tip</h4>
            </div>
            <p className="text-xs font-bold text-slate-600 leading-relaxed">
              Mentioning <span className="text-indigo-600">"Figma"</span> or <span className="text-indigo-600">"UX Strategy"</span> increases your hire probability by 40% for this client.
            </p>
          </div>
        </div>

        {/* RIGHT: PROPOSAL FORM */}
        <div className="lg:col-span-8">
          <form onSubmit={handleSubmit} className="space-y-12">
            
            <section className="bg-white border border-slate-100 rounded-[56px] p-12 shadow-sm space-y-12">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <label className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Proposed Quote</label>
                  <div className="relative group">
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 text-4xl font-black text-slate-200 group-focus-within:text-indigo-600 transition-all">$</span>
                    <input 
                      type="number" required
                      className="w-full bg-transparent border-b-2 border-slate-100 py-4 pl-10 text-4xl font-black outline-none focus:border-indigo-600 transition-all"
                      placeholder="0.00"
                      value={formData.bid}
                      onChange={(e) => setFormData({...formData, bid: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Est. Timeline</label>
                  <select 
                    className="w-full bg-slate-50 border-none rounded-2xl py-5 px-6 font-bold text-slate-700 outline-none focus:ring-4 focus:ring-indigo-50 transition-all cursor-pointer appearance-none"
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

              {/* MILESTONE PLANNER */}
              <div className="pt-10 border-t border-slate-50">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 italic">Payment Milestones</h3>
                  <button type="button" onClick={addMilestone} className="text-[10px] font-black text-indigo-600 uppercase flex items-center gap-2 hover:translate-x-1 transition-transform">
                    <Plus size={14}/> Add Phase
                  </button>
                </div>
                
                <div className="space-y-4">
                  {formData.milestones.map((m, idx) => (
                    <div key={m.id} className="grid grid-cols-12 gap-4 items-center bg-slate-50 p-4 rounded-3xl border border-slate-100">
                      <div className="col-span-1 text-center font-black text-slate-300">0{idx+1}</div>
                      <input 
                        className="col-span-7 bg-transparent border-none outline-none font-bold text-slate-600 text-sm" 
                        placeholder="Describe phase (e.g. UX Research)"
                        value={m.task}
                        onChange={(e) => handleMilestoneChange(m.id, 'task', e.target.value)}
                      />
                      <div className="col-span-3 relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400">$</span>
                        <input 
                          type="number"
                          className="w-full bg-white rounded-xl py-2 pl-6 pr-2 text-xs font-black outline-none shadow-sm" 
                          placeholder="Amount" 
                          value={m.amount}
                          onChange={(e) => handleMilestoneChange(m.id, 'amount', e.target.value)}
                        />
                      </div>
                      <button type="button" onClick={() => removeMilestone(m.id)} className="col-span-1 text-slate-300 hover:text-rose-500 flex justify-center"><X size={16}/></button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 2. COVER STRATEGY */}
            <section className="bg-white border border-slate-100 rounded-[56px] p-12 shadow-sm space-y-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                  <Target size={20} />
                </div>
                <h3 className="text-lg font-black tracking-tight uppercase italic text-slate-900">Project Strategy</h3>
              </div>
              <textarea 
                required
                className="w-full bg-slate-50 border-none rounded-[40px] p-10 min-h-[400px] text-lg font-medium text-slate-700 outline-none focus:bg-white focus:ring-[16px] focus:ring-indigo-50/50 transition-all leading-relaxed"
                placeholder="Explain your approach..."
                value={formData.coverLetter}
                onChange={(e) => setFormData({...formData, coverLetter: e.target.value})}
              />
            </section>

            {/* 3. ASSETS & LINKS */}
            <section className="bg-slate-950 rounded-[56px] p-12 text-white shadow-2xl space-y-12">
               <div className="flex flex-col md:flex-row justify-between md:items-end gap-6">
                 <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400">Asset Gallery</p>
                    <h3 className="text-3xl font-black tracking-tighter italic lowercase">Proof of Excellence</h3>
                 </div>
                 <div className="flex gap-2">
                    <input 
                      type="text"
                      className="bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm font-bold outline-none focus:border-indigo-500 transition-all flex-1 md:w-[300px]"
                      placeholder="Portfolio URL"
                      value={tempLink}
                      onChange={(e) => setTempLink(e.target.value)}
                    />
                    <button type="button" onClick={addLink} className="p-4 bg-white text-black rounded-2xl font-black hover:bg-indigo-600 hover:text-white transition-all">
                      <Plus size={24} />
                    </button>
                 </div>
               </div>

               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                 <AnimatePresence>
                   {formData.portfolioLinks.map((link, index) => (
                     <motion.div 
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                        key={index} 
                        className="bg-white/5 border border-white/10 p-6 rounded-3xl group relative hover:bg-white/10 transition-all overflow-hidden"
                     >
                        <LinkIcon className="text-indigo-400 mb-4" size={24} />
                        <p className="text-xs font-black uppercase tracking-widest truncate pr-6">{link.replace('https://', '')}</p>
                        <button type="button" onClick={() => removeLink(index)} className="absolute top-4 right-4 text-slate-500 hover:text-rose-400"><X size={16}/></button>
                     </motion.div>
                   ))}
                 </AnimatePresence>
               </div>
            </section>

            <button 
              type="submit"
              className="group relative w-full py-12 bg-indigo-600 rounded-[48px] font-black uppercase tracking-[0.6em] text-[10px] text-white shadow-2xl shadow-indigo-500/40 hover:bg-black transition-all active:scale-95"
            >
              Dispatch Proposal <ArrowRight size={18} className="inline-block ml-4 group-hover:translate-x-2 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}