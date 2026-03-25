'use client';

import Link from 'next/link';

const sections = [
  {
    href: '/admin/pages/accueil',
    label: 'Page Accueil',
    description: 'Hero, sections, contributions, CTA',
    icon: '🏠',
    color: '#9C35DD',
  },
  {
    href: '/admin/pages/programme',
    label: 'Programme',
    description: 'Suggestions citoyennes, images, PDF',
    icon: '📋',
    color: '#4EB168',
  },
  {
    href: '/admin/pages/la-demarche',
    label: 'La Démarche',
    description: 'Intro, piliers, conclusion',
    icon: '🤝',
    color: '#EF1923',
  },
  {
    href: '/admin/pages/qui-suis-je',
    label: 'Qui suis-je ?',
    description: 'Bio, photos, valeurs',
    icon: '👤',
    color: '#9C35DD',
  },
  {
    href: '/admin/liste',
    label: 'La Liste',
    description: '55 membres — noms, bios, photos, quartiers',
    icon: '👥',
    color: '#4EB168',
  },
  {
    href: '/admin/agenda',
    label: 'Agenda',
    description: 'Ajouter, modifier, supprimer des événements',
    icon: '📅',
    color: '#EF1923',
  },
  {
    href: '/admin/pages/contact',
    label: 'Contact',
    description: 'Permanences, formulaire',
    icon: '✉️',
    color: '#9C35DD',
  },
  {
    href: '/admin/navigation',
    label: 'Navigation',
    description: 'Modifier le menu principal',
    icon: '🔗',
    color: '#FEED00',
  },
  {
    href: '/admin/settings',
    label: 'Paramètres',
    description: 'Nom du site, réseaux sociaux, contact',
    icon: '⚙️',
    color: '#EF1923',
  },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-900">Administration — Le Tampon 2026</h1>
          <p className="text-sm text-gray-500">Gérez tout le contenu de votre site</p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            className="text-sm font-medium px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
          >
            Voir le site ↗
          </Link>
          <LogoutButton />
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 border-l-4 flex items-start gap-4"
              style={{ borderColor: s.color }}
            >
              <span className="text-3xl mt-0.5">{s.icon}</span>
              <div>
                <h2 className="font-black text-gray-900 group-hover:text-gray-700">{s.label}</h2>
                <p className="text-sm text-gray-500 mt-0.5">{s.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function LogoutButton() {
  return (
    <form action="/api/admin/auth" method="POST">
      <button
        type="button"
        onClick={async () => {
          await fetch('/api/admin/auth', { method: 'DELETE' });
          window.location.href = '/admin/login';
        }}
        className="text-sm font-medium px-4 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 transition-colors"
      >
        Déconnexion
      </button>
    </form>
  );
}
