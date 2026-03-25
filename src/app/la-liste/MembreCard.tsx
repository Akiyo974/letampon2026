'use client';

import { useState } from 'react';
import Image from 'next/image';

type Membre = {
  numero: number;
  nom: string;
  photo: string;
  profession: string;
  age: number;
  bio: string;
  role: string;
  quartier: string;
};

const borderColors = ['#9C35DD', '#4EB168', '#FEED00', '#EF1923'];

export default function MembreCard({ membre }: { membre: Membre }) {
  const [expanded, setExpanded] = useState(false);
  const borderColor = borderColors[(membre.numero - 1) % 4];
  const isYellow = borderColor === '#FEED00';

  // Seuil pour afficher le bouton (bio > ~160 caractères = dépasse 4 lignes)
  const bioLong = membre.bio && membre.bio.length > 160;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow flex flex-col">
      {/* Photo */}
      <div className="relative h-56 bg-gray-100">
        <Image
          src={membre.photo}
          alt={membre.nom}
          fill
          className="object-cover object-top"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Badge numéro */}
        <div
          className="absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center font-black text-sm shadow-md"
          style={{ background: borderColor, color: isYellow ? '#333' : 'white' }}
        >
          {membre.numero}
        </div>
        {membre.role && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-3 py-1.5 text-white text-xs font-semibold text-center">
            {membre.role}
          </div>
        )}
      </div>

      {/* Infos */}
      <div className="p-4 flex-1 flex flex-col" style={{ borderTop: `3px solid ${borderColor}` }}>
        <h3 className="font-black text-gray-900 text-base mb-0.5">{membre.nom}</h3>
        {membre.profession && (
          <p className="text-xs italic text-gray-500 mb-1">{membre.profession}</p>
        )}
        {membre.quartier && (
          <p className="text-xs font-medium mb-3" style={{ color: '#9C35DD' }}>
            📍 {membre.quartier}{membre.age ? ` · ${membre.age} ans` : ''}
          </p>
        )}

        {/* Bio avec expand/collapse */}
        <p
          className={`text-gray-600 text-xs leading-relaxed flex-1 transition-all duration-300 ${
            expanded ? '' : 'line-clamp-4'
          }`}
        >
          {membre.bio}
        </p>

        {bioLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-2 text-xs font-semibold self-start transition-colors hover:opacity-80 focus:outline-none"
            style={{ color: borderColor === '#FEED00' ? '#9C35DD' : borderColor }}
          >
            {expanded ? '▲ Voir moins' : '▼ Voir plus'}
          </button>
        )}
      </div>
    </div>
  );
}
