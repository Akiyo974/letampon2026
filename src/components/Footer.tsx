import Link from 'next/link';
import settings from '@/../content/settings.json';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      {/* Bande colorée */}
      <div className="h-1 flex">
        <div className="flex-1" style={{ background: '#9C35DD' }} />
        <div className="flex-1" style={{ background: '#4EB168' }} />
        <div className="flex-1" style={{ background: '#FEED00' }} />
        <div className="flex-1" style={{ background: '#EF1923' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Identité */}
          <div>
            <h3 className="text-white font-bold text-lg mb-2">{settings.siteName}</h3>
            <p className="text-sm italic text-gray-400 mb-4">&quot;{settings.slogan}&quot;</p>
            <p className="text-sm">{settings.description}</p>
          </div>

          {/* Liens */}
          <div>
            <h3 className="text-white font-semibold mb-3">Navigation</h3>
            <ul className="space-y-1 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Accueil</Link></li>
              <li><Link href="/programme" className="hover:text-white transition-colors">Programme</Link></li>
              <li><Link href="/la-demarche" className="hover:text-white transition-colors">La démarche</Link></li>
              <li><Link href="/qui-suis-je" className="hover:text-white transition-colors">Qui suis-je ?</Link></li>
              <li><Link href="/la-liste" className="hover:text-white transition-colors">La Liste</Link></li>
              <li><Link href="/agenda" className="hover:text-white transition-colors">Agenda</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-3">Nous contacter</h3>
            <div className="text-sm space-y-2">
              {settings.contact.email && (
                <p>
                  <a href={`mailto:${settings.contact.email}`} className="hover:text-white transition-colors">
                    {settings.contact.email}
                  </a>
                </p>
              )}
              {settings.permanence.adresse && (
                <p>{settings.permanence.adresse}</p>
              )}
              {settings.permanence.horaires && (
                <p className="text-gray-400">{settings.permanence.horaires}</p>
              )}
            </div>
            {settings.reseaux.facebook && (
              <a
                href={settings.reseaux.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-sm hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </a>
            )}
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500">
          <p>© {year} {settings.siteName}. Tous droits réservés.</p>
          <div className="flex gap-4">
            <Link href="/mentions-legales" className="hover:text-gray-300 transition-colors">Mentions légales</Link>
            <Link href="/politique-de-confidentialite" className="hover:text-gray-300 transition-colors">Politique de confidentialité</Link>
          </div>
        </div>
      </div>

      {/* ─── SECOND CRÉDIT ─────────────────────────────────────────── */}
      <div
        style={{
          background: '#000',
          borderTop: '1px solid #1a1a1a',
          fontFamily: 'ui-monospace, SFMono-Regular, monospace',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span style={{ fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#fff', opacity: 0.25 }}>
            Reproduction non commerciale · Le contenu appartient à ses auteurs respectifs
          </span>
          <a
            href="https://christendijoux.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff', fontWeight: 700, textDecoration: 'none', opacity: 0.9 }}
            className="hover:opacity-60 transition-opacity"
          >
            christendijoux.com
          </a>
          <span style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff', opacity: 0.2 }}>
            Site test · 2026
          </span>
        </div>
      </div>
      {/* ─────────────────────────────────────────────────────────────── */}

    </footer>
  );
}
