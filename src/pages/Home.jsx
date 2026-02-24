import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Shield, Zap, Globe, MousePointer2 } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-24 py-10 animate-in fade-in duration-1000">
      
      {/* --- HERO SECTION --- */}
      <section className="text-center space-y-8 relative">
        {/* Decorative background element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-100 rounded-full blur-[120px] -z-10 opacity-60"></div>
        
        <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-2 rounded-full mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">V2.0 is now live</span>
        </div>

        <h1 className="text-7xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] text-slate-900">
          The Future of <br /> <span className="text-indigo-600">Premium</span> Work
        </h1>
        
        <p className="max-w-2xl mx-auto text-slate-500 font-bold text-lg leading-relaxed">
          Connect with elite talent and world-class projects on the most advanced 
          freelance ecosystem ever built.
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 pt-6">
          <button 
            onClick={() => navigate('/')} // Marketplace
            className="group flex items-center gap-3 bg-black text-white px-10 py-5 rounded-[24px] font-black uppercase text-xs tracking-[0.2em] hover:bg-indigo-600 transition-all shadow-2xl shadow-indigo-100"
          >
            Browse Gigs <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => navigate('/post-job')}
            className="flex items-center gap-3 bg-white border-2 border-slate-100 text-slate-900 px-10 py-5 rounded-[24px] font-black uppercase text-xs tracking-[0.2em] hover:border-indigo-600 transition-all"
          >
            Post a Project
          </button>
        </div>
      </section>

      {/* --- STATS TICKER --- */}
      <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
        <div className="flex items-center gap-2 font-black uppercase text-sm tracking-tighter">
          <Globe size={20}/> 120+ Countries
        </div>
        <div className="flex items-center gap-2 font-black uppercase text-sm tracking-tighter">
          <Zap size={20}/> 2s Matching
        </div>
        <div className="flex items-center gap-2 font-black uppercase text-sm tracking-tighter">
          <Star size={20}/> 4.9/5 Rating
        </div>
      </div>

      {/* --- FEATURES GRID --- */}
      <div className="grid md:grid-cols-3 gap-8 px-4">
        <FeatureCard 
          icon={<Zap className="text-amber-500" size={32} />}
          title="Instant Match"
          desc="Our proprietary algorithm connects your specific skill set with high-paying projects in real-time."
        />
        <FeatureCard 
          icon={<Shield className="text-emerald-500" size={32} />}
          title="Secure Escrow"
          desc="Payments are cryptographically secured and held in trust until project milestones are achieved."
        />
        <FeatureCard 
          icon={<Star className="text-indigo-500" size={32} />}
          title="Elite Network"
          desc="We maintain a strictly vetted community of top 3% talent and verified premium clients."
        />
      </div>

      {/* --- MINI CTA --- */}
      <div className="bg-indigo-600 rounded-[48px] p-12 text-center text-white shadow-2xl shadow-indigo-200 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <MousePointer2 size={300} className="-rotate-12 -translate-x-20 -translate-y-20" />
        </div>
        <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 relative z-10">Ready to start?</h2>
        <p className="text-indigo-100 font-bold mb-8 relative z-10 opacity-80">Join 10,000+ creators building the next big thing.</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-white text-indigo-600 px-12 py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:scale-105 transition-all shadow-xl"
        >
          Create Free Account
        </button>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="group bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
    <div className="w-16 h-16 bg-slate-50 rounded-[24px] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
      {icon}
    </div>
    <h3 className="text-2xl font-black uppercase tracking-tighter mb-3 text-slate-900">{title}</h3>
    <p className="text-slate-400 font-medium text-sm leading-relaxed">{desc}</p>
  </div>
);

export default Home;