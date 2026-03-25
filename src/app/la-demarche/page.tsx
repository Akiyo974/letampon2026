import Image from 'next/image';
import Link from 'next/link';
import demarche from '@/../content/pages/la-demarche.json';

export default function DemarchePage() {
  return (
    <>
      {/* Hero dark */}
      <section style={{ background: '#111' }} className="pt-20 pb-0">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 pb-16">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-5" style={{ color: '#4EB168' }}>
            Notre méthode
          </p>
          <h1 className="text-white font-black leading-tight max-w-2xl" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}>
            {demarche.titre}
          </h1>
          <p className="text-white/50 mt-5 max-w-xl text-base leading-relaxed">{demarche.sousTitre}</p>
        </div>
        <div className="h-1 flex">
          <div className="flex-1" style={{ background: '#9C35DD' }} />
          <div className="flex-1" style={{ background: '#4EB168' }} />
          <div className="flex-1" style={{ background: '#FEED00' }} />
          <div className="flex-1" style={{ background: '#EF1923' }} />
        </div>
      </section>

      {/* Intro split */}
      <section className="bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2" style={{ minHeight: '500px' }}>
          <div className="flex flex-col justify-center px-8 py-20 lg:px-16">
            <span className="text-xs uppercase tracking-[0.2em] font-bold mb-4" style={{ color: '#4EB168' }}>Notre démarche</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-4">Construire ensemble</h2>
            <div className="w-10 h-0.5 mb-6" style={{ background: '#4EB168' }} />
            <p className="text-gray-500 leading-relaxed mb-4 text-sm">{demarche.intro}</p>
            <p className="text-gray-500 leading-relaxed text-sm">{demarche.paragraphe2}</p>
          </div>
          <div className="relative min-h-80 lg:min-h-0">
            <Image src={demarche.imageHero} alt="La démarche Le Tampon 2026" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Piliers */}
      <section className="py-24" style={{ background: '#f7f6f4' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="mb-14">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold" style={{ color: '#9C35DD' }}>Participation</span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">Comment participer&nbsp;?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {demarche.piliers.map((pilier, i) => {
              const colors = ['#9C35DD', '#4EB168', '#EF1923'];
              return (
                <div key={i} className="bg-white overflow-hidden">
                  <div className="relative h-48">
                    <Image src={pilier.image} alt={pilier.titre} fill className="object-cover" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }} />
                    <div
                      className="absolute top-4 left-4 w-7 h-7 flex items-center justify-center text-white font-black text-sm"
                      style={{ background: colors[i] }}
                    >
                      {i + 1}
                    </div>
                  </div>
                  <div className="p-6 border-t-2" style={{ borderColor: colors[i] }}>
                    <h3 className="font-black text-gray-900 mb-3 text-base">{pilier.titre}</h3>
                    <p className="text-gray-500 leading-relaxed text-sm">{pilier.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Conclusion dark */}
      <section className="py-24" style={{ background: '#111' }}>
        <div className="max-w-6xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <p className="text-white/70 text-lg sm:text-xl leading-relaxed font-light">{demarche.conclusion}</p>
            <div>
              <Link
                href={demarche.ctaLien}
                className="inline-block px-6 py-2.5 text-sm font-bold text-white uppercase tracking-wider transition-opacity hover:opacity-85"
                style={{ background: '#4EB168' }}
              >
                {demarche.ctaTexte}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
