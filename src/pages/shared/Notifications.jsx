import React, { useState } from 'react';
import { 
  Bell, Zap, DollarSign, UserPlus, Heart, 
  MoreHorizontal, CheckCheck, Trash2, Filter, 
  ArrowUpRight, Sparkles, ShieldCheck, Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Notifications = () => {
  const [filter, setFilter] = useState('all');
  
  const [alerts, setAlerts] = useState([
    { 
      id: 1, 
      type: 'payment', 
      title: 'Payment Received', 
      desc: 'Marcus Vane released $1,500.00 for Milestone 1: Branding Assets.', 
      time: '2h ago', 
      icon: <DollarSign size={22} strokeWidth={3}/>, 
      color: 'text-emerald-500 bg-emerald-50 border-emerald-100',
      unread: true 
    },
    { 
      id: 2, 
      type: 'system', 
      title: 'Mandate Review', 
      desc: 'A hiring lead from Fintech Solutions reviewed your "WebGL Engine" proposal.', 
      time: '5h ago', 
      icon: <Zap size={22} strokeWidth={3}/>, 
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
      unread: true 
    },
    { 
      id: 3, 
      type: 'hire', 
      title: 'Interview Invite', 
      desc: 'New briefing request from Sarah Chen for the "SaaS Dashboard" mission.', 
      time: '1d ago', 
      icon: <UserPlus size={22} strokeWidth={3}/>, 
      color: 'text-amber-600 bg-amber-50 border-amber-100',
      unread: false 
    },
    { 
      id: 4, 
      type: 'system', 
      title: 'Budget Escalation', 
      desc: 'Capital for "Brutal Fintech Overhaul" was increased by +$500.00.', 
      time: '2d ago', 
      icon: <Sparkles size={22} strokeWidth={3}/>, 
      color: 'text-rose-600 bg-rose-50 border-rose-100',
      unread: false 
    }
  ]);

  const markAllRead = () => {
    setAlerts(alerts.map(a => ({ ...a, unread: false })));
  };

  const deleteAlert = (id) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  const filteredAlerts = filter === 'all' ? alerts : alerts.filter(a => a.type === filter);

  return (
    <div className="max-w-5xl mx-auto py-16 px-6 lg:px-12 space-y-12 bg-[#FDFDFF] min-h-screen">
      
      {/* --- LOG HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b-4 border-slate-900 pb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-slate-900 italic leading-none">Activity</h1>
            <motion.div 
              animate={{ opacity: [1, 0.4, 1] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="bg-indigo-600 text-white px-4 py-1.5 rounded-xl text-[10px] font-black tracking-[0.2em]"
            >
              LIVE_FEED
            </motion.div>
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <ShieldCheck size={16} />
            <p className="font-black text-[11px] uppercase tracking-[0.3em]">Encrypted Network Logs • Liza_ID: 882-X</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={markAllRead}
            className="flex items-center gap-3 px-8 py-4 bg-white border-2 border-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-[8px_8px_0px_0px_rgba(15,23,42,0.1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            <CheckCheck size={16}/> Sync All
          </button>
          <button className="p-4 bg-slate-900 text-white rounded-2xl hover:bg-indigo-600 transition-all">
            <Filter size={20}/>
          </button>
        </div>
      </div>

      {/* --- FILTER INTERFACE --- */}
      <div className="flex flex-wrap gap-4">
        {['all', 'payment', 'system', 'hire'].map((cat) => (
          <button 
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all border-2 ${
              filter === cat 
                ? 'bg-indigo-600 border-indigo-600 text-white scale-105 shadow-xl shadow-indigo-200' 
                : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300'
            }`}
          >
            {cat === 'all' ? 'Universal' : cat}
          </button>
        ))}
      </div>

      {/* --- STREAM CONTENT --- */}
      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((a, index) => (
              <motion.div 
                key={a.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                className={`group relative bg-white border-2 ${
                  a.unread ? 'border-indigo-600 shadow-2xl shadow-indigo-500/10' : 'border-slate-100 shadow-sm'
                } p-8 md:p-10 rounded-[48px] flex flex-col md:flex-row items-center md:items-start gap-8 hover:border-slate-900 transition-all duration-300`}
              >
                {/* Visual Status */}
                {a.unread && (
                  <div className="absolute top-10 right-10 flex items-center gap-2">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full animate-ping" />
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">New Priority</span>
                  </div>
                )}
                
                {/* Heavy Icon Wrapper */}
                <div className={`w-20 h-20 rounded-[32px] flex-shrink-0 flex items-center justify-center border-2 ${a.color} transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6`}>
                  {a.icon}
                </div>

                {/* Text Information */}
                <div className="flex-1 text-center md:text-left space-y-3">
                  <div className="space-y-1">
                    <h4 className="font-black text-2xl md:text-3xl text-slate-900 tracking-tighter uppercase italic group-hover:text-indigo-600 transition-colors">
                      {a.title}
                    </h4>
                    <div className="flex items-center justify-center md:justify-start gap-3 text-slate-300">
                      <Clock size={12} />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">{a.time} • Transaction Verified</span>
                    </div>
                  </div>
                  <p className="text-slate-500 font-bold text-lg md:text-xl leading-snug max-w-2xl">
                    {a.desc}
                  </p>
                </div>

                {/* Contextual Actions */}
                <div className="flex md:flex-col gap-3 self-center md:self-stretch justify-center border-l border-slate-50 md:pl-8">
                  <button className="p-4 bg-slate-50 hover:bg-slate-900 hover:text-white rounded-2xl text-slate-400 transition-all group/btn">
                    <ArrowUpRight size={22} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform"/>
                  </button>
                  <button 
                    onClick={() => deleteAlert(a.id)}
                    className="p-4 bg-slate-50 hover:bg-rose-600 hover:text-white rounded-2xl text-slate-400 transition-all"
                  >
                    <Trash2 size={22}/>
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="py-32 text-center border-2 border-dashed border-slate-100 rounded-[56px]"
            >
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
                <Bell size={40} />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-300 italic">Clear Skies</h3>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-200 mt-2">No active signals in this frequency</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- SYSTEM TELEMETRY --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
        <StatusCard label="Sync Strength" value="99.2%" />
        <StatusCard label="Active Sessions" value="04" />
        <StatusCard label="Signal Latency" value="12ms" />
      </div>
    </div>
  );
};

// HELPER COMPONENT
const StatusCard = ({ label, value }) => (
  <div className="bg-white border border-slate-100 p-8 rounded-[32px] text-center space-y-1 shadow-sm">
    <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em]">{label}</p>
    <p className="text-3xl font-black text-slate-900 tracking-tighter">{value}</p>
  </div>
);

export default Notifications;