import Image from 'next/image';
import liste from '@/../content/pages/la-liste.json';

export default function LaListePage() {
  const { titre, intro, membres } = liste;

  return (
    <>
      {/* Hero */}
      <section className="py-16 text-white text-center" style={{ background: 'linear-gradient(135deg, #9C35DD 0%, #4EB168 50%, #EF1923 100%)' }}>
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl sm:text-5xl font-black mb-4">{titre}</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">{intro}</p>
          <p className="mt-4 text-lg font-semibold opacity-80">{membres.length} candidates et candidats</p>
        </div>
      </section>

      {/* Bande colorée */}
      <div className="h-1.5 flex">
        <div className="flex-1" style={{ background: '#9C35DD' }} />
        <div className="flex-1" style={{ background: '#4EB168' }} />
        <div className="flex-1" style={{ background: '#FEED00' }} />
        <div className="flex-1" style={{ background: '#EF1923' }} />
      </div>

      {/* Grille membres */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {membres.map((membre) => (
              <MembreCard key={membre.numero} membre={membre} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

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

function MembreCard({ membre }: { membre: Membre }) {
  const borderColor = borderColors[(membre.numero - 1) % 4];
  const isYellow = borderColor === '#FEED00';

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
        <p className="text-gray-600 text-xs leading-relaxed line-clamp-4 flex-1">{membre.bio}</p>
      </div>
    </div>
  );
}
