'use client';

import { useState } from 'react';
import contact from '@/../content/pages/contact.json';
import settings from '@/../content/settings.json';

export default function ContactPage() {
  const [form, setForm] = useState({ nom: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      {/* Hero dark */}
      <section style={{ background: '#111' }} className="pt-20 pb-0">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 pb-16">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-5" style={{ color: '#4EB168' }}>
            Nous rejoindre
          </p>
          <h1 className="text-white font-black leading-tight max-w-2xl" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}>
            {contact.titre}
          </h1>
          <p className="text-white/50 mt-5 max-w-xl text-base leading-relaxed">{contact.intro}</p>
        </div>
        <div className="h-1 flex">
          <div className="flex-1" style={{ background: '#9C35DD' }} />
          <div className="flex-1" style={{ background: '#4EB168' }} />
          <div className="flex-1" style={{ background: '#FEED00' }} />
          <div className="flex-1" style={{ background: '#EF1923' }} />
        </div>
      </section>

      <section className="py-20" style={{ background: '#f7f6f4' }}>
        <div className="max-w-6xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulaire */}
            <div className="bg-white p-8">
              <h2 className="text-xl font-black text-gray-900 mb-2">Envoyez-nous un message</h2>
              <p className="text-gray-500 mb-6 text-sm">{contact.formulaireTexte}</p>

              {sent ? (
                <div className="py-10">
                  <h3 className="text-lg font-black text-gray-900 mb-2">Message envoyé !</h3>
                  <p className="text-gray-500 mb-6 text-sm">Merci pour votre message. Nous reviendrons vers vous dans les plus brefs délais.</p>
                  <button
                    onClick={() => { setSent(false); setForm({ nom: '', email: '', message: '' }); }}
                    className="px-5 py-2.5 text-sm font-bold text-white uppercase tracking-wider transition-opacity hover:opacity-85"
                    style={{ background: '#9C35DD' }}
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="nom" className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Nom complet</label>
                    <input
                      id="nom"
                      type="text"
                      required
                      value={form.nom}
                      onChange={(e) => setForm({ ...form, nom: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:ring-2 text-gray-900 text-sm"
                      style={{ '--tw-ring-color': '#9C35DD' } as React.CSSProperties}
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Adresse e-mail</label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:ring-2 text-gray-900 text-sm"
                      placeholder="votre@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Votre message</label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 focus:outline-none focus:ring-2 text-gray-900 resize-none text-sm"
                      placeholder="Votre idée, question ou message..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 font-bold text-white uppercase tracking-wider transition-opacity hover:opacity-85 text-sm"
                    style={{ background: '#9C35DD' }}
                  >
                    Envoyer le message
                  </button>
                </form>
              )}
            </div>

            {/* Infos contact */}
            <div>
              {/* Permanences */}
              <div className="mb-10">
                <h2 className="text-xl font-black text-gray-900 mb-6">Nos permanences</h2>
                <div className="divide-y divide-gray-200">
                  {contact.permanences.map((perm, i) => (
                    <div key={i} className="py-5 flex gap-4">
                      <div
                        className="flex-shrink-0 w-1"
                        style={{ background: ['#9C35DD', '#4EB168'][i % 2] }}
                      />
                      <div>
                        <h3 className="font-black text-gray-900 mb-1 text-sm">{perm.titre}</h3>
                        <p className="text-gray-600 text-sm">{perm.adresse}</p>
                        <p className="text-gray-400 text-xs mt-1">{perm.horaires}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Email */}
              {settings.contact?.email && (
                <div className="mb-8">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">E-mail</span>
                  <a
                    href={`mailto:${settings.contact.email}`}
                    className="text-base font-black hover:underline"
                    style={{ color: '#9C35DD' }}
                  >
                    {settings.contact.email}
                  </a>
                </div>
              )}

              {/* Réseaux */}
              {settings.reseaux?.facebook && (
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-3">Suivez-nous</span>
                  <a
                    href={settings.reseaux.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-5 py-2.5 text-sm font-bold text-white uppercase tracking-wider transition-opacity hover:opacity-85"
                    style={{ background: '#1877F2' }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
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

