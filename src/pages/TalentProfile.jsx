import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShieldCheck, MessageSquare, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const TalentProfile = ({ talents = [], notify }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the talent by ID
  const talent = talents.find(t => String(t.id) === String(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Handler for Messaging
  const handleMessage = () => {
    navigate('/messages');
  };

  // UPDATED: Handler for Interview Request using Toast
  const handleInterviewRequest = () => {
    // 1. Trigger the global notification Liza
    notify(`Success: Interview request sent to ${talent.name}!`);
    
    // 2. Short delay for the user to see the toast before navigating
    setTimeout(() => {
      navigate('/workroom');
    }, 1000);
  };

  if (!talent) {
    return (
      <div className="h-96 flex flex-col items-center justify-center text-center animate-in fade-in duration-700">
        <p className="text-slate-400 font-black uppercase tracking-widest text-xs mb-4">Profile Missing</p>
        <button onClick={() => navigate('/explore')} className="text-indigo-600 font-bold underline italic uppercase tracking-tighter">Return to Discovery</button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      {/* BACK BUTTON */}
      <motion.button 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-black mb-12 transition-colors"
      >
        <ArrowLeft size={14} /> Back to Discovery
      </motion.button>

      <div className="grid lg:grid-cols-3 gap-16">
        
        {/* Profile Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 space-y-12"
        >
          <div className="space-y-6">
            <div className="w-20 h-20 bg-slate-900 rounded-[24px] flex items-center justify-center text-white text-2xl font-black shadow-xl shadow-slate-200">
              {talent.avatar}
            </div>
            
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-6xl font-medium tracking-tighter text-slate-900 italic">
                  {talent.name}
                </h1>
                <CheckCircle2 className="text-indigo-600" size={24} />
              </div>
              <p className="text-sm font-black uppercase tracking-[0.3em] text-indigo-600 italic">{talent.role}</p>
            </div>
            
            <p className="text-2xl text-slate-500 font-medium leading-relaxed max-w-xl">
              {talent.bio}
            </p>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-2 gap-4">
             <div className="aspect-video bg-slate-100 rounded-[32px] border border-slate-50 hover:border-indigo-100 transition-colors cursor-crosshair" />
             <div className="aspect-video bg-slate-100 rounded-[32px] border border-slate-50 hover:border-indigo-100 transition-colors cursor-crosshair" />
          </div>

          <div className="flex flex-wrap gap-2 pt-6">
            {talent.tags.map(tag => (
              <span key={tag} className="px-4 py-2 bg-white border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Action Sidebar */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm sticky top-32">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 italic">Investment</p>
            <div className="mb-10">
              <span className="text-5xl font-black tracking-tighter text-slate-900">{talent.rate}</span>
              <span className="text-slate-300 text-xl font-bold">/hr</span>
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={handleInterviewRequest}
                className="w-full py-5 bg-slate-900 text-white rounded-[20px] font-black uppercase text-[10px] tracking-[0.2em] hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-100 active:scale-95"
              >
                Request Interview
              </button>
              
              <button 
                onClick={handleMessage}
                className="w-full py-5 bg-white border border-slate-100 text-slate-900 rounded-[20px] font-black uppercase text-[10px] tracking-[0.2em] hover:bg-slate-50 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <MessageSquare size={14} /> Send Message
              </button>
            </div>

            <div className="mt-10 pt-8 border-t border-slate-50 space-y-4">
               <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <ShieldCheck size={16} className="text-emerald-500" /> Identity Verified
               </div>
               <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <Star size={16} className="text-amber-400" fill="currentColor" /> 5.0 Rating
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TalentProfile;