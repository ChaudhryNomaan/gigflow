import React from 'react';
import ClientExplore from '../components/explore/ClientExplore';
import FreelancerExplore from '../components/explore/FreelancerExplore';
import { motion } from 'framer-motion';

const Explore = ({ role, jobs = [], talents = [] }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto"
    >
      {/* HEADER SECTION */}
      <div className="mb-12">
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 mb-2 italic">
          Discovery Engine
        </h2>
        <h1 className="text-5xl font-black tracking-tighter text-slate-900">
          {role === 'client' ? "Find Elite Talent" : "Browse Open Gigs"}
        </h1>
      </div>

      {role === 'client' ? (
        /* PASSING UPDATED TALENTS */
        <ClientExplore talents={talents} />
      ) : (
        /* PASSING UPDATED JOBS */
        <FreelancerExplore jobs={jobs} />
      )}

      {/* FALLBACK: If no jobs exist for freelancers */}
      {role === 'freelancer' && jobs.length === 0 && (
        <div className="text-center py-20 bg-white border border-dashed border-slate-200 rounded-[40px]">
          <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">
            The marketplace is quiet. Check back soon!
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default Explore;