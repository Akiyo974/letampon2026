import Image from 'next/image';
import Link from 'next/link';
import accueil from '@/../content/pages/accueil.json';

export default function AccueilPage() {
  const { hero, sections } = accueil;

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <Image
          src={hero.image}
          alt="Bannière Alexis Chaussalet Le Tampon 2026"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
            {hero.titre}
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 text-gray-200 leading-relaxed">
            {hero.sousTitre}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={hero.ctaPrimaire.lien}
              className="px-8 py-4 rounded-full font-bold text-lg text-white shadow-lg transition-transform hover:scale-105"
              style={{ background: '#9C35DD' }}
            >
              {hero.ctaPrimaire.texte}
            </Link>
            <Link
              href={hero.ctaSecondaire.lien}
              className="px-8 py-4 rounded-full font-bold text-lg border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-colors"
            >
              {hero.ctaSecondaire.texte}
            </Link>
          </div>
        </div>
        {/* Bande colorée */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 flex z-10">
          <div className="flex-1" style={{ background: '#9C35DD' }} />
          <div className="flex-1" style={{ background: '#4EB168' }} />
          <div className="flex-1" style={{ background: '#FEED00' }} />
          <div className="flex-1" style={{ background: '#EF1923' }} />
        </div>
      </section>

      {sections.map((section) => {
        if (section.type === 'texte-image') {
          const s = section as typeof section & { image: string; imagePosition: string; ctaTexte?: string; ctaLien?: string };
          return (
            <section key={section.id} className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`flex flex-col ${s.imagePosition === 'droite' ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
                  <div className="flex-1">
                    <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6">
                      {section.titre}
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed mb-8">{section.contenu}</p>
                    {s.ctaLien && (
                      <Link
                        href={s.ctaLien}
                        className="inline-block px-6 py-3 rounded-full font-semibold text-white transition-transform hover:scale-105"
                        style={{ background: '#9C35DD' }}
                      >
                        {s.ctaTexte}
                      </Link>
                    )}
                  </div>
                  <div className="flex-1 w-full">
                    <div className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-gray-50" style={{ aspectRatio: '16/9' }}>
                      <Image src={s.image} alt={section.titre} fill className="object-contain" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        }

        if (section.type === 'citations') {
          const s = section as typeof section & { citations: string[] };
          return (
            <section key={section.id} className="py-20" style={{ background: '#F5F0FF' }}>
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-black text-center mb-12" style={{ color: '#9C35DD' }}>
                  {section.titre}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {s.citations.map((citation, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-xl p-5 shadow-sm border-l-4 flex items-start gap-3"
                      style={{ borderColor: ['#9C35DD', '#4EB168', '#FEED00', '#EF1923'][i % 4] }}
                    >
                      <span className="text-2xl mt-0.5">💬</span>
                      <p className="text-gray-700 text-sm leading-relaxed">&quot;{citation}&quot;</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        }

        if (section.type === 'texte-centré') {
          const s = section as typeof section & { contenu: string; ctaTexte?: string; ctaLien?: string };
          return (
            <section key={section.id} className="py-20 bg-white">
              <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6">{section.titre}</h2>
                {s.contenu.split('\n\n').map((para, i) => (
                  <p key={i} className="text-lg text-gray-600 leading-relaxed mb-4">{para}</p>
                ))}
                {s.ctaLien && (
                  <Link
                    href={s.ctaLien}
                    className="inline-block mt-4 px-8 py-4 rounded-full font-bold text-white transition-transform hover:scale-105"
                    style={{ background: '#4EB168' }}
                  >
                    {s.ctaTexte}
                  </Link>
                )}
              </div>
            </section>
          );
        }

        if (section.type === 'cartes-terrain') {
          const s = section as typeof section & { cartes: { titre: string; description: string }[]; ctaTexte?: string; ctaLien?: string };
          return (
            <section key={section.id} className="py-20 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-black text-center text-gray-900 mb-12">{section.titre}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  {s.cartes.map((carte, i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 shadow-md border-t-4" style={{ borderColor: ['#9C35DD', '#4EB168', '#EF1923'][i % 3] }}>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{carte.titre}</h3>
                      <p className="text-gray-600 leading-relaxed">{carte.description}</p>
                    </div>
                  ))}
                </div>
                {s.ctaLien && (
                  <div className="text-center">
                    <Link
                      href={s.ctaLien}
                      className="inline-block px-8 py-4 rounded-full font-bold text-white transition-transform hover:scale-105"
                      style={{ background: '#EF1923' }}
                    >
                      {s.ctaTexte}
                    </Link>
                  </div>
                )}
              </div>
            </section>
          );
        }

        if (section.type === 'contact-résumé') {
          const s = section as typeof section & { contenu: string; ctaTexte?: string; ctaLien?: string };
          return (
            <section key={section.id} className="py-24 relative overflow-hidden">
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #9C35DD 0%, #4EB168 100%)' }} />
              <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                <h2 className="text-3xl sm:text-4xl font-black mb-6">{section.titre}</h2>
                <p className="text-xl mb-10 opacity-90">{s.contenu}</p>
                {s.ctaLien && (
                  <Link
                    href={s.ctaLien}
                    className="inline-block px-8 py-4 rounded-full font-bold bg-white transition-transform hover:scale-105"
                    style={{ color: '#9C35DD' }}
                  >
                    {s.ctaTexte}
                  </Link>
                )}
              </div>
            </section>
          );
        }

        return null;
      })}
    </>
  );
}
