import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Briefcase, DollarSign, AlignLeft, 
  Code, CheckCircle2, ArrowRight, X, Layers, Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

const CATEGORIES = [
  "Web Development", "Mobile App Dev", "UI/UX Design", "Graphic Design",
  "Logo & Branding", "Digital Marketing", "SEO & Content Strategy",
  "Video Editing", "3D Modeling", "Data Science", "Cybersecurity"
];

// CHANGED: Added 'notify' and ensured 'onPost' matches App.jsx props
export default function PostJob({ onPost, notify }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "Web Development",
    type: "Fixed", 
    budget: "",
    description: "",
    skills: []
  });
  const [skillInput, setSkillInput] = useState("");

  const handleAddSkill = (skill) => {
    const target = skill || skillInput;
    if (target && !formData.skills.includes(target)) {
      setFormData({ ...formData, skills: [...formData.skills, target] });
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData({ ...formData, skills: formData.skills.filter(s => s !== skillToRemove) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!formData.budget || formData.budget <= 0) {
       // CHANGED: Using the professional notification instead of a browser alert
       return notify("Please set a valid budget before launching.");
    }

    const newJob = {
      ...formData,
      id: Date.now(),
      postedAt: "Just now",
      client: "GigFlow Labs", 
      proposals: 0,
      verified: true,
      tags: formData.skills,
      displayBudget: formData.type === 'Hourly' ? `$${formData.budget}/hr` : `$${formData.budget}`
    };

    // 1. Add job to global state
    onPost(newJob); 
    
    // 2. Navigate back to dashboard/marketplace
    navigate('/');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl mx-auto py-12 px-6"
    >
      <div className="mb-12 space-y-2">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="inline-flex items-center gap-2 bg-amber-50 text-amber-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4"
        >
          <Sparkles size={12} /> Client Suite
        </motion.div>
        <h1 className="text-6xl font-black tracking-tighter text-slate-900 leading-none">Post a New Gig</h1>
        <p className="text-slate-500 font-bold text-lg">Reach the top 1% of global talent in minutes.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* SECTION 1: IDENTITY */}
        <div className="bg-white border border-slate-100 p-10 rounded-[48px] shadow-sm space-y-10">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl"><Layers size={20}/></div>
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Job Classification</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="md:col-span-2">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4 block">Project Headline</label>
              <input 
                required
                className="w-full bg-slate-50 border-2 border-transparent p-6 rounded-[24px] text-slate-800 font-bold text-lg outline-none focus:bg-white focus:border-indigo-100 focus:ring-8 focus:ring-indigo-500/5 transition-all placeholder:text-slate-300"
                placeholder="e.g. Architect a Next-Gen Fintech Dashboard"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4 block">Primary Category</label>
              <select 
                className="w-full bg-slate-50 border-none p-6 rounded-[24px] text-slate-700 font-bold outline-none appearance-none cursor-pointer hover:bg-slate-100 transition-colors"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4 block">Payment Model</label>
              <div className="flex p-2 bg-slate-50 rounded-[24px] h-[76px]">
                {['Fixed', 'Hourly'].map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({...formData, type})}
                    className={`flex-1 rounded-[18px] text-[10px] font-black uppercase tracking-widest transition-all ${
                      formData.type === type ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-400'
                    }`}
                  >
                    {type} Price
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: BUDGET & SKILLS */}
        <div className="bg-white border border-slate-100 p-10 rounded-[48px] shadow-sm">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><DollarSign size={20}/></div>
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">
                  {formData.type === 'Fixed' ? 'Total Budget' : 'Hourly Rate'}
                </h3>
              </div>
              <div className="relative group">
                <span className="absolute left-7 top-1/2 -translate-y-1/2 font-black text-slate-900 text-xl transition-colors group-focus-within:text-indigo-600">$</span>
                <input 
                  required
                  type="number"
                  placeholder={formData.type === 'Fixed' ? "5000" : "75"}
                  className="w-full bg-slate-50 border-none p-7 pl-12 rounded-[24px] text-slate-900 font-black text-2xl outline-none focus:bg-white focus:ring-8 focus:ring-slate-50 transition-all"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                />
                <span className="absolute right-7 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {formData.type === 'Fixed' ? 'USD' : 'USD / HR'}
                </span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl"><Code size={20}/></div>
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Stack Required</h3>
              </div>
              <div className="flex gap-2">
                <input 
                  placeholder="Add skill (e.g. React)..."
                  className="flex-1 bg-slate-50 border-none p-5 rounded-[20px] text-sm font-bold outline-none focus:bg-white focus:ring-4 focus:ring-indigo-500/5 transition-all"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                />
              </div>
              
              <div className="flex flex-wrap gap-2 min-h-[40px]">
                {formData.skills.map(s => (
                  <motion.span 
                    layout
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    key={s} 
                    className="pl-4 pr-2 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase flex items-center gap-2 group transition-all"
                  >
                    {s} 
                    <button onClick={() => removeSkill(s)} className="p-1 hover:bg-white/20 rounded-md">
                      <X size={14} className="text-slate-400 group-hover:text-rose-400" />
                    </button>
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: DESCRIPTION */}
        <div className="bg-white border border-slate-100 p-10 rounded-[48px] shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-slate-100 text-slate-600 rounded-2xl"><AlignLeft size={20}/></div>
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Project Mission</h3>
          </div>
          <textarea 
            required
            placeholder="Describe the deliverables, timeline, and goals..."
            className="w-full bg-slate-50 border-none p-10 rounded-[32px] text-slate-700 font-medium leading-relaxed min-h-[300px] outline-none focus:bg-white focus:ring-8 focus:ring-slate-50 transition-all text-lg placeholder:text-slate-300"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-6">
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] max-w-xs">
             By launching, your project will be visible to 12,000+ verified freelancers immediately.
           </p>
          <button 
            type="submit"
            className="group flex items-center gap-4 px-16 py-7 bg-black text-white rounded-[32px] font-black uppercase text-xs tracking-[0.3em] hover:bg-indigo-600 transition-all shadow-2xl active:scale-95 w-full md:w-auto justify-center"
          >
            Launch Project <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform"/>
          </button>
        </div>
      </form>
    </motion.div>
  );
}