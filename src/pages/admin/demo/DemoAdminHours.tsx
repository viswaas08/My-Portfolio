import React, { useState, useEffect } from 'react';
import { CalendarDays, Save, CheckCircle2, Plus, Trash2, Clock } from 'lucide-react';
import { DemoConfigStore, BusinessDemoStore, DayHours } from '../../../services/demoConfigStore';

export const DemoAdminHours: React.FC = () => {
  const [bizId, setBizId] = useState(DemoConfigStore.getActiveBusinessId());
  const [store, setStore] = useState<BusinessDemoStore>(DemoConfigStore.getStore(bizId));
  const [hours, setHours] = useState<DayHours[]>(store.hours);
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      const activeId = DemoConfigStore.getActiveBusinessId();
      setBizId(activeId);
      const current = DemoConfigStore.getStore(activeId);
      setStore(current);
      setHours(current.hours);
    };
    window.addEventListener('demo_config_changed', handleUpdate);
    return () => window.removeEventListener('demo_config_changed', handleUpdate);
  }, []);

  const handleToggleClosed = (dayName: DayHours['day']) => {
    const updated = hours.map(h => {
      if (h.day === dayName) {
        return { ...h, isClosed: !h.isClosed };
      }
      return h;
    });
    setHours(updated);
  };

  const handleAddShift = (dayName: DayHours['day']) => {
    const updated = hours.map(h => {
      if (h.day === dayName) {
        return {
          ...h,
          shifts: [...h.shifts, { name: 'Shift', open: '18:30', close: '22:30' }]
        };
      }
      return h;
    });
    setHours(updated);
  };

  const handleRemoveShift = (dayName: DayHours['day'], shiftIndex: number) => {
    const updated = hours.map(h => {
      if (h.day === dayName) {
        return {
          ...h,
          shifts: h.shifts.filter((_, idx) => idx !== shiftIndex)
        };
      }
      return h;
    });
    setHours(updated);
  };

  const handleUpdateShift = (dayName: DayHours['day'], shiftIndex: number, field: 'name' | 'open' | 'close', value: string) => {
    const updated = hours.map(h => {
      if (h.day === dayName) {
        const copyShifts = [...h.shifts];
        copyShifts[shiftIndex] = { ...copyShifts[shiftIndex], [field]: value };
        return { ...h, shifts: copyShifts };
      }
      return h;
    });
    setHours(updated);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedStore = { ...store, hours };
    DemoConfigStore.saveStore(bizId, updatedStore);
    setStore(updatedStore);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-amber-400" />
            <span>Weekly Operating Hours</span>
          </h2>
          <p className="text-xs text-slate-400">
            Configure multiple daily shifts (Lunch & Dinner) and closed days for {store.business.name}
          </p>
        </div>

        {savedNotice && (
          <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-1.5 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4" />
            <span>Hours Saved & Live!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        {hours.map(dayItem => (
          <div key={dayItem.day} className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-extrabold text-sm text-white w-28">
                  {dayItem.day}
                </span>

                <button
                  type="button"
                  onClick={() => handleToggleClosed(dayItem.day)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                    dayItem.isClosed
                      ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  }`}
                >
                  {dayItem.isClosed ? 'Closed All Day' : 'Open'}
                </button>
              </div>

              {!dayItem.isClosed && (
                <button
                  type="button"
                  onClick={() => handleAddShift(dayItem.day)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5 text-sky-400" />
                  <span>Add Shift</span>
                </button>
              )}
            </div>

            {!dayItem.isClosed && (
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                {dayItem.shifts.map((shift, idx) => (
                  <div key={idx} className="flex flex-wrap items-center gap-3 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <input
                      type="text"
                      placeholder="e.g. Lunch / Dinner"
                      value={shift.name}
                      onChange={(e) => handleUpdateShift(dayItem.day, idx, 'name', e.target.value)}
                      className="w-28 px-2 py-1 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-semibold"
                    />

                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>Open:</span>
                      <input
                        type="time"
                        value={shift.open}
                        onChange={(e) => handleUpdateShift(dayItem.day, idx, 'open', e.target.value)}
                        className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>Close:</span>
                      <input
                        type="time"
                        value={shift.close}
                        onChange={(e) => handleUpdateShift(dayItem.day, idx, 'close', e.target.value)}
                        className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                    </div>

                    {dayItem.shifts.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveShift(dayItem.day, idx)}
                        className="p-1 rounded-lg text-slate-500 hover:text-red-400 ml-auto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-600/20 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save All Operating Hours</span>
          </button>
        </div>
      </form>
    </div>
  );
};
