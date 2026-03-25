import liste from '@/../content/pages/la-liste.json';
import MembreCard from './MembreCard';

export default function LaListePage() {
  const { titre, intro, membres } = liste;

  return (
    <>
      {/* Hero dark */}
      <section style={{ background: '#111' }} className="pt-20 pb-0">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 pb-16">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-5" style={{ color: '#4EB168' }}>
            Liste électorale · Le Tampon 2026
          </p>
          <h1 className="text-white font-black leading-tight max-w-2xl" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}>
            {titre}
          </h1>
          <p className="text-white/50 mt-5 max-w-xl text-base leading-relaxed">{intro}</p>
          <p className="mt-6 text-sm font-bold uppercase tracking-wider" style={{ color: '#4EB168' }}>
            {membres.length} candidates &amp; candidats
          </p>
        </div>
        <div className="h-1 flex">
          <div className="flex-1" style={{ background: '#9C35DD' }} />
          <div className="flex-1" style={{ background: '#4EB168' }} />
          <div className="flex-1" style={{ background: '#FEED00' }} />
          <div className="flex-1" style={{ background: '#EF1923' }} />
        </div>
      </section>

      {/* Grille membres */}
      <section className="py-20" style={{ background: '#f7f6f4' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {membres.map((membre) => (
              <MembreCard key={membre.numero} membre={membre} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
