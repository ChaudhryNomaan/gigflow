import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, Search, MoreVertical, Paperclip, ShieldCheck, 
  Zap, Info, Smile, ChevronRight, Download, ExternalLink,
  CheckCircle2, DollarSign, X, MessageSquare, Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Inbox = () => {
  const [activeChat, setActiveChat] = useState(0);
  const [message, setMessage] = useState('');
  const [showApproval, setShowApproval] = useState(false);
  const [paymentReleased, setPaymentReleased] = useState(false);
  const chatContainerRef = useRef(null);

  const contacts = [
    { 
      id: 0, 
      name: "Marcus Vane", 
      role: "Client", 
      project: "Brutal Fintech Overhaul",
      budget: "$4,500",
      progress: 65,
      deadline: "Mar 12",
      lastMsg: "The wireframes look incredible!", 
      time: "2m ago", 
      online: true,
      initials: "MV"
    },
    { 
      id: 1, 
      name: "Sarah Chen", 
      role: "Developer", 
      project: "WebGL Engine",
      budget: "$8,200",
      progress: 20,
      deadline: "Apr 05",
      lastMsg: "API docs are ready for review.", 
      time: "1h ago", 
      online: false,
      initials: "SC"
    }
  ];

  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'them', text: "Hey Liza! Just checked the latest design iteration. The brutalist approach for the Fintech dashboard is hitting exactly where it needs to. Can we push the contrast a bit more on the charts?", time: "10:24 AM" },
    { id: 2, sender: 'me', text: "Absolutely Marcus. I'll increase the stroke weight and saturation on the data visualizations. I'll have the updated prototype link ready in about an hour! ⚡️", time: "10:31 AM" }
  ]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages, activeChat]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    const newMsg = {
      id: Date.now(),
      sender: 'me',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatMessages([...chatMessages, newMsg]);
    setMessage('');
  };

  const handleReleasePayment = () => {
    setPaymentReleased(true);
    setTimeout(() => {
        setShowApproval(false);
        const systemMsg = {
            id: Date.now(),
            sender: 'system',
            text: "Payment of $1,500.00 released for Milestone 2.",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages([...chatMessages, systemMsg]);
        setPaymentReleased(false); // Reset for next time
    }, 1800);
  };

  return (
    <div className="h-screen bg-[#FDFDFF] p-4 md:p-8 font-sans text-slate-900 overflow-hidden">
      <div className="h-full flex bg-white border border-slate-100 rounded-[48px] overflow-hidden shadow-2xl shadow-slate-200/30 relative">
        
        {/* --- 1. SESSIONS PANEL --- */}
        <div className="w-20 md:w-80 border-r border-slate-50 flex flex-col bg-white">
          <div className="p-6 md:p-10 pb-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="hidden md:block text-2xl font-black italic tracking-tighter uppercase">Signal</h2>
              <div className="bg-indigo-600 text-white w-8 h-8 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100">
                <MessageSquare size={16} />
              </div>
            </div>
            <div className="relative group hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
              <input 
                placeholder="Search encrypted..." 
                className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 text-[10px] font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-indigo-500/10 placeholder:text-slate-300 transition-all"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 md:px-0">
            {contacts.map((c) => (
              <motion.div 
                key={c.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveChat(c.id)}
                className={`md:px-8 py-6 flex items-center md:items-start gap-4 cursor-pointer transition-all relative rounded-3xl md:rounded-none mb-2 md:mb-0 ${activeChat === c.id ? 'bg-indigo-50/50' : 'hover:bg-slate-50/50'}`}
              >
                {activeChat === c.id && <div className="hidden md:block absolute left-0 top-0 bottom-0 w-1.5 bg-indigo-600 rounded-r-full" />}
                <div className="relative flex-shrink-0 mx-auto md:mx-0">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xs transition-transform ${activeChat === c.id ? 'bg-slate-900 text-white scale-110 shadow-xl' : 'bg-slate-100 text-slate-400'}`}>
                    {c.initials}
                  </div>
                  {c.online && <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-white rounded-full" />}
                </div>
                <div className="hidden md:block flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-sm font-black truncate">{c.name}</h4>
                    <span className="text-[9px] font-bold text-slate-300 uppercase">{c.time}</span>
                  </div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest truncate">{c.lastMsg}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- 2. CHAT INTERFACE --- */}
        <div className="flex-1 flex flex-col bg-slate-50/20 relative">
          {/* Active Header */}
          <div className="p-6 md:p-8 bg-white/80 backdrop-blur-md border-b border-slate-50 flex justify-between items-center px-6 md:px-12 sticky top-0 z-20">
            <div className="flex items-center gap-5">
              <div className="hidden sm:block">
                <h3 className="font-black text-xl tracking-tight leading-none mb-1">{contacts[activeChat].name}</h3>
                <div className="flex items-center gap-2 text-indigo-600">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <p className="text-[10px] font-black uppercase tracking-widest">Active Mandate: {contacts[activeChat].project}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowApproval(true)}
                className="hidden sm:flex items-center gap-3 px-6 py-3.5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-100"
              >
                <DollarSign size={14}/> Release Funds
              </button>
              <button className="p-3.5 bg-slate-50 hover:bg-slate-100 rounded-2xl text-slate-400 transition-colors"><MoreVertical size={20}/></button>
            </div>
          </div>

          {/* Messages Stream */}
          <div ref={chatContainerRef} className="flex-1 p-6 md:p-12 overflow-y-auto space-y-10">
            {chatMessages.map((msg) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={msg.id} 
                className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : msg.sender === 'system' ? 'items-center' : 'items-start'} space-y-3`}
              >
                {msg.sender === 'system' ? (
                  <div className="bg-white border-2 border-emerald-500/20 text-emerald-600 px-8 py-4 rounded-3xl text-[11px] font-black uppercase tracking-widest flex items-center gap-3 shadow-sm italic">
                    <CheckCircle2 size={18} strokeWidth={3} /> {msg.text}
                  </div>
                ) : (
                  <>
                    <div className={`flex items-end gap-4 max-w-[85%] md:max-w-[65%] ${msg.sender === 'me' ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-[10px] font-black ${msg.sender === 'me' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-white'}`}>
                        {msg.sender === 'me' ? 'LZ' : contacts[activeChat].initials}
                      </div>
                      <div className={`p-6 rounded-[32px] text-sm font-bold leading-relaxed shadow-sm ${
                        msg.sender === 'me' 
                          ? 'bg-indigo-600 text-white rounded-br-none' 
                          : 'bg-white border border-slate-100 text-slate-700 rounded-bl-none'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                    <span className={`text-[9px] font-black text-slate-300 uppercase tracking-tighter ${msg.sender === 'me' ? 'mr-14' : 'ml-14'}`}>{msg.time} • Encrypted</span>
                  </>
                )}
              </motion.div>
            ))}
          </div>

          {/* Input Unit */}
          <div className="p-6 md:p-12 pt-0">
            <form onSubmit={handleSendMessage} className="bg-white border border-slate-100 rounded-[32px] p-3 md:p-4 flex items-center gap-4 shadow-2xl shadow-slate-200/50 group focus-within:border-indigo-600/30 transition-all">
              <div className="flex gap-1 pl-2 text-slate-300">
                <button type="button" className="p-3 hover:bg-slate-50 rounded-xl transition-colors"><Paperclip size={20}/></button>
              </div>
              <input 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Type a message to ${contacts[activeChat].name.split(' ')[0]}...`} 
                className="flex-1 bg-transparent border-none outline-none text-[13px] font-bold placeholder:text-slate-300"
              />
              <button type="submit" className="bg-slate-900 text-white h-14 w-14 rounded-[20px] hover:bg-indigo-600 transition-all flex items-center justify-center shadow-lg group-active:scale-95">
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>

        {/* --- 3. CONTEXTUAL UTILITY SIDEBAR --- */}
        <div className="w-80 border-l border-slate-50 bg-white hidden lg:flex flex-col p-10 overflow-y-auto">
          <div className="space-y-12">
            <div>
               <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-6">Contract Ledger</h4>
               <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                  <Zap size={120} />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-2">Total Locked</p>
                <h3 className="text-4xl font-black tracking-tighter mb-8 relative z-10">{contacts[activeChat].budget}</h3>
                
                <div className="space-y-2 relative z-10">
                  <div className="flex justify-between text-[10px] font-black uppercase">
                    <span className="text-white/40">Completion</span>
                    <span>{contacts[activeChat].progress}%</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${contacts[activeChat].progress}%` }}
                      className="bg-indigo-500 h-full" 
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">Milestone Map</h4>
              {[
                { label: "Onboarding", status: "done" },
                { label: "Prototype Final", status: "active" },
                { label: "Handoff", status: "pending" }
              ].map((m, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 ${
                    m.status === 'done' ? 'bg-emerald-500 border-emerald-500 text-white' : 
                    m.status === 'active' ? 'border-indigo-600 text-indigo-600 animate-pulse' : 
                    'border-slate-100 text-slate-200'
                  }`}>
                    {m.status === 'done' ? <CheckCircle2 size={12}/> : <Clock size={12}/>}
                  </div>
                  <span className={`text-[11px] font-black uppercase tracking-widest ${m.status === 'pending' ? 'text-slate-300' : 'text-slate-600'}`}>
                    {m.label}
                  </span>
                </div>
              ))}
            </div>

            <button className="w-full py-5 border-2 border-slate-900 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-slate-900 hover:text-white transition-all">
              Contract Details
            </button>
          </div>
        </div>

        {/* --- RELEASE OVERLAY --- */}
        <AnimatePresence>
          {showApproval && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-xl"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                className="bg-white w-full max-w-md rounded-[56px] p-12 relative shadow-2xl text-center"
              >
                <div className={`w-28 h-28 mx-auto mb-10 rounded-[40px] flex items-center justify-center transition-all duration-1000 ${paymentReleased ? 'bg-emerald-500 text-white rotate-[360deg]' : 'bg-slate-50 text-slate-900'}`}>
                  {paymentReleased ? <CheckCircle2 size={56} strokeWidth={3} /> : <ShieldCheck size={56} />}
                </div>
                <h2 className="text-4xl font-black tracking-tighter uppercase italic mb-4">
                  {paymentReleased ? 'Confirmed' : 'Auth Required'}
                </h2>
                <p className="text-slate-500 font-bold text-sm leading-relaxed mb-10 px-4">
                  Confirming this will immediately transfer <span className="text-slate-900">$1,500.00</span> to the freelancer's wallet. This action is irreversible.
                </p>
                {!paymentReleased && (
                  <div className="flex flex-col gap-4">
                    <button 
                      onClick={handleReleasePayment}
                      className="w-full py-7 bg-indigo-600 text-white rounded-[24px] font-black uppercase text-xs tracking-[0.3em] hover:bg-slate-900 transition-all shadow-xl shadow-indigo-100"
                    >
                      Verify & Release
                    </button>
                    <button onClick={() => setShowApproval(false)} className="text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-slate-900 transition-colors">Abort Mission</button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Inbox;