import React, { useState } from 'react';
import CursorGlow from './components/CursorGlow';
import Toast from './components/Toast';
import OfficialLetterDocument from './components/OfficialLetterDocument';
import AuthCard from './dashboards/AuthCard';
import StudentDashboard from './dashboards/StudentDashboard';
import StaffDashboard from './dashboards/StaffDashboard';
import CreatorDashboard from './dashboards/CreatorDashboard';
import { IconLogout, IconSparkles } from './components/Icons';

import {
  INITIAL_STAFF_LIST,
  INITIAL_COURSES,
  INITIAL_EVENTS,
  INITIAL_LETTERS,
} from './data/initialData';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [toast, setToast] = useState(null);
  const [activeLetterModal, setActiveLetterModal] = useState(null);

  // Global Application State
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [letters, setLetters] = useState(INITIAL_LETTERS);
  const [courses] = useState(INITIAL_COURSES);
  const [staffList] = useState(INITIAL_STAFF_LIST);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Actions
  const handleRegisterEvent = (eventId) => {
    if (!currentUser) return;
    setEvents((prev) =>
      prev.map((evt) => {
        if (evt.id === eventId) {
          return {
            ...evt,
            registeredStudents: [
              ...evt.registeredStudents,
              {
                name: currentUser.name,
                rollNo: currentUser.rollNo || 'N/A',
                email: currentUser.email,
                registeredAt: new Date().toISOString().split('T')[0],
              },
            ],
          };
        }
        return evt;
      })
    );
    showToast('Successfully registered for event!');
  };

  const handleSubmitLetter = ({ type, date, reason, staffName }) => {
    const newLetter = {
      id: `let-${Date.now().toString().slice(-4)}`,
      type,
      studentName: currentUser.name,
      rollNo: currentUser.rollNo || 'CS2023089',
      date,
      reason,
      staffName,
      status: 'Pending',
      submittedAt: new Date().toISOString().split('T')[0],
    };
    setLetters((prev) => [newLetter, ...prev]);
    showToast('Application submitted to faculty advisor!');
  };

  const handleApproveLetter = (letterId, staffName) => {
    setLetters((prev) =>
      prev.map((l) =>
        l.id === letterId
          ? {
              ...l,
              status: 'Approved',
              approvedBy: staffName,
              approvedAt: new Date().toISOString().split('T')[0],
            }
          : l
      )
    );
    showToast('Letter approved successfully');
  };

  const handleRejectLetter = (letterId) => {
    setLetters((prev) =>
      prev.map((l) => (l.id === letterId ? { ...l, status: 'Rejected' } : l))
    );
    showToast('Letter request rejected', 'error');
  };

  const handleCreateEvent = (newEventData) => {
    const created = {
      ...newEventData,
      id: `evt-${Date.now().toString().slice(-4)}`,
      creatorName: currentUser.name,
      registeredStudents: [],
    };
    setEvents((prev) => [created, ...prev]);
    showToast('New event created & published!');
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      <CursorGlow />
      <Toast toast={toast} onClose={() => setToast(null)} />
      
      {activeLetterModal && (
        <OfficialLetterDocument
          letter={activeLetterModal}
          onClose={() => setActiveLetterModal(null)}
        />
      )}

      {currentUser && (
        <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500 text-slate-950 font-black">
                C
              </div>
              <span className="font-extrabold tracking-tight text-white text-lg">
                Camploo<span className="text-cyan-400">.</span>
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-xs font-bold text-white">{currentUser.name}</p>
                <p className="text-[10px] uppercase tracking-wider text-cyan-400 font-mono">{currentUser.role}</p>
              </div>
              <button
                onClick={() => setCurrentUser(null)}
                className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
              >
                <IconLogout className="w-4 h-4" /> Exit
              </button>
            </div>
          </div>
        </header>
      )}

      <main className="mx-auto max-w-7xl px-4 py-8">
        {!currentUser ? (
          <AuthCard onLogin={setCurrentUser} />
        ) : currentUser.role === 'student' ? (
          <StudentDashboard
            user={currentUser}
            courses={courses}
            events={events}
            letters={letters.filter((l) => l.studentName === currentUser.name)}
            staffList={staffList}
            onRegisterEvent={handleRegisterEvent}
            onSubmitLetter={handleSubmitLetter}
            onViewLetter={setActiveLetterModal}
          />
        ) : currentUser.role === 'staff' ? (
          <StaffDashboard
            user={currentUser}
            letters={letters}
            onApproveLetter={handleApproveLetter}
            onRejectLetter={handleRejectLetter}
            onViewLetter={setActiveLetterModal}
          />
        ) : (
          <CreatorDashboard
            user={currentUser}
            events={events}
            onCreateEvent={handleCreateEvent}
          />
        )}
      </main>
    </div>
  );
}