'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import settingsInit from '@/../content/settings.json';

type Settings = typeof settingsInit;

export default function SettingsAdmin() {
  const router = useRouter();
  const [settings, setSettings] = useState<Settings>(settingsInit);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const upd = (path: string[], value: string) => {
    setSettings((prev) => {
      const copy = JSON.parse(JSON.stringify(prev)) as Settings;
      let obj: Record<string, unknown> = copy as unknown as Record<string, unknown>;
      for (let i = 0; i < path.length - 1; i++) {
        obj = obj[path[i]] as Record<string, unknown>;
      }
      obj[path[path.length - 1]] = value;
      return copy;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    setError('');

    const res = await fetch('/api/admin/save-settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
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
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push('/admin')} className="text-gray-500 hover:text-gray-800 text-sm">← Tableau de bord</button>
          <span className="text-gray-300">/</span>
          <h1 className="font-black text-gray-900">Paramètres du site</h1>
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

      <div className="max-w-3xl mx-auto p-6 space-y-6">
        {/* Identité */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="font-black text-lg text-gray-900 mb-4">Identité du site</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Nom du site</label>
              <input type="text" value={settings.siteName} onChange={(e) => upd(['siteName'], e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Slogan</label>
              <input type="text" value={settings.slogan} onChange={(e) => upd(['slogan'], e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Description (meta SEO)</label>
              <textarea rows={3} value={settings.description} onChange={(e) => upd(['description'], e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none resize-none" />
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="font-black text-lg text-gray-900 mb-4">Contact</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Adresse e-mail</label>
              <input type="email" value={settings.contact?.email ?? ''} onChange={(e) => upd(['contact', 'email'], e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none" />
            </div>
          </div>
        </section>

        {/* Réseaux sociaux */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="font-black text-lg text-gray-900 mb-4">Réseaux sociaux</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">URL Facebook</label>
              <input type="url" value={settings.reseaux?.facebook ?? ''} onChange={(e) => upd(['reseaux', 'facebook'], e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none" />
            </div>
            {(settings.reseaux as Record<string, string>)?.instagram !== undefined && (
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">URL Instagram</label>
                <input type="url" value={(settings.reseaux as Record<string, string>)?.instagram ?? ''}
                  onChange={(e) => upd(['reseaux', 'instagram'], e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none" />
              </div>
            )}
          </div>
        </section>

        {/* Permanences */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="font-black text-lg text-gray-900 mb-4">Permanence</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Adresse</label>
              <input type="text" value={settings.permanence?.adresse ?? ''} onChange={(e) => upd(['permanence', 'adresse'], e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Horaires</label>
              <input type="text" value={settings.permanence?.horaires ?? ''} onChange={(e) => upd(['permanence', 'horaires'], e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Permanence 17ème km</label>
              <input type="text" value={settings.permanence?.permanence17 ?? ''} onChange={(e) => upd(['permanence', 'permanence17'], e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none" />
            </div>
          </div>
        </section>
      </div>

      {error && (
        <div className="fixed bottom-4 right-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl shadow text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
