import React from 'react';
import { 
  DollarSign, Clock, Briefcase, 
  ArrowUpRight, MessageSquare, Star,
  Zap, ChevronRight, TrendingUp, Users, Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';

const FreelancerDashboard = ({ profile }) => {
  const activeProjects = [
    { id: 1, title: "Fintech App UI", client: "Aura Pay", deadline: "In 3 days", progress: 75, budget: "$2,400" },
    { id: 2, title: "Design System", client: "Nexus Labs", deadline: "Next week", progress: 30, budget: "$4,800" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      // px-8 provides that consistent side spacing you're looking for
      className="space-y-12 max-w-[1440px] mx-auto py-12 px-8"
    >
      {/* 1. ELITE STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div variants={itemVariants} className="bg-slate-950 text-white p-8 rounded-[40px] flex flex-col justify-between h-56 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
            <TrendingUp size={80} />
          </div>
          <div className="flex justify-between items-start relative z-10">
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md"><DollarSign size={20} className="text-emerald-400" /></div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Net Liquidity</span>
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl font-black tracking-tighter">$4,250.00</h2>
            <div className="flex items-center gap-2 mt-2">
               <span className="text-[9px] font-black bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-lg">+12% vs last month</span>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white border border-slate-100 p-8 rounded-[40px] flex flex-col justify-between h-56 shadow-sm hover:shadow-xl transition-all">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl"><Clock size={20}/></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Escrow Held</span>
          </div>
          <div>
            <h2 className="text-4xl font-black tracking-tighter text-slate-900">$1,800</h2>
            <p className="text-slate-400 text-[10px] font-bold uppercase mt-1 tracking-widest">Awaiting Verification</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white border border-slate-100 p-8 rounded-[40px] flex flex-col justify-between h-56 shadow-sm">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl"><Star size={20} fill="currentColor"/></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Reputation</span>
          </div>
          <div>
            <h2 className="text-4xl font-black tracking-tighter text-slate-900">4.98</h2>
            <p className="text-slate-400 text-[10px] font-bold uppercase mt-1">From 42 Completed Missions</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-indigo-600 p-8 rounded-[40px] flex flex-col justify-between h-56 shadow-xl shadow-indigo-100 group cursor-pointer overflow-hidden relative">
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
          <div className="flex justify-between items-start relative z-10">
            <div className="p-3 bg-white/20 text-white rounded-2xl"><Users size={20}/></div>
            <Zap size={20} className="text-white fill-white animate-pulse" />
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl font-black tracking-tight text-white leading-tight">3 Pending<br/>Invitations.</h2>
            <div className="flex items-center gap-1 text-[10px] font-black uppercase text-indigo-200 mt-2">
              Action Required <ChevronRight size={12} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <div className="grid lg:grid-cols-12 gap-12">
        {/* ACTIVE WORKROOMS (LEFT) */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex justify-between items-end px-2">
            <div>
              <h3 className="text-4xl font-black tracking-tighter italic text-slate-900">Active Briefings.</h3>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">You have {activeProjects.length} priority projects in flight</p>
            </div>
            <button className="text-[10px] font-black uppercase text-indigo-600 hover:text-white hover:bg-indigo-600 transition-all border border-indigo-100 px-5 py-2.5 rounded-2xl">
              History
            </button>
          </div>
          
          <div className="space-y-6">
            {activeProjects.map(project => (
              <motion.div 
                key={project.id} 
                whileHover={{ y: -8 }}
                className="bg-white border border-slate-100 p-10 rounded-[56px] hover:shadow-2xl hover:shadow-indigo-500/5 transition-all group flex flex-col md:flex-row items-center gap-10"
              >
                <div className="flex-1 space-y-6 w-full">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-slate-900 rounded-[24px] flex items-center justify-center text-white font-black text-2xl shadow-xl">
                      {project.client.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight italic leading-none">{project.title}</h4>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2 flex items-center gap-2">
                        {project.client} <span className="w-1 h-1 bg-indigo-200 rounded-full" /> {project.budget}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em]">
                      <span className="text-slate-400">Milestone Progress</span>
                      <span className="text-indigo-600">{project.progress}%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-50 rounded-full overflow-hidden border border-slate-100 p-0.5">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 1.2, ease: "circOut" }}
                        className="h-full bg-indigo-600 rounded-full shadow-lg shadow-indigo-200" 
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 w-full md:w-56">
                  <div className="bg-slate-50 rounded-3xl p-5 text-center border border-slate-100">
                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] mb-1">Deadline</p>
                    <p className="text-sm font-black text-slate-900 flex items-center justify-center gap-2 uppercase italic">
                       {project.deadline}
                    </p>
                  </div>
                  <button className="w-full py-5 bg-slate-950 text-white rounded-3xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-600 transition-all shadow-xl active:scale-95">
                    Enter Workroom
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 3. SIDEBAR (RIGHT) */}
        <div className="lg:col-span-4 space-y-10">
          <div className="bg-white border border-slate-100 rounded-[56px] p-10 space-y-10 shadow-sm">
            <div className="flex justify-between items-center">
               <h3 className="text-xl font-black italic tracking-tighter uppercase">Intelligence.</h3>
               <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                 <MessageSquare size={20} />
               </div>
            </div>

            <div className="space-y-8">
              {[
                { name: "Sarah Connor", time: "12m ago", text: "Is the Figma updated with the feedback?", unread: true },
                { name: "Nexus Labs", time: "1h ago", text: "Approved the research stage! Payment sent.", unread: false }
              ].map((msg, i) => (
                <div key={i} className="flex gap-4 group cursor-pointer items-start">
                  <div className="relative shrink-0">
                    <div className="w-14 h-14 bg-slate-50 rounded-[22px] border border-slate-100 flex items-center justify-center text-sm font-black shadow-sm group-hover:border-indigo-600 transition-colors uppercase">
                      {msg.name.charAt(0)}
                    </div>
                    {msg.unread && <div className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full border-4 border-white shadow-sm" />}
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex justify-between items-center">
                      <p className="text-[11px] font-black uppercase tracking-tight text-slate-900">{msg.name}</p>
                      <span className="text-[8px] font-bold text-slate-400 uppercase">{msg.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-1 leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full py-5 bg-slate-50 text-slate-500 rounded-3xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-600 hover:text-white transition-all">
              Go to Inbox
            </button>
          </div>

          {/* ACTIVE PROPOSALS CARD */}
          <div className="bg-slate-950 rounded-[56px] p-10 text-white shadow-2xl relative overflow-hidden">
            <Zap className="absolute -bottom-10 -right-10 text-white opacity-5" size={180} />
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-8 flex items-center gap-2">
              Live Proposals
            </h3>
            <div className="space-y-4 relative z-10">
              <div className="p-5 bg-white/5 border border-white/10 rounded-3xl flex justify-between items-center group cursor-pointer hover:bg-white/10 transition-all">
                <div>
                  <p className="text-sm font-black italic tracking-tight">E-commerce Rebrand</p>
                  <p className="text-[9px] font-bold text-indigo-300 uppercase mt-1 tracking-widest">Under Review</p>
                </div>
                <ArrowUpRight size={16} className="text-white/30 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FreelancerDashboard;