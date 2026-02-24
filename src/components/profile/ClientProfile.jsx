import React from 'react';
import { Building2, History, Briefcase, TrendingUp, ShieldCheck, Star } from 'lucide-react';

const ClientProfile = ({ profile }) => {
  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20">
      {/* Header with Emerald Theme */}
      <div className="bg-white rounded-[50px] border border-slate-100 overflow-hidden shadow-sm">
        <div className="h-48 bg-gradient-to-r from-emerald-600 to-teal-900" />
        <div className="px-12 pb-10 flex justify-between items-end -mt-16">
          <div className="flex items-end gap-8">
            <div className="w-40 h-40 bg-white p-2 rounded-[40px] shadow-xl">
              <div className="w-full h-full bg-emerald-500 rounded-[32px] flex items-center justify-center text-white">
                <Building2 size={60} />
              </div>
            </div>
            <div className="pb-4">
              <h1 className="text-5xl font-black tracking-tighter text-slate-900">
                {profile.companyName || "Liza Design Studio"}
              </h1>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mt-2">
                {profile.industry || "Fintech & SaaS"}
              </p>
            </div>
          </div>
          <button className="mb-4 bg-black text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-emerald-600 transition-all">
            Post New Gig
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Client Stats Cards */}
        <div className="bg-emerald-50 p-10 rounded-[40px] border border-emerald-100">
          <TrendingUp className="text-emerald-600 mb-4" />
          <p className="text-[10px] font-black text-emerald-800/50 uppercase tracking-widest">Total Spent</p>
          <h2 className="text-4xl font-black text-emerald-900">{profile.totalSpent || "$0.00"}</h2>
        </div>
        
        <div className="bg-slate-900 p-10 rounded-[40px] text-white">
          <ShieldCheck className="text-emerald-400 mb-4" />
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Verification Status</p>
          <h2 className="text-4xl font-black">Tier 1 Elite</h2>
        </div>

        <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
          <Briefcase className="text-slate-400 mb-4" />
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Open Projects</p>
          <h2 className="text-4xl font-black text-slate-900">{profile.activeJobs || 0} Active</h2>
        </div>
      </div>

      {/* Hiring History Section */}
      <div className="bg-white p-12 rounded-[50px] border border-slate-100 shadow-sm">
        <h3 className="text-2xl font-black tracking-tighter mb-8 flex items-center gap-3">
          <History className="text-emerald-500" /> Recent Hiring History
        </h3>
        <div className="divide-y divide-slate-50">
          {[1, 2].map((i) => (
            <div key={i} className="py-6 flex justify-between items-center hover:bg-slate-50/50 transition-all px-4 rounded-2xl">
               <div>
                 <p className="font-black text-slate-900 uppercase text-sm">Senior React Developer</p>
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Completed • Jan 2026</p>
               </div>
               <div className="text-right">
                 <p className="font-black text-slate-900">$4,500</p>
                 <div className="flex gap-1 justify-end">
                    {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="#10b981" stroke="none" />)}
                 </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;