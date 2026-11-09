import React, { useState, useEffect } from 'react';
import { Layers, Plus, Trash2, ArrowUp, ArrowDown, CheckCircle2, Save } from 'lucide-react';
import { DemoConfigStore, BusinessDemoStore } from '../../../services/demoConfigStore';

export const DemoAdminCategories: React.FC = () => {
  const [bizId, setBizId] = useState(DemoConfigStore.getActiveBusinessId());
  const [store, setStore] = useState<BusinessDemoStore>(DemoConfigStore.getStore(bizId));
  const [categories, setCategories] = useState<string[]>(store.categories);
  const [newCatName, setNewCatName] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const handleUpdate = () => {
      const activeId = DemoConfigStore.getActiveBusinessId();
      setBizId(activeId);
      const current = DemoConfigStore.getStore(activeId);
      setStore(current);
      setCategories(current.categories);
    };
    window.addEventListener('demo_config_changed', handleUpdate);
    return () => window.removeEventListener('demo_config_changed', handleUpdate);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newCatName.trim();
    if (!trimmed) return;
    if (categories.includes(trimmed)) {
      alert('This category already exists.');
      return;
    }

    const updated = [...categories, trimmed];
    setCategories(updated);
    const updatedStore = { ...store, categories: updated };
    DemoConfigStore.saveStore(bizId, updatedStore);
    setStore(updatedStore);
    setNewCatName('');
    showToast(`Added category "${trimmed}"`);
  };

  const handleDeleteCategory = (catName: string) => {
    if (categories.length <= 1) {
      alert('You must have at least one category.');
      return;
    }
    if (confirm(`Delete category "${catName}"? Food items in this category may need reassignment.`)) {
      const updated = categories.filter(c => c !== catName);
      setCategories(updated);
      const updatedStore = { ...store, categories: updated };
      DemoConfigStore.saveStore(bizId, updatedStore);
      setStore(updatedStore);
      showToast(`Deleted category "${catName}"`);
    }
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= categories.length) return;

    const copy = [...categories];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;

    setCategories(copy);
    const updatedStore = { ...store, categories: copy };
    DemoConfigStore.saveStore(bizId, updatedStore);
    setStore(updatedStore);
    showToast('Category sequence reordered.');
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Layers className="w-6 h-6 text-sky-400" />
            <span>Category Management</span>
          </h2>
          <p className="text-xs text-slate-400">
            Create, reorder, or delete food and service categories for {store.business.name}
          </p>
        </div>

        {toastMessage && (
          <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-1.5 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>

      {/* Add Category Form */}
      <form onSubmit={handleAddCategory} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex gap-2">
        <input
          type="text"
          placeholder="New Category name (e.g. Chinese, Tandoori, Mocktails)..."
          value={newCatName}
          onChange={(e) => setNewCatName(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs placeholder-slate-500"
        />
        <button
          type="submit"
          className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-sky-600/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </form>

      {/* Categories List */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden divide-y divide-slate-800">
        {categories.map((cat, index) => {
          const itemCount = store.menu.filter(m => m.category === cat).length;
          return (
            <div key={cat} className="p-4 flex items-center justify-between gap-3 hover:bg-slate-800/40 transition">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-400 text-xs font-bold flex items-center justify-center">
                  {index + 1}
                </span>
                <div>
                  <h4 className="font-extrabold text-sm text-white">{cat}</h4>
                  <span className="text-[11px] text-slate-500">{itemCount} items attached</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => handleMove(index, 'up')}
                  className="p-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-400 hover:text-white disabled:opacity-30"
                  title="Move Up"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  disabled={index === categories.length - 1}
                  onClick={() => handleMove(index, 'down')}
                  className="p-1.5 rounded-lg border border-slate-800 bg-slate-950 text-slate-400 hover:text-white disabled:opacity-30"
                  title="Move Down"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteCategory(cat)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-red-400 transition ml-2"
                  title="Delete Category"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
