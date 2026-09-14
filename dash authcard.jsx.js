import React, { useState } from 'react';
import TiltCard from '../components/TiltCard';
import AnimatedText from '../components/AnimatedText';
import { IconGraduationCap, IconShieldCheck, IconSparkles, IconArrowRight } from '../components/Icons';

export default function AuthCard({ onLogin }) {
  const [role, setRole] = useState('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rollNo, setRollNo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    onLogin({
      name,
      email,
      role,
      rollNo: role === 'student' ? rollNo || 'CS2023089' : undefined,
    });
  };

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center p-4">
      <TiltCard className="w-full max-w-md">
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-2xl">
          <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
          
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-400 mb-3">
              <IconSparkles className="w-4 h-4" /> Camploo Ecosystem
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white">
              <AnimatedText text="Welcome Back" />
            </h1>
            <p className="mt-2 text-xs text-slate-400">Select your persona to enter the portal</p>
          </div>

          <div className="mb-6 grid grid-cols-3 gap-2 rounded-xl bg-slate-950 p-1.5 border border-slate-800">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-xs font-bold transition-all ${
                role === 'student' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25' : 'text-slate-400 hover:text-white'
              }`}
            >
              <IconGraduationCap className="w-4 h-4" /> Student
            </button>
            <button
              type="button"
              onClick={() => setRole('staff')}
              className={`flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-xs font-bold transition-all ${
                role === 'staff' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25' : 'text-slate-400 hover:text-white'
              }`}
            >
              <IconShieldCheck className="w-4 h-4" /> Staff
            </button>
            <button
              type="button"
              onClick={() => setRole('creator')}
              className={`flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-xs font-bold transition-all ${
                role === 'creator' ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25' : 'text-slate-400 hover:text-white'
              }`}
            >
              <IconSparkles className="w-4 h-4" /> Creator
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Rivera"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@campus.edu"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>

            {role === 'student' && (
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Roll Number</label>
                <input
                  type="text"
                  required
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  placeholder="CS2023089"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>
            )}

            <button
              type="submit"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition-transform active:scale-95"
            >
              Launch Dashboard <IconArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </TiltCard>
    </div>
  );
}