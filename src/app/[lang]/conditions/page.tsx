import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions d'utilisation — AD Niamey 2000",
  description: "Conditions d'utilisation du site web de l'Assemblée de Dieu Niamey 2000.",
};

export default function ConditionsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-serif text-3xl font-bold text-ink">
        Conditions d&apos;utilisation
      </h1>
      <p className="mt-2 text-sm text-muted">Dernière mise à jour : 22 août 2026</p>

      <div className="prose-sm mt-8 space-y-6 text-ink/85 leading-relaxed">
        <section>
          <h2 className="font-serif text-lg font-bold text-ink">1. Acceptation des conditions</h2>
          <p>
            En accédant et en utilisant le site web de l&apos;Assemblée de Dieu Niamey 2000
            (« AD Niamey 2000 »), vous acceptez les présentes conditions d&apos;utilisation.
            Si vous n&apos;acceptez pas ces conditions, veuillez ne pas utiliser ce site.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-bold text-ink">2. Description du site</h2>
          <p>
            Ce site a pour objet de fournir au public des informations sur les activités,
            les services, les sermons et les événements de l&apos;Assemblée de Dieu Niamey 2000.
            Le contenu est fourni à titre informatif uniquement.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-bold text-ink">3. Utilisation du site</h2>
          <p>Vous vous engagez à :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Utiliser le site de manière respectueuse et conforme à la loi</li>
            <li>Ne pas tenter d&apos;accéder aux parties sécurisées du site sans autorisation</li>
            <li>Ne pas utiliser le site à des fins commerciales non autorisées</li>
            <li>Ne pas perturber ou endommager le fonctionnement du site</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-lg font-bold text-ink">4. Propriété intellectuelle</h2>
          <p>
            Le contenu de ce site (textes, images, logos, vidéos, sermons) est la propriété
            de l&apos;AD Niamey 2000 ou de ses partenaires et est protégé par les lois en
            vigueur sur la propriété intellectuelle. Toute reproduction non autorisée est interdite.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-bold text-ink">5. Liens externes</h2>
          <p>
            Ce site peut contenir des liens vers des sites tiers (YouTube, etc.). L&apos;AD Niamey
            2000 n&apos;exerce aucun contrôle sur le contenu de ces sites et décline toute
            responsabilité concernant leur contenu ou leurs pratiques.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-bold text-ink">6. Contact</h2>
          <p>
            Pour toute question concernant ces conditions d&apos;utilisation, vous pouvez nous
            contacter à l&apos;adresse :{" "}
            <a href="mailto:adniamey2000@gmail.com" className="text-primary-dark font-semibold hover:underline">
              adniamey2000@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
