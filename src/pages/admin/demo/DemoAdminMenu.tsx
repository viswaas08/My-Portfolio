import React, { useState, useEffect } from 'react';
import { 
  UtensilsCrossed, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Star, 
  Search, 
  Save, 
  X,
  Layers,
  Leaf
} from 'lucide-react';
import { DemoConfigStore, BusinessDemoStore, MenuItemConfig } from '../../../services/demoConfigStore';

export const DemoAdminMenu: React.FC = () => {
  const [bizId, setBizId] = useState(DemoConfigStore.getActiveBusinessId());
  const [store, setStore] = useState<BusinessDemoStore>(DemoConfigStore.getStore(bizId));
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Edit / Add Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItemConfig>({
    id: '',
    name: '',
    description: '',
    price: 150,
    category: store.categories[0] || 'Main Course',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    isVeg: true,
    isAvailable: true,
    isPopular: false,
    prepTime: '15 mins'
  });

  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const handleUpdate = () => {
      const activeId = DemoConfigStore.getActiveBusinessId();
      setBizId(activeId);
      const current = DemoConfigStore.getStore(activeId);
      setStore(current);
    };
    window.addEventListener('demo_config_changed', handleUpdate);
    return () => window.removeEventListener('demo_config_changed', handleUpdate);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleToggleAvailable = (itemId: string) => {
    const updatedMenu = store.menu.map(item => {
      if (item.id === itemId) {
        return { ...item, isAvailable: !item.isAvailable };
      }
      return item;
    });
    const updatedStore = { ...store, menu: updatedMenu };
    DemoConfigStore.saveStore(bizId, updatedStore);
    setStore(updatedStore);
    showToast('Item availability updated.');
  };

  const handleTogglePopular = (itemId: string) => {
    const updatedMenu = store.menu.map(item => {
      if (item.id === itemId) {
        return { ...item, isPopular: !item.isPopular };
      }
      return item;
    });
    const updatedStore = { ...store, menu: updatedMenu };
    DemoConfigStore.saveStore(bizId, updatedStore);
    setStore(updatedStore);
    showToast('Popular flag updated.');
  };

  const handleDeleteItem = (itemId: string) => {
    if (confirm('Are you sure you want to delete this menu item?')) {
      const updatedMenu = store.menu.filter(item => item.id !== itemId);
      const updatedStore = { ...store, menu: updatedMenu };
      DemoConfigStore.saveStore(bizId, updatedStore);
      setStore(updatedStore);
      showToast('Item removed from menu.');
    }
  };

  const handleOpenAddModal = () => {
    setIsEditing(false);
    setEditingItem({
      id: `m-${Date.now().toString().slice(-4)}`,
      name: '',
      description: '',
      price: 180,
      category: store.categories[0] || 'Main Course',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
      isVeg: true,
      isAvailable: true,
      isPopular: false,
      prepTime: '15 mins'
    });
    setModalOpen(true);
  };

  const handleOpenEditModal = (item: MenuItemConfig) => {
    setIsEditing(true);
    setEditingItem({ ...item });
    setModalOpen(true);
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem.name.trim()) {
      alert('Please provide an item name.');
      return;
    }

    let updatedMenu: MenuItemConfig[];
    if (isEditing) {
      updatedMenu = store.menu.map(item => item.id === editingItem.id ? editingItem : item);
    } else {
      updatedMenu = [editingItem, ...store.menu];
    }

    const updatedStore = { ...store, menu: updatedMenu };
    DemoConfigStore.saveStore(bizId, updatedStore);
    setStore(updatedStore);
    setModalOpen(false);
    showToast(isEditing ? 'Menu item updated successfully.' : 'New food item added to public menu!');
  };

  const filteredItems = store.menu.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <UtensilsCrossed className="w-6 h-6 text-sky-400" />
            <span>Menu & Catalog Management</span>
          </h2>
          <p className="text-xs text-slate-400">
            Add dishes, modify prices, and toggle availability for {store.business.name}
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-sky-600/20 transition cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Food Item</span>
        </button>
      </div>

      {toastMessage && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search food item by name or ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-hidden focus:border-sky-500"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-semibold focus:outline-hidden focus:border-sky-500"
        >
          <option value="all">All Categories ({store.menu.length})</option>
          {store.categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Food Items Table / Cards */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
        <div className="divide-y divide-slate-800">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs space-y-2">
              <p>No food items match the selected filter.</p>
              <button 
                onClick={handleOpenAddModal}
                className="text-sky-400 underline font-semibold"
              >
                Create a new food item
              </button>
            </div>
          ) : (
            filteredItems.map(item => (
              <div key={item.id} className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-800/40 transition">
                
                {/* Item Details */}
                <div className="flex items-start gap-4 flex-1">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover border border-slate-700 shrink-0"
                  />

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`w-3.5 h-3.5 rounded-xs border flex items-center justify-center shrink-0 ${
                        item.isVeg ? 'border-emerald-500 text-emerald-500' : 'border-red-500 text-red-500'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-emerald-500' : 'bg-red-500'}`} />
                      </span>

                      <h4 className="font-extrabold text-white text-sm sm:text-base">
                        {item.name}
                      </h4>

                      <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-bold">
                        {item.category}
                      </span>

                      {item.isPopular && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold flex items-center gap-0.5">
                          <Star className="w-2.5 h-2.5 fill-amber-400" />
                          <span>Popular</span>
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 max-w-xl">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-3 text-xs pt-1">
                      <span className="font-black text-sky-400 text-sm">
                        ₹{item.price}
                      </span>
                      {item.prepTime && (
                        <span className="text-slate-500 text-[11px]">
                          ⏱️ {item.prepTime}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Status Toggles & Actions */}
                <div className="flex flex-wrap items-center gap-2.5 border-t md:border-t-0 pt-3 md:pt-0 border-slate-800">
                  {/* Availability Badge Button */}
                  <button
                    onClick={() => handleToggleAvailable(item.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
                      item.isAvailable
                        ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                        : 'border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20'
                    }`}
                  >
                    {item.isAvailable ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Available: YES</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Available: NO</span>
                      </>
                    )}
                  </button>

                  {/* Popular Toggle Button */}
                  <button
                    onClick={() => handleTogglePopular(item.id)}
                    title="Toggle popular showcase"
                    className={`p-2 rounded-xl border text-xs transition ${
                      item.isPopular
                        ? 'border-amber-500/40 bg-amber-500/10 text-amber-400'
                        : 'border-slate-800 bg-slate-950 text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <Star className={`w-3.5 h-3.5 ${item.isPopular ? 'fill-amber-400' : ''}`} />
                  </button>

                  {/* Edit Button */}
                  <button
                    onClick={() => handleOpenEditModal(item)}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1 transition"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-sky-400" />
                    <span>Edit</span>
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))
          )}
        </div>
      </div>

      {/* Add / Edit Food Item Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="w-full max-w-xl bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-extrabold text-white text-base">
                {isEditing ? 'Edit Food Item' : 'Add New Food Item'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-300 mb-1">Item Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chicken Biryani"
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={editingItem.price}
                    onChange={(e) => setEditingItem({ ...editingItem, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Category *</label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                  >
                    {store.categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-300 mb-1">Description</label>
                  <textarea
                    rows={2}
                    placeholder="Ingredients and culinary style..."
                    value={editingItem.description}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-300 mb-1">Image URL</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={editingItem.image}
                    onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Preparation Time</label>
                  <input
                    type="text"
                    placeholder="e.g. 20 mins"
                    value={editingItem.prepTime || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, prepTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                  />
                </div>

                <div className="flex items-center gap-4 pt-4 sm:col-span-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-300">
                    <input
                      type="checkbox"
                      checked={editingItem.isVeg}
                      onChange={(e) => setEditingItem({ ...editingItem, isVeg: e.target.checked })}
                      className="w-4 h-4 rounded text-emerald-500"
                    />
                    <span>Vegetarian</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-300">
                    <input
                      type="checkbox"
                      checked={editingItem.isPopular}
                      onChange={(e) => setEditingItem({ ...editingItem, isPopular: e.target.checked })}
                      className="w-4 h-4 rounded text-amber-500"
                    />
                    <span>Popular Highlight</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-300">
                    <input
                      type="checkbox"
                      checked={editingItem.isAvailable}
                      onChange={(e) => setEditingItem({ ...editingItem, isAvailable: e.target.checked })}
                      className="w-4 h-4 rounded text-sky-500"
                    />
                    <span>Available to Order</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-sky-600/20"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isEditing ? 'Save Changes' : 'Add Item'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
