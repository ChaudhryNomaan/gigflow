import React from 'react';
import { CheckCircle2, Clock, FileText, ChevronRight, PlayCircle, Plus } from 'lucide-react';

const Workroom = () => {
  const milestones = [
    { id: 1, title: "UI/UX Research & Moodboards", status: "Completed", date: "Feb 12", amount: "$1,200" },
    { id: 2, title: "High Fidelity Wireframes", status: "In Progress", date: "Feb 28", amount: "$2,000" },
    { id: 3, title: "Interactive Prototype", status: "Pending", date: "Mar 15", amount: "$1,300" }
  ];

  return (
    <div className="max-w-6xl mx-auto py-10 space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-4">
            <PlayCircle size={12} fill="currentColor"/> Active Contract
          </div>
          <h1 className="text-5xl font-black uppercase tracking-tighter text-slate-900 leading-none">Fintech App Redesign</h1>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-4">Working with <span className="text-indigo-600 underline">Marcus V.</span></p>
        </div>
        <button className="bg-black text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-100">
          Submit Work
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Project Milestones</h3>
          {milestones.map((m) => (
            <div key={m.id} className="bg-white border border-slate-100 p-8 rounded-[32px] flex items-center justify-between group hover:border-indigo-100 transition-all">
              <div className="flex items-center gap-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${m.status === 'Completed' ? 'bg-emerald-50 text-emerald-500' : m.status === 'In Progress' ? 'bg-indigo-50 text-indigo-500' : 'bg-slate-50 text-slate-300'}`}>
                  {m.status === 'Completed' ? <CheckCircle2 size={24}/> : <Clock size={24}/>}
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-lg tracking-tight">{m.title}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{m.status} • Due {m.date}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="block font-black text-slate-900">{m.amount}</span>
                <button className="text-[9px] font-black text-indigo-600 uppercase tracking-tighter hover:underline">View Details</button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Quick Resources</h3>
          <div className="bg-slate-900 rounded-[40px] p-8 text-white space-y-6 shadow-2xl">
            <div className="space-y-2">
              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Total Earnings</p>
              <p className="text-4xl font-black tracking-tighter">$4,500.00</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-bold border-b border-slate-800 pb-4">
                <span className="text-slate-400">Time Tracked</span>
                <span>42.5 hrs</span>
              </div>
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-400">Files Shared</span>
                <span>12 Assets</span>
              </div>
            </div>
            <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
              Contract Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workroom;