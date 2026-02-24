import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, Search, MoreVertical, Paperclip, ShieldCheck, 
  Zap, Info, Smile, ChevronRight, Download, ExternalLink 
} from 'lucide-react';

const Inbox = () => {
  const [activeChat, setActiveChat] = useState(0);
  const [message, setMessage] = useState('');
  const chatContainerRef = useRef(null);

  const contacts = [
    { 
      id: 0, 
      name: "Marcus Vane", 
      role: "Client", 
      project: "Brutal Fintech Overhaul",
      budget: "$4,500",
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
      deadline: "Apr 05",
      lastMsg: "API docs are ready for review.", 
      time: "1h ago", 
      online: false,
      initials: "SC"
    },
    { 
      id: 2, 
      name: "Elena Rossi", 
      role: "Brand Strategist", 
      project: "Identity Design",
      budget: "$2,800",
      deadline: "Mar 20",
      lastMsg: "Payment for Milestone 1 released.", 
      time: "3h ago", 
      online: true,
      initials: "ER"
    }
  ];

  // Scroll to bottom when switching chats
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [activeChat]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    // Logic for sending message would go here
    setMessage('');
  };

  return (
    <div className="h-[calc(100vh-140px)] flex bg-white border border-slate-100 rounded-[40px] overflow-hidden shadow-2xl shadow-slate-200/40 animate-in fade-in zoom-in-95 duration-500">
      
      {/* 1. LEFT: SESSIONS PANEL */}
      <div className="w-80 border-r border-slate-50 flex flex-col bg-white">
        <div className="p-8 pb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black italic tracking-tighter uppercase">Messages</h2>
            <div className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest">3 New</div>
          </div>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={14} />
            <input 
              placeholder="Filter by name or project..." 
              className="w-full bg-slate-50 border-none rounded-xl py-3 pl-10 text-[11px] font-bold outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all placeholder:text-slate-300"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {contacts.map((c) => (
            <div 
              key={c.id}
              onClick={() => setActiveChat(c.id)}
              className={`px-8 py-6 flex items-start gap-4 cursor-pointer transition-all relative ${activeChat === c.id ? 'bg-indigo-50/30' : 'hover:bg-slate-50/50'}`}
            >
              {activeChat === c.id && <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-indigo-600 rounded-r-full" />}
              
              <div className="relative flex-shrink-0">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xs transition-transform ${activeChat === c.id ? 'bg-indigo-600 text-white scale-110' : 'bg-slate-900 text-white'}`}>
                  {c.initials}
                </div>
                {c.online && <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h4 className={`text-sm font-black truncate ${activeChat === c.id ? 'text-indigo-900' : 'text-slate-900'}`}>{c.name}</h4>
                  <span className="text-[9px] font-bold text-slate-300 uppercase">{c.time}</span>
                </div>
                <p className="text-[10px] text-indigo-600 font-black uppercase tracking-widest mb-1 truncate">{c.project}</p>
                <p className="text-[11px] text-slate-400 font-medium truncate italic">"{c.lastMsg}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. MIDDLE: COLLABORATION INTERFACE */}
      <div className="flex-1 flex flex-col bg-slate-50/20">
        {/* Header */}
        <div className="p-6 bg-white border-b border-slate-50 flex justify-between items-center px-10">
          <div className="flex items-center gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-black text-xl text-slate-900 tracking-tight leading-none">{contacts[activeChat].name}</h3>
                <span className="bg-slate-100 text-slate-500 text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">{contacts[activeChat].role}</span>
              </div>
              <div className="flex items-center gap-2 text-indigo-600">
                <Zap size={12} fill="currentColor"/>
                <p className="text-[10px] font-black uppercase tracking-widest leading-none">Working on {contacts[activeChat].project}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-all border border-transparent hover:border-indigo-100">
              <ExternalLink size={14}/> Project Docs
            </button>
            <button className="p-3 hover:bg-slate-50 rounded-xl text-slate-300 hover:text-slate-900 transition-all"><MoreVertical size={20}/></button>
          </div>
        </div>

        {/* Messaging Area */}
        <div ref={chatContainerRef} className="flex-1 p-10 overflow-y-auto space-y-8 custom-scrollbar">
          {/* Incoming bubble */}
          <div className="flex flex-col items-start space-y-2">
            <div className="flex items-end gap-3 max-w-[70%]">
              <div className="w-8 h-8 bg-slate-100 rounded-lg flex-shrink-0 flex items-center justify-center text-[10px] font-black">MV</div>
              <div className="bg-white border border-slate-100 p-5 rounded-[24px] rounded-bl-none shadow-sm">
                <p className="text-[13px] text-slate-600 font-medium leading-relaxed">
                  Hey Liza! Just checked the latest design iteration. The brutalist approach for the Fintech dashboard is hitting exactly where it needs to. Can we push the contrast a bit more on the charts?
                </p>
              </div>
            </div>
            <span className="text-[9px] font-bold text-slate-300 ml-11 uppercase tracking-widest">10:24 AM • Delivered</span>
          </div>

          {/* Outgoing bubble */}
          <div className="flex flex-col items-end space-y-2">
            <div className="flex items-end gap-3 max-w-[70%] flex-row-reverse">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex-shrink-0 flex items-center justify-center text-[10px] font-black text-white italic">LM</div>
              <div className="bg-slate-900 p-5 rounded-[24px] rounded-br-none shadow-xl shadow-slate-200">
                <p className="text-[13px] text-white font-medium leading-relaxed">
                  Absolutely Marcus. I'll increase the stroke weight and saturation on the data visualizations. I'll have the updated prototype link ready in about an hour! ⚡️
                </p>
              </div>
            </div>
            <span className="text-[9px] font-bold text-slate-300 mr-11 uppercase tracking-widest">10:31 AM • Read</span>
          </div>
        </div>

        {/* Input Dock */}
        <div className="p-10 pt-0">
          <form onSubmit={handleSendMessage} className="bg-white border border-slate-100 rounded-[32px] p-3 flex items-center gap-3 shadow-xl shadow-slate-200/40 focus-within:border-indigo-200 transition-all">
            <div className="flex items-center gap-1 pl-2">
              <button type="button" className="p-3 text-slate-300 hover:text-indigo-600 transition-colors"><Paperclip size={18}/></button>
              <button type="button" className="p-3 text-slate-300 hover:text-indigo-600 transition-colors"><Smile size={18}/></button>
            </div>
            <input 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message to Marcus..." 
              className="flex-1 bg-transparent border-none outline-none text-sm font-medium py-2"
            />
            <button type="submit" className="bg-indigo-600 text-white h-12 w-12 rounded-2xl hover:bg-black hover:scale-105 transition-all flex items-center justify-center shadow-lg shadow-indigo-200">
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* 3. RIGHT: PROJECT SCOPE SIDEBAR */}
      <div className="w-80 border-l border-slate-50 bg-white hidden xl:flex flex-col p-8 overflow-y-auto">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Mission Summary</h4>
        
        <div className="space-y-8">
          {/* Financial Card */}
          <div className="bg-slate-950 rounded-[32px] p-6 text-white relative overflow-hidden group">
            <Zap className="absolute -right-4 -top-4 text-white/10 group-hover:rotate-12 transition-transform duration-700" size={100} />
            <p className="text-[9px] font-black uppercase tracking-widest text-indigo-400 mb-1">Contract Value</p>
            <h3 className="text-3xl font-black tracking-tighter mb-4">{contacts[activeChat].budget}</h3>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
               <div className="bg-indigo-500 h-full w-2/3" />
            </div>
            <p className="text-[9px] font-bold text-white/40 mt-3 uppercase tracking-widest italic">Milestone 2 of 3 in progress</p>
          </div>

          {/* Details */}
          <div className="space-y-5">
            <DetailItem icon={<Info size={14}/>} label="Timeline" value={`Deadline ${contacts[activeChat].deadline}`} />
            <DetailItem icon={<ShieldCheck size={14}/>} label="Security" value="Escrow Protected" color="text-emerald-500" />
          </div>

          {/* Deliverables */}
          <div className="pt-8 border-t border-slate-50">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Project Assets</h4>
            <div className="space-y-3">
              {['System_Design_Final.pdf', 'Interactions.mp4'].map((file) => (
                <div key={file} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group cursor-pointer hover:bg-indigo-600 transition-all">
                  <div className="flex items-center gap-3">
                    <Download size={14} className="text-slate-300 group-hover:text-white" />
                    <span className="text-[11px] font-black text-slate-600 group-hover:text-white truncate max-w-[120px]">{file}</span>
                  </div>
                  <ChevronRight size={14} className="text-slate-200 group-hover:text-white" />
                </div>
              ))}
            </div>
          </div>
          
          {/* Action Button */}
          <button className="w-full py-4 bg-indigo-50 text-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all">
            Open Workroom
          </button>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ icon, label, value, color = "text-slate-700" }) => (
  <div className="flex items-center gap-4">
    <div className="w-8 h-8 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
      {icon}
    </div>
    <div>
      <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{label}</p>
      <p className={`text-[11px] font-black ${color} uppercase tracking-tight`}>{value}</p>
    </div>
  </div>
);

export default Inbox;