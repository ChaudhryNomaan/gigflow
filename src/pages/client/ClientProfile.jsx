import React, { useState } from 'react';
import { 
  Building2, ShieldCheck, Edit3, Save, 
  CreditCard, Activity, Fingerprint, Rocket, 
  BarChart3, Globe2, Lock, 
  ShieldAlert, Key, Eye, EyeOff, Download, 
  ArrowDownLeft, ArrowUpRight as ArrowUp,
  CheckCircle2, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ClientProfile = ({ profile, setProfile, jobs = [] }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  const [activeTab, setActiveTab] = useState('overview');
  const [showSensitive, setShowSensitive] = useState(false);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const tabs = [
    { id: 'overview', label: 'Intelligence', icon: Activity },
    { id: 'security', label: 'Vault', icon: Fingerprint },
    { id: 'billing', label: 'Treasury', icon: CreditCard },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12 space-y-6 md:space-y-10 selection:bg-indigo-500 selection:text-white overflow-hidden">
      <style>{`
        @keyframes scan {
          0%, 100% { top: 0%; opacity: 0; }
          50% { top: 100%; opacity: 1; }
        }
        .animate-scan { animation: scan 3s ease-in-out infinite; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* --- ELITE HEADER --- */}
      <motion.div 
        layout
        className="relative min-h-[300px] md:min-h-[380px] bg-slate-900 rounded-[32px] md:rounded-[64px] p-6 md:p-16 overflow-hidden shadow-2xl flex items-end border border-white/5"
      >
        <div className="absolute top-[-20%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-indigo-600/20 blur-[100px] md:blur-[140px] rounded-full animate-pulse pointer-events-none" />
        
        <div className="relative z-10 w-full flex flex-col lg:flex-row justify-between items-center lg:items-end gap-8 md:gap-12">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-end w-full lg:w-auto text-center md:text-left">
            
            {/* AVATAR */}
            <div className="relative group shrink-0">
              <div className="absolute -inset-3 bg-gradient-to-tr from-indigo-500 to-fuchsia-500 rounded-[40px] md:rounded-[60px] blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="w-32 h-32 md:w-44 h-44 bg-white/5 backdrop-blur-2xl rounded-[32px] md:rounded-[52px] p-1 relative z-10 border border-white/10 flex items-center justify-center overflow-hidden shadow-inner">
                <span className="text-6xl md:text-8xl font-black italic tracking-tighter text-white drop-shadow-2xl">
                  {profile?.name ? profile.name[0] : 'U'}
                </span>
                <div className="absolute top-0 left-0 w-full h-[2px] bg-indigo-400/50 blur-sm animate-scan" />
              </div>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 bg-emerald-500 p-2 md:p-3 rounded-xl md:rounded-2xl border-[4px] md:border-[6px] border-slate-900 shadow-2xl z-20">
                <ShieldCheck size={20} className="text-white" />
              </motion.div>
            </div>

            <div className="space-y-4 md:space-y-6 flex-1 min-w-0">
              <div className="inline-flex items-center gap-3 bg-indigo-500/10 backdrop-blur-md border border-indigo-500/20 px-4 py-1.5 rounded-full">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300">Titanium Clearance</span>
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white uppercase italic leading-[0.85] break-words">
                {isEditing ? (
                  <input 
                    className="bg-transparent border-b-2 border-indigo-500 outline-none w-full text-white"
                    value={editedProfile.name}
                    onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                  />
                ) : (
                  <>{profile.name}<span className="text-indigo-500">.</span></>
                )}
              </h1>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-8 opacity-60">
                <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white shrink-0"><Building2 size={14}/> {profile.companyName}</span>
                <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white shrink-0"><Globe2 size={14}/> {profile.location}</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="w-full lg:w-auto bg-white text-slate-900 px-8 py-4 md:px-10 md:py-5 rounded-2xl md:rounded-[24px] font-black text-[10px] md:text-[11px] uppercase tracking-[0.2em] hover:bg-indigo-500 hover:text-white transition-all flex items-center justify-center gap-3"
          >
            {isEditing ? <><Save size={18}/> Commit changes</> : <><Edit3 size={18}/> Edit Profile</>}
          </button>
        </div>
      </motion.div>

      {/* --- MAIN GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-start">
        
        {/* SIDEBAR */}
        <div className="lg:col-span-3 space-y-6">
          <nav className="bg-white rounded-[24px] md:rounded-[40px] p-2 md:p-3 shadow-xl shadow-slate-200/50 border border-slate-100 flex lg:flex-col overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 lg:flex-none flex items-center justify-between px-4 md:px-6 py-4 md:py-5 rounded-xl md:rounded-[30px] transition-all whitespace-nowrap ${
                  activeTab === tab.id ? 'bg-slate-900 text-white' : 'text-slate-400 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3 md:gap-4 mx-auto lg:mx-0">
                  <tab.icon size={18} />
                  <span className="text-[9px] md:text-[11px] font-black uppercase tracking-widest">{tab.label}</span>
                </div>
                {activeTab === tab.id && <div className="hidden lg:block w-1.5 h-1.5 bg-indigo-500 rounded-full" />}
              </button>
            ))}
          </nav>

          <div className="hidden lg:block bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[40px] p-8 text-white relative overflow-hidden group">
             <Rocket className="absolute -right-4 -bottom-4 opacity-20 group-hover:scale-110 transition-transform" size={140} />
             <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Global Influence</p>
             <h3 className="text-3xl font-black italic mt-2">Elite Tier</h3>
             <div className="mt-8 flex items-center gap-2 text-[10px] font-bold uppercase bg-black/20 w-fit px-3 py-1 rounded-full">Level 42 Member</div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="lg:col-span-9 min-w-0">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6 md:space-y-10">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                  {[{ l: 'Efficiency', v: '98%', i: BarChart3 }, { l: 'Network', v: 'Active', i: Globe2 }, { l: 'Priority', v: 'Ultra', i: Zap }].map((s, i) => (
                    <div key={i} className="bg-white p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-slate-100 shadow-sm">
                      <s.i className="text-indigo-500 mb-4" size={24} />
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{s.l}</p>
                      <p className="text-3xl md:text-4xl font-black italic text-slate-900">{s.v}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-[32px] md:rounded-[48px] p-10 border border-slate-100 shadow-sm h-64 md:h-80 flex flex-col items-center justify-center text-center space-y-4">
                   <Activity size={48} className="text-slate-100" />
                   <p className="text-slate-300 font-black uppercase tracking-[0.4em] text-[10px] italic">Intelligence Feed Active</p>
                </div>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div key="vault" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="space-y-6 md:space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="bg-slate-900 text-white rounded-[32px] md:rounded-[48px] p-8 md:p-10 space-y-8">
                    <div className="flex justify-between items-start">
                      <div className="p-3 bg-indigo-500 rounded-2xl"><ShieldAlert size={24} /></div>
                      <div className="text-right">
                        <p className="text-[9px] font-black uppercase tracking-widest opacity-40">Status</p>
                        <p className="text-xl font-black text-emerald-400">OPTIMIZED</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {['End-to-End Encryption', 'Hardware 2FA', 'Biometric Gate'].map(p => (
                        <div key={p} className="flex items-center gap-3 text-xs font-black italic uppercase tracking-tight">
                          <CheckCircle2 size={14} className="text-indigo-500" /> {p}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white border border-slate-100 rounded-[32px] md:rounded-[48px] p-8 md:p-10 space-y-6">
                    <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-900">Encrypted Keys</h3>
                    <div className="space-y-3">
                      {[1, 2].map(i => (
                        <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <div className="min-w-0">
                            <p className="text-[9px] font-black uppercase text-slate-900 truncate">API_KEY_{i}</p>
                            <p className="text-[10px] font-mono text-slate-400 truncate">{showSensitive ? '7f8e-921a-bc34-xx92' : '••••-••••-••••'}</p>
                          </div>
                          <button onClick={() => setShowSensitive(!showSensitive)} className="ml-2 text-slate-400 hover:text-slate-900 transition-colors shrink-0">
                            {showSensitive ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'billing' && (
              <motion.div key="treasury" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6 md:space-y-10">
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 md:gap-8">
                  <div className="xl:col-span-8 bg-white border border-slate-100 rounded-[32px] md:rounded-[48px] p-6 md:p-10 shadow-sm space-y-6 md:space-y-8">
                    <div className="flex justify-between items-center">
                      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">Capital Ledger</h3>
                      <button className="p-2 bg-slate-50 rounded-lg text-slate-400"><Download size={18} /></button>
                    </div>
                    <div className="space-y-3">
                      {[
                        { label: 'Cloud Infrastructure', amt: '-$12,400', type: 'out' },
                        { label: 'Treasury Refill', amt: '+$50,000', type: 'in' },
                      ].map((t, i) => (
                        <div key={i} className="flex items-center justify-between p-4 md:p-6 bg-slate-50/50 rounded-2xl md:rounded-[32px]">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${t.type === 'in' ? 'bg-emerald-50 text-emerald-600' : 'bg-white text-slate-600 border border-slate-100'}`}>
                              {t.type === 'in' ? <ArrowDownLeft size={18} /> : <ArrowUp size={18} />}
                            </div>
                            <div className="min-w-0">
                              <p className="text-[10px] md:text-xs font-black italic uppercase text-slate-900 truncate">{t.label}</p>
                              <p className="text-[8px] font-bold text-slate-400 uppercase">Feb 24, 2026</p>
                            </div>
                          </div>
                          <p className={`text-sm md:text-lg font-black italic ${t.type === 'in' ? 'text-emerald-500' : 'text-slate-900'}`}>{t.amt}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="xl:col-span-4 bg-slate-900 rounded-[32px] md:rounded-[40px] p-8 text-white h-fit">
                    <p className="text-[9px] font-black uppercase tracking-widest opacity-40 mb-6">Tax Profile</p>
                    <div className="space-y-4">
                      <div className="flex justify-between gap-4"><span className="text-[10px] text-slate-400 uppercase">Entity</span><span className="text-[10px] font-black text-right italic uppercase">Liza Design Ltd</span></div>
                      <div className="flex justify-between gap-4"><span className="text-[10px] text-slate-400 uppercase">VAT</span><span className="text-emerald-400 text-[10px] font-black uppercase">Verified</span></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;