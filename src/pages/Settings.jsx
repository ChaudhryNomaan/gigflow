import React, { useState } from 'react';
import { User, Bell, Shield, CreditCard, Save } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('Profile');

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
          <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
            <h3 className="text-2xl font-black tracking-tighter">Email Preferences</h3>
            <div className="space-y-4">
              {['New Messages', 'Project Updates', 'Payment Alerts'].map(item => (
                <div key={item} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                  <span className="font-bold text-slate-700">{item}</span>
                  <input type="checkbox" defaultChecked className="w-5 h-5 accent-indigo-600" />
                </div>
              ))}
            </div>
          </div>
        );
      case 'Security':
        return (
          <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
            <h3 className="text-2xl font-black tracking-tighter">Password & Security</h3>
            <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest">Change Password</button>
            <div className="p-6 border-2 border-dashed border-slate-100 rounded-[32px]">
              <p className="text-sm font-bold text-slate-400">Two-Factor Authentication is currently OFF</p>
            </div>
          </div>
        );
      case 'Billing':
        return (
          <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
            <h3 className="text-2xl font-black tracking-tighter">Payment Methods</h3>
            <div className="p-10 bg-slate-50 border border-slate-100 rounded-[40px] text-center">
              <CreditCard className="mx-auto text-slate-300 mb-4" size={40}/>
              <p className="text-slate-400 font-bold text-sm uppercase">No payment methods added</p>
              <button className="mt-4 text-indigo-600 font-black text-[10px] uppercase tracking-widest">+ Add Card</button>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-300">
            <h3 className="text-2xl font-black tracking-tighter">Public Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Display Name</label>
                <input className="w-full bg-slate-50 border-none p-4 rounded-xl font-bold focus:ring-2 focus:ring-indigo-500/10" defaultValue="Liza M." />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Professional Title</label>
                <input className="w-full bg-slate-50 border-none p-4 rounded-xl font-bold focus:ring-2 focus:ring-indigo-500/10" defaultValue="Product Designer" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Bio</label>
              <textarea className="w-full bg-slate-50 border-none p-4 rounded-xl font-bold h-32" defaultValue="Brutalist Designer & React Enthusiast." />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <h1 className="text-5xl font-black uppercase tracking-tighter text-slate-900 mb-12">Settings</h1>
      <div className="flex flex-col lg:flex-row gap-12">
        <aside className="lg:w-64 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0">
          {tabs.map((tab) => (
            <button 
              key={tab.name} 
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all whitespace-nowrap ${activeTab === tab.name ? 'bg-black text-white' : 'text-slate-400 hover:bg-slate-100'}`}
            >
              {tab.icon} {tab.name}
            </button>
          ))}
        </aside>
        <div className="flex-1 bg-white border border-slate-100 p-8 lg:p-12 rounded-[56px] shadow-sm">
          {renderContent()}
          <div className="mt-10 pt-10 border-t border-slate-50">
            <button className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-black transition-all flex items-center gap-2">
              <Save size={16}/> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;