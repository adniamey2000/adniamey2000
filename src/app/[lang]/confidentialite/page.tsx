import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité — AD Niamey 2000",
  description: "Politique de confidentialité du site web de l'Assemblée de Dieu Niamey 2000.",
};

export default function ConfidentialitePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-serif text-3xl font-bold text-ink">
        Politique de confidentialité
      </h1>
      <p className="mt-2 text-sm text-muted">Dernière mise à jour : 22 août 2026</p>

      <div className="prose-sm mt-8 space-y-6 text-ink/85 leading-relaxed">
        <section>
          <h2 className="font-serif text-lg font-bold text-ink">1. Données collectées</h2>
          <p>
            Le site de l&apos;AD Niamey 2000 collecte les données suivantes :
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Formulaire de contact :</strong> nom, adresse e-mail, sujet et message.
              Ces données sont utilisées uniquement pour répondre à votre demande.
            </li>
            <li>
              <strong>Newsletter :</strong> adresse e-mail. Utilisée uniquement pour l&apos;envoi
              de la newsletter de l&apos;église, avec votre consentement explicite (double opt-in).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-lg font-bold text-ink">2. Utilisation des données</h2>
          <p>Vos données personnelles sont utilisées exclusivement pour :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Répondre aux messages envoyés via le formulaire de contact</li>
            <li>Vous envoyer la newsletter si vous y avez souscrit</li>
            <li>Assurer le bon fonctionnement technique du site</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-lg font-bold text-ink">3. Partage des données</h2>
          <p>
            L&apos;AD Niamey 2000 ne vend, ne loue et ne partage pas vos données personnelles
            avec des tiers, sauf obligation légale.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-bold text-ink">4. Sécurité</h2>
          <p>
            Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour
            protéger vos données contre tout accès non autorisé, perte ou modification.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-bold text-ink">5. Cookies</h2>
          <p>
            Ce site utilise uniquement des cookies techniques nécessaires à son bon
            fonctionnement (session d&apos;administration). Aucun cookie publicitaire ou de
            suivi n&apos;est utilisé.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-bold text-ink">6. Vos droits</h2>
          <p>
            Conformément à la réglementation en vigueur, vous disposez des droits suivants
            concernant vos données personnelles :
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Droit d&apos;accès :</strong> obtenir une copie de vos données</li>
            <li><strong>Droit de rectification :</strong> corriger des données inexactes</li>
            <li><strong>Droit de suppression :</strong> demander la suppression de vos données</li>
            <li><strong>Droit de désinscription :</strong> vous désinscrire de la newsletter à tout moment</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-lg font-bold text-ink">7. Durée de conservation</h2>
          <p>
            Vos données de contact sont conservées le temps nécessaire au traitement de votre
            demande. Les données de newsletter sont conservées tant que votre abonnement est actif.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-bold text-ink">8. Contact</h2>
          <p>
            Pour toute question relative à la protection de vos données personnelles, contactez-nous
            à :{" "}
            <a href="mailto:adniamey2000@gmail.com" className="text-primary-dark font-semibold hover:underline">
              adniamey2000@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
