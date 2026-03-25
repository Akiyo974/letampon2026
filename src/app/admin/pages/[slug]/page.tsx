'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import accueilData from '@/../content/pages/accueil.json';
import programmeData from '@/../content/pages/programme.json';
import demarcheData from '@/../content/pages/la-demarche.json';
import quiSuisJeData from '@/../content/pages/qui-suis-je.json';
import listeData from '@/../content/pages/la-liste.json';
import agendaData from '@/../content/pages/agenda.json';
import contactData from '@/../content/pages/contact.json';

const pageDataMap: Record<string, unknown> = {
  accueil: accueilData,
  programme: programmeData,
  'la-demarche': demarcheData,
  'qui-suis-je': quiSuisJeData,
  'la-liste': listeData,
  agenda: agendaData,
  contact: contactData,
};

const pageTitles: Record<string, string> = {
  accueil: 'Page Accueil',
  programme: 'Programme',
  'la-demarche': 'La Démarche',
  'qui-suis-je': 'Qui suis-je ?',
  'la-liste': 'La Liste',
  agenda: 'Agenda',
  contact: 'Contact',
};

export default function PageEditor() {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();

  const initialData = pageDataMap[slug];
  const [jsonText, setJsonText] = useState(JSON.stringify(initialData, null, 2));
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const validate = useCallback(() => {
    try {
      JSON.parse(jsonText);
      setError('');
      return true;
    } catch (e) {
      setError(`JSON invalide : ${(e as Error).message}`);
      return false;
    }
  }, [jsonText]);

  const handleSave = async () => {
    if (!validate()) return;

    setSaving(true);
    setSaved(false);

    const content = JSON.parse(jsonText) as unknown;
    const res = await fetch('/api/admin/save-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, content }),
    });

    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else {
      const data = await res.json() as { error?: string };
      setError(data.error ?? 'Erreur lors de la sauvegarde');
    }
    setSaving(false);
  };

  if (!initialData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-700 text-xl">Page &quot;{slug}&quot; introuvable.</p>
        <Link href="/admin" className="text-violet-600 underline">← Retour au tableau de bord</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Barre admin */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push('/admin')} className="text-gray-500 hover:text-gray-800 text-sm">← Tableau de bord</button>
          <span className="text-gray-300">/</span>
          <h1 className="font-black text-gray-900">{pageTitles[slug] ?? slug}</h1>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-green-600 text-sm font-semibold">✅ Sauvegardé !</span>}
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl font-bold text-white disabled:opacity-60 transition-opacity"
            style={{ background: '#9C35DD' }}
          >
            {saving ? 'Sauvegarde...' : 'Sauvegarder'}
          </button>
        </div>
      </div>

      {/* Éditeur */}
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-gray-600 mb-3">
            Modifiez le contenu JSON ci-dessous puis cliquez sur &quot;Sauvegarder&quot;.
            Le fichier <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">content/pages/{slug}.json</code> sera mis à jour.
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          <textarea
            value={jsonText}
            onChange={(e) => {
              setJsonText(e.target.value);
              setError('');
            }}
            onBlur={validate}
            className="w-full h-[calc(100vh-220px)] font-mono text-sm p-4 bg-gray-900 text-green-400 rounded-2xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
