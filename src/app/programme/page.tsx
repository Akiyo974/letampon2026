import Image from 'next/image';
import programme from '@/../content/pages/programme.json';
import ProgrammeTabs from './ProgrammeTabs';

export default function ProgrammePage() {
  return (
    <>
      {/* Header page */}
      <section className="py-16 text-white text-center" style={{ background: 'linear-gradient(135deg, #9C35DD 0%, #4EB168 100%)' }}>
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl sm:text-5xl font-black mb-4">{programme.titre}</h1>
          <p className="text-xl opacity-90">{programme.sousTitre}</p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xl text-gray-700 leading-relaxed">{programme.intro}</p>
        </div>
      </section>

      {/* Onglets programme */}
      <ProgrammeSection programme={programme} />

      {/* Liste des suggestions */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-gray-900 mb-8 text-center">
            Les suggestions des Tamponnais·es
          </h2>
          <ul className="space-y-3">
            {programme.suggestions.map((suggestion, i) => (
              <li key={i} className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm">
                <span
                  className="mt-1 w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: ['#9C35DD', '#4EB168', '#FEED00', '#EF1923'][i % 4], color: i % 4 === 2 ? '#333' : 'white' }}
                >
                  {i + 1}
                </span>
                <p className="text-gray-700 leading-relaxed">{suggestion}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PDF */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Télécharger le programme complet</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={programme.pdfFrancais}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition-transform hover:scale-105"
              style={{ background: '#9C35DD' }}
            >
              📄 Programme en français
            </a>
            <a
              href={programme.pdfKreol}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition-transform hover:scale-105"
              style={{ background: '#4EB168' }}
            >
              📄 Programme en créole
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function ProgrammeSection({ programme }: { programme: typeof import('@/../content/pages/programme.json') }) {
  return (
    <section className="py-12" style={{ background: '#F5F0FF' }}>
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-black text-center mb-2" style={{ color: '#9C35DD' }}>
          Programme illustré
        </h2>
        <p className="text-center text-sm text-gray-500 mb-8">Cliquez sur une page pour l'agrandir</p>
        <div className="mb-10">
          <h3 className="text-lg font-bold text-gray-700 mb-4 text-center">Version française</h3>
          <ProgrammeTabs images={programme.programmeImages} label="Programme page" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-700 mb-4 text-center">Vèrsyon kréol</h3>
          <ProgrammeTabs images={programme.programmeKreolImages} label="Programme créole page" />
        </div>
      </div>
    </section>
  );
}
