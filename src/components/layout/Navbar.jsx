import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Command, MessageSquare, Bell, LogOut, Shield } from 'lucide-react';

const Navbar = ({ role, setRole, appliedCount }) => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-[1300px] mx-auto px-6 h-14 flex items-center justify-between">
        
        {/* Left: Branding & Role-Based Links */}
        <div className="flex items-center gap-8 flex-1">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center shadow-lg">
              <Command className="text-white" size={16} />
            </div>
            <h1 className="text-lg font-black tracking-tighter uppercase">GigFlow</h1>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            {role === 'freelancer' && (
              <>
                <NavLink to="/" className={({isActive}) => `nav-link ${isActive ? 'text-indigo-600' : ''}`}>Find Work</NavLink>
                <NavLink to="/proposals" className={({isActive}) => `nav-link ${isActive ? 'text-indigo-600' : ''}`}>Proposals ({appliedCount})</NavLink>
              </>
            )}
            
            {role === 'client' && (
              <>
                <NavLink to="/" className={({isActive}) => `nav-link ${isActive ? 'text-black' : ''}`}>Dashboard</NavLink>
                <NavLink to="/post-job" className={({isActive}) => `nav-link ${isActive ? 'text-black' : ''}`}>Post a Gig</NavLink>
                <NavLink to="/talents" className={({isActive}) => `nav-link ${isActive ? 'text-black' : ''}`}>Talents</NavLink>
              </>
            )}

            {role === 'admin' && (
              <>
                <NavLink to="/admin" className={({isActive}) => `nav-link text-rose-600 flex items-center gap-1 ${isActive ? 'font-black' : ''}`}>
                  <Shield size={12}/> System Control
                </NavLink>
                <NavLink to="/admin/users" className="nav-link">User Management</NavLink>
                <NavLink to="/admin/disputes" className="nav-link">Disputes</NavLink>
              </>
            )}
          </div>
        </div>

        {/* Right: Actions & Profile */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 text-gray-400">
            <MessageSquare size={18} className="hover:text-black cursor-pointer transition-colors" />
            <Bell size={18} className="hover:text-black cursor-pointer transition-colors" />
          </div>
          
          <div className="h-6 w-px bg-gray-100"></div>

          <div className="flex items-center gap-3">
            <Link to="/profile" className="flex items-center gap-2 p-1 pr-3 bg-gray-50 rounded-full hover:bg-gray-100 transition-all border border-gray-100">
              <div className="w-7 h-7 bg-black rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                {role === 'admin' ? 'AD' : 'LM'}
              </div>
              <span className="text-[11px] font-black uppercase tracking-tight text-slate-700">Liza</span>
            </Link>
            <button 
              onClick={() => setRole(null)} 
              className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
              title="Logout / Switch Role"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;