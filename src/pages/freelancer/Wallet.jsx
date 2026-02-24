import React, { useState, useMemo } from 'react';
import { 
  ArrowUpRight, ArrowDownLeft, DollarSign, Clock, 
  CreditCard, Search, Filter, Download, ChevronRight,
  TrendingUp, CheckCircle2, AlertCircle, Plus, PieChart,
  Wallet as WalletIcon, MoreHorizontal, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Wallet = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTx, setSelectedTx] = useState(null);

  const transactions = [
    { id: 'TX-9281', date: 'Feb 22, 2026', desc: 'Milestone 2: SaaS Dashboard', client: 'Aether Corp', amount: 2400.00, status: 'completed', type: 'income' },
    { id: 'TX-9280', date: 'Feb 20, 2026', desc: 'Withdrawal to Bank (...4421)', client: 'Personal Payout', amount: -1500.00, status: 'pending', type: 'outcome' },
    { id: 'TX-9279', date: 'Feb 15, 2026', desc: 'Consultation: Brand Strategy', client: 'Nova Studio', amount: 450.00, status: 'completed', type: 'income' },
    { id: 'TX-9278', date: 'Feb 12, 2026', desc: 'Platform Service Fee', client: 'System', amount: -45.00, status: 'completed', type: 'outcome' },
    { id: 'TX-9277', date: 'Feb 10, 2026', desc: 'UI Kit Sales', client: 'Gumroad', amount: 890.00, status: 'completed', type: 'income' },
  ];

  // --- LOGIC: Filtering & Searching ---
  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx => {
      const matchesTab = activeTab === 'all' || tx.type === activeTab;
      const matchesSearch = tx.desc.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            tx.client.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FDFDFF] selection:bg-indigo-500 selection:text-white">
      <div className="max-w-7xl mx-auto py-10 px-4 md:px-8 space-y-10">
        
        {/* --- DYNAMIC HEADER --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 mb-3">
              <div className="bg-slate-900 p-2 rounded-xl shadow-lg shadow-indigo-100">
                <WalletIcon size={20} className="text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-slate-900 italic">Treasury<span className="text-indigo-600">.</span></h1>
            </motion.div>
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em] ml-1">Liza's Financial Command Center</p>
          </div>

          <div className="flex flex-wrap gap-3 w-full lg:w-auto">
            <button className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-white border border-slate-200 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:border-indigo-600 transition-all">
              <Download size={16} /> Export
            </button>
            <button className="flex-1 lg:flex-none px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-indigo-100">
              Request Payment
            </button>
          </div>
        </div>

        {/* --- STATS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Balance */}
          <motion.div whileHover={{ y: -5 }} className="bg-white border border-slate-200 p-8 rounded-[48px] shadow-sm relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 text-indigo-50/50 group-hover:text-indigo-50 transition-colors">
              <DollarSign size={160} />
            </div>
            <div className="relative z-10">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Available</p>
              <h2 className="text-5xl font-black text-slate-900 tracking-tighter">$12,840<span className="text-lg text-slate-300">.50</span></h2>
              <div className="mt-10 flex gap-3">
                <button className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-[9px] tracking-widest hover:bg-indigo-600 transition-all">Withdraw</button>
                <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:text-slate-900"><MoreHorizontal size={18}/></button>
              </div>
            </div>
          </motion.div>

          {/* Pending */}
          <div className="bg-slate-900 p-8 rounded-[48px] text-white shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                  <Clock size={24} className="text-indigo-400"/>
                </div>
                <span className="text-[9px] font-black bg-indigo-500 px-3 py-1 rounded-full uppercase">In Transit</span>
              </div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-6 mb-1">Pending Clearance</p>
              <h2 className="text-4xl font-black tracking-tighter">$1,200.00</h2>
            </div>
            <div className="mt-6 flex items-center gap-2 p-3 bg-white/5 rounded-2xl border border-white/10">
               <AlertCircle size={14} className="text-amber-400" />
               <p className="text-[9px] font-bold text-slate-400 uppercase">Available in 48 hours</p>
            </div>
          </div>

          {/* Efficiency/Chart */}
          <div className="bg-indigo-600 p-8 rounded-[48px] text-white shadow-xl flex flex-col justify-between">
            <div className="flex justify-between">
              <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest">Monthly Growth</p>
              <TrendingUp size={20} />
            </div>
            <h2 className="text-4xl font-black tracking-tighter mt-2">+24.8%</h2>
            <div className="mt-8 flex gap-1.5 items-end h-16">
              {[30, 60, 40, 80, 50, 90, 100, 70, 85].map((h, i) => (
                <motion.div 
                  initial={{ height: 0 }} animate={{ height: `${h}%` }}
                  key={i} className="flex-1 bg-white/20 rounded-t-lg hover:bg-white transition-colors cursor-pointer" 
                />
              ))}
            </div>
          </div>
        </div>

        {/* --- TRANSACTION ENGINE --- */}
        <div className="bg-white border border-slate-200 rounded-[48px] shadow-sm overflow-hidden">
          {/* INTERNAL NAV */}
          <div className="p-6 md:p-10 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex bg-slate-50 p-1.5 rounded-2xl w-full md:w-auto">
              {['all', 'income', 'outcome'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeTab === tab ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search client or service..." 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-bold focus:outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-400 hover:text-indigo-600 transition-colors">
                <Filter size={20} />
              </button>
            </div>
          </div>

          {/* TABLE / CARDS */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="p-8 text-[10px] font-black uppercase text-slate-400 tracking-widest">Description</th>
                  <th className="p-8 text-[10px] font-black uppercase text-slate-400 tracking-widest">Client Entity</th>
                  <th className="p-8 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Volume</th>
                  <th className="p-8 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Security</th>
                  <th className="p-8"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <AnimatePresence>
                  {filteredTransactions.map((tx) => (
                    <motion.tr 
                      layout
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      key={tx.id} 
                      onClick={() => setSelectedTx(tx)}
                      className="group hover:bg-indigo-50/30 transition-all cursor-pointer"
                    >
                      <td className="p-8">
                        <div className="flex items-center gap-5">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${tx.type === 'income' ? 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white' : 'bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white'}`}>
                            {tx.type === 'income' ? <ArrowDownLeft size={20}/> : <ArrowUpRight size={20}/>}
                          </div>
                          <div>
                            <p className="font-black text-slate-900 text-sm uppercase italic tracking-tighter mb-1">{tx.desc}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{tx.date}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-8">
                        <span className="px-3 py-1 bg-slate-100 rounded-lg text-[9px] font-black uppercase text-slate-500 group-hover:bg-white transition-colors">{tx.client}</span>
                      </td>
                      <td className={`p-8 font-black text-lg text-right tracking-tighter ${tx.type === 'income' ? 'text-emerald-500' : 'text-slate-900'}`}>
                        {tx.type === 'income' ? '+' : ''}{tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                      </td>
                      <td className="p-8 text-center">
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest ${
                          tx.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {tx.status === 'completed' ? <CheckCircle2 size={12}/> : <Clock size={12}/>}
                          {tx.status}
                        </div>
                      </td>
                      <td className="p-8 text-right text-slate-200 group-hover:text-indigo-600 transition-colors">
                        <ChevronRight size={20} />
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
            
            {filteredTransactions.length === 0 && (
              <div className="py-20 text-center space-y-4">
                 <Search size={48} className="mx-auto text-slate-100" />
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 italic">No matching records found in treasury</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- SIDE SLIDE-OVER (DETAIL VIEW) --- */}
      <AnimatePresence>
        {selectedTx && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedTx(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40" 
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl p-10 space-y-8"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-black uppercase italic tracking-tighter">Receipt Detail</h3>
                <button onClick={() => setSelectedTx(null)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400"><X size={24}/></button>
              </div>

              <div className="p-8 bg-slate-50 rounded-[32px] text-center space-y-2">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Transaction Amount</p>
                <h4 className={`text-4xl font-black italic ${selectedTx.type === 'income' ? 'text-emerald-500' : 'text-slate-900'}`}>
                  {selectedTx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </h4>
              </div>

              <div className="space-y-6">
                {[
                  { l: 'Reference ID', v: selectedTx.id },
                  { l: 'Counterparty', v: selectedTx.client },
                  { l: 'Description', v: selectedTx.desc },
                  { l: 'Timestamp', v: selectedTx.date },
                  { l: 'Status', v: selectedTx.status.toUpperCase() }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{item.l}</span>
                    <span className="text-xs font-bold text-slate-900">{item.v}</span>
                  </div>
                ))}
              </div>

              <button className="w-full py-5 bg-slate-900 text-white rounded-[24px] font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3">
                <Download size={16} /> Download PDF Invoice
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Wallet;