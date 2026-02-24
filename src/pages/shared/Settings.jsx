import React, { useState } from 'react';
import { 
  User, Bell, Shield, CreditCard, Save, 
  Camera, Eye, EyeOff, Globe, Link as LinkIcon, 
  CheckCircle2, AlertCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  const [showPass, setShowPass] = useState(false);

  const tabs = [
    { name: 'Profile', icon: <User size={18}/> },
    { name: 'Notifications', icon: <Bell size={18}/> },
    { name: 'Security', icon: <Shield size={18}/> },
    { name: 'Billing', icon: <CreditCard size={18}/> }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Notifications':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div>
              <h3 className="text-3xl font-black tracking-tighter uppercase italic mb-2">Signal Preferences</h3>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Configure how the network reaches you.</p>
            </div>
            
            <div className="space-y-3">
              {[
                { label: 'Push Notifications', desc: 'Real-time desktop and mobile alerts' },
                { label: 'Email Briefings', desc: 'Daily summary of activity and bids' },
                { label: 'SMS Alerts', desc: 'Critical payment and contract updates' }
              ].map(item => (
                <div key={item.label} className="group flex justify-between items-center p-6 bg-slate-50 rounded-[24px] border border-transparent hover:border-slate-200 transition-all">
                  <div>
                    <span className="block font-black text-slate-900 uppercase text-xs tracking-wider">{item.label}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{item.desc}</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-12 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 'Security':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-3xl font-black tracking-tighter uppercase italic mb-2">Vault Access</h3>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Manage credentials and authentication.</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-black uppercase text-emerald-500 bg-emerald-50 px-3 py-1 rounded-lg">Security: High</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-6 bg-slate-900 rounded-[32px] text-white flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-2xl"><Shield className="text-indigo-400" /></div>
                  <div>
                    <p className="font-black text-xs uppercase tracking-widest">Two-Factor Auth</p>
                    <p className="text-[10px] text-slate-400 font-bold">Enabled via Authenticator App</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase transition-all">Configure</button>
              </div>

              <div className="grid gap-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Update Password</label>
                <div className="relative">
                  <input 
                    type={showPass ? "text" : "password"} 
                    className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl font-bold focus:border-indigo-600 transition-all outline-none" 
                    placeholder="••••••••••••" 
                  />
                  <button onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600">
                    {showPass ? <EyeOff size={18}/> : <Eye size={18}/>}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 'Billing':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <h3 className="text-3xl font-black tracking-tighter uppercase italic">Capital Flow</h3>
            
            <div className="grid gap-6">
              <div className="p-8 border-2 border-slate-100 rounded-[40px] flex items-center justify-between group hover:border-indigo-100 transition-all">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold italic">VISA</div>
                  <div>
                    <p className="font-black text-slate-900">•••• 4242</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Expires 12/28</p>
                  </div>
                </div>
                <button className="text-rose-500 font-black text-[10px] uppercase opacity-0 group-hover:opacity-100 transition-opacity">Remove</button>
              </div>

              <button className="w-full p-8 border-2 border-dashed border-slate-200 rounded-[40px] text-slate-400 font-black uppercase tracking-[0.3em] text-[10px] hover:border-indigo-600 hover:text-indigo-600 transition-all">
                + Add New Payment Method
              </button>
            </div>
          </motion.div>
        );
      default:
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
            {/* Avatar Section */}
            <div className="flex flex-col md:flex-row items-center gap-8 pb-10 border-b border-slate-50">
              <div className="relative group">
                <div className="w-32 h-32 bg-slate-900 rounded-[40px] flex items-center justify-center text-white text-4xl font-black italic overflow-hidden">
                  L
                </div>
                <button className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-3 rounded-2xl shadow-xl hover:scale-110 transition-all border-4 border-white">
                  <Camera size={18}/>
                </button>
              </div>
              <div className="text-center md:text-left space-y-2">
                <h4 className="text-2xl font-black uppercase tracking-tighter italic">Liza M.</h4>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-slate-100 text-[9px] font-black uppercase tracking-widest rounded-lg">Pro Account</span>
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[9px] font-black uppercase tracking-widest rounded-lg flex items-center gap-1">
                    <CheckCircle2 size={10}/> Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2"><User size={12}/> display_name</label>
                <input className="w-full bg-slate-50 border-2 border-transparent p-5 rounded-2xl font-bold focus:bg-white focus:border-indigo-600 transition-all outline-none" defaultValue="Liza M." />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2"><Globe size={12}/> location</label>
                <input className="w-full bg-slate-50 border-2 border-transparent p-5 rounded-2xl font-bold focus:bg-white focus:border-indigo-600 transition-all outline-none" defaultValue="London, UK" />
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2"><LinkIcon size={12}/> portfolio_url</label>
              <input className="w-full bg-slate-50 border-2 border-transparent p-5 rounded-2xl font-bold focus:bg-white focus:border-indigo-600 transition-all outline-none" defaultValue="https://liza.design" />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Bio_Manifesto</label>
              <textarea className="w-full bg-slate-50 border-2 border-transparent p-5 rounded-[32px] font-bold h-40 focus:bg-white focus:border-indigo-600 transition-all outline-none" defaultValue="Brutalist Designer & React Enthusiast. Building the future of fintech dashboards." />
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-16 px-6 lg:px-12 min-h-screen">
      <header className="mb-16">
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-slate-900 italic leading-none">Settings</h1>
        <div className="flex items-center gap-3 text-slate-400 mt-4">
          <AlertCircle size={14} />
          <p className="font-black text-[11px] uppercase tracking-[0.3em]">System Config & User Identity</p>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* SIDEBAR TABS */}
        <aside className="lg:w-72">
          <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
            {tabs.map((tab) => (
              <button 
                key={tab.name} 
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center gap-4 px-8 py-5 rounded-[24px] font-black uppercase text-[11px] tracking-widest transition-all whitespace-nowrap border-2 ${
                  activeTab === tab.name 
                    ? 'bg-slate-900 border-slate-900 text-white shadow-2xl shadow-slate-200' 
                    : 'bg-white border-transparent text-slate-400 hover:bg-slate-50'
                }`}
              >
                {tab.icon} {tab.name}
              </button>
            ))}
          </div>
          
          <div className="hidden lg:block mt-12 p-6 bg-indigo-50 rounded-[32px] border border-indigo-100">
            <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2">Sync Status</p>
            <p className="text-xs font-bold text-indigo-900 leading-tight">All settings are encrypted and synced to the cloud.</p>
          </div>
        </aside>

        {/* CONTENT AREA */}
        <div className="flex-1 bg-white border-2 border-slate-100 p-8 lg:p-16 rounded-[64px] shadow-sm relative overflow-hidden">
          {/* Brutalist Decorative Accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 -rotate-45 translate-x-16 -translate-y-16" />
          
          <div className="relative z-10">
            {renderContent()}
            
            <div className="mt-16 pt-10 border-t-2 border-slate-50 flex flex-col sm:flex-row gap-4 justify-between items-center">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Last synced: 2m ago</p>
              <button className="w-full sm:w-auto bg-indigo-600 text-white px-12 py-5 rounded-[24px] font-black uppercase text-[11px] tracking-widest hover:bg-slate-900 hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-xl shadow-indigo-100">
                <Save size={18}/> Commit Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;