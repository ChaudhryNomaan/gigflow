import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutGrid, 
  Send, 
  User, 
  LogOut, 
  PlusCircle, 
  Briefcase, 
  Zap
} from 'lucide-react';

const Navbar = ({ role, setRole, appliedCount }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-[1300px] mx-auto px-6 h-20 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
            <Zap className="text-white fill-white" size={20} />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase italic">GigFlow</span>
        </Link>

        {/* Dynamic Navigation Links */}
        <div className="hidden md:flex items-center gap-1 bg-gray-50 p-1.5 rounded-2xl">
          {role === 'freelancer' && (
            <>
              <NavLink to="/" active={isActive('/')} label="Marketplace" icon={<LayoutGrid size={16}/>} />
              <NavLink 
                to="/proposals" 
                active={isActive('/proposals')} 
                label={`My Bids (${appliedCount})`} 
                icon={<Send size={16}/>} 
              />
            </>
          )}

          {role === 'client' && (
            <>
              <NavLink to="/" active={isActive('/')} label="Dashboard" icon={<Briefcase size={16}/>} />
              <NavLink to="/post-job" active={isActive('/post-job')} label="Post a Gig" icon={<PlusCircle size={16}/>} />
            </>
          )}

          <NavLink to="/profile" active={isActive('/profile')} label="My Profile" icon={<User size={16}/>} />
        </div>

        {/* Role Switcher & Logout */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:block text-right mr-2">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Acting as</p>
            <p className="text-xs font-black text-indigo-600 uppercase">{role}</p>
          </div>
          
          <button 
            onClick={() => setRole(null)}
            className="p-3 hover:bg-rose-50 text-gray-400 hover:text-rose-500 rounded-xl transition-all group"
            title="Switch Role / Logout"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </nav>
  );
};

// Helper component for cleaner Nav links
const NavLink = ({ to, active, label, icon }) => (
  <Link 
    to={to} 
    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
      active 
      ? 'bg-white text-indigo-600 shadow-sm' 
      : 'text-gray-400 hover:text-slate-900'
    }`}
  >
    {icon}
    {label}
  </Link>
);

export default Navbar;