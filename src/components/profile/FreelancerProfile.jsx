import React, { useState } from 'react';
import { 
  MapPin, ExternalLink, Plus, ImageIcon, 
  Star, Briefcase, Zap, Globe 
} from 'lucide-react';

const FreelancerProfile = ({ profile, setProfile }) => {
  // Mock Portfolio Data
  const portfolio = [
    { id: 1, title: "Fintech App UI", category: "Mobile Design", img: "https://images.unsplash.com/photo-1551288049-bbbda546697a?w=500" },
    { id: 2, title: "E-commerce Branding", category: "Identity", img: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=500" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
      
      {/* FREELANCER HEADER */}
      <div className="bg-white rounded-[48px] border border-slate-100 overflow-hidden shadow-sm">
        <div className="h-40 bg-indigo-600" />
        <div className="px-10 pb-10 -mt-12 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="flex items-end gap-6">
            <div className="w-32 h-32 bg-slate-900 rounded-[32px] border-4 border-white flex items-center justify-center text-white text-4xl font-black">
              {profile.name[0]}
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tighter">{profile.name}</h1>
              <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{profile.title}</p>
            </div>
          </div>
          <button className="bg-black text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-600 transition-all">
            Edit Portfolio
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          
          {/* PORTFOLIO SECTION */}
          <section className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-black tracking-tighter flex items-center gap-2">
                <ImageIcon className="text-indigo-600" /> Portfolio Projects
              </h3>
              <button className="p-2 bg-slate-100 rounded-xl hover:bg-indigo-50 transition-colors">
                <Plus size={20} className="text-indigo-600" />
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {portfolio.map(project => (
                <div key={project.id} className="group bg-white rounded-[32px] border border-slate-100 overflow-hidden hover:shadow-xl transition-all">
                  <div className="h-48 overflow-hidden">
                    <img src={project.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-6 flex justify-between items-center">
                    <div>
                      <h4 className="font-black text-slate-900 uppercase text-xs">{project.title}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{project.category}</p>
                    </div>
                    <ExternalLink size={16} className="text-slate-300 group-hover:text-indigo-600" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* SIDEBAR: TECH SKILLS */}
        <div className="space-y-8">
          <div className="bg-slate-950 text-white p-8 rounded-[40px] shadow-xl">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Earnings</p>
            <h2 className="text-4xl font-black tracking-tighter">$142,800</h2>
          </div>

          <div className="bg-white p-8 rounded-[40px] border border-slate-100">
            <h4 className="font-black text-[10px] uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
              <Zap size={14} className="text-amber-500" /> Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {profile.techStack?.map(skill => (
                <span key={skill} className="px-4 py-2 bg-slate-50 text-slate-900 rounded-xl text-[10px] font-black uppercase border border-slate-100">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default FreelancerProfile;