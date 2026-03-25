import Image from 'next/image';
import Link from 'next/link';
import demarche from '@/../content/pages/la-demarche.json';

export default function DemarchePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #4EB168 0%, #9C35DD 100%)' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-white text-center">
          <h1 className="text-4xl sm:text-5xl font-black mb-4">{demarche.titre}</h1>
          <p className="text-xl opacity-90">{demarche.sousTitre}</p>
        </div>
      </section>

      {/* Intro avec image */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <p className="text-xl text-gray-700 leading-relaxed mb-6">{demarche.intro}</p>
              <p className="text-lg text-gray-600 leading-relaxed">{demarche.paragraphe2}</p>
            </div>
            <div className="flex-1 w-full">
              <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={demarche.imageHero}
                  alt="La démarche Le Tampon 2026"
                  fill
                  className="object-contain bg-gray-50"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Piliers */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-center text-gray-900 mb-12">Comment participer ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {demarche.piliers.map((pilier, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md">
                <div className="relative h-56">
                  <Image src={pilier.image} alt={pilier.titre} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div
                    className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow"
                    style={{ background: ['#9C35DD', '#4EB168', '#EF1923'][i] }}
                  >
                    {i + 1}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{pilier.titre}</h3>
                  <p className="text-gray-600 leading-relaxed">{pilier.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conclusion CTA */}
      <section className="py-20 text-white text-center" style={{ background: 'linear-gradient(135deg, #9C35DD 0%, #4EB168 100%)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-2xl font-semibold mb-8 leading-relaxed">{demarche.conclusion}</p>
          <Link
            href={demarche.ctaLien}
            className="inline-block px-8 py-4 rounded-full font-bold bg-white transition-transform hover:scale-105"
            style={{ color: '#9C35DD' }}
          >
            {demarche.ctaTexte}
          </Link>
        </div>
      </section>
    </>
  );
}
