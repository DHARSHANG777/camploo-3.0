import React, { useState } from 'react';
import { IconPlus, IconUsers, IconCalendar, IconMapPin } from '../components/Icons';

export default function CreatorDashboard({ user, events, onCreateEvent }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Hackathon');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [venue, setVenue] = useState('');
  const [description, setDescription] = useState('');
  const [maxCapacity, setMaxCapacity] = useState(100);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !startDate || !venue) return;

    onCreateEvent({
      title,
      category,
      startDate,
      endDate: endDate || startDate,
      venue,
      description,
      maxCapacity: Number(maxCapacity),
    });

    setTitle('');
    setVenue('');
    setDescription('');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
        <div>
          <h2 className="text-xl font-bold text-white">{user.name}</h2>
          <p className="text-xs text-purple-400 font-mono">Event Creator & Organizer Hub</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Form Column */}
        <div className="lg:col-span-1 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 h-fit">
          <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
            <IconPlus className="w-4 h-4 text-purple-400" /> Host New Event
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Event Title</label>
              <input
                type="text"
                required
                placeholder="e.g. AI Innovation Summit"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white"
              >
                <option value="Hackathon">Hackathon</option>
                <option value="Workshop">Workshop</option>
                <option value="Exhibition">Exhibition</option>
                <option value="Seminar">Seminar</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Start Date</label>
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Venue</label>
              <input
                type="text"
                required
                placeholder="Auditorium 1"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Description</label>
              <textarea
                rows={3}
                placeholder="Event brief..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-purple-600 py-2.5 text-xs font-bold text-white hover:bg-purple-500 transition-all"
            >
              Publish Event
            </button>
          </form>
        </div>

        {/* Managed Events List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-base font-bold text-white mb-2">Your Published Events</h3>
          <div className="grid gap-4">
            {events.map((evt) => (
              <div key={evt.id} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-400 border border-purple-500/20">
                    {evt.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400">
                    <IconUsers className="w-4 h-4" /> {evt.registeredStudents.length} / {evt.maxCapacity} Seats
                  </div>
                </div>

                <h4 className="text-lg font-bold text-white mb-1">{evt.title}</h4>
                <p className="text-xs text-slate-400 mb-3">{evt.description}</p>

                <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-500 border-t border-slate-800/80 pt-3">
                  <span className="flex items-center gap-1"><IconCalendar className="w-3.5 h-3.5" /> {evt.startDate}</span>
                  <span className="flex items-center gap-1"><IconMapPin className="w-3.5 h-3.5" /> {evt.venue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
