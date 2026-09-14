import React from 'react';
import { IconPrinter } from './Icons';

export default function OfficialLetterDocument({ letter, onClose }) {
  if (!letter) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
      <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 p-8 text-slate-100 shadow-2xl">
        <div className="print-hidden mb-6 flex items-center justify-between border-b border-slate-800 pb-4">
          <h3 className="text-lg font-bold text-cyan-400">Document Preview</h3>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-bold text-slate-950 hover:bg-cyan-400"
            >
              <IconPrinter className="h-4 w-4" /> Print / Save PDF
            </button>
            <button onClick={onClose} className="rounded-lg bg-slate-800 px-3 py-2 text-sm font-semibold hover:bg-slate-700">
              Close
            </button>
          </div>
        </div>

        {/* Printable Area */}
        <div id="printable-letter" className="space-y-6 rounded-xl bg-white p-8 text-slate-900 shadow-inner">
          <div className="border-b-2 border-slate-900 pb-4 text-center">
            <h1 className="text-2xl font-black uppercase tracking-wider text-slate-900">Camploo University Ecosystem</h1>
            <p className="text-xs uppercase font-semibold text-slate-600">Official Academic Request Authorization</p>
          </div>

          <div className="flex justify-between text-xs font-mono text-slate-600">
            <div><strong>Ref ID:</strong> {letter.id}</div>
            <div><strong>Submitted:</strong> {letter.submittedAt}</div>
          </div>

          <div className="space-y-1 text-sm">
            <p><strong>To:</strong> {letter.staffName}</p>
            <p><strong>Department:</strong> Faculty Academic Advisory</p>
            <p><strong>From:</strong> {letter.studentName} ({letter.rollNo})</p>
            <p><strong>Date(s) of Absence/OD:</strong> {letter.date}</p>
          </div>

          <div className="border-l-4 border-cyan-500 bg-slate-50 p-4 font-mono text-sm leading-relaxed text-slate-800">
            <p className="font-sans font-bold text-slate-900 mb-1">Subject: Request for {letter.type} Authorization</p>
            <p className="font-sans">{letter.reason}</p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between items-end">
            <div className="space-y-1 text-xs text-slate-500">
              <p>Status: <strong className={letter.status === 'Approved' ? 'text-emerald-700' : 'text-amber-700'}>{letter.status}</strong></p>
              {letter.approvedBy && <p>Approved By: {letter.approvedBy}</p>}
              {letter.approvedAt && <p>Timestamp: {letter.approvedAt}</p>}
            </div>
            <div className="text-center">
              <div className="h-12 w-36 border-b border-slate-400 mb-1 flex items-end justify-center font-mono text-xs text-slate-400 italic">
                {letter.status === 'Approved' ? letter.approvedBy : 'Pending Digital Sign'}
              </div>
              <p className="text-[10px] uppercase font-bold text-slate-500">Authorized Signature</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
