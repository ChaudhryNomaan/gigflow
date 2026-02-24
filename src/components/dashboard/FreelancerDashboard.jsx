import React from 'react';
import { 
  DollarSign, Clock, Briefcase, 
  ArrowUpRight, MessageSquare, Star,
  Zap, ChevronRight 
} from 'lucide-react';

const FreelancerDashboard = ({ profile }) => {
  const activeProjects = [
    { id: 1, title: "Fintech App UI", client: "Aura Pay", deadline: "In 3 days", progress: 75 },
    { id: 2, title: "Design System", client: "Nexus Labs", deadline: "Next week", progress: 30 }
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Top Section: Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 text-white p-8 rounded-[40px] flex flex-col justify-between h-48 shadow-xl">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-white/10 rounded-2xl"><DollarSign size={20}/></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Available</span>
          </div>
          <div>
            <h2 className="text-4xl font-black tracking-tighter">$4,250.00</h2>
            <p className="text-slate-400 text-[10px] font-bold uppercase mt-1">+$1.2k this week</p>
          </div>
        </div>

        <div className="bg-white border border-slate-100 p-8 rounded-[40px] flex flex-col justify-between h-48 shadow-sm">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl"><Clock size={20}/></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">In Review</span>
          </div>
          <div>
            <h2 className="text-4xl font-black tracking-tighter text-slate-900">$1,800</h2>
            <p className="text-slate-400 text-[10px] font-bold uppercase mt-1">Across 2 milestones</p>
          </div>
        </div>

        <div className="bg-white border border-slate-100 p-8 rounded-[40px] flex flex-col justify-between h-48 shadow-sm">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><Zap size={20}/></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Success Score</span>
          </div>
          <div>
            <h2 className="text-4xl font-black tracking-tighter text-slate-900">98%</h2>
            <p className="text-slate-400 text-[10px] font-bold uppercase mt-1">Top Rated Plus</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Active Projects List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-end px-4">
            <h3 className="text-2xl font-black tracking-tighter">Current Workroom</h3>
            <button className="text-[10px] font-black uppercase text-indigo-600 hover:underline">View All</button>
          </div>
          
          <div className="space-y-4">
            {activeProjects.map(project => (
              <div key={project.id} className="bg-white border border-slate-100 p-8 rounded-[40px] hover:shadow-md transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{project.title}</h4>
                    <p className="text-xs font-bold text-slate-400 uppercase mt-1">{project.client}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase text-slate-900">{project.deadline}</p>
                    <div className="w-32 h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-indigo-600" style={{ width: `${project.progress}%` }} />
                    </div>
                  </div>
                </div>
                <button className="w-full py-4 bg-slate-50 rounded-2xl font-black uppercase text-[10px] tracking-widest group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  Open Workroom
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar: Invites & Messages */}
        <div className="space-y-8">
          <div className="bg-indigo-600 rounded-[40px] p-8 text-white shadow-xl shadow-indigo-200">
            <h3 className="text-xl font-black leading-tight mb-4">You have 3 new job invitations.</h3>
            <p className="text-indigo-100 text-xs font-medium mb-6 leading-relaxed">Top clients are looking for your specific skills in React and Systems Design.</p>
            <button className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-transform">
              Review Invites
            </button>
          </div>

          <div className="bg-white border border-slate-100 rounded-[40px] p-8">
            <h3 className="text-lg font-black mb-6">Recent Messages</h3>
            <div className="space-y-6">
              {[1, 2].map(i => (
                <div key={i} className="flex gap-4 items-center">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-[11px] font-black uppercase">Client Name</p>
                    <p className="text-xs text-slate-400 line-clamp-1">Can we hop on a quick call to discuss the...</p>
                  </div>
                  <ChevronRight size={16} className="text-slate-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboard;