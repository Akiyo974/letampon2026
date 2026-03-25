import Image from 'next/image';
import Link from 'next/link';
import accueil from '@/../content/pages/accueil.json';
import settings from '@/../content/settings.json';

type PermanenceExt = {
  adresse: string;
  horaires: string;
  rdvSansRdv?: string;
  permanence17Adresse?: string;
  permanence17Horaires?: string;
};

export default function AccueilPage() {
  const { hero, sections } = accueil;
  const reseaux = settings.reseaux as typeof settings.reseaux & { tiktok?: string };
  const permanence = settings.permanence as PermanenceExt;

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative h-screen min-h-160 flex items-end overflow-hidden">
        <Image
          src={hero.image}
          alt="Bannière Alexis Chaussalet Le Tampon 2026"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Gradient gauche→droite pour lisibilité du texte */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.05) 100%)' }} />
        {/* Gradient bas pour la bande */}
        <div className="absolute inset-x-0 bottom-0 h-32" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }} />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 pb-16 sm:pb-20">
          <p className="text-white/50 text-xs uppercase tracking-[0.3em] font-semibold mb-5">
            Élections municipales &amp; communautaires · 15 &amp; 22 mars 2026
          </p>
          <h1 className="text-white font-black leading-none mb-6 max-w-xl" style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}>
            {hero.titre}
          </h1>
          <p className="text-white/70 text-base sm:text-lg max-w-md mb-10 leading-relaxed">
            {hero.sousTitre}
          </p>
          <div className="flex flex-wrap gap-3 items-center mb-10">
            <Link
              href={hero.ctaPrimaire.lien}
              className="px-6 py-3 text-sm font-bold text-white uppercase tracking-wider transition-opacity hover:opacity-85"
              style={{ background: '#9C35DD' }}
            >
              {hero.ctaPrimaire.texte}
            </Link>
            <Link
              href={hero.ctaSecondaire.lien}
              className="px-6 py-3 text-sm font-bold text-white uppercase tracking-wider border border-white/50 hover:border-white transition-colors"
            >
              {hero.ctaSecondaire.texte}
            </Link>
          </div>
          <div className="flex gap-3">
            {reseaux.instagram && (
              <Link href={reseaux.instagram} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center border border-white/25 hover:border-white/70 transition-colors"
                aria-label="Instagram">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="3.5"/><circle cx="17.5" cy="6.5" r="0.8" fill="white" stroke="none"/></svg>
              </Link>
            )}
            {reseaux.facebook && (
              <Link href={reseaux.facebook} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center border border-white/25 hover:border-white/70 transition-colors"
                aria-label="Facebook">
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </Link>
            )}
            {reseaux.tiktok && (
              <Link href={reseaux.tiktok} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center border border-white/25 hover:border-white/70 transition-colors"
                aria-label="TikTok">
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.28 6.28 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.77a4.85 4.85 0 01-1.01-.08z"/></svg>
              </Link>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 flex z-10">
          <div className="flex-1" style={{ background: '#9C35DD' }} />
          <div className="flex-1" style={{ background: '#4EB168' }} />
          <div className="flex-1" style={{ background: '#FEED00' }} />
          <div className="flex-1" style={{ background: '#EF1923' }} />
        </div>
      </section>

      {sections.map((section) => {
        /* ─── TEXTE + IMAGE ─────────────────────────────────── */
        if (section.type === 'texte-image') {
          const s = section as typeof section & { image: string; imagePosition: string; contenu2?: string; ctaTexte?: string; ctaLien?: string; ctaSecondaireTexte?: string; ctaSecondaireLien?: string };
          const imgRight = s.imagePosition === 'droite';
          return (
            <section key={section.id} className="bg-white overflow-hidden">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2" style={{ minHeight: '560px' }}>
                {/* Texte */}
                <div className={`flex flex-col justify-center px-8 py-20 lg:px-16 ${imgRight ? '' : 'lg:order-2'}`}>
                  <span className="text-xs uppercase tracking-[0.2em] font-bold mb-4" style={{ color: '#9C35DD' }}>
                    Notre engagement
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-4">
                    {section.titre}
                  </h2>
                  <div className="w-10 h-0.5 mb-6" style={{ background: '#9C35DD' }} />
                  <p className="text-gray-500 leading-relaxed mb-4">{section.contenu}</p>
                  {s.contenu2 && <p className="text-gray-500 leading-relaxed mb-8">{s.contenu2}</p>}
                  <div className="flex flex-wrap gap-3 mt-2">
                    {s.ctaLien && (
                      <Link href={s.ctaLien}
                        className="px-6 py-2.5 text-sm font-bold text-white uppercase tracking-wider transition-opacity hover:opacity-85"
                        style={{ background: '#9C35DD' }}>
                        {s.ctaTexte}
                      </Link>
                    )}
                    {s.ctaSecondaireLien && (
                      <Link href={s.ctaSecondaireLien}
                        className="px-6 py-2.5 text-sm font-bold uppercase tracking-wider border transition-opacity hover:opacity-70"
                        style={{ borderColor: '#9C35DD', color: '#9C35DD' }}>
                        {s.ctaSecondaireTexte}
                      </Link>
                    )}
                  </div>
                </div>
                {/* Image plein cadre, sans bordure */}
                <div className={`relative min-h-100 lg:min-h-0 ${imgRight ? '' : 'lg:order-1'}`}>
                  <Image src={s.image} alt={section.titre} fill className="object-cover" />
                </div>
              </div>
            </section>
          );
        }

        /* ─── CITATIONS MARQUEE ──────────────────────────────── */
        if (section.type === 'citations') {
          const s = section as typeof section & { citations: string[] };
          return (
            <section key={section.id} className="py-20 overflow-hidden" style={{ background: '#0d0d0d' }}>
              <div className="max-w-7xl mx-auto px-6 sm:px-12 mb-14">
                <span className="text-xs uppercase tracking-[0.25em] font-semibold" style={{ color: '#9C35DD' }}>
                  La parole aux Tamponnais·es
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white mt-2 leading-tight">
                  {section.titre}
                </h2>
              </div>
              {/* Marquee — double liste pour boucle seamless */}
              <div className="overflow-hidden">
                <div className="marquee-track gap-5" style={{ gap: '20px' }}>
                  {[...s.citations, ...s.citations].map((citation, i) => (
                    <div
                      key={i}
                      className="shrink-0 border border-white/10 p-7"
                      style={{ width: '300px' }}
                    >
                      <p className="text-5xl font-black leading-none mb-4" style={{ color: '#9C35DD', fontFamily: 'Georgia, serif' }}>&ldquo;</p>
                      <p className="text-white/70 text-sm leading-relaxed">{citation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        }

        /* ─── TEXTE CENTRÉ ───────────────────────────────────── */
        if (section.type === 'texte-centré') {
          const s = section as typeof section & { contenu: string; ctaTexte?: string; ctaLien?: string };
          return (
            <section key={section.id} className="py-28 bg-white">
              <div className="max-w-6xl mx-auto px-6 sm:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                  <div>
                    <h2 className="font-black text-gray-900 leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
                      {section.titre}
                    </h2>
                  </div>
                  <div className="border-t-2 pt-8" style={{ borderColor: '#4EB168' }}>
                    {s.contenu.split('\n\n').map((para, i) => (
                      <p key={i} className="text-gray-500 leading-relaxed mb-4">{para}</p>
                    ))}
                    {s.ctaLien && (
                      <Link href={s.ctaLien}
                        className="inline-block mt-4 px-6 py-2.5 text-sm font-bold text-white uppercase tracking-wider transition-opacity hover:opacity-85"
                        style={{ background: '#4EB168' }}>
                        {s.ctaTexte}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </section>
          );
        }

        /* ─── CARTES TERRAIN ─────────────────────────────────── */
        if (section.type === 'cartes-terrain') {
          const s = section as typeof section & { cartes: { titre: string; description: string }[]; ctaTexte?: string; ctaLien?: string };
          return (
            <section key={section.id} className="py-24" style={{ background: '#f7f6f4' }}>
              <div className="max-w-7xl mx-auto px-6 sm:px-12">
                <div className="mb-14">
                  <span className="text-xs uppercase tracking-[0.25em] font-semibold" style={{ color: '#EF1923' }}>
                    Sur le terrain
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2 max-w-xl leading-tight">
                    {section.titre}
                  </h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {s.cartes.map((carte, i) => (
                    <div key={i} className="py-8 grid grid-cols-12 gap-4 items-start">
                      <span className="col-span-2 sm:col-span-1 text-4xl sm:text-5xl font-black leading-none tabular-nums" style={{ color: '#EF1923', opacity: 0.25 }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="col-span-10 sm:col-span-3 lg:col-span-3 font-black text-gray-900 text-base pt-1">
                        {carte.titre}
                      </h3>
                      <p className="col-span-12 sm:col-span-8 lg:col-span-8 text-gray-500 leading-relaxed text-sm pl-0 sm:pl-4">
                        {carte.description}
                      </p>
                    </div>
                  ))}
                </div>
                {s.ctaLien && (
                  <div className="mt-10">
                    <Link href={s.ctaLien}
                      className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-opacity hover:opacity-70"
                      style={{ color: '#EF1923' }}>
                      {s.ctaTexte} &rarr;
                    </Link>
                  </div>
                )}
              </div>
            </section>
          );
        }

        /* ─── CONTACT RÉSUMÉ ─────────────────────────────────── */
        if (section.type === 'contact-résumé') {
          const s = section as typeof section & { contenu: string; ctaTexte?: string; ctaLien?: string };
          return (
            <section key={section.id} className="py-24" style={{ background: '#111' }}>
              <div className="max-w-7xl mx-auto px-6 sm:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
                      {section.titre}
                    </h2>
                    <p className="text-white/50 leading-relaxed mb-8">{s.contenu}</p>
                    {s.ctaLien && (
                      <Link href={s.ctaLien}
                        className="inline-block px-6 py-2.5 text-sm font-bold text-white uppercase tracking-wider transition-opacity hover:opacity-85"
                        style={{ background: '#9C35DD' }}>
                        {s.ctaTexte}
                      </Link>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="border-t border-white/15 pt-6">
                      <p className="text-xs uppercase tracking-widest text-white/35 mb-3 font-semibold">Permanence principale</p>
                      <p className="text-white font-semibold text-sm mb-1">{permanence.adresse}</p>
                      <p className="text-white/50 text-xs leading-relaxed">{permanence.horaires}</p>
                      {permanence.rdvSansRdv && <p className="text-white/35 text-xs mt-2 italic">{permanence.rdvSansRdv}</p>}
                    </div>
                    <div className="border-t border-white/15 pt-6">
                      <p className="text-xs uppercase tracking-widest text-white/35 mb-3 font-semibold">Permanence 17ème km</p>
                      <p className="text-white font-semibold text-sm mb-1">{permanence.permanence17Adresse}</p>
                      <p className="text-white/50 text-xs leading-relaxed">{permanence.permanence17Horaires}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        }

        return null;
      })}
    </>
  );
}
