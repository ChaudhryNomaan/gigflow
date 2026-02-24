import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { 
  Zap, Settings as SettingsIcon, Command
} from 'lucide-react';

// NEW: Toast Component (Include this directly or import if you made the file)
import Toast from './components/ui/Toast';

// PAGE IMPORTS
import Dashboard from './pages/Dashboard'; 
import PostJob from './pages/PostJob';
import Profile from './pages/Profile';
import Inbox from './pages/Inbox';
import Workroom from './pages/Workroom';
import Wallet from './pages/Wallet';
import Explore from './pages/Explore';
import JobDetails from './pages/JobDetails';
import TalentProfile from './pages/TalentProfile';
import Settings from './pages/Settings';
import ApplyJob from './pages/ApplyJob';
import ViewProposals from './pages/ViewProposals';

function App() {
  const [role, setRole] = useState('client'); 
  const navigate = useNavigate();

  // 1. GLOBAL NOTIFICATION STATE
  const [toast, setToast] = useState({ isVisible: false, message: "" });

  const notify = (msg) => {
    setToast({ isVisible: true, message: msg });
  };

  // 2. SHARED JOB STATE
  const [jobs, setJobs] = useState([
    {
      id: "1",
      title: "Senior React Developer for Fintech Dashboard",
      type: "Fixed-price",
      level: "Expert",
      budget: "$12,000",
      posted: "12m ago",
      description: "We need a specialist to overhaul our UI using brutalist-clean principles.",
      tags: ["React", "TypeScript", "Tailwind"],
      clientStatus: "Verified",
      location: "UK (Remote)"
    },
    {
      id: "2",
      title: "UX/UI Designer for Web3 Marketplace",
      type: "Hourly",
      level: "Intermediate",
      budget: "$80-$120/hr",
      posted: "1h ago",
      description: "Building the next generation of NFT marketplaces.",
      tags: ["Figma", "Web3", "UI/UX"],
      clientStatus: "Verified",
      location: "Global"
    }
  ]);

  // 3. SHARED TALENT STATE
  const [talents] = useState([
    { id: '01', name: "Alex Rivera", role: "Product Systems", rate: "$150", tags: ["React", "Systems Design"], status: "Available", avatar: "AR", bio: "Ex-Linear. Crafting high-performance interface systems." },
    { id: '02', name: "Sarah Chen", role: "Frontend Engine", rate: "$130", tags: ["WebGL", "Three.js"], status: "Busy", avatar: "SC", bio: "Building immersive 3D experiences." },
    { id: '03', name: "Marcus Vane", role: "Motion Strategy", rate: "$160", tags: ["After Effects", "Lottie"], status: "Available", avatar: "MV", bio: "Motion that drives conversion." },
    { id: '04', name: "Elena Rossi", role: "Brand Identity", rate: "$140", tags: ["Strategy", "Typography"], status: "Available", avatar: "ER", bio: "Branding for fintech and crypto." },
  ]);

  const [proposals, setProposals] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  
  const [profile, setProfile] = useState({
    name: "Liza M.",
    companyName: "Liza Design Studio",
    location: "London, UK",
    bio: "Senior Product Designer specializing in brutalist-clean interfaces.",
    techStack: ["React", "Figma", "Tailwind"],
    hourlyRate: "150",
    totalSpent: "$12,400",
    hireRate: "88%",
    activeJobs: 3,
    industry: "Fintech & SaaS"
  });

  // Handler for posting new jobs
  const handleAddJob = (newJob) => {
    setJobs(prevJobs => [newJob, ...prevJobs]);
    notify(`Success: Job "${newJob.title}" is now live!`);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
      
      {/* GLOBAL TOAST COMPONENT */}
      <Toast 
        isVisible={toast.isVisible} 
        message={toast.message} 
        onClose={() => setToast({ ...toast, isVisible: false })} 
      />

      {/* NAVIGATION */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-10">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-indigo-600 p-2 rounded-xl text-white group-hover:rotate-12 transition-transform shadow-lg shadow-indigo-200">
                <Zap size={20} fill="currentColor" />
              </div>
              <span className="text-xl font-black tracking-tighter uppercase italic">GigFlow</span>
            </Link>

            <div className="hidden lg:flex items-center gap-6">
              <Link to="/explore" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-all">Explore</Link>
              <Link to="/messages" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-all">Messages</Link>
              <Link to="/workroom" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-all">Workroom</Link>
              <Link to="/wallet" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-all">Wallet</Link>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden sm:flex bg-slate-100 p-1 rounded-2xl border border-slate-200/50">
              <button 
                onClick={() => { setRole('client'); navigate('/'); }} 
                className={`px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all ${role === 'client' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}
              >
                Client
              </button>
              <button 
                onClick={() => { setRole('freelancer'); navigate('/'); }} 
                className={`px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] transition-all ${role === 'freelancer' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}
              >
                Talent
              </button>
            </div>

            <div className="flex items-center gap-3">
              <Link to="/profile" className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-xs hover:bg-indigo-600 transition-all">
                {profile.name[0]}
              </Link>
              <Link to="/settings" className="text-slate-300 hover:text-slate-600 transition-colors">
                <SettingsIcon size={20} />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Dashboard profile={profile} role={role} />} />
          <Route path="/explore" element={<Explore role={role} jobs={jobs} talents={talents} />} />
          <Route path="/job/:id" element={<JobDetails jobs={jobs} />} />
          <Route path="/job/:id/apply" element={<ApplyJob jobs={jobs} setProposals={setProposals} setAppliedJobs={setAppliedJobs} appliedJobs={appliedJobs} />} />
          
          {/* PASS NOTIFY TO TALENT PROFILE */}
          <Route path="/talent/:id" element={<TalentProfile talents={talents} notify={notify} />} />

          {/* PASS NOTIFY TO POST JOB */}
          <Route path="/post-job" element={<PostJob onPost={handleAddJob} notify={notify} />} />
          
          <Route path="/view-proposals/:jobId" element={<ViewProposals proposals={proposals} setProposals={setProposals} jobs={jobs} />} />
          <Route path="/profile" element={<Profile profile={profile} setProfile={setProfile} role={role} />} />
          <Route path="/wallet" element={<Wallet profile={profile} role={role} />} />
          <Route path="/settings" element={<Settings profile={profile} role={role} />} />
          <Route path="/messages" element={<Inbox />} />
          <Route path="/workroom" element={<Workroom role={role} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;