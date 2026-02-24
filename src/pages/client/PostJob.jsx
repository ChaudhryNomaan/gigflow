import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Briefcase, DollarSign, AlignLeft, 
  Code, X, Layers, Sparkles,
  Target, Zap, Rocket, ShieldCheck,
  Paperclip, ListChecks, Trophy
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  "Web Development", "Mobile App Dev", "UI/UX Design", "Graphic Design",
  "Logo & Branding", "Digital Marketing", "Video Editing", "3D Modeling"
];

const SUGGESTED_SKILLS = ["React", "Figma", "Tailwind", "Python", "Node.js"];

export default function PostJob({ onPost, notify }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "Web Development",
    type: "Fixed", 
    budget: "",
    description: "",
    skills: [],
    experience: "Intermediate",
    milestones: [{ id: 1, task: "", amount: "" }], // NEW: Milestone logic
    files: [] // NEW: File attachment placeholder logic
  });
  const [skillInput, setSkillInput] = useState("");

  const calculateProgress = () => {
    let score = 0;
    if (formData.title) score += 20;
    if (formData.budget) score += 20;
    if (formData.description.length > 50) score += 30;
    if (formData.skills.length > 0) score += 30;
    return score;
  };

  // --- MISSING FEATURE: MILESTONE MANAGEMENT ---
  const addMilestone = () => {
    setFormData({ ...formData, milestones: [...formData.milestones, { id: Date.now(), task: "", amount: "" }] });
  };

  const updateMilestone = (id, field, value) => {
    const updated = formData.milestones.map(m => m.id === id ? { ...m, [field]: value } : m);
    setFormData({ ...formData, milestones: updated });
  };

  const handleAddSkill = (skill) => {
    const target = skill || skillInput;
    if (target && !formData.skills.includes(target)) {
      setFormData({ ...formData, skills: [...formData.skills, target] });
      setSkillInput("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!formData.budget || formData.budget <= 0) return notify("Please set a valid treasury budget.");
    if(formData.description.length < 50) return notify("Mission brief too short.");

    onPost({
      ...formData,
      id: Date.now(),
      postedAt: "Just now",
      client: "GigFlow Labs", 
      proposals: 0,
      verified: true,
      displayBudget: formData.type === 'Hourly' ? `$${formData.budget}/hr` : `$${formData.budget}`
    }); 
    notify("Mission Critical: Project Launched.");
    navigate('/');
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-16 space-y-12 overflow-hidden">
      
      {/* --- PROGRESS BAR --- */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-50 bg-slate-100">
        <motion.div className="h-full bg-indigo-600" initial={{ width: 0 }} animate={{ width: `${calculateProgress()}%` }} />
      </div>

      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
            <Sparkles size={12} /> Project Command Center
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-slate-900 leading-[0.85]">
            Launch <br/><span className="text-indigo-600 italic">the Mission.</span>
          </h1>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        
        {/* LEFT COLUMN: PRIMARY DATA */}
        <div className="lg:col-span-8 space-y-8 md:space-y-12">
          
          {/* CATEGORY & HEADLINE */}
          <section className="bg-white border border-slate-100 p-6 md:p-12 rounded-[40px] md:rounded-[56px] shadow-sm space-y-10">
            <div className="space-y-8">
              <div className="relative">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4 block">Project Headline</label>
                <input 
                  required
                  className="w-full bg-slate-50 border-none p-5 md:p-8 rounded-[24px] md:rounded-[32px] text-xl md:text-3xl font-black text-slate-900 outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all"
                  placeholder="Masterpiece Title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4 block">Category</label>
                  <select 
                    className="w-full bg-slate-50 border-none p-5 rounded-2xl font-bold text-slate-700 outline-none appearance-none"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    {CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
                  </select>
                </div>
                <div>
                  {/* --- NEW FEATURE: EXPERIENCE TARGETING --- */}
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4 block">Talent Tier</label>
                  <select 
                    className="w-full bg-slate-50 border-none p-5 rounded-2xl font-bold text-indigo-600 outline-none appearance-none"
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  >
                    <option>Entry Level</option>
                    <option>Intermediate</option>
                    <option>Expert (Elite)</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* MISSION BRIEF */}
          <section className="bg-white border border-slate-100 p-6 md:p-12 rounded-[40px] md:rounded-[56px] shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-slate-100 text-slate-600 rounded-xl"><AlignLeft size={20}/></div>
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter">Mission Brief</h3>
            </div>
            <textarea 
              required
              placeholder="Scope, Milestones, and Goals..."
              className="w-full bg-slate-50 border-none p-6 md:p-10 rounded-[32px] text-lg font-medium min-h-[300px] outline-none focus:bg-white transition-all"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
            {/* --- NEW FEATURE: ATTACHMENTS --- */}
            <div className="mt-6 flex items-center justify-between">
              <button type="button" className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 hover:text-indigo-600 transition-colors">
                <Paperclip size={14} /> Attach Briefings (PDF/ZIP)
              </button>
              <span className={`text-[10px] font-black uppercase ${formData.description.length < 50 ? 'text-rose-400' : 'text-emerald-500'}`}>
                {formData.description.length} / 50 min
              </span>
            </div>
          </section>

          {/* --- NEW FEATURE: MILESTONE BUILDER --- */}
          <section className="bg-white border border-slate-100 p-6 md:p-12 rounded-[40px] md:rounded-[56px] shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><ListChecks size={20}/></div>
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter">Execution Strategy</h3>
              </div>
              <button type="button" onClick={addMilestone} className="p-2 bg-slate-50 hover:bg-indigo-50 text-indigo-600 rounded-lg transition-colors">
                <Plus size={20} />
              </button>
            </div>
            <div className="space-y-4">
              {formData.milestones.map((m, idx) => (
                <div key={m.id} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-slate-50 p-4 rounded-2xl">
                  <span className="sm:col-span-1 text-[10px] font-black text-slate-400">0{idx+1}</span>
                  <input 
                    placeholder="Milestone Description" 
                    className="sm:col-span-8 bg-transparent border-none font-bold text-sm outline-none"
                    value={m.task}
                    onChange={(e) => updateMilestone(m.id, 'task', e.target.value)}
                  />
                  <input 
                    placeholder="Amt $" 
                    className="sm:col-span-3 text-right bg-white px-3 py-2 rounded-lg font-black text-indigo-600 outline-none"
                    value={m.amount}
                    onChange={(e) => updateMilestone(m.id, 'amount', e.target.value)}
                  />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: TREASURY & SKILLS */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* TREASURY */}
          <div className="bg-slate-900 text-white p-8 md:p-10 rounded-[40px] md:rounded-[56px] shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 opacity-10 group-hover:rotate-12 transition-transform pointer-events-none">
              <Zap size={180} />
            </div>
            <div className="relative z-10 space-y-8">
              <div className="flex p-1.5 bg-white/5 rounded-2xl">
                {['Fixed', 'Hourly'].map(type => (
                  <button
                    key={type} type="button"
                    onClick={() => setFormData({...formData, type})}
                    className={`flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                      formData.type === type ? 'bg-white text-slate-900 shadow-xl' : 'text-slate-500'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Proposed Budget</p>
                <div className="flex items-center gap-2">
                  <span className="text-4xl font-black text-indigo-500">$</span>
                  <input 
                    required type="number"
                    className="w-full bg-transparent border-none text-5xl font-black italic outline-none text-white placeholder:text-slate-800"
                    placeholder="0.00"
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SKILLS */}
          <div className="bg-white border border-slate-100 p-8 md:p-10 rounded-[40px] md:rounded-[56px] shadow-sm space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><Code size={20}/></div>
              <h3 className="text-lg font-black uppercase tracking-tighter text-slate-900">Skill Stack</h3>
            </div>
            <input 
              placeholder="Search tools..."
              className="w-full bg-slate-50 border-none p-4 rounded-xl text-sm font-bold outline-none"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
            />
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {formData.skills.map(s => (
                  <motion.span 
                    key={s} layout initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    className="pl-3 pr-1.5 py-1.5 bg-indigo-600 text-white rounded-lg text-[9px] font-black uppercase flex items-center gap-2"
                  >
                    {s} <button type="button" onClick={() => setFormData({...formData, skills: formData.skills.filter(sk => sk !== s)})}><X size={12}/></button>
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* ACTION */}
          <button type="submit" className="w-full group relative overflow-hidden bg-black text-white rounded-[32px] p-8 font-black uppercase text-xs tracking-[0.3em] transition-all hover:bg-indigo-600 active:scale-95 shadow-2xl">
            <span className="relative z-10 flex items-center justify-center gap-4">
              Launch Mission <Rocket size={20} className="group-hover:-translate-y-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-fuchsia-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </form>
    </div>
  );
}