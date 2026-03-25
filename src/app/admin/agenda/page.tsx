'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import agendaInit from '@/../content/pages/agenda.json';

type Evenement = {
  id: string;
  titre: string;
  date: string;
  heure: string;
  lieu: string;
  description: string;
  type: string;
};

export default function AgendaAdmin() {
  const router = useRouter();
  const [evenements, setEvenements] = useState<Evenement[]>((agendaInit.evenements ?? []) as Evenement[]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Evenement>({ id: '', titre: '', date: '', heure: '', lieu: '', description: '', type: '' });

  const openNew = () => {
    setForm({ id: Date.now().toString(), titre: '', date: '', heure: '', lieu: '', description: '', type: 'Réunion publique' });
    setEditId('__new__');
  };

  const openEdit = (evt: Evenement) => {
    setForm({ ...evt });
    setEditId(evt.id);
  };

  const closeForm = () => {
    setEditId(null);
  };

  const saveForm = () => {
    if (!form.titre || !form.date) return;
    if (editId === '__new__') {
      setEvenements((p) => [...p, form]);
    } else {
      setEvenements((p) => p.map((e) => e.id === editId ? form : e));
    }
    closeForm();
  };

  const deleteEvt = (id: string) => {
    setEvenements((p) => p.filter((e) => e.id !== id));
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    setError('');

    const res = await fetch('/api/admin/save-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: 'agenda', content: { ...agendaInit, evenements } }),
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
          <h1 className="font-black text-gray-900">Agenda</h1>
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

      <div className="max-w-4xl mx-auto px-6 py-10">
        {error && <p className="mb-4 p-3 bg-red-50 text-red-700 rounded-xl text-sm">{error}</p>}

        <button
          onClick={openNew}
          className="mb-6 flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-white transition-transform hover:scale-105"
          style={{ background: '#4EB168' }}
        >
          + Ajouter un événement
        </button>

        {/* Formulaire inline */}
        {editId && (
          <div className="mb-8 bg-white rounded-2xl p-6 shadow-md border-l-4" style={{ borderColor: '#9C35DD' }}>
            <h2 className="font-black text-gray-900 mb-4">{editId === '__new__' ? 'Nouvel événement' : 'Modifier l\'événement'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Titre *</label>
                <input type="text" value={form.titre} onChange={(e) => setForm({ ...form, titre: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none" placeholder="Titre de l'événement" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Date *</label>
                <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Heure</label>
                <input type="text" value={form.heure} onChange={(e) => setForm({ ...form, heure: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none" placeholder="ex: 18h30" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Lieu</label>
                <input type="text" value={form.lieu} onChange={(e) => setForm({ ...form, lieu: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none" placeholder="Adresse ou nom du lieu" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Type</label>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none">
                  <option>Réunion publique</option>
                  <option>Marché forain</option>
                  <option>Porte à porte</option>
                  <option>Permanence</option>
                  <option>Autre</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none resize-none" />
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={saveForm} className="px-5 py-2.5 rounded-xl font-bold text-white" style={{ background: '#9C35DD' }}>
                {editId === '__new__' ? 'Ajouter' : 'Mettre à jour'}
              </button>
              <button onClick={closeForm} className="px-5 py-2.5 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200">
                Annuler
              </button>
            </div>
          </div>
        )}

        {/* Liste */}
        {evenements.length === 0 ? (
          <p className="text-center text-gray-500 py-12">Aucun événement. Ajoutez-en un !</p>
        ) : (
          <div className="space-y-3">
            {evenements.sort((a, b) => a.date.localeCompare(b.date)).map((evt) => (
              <div key={evt.id} className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-gray-900">{evt.titre}</p>
                  <p className="text-sm text-gray-500">{evt.date}{evt.heure ? ` · ${evt.heure}` : ''}{evt.lieu ? ` · ${evt.lieu}` : ''}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => openEdit(evt)} className="px-3 py-1.5 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700">Modifier</button>
                  <button onClick={() => deleteEvt(evt.id)} className="px-3 py-1.5 text-sm rounded-lg bg-red-50 hover:bg-red-100 text-red-600">Supprimer</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
