import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation, Navigate, NavLink } from 'react-router-dom';
import { 
  Zap, Settings as SettingsIcon, Bell, CreditCard, 
  LayoutGrid, MessageSquare, Briefcase, PlusCircle, 
  Menu, X, ChevronRight, LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import Toast from './components/ui/Toast';

// --- SHARED ---
import Gateway from './pages/shared/Gateway';
import Inbox from './pages/shared/Inbox';
import Settings from './pages/shared/Settings';
import JobDetails from './pages/shared/JobDetails';
import Workroom from './pages/shared/Workroom.jsx';
import Notifications from './pages/shared/Notifications';

// --- CLIENT ---
import ClientDashboard from './pages/client/ClientDashboard';
import PostJob from './pages/client/PostJob';
import ViewProposals from './pages/client/ViewProposals';
import ReviewProposal from './pages/client/ReviewProposal';
import ClientExplore from './pages/client/ClientExplore'; 
import ClientProfile from './pages/client/ClientProfile';

// --- FREELANCER ---
import FreelancerDashboard from './pages/freelancer/FreelancerDashboard';
import ApplyJob from './pages/freelancer/ApplyJob';
import Wallet from './pages/freelancer/Wallet';
import FreelancerExplore from './pages/freelancer/FreelancerExplore'; 
import FreelancerProfile from './pages/freelancer/FreelancerProfile';

function App() {
  const [role, setRole] = useState(null); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [toast, setToast] = useState({ isVisible: false, message: "" });
  const notify = (msg) => setToast({ isVisible: true, message: msg });

  const [jobs, setJobs] = useState([
    { id: "1", title: "Senior React Developer for Fintech Dashboard", type: "Fixed-price", budget: "12000", posted: "12m ago", description: "UI overhaul.", tags: ["React", "Tailwind"], category: "Frontend" },
    { id: "2", title: "UX/UI Designer for Web3 Marketplace", type: "Hourly", budget: "85", posted: "1h ago", description: "NFT marketplace design.", tags: ["Figma", "Web3"], category: "Product" }
  ]);

  const [talents] = useState([
    { id: '01', name: "Alex Rivera", role: "Product Systems", rate: 150, tags: ["React"], status: "Available", avatar: "AR", category: "Product" },
    { id: '02', name: "Sarah Chen", role: "Frontend Engine", rate: 130, tags: ["WebGL"], status: "Busy", avatar: "SC", category: "Frontend" }
  ]);

  const [proposals, setProposals] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [profile, setProfile] = useState({ name: "Liza", balance: "42,050.00" });

  const handleAddJob = (newJob) => {
    const jobWithId = { ...newJob, id: String(jobs.length + 1), posted: 'Just now' };
    setJobs(prevJobs => [jobWithId, ...prevJobs]);
    notify(`Mission Logged: ${newJob.title}`);
  };

  const isGateway = location.pathname === "/";

  // Navigation Item Component
  const NavItem = ({ to, icon: Icon, label, mobile = false }) => (
    <NavLink 
      to={to} 
      onClick={() => setIsMenuOpen(false)}
      className={({ isActive }) => `
        flex items-center justify-between group transition-all
        ${mobile 
          ? 'py-6 border-b border-slate-50 text-2xl font-black italic uppercase tracking-tighter' 
          : 'gap-2 text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-xl'}
        ${isActive ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-900'}
        ${!mobile && isActive ? 'bg-indigo-50/50' : ''}
      `}
    >
      <div className="flex items-center gap-4">
        {Icon && <Icon size={mobile ? 24 : 14} strokeWidth={3} />}
        {label}
      </div>
      {mobile && <ChevronRight size={20} className="text-slate-200" />}
    </NavLink>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFF] font-sans antialiased text-slate-900 selection:bg-indigo-100">
      <Toast 
        isVisible={toast.isVisible} 
        message={toast.message} 
        onClose={() => setToast({ ...toast, isVisible: false })} 
      />

      {/* --- MOBILE SIDEBAR MENU --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-white z-[70] p-8 shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-2">
                  <div className="bg-indigo-600 p-2 rounded-xl text-white"><Zap size={18} fill="currentColor" /></div>
                  <span className="font-black italic uppercase tracking-tighter text-xl">GigFlow</span>
                </div>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-slate-50 rounded-full"><X size={24} /></button>
              </div>

              <nav className="flex-1 overflow-y-auto">
                <NavItem to="/explore" label="Explore" icon={LayoutGrid} mobile />
                <NavItem to="/messages" label="Inbox" icon={MessageSquare} mobile />
                <NavItem to="/workroom" label="Workroom" icon={Briefcase} mobile />
                <NavItem to="/activity" label="Activity" icon={Bell} mobile />
                <NavItem to="/settings" label="Settings" icon={SettingsIcon} mobile />
                {role === 'freelancer' && <NavItem to="/wallet" label="Wallet" icon={CreditCard} mobile />}
                {role === 'client' && <NavItem to="/post-job" label="Post Mission" icon={PlusCircle} mobile />}
              </nav>

              <div className="pt-8 mt-auto border-t border-slate-100">
                <button 
                  onClick={() => { setRole(null); navigate('/'); setIsMenuOpen(false); }}
                  className="flex items-center gap-4 text-rose-500 font-black uppercase tracking-widest text-[11px]"
                >
                  <LogOut size={18} /> Disconnect Session
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- TOP NAVIGATION (DESKTOP & MOBILE HEADER) --- */}
      {role && !isGateway && (
        <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100 px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-10">
              <Link to="/" onClick={() => setRole(null)} className="flex items-center gap-2 group">
                <div className="bg-slate-900 p-2 rounded-xl text-white group-hover:bg-indigo-600 transition-all">
                  <Zap size={18} fill="currentColor" />
                </div>
                <span className="text-xl font-black tracking-tighter uppercase italic text-slate-900">GigFlow</span>
              </Link>

              {/* Desktop Only Links - SETTINGS ADDED HERE */}
              <div className="hidden lg:flex items-center gap-2">
                <NavItem to="/explore" label="Explore" icon={LayoutGrid} />
                <NavItem to="/messages" label="Inbox" icon={MessageSquare} />
                <NavItem to="/workroom" label="Workroom" icon={Briefcase} />
                <NavItem to="/activity" label="Activity" icon={Bell} />
                <NavItem to="/settings" label="Settings" icon={SettingsIcon} />
                {role === 'freelancer' && <NavItem to="/wallet" label="Wallet" icon={CreditCard} />}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Desktop Role Switcher */}
              <div className="hidden md:flex bg-slate-100 p-1 rounded-2xl border border-slate-200/50">
                <button onClick={() => { setRole('client'); navigate('/client'); }} className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all ${role === 'client' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}>Employer</button>
                <button onClick={() => { setRole('freelancer'); navigate('/freelancer'); }} className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all ${role === 'freelancer' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}>Operator</button>
              </div>

              {/* Client Quick Action */}
              {role === 'client' && (
                <Link to="/post-job" className="hidden lg:flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-indigo-100">
                  <PlusCircle size={14} strokeWidth={3} />
                  Post Mission
                </Link>
              )}

              {/* Profile & Gear shortcut */}
              <div className="flex items-center gap-3 md:pl-4 md:border-l md:border-slate-100">
                <Link to="/profile" className="w-10 h-10 bg-slate-900 rounded-[14px] flex items-center justify-center text-white font-black text-xs hover:bg-indigo-600 transition-all">
                  {profile.name[0]}
                </Link>
                <Link to="/settings" className="hidden lg:block text-slate-300 hover:text-slate-900 transition-colors">
                  <SettingsIcon size={20} strokeWidth={2.5} />
                </Link>
              </div>

              {/* Mobile Hamburger Trigger */}
              <button onClick={() => setIsMenuOpen(true)} className="lg:hidden p-2 bg-slate-50 text-slate-900 rounded-xl hover:bg-slate-100 transition-colors">
                <Menu size={20} strokeWidth={3} />
              </button>
            </div>
          </div>
        </nav>
      )}

      <main>
        <Routes>
          <Route path="/" element={<Gateway setRole={setRole} />} />
          <Route path="/freelancer" element={role === 'freelancer' ? <FreelancerDashboard jobs={jobs} /> : <Navigate to="/" />} />
          <Route path="/client" element={role === 'client' ? <ClientDashboard jobs={jobs} setJobs={setJobs} /> : <Navigate to="/" />} />
          <Route path="/explore" element={role === 'client' ? <ClientExplore talents={talents} jobs={jobs} /> : <FreelancerExplore jobs={jobs} />} />
          <Route path="/job/:id" element={<JobDetails jobs={jobs} />} />
          <Route path="/activity" element={<Notifications />} />
          <Route path="/messages" element={<Inbox />} />
          <Route path="/workroom" element={<Workroom role={role} />} />
          <Route path="/settings" element={<Settings profile={profile} role={role} />} />
          <Route path="/profile" element={role === 'client' ? <ClientProfile profile={profile} setProfile={setProfile} jobs={jobs} /> : <FreelancerProfile profile={profile} />} />
          <Route path="/job/:id/apply" element={role === 'freelancer' ? <ApplyJob jobs={jobs} setProposals={setProposals} setAppliedJobs={setAppliedJobs} appliedJobs={appliedJobs} /> : <Navigate to="/" />} />
          <Route path="/wallet" element={role === 'freelancer' ? <Wallet profile={profile} role={role} /> : <Navigate to="/" />} />
          <Route path="/post-job" element={role === 'client' ? <PostJob onPost={handleAddJob} notify={notify} /> : <Navigate to="/" />} />
          <Route path="/view-proposals/:jobId" element={role === 'client' ? <ViewProposals proposals={proposals} setProposals={setProposals} jobs={jobs} /> : <Navigate to="/" />} />
          <Route path="/review-proposal/:id" element={role === 'client' ? <ReviewProposal proposals={proposals} setProposals={setProposals} notify={notify} /> : <Navigate to="/" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;