import React from 'react';
import { Plus, Users, Briefcase, ArrowUpRight } from 'lucide-react';

const ClientDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto p-10 space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-5xl font-black tracking-tighter uppercase">Studio Control</h1>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-2">Manage your open roles and hiring</p>
        </div>
        <button className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 hover:bg-black transition-all">
          <Plus size={16}/> Post New Job
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <StatCard label="Active Gigs" value="03" icon={<Briefcase/>} color="text-emerald-600" />
        <StatCard label="Total Applicants" value="24" icon={<Users/>} color="text-blue-600" />
        <StatCard label="Hiring Budget" value="$12.5k" icon={<ArrowUpRight/>} color="text-slate-900" />
      </div>

      <div className="bg-white border border-slate-100 rounded-[40px] p-10">
        <h3 className="text-xl font-black uppercase tracking-tighter mb-8">Recent Applicants</h3>
        <div className="text-center py-20 bg-slate-50 rounded-[32px] border-2 border-dashed border-slate-200">
           <Users className="mx-auto text-slate-300 mb-4" size={40} />
           <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest">No new applicants today</p>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon, color }) => (
  <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
    <div className={`${color} mb-4`}>{icon}</div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
    <h2 className="text-4xl font-black tracking-tighter mt-1">{value}</h2>
  </div>
);

export default ClientDashboard;