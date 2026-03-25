'use client';

import { useState } from 'react';
import contact from '@/../content/pages/contact.json';
import settings from '@/../content/settings.json';

export default function ContactPage() {
  const [form, setForm] = useState({ nom: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, vous pouvez connecter à un service d'envoi ou une API
    setSent(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="py-16 text-white text-center" style={{ background: 'linear-gradient(135deg, #4EB168 0%, #9C35DD 100%)' }}>
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl sm:text-5xl font-black mb-4">{contact.titre}</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">{contact.intro}</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulaire */}
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h2 className="text-2xl font-black text-gray-900 mb-2">Envoyez-nous un message</h2>
              <p className="text-gray-600 mb-6 text-sm">{contact.formulaireTexte}</p>

              {sent ? (
                <div className="text-center py-10">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Message envoyé !</h3>
                  <p className="text-gray-600">Merci pour votre message. Nous reviendrons vers vous dans les plus brefs délais.</p>
                  <button
                    onClick={() => { setSent(false); setForm({ nom: '', email: '', message: '' }); }}
                    className="mt-6 px-5 py-2.5 rounded-full text-sm font-semibold text-white"
                    style={{ background: '#9C35DD' }}
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="nom" className="block text-sm font-semibold text-gray-700 mb-1">Nom complet</label>
                    <input
                      id="nom"
                      type="text"
                      required
                      value={form.nom}
                      onChange={(e) => setForm({ ...form, nom: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 text-gray-900"
                      style={{ '--tw-ring-color': '#9C35DD' } as React.CSSProperties}
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">Adresse e-mail</label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 text-gray-900"
                      placeholder="votre@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1">Votre message</label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 text-gray-900 resize-none"
                      placeholder="Votre idée, question ou message..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 rounded-full font-bold text-white transition-transform hover:scale-105"
                    style={{ background: '#9C35DD' }}
                  >
                    Envoyer le message
                  </button>
                </form>
              )}
            </div>

            {/* Infos contact */}
            <div className="space-y-6">
              {/* Permanences */}
              <div>
                <h2 className="text-2xl font-black text-gray-900 mb-4">Nos permanences</h2>
                <div className="space-y-4">
                  {contact.permanences.map((perm, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-2xl p-6 shadow-md border-l-4"
                      style={{ borderColor: ['#9C35DD', '#4EB168'][i % 2] }}
                    >
                      <h3 className="font-black text-gray-900 mb-2">{perm.titre}</h3>
                      <p className="text-gray-700 flex items-start gap-2">
                        <span>📍</span>
                        <span>{perm.adresse}</span>
                      </p>
                      <p className="text-gray-500 text-sm flex items-start gap-2 mt-1">
                        <span>🕐</span>
                        <span>{perm.horaires}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Email */}
              {settings.contact?.email && (
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h3 className="font-black text-gray-900 mb-2">E-mail</h3>
                  <a
                    href={`mailto:${settings.contact.email}`}
                    className="text-lg font-semibold hover:underline"
                    style={{ color: '#9C35DD' }}
                  >
                    {settings.contact.email}
                  </a>
                </div>
              )}

              {/* Réseaux */}
              {settings.reseaux?.facebook && (
                <div className="bg-white rounded-2xl p-6 shadow-md">
                  <h3 className="font-black text-gray-900 mb-3">Suivez-nous</h3>
                  <a
                    href={settings.reseaux.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-5 py-3 rounded-xl font-semibold text-white transition-transform hover:scale-105"
                    style={{ background: '#1877F2' }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Page Facebook
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
