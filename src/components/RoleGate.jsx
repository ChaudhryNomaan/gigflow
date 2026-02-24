import React from 'react';
import { Briefcase, Users, ShieldAlert } from 'lucide-react';

const RoleGate = ({ setRole }) => {
  return (
    <div className="fixed inset-0 bg-[#fafafa] z-[100] flex items-center justify-center p-6">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-black tracking-tighter uppercase mb-4">Welcome to GigFlow</h2>
          <p className="text-gray-400 font-bold uppercase text-xs tracking-[0.2em]">Select your interface to continue</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Freelancer */}
          <RoleCard 
            title="Freelancer" 
            desc="I want to work on projects" 
            icon={<Briefcase />} 
            color="hover:border-indigo-500" 
            onClick={() => setRole('freelancer')} 
          />
          
          {/* Client */}
          <RoleCard 
            title="Client" 
            desc="I want to hire experts" 
            icon={<Users />} 
            color="hover:border-black" 
            onClick={() => setRole('client')} 
          />

          {/* Admin - The "Backdoor" */}
          <RoleCard 
            title="Admin" 
            desc="System management & stats" 
            icon={<ShieldAlert />} 
            color="hover:border-rose-500" 
            onClick={() => setRole('admin')} 
          />
        </div>
      </div>
    </div>
  );
};

const RoleCard = ({ title, desc, icon, color, onClick }) => (
  <button onClick={onClick} className={`group bg-white p-10 border-2 border-gray-100 rounded-[40px] text-left transition-all hover:shadow-2xl ${color}`}>
    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <h3 className="text-2xl font-black uppercase tracking-tight">{title}</h3>
    <p className="text-gray-400 text-sm mt-2 leading-relaxed">{desc}</p>
  </button>
);

export default RoleGate;