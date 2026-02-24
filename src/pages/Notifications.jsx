import React from 'react';
import { Bell, Zap, DollarSign, UserPlus, Heart } from 'lucide-react';

const Notifications = () => {
  const alerts = [
    { id: 1, type: 'payment', title: 'Payment Received', desc: 'Marcus V. released $1,500 for Milestone 1', time: '2h ago', icon: <DollarSign size={18}/>, color: 'text-emerald-500 bg-emerald-50' },
    { id: 2, type: 'system', title: 'Proposal Viewed', desc: 'A client from Fintech Solutions viewed your bid.', time: '5h ago', icon: <Zap size={18}/>, color: 'text-indigo-500 bg-indigo-50' },
    { id: 3, type: 'hire', title: 'New Contract', desc: 'You have been invited to interview for "SaaS Dashboard Redesign"', time: '1d ago', icon: <UserPlus size={18}/>, color: 'text-amber-500 bg-amber-50' }
  ];

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-10">
      <div>
        <h1 className="text-4xl font-black uppercase tracking-tighter text-slate-900">Activity Center</h1>
        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] mt-2">Updates and alerts across your network</p>
      </div>

      <div className="grid gap-4">
        {alerts.map((a) => (
          <div key={a.id} className="bg-white border border-slate-100 p-6 rounded-[32px] flex items-center gap-6 hover:shadow-xl hover:shadow-slate-200/40 transition-all group cursor-pointer">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${a.color} transition-transform group-hover:scale-110`}>
              {a.icon}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <h4 className="font-black text-slate-900 tracking-tight">{a.title}</h4>
                <span className="text-[10px] font-bold text-slate-300 uppercase">{a.time}</span>
              </div>
              <p className="text-sm text-slate-500 font-medium leading-tight">{a.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;