import React from 'react';
import { ArrowUpRight, ArrowDownLeft, DollarSign, Clock, CreditCard } from 'lucide-react';

const Wallet = () => {
  return (
    <div className="max-w-6xl mx-auto py-10 animate-in fade-in duration-500">
      <div className="mb-10">
        <h1 className="text-5xl font-black uppercase tracking-tighter text-slate-900">Financial Hub</h1>
        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] mt-2">Manage your earnings and transactions</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white border border-slate-100 p-8 rounded-[40px] shadow-sm">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
            <DollarSign size={24}/>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Available for Payout</p>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-6">$8,240.50</h2>
          <button className="w-full py-4 bg-black text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-600 transition-all">Withdraw Funds</button>
        </div>
        
        <div className="bg-slate-900 p-8 rounded-[40px] text-white">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
            <Clock size={24}/>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Pending Clearance</p>
          <h2 className="text-4xl font-black tracking-tighter">$1,200.00</h2>
          <p className="text-[9px] font-bold text-slate-500 uppercase mt-4">Average clearance: 5 days</p>
        </div>

        <div className="bg-indigo-600 p-8 rounded-[40px] text-white">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
            <CreditCard size={24}/>
          </div>
          <p className="text-[10px] font-black text-indigo-100 uppercase tracking-widest mb-1">Total Lifetime Revenue</p>
          <h2 className="text-4xl font-black tracking-tighter">$42,900.00</h2>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-white border border-slate-100 rounded-[40px] overflow-hidden shadow-sm">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
          <h3 className="font-black uppercase tracking-tighter text-xl text-slate-900">Transaction History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Date</th>
                <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Description</th>
                <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Amount</th>
                <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[1, 2, 3].map((i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-6 text-sm font-bold text-slate-500">Feb {18-i}, 2026</td>
                  <td className="p-6">
                    <p className="font-black text-slate-900 text-sm">Milestone Payment: Fintech App</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Client: Marcus V.</p>
                  </td>
                  <td className="p-6 font-black text-emerald-500">+$1,500.00</td>
                  <td className="p-6">
                    <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[9px] font-black uppercase">Paid</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Wallet;