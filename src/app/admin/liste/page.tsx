'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import listeInit from '@/../content/pages/la-liste.json';

type Membre = {
  numero: number;
  nom: string;
  photo: string;
  bio: string;
  role: string;
  quartier: string;
};

export default function ListeAdmin() {
  const router = useRouter();
  const [membres, setMembres] = useState<Membre[]>(listeInit.membres as Membre[]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [form, setForm] = useState<Membre>({ numero: 0, nom: '', photo: '', bio: '', role: '', quartier: '' });
  const [search, setSearch] = useState('');

  const openEdit = (idx: number) => {
    setForm({ ...membres[idx] });
    setEditIdx(idx);
  };

  const closeForm = () => setEditIdx(null);

  const saveForm = () => {
    if (editIdx === null) return;
    setMembres((p) => p.map((m, i) => i === editIdx ? form : m));
    closeForm();
  };

  const addMembre = () => {
    const nextNum = membres.length > 0 ? Math.max(...membres.map((m) => m.numero)) + 1 : 1;
    const newMembre: Membre = { numero: nextNum, nom: '', photo: '', bio: '', role: '', quartier: '' };
    setMembres((p) => [...p, newMembre]);
    setEditIdx(membres.length);
    setForm(newMembre);
  };

  const deleteMembre = (idx: number) => {
    if (editIdx === idx) closeForm();
    setMembres((p) => p.filter((_, i) => i !== idx));
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    setError('');

    const res = await fetch('/api/admin/save-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: 'la-liste', content: { ...listeInit, membres } }),
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

  const filtered = membres.filter((m) =>
    m.nom.toLowerCase().includes(search.toLowerCase()) ||
    m.quartier.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Barre admin */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push('/admin')} className="text-gray-500 hover:text-gray-800 text-sm">← Tableau de bord</button>
          <span className="text-gray-300">/</span>
          <h1 className="font-black text-gray-900">La Liste ({membres.length} membres)</h1>
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

      <div className="flex flex-1 overflow-hidden">
        {/* Liste membres */}
        <div className={`${editIdx !== null ? 'hidden lg:flex' : 'flex'} flex-col w-full lg:w-80 xl:w-96 border-r border-gray-200 bg-white`}>
          <div className="p-3 border-b border-gray-100">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher par nom ou quartier..."
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none"
            />
          </div>
          <button onClick={addMembre} className="m-3 py-2 rounded-lg text-sm font-semibold text-white" style={{ background: '#4EB168' }}>
            + Ajouter un membre
          </button>
          <div className="overflow-y-auto flex-1">
            {filtered.map((membre, idx) => {
              const realIdx = membres.indexOf(membre);
              return (
                <button
                  key={realIdx}
                  onClick={() => openEdit(realIdx)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 ${editIdx === realIdx ? 'bg-purple-50' : ''}`}
                >
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                    {membre.photo ? (
                      <Image src={membre.photo} alt={membre.nom} fill className="object-cover" />
                    ) : (
                      <span className="w-full h-full flex items-center justify-center text-gray-400 text-lg">👤</span>
                    )}
                    <span className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center font-bold">
                      {membre.numero}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">{membre.nom || '(sans nom)'}</p>
                    <p className="text-xs text-gray-500 truncate">{membre.quartier || '—'}</p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteMembre(realIdx); }}
                    className="ml-auto text-red-400 hover:text-red-600 text-sm p-1 flex-shrink-0"
                  >
                    🗑️
                  </button>
                </button>
              );
            })}
          </div>
        </div>

        {/* Formulaire édition */}
        {editIdx !== null && (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black text-gray-900">Modifier le membre #{form.numero}</h2>
                <button onClick={closeForm} className="lg:hidden text-sm text-gray-500">← Retour à la liste</button>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Numéro</label>
                    <input type="number" value={form.numero} onChange={(e) => setForm({ ...form, numero: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Nom complet *</label>
                    <input type="text" value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Rôle (ex: Tête de liste)</label>
                    <input type="text" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Quartier</label>
                    <input type="text" value={form.quartier} onChange={(e) => setForm({ ...form, quartier: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">URL de la photo</label>
                  <input type="url" value={form.photo} onChange={(e) => setForm({ ...form, photo: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm font-mono focus:outline-none" />
                  {form.photo && (
                    <div className="mt-2 relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                      <Image src={form.photo} alt={form.nom} fill className="object-cover" />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Biographie</label>
                  <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    rows={5} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none resize-none" />
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button onClick={saveForm} className="px-6 py-3 rounded-xl font-bold text-white" style={{ background: '#9C35DD' }}>
                  Appliquer les modifications
                </button>
                <button onClick={closeForm} className="px-6 py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200">
                  Annuler
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-3">N&apos;oubliez pas de cliquer sur &quot;Sauvegarder&quot; en haut pour enregistrer définitivement.</p>
            </div>
          </div>
        )}

        {editIdx === null && (
          <div className="hidden lg:flex flex-1 items-center justify-center text-gray-400">
            <div className="text-center">
              <p className="text-4xl mb-3">👈</p>
              <p>Sélectionnez un membre pour le modifier</p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="fixed bottom-4 right-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl shadow text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
