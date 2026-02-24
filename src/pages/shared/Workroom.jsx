import React, { useState } from 'react';
import { 
  CheckCircle2, Clock, FileText, ChevronRight, 
  PlayCircle, Plus, Timer, Paperclip, MoreHorizontal,
  PauseCircle, AlertCircle
} from 'lucide-react';

const Workroom = ({ role }) => {
  const [isClockedIn, setIsClockedIn] = useState(false);
  
  const milestones = [
    { id: 1, title: "UI/UX Research & Moodboards", status: "Completed", date: "Feb 12", amount: "$1,200", description: "Market analysis and visual direction." },
    { id: 2, title: "High Fidelity Wireframes", status: "In Progress", date: "Feb 28", amount: "$2,000", description: "Core user flows and structural design." },
    { id: 3, title: "Interactive Prototype", status: "Pending", date: "Mar 15", amount: "$1,300", description: "Final testing and handoff." }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 border-b border-slate-100 pb-12">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Active Contract
          </div>
          <h1 className="text-6xl font-black uppercase tracking-tighter text-slate-900 leading-none">
            Fintech App Redesign
          </h1>
          <div className="flex items-center gap-4 mt-6">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-indigo-600 border-2 border-white flex items-center justify-center text-[10px] font-black text-white">L</div>
              <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center text-[10px] font-black text-white">MV</div>
            </div>
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">
              Liza Studio <span className="mx-2 text-slate-200">/</span> <span className="text-slate-900 italic">Marcus Vane</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {role === 'freelancer' && (
            <button 
              onClick={() => setIsClockedIn(!isClockedIn)}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all ${
                isClockedIn ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-slate-900 text-white'
              }`}
            >
              {isClockedIn ? <><PauseCircle size={16}/> Stop Timer</> : <><PlayCircle size={16}/> Clock In</>}
            </button>
          )}
          <button className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
            {role === 'client' ? 'Release Payment' : 'Submit Work'}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        
        {/* LEFT COLUMN: MILESTONES & FILES */}
        <div className="lg:col-span-2 space-y-10">
          
          <section>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Project Milestones</h3>
              <div className="h-[1px] flex-1 mx-6 bg-slate-100"></div>
            </div>
            
            <div className="space-y-4">
              {milestones.map((m) => (
                <div key={m.id} className="bg-white border border-slate-100 p-8 rounded-[40px] flex flex-col md:flex-row items-center justify-between group hover:shadow-xl hover:shadow-slate-200/50 transition-all">
                  <div className="flex items-center gap-6">
                    <div className={`w-14 h-14 rounded-[20px] flex items-center justify-center transition-colors ${
                      m.status === 'Completed' ? 'bg-emerald-50 text-emerald-500' : 
                      m.status === 'In Progress' ? 'bg-indigo-50 text-indigo-500' : 
                      'bg-slate-50 text-slate-300'
                    }`}>
                      {m.status === 'Completed' ? <CheckCircle2 size={28}/> : <Clock size={28}/>}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-xl tracking-tight uppercase italic">{m.title}</h4>
                      <p className="text-slate-400 text-sm mt-1">{m.description}</p>
                    </div>
                  </div>
                  <div className="mt-6 md:mt-0 text-right">
                    <span className="block font-black text-slate-900 text-lg italic">{m.amount}</span>
                    <span className={`text-[9px] font-black uppercase tracking-widest ${
                       m.status === 'Completed' ? 'text-emerald-500' : 'text-slate-400'
                    }`}>{m.status} • {m.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ASSETS SECTION */}
          <section>
             <div className="flex items-center justify-between mb-8">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Shared Assets</h3>
              <button className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest">
                <Plus size={14}/> Upload
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {[1,2,3].map(i => (
                 <div key={i} className="bg-slate-50 border-2 border-dashed border-slate-200 p-6 rounded-3xl flex flex-col items-center justify-center group hover:bg-white hover:border-indigo-200 transition-all cursor-pointer">
                    <FileText size={24} className="text-slate-300 group-hover:text-indigo-500 mb-2"/>
                    <span className="text-[9px] font-black text-slate-400 uppercase">Asset_0{i}.fig</span>
                 </div>
               ))}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: STATS CARDS */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-[48px] p-10 text-white relative overflow-hidden shadow-2xl">
            {/* Background Accent */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 space-y-8">
              <div className="space-y-2">
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Escrow Balance</p>
                <p className="text-5xl font-black tracking-tighter italic">$4,500.00</p>
              </div>

              <div className="space-y-4 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Timer size={14}/>
                    <span className="text-[10px] font-black uppercase tracking-widest">Total Tracked</span>
                  </div>
                  <span className="font-black text-sm">42.5 hrs</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Paperclip size={14}/>
                    <span className="text-[10px] font-black uppercase tracking-widest">Resources</span>
                  </div>
                  <span className="font-black text-sm">12 Files</span>
                </div>
              </div>

              <button className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-900/40">
                View Invoices
              </button>
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-[40px] p-8 space-y-6">
             <div className="flex items-center gap-2 text-amber-500">
                <AlertCircle size={18}/>
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Next Deadline</span>
             </div>
             <div>
               <p className="text-2xl font-black text-slate-900 uppercase italic leading-tight">Feb 28</p>
               <p className="text-slate-400 text-xs font-medium mt-1">High Fidelity Wireframes delivery</p>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Workroom;