import React, { useState } from 'react';
import { 
  Building2, ShieldCheck, Edit3, Save, 
  CreditCard, Activity, Fingerprint, Rocket, 
  BarChart3, Globe2, Lock, 
  ShieldAlert, Key, Eye, EyeOff, Download, 
  ArrowDownLeft, ArrowUpRight as ArrowUp,
  CheckCircle2, Zap, LayoutGrid, Briefcase, 
  Plus, Trash2, Camera, Star, MapPin, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FreelancerEliteProfile = () => {
  // 1. COMPONENT STATE (Data stays here so it never goes undefined)
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('portfolio');
  const [showSensitive, setShowSensitive] = useState(false);

  const [profile, setProfile] = useState({
    name: "Liza",
    title: "Senior Product Designer & Creative Developer",
    location: "London, UK",
    bio: "Engineering high-performance interfaces for high-growth startups. Specializing in bridging the gap between complex logic and premium aesthetics.",
    rate: 95,
    skills: [
      { name: "React", level: 95 },
      { name: "Figma", level: 98 },
      { name: "Tailwind", level: 92 }
    ],
    projects: [
      { id: 1, title: "Fintech Dashboard", status: "Public", img: "https://images.unsplash.com/photo-1551288049-bbbda546697a?w=400" },
      { id: 2, title: "Crypto Wallet", status: "Draft", img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400" }
    ],
    history: [
      { id: 1, role: "Design Lead", company: "Aether SaaS", years: "2023-2026" },
      { id: 2, role: "UI Designer", company: "Global Tech", years: "2021-2023" }
    ]
  });

  const tabs = [
    { id: 'portfolio', label: 'Portfolio', icon: LayoutGrid },
    { id: 'skills', label: 'Tech Stack', icon: Zap },
    { id: 'history', label: 'Experience', icon: Briefcase },
    { id: 'revenue', label: 'Earnings', icon: CreditCard },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12 space-y-10 selection:bg-indigo-500 selection:text-white">
      
      {/* --- HEADER --- */}
      <motion.div 
        layout
        className="relative min-h-[380px] bg-slate-900 rounded-[48px] p-8 md:p-16 overflow-hidden shadow-2xl flex items-end border border-white/5"
      >
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full animate-pulse" />
        
        <div className="relative z-10 w-full flex flex-col lg:flex-row justify-between items-center lg:items-end gap-10">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-end text-center md:text-left">
            
            {/* AVATAR */}
            <div className="relative group">
              <div className="w-32 h-32 md:w-44 h-44 bg-white/5 backdrop-blur-2xl rounded-[40px] p-1 border border-white/10 flex items-center justify-center overflow-hidden">
                <span className="text-6xl md:text-8xl font-black italic text-white">
                  {profile.name[0]}
                </span>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 p-3 rounded-2xl border-4 border-slate-900">
                <ShieldCheck size={20} className="text-white" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-full">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-300">Expert Clearance</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase italic">
                {isEditing ? (
                  <input 
                    className="bg-transparent border-b-2 border-indigo-500 outline-none"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                  />
                ) : (
                  <>{profile.name}<span className="text-indigo-500">.</span></>
                )}
              </h1>

              <div className="flex flex-wrap justify-center md:justify-start gap-6 opacity-60">
                <span className="flex items-center gap-2 text-[10px] font-black uppercase text-white"><MapPin size={14}/> {profile.location}</span>
                <span className="flex items-center gap-2 text-[10px] font-black uppercase text-white"><Star size={14} className="text-yellow-400 fill-yellow-400"/> 5.0 (Reviewer Elite)</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="bg-white text-slate-900 px-10 py-5 rounded-3xl font-black text-[11px] uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all flex items-center gap-3"
          >
            {isEditing ? <><Save size={18}/> Commit changes</> : <><Edit3 size={18}/> Edit Profile</>}
          </button>
        </div>
      </motion.div>

      {/* --- DASHBOARD GRID --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* SIDEBAR NAVIGATION */}
        <div className="lg:col-span-3 space-y-6">
          <nav className="bg-white rounded-[32px] p-2 shadow-xl border border-slate-100 flex lg:flex-col overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-4 px-6 py-5 rounded-2xl transition-all ${
                  activeTab === tab.id ? 'bg-slate-900 text-white' : 'text-slate-400 hover:bg-slate-50'
                }`}
              >
                <tab.icon size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">{tab.label}</span>
              </button>
            ))}
          </nav>

          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[40px] p-8 text-white">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Revenue Level</p>
              <h3 className="text-4xl font-black italic mt-2">${profile.rate}<span className="text-sm">/hr</span></h3>
              <div className="mt-6 flex items-center gap-2 text-[10px] font-bold uppercase bg-black/20 w-fit px-3 py-1 rounded-full">Elite Tier Member</div>
          </div>
        </div>

        {/* CONTENT PANELS */}
        <div className="lg:col-span-9">
          <AnimatePresence mode="wait">
            
            {/* PORTFOLIO TAB */}
            {activeTab === 'portfolio' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-900">Portfolio Manager</h3>
                  <button className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><Plus size={20}/></button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* SAFETY CHECKED MAP */}
                  {profile.projects?.map(project => (
                    <div key={project.id} className="group bg-white rounded-[32px] p-4 border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                      <div className="aspect-video bg-slate-100 rounded-[24px] overflow-hidden relative">
                         <img src={project.img} className="w-full h-full object-cover" alt="" />
                         <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                            <button className="p-3 bg-white rounded-xl text-slate-900"><Edit3 size={18}/></button>
                            <button className="p-3 bg-white rounded-xl text-red-500"><Trash2 size={18}/></button>
                         </div>
                      </div>
                      <div className="mt-5 flex justify-between items-center px-2">
                        <h4 className="font-black text-slate-900 uppercase italic">{project.title}</h4>
                        <span className="text-[9px] font-black uppercase tracking-widest text-indigo-500">{project.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* TECH STACK TAB */}
            {activeTab === 'skills' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-[48px] p-10 border border-slate-100 shadow-sm space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {profile.skills?.map(skill => (
                    <div key={skill.name} className="space-y-3">
                      <div className="flex justify-between font-black uppercase text-[10px]">
                        <span>{skill.name}</span>
                        <span className="text-indigo-600">{skill.level}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full">
                        <motion.div 
                          initial={{ width: 0 }} 
                          animate={{ width: `${skill.level}%` }} 
                          className="h-full bg-slate-900 rounded-full" 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* EARNINGS TAB */}
            {activeTab === 'revenue' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="bg-slate-900 text-white rounded-[40px] p-10">
                      <ArrowUp className="text-emerald-400 mb-4" size={32} />
                      <p className="text-[10px] font-black uppercase opacity-40">Monthly Velocity</p>
                      <h4 className="text-5xl font-black italic mt-2">+$12,400</h4>
                   </div>
                   <div className="bg-white border border-slate-100 rounded-[40px] p-10">
                      <Activity className="text-indigo-600 mb-4" size={32} />
                      <p className="text-[10px] font-black uppercase text-slate-400">Project Completion</p>
                      <h4 className="text-5xl font-black italic mt-2 text-slate-900">98%</h4>
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

export default FreelancerEliteProfile;