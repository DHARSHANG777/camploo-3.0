import React, { useState } from 'react';
import TiltCard from '../components/TiltCard';
import { IconCalendar, IconFileText, IconMapPin, IconClock, IconEye, IconPlus, IconCheckCircle, IconBarChart } from '../components/Icons';

export default function StudentDashboard({
  user,
  courses,
  events,
  letters,
  staffList,
  onRegisterEvent,
  onSubmitLetter,
  onViewLetter
}) {
  const [tab, setTab] = useState('attendance');

  // Letter Form state
  const [type, setType] = useState('OD');
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');
  const [staffName, setStaffName] = useState(staffList[0]?.name || '');

  const handleLetterSubmit = (e) => {
    e.preventDefault();
    if (!date || !reason) return;
    onSubmitLetter({ type, date, reason, staffName });
    setDate('');
    setReason('');
  };

  const calculateTotalAttendance = () => {
    const totalConducted = courses.reduce((acc, c) => acc + c.conducted, 0);
    const totalAttended = courses.reduce((acc, c) => acc + c.attended, 0);
    return Math.round((totalAttended / totalConducted) * 100) || 0;
  };

  const totalPercentage = calculateTotalAttendance();

  return (
    <div className="space-y-8">
      {/* Header Profile Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold text-xl">
            {user.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{user.name}</h2>
            <p className="text-xs text-slate-400 font-mono">Roll: {user.rollNo} • {user.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
          <div>
            <p className="text-xs text-slate-400">Overall Attendance</p>
            <p className={`text-2xl font-black ${totalPercentage >= 75 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {totalPercentage}%
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Letters Submitted</p>
            <p className="text-2xl font-black text-white">{letters.length}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800">
        <button
          onClick={() => setTab('attendance')}
          className={`flex items-center gap-2 border-b-2 px-6 py-3 text-sm font-semibold transition-all ${
            tab === 'attendance' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <IconBarChart className="w-4 h-4" /> Attendance Tracker
        </button>
        <button
          onClick={() => setTab('events')}
          className={`flex items-center gap-2 border-b-2 px-6 py-3 text-sm font-semibold transition-all ${
            tab === 'events' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <IconCalendar className="w-4 h-4" /> Campus Events
        </button>
        <button
          onClick={() => setTab('letters')}
          className={`flex items-center gap-2 border-b-2 px-6 py-3 text-sm font-semibold transition-all ${
            tab === 'letters' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <IconFileText className="w-4 h-4" /> OD / Leave Requests
        </button>
      </div>

      {/* TAB 1: ATTENDANCE */}
      {tab === 'attendance' && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => {
            const pct = Math.round((course.attended / course.conducted) * 100);
            return (
              <TiltCard key={course.code}>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="rounded-md bg-slate-800 px-2 py-1 font-mono text-xs font-semibold text-cyan-400">
                      {course.code}
                    </span>
                    <span className={`text-sm font-bold ${pct >= 75 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {pct}%
                    </span>
                  </div>
                  <h4 className="font-semibold text-slate-100 text-sm mb-4 line-clamp-1">{course.name}</h4>
                  
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-3">
                    <div 
                      className={`h-full transition-all duration-500 ${pct >= 75 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-xs text-slate-400 font-mono">
                    <span>Attended: {course.attended}</span>
                    <span>Conducted: {course.conducted}</span>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      )}

      {/* TAB 2: EVENTS */}
      {tab === 'events' && (
        <div className="grid gap-6 md:grid-cols-2">
          {events.map((evt) => {
            const isRegistered = evt.registeredStudents.some(s => s.email === user.email);
            return (
              <div key={evt.id} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400 border border-cyan-500/20">
                      {evt.category}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">By {evt.creatorName}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{evt.title}</h3>
                  <p className="text-xs text-slate-300 mb-4 leading-relaxed">{evt.description}</p>
                  
                  <div className="space-y-1.5 text-xs text-slate-400 mb-6 font-mono">
                    <div className="flex items-center gap-2">
                      <IconCalendar className="w-4 h-4 text-cyan-400" /> {evt.startDate} to {evt.endDate}
                    </div>
                    <div className="flex items-center gap-2">
                      <IconMapPin className="w-4 h-4 text-cyan-400" /> {evt.venue}
                    </div>
                  </div>
                </div>

                <button
                  disabled={isRegistered}
                  onClick={() => onRegisterEvent(evt.id)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    isRegistered
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50 cursor-default'
                      : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
                  }`}
                >
                  {isRegistered ? (
                    <> <IconCheckCircle className="w-4 h-4" /> Registered </>
                  ) : (
                    <> Register Now </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 3: LETTERS */}
      {tab === 'letters' && (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 h-fit">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <IconPlus className="w-4 h-4 text-cyan-400" /> New Application
            </h3>
            <form onSubmit={handleLetterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white"
                >
                  <option value="OD">On Duty (OD)</option>
                  <option value="Leave">Leave Application</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Target Staff Approver</label>
                <select
                  value={staffName}
                  onChange={(e) => setStaffName(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white"
                >
                  {staffList.map((s) => (
                    <option key={s.id} value={s.name}>{s.name} ({s.dept})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Date / Duration</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2026-10-12"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Reason / Justification</label>
                <textarea
                  required
                  rows={3}
                  placeholder="State your reason clearly..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-cyan-500 py-2.5 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition-all"
              >
                Submit Application
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-base font-bold text-white mb-2">Submitted Applications</h3>
            {letters.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No applications submitted yet.</p>
            ) : (
              letters.map((letItem) => (
                <div key={letItem.id} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-cyan-400">{letItem.type}</span>
                      <span className="text-xs text-slate-400">• {letItem.date}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                        letItem.status === 'Approved' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40' :
                        letItem.status === 'Rejected' ? 'bg-rose-950 text-rose-400 border border-rose-800/40' :
                        'bg-amber-950 text-amber-400 border border-amber-800/40'
                      }`}>
                        {letItem.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 font-medium line-clamp-1">{letItem.reason}</p>
                    <p className="text-[10px] text-slate-500 mt-1 font-mono">Approver: {letItem.staffName}</p>
                  </div>

                  <button
                    onClick={() => onViewLetter(letItem)}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700"
                  >
                    <IconEye className="w-3.5 h-3.5" /> View Letter
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
