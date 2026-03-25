import agenda from '@/../content/pages/agenda.json';
import Link from 'next/link';

type Evenement = {
  id?: string;
  titre: string;
  date: string;
  heure?: string;
  lieu?: string;
  description?: string;
  type?: string;
};

export default function AgendaPage() {
  const { titre, evenements } = agenda as { titre: string; evenements: Evenement[] };
  const maintenant = new Date().toISOString();
  const aVenir = evenements.filter((e) => e.date >= maintenant.slice(0, 10));
  const passes = evenements.filter((e) => e.date < maintenant.slice(0, 10));

  return (
    <>
      {/* Hero */}
      <section className="py-16 text-white text-center" style={{ background: 'linear-gradient(135deg, #EF1923 0%, #9C35DD 100%)' }}>
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl sm:text-5xl font-black mb-4">{titre}</h1>
          <p className="text-xl opacity-90">Retrouvez tous nos événements à venir</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {evenements.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">📅</div>
              <h2 className="text-2xl font-bold text-gray-700 mb-4">Aucun événement planifié pour l&#39;instant</h2>
              <p className="text-gray-500 mb-8">Revenez bientôt pour découvrir nos prochains événements, réunions et rencontres citoyennes.</p>
              <Link
                href="/contact"
                className="inline-block px-6 py-3 rounded-full font-semibold text-white transition-transform hover:scale-105"
                style={{ background: '#9C35DD' }}
              >
                Nous contacter
              </Link>
            </div>
          ) : (
            <>
              {aVenir.length > 0 && (
                <div className="mb-16">
                  <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full inline-block" style={{ background: '#4EB168' }} />
                    Événements à venir
                  </h2>
                  <div className="space-y-4">
                    {aVenir.map((evt, i) => (
                      <EventCard key={evt.id ?? i} event={evt} />
                    ))}
                  </div>
                </div>
              )}
              {passes.length > 0 && (
                <div>
                  <h2 className="text-2xl font-black text-gray-500 mb-6 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full inline-block bg-gray-300" />
                    Événements passés
                  </h2>
                  <div className="space-y-4 opacity-60">
                    {passes.map((evt, i) => (
                      <EventCard key={evt.id ?? i} event={evt} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}

function EventCard({ event }: { event: Evenement }) {
  const dateObj = new Date(event.date + 'T00:00:00');
  const jour = dateObj.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex gap-6">
      <div
        className="flex-shrink-0 w-16 h-16 rounded-xl flex flex-col items-center justify-center text-white font-black shadow"
        style={{ background: '#9C35DD' }}
      >
        <span className="text-2xl leading-none">{dateObj.getDate()}</span>
        <span className="text-xs uppercase">{dateObj.toLocaleDateString('fr-FR', { month: 'short' })}</span>
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-black text-gray-900 mb-1">{event.titre}</h3>
        <p className="text-sm text-gray-500 mb-1 capitalize">{jour}{event.heure ? ` · ${event.heure}` : ''}</p>
        {event.lieu && <p className="text-sm text-gray-600 mb-2">📍 {event.lieu}</p>}
        {event.description && <p className="text-gray-600 text-sm leading-relaxed">{event.description}</p>}
      </div>
    </div>
  );
}
