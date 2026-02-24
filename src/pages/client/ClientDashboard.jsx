import React, { useState } from 'react';
import { 
  Plus, Edit3, Trash2, Users, Briefcase, 
  Search, Filter, Clock, ChevronRight, BarChart3
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const ClientDashboard = ({ jobs = [], setJobs }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id) => {
    if (window.confirm("Delete this mission? This cannot be undone.")) {
      setJobs(jobs.filter(job => job.id !== id));
    }
  };

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalBudget = jobs.reduce((acc, job) => {
    const val = parseInt(job.budget?.toString().replace(/[^0-9]/g, '')) || 0;
    return acc + val;
  }, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 space-y-6 md:space-y-10 animate-in fade-in duration-500">
      
      {/* --- RESPONSIVE HEADER --- */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Live Operations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter text-slate-900 italic leading-none">
            Client<span className="text-indigo-600">.Dashboard</span>
          </h2>
        </div>
        
        <Link 
          to="/post-job" 
          className="group flex items-center justify-center gap-3 bg-slate-900 text-white px-6 py-4 md:px-8 md:py-5 rounded-2xl md:rounded-3xl font-black uppercase text-[10px] md:text-xs tracking-widest hover:bg-indigo-600 transition-all shadow-xl active:scale-95"
        >
          <Plus size={18} strokeWidth={3} className="group-hover:rotate-90 transition-transform" /> 
          Post Mission
        </Link>
      </div>

      {/* --- STATS GRID (Adaptive Columns) --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <StatCard label="Active Projects" value={jobs.length} icon={<Briefcase size={18}/>} />
        <StatCard label="Total Applicants" value={jobs.reduce((acc, curr) => acc + (curr.proposals || 0), 0)} icon={<Users size={18}/>} />
        <StatCard 
          label="Total Spend" 
          value={`$${totalBudget.toLocaleString()}`} 
          icon={<BarChart3 size={18}/>} 
          className="sm:col-span-2 lg:col-span-1"
        />
      </div>

      {/* --- UTILITY BAR (Search & Filter) --- */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={18} />
          <input 
            type="text"
            placeholder="Filter by title or technology..."
            className="w-full bg-white border-2 border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold focus:border-indigo-500/20 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center justify-center gap-2 bg-white border-2 border-slate-100 px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-slate-300 transition-all">
          <Filter size={16} /> Filter
        </button>
      </div>

      {/* --- MISSION DATA DISPLAY --- */}
      <div className="bg-white border-2 border-slate-100 rounded-[32px] md:rounded-[40px] overflow-hidden shadow-sm">
        {filteredJobs.length === 0 ? (
          <div className="py-24 text-center">
            <div className="inline-flex p-6 bg-slate-50 rounded-full mb-4">
              <Briefcase className="text-slate-200" size={32} />
            </div>
            <p className="text-slate-400 font-black uppercase text-xs tracking-widest">No matching missions found</p>
          </div>
        ) : (
          <div className="w-full">
            {/* Desktop Table View (Hidden on Mobile/Tablet) */}
            <table className="w-full text-left hidden lg:table">
              <thead className="bg-slate-50/50 border-b-2 border-slate-100">
                <tr>
                  <th className="px-8 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Mission Description</th>
                  <th className="px-6 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Proposals</th>
                  <th className="px-6 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Management</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="group hover:bg-slate-50/30 transition-colors">
                    <td className="px-8 py-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white shrink-0">
                          <Briefcase size={20} />
                        </div>
                        <div>
                          <h4 className="font-black text-lg text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors">
                            {job.title}
                          </h4>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded">{job.category}</span>
                            <span className="text-[9px] font-bold text-slate-300 uppercase flex items-center gap-1"><Clock size={10}/> {job.posted}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-8 text-center">
                      <button 
                        onClick={() => navigate(`/view-proposals/${job.id}`)}
                        className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-indigo-600 hover:text-indigo-600 px-4 py-2 rounded-xl transition-all shadow-sm"
                      >
                        <Users size={14} />
                        <span className="text-xs font-black">{job.proposals || 0} Bids</span>
                      </button>
                    </td>
                    <td className="px-8 py-8">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => navigate('/post-job', { state: { job } })} className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-white hover:shadow-md rounded-xl transition-all"><Edit3 size={18} /></button>
                        <button onClick={() => handleDelete(job.id)} className="p-3 text-slate-400 hover:text-rose-600 hover:bg-white hover:shadow-md rounded-xl transition-all"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile & Tablet Card View (Hidden on Large Screens) */}
            <div className="lg:hidden divide-y divide-slate-100">
              {filteredJobs.map((job) => (
                <div key={job.id} className="p-5 sm:p-8 space-y-5">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <span className="text-[9px] font-black text-indigo-500 uppercase tracking-[0.2em]">{job.category}</span>
                      <h4 className="font-black text-xl text-slate-900 leading-tight">{job.title}</h4>
                      <p className="text-[10px] font-bold text-slate-300 flex items-center gap-1 uppercase tracking-widest"><Clock size={12}/> Posted {job.posted}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <Users size={16} className="text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Applicants</p>
                        <p className="text-sm font-black text-slate-900">{job.proposals || 0} Professional Bids</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => navigate(`/view-proposals/${job.id}`)}
                      className="p-2 text-slate-400 hover:text-indigo-600"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => navigate('/post-job', { state: { job } })} className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-slate-100 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-indigo-600 transition-all">
                      <Edit3 size={14}/> Edit
                    </button>
                    <button onClick={() => handleDelete(job.id)} className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-rose-50 text-rose-500 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-50 transition-all">
                      <Trash2 size={14}/> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Generic Stat Component for better reusability
const StatCard = ({ label, value, icon, className = "" }) => (
  <div className={`bg-white border-2 border-slate-100 p-6 md:p-8 rounded-[28px] md:rounded-[32px] shadow-sm hover:shadow-md transition-all group ${className}`}>
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
        {icon}
      </div>
      <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">{label}</span>
    </div>
    <p className="text-3xl md:text-4xl font-black tracking-tighter italic text-slate-900">{value}</p>
  </div>
);

export default ClientDashboard;