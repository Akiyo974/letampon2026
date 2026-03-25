import programme from '@/../content/pages/programme.json';
import ProgrammeTabs from './ProgrammeTabs';

export default function ProgrammePage() {
  return (
    <>
      {/* Hero dark */}
      <section style={{ background: '#111' }} className="pt-20 pb-0">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 pb-16">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-5" style={{ color: '#4EB168' }}>
            Élections municipales · 2026
          </p>
          <h1 className="text-white font-black leading-tight max-w-2xl" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}>
            {programme.titre}
          </h1>
          <p className="text-white/50 mt-5 max-w-xl text-base leading-relaxed">{programme.sousTitre}</p>
        </div>
        <div className="h-1 flex">
          <div className="flex-1" style={{ background: '#9C35DD' }} />
          <div className="flex-1" style={{ background: '#4EB168' }} />
          <div className="flex-1" style={{ background: '#FEED00' }} />
          <div className="flex-1" style={{ background: '#EF1923' }} />
        </div>
      </section>

      {/* Intro 2-col */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-black text-gray-900 leading-tight" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}>
                Notre vision pour Le Tampon
              </h2>
            </div>
            <div className="border-t-2 pt-8" style={{ borderColor: '#4EB168' }}>
              <p className="text-gray-500 leading-relaxed">{programme.intro}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Programme illustré */}
      <section className="py-20" style={{ background: '#f7f6f4' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="mb-12">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold" style={{ color: '#9C35DD' }}>Documents</span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2">Programme illustré</h2>
            <p className="text-sm text-gray-400 mt-2">Cliquez sur une page pour l&apos;agrandir</p>
          </div>
          <div className="mb-12">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Version française</h3>
            <ProgrammeTabs images={programme.programmeImages} label="Programme page" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Vèrsyon kréol</h3>
            <ProgrammeTabs images={programme.programmeKreolImages} label="Programme créole page" />
          </div>
        </div>
      </section>

      {/* Suggestions — liste numérotée */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="mb-14">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold" style={{ color: '#EF1923' }}>Co-construction</span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2 max-w-xl leading-tight">
              Les suggestions des Tamponnais·es
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {programme.suggestions.map((suggestion, i) => (
              <div key={i} className="py-6 grid grid-cols-12 gap-4 items-start">
                <span className="col-span-2 sm:col-span-1 text-3xl sm:text-4xl font-black leading-none tabular-nums"
                  style={{ color: '#EF1923', opacity: 0.2 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="col-span-10 sm:col-span-11 text-gray-600 leading-relaxed text-sm pt-1">{suggestion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PDF — dark section */}
      <section className="py-20" style={{ background: '#111' }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] font-semibold" style={{ color: '#4EB168' }}>Téléchargement</span>
              <h2 className="text-3xl font-black text-white mt-2 mb-4">Programme complet</h2>
              <p className="text-white/50 text-sm leading-relaxed">Téléchargez notre programme en version intégrale, disponible en français et en créole réunionnais.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={programme.pdfFrancais}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 text-sm font-bold text-white uppercase tracking-wider transition-opacity hover:opacity-85"
                style={{ background: '#9C35DD' }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                Programme français
              </a>
              <a
                href={programme.pdfKreol}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 text-sm font-bold text-white uppercase tracking-wider border border-white/30 hover:border-white transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                Programme créole
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
