import React, { useState } from 'react';
import { IconCheckCircle, IconXCircle, IconEye, IconFilter, IconFileText } from '../components/Icons';

export default function StaffDashboard({ user, letters, onApproveLetter, onRejectLetter, onViewLetter }) {
  const [filter, setFilter] = useState('All');

  const filteredLetters = letters.filter(l => {
    if (filter === 'All') return true;
    return l.status === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
        <div>
          <h2 className="text-xl font-bold text-white">{user.name}</h2>
          <p className="text-xs text-slate-400 font-mono">Faculty Portal • {user.email}</p>
        </div>
        
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <IconFilter className="w-4 h-4 text-slate-400 ml-2" />
          {['All', 'Pending', 'Approved', 'Rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === status ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center gap-2">
          <IconFileText className="w-4 h-4 text-indigo-400" />
          <h3 className="text-sm font-bold text-white">Student Approvals Stream</h3>
        </div>

        <div className="divide-y divide-slate-800/60">
          {filteredLetters.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">No requests match the current filter.</div>
          ) : (
            filteredLetters.map((item) => (
              <div key={item.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-800/30 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">{item.studentName}</span>
                    <span className="text-xs font-mono text-slate-400">({item.rollNo})</span>
                    <span className="rounded bg-indigo-500/10 px-2 py-0.5 text-[10px] font-mono text-indigo-400 border border-indigo-500/20">
                      {item.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">{item.reason}</p>
                  <p className="text-[10px] text-slate-500 font-mono">Date Requested: {item.date}</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onViewLetter(item)}
                    className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700"
                  >
                    <IconEye className="w-3.5 h-3.5" /> Letter
                  </button>

                  {item.status === 'Pending' ? (
                    <>
                      <button
                        onClick={() => onApproveLetter(item.id, user.name)}
                        className="flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-500"
                      >
                        <IconCheckCircle className="w-3.5 h-3.5" /> Approve
                      </button>
                      <button
                        onClick={() => onRejectLetter(item.id)}
                        className="flex items-center gap-1 rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-rose-500"
                      >
                        <IconXCircle className="w-3.5 h-3.5" /> Reject
                      </button>
                    </>
                  ) : (
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${
                      item.status === 'Approved' ? 'border-emerald-800/50 bg-emerald-950/60 text-emerald-400' : 'border-rose-800/50 bg-rose-950/60 text-rose-400'
                    }`}>
                      {item.status}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
