import Image from 'next/image';
import Link from 'next/link';
import qui from '@/../content/pages/qui-suis-je.json';

const iconValeur = ['⚖️', '🗳️', '🌿'];
const colorValeur = ['#9C35DD', '#4EB168', '#EF1923'];

export default function QuiSuisJePage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #9C35DD 0%, #EF1923 100%)' }}>
        <div className="max-w-4xl mx-auto px-6 text-white text-center">
          <h1 className="text-4xl sm:text-5xl font-black mb-4">{qui.titre}</h1>
          <p className="text-xl opacity-90 italic">&quot;{qui.accroche}&quot;</p>
        </div>
      </section>

      {/* Portrait + Bio */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-shrink-0">
              <div className="relative w-64 h-72 rounded-2xl overflow-hidden shadow-2xl ring-4" style={{ '--tw-ring-color': '#9C35DD' } as React.CSSProperties}>
                <Image
                  src={qui.photoPortrait}
                  alt={qui.nom}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <p className="text-center mt-4 font-black text-xl text-gray-900">{qui.nom}</p>
              <p className="text-center text-sm" style={{ color: '#9C35DD' }}>Candidat — Le Tampon 2026</p>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-black text-gray-900 mb-6">Mon parcours</h2>
              {qui.biographie.map((para, i) => (
                <p key={i} className="text-lg text-gray-700 leading-relaxed mb-4">{para}</p>
              ))}
              <Link
                href={qui.ctaLien}
                className="inline-block mt-4 px-6 py-3 rounded-full font-semibold text-white transition-transform hover:scale-105"
                style={{ background: '#9C35DD' }}
              >
                {qui.ctaTexte}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Galerie photos */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-4">
            {qui.photos.map((photo, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden shadow-md">
                <Image src={photo} alt={`Photo ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-center text-gray-900 mb-12">Mes valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {qui.valeurs.map((valeur, i) => (
              <div
                key={i}
                className="rounded-2xl p-8 text-white text-center shadow-lg transition-transform hover:-translate-y-1"
                style={{ background: colorValeur[i] }}
              >
                <div className="text-4xl mb-4">{iconValeur[i]}</div>
                <h3 className="text-xl font-black mb-3">{valeur.titre}</h3>
                <p className="opacity-90 leading-relaxed text-sm">{valeur.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
