import Image from 'next/image';
import Link from 'next/link';
import qui from '@/../content/pages/qui-suis-je.json';

export default function QuiSuisJePage() {
  return (
    <>
      {/* Hero dark */}
      <section style={{ background: '#111' }} className="pt-20 pb-0">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 pb-16">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-5" style={{ color: '#9C35DD' }}>
            Candidat · Le Tampon 2026
          </p>
          <h1 className="text-white font-black leading-tight max-w-2xl" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}>
            {qui.titre}
          </h1>
          <p className="text-white/40 mt-5 max-w-xl text-base leading-relaxed italic">&ldquo;{qui.accroche}&rdquo;</p>
        </div>
        <div className="h-1 flex">
          <div className="flex-1" style={{ background: '#9C35DD' }} />
          <div className="flex-1" style={{ background: '#4EB168' }} />
          <div className="flex-1" style={{ background: '#FEED00' }} />
          <div className="flex-1" style={{ background: '#EF1923' }} />
        </div>
      </section>

      {/* Portrait + Parcours — split plein cadre */}
      <section className="bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2" style={{ minHeight: '580px' }}>
          <div className="relative min-h-96 lg:min-h-0">
            <Image src={qui.photoPortrait} alt={qui.nom} fill className="object-cover object-top" priority />
          </div>
          <div className="flex flex-col justify-center px-8 py-20 lg:px-16">
            <span className="text-xs uppercase tracking-[0.2em] font-bold mb-4" style={{ color: '#9C35DD' }}>Mon parcours</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-4">{qui.nom}</h2>
            <div className="w-10 h-0.5 mb-6" style={{ background: '#9C35DD' }} />
            {qui.biographie.map((para, i) => (
              <p key={i} className="text-gray-500 leading-relaxed mb-4 text-sm">{para}</p>
            ))}
            <Link
              href={qui.ctaLien}
              className="inline-block mt-4 px-6 py-2.5 text-sm font-bold text-white uppercase tracking-wider transition-opacity hover:opacity-85 self-start"
              style={{ background: '#9C35DD' }}
            >
              {qui.ctaTexte}
            </Link>
          </div>
        </div>
      </section>

      {/* Galerie */}
      <section className="py-20" style={{ background: '#f7f6f4' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="mb-12">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold" style={{ color: '#4EB168' }}>Galerie</span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">En images</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 stagger-children">
            {qui.photos.map((photo, i) => (
              <div key={i} className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <Image src={photo} alt={`Photo ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valeurs — liste numérotée */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="mb-14">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold" style={{ color: '#9C35DD' }}>Engagement</span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">Mes valeurs</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {qui.valeurs.map((valeur, i) => {
              const colors = ['#9C35DD', '#4EB168', '#EF1923'];
              return (
                <div key={i} className="py-8 grid grid-cols-12 gap-4 items-start">
                  <span className="col-span-2 sm:col-span-1 text-4xl sm:text-5xl font-black leading-none tabular-nums"
                    style={{ color: colors[i % 3], opacity: 0.25 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="col-span-10 sm:col-span-3 font-black text-gray-900 text-base pt-1">{valeur.titre}</h3>
                  <p className="col-span-12 sm:col-span-8 text-gray-500 leading-relaxed text-sm pl-0 sm:pl-4">{valeur.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
