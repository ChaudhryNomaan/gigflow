import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Star, Shield, Zap, Globe, 
  MousePointer2, Play, CheckCircle2, TrendingUp,
  Layers, Users, Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();

  // Animation variants for staggered entrance
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  return (
    <div className="bg-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 space-y-32 py-16 md:py-24 selection:bg-indigo-600 selection:text-white">
        
        {/* --- 1. THE HERO (CRITICAL PATH) --- */}
        <section className="text-center space-y-12 relative">
          {/* Decorative Background Blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-50/50 blur-[120px] rounded-full -z-10" />

          <motion.div 
            {...fadeInUp}
            className="inline-flex items-center gap-3 bg-white border border-slate-200 px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-shadow cursor-default"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-600">
              Live: <span className="text-indigo-600">842</span> High-Value Mandates Open
            </span>
          </motion.div>

          <div className="space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-7xl md:text-[11rem] font-black tracking-tighter uppercase leading-[0.8] text-slate-900 italic"
            >
              Work <br /> <span className="text-indigo-600 not-italic">Refined<span className="text-slate-900">.</span></span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="max-w-2xl mx-auto text-slate-500 font-bold text-lg leading-relaxed md:text-2xl"
            >
              The digital headquarters for the top 3% of independent talent. 
              Built for high-velocity startups who demand excellence.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-6"
          >
            <button 
              onClick={() => navigate('/gateway')}
              className="group relative flex items-center gap-4 bg-slate-900 text-white px-14 py-7 rounded-[32px] font-black uppercase text-xs tracking-[0.3em] hover:bg-indigo-600 hover:scale-105 transition-all shadow-2xl shadow-indigo-200"
            >
              Start Building <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </button>
            <button className="group flex items-center gap-3 bg-white border-2 border-slate-100 text-slate-900 px-12 py-7 rounded-[32px] font-black uppercase text-xs tracking-[0.2em] hover:border-slate-900 transition-all">
              <div className="bg-indigo-50 p-2 rounded-full group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Play size={14} fill="currentColor" />
              </div> 
              Interface Tour
            </button>
          </motion.div>
        </section>

        {/* --- 2. THE TRUST TICKER --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <p className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Backed by Institutional Capital & Visionary Founders</p>
          <div className="flex flex-wrap justify-center items-center gap-x-20 gap-y-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-1000">
              {['VOLT', 'AETHER', 'NEXUS', 'ZENTRY', 'KINETIC', 'PRISM'].map((logo) => (
                  <span key={logo} className="text-4xl font-black italic tracking-tighter text-slate-900 hover:text-indigo-600 transition-colors cursor-default">{logo}</span>
              ))}
          </div>
        </motion.div>

        {/* --- 3. THE "MARKETPLACE" PREVIEW --- */}
        <div className="relative pt-10">
          <div className="absolute -top-10 left-10 text-indigo-100 animate-bounce">
            <MousePointer2 size={48} />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-slate-900 rounded-[72px] p-2 md:p-6 shadow-[0_40px_100px_-15px_rgba(79,70,229,0.2)]"
          >
            <div className="bg-white rounded-[56px] p-8 md:p-16 border border-white/10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
                <div>
                  <h3 className="text-4xl font-black uppercase tracking-tighter italic text-slate-900">Opportunity Hub<span className="text-indigo-600">.</span></h3>
                  <p className="text-slate-400 font-bold text-sm mt-2">Verified contracts waiting for expertise.</p>
                </div>
                <button className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-slate-900 transition-colors">View All Open Mandates</button>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {[
                  { title: "AI Research Lead", budget: "$15k", tags: ["Python", "PyTorch"], color: "bg-indigo-50", text: "text-indigo-600" },
                  { title: "Senior UI Architect", budget: "$9k", tags: ["React", "Figma"], color: "bg-emerald-50", text: "text-emerald-600" },
                  { title: "Web3 Protocol Eng", budget: "$12k", tags: ["Rust", "Solana"], color: "bg-amber-50", text: "text-amber-600" }
                ].map((job, i) => (
                  <motion.div 
                    whileHover={{ y: -10 }}
                    key={i} 
                    className="p-8 rounded-[40px] border border-slate-100 hover:border-indigo-100 hover:shadow-xl transition-all group"
                  >
                    <div className="flex justify-between items-start mb-10">
                      <div className={`p-3 rounded-2xl ${job.color} ${job.text}`}>
                        <Sparkles size={24} />
                      </div>
                      <span className="text-2xl font-black italic text-slate-900 group-hover:text-indigo-600 transition-colors">{job.budget}</span>
                    </div>
                    <h4 className="text-xl font-black uppercase mb-3 leading-tight">{job.title}</h4>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {job.tags.map(t => <span key={t} className="text-[9px] font-black uppercase bg-slate-50 px-3 py-1 rounded-full text-slate-400">{t}</span>)}
                    </div>
                    <div className="pt-6 border-t border-slate-50 flex justify-between items-center">
                      <span className="text-[9px] font-black uppercase text-slate-300 flex items-center gap-1.5"><Shield size={12} className="text-emerald-500" /> Escrow Protected</span>
                      <ArrowRight size={16} className="text-slate-200 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* --- 4. VALUE PROPS --- */}
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<TrendingUp className="text-indigo-600" size={32} />}
            title="Yield Engine"
            desc="Maximize your hourly velocity with data-backed pricing insights and contract optimization."
          />
          <FeatureCard 
            icon={<Users className="text-slate-900" size={32} />}
            title="Elite Network"
            desc="No bidding wars. We match you with clients who value quality over cost. Peer-vetted only."
          />
          <FeatureCard 
            icon={<Layers className="text-indigo-600" size={32} />}
            title="Native Escrow"
            desc="Funds are locked on contract start. Get paid instantly upon milestone completion. No chasing invoices."
          />
        </div>

        {/* --- 5. CALL TO ACTION --- */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-900 rounded-[80px] p-12 md:p-32 text-center text-white relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-indigo-500/30 via-transparent to-transparent opacity-50" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-600/20 blur-[100px] rounded-full group-hover:bg-indigo-600/40 transition-colors duration-1000" />
          
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-10 italic relative z-10 leading-none">
            Ready for <br/> <span className="text-indigo-400 not-italic">Hypergrowth?</span>
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 relative z-10">
            <button 
              onClick={() => navigate('/gateway')}
              className="w-full md:w-auto bg-white text-slate-900 px-20 py-8 rounded-[32px] font-black uppercase text-xs tracking-[0.4em] hover:bg-indigo-500 hover:text-white transition-all shadow-2xl"
            >
              Apply to Join
            </button>
            <p className="text-slate-500 font-bold text-sm italic">Acceptance rate: 3.2%</p>
          </div>
        </motion.section>

      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="group bg-white p-14 rounded-[64px] border border-slate-100 hover:border-indigo-600/10 transition-all duration-500"
  >
    <div className="mb-12 bg-slate-50 w-20 h-20 rounded-[28px] flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 rotate-3 group-hover:rotate-0">
      {icon}
    </div>
    <h3 className="text-3xl font-black uppercase tracking-tighter mb-6 italic text-slate-900">{title}</h3>
    <p className="text-slate-400 font-bold text-lg leading-relaxed">{desc}</p>
  </motion.div>
);

export default Home;