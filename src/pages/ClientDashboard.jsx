import React from 'react';
import { Plus, Edit3, Trash2, Users, Briefcase, ExternalLink, TrendingUp } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const ClientDashboard = ({ jobs = [], setJobs }) => {
  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure? This will permanently remove the job listing and all received proposals.")) {
      setJobs(jobs.filter(job => job.id !== id));
    }
  };

  const handleEdit = (job) => {
    // Navigates to PostJob and sends the job data as 'state'
    navigate('/post-job', { state: { job: job } });
  };

  // Helper to calculate average budget from strings like "$500" or "$50/hr"
  const calculateAvgBudget = () => {
    if (jobs.length === 0) return "$0";
    const total = jobs.reduce((acc, job) => {
      const val = parseInt(job.budget?.toString().replace(/[^0-9]/g, '')) || 0;
      return acc + val;
    }, 0);
    return `$${Math.round(total / jobs.length)}`;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-5xl font-black uppercase tracking-tighter text-slate-900 leading-none">Client Hub</h2>
          <p className="text-indigo-600 font-bold text-[10px] uppercase tracking-[0.2em] mt-3 flex items-center gap-2">
            <TrendingUp size={14} /> Tracking your active projects and talent
          </p>
        </div>
        <Link 
          to="/post-job" 
          className="flex items-center gap-3 bg-black text-white px-8 py-5 rounded-[24px] font-black uppercase text-[10px] tracking-[0.2em] hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-100 active:scale-95"
        >
          <Plus size={16} strokeWidth={3} /> Post a New Gig
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Active Listings" value={jobs.length} color="text-slate-900" />
        <StatCard label="Total Proposals" value={jobs.reduce((acc, curr) => acc + (curr.proposals || 0), 0)} color="text-indigo-600" />
        <StatCard label="Avg. Project Value" value={calculateAvgBudget()} color="text-slate-900" />
      </div>

      {/* Jobs Table/List */}
      <div className="bg-white border border-slate-100 rounded-[40px] overflow-hidden shadow-sm">
        {jobs.length === 0 ? (
          <div className="py-32 text-center">
            <div className="w-24 h-24 bg-slate-50 rounded-[40px] flex items-center justify-center mx-auto mb-8">
              <Briefcase className="text-slate-200" size={40} />
            </div>
            <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.2em]">No active listings found.</p>
            <Link to="/post-job" className="text-indigo-600 text-xs font-bold mt-4 inline-block hover:underline">Launch your first project →</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest uppercase">Gig Details</th>
                  <th className="px-6 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center uppercase">Applicants</th>
                  <th className="px-6 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest uppercase">Budget</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {jobs.map((job) => (
                  <tr key={job.id} className="group hover:bg-slate-50/30 transition-colors">
                    <td className="px-10 py-8">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[9px] font-black text-indigo-500 uppercase tracking-tighter">{job.category}</span>
                          <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Live</span>
                        </div>
                        <h4 className="font-black text-xl text-slate-800 tracking-tighter leading-tight group-hover:text-indigo-600 transition-colors">{job.title}</h4>
                      </div>
                    </td>
                    <td className="px-6 py-8 text-center">
                      <button 
                        onClick={() => navigate(`/view-proposals/${job.id}`)}
                        className="inline-flex items-center gap-2 bg-slate-50 text-slate-600 px-5 py-2.5 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all group/btn"
                      >
                        <Users size={14} />
                        <span className="text-xs font-black">{job.proposals || 0}</span>
                        <ExternalLink size={12} className="opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                      </button>
                    </td>
                    <td className="px-6 py-8">
                      <span className="text-sm font-black text-slate-600 tracking-tight">
                        {job.displayBudget || `$${job.budget}`}
                      </span>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex justify-end items-center gap-3">
                        <button 
                          onClick={() => handleEdit(job)}
                          className="p-3 bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                          title="Edit Job"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(job.id)}
                          className="p-3 bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                          title="Delete Job"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ label, value, color }) => (
  <div className="bg-white border border-slate-100 p-10 rounded-[40px] shadow-sm hover:shadow-md transition-shadow">
    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">{label}</p>
    <p className={`text-4xl font-black tracking-tighter ${color}`}>{value}</p>
  </div>
);

export default ClientDashboard;