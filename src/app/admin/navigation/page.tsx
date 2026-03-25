'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import navDataInit from '@/../content/navigation.json';

type NavItem = {
  id: string;
  label: string;
  href: string;
  visible: boolean;
};

export default function NavigationAdmin() {
  const router = useRouter();
  const [items, setItems] = useState<NavItem[]>(navDataInit.items as NavItem[]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const update = (id: string, field: keyof NavItem, value: string | boolean) => {
    setItems((prev) => prev.map((item) => item.id === id ? { ...item, [field]: value } : item));
  };

  const addItem = () => {
    const newId = Date.now().toString();
    setItems((prev) => [...prev, { id: newId, label: 'Nouveau lien', href: '/nouveau', visible: true }]);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const moveItem = (id: string, dir: -1 | 1) => {
    const idx = items.findIndex((item) => item.id === id);
    if (idx < 0) return;
    const newItems = [...items];
    const swap = idx + dir;
    if (swap < 0 || swap >= newItems.length) return;
    [newItems[idx], newItems[swap]] = [newItems[swap], newItems[idx]];
    setItems(newItems);
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    setError('');

    const res = await fetch('/api/admin/save-navigation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: items }),
    });

    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else {
      const data = await res.json() as { error?: string };
      setError(data.error ?? 'Erreur');
    }
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Barre admin */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push('/admin')} className="text-gray-500 hover:text-gray-800 text-sm">← Tableau de bord</button>
          <span className="text-gray-300">/</span>
          <h1 className="font-black text-gray-900">Navigation</h1>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-green-600 text-sm font-semibold">✅ Sauvegardé !</span>}
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl font-bold text-white disabled:opacity-60"
            style={{ background: '#9C35DD' }}
          >
            {saving ? 'Sauvegarde...' : 'Sauvegarder'}
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <p className="text-sm text-gray-600 mb-6">Gérez les éléments du menu de navigation. Vous pouvez les réordonner, les masquer ou les supprimer.</p>

        {error && <p className="mb-4 p-3 bg-red-50 text-red-700 rounded-xl text-sm">{error}</p>}

        <div className="space-y-3">
          {items.map((item, idx) => (
            <div key={item.id} className={`bg-white rounded-xl p-4 shadow-sm border ${item.visible ? 'border-gray-200' : 'border-gray-100 opacity-60'}`}>
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto_auto_auto] gap-3 items-center">
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => update(item.id, 'label', e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 focus:outline-none"
                  placeholder="Libellé"
                />
                <input
                  type="text"
                  value={item.href}
                  onChange={(e) => update(item.id, 'href', e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 font-mono focus:outline-none"
                  placeholder="/url"
                />
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={item.visible}
                    onChange={(e) => update(item.id, 'visible', e.target.checked)}
                    className="w-4 h-4"
                  />
                  Visible
                </label>
                <div className="flex gap-1">
                  <button onClick={() => moveItem(item.id, -1)} disabled={idx === 0} className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 text-sm">↑</button>
                  <button onClick={() => moveItem(item.id, 1)} disabled={idx === items.length - 1} className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30 text-sm">↓</button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 text-sm"
                  title="Supprimer"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addItem}
          className="mt-4 flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-dashed border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-colors text-sm font-semibold w-full justify-center"
        >
          + Ajouter un élément
        </button>
      </div>
    </div>
  );
}
