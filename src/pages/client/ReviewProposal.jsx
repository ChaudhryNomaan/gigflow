import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, User, MessageSquare, 
  DollarSign, Clock, ExternalLink, 
  ShieldCheck, Zap, Mail, MoreHorizontal,
  Download, Star
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ReviewProposal({ proposals = [] }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Simulated data if not found for UI demo purposes, replace with your logic
  const proposal = proposals.find(p => String(p.id) === String(id)) || {
    freelancerName: "Alexander Vane",
    freelancerTitle: "Full Stack Systems Architect",
    freelancerRating: "4.9",
    coverLetter: "I've reviewed your mission brief. My team and I have built similar high-scale systems for FinTech startups. We can guarantee 99.9% uptime and a sleek UI/UX within your 4-week deadline.",
    bidAmount: "12,500",
    timeline: "25 Days",
    skills: ["React", "Node.js", "AWS", "WebSockets"],
    portfolioUrl: "#"
  };

  if (!proposal) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="w-12 h-12 bg-slate-200 rounded-full animate-pulse mx-auto mb-4" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Dossier Not Found</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8 lg:p-12 selection:bg-indigo-500 selection:text-white">
      
      {/* HEADER NAV */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-10">
        <button onClick={() => navigate(-1)} className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-all">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Proposals
        </button>
        <div className="flex gap-4">
          <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 transition-colors">
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: MAIN DOSSIER */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-8 space-y-8"
        >
          <div className="bg-white rounded-[48px] p-8 md:p-12 border border-slate-100 shadow-sm relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 blur-[80px] rounded-full -mr-20 -mt-20 pointer-events-none" />

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center gap-8 mb-12">
                <div className="relative">
                  <div className="w-24 h-24 bg-slate-900 rounded-[32px] flex items-center justify-center text-white overflow-hidden">
                     {/* Replace with actual image if available */}
                     <User size={40} className="opacity-20" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-emerald-500 p-2 rounded-xl border-4 border-white">
                    <ShieldCheck size={16} className="text-white" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-slate-900">{proposal.freelancerName}</h1>
                    <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      <span className="text-[10px] font-black text-amber-700">{proposal.freelancerRating}</span>
                    </div>
                  </div>
                  <p className="text-xs font-black text-indigo-500 uppercase tracking-widest">{proposal.freelancerTitle || "Elite Freelancer"}</p>
                </div>
              </div>

              <div className="space-y-10">
                <div className="bg-slate-50/50 p-8 rounded-[32px] border border-slate-100">
                  <div className="flex items-center gap-2 mb-6 text-slate-400 uppercase font-black text-[9px] tracking-widest">
                    <MessageSquare size={14} /> Mission Strategy
                  </div>
                  <p className="text-xl leading-relaxed text-slate-700 font-medium">
                    {proposal.coverLetter}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-8 border border-slate-100 rounded-[32px] space-y-4">
                     <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Technical Stack</p>
                     <div className="flex flex-wrap gap-2">
                       {proposal.skills.map(skill => (
                         <span key={skill} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 uppercase">
                           {skill}
                         </span>
                       ))}
                     </div>
                  </div>
                  <div className="p-8 border border-slate-100 rounded-[32px] flex flex-col justify-center space-y-2 group cursor-pointer hover:border-indigo-200 transition-colors">
                     <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Evidence of Work</p>
                     <div className="flex items-center justify-between">
                        <span className="text-sm font-black uppercase italic">View Portfolio</span>
                        <ExternalLink size={18} className="text-indigo-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT: ACTION SIDEBAR */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-4 space-y-6"
        >
          {/* BID CARD */}
          <div className="bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden group">
            <Zap className="absolute -right-8 -bottom-8 text-indigo-500/10 group-hover:scale-110 transition-transform" size={200} />
            
            <div className="relative z-10 space-y-8">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Proposed Bid</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black italic">${proposal.bidAmount}</span>
                  <span className="text-xs font-bold text-slate-500 uppercase">USD</span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="space-y-1">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1">
                    <Clock size={10} /> Timeline
                  </p>
                  <p className="text-lg font-black italic">{proposal.timeline}</p>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="space-y-1">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1">
                    <Download size={10} /> Attachments
                  </p>
                  <p className="text-lg font-black italic">02</p>
                </div>
              </div>

              <hr className="border-white/5" />

              <div className="space-y-3">
                <button className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[20px] font-black uppercase text-[11px] tracking-widest transition-all shadow-xl shadow-indigo-900/20 active:scale-95">
                  Accept Proposal
                </button>
                <button className="w-full py-5 bg-white/5 hover:bg-white/10 text-white rounded-[20px] font-black uppercase text-[11px] tracking-widest transition-all flex items-center justify-center gap-2">
                  <Mail size={16} /> Send Message
                </button>
              </div>
            </div>
          </div>

          {/* VERIFICATION CARD */}
          <div className="bg-white border border-slate-100 rounded-[40px] p-8 space-y-4">
            <div className="flex items-center gap-2 text-emerald-500">
               <ShieldCheck size={18} />
               <span className="text-[10px] font-black uppercase tracking-widest">Verified Identity</span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
              This freelancer has completed biometric verification and has a verified bank account in the United Kingdom.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}