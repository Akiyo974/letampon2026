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
      {/* Hero dark */}
      <section style={{ background: '#111' }} className="pt-20 pb-0">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 pb-16">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-5" style={{ color: '#EF1923' }}>
            Événements
          </p>
          <h1 className="text-white font-black leading-tight max-w-2xl" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}>
            {titre}
          </h1>
          <p className="text-white/50 mt-5 max-w-xl text-base leading-relaxed">Retrouvez tous nos événements à venir</p>
        </div>
        <div className="h-1 flex">
          <div className="flex-1" style={{ background: '#9C35DD' }} />
          <div className="flex-1" style={{ background: '#4EB168' }} />
          <div className="flex-1" style={{ background: '#FEED00' }} />
          <div className="flex-1" style={{ background: '#EF1923' }} />
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-12">
          {evenements.length === 0 ? (
            <div className="py-20">
              <h2 className="text-2xl font-black text-gray-700 mb-4">Aucun événement planifié pour l&#39;instant</h2>
              <p className="text-gray-500 mb-8 text-sm">Revenez bientôt pour découvrir nos prochains événements, réunions et rencontres citoyennes.</p>
              <Link
                href="/contact"
                className="inline-block px-6 py-2.5 text-sm font-bold text-white uppercase tracking-wider transition-opacity hover:opacity-85"
                style={{ background: '#9C35DD' }}
              >
                Nous contacter
              </Link>
            </div>
          ) : (
            <>
              {aVenir.length > 0 && (
                <div className="mb-16">
                  <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-2" style={{ color: '#4EB168' }}>
                    <span className="w-2 h-2 inline-block" style={{ background: '#4EB168' }} />
                    Événements à venir
                  </h2>
                  <div className="divide-y divide-gray-100">
                    {aVenir.map((evt, i) => (
                      <EventCard key={evt.id ?? i} event={evt} />
                    ))}
                  </div>
                </div>
              )}
              {passes.length > 0 && (
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-2 text-gray-400">
                    <span className="w-2 h-2 inline-block bg-gray-300" />
                    Événements passés
                  </h2>
                  <div className="divide-y divide-gray-100 opacity-60">
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
    <div className="py-6 flex gap-6">
      <div
        className="flex-shrink-0 w-14 h-14 flex flex-col items-center justify-center text-white font-black"
        style={{ background: '#9C35DD' }}
      >
        <span className="text-xl leading-none">{dateObj.getDate()}</span>
        <span className="text-xs uppercase">{dateObj.toLocaleDateString('fr-FR', { month: 'short' })}</span>
      </div>
      <div className="flex-1">
        <h3 className="text-base font-black text-gray-900 mb-1">{event.titre}</h3>
        <p className="text-xs text-gray-400 mb-1 capitalize">{jour}{event.heure ? ` · ${event.heure}` : ''}</p>
        {event.lieu && <p className="text-xs text-gray-600 mb-2">{event.lieu}</p>}
        {event.description && <p className="text-gray-500 text-sm leading-relaxed">{event.description}</p>}
      </div>
    </div>
  );
}

