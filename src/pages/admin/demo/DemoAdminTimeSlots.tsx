import React, { useState, useEffect } from 'react';
import { Clock, Save, CheckCircle2, Calendar, Plus, Trash2, AlertCircle } from 'lucide-react';
import { DemoConfigStore, BusinessDemoStore, TimeSlotSettings, SpecialDateOverride } from '../../../services/demoConfigStore';

export const DemoAdminTimeSlots: React.FC = () => {
  const [bizId, setBizId] = useState(DemoConfigStore.getActiveBusinessId());
  const [store, setStore] = useState<BusinessDemoStore>(DemoConfigStore.getStore(bizId));
  const [timeSlots, setTimeSlots] = useState<TimeSlotSettings>(store.timeSlots);
  const [specialDates, setSpecialDates] = useState<SpecialDateOverride[]>(store.specialDates);
  const [savedNotice, setSavedNotice] = useState(false);

  // New holiday/date form
  const [newDate, setNewDate] = useState('');
  const [newReason, setNewReason] = useState('');

  useEffect(() => {
    const handleUpdate = () => {
      const activeId = DemoConfigStore.getActiveBusinessId();
      setBizId(activeId);
      const current = DemoConfigStore.getStore(activeId);
      setStore(current);
      setTimeSlots(current.timeSlots);
      setSpecialDates(current.specialDates);
    };
    window.addEventListener('demo_config_changed', handleUpdate);
    return () => window.removeEventListener('demo_config_changed', handleUpdate);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedStore = { ...store, timeSlots, specialDates };
    DemoConfigStore.saveStore(bizId, updatedStore);
    setStore(updatedStore);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleAddHoliday = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDate || !newReason.trim()) {
      alert('Please provide a date and description.');
      return;
    }
    const updated = [...specialDates, { date: newDate, isClosed: true, reason: newReason.trim() }];
    setSpecialDates(updated);
    setNewDate('');
    setNewReason('');
  };

  const handleDeleteHoliday = (dateStr: string) => {
    const updated = specialDates.filter(d => d.date !== dateStr);
    setSpecialDates(updated);
  };

  // Preview generated slots for today
  const todayStr = DemoConfigStore.getIstDateString();
  const { slots } = DemoConfigStore.generateTimeSlots(bizId, todayStr);

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Clock className="w-6 h-6 text-sky-400" />
            <span>Time Slots & Booking Windows (IST)</span>
          </h2>
          <p className="text-xs text-slate-400">
            Define slot generation rules, minimum buffers, and calendar holiday closures
          </p>
        </div>

        {savedNotice && (
          <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-1.5 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4" />
            <span>Slot Engine Updated!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Core Slot Rules */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400">
            Slot Generation Engine
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Slot Interval (Minutes)
              </label>
              <select
                value={timeSlots.slotInterval}
                onChange={(e) => setTimeSlots({ ...timeSlots, slotInterval: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-bold"
              >
                <option value={15}>15 Minutes</option>
                <option value={30}>30 Minutes (Recommended)</option>
                <option value={45}>45 Minutes</option>
                <option value={60}>60 Minutes</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Min Advance Notice (Minutes)
              </label>
              <input
                type="number"
                min="0"
                step="5"
                value={timeSlots.minAdvanceBookingMinutes}
                onChange={(e) => setTimeSlots({ ...timeSlots, minAdvanceBookingMinutes: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-bold"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Past slots are automatically excluded for today</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Max Days in Advance
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={timeSlots.maxBookingDays}
                onChange={(e) => setTimeSlots({ ...timeSlots, maxBookingDays: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-bold"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Limit how far ahead customers can reserve</span>
            </div>
          </div>

          {/* Generated Slots Live Preview */}
          <div className="pt-3 border-t border-slate-800">
            <span className="text-xs font-bold text-slate-400 block mb-2">
              Preview Generated Available Slots for Today ({slots.length} Slots in IST):
            </span>
            <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-2 rounded-xl bg-slate-950 border border-slate-800">
              {slots.length === 0 ? (
                <span className="text-xs text-slate-500">No more slots remaining for today's operating hours.</span>
              ) : (
                slots.map(s => (
                  <span key={s} className="px-2.5 py-1 rounded-lg bg-sky-950/80 border border-sky-800/80 text-sky-300 text-[11px] font-mono font-bold">
                    {s}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Special Holiday Closures */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400">
            Date Availability & Holiday Closures
          </h3>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
            />
            <input
              type="text"
              placeholder="Reason (e.g. Deepavali Holiday, Private Event)..."
              value={newReason}
              onChange={(e) => setNewReason(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
            />
            <button
              type="button"
              onClick={handleAddHoliday}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5 text-sky-400" />
              <span>Block Date</span>
            </button>
          </div>

          <div className="space-y-2">
            {specialDates.length === 0 ? (
              <span className="text-xs text-slate-500">No special closed dates configured.</span>
            ) : (
              specialDates.map(item => (
                <div key={item.date} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-red-400 mr-3">{item.date}</span>
                    <span className="text-slate-300">{item.reason}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteHoliday(item.date)}
                    className="p-1 rounded-lg text-slate-500 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-sky-600/20 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Slot Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
};
