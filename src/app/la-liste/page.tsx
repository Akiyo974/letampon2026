import liste from '@/../content/pages/la-liste.json';
import MembreCard from './MembreCard';

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
