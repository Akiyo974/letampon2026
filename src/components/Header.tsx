'use client';

import Link from 'next/link';
import { useState } from 'react';
import navData from '@/../content/navigation.json';

export default function Header() {
  const [open, setOpen] = useState(false);
  const items = navData.items.filter((i) => i.visible);

  return (
    <header className="bg-white shadow-sm">
      {/* Barre de navigation */}
      <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between md:justify-center">
          {/* Logo texte réduit côté gauche */}
          <Link href="/" className="flex items-center gap-2 shrink-0 md:hidden">
            <span className="font-black text-sm text-gray-900">Alexis Chaussalet</span>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {items.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Bouton hamburger mobile */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-50"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Nav mobile */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-1">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="block px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
      </div>
    </header>
  );
}
