'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';

export default function ProgrammeTabs({ images, label }: { images: string[]; label: string }) {
  const [open, setOpen] = useState<number | null>(null);

  const prev = useCallback(() => setOpen((i) => (i !== null && i > 0 ? i - 1 : i)), []);
  const next = useCallback(() => setOpen((i) => (i !== null && i < images.length - 1 ? i + 1 : i)), [images.length]);
  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    if (open === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, prev, next, close]);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setOpen(i)}
            className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-transform cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <Image src={src} alt={`${label} ${i + 1}`} fill className="object-cover" sizes="(max-width: 640px) 50vw, 25vw" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20">
              <span className="bg-white/90 rounded-full px-3 py-1 text-xs font-semibold text-gray-800">🔍 Agrandir</span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {open !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={close}
        >
          {/* Bouton fermer */}
          <button
            onClick={close}
            className="absolute top-4 right-4 text-white bg-white/20 hover:bg-white/40 rounded-full w-10 h-10 flex items-center justify-center text-xl transition-colors"
            aria-label="Fermer"
          >
            ✕
          </button>

          {/* Compteur */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
            {open + 1} / {images.length}
          </div>

          {/* Flèche gauche */}
          {open > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-white/20 hover:bg-white/40 rounded-full w-12 h-12 flex items-center justify-center text-2xl transition-colors"
              aria-label="Page précédente"
            >
              ‹
            </button>
          )}

          {/* Image */}
          <div
            className="relative max-h-[90vh] max-w-[90vw] aspect-[3/4]"
            style={{ height: '90vh', width: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[open]}
              alt={`${label} ${open + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
              priority
              unoptimized
            />
          </div>

          {/* Flèche droite */}
          {open < images.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-white/20 hover:bg-white/40 rounded-full w-12 h-12 flex items-center justify-center text-2xl transition-colors"
              aria-label="Page suivante"
            >
              ›
            </button>
          )}
        </div>
      )}
    </>
  );
}
