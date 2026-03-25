export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <section style={{ background: '#111' }} className="pt-20 pb-0">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 pb-16">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-5 text-white/40">Données personnelles</p>
          <h1 className="text-white font-black leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>Politique de confidentialité</h1>
        </div>
        <div className="h-1 flex">
          <div className="flex-1" style={{ background: '#9C35DD' }} />
          <div className="flex-1" style={{ background: '#4EB168' }} />
          <div className="flex-1" style={{ background: '#FEED00' }} />
          <div className="flex-1" style={{ background: '#EF1923' }} />
        </div>
      </section>
      <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <h2 className="text-2xl font-bold text-gray-800">Collecte des données personnelles</h2>
          <p>
            Dans le cadre de l&#39;utilisation de ce site, notamment du formulaire de contact, nous collectons uniquement les données nécessaires : nom, adresse e-mail et message. Ces données sont utilisées exclusivement pour répondre à votre demande et vous transmettre des informations relatives à la campagne.
          </p>

          <h2 className="text-2xl font-bold text-gray-800">Base légale du traitement</h2>
          <p>
            Le traitement de vos données repose sur votre consentement explicite, exprimé lors de la soumission du formulaire de contact.
          </p>

          <h2 className="text-2xl font-bold text-gray-800">Conservation des données</h2>
          <p>
            Vos données personnelles sont conservées pour la durée strictement nécessaire à la finalité pour laquelle elles ont été collectées, conformément à la réglementation en vigueur (RGPD).
          </p>

          <h2 className="text-2xl font-bold text-gray-800">Vos droits</h2>
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Droit d&#39;accès à vos données</li>
            <li>Droit de rectification</li>
            <li>Droit à l&#39;effacement (droit à l&#39;oubli)</li>
            <li>Droit d&#39;opposition au traitement</li>
            <li>Droit à la portabilité des données</li>
          </ul>
          <p>
            Pour exercer ces droits, vous pouvez nous contacter via le formulaire de contact du site ou à l&#39;adresse e-mail indiquée dans les mentions légales.
          </p>

          <h2 className="text-2xl font-bold text-gray-800">Cookies</h2>
          <p>
            Ce site peut utiliser des cookies techniques strictement nécessaires à son fonctionnement. Aucun cookie publicitaire ou de traçage n&#39;est utilisé.
          </p>

          <h2 className="text-2xl font-bold text-gray-800">Contact</h2>
          <p>
            Pour toute question relative à la protection de vos données, contactez-nous via la page <a href="/contact" className="underline" style={{ color: '#9C35DD' }}>Contact</a>.
          </p>
        </div>
      </div>
    </section>
    </>
  );
}
