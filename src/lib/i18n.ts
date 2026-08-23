export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function pick(locale: Locale, fr: string, en: string) {
  return locale === "en" && en ? en : fr;
}

export const churchName = "AD Niamey 2000";
export const churchFullName = "Assemblée de Dieu Niamey 2000";

export function youtubeEmbed(url: string): string {
  const m = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})(?:&|$)/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : url;
}

export function youtubeThumb(url: string): string | null {
  const m = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})(?:&|$)/);
  return m ? `https://i.ytimg.com/vi/${m[1]}/hqdefault.jpg` : null;
}

export type Dict = {
  lang: string;
  nav: {
    home: string;
    about: string;
    events: string;
    sermons: string;
    gallery: string;
    contact: string;
    announcements: string;
  };
  actions: {
    learnMore: string;
    watchSermon: string;
    allSermons: string;
    allEvents: string;
    contactUs: string;
    joinUs: string;
    schedule: string;
  };
  home: {
    hero: {
      badge: string;
      title: string;
      highlight: string;
      subtitle: string;
      cta1: string;
      cta2: string;
    };
    welcome: {
      title: string;
      text1: string;
      text2: string;
      features: { title: string; text: string }[];
    };
    schedule: {
      title: string;
      subtitle: string;
      viewEvents: string;
      services: { day: string; time: string; name: string }[];
    };
    sermons: {
      title: string;
      subtitle: string;
    };
    events: {
      title: string;
      subtitle: string;
    };
    donation: {
      title: string;
      text: string;
      note: string;
    };
    announcements: {
      title: string;
      subtitle: string;
      viewAll: string;
      tickerLabel: string;
    };
    verse: {
      title: string;
      subtitle: string;
    };
    annualTheme: {
      title: string;
      yearLabel: string;
      themeLabel: string;
      verseLabel: string;
    };
  };
  announcements: {
    title: string;
    subtitle: string;
    empty: string;
    publishedOn: string;
    readMore: string;
  };
  verse: {
    title: string;
    subtitle: string;
    reference: string;
  };
  about: {
    title: string;
    subtitle: string;
    intro: string;
    intro2: string;
    mission: { title: string; text: string };
    vision: { title: string; text: string };
    values: { title: string; text: string };
    valuesList: { title: string; text: string }[];
    leadership: { title: string; text: string; senior: string };
    statsTitle: string;
    stats: {
      years: string;
      departments: string;
      sermons: string;
      events: string;
    };
    bannerTitle: string;
    bannerText: string;
    departments: { title: string; text: string };
    departmentsList: { name: string; description: string }[];
  };
  events: {
    title: string;
    subtitle: string;
    upcoming: string;
    past: string;
    time: string;
    place: string;
    galleryTitle: string;
    gallerySubtitle: string;
    details: string;
    welcomeNote: string;
    searchPlaceholder: string;
    noResults: string;
    filterLabel: string;
    allMonths: string;
    emptyDay: string;
    monthPrev: string;
    monthNext: string;
  };
  sermons: {
    title: string;
    subtitle: string;
    watch: string;
    summary: string;
    searchPlaceholder: string;
    sortNewest: string;
    sortOldest: string;
    noResults: string;
  };
  gallery: {
    title: string;
    subtitle: string;
    empty: string;
  };
  contact: {
    title: string;
    subtitle: string;
    addressLabel: string;
    phoneLabel: string;
    emailLabel: string;
    hoursLabel: string;
    form: {
      name: string;
      email: string;
      subject: string;
      subjectPlaceholder: string;
      subjects: string[];
      message: string;
      document: string;
      documentHint: string;
      send: string;
      sending: string;
      success: string;
      error: string;
      fileTooBig: string;
    };
  };
  newsletter: {
    title: string;
    text: string;
    placeholder: string;
    button: string;
    success: string;
    error: string;
    already: string;
    invalid: string;
    confirm: string;
    choiceTitle: string;
    choiceText: string;
  };
  footer: {
    aboutText: string;
    quickLinks: string;
    servicesTitle: string;
    contactTitle: string;
    rights: string;
    madeWith: string;
    admin: string;
    terms: string;
    privacy: string;
  };
  conditions: {
    title: string;
    updated: string;
    s1Title: string;
    s1Text: string;
    s2Title: string;
    s2Text: string;
    s3Title: string;
    s3Text: string;
    s3List: string[];
    s4Title: string;
    s4Text: string;
    s5Title: string;
    s5Text: string;
    s6Title: string;
    s6Text: string;
  };
  confidentialite: {
    title: string;
    updated: string;
    s1Title: string;
    s1Text: string;
    s1List: { strong: string; text: string }[];
    s2Title: string;
    s2Text: string;
    s2List: string[];
    s3Title: string;
    s3Text: string;
    s4Title: string;
    s4Text: string;
    s5Title: string;
    s5Text: string;
    s6Title: string;
    s6Text: string;
    s6List: { strong: string; text: string }[];
    s7Title: string;
    s7Text: string;
    s8Title: string;
    s8Text: string;
  };
  meta: {
    description: string;
    aboutDescription: string;
    sermonsDescription: string;
    eventsDescription: string;
    announcementsDescription: string;
    contactDescription: string;
    galleryDescription: string;
  };
  notFound: {
    title: string;
    text: string;
    backHome: string;
  };
};

const fr: Dict = {
  lang: "fr",
  nav: {
    home: "Accueil",
    about: "À propos",
    events: "Événements",
    sermons: "Sermons",
    gallery: "Galerie",
    contact: "Contact",
    announcements: "Annonces",
  },
  actions: {
    learnMore: "En savoir plus",
    watchSermon: "Regarder",
    allSermons: "Tous les sermons",
    allEvents: "Tous les événements",
    contactUs: "Contactez-nous",
    joinUs: "Rejoignez-nous",
    schedule: "Nos horaires",
  },
  home: {
    hero: {
      badge: "AD Niamey 2000 · Assemblée de Dieu au Niger",
      title: "Bienvenue à l'",
      highlight: "AD Niamey 2000",
      subtitle:
        "Une communauté de foi au cœur de Niamey. Venez adorer, grandir et servir ensemble.",
      cta1: "Rejoignez-nous",
      cta2: "Écouter un sermon",
    },
    welcome: {
      title: "Bienvenue dans notre église",
      text1:
        "L'AD Niamey 2000 est une communauté chrétienne vivante qui annonce l'Évangile de Jésus-Christ à Niamey, au Niger et au-delà.",
      text2:
        "Que vous soyez membre ou visiteur, vous êtes les bienvenus. Venez découvrir la joie de la foi, l'amour fraternel et la puissance de la Parole de Dieu.",
      features: [
        { title: "La Parole de Dieu", text: "Des messages clairs et édifiants, centrés sur la Bible." },
        { title: "Une famille", text: "Un lieu d'amour, d'accueil et de fraternité pour tous." },
        { title: "La mission", text: "Évangéliser et toucher de nouvelles personnes pour Christ." },
      ],
    },
    schedule: {
      title: "Nos cultes et activités",
      subtitle: "Venez nous rejoindre, vous êtes les bienvenus.",
      viewEvents: "Voir les événements",
      services: [
        { day: "Dimanche", time: "09h00 – 11h30", name: "Culte de louange et d'adoration" },
        { day: "Mardi", time: "17h30 – 19h00", name: "Étude biblique" },
        { day: "Jeudi", time: "18h00 – 19h30", name: "Intercession et prière" },
        { day: "Vendredi", time: "17h00 – 19h00", name: "Répétition de la chorale" },
      ],
    },
    sermons: {
      title: "Derniers sermons",
      subtitle: "Écoutez et partagez la Parole de Dieu.",
    },
    events: {
      title: "Prochains événements",
      subtitle: "Restez informés de la vie de l'église.",
    },
    donation: {
      title: "Soutenir l'église",
      text: "Vous pouvez soutenir la mission de l'église par vos dons et offrandes.",
      note: "Les informations de don sont disponibles à l'église ou en nous contactant directement.",
    },
    announcements: {
      title: "Annonces",
      subtitle: "Les communiqués et nouvelles de la vie de l'église.",
      viewAll: "Voir toutes les annonces",
      tickerLabel: "À la une",
    },
    verse: {
      title: "Verset du jour",
      subtitle: "Une Parole pour méditer chaque jour.",
    },
    annualTheme: {
      title: "Thème de l'année",
      yearLabel: "Année",
      themeLabel: "Thème",
      verseLabel: "Verset de l'année",
    },
  },
  announcements: {
    title: "Annonces",
    subtitle: "Retrouvez les annonces de chaque dimanche et les dernières nouvelles de l'église.",
    empty: "Aucune annonce pour le moment. Revenez bientôt !",
    publishedOn: "Publiée le",
    readMore: "Lire la suite",
  },
  verse: {
    title: "Verset du jour",
    subtitle: "Une Parole de Dieu pour commencer la journée.",
    reference: "Louis Segond",
  },
  about: {
    title: "À propos de nous",
    subtitle:
      "Une église au cœur de Niamey : une famille, une foi, une mission.",
    intro:
      "L'Assemblée de Dieu Niamey 2000 est une église de la famille des Assemblées de Dieu au Niger, engagée à annoncer l'Évangile et à former des disciples de Jésus-Christ.",
    intro2:
      "Depuis l'an 2000, nous nous réunissons pour adorer Dieu, grandir dans sa Parole et servir la ville de Niamey dans l'amour et l'unité. Chaque dimanche, des familles, des jeunes et des enfants se retrouvent pour vivre ensemble la joie de l'Évangile, dans un esprit de fraternité et d'entraide.",
    mission: {
      title: "Notre mission",
      text: "Annoncer la bonne nouvelle de Jésus-Christ, évangéliser, partager la Parole de Dieu et toucher de nouvelles personnes par l'amour et le témoignage.",
    },
    vision: {
      title: "Notre vision",
      text: "Être une église rayonnante dans la ville de Niamey, où chaque personne rencontre Dieu, grandit dans la foi et sert sa génération.",
    },
    values: {
      title: "Nos valeurs",
      text: "La foi, l'amour, l'unité, la prière et le service sont au cœur de notre vie communautaire.",
    },
    valuesList: [
      { title: "La foi", text: "Confiance en Dieu et en sa Parole." },
      { title: "L'amour", text: "Aimer Dieu et son prochain comme soi-même." },
      { title: "L'unité", text: "Vivre ensemble dans la paix et la fraternité." },
      { title: "La prière", text: "Une église qui prie et intercède pour les autres." },
      { title: "Le service", text: "Servir Dieu et la communauté avec joie." },
    ],
    leadership: {
      title: "Notre équipe",
      text: "Une équipe de pasteurs, de diacres et de responsables, au service de l'église et de sa communauté.",
      senior: "Responsable principal",
    },
    statsTitle: "L'église en quelques chiffres",
    stats: {
      years: "Années de service",
      departments: "Départements actifs",
      sermons: "Messages partagés",
      events: "Événements à venir",
    },
    bannerTitle: "Une famille, une foi, une mission",
    bannerText:
      "Rejoignez la famille AD Niamey 2000. Célébrons, prions et servons ensemble, car il y a de la place pour vous parmi nous.",
    departments: {
      title: "Nos départements",
      text: "Découvrez les différents départements de l'église.",
    },
    departmentsList: [
      { name: "Chorale", description: "La louange et l'adoration par le chant." },
      { name: "Jeunesse", description: "Encadrement et formation des jeunes." },
      { name: "Femmes", description: "Épanouissement et soutien des femmes." },
      { name: "Hommes", description: "Fratrie et édification des hommes." },
      { name: "Enfants", description: "École du dimanche pour les enfants." },
      { name: "Évangélisation", description: "Témoigner et partager l'Évangile." },
    ],
  },
  events: {
    title: "Événements",
    subtitle: "Les rencontres, activités et annonces de l'église.",
    upcoming: "À venir",
    past: "Passés",
    time: "Heure",
    place: "Lieu",
    galleryTitle: "En images",
    gallerySubtitle: "Quelques moments de la vie de l'église.",
    details: "Détails",
    welcomeNote: "Venez nombreux — vous êtes les bienvenus.",
    searchPlaceholder: "Rechercher un événement…",
    noResults: "Aucun événement ne correspond à votre recherche.",
    filterLabel: "Filtrer par mois",
    allMonths: "Tous les mois",
    emptyDay: "Aucun événement ce jour.",
    monthPrev: "Mois précédent",
    monthNext: "Mois suivant",
  },
  sermons: {
    title: "Sermons",
    subtitle: "Regardez et écoutez les messages partagés à l'église.",
    watch: "Regarder",
    summary: "Résumé",
    searchPlaceholder: "Rechercher un sermon…",
    sortNewest: "Plus récents",
    sortOldest: "Plus anciens",
    noResults: "Aucun sermon ne correspond à votre recherche.",
  },
  gallery: {
    title: "Galerie",
    subtitle: "Quelques moments de la vie de notre église.",
    empty: "Les photos seront bientôt disponibles.",
  },
  contact: {
    title: "Contact",
    subtitle: "Une question, une prière, un besoin ? Écrivez-nous.",
    addressLabel: "Adresse",
    phoneLabel: "Téléphone",
    emailLabel: "E-mail",
    hoursLabel: "Horaires des cultes",
    form: {
      name: "Votre nom",
      email: "Votre e-mail",
      subject: "Sujet",
      subjectPlaceholder: "Choisir un sujet…",
      subjects: [
        "Demande de prière",
        "Information générale",
        "Visite d'église",
        "Baptême",
        "Mariage",
        "Funérailles",
        "Ministère / Engagement bénévole",
        "Don / Soutien financier",
        "Événement",
        "Partenariat",
        "Média / Témoignage",
        "Réclamation / Suggestion",
        "Autre",
      ],
      message: "Votre message",
      document: "Joindre un document (facultatif)",
      documentHint: "PDF, Word, Excel ou image — 10 Mo maximum.",
      send: "Envoyer",
      sending: "Envoi en cours…",
      success: "Merci ! Votre message a bien été envoyé.",
      error: "Une erreur est survenue, veuillez réessayer.",
      fileTooBig: "Le fichier dépasse la taille maximale (10 Mo).",
    },
  },
  newsletter: {
    title: "Infolettre",
    text: "Recevez les actualités de l'église par e-mail.",
    placeholder: "Votre adresse e-mail",
    button: "S'abonner",
    success: "Merci ! Votre inscription est confirmée.",
    error: "Une erreur est survenue, veuillez réessayer.",
    already: "Cette adresse est déjà inscrite à la newsletter.",
    invalid: "Adresse e-mail invalide.",
    confirm: "Vérifiez votre boîte mail pour confirmer votre inscription.",
    choiceTitle: "Choisissez votre langue",
    choiceText: "Dans quelle langue souhaitez-vous recevoir l'infolettre ?",
  },
  footer: {
    aboutText:
      "L'Assemblée de Dieu Niamey 2000 annonce l'Évangile de Jésus-Christ à Niamey et au-delà. Vous êtes les bienvenus !",
    quickLinks: "Liens rapides",
    servicesTitle: "Cultes",
    contactTitle: "Contact",
    rights: "Tous droits réservés.",
    madeWith: "Avec amour pour Dieu et pour vous.",
    admin: "Espace admin",
    terms: "Conditions d'utilisation",
    privacy: "Politique de confidentialité",
  },
  conditions: {
    title: "Conditions d'utilisation",
    updated: "Dernière mise à jour : 22 août 2026",
    s1Title: "1. Acceptation des conditions",
    s1Text: "En accédant et en utilisant le site web de l'Assemblée de Dieu Niamey 2000 (« AD Niamey 2000 »), vous acceptez les présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser ce site.",
    s2Title: "2. Description du site",
    s2Text: "Ce site a pour objet de fournir au public des informations sur les activités, les services, les sermons et les événements de l'Assemblée de Dieu Niamey 2000. Le contenu est fourni à titre informatif uniquement.",
    s3Title: "3. Utilisation du site",
    s3Text: "Vous vous engagez à :",
    s3List: [
      "Utiliser le site de manière respectueuse et conforme à la loi",
      "Ne pas tenter d'accéder aux parties sécurisées du site sans autorisation",
      "Ne pas utiliser le site à des fins commerciales non autorisées",
      "Ne pas perturber ou endommager le fonctionnement du site",
    ],
    s4Title: "4. Propriété intellectuelle",
    s4Text: "Le contenu de ce site (textes, images, logos, vidéos, sermons) est la propriété de l'AD Niamey 2000 ou de ses partenaires et est protégé par les lois en vigueur sur la propriété intellectuelle. Toute reproduction non autorisée est interdite.",
    s5Title: "5. Liens externes",
    s5Text: "Ce site peut contenir des liens vers des sites tiers (YouTube, etc.). L'AD Niamey 2000 n'exerce aucun contrôle sur le contenu de ces sites et décline toute responsabilité concernant leur contenu ou leurs pratiques.",
    s6Title: "6. Contact",
    s6Text: "Pour toute question concernant ces conditions d'utilisation, vous pouvez nous contacter à l'adresse :",
  },
  confidentialite: {
    title: "Politique de confidentialité",
    updated: "Dernière mise à jour : 22 août 2026",
    s1Title: "1. Données collectées",
    s1Text: "Le site de l'AD Niamey 2000 collecte les données suivantes :",
    s1List: [
      { strong: "Formulaire de contact :", text: "nom, adresse e-mail, sujet et message. Ces données sont utilisées uniquement pour répondre à votre demande." },
      { strong: "Newsletter :", text: "adresse e-mail. Utilisée uniquement pour l'envoi de la newsletter de l'église, avec votre consentement explicite (double opt-in)." },
    ],
    s2Title: "2. Utilisation des données",
    s2Text: "Vos données personnelles sont utilisées exclusivement pour :",
    s2List: [
      "Répondre aux messages envoyés via le formulaire de contact",
      "Vous envoyer la newsletter si vous y avez souscrit",
      "Assurer le bon fonctionnement technique du site",
    ],
    s3Title: "3. Partage des données",
    s3Text: "L'AD Niamey 2000 ne vend, ne loue et ne partage pas vos données personnelles avec des tiers, sauf obligation légale.",
    s4Title: "4. Sécurité",
    s4Text: "Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte ou modification.",
    s5Title: "5. Cookies",
    s5Text: "Ce site utilise uniquement des cookies techniques nécessaires à son bon fonctionnement (session d'administration). Aucun cookie publicitaire ou de suivi n'est utilisé.",
    s6Title: "6. Vos droits",
    s6Text: "Conformément à la réglementation en vigueur, vous disposez des droits suivants concernant vos données personnelles :",
    s6List: [
      { strong: "Droit d'accès :", text: "obtenir une copie de vos données" },
      { strong: "Droit de rectification :", text: "corriger des données inexactes" },
      { strong: "Droit de suppression :", text: "demander la suppression de vos données" },
      { strong: "Droit de désinscription :", text: "vous désinscrire de la newsletter à tout moment" },
    ],
    s7Title: "7. Durée de conservation",
    s7Text: "Vos données de contact sont conservées le temps nécessaire au traitement de votre demande. Les données de newsletter sont conservées tant que votre abonnement est actif.",
    s8Title: "8. Contact",
    s8Text: "Pour toute question relative à la protection de vos données personnelles, contactez-nous à :",
  },
  meta: {
    description:
      "Site officiel de l'Assemblée de Dieu Niamey 2000 — Annoncer la bonne nouvelle de Christ à Niamey, au Niger et au-delà.",
    aboutDescription:
      "Découvrez l'Assemblée de Dieu Niamey 2000 — notre mission, notre histoire, nos valeurs et l'équipe qui conduit l'œuvre de Dieu à Niamey.",
    sermonsDescription:
      "Retrouvez les prédications et enseignements bibliques de l'AD Niamey 2000. Écoutez ou téléchargez les messages pour grandir dans la foi.",
    eventsDescription:
      "Consultez les événements, retraites et conférences à venir à l'AD Niamey 2000. Ne manquez aucune occasion de grandir spirituellement.",
    announcementsDescription:
      "Les dernières annonces et actualités de l'AD Niamey 2000. Restez informé des activités et initiatives de l'église.",
    contactDescription:
      "Contactez l'AD Niamey 2000 — envoyez-nous un message, posez vos questions ou planifiez votre visite. Nous serons ravis de vous entendre.",
    galleryDescription:
      "Découvrez les photos et moments forts de la vie de l'AD Niamey 2000 — cultes, événements, baptêmes et vie communautaire.",
  },
  notFound: {
    title: "Page introuvable",
    text: "La page que vous recherchez n'existe pas ou a été déplacée.",
    backHome: "Retour à l'accueil",
  },
};

const en: Dict = {
  lang: "en",
  nav: {
    home: "Home",
    about: "About",
    events: "Events",
    sermons: "Sermons",
    gallery: "Gallery",
    contact: "Contact",
    announcements: "Announcements",
  },
  actions: {
    learnMore: "Learn more",
    watchSermon: "Watch",
    allSermons: "All sermons",
    allEvents: "All events",
    contactUs: "Contact us",
    joinUs: "Join us",
    schedule: "Our schedule",
  },
  home: {
    hero: {
      badge: "AD Niamey 2000 · Assemblies of God in Niger",
      title: "Welcome to ",
      highlight: "AD Niamey 2000",
      subtitle:
        "A community of faith in the heart of Niamey. Come worship, grow and serve together.",
      cta1: "Join us",
      cta2: "Listen to a sermon",
    },
    welcome: {
      title: "Welcome to our church",
      text1:
        "AD Niamey 2000 is a living Christian community proclaiming the Gospel of Jesus Christ in Niamey, in Niger and beyond.",
      text2:
        "Whether you are a member or a visitor, you are welcome. Come and discover the joy of faith, brotherly love and the power of the Word of God.",
      features: [
        { title: "The Word of God", text: "Clear, uplifting messages centred on the Bible." },
        { title: "A family", text: "A place of love, welcome and fellowship for all." },
        { title: "The mission", text: "Evangelising and reaching new people for Christ." },
      ],
    },
    schedule: {
      title: "Our services and activities",
      subtitle: "Come and join us, you are welcome.",
      viewEvents: "View events",
      services: [
        { day: "Sunday", time: "09:00 – 11:30", name: "Worship and praise service" },
        { day: "Tuesday", time: "05:30 – 07:00 PM", name: "Bible study" },
        { day: "Thursday", time: "06:00 – 07:30 PM", name: "Prayer and intercession" },
        { day: "Friday", time: "05:00 – 07:00 PM", name: "Choir rehearsal" },
      ],
    },
    sermons: {
      title: "Latest sermons",
      subtitle: "Listen and share the Word of God.",
    },
    events: {
      title: "Upcoming events",
      subtitle: "Stay informed about church life.",
    },
    donation: {
      title: "Support the church",
      text: "You can support the church's mission through your gifts and offerings.",
      note: "Donation details are available at the church or by contacting us directly.",
    },
    announcements: {
      title: "Announcements",
      subtitle: "The latest news and notices from the life of the church.",
      viewAll: "View all announcements",
      tickerLabel: "Highlights",
    },
    verse: {
      title: "Verse of the Day",
      subtitle: "A word to meditate on each day.",
    },
    annualTheme: {
      title: "Theme of the Year",
      yearLabel: "Year",
      themeLabel: "Theme",
      verseLabel: "Verse of the Year",
    },
  },
  announcements: {
    title: "Announcements",
    subtitle: "Find the announcements of each Sunday and the latest church news.",
    empty: "No announcements yet. Come back soon!",
    publishedOn: "Posted on",
    readMore: "Read more",
  },
  verse: {
    title: "Verse of the Day",
    subtitle: "A Word of God to start the day.",
    reference: "Louis Segond",
  },
  about: {
    title: "About us",
    subtitle: "A church at the heart of Niamey: one family, one faith, one mission.",
    intro:
      "The Assemblies of God Niamey 2000 is a church of the Assemblies of God family in Niger, committed to proclaiming the Gospel and making disciples of Jesus Christ.",
    intro2:
      "Since the year 2000, we gather to worship God, grow in his Word and serve the city of Niamey in love and unity. Every Sunday, families, youth and children come together to share the joy of the Gospel, in a spirit of fellowship and mutual support.",
    mission: {
      title: "Our mission",
      text: "To proclaim the good news of Jesus Christ, to evangelise, to share the Word of God and to reach new people through love and witness.",
    },
    vision: {
      title: "Our vision",
      text: "To be a shining church in the city of Niamey, where every person encounters God, grows in faith and serves their generation.",
    },
    values: {
      title: "Our values",
      text: "Faith, love, unity, prayer and service are at the heart of our community life.",
    },
    valuesList: [
      { title: "Faith", text: "Trust in God and in his Word." },
      { title: "Love", text: "Loving God and your neighbour as yourself." },
      { title: "Unity", text: "Living together in peace and fellowship." },
      { title: "Prayer", text: "A church that prays and intercedes for others." },
      { title: "Service", text: "Serving God and the community with joy." },
    ],
    leadership: {
      title: "Our team",
      text: "A team of pastors, deacons and leaders serving the church and its community.",
      senior: "Team leader",
    },
    statsTitle: "The church in numbers",
    stats: {
      years: "Years of service",
      departments: "Active departments",
      sermons: "Messages shared",
      events: "Upcoming events",
    },
    bannerTitle: "One family, one faith, one mission",
    bannerText:
      "Join the AD Niamey 2000 family. Let us worship, pray and serve together, because there is room for you among us.",
    departments: {
      title: "Our departments",
      text: "Discover the different departments of the church.",
    },
    departmentsList: [
      { name: "Choir", description: "Praise and worship through singing." },
      { name: "Youth", description: "Supporting and discipling young people." },
      { name: "Women", description: "Growth and support of women." },
      { name: "Men", description: "Fellowship and edification of men." },
      { name: "Children", description: "Sunday school for children." },
      { name: "Evangelism", description: "Witnessing and sharing the Gospel." },
    ],
  },
  events: {
    title: "Events",
    subtitle: "The church's meetings, activities and announcements.",
    upcoming: "Upcoming",
    past: "Past",
    time: "Time",
    place: "Place",
    galleryTitle: "In pictures",
    gallerySubtitle: "Some moments from the life of our church.",
    details: "Details",
    welcomeNote: "Come and join us — you are most welcome.",
    searchPlaceholder: "Search for an event…",
    noResults: "No events match your search.",
    filterLabel: "Filter by month",
    allMonths: "All months",
    emptyDay: "No events that day.",
    monthPrev: "Previous month",
    monthNext: "Next month",
  },
  sermons: {
    title: "Sermons",
    subtitle: "Watch and listen to the messages shared at church.",
    watch: "Watch",
    summary: "Summary",
    searchPlaceholder: "Search for a sermon…",
    sortNewest: "Newest first",
    sortOldest: "Oldest first",
    noResults: "No sermons match your search.",
  },
  gallery: {
    title: "Gallery",
    subtitle: "Some moments from the life of our church.",
    empty: "Photos coming soon.",
  },
  contact: {
    title: "Contact",
    subtitle: "A question, a prayer, a need? Write to us.",
    addressLabel: "Address",
    phoneLabel: "Phone",
    emailLabel: "E-mail",
    hoursLabel: "Service times",
    form: {
      name: "Your name",
      email: "Your e-mail",
      subject: "Subject",
      subjectPlaceholder: "Choose a subject…",
      subjects: [
        "Prayer request",
        "General information",
        "Church visit",
        "Baptism",
        "Wedding",
        "Funeral",
        "Ministry / Volunteer",
        "Giving / Offering",
        "Event",
        "Partnership",
        "Media / Testimony",
        "Feedback / Suggestion",
        "Other",
      ],
      message: "Your message",
      document: "Attach a document (optional)",
      documentHint: "PDF, Word, Excel or image — 10 MB maximum.",
      send: "Send",
      sending: "Sending…",
      success: "Thank you! Your message has been sent.",
      error: "Something went wrong, please try again.",
      fileTooBig: "The file exceeds the maximum size (10 MB).",
    },
  },
  newsletter: {
    title: "Newsletter",
    text: "Receive church news by email.",
    placeholder: "Your email address",
    button: "Subscribe",
    success: "Thank you! You're subscribed.",
    error: "Something went wrong, please try again.",
    already: "This address is already subscribed.",
    invalid: "Invalid email address.",
    confirm: "Check your inbox to confirm your subscription.",
    choiceTitle: "Choose your language",
    choiceText: "In which language would you like to receive the newsletter?",
  },
  footer: {
    aboutText:
      "The Assemblies of God Niamey 2000 proclaims the Gospel of Jesus Christ in Niamey and beyond. You are welcome!",
    quickLinks: "Quick links",
    servicesTitle: "Services",
    contactTitle: "Contact",
    rights: "All rights reserved.",
    madeWith: "With love for God and for you.",
    admin: "Admin area",
    terms: "Terms of Service",
    privacy: "Privacy Policy",
  },
  conditions: {
    title: "Terms of Service",
    updated: "Last updated: August 22, 2026",
    s1Title: "1. Acceptance of terms",
    s1Text: "By accessing and using the website of the Assemblies of God Niamey 2000 (\"AD Niamey 2000\"), you agree to these terms of service. If you do not agree to these terms, please do not use this site.",
    s2Title: "2. Description of the site",
    s2Text: "This site aims to provide the public with information about the activities, services, sermons and events of the Assemblies of God Niamey 2000. The content is provided for informational purposes only.",
    s3Title: "3. Use of the site",
    s3Text: "You agree to:",
    s3List: [
      "Use the site in a respectful and lawful manner",
      "Not attempt to access secured parts of the site without authorization",
      "Not use the site for unauthorized commercial purposes",
      "Not disrupt or damage the operation of the site",
    ],
    s4Title: "4. Intellectual property",
    s4Text: "The content of this site (texts, images, logos, videos, sermons) is the property of AD Niamey 2000 or its partners and is protected by applicable intellectual property laws. Any unauthorized reproduction is prohibited.",
    s5Title: "5. External links",
    s5Text: "This site may contain links to third-party sites (YouTube, etc.). AD Niamey 2000 exercises no control over the content of these sites and declines all responsibility regarding their content or practices.",
    s6Title: "6. Contact",
    s6Text: "For any questions regarding these terms of service, you may contact us at:",
  },
  confidentialite: {
    title: "Privacy Policy",
    updated: "Last updated: August 22, 2026",
    s1Title: "1. Data collected",
    s1Text: "The AD Niamey 2000 website collects the following data:",
    s1List: [
      { strong: "Contact form:", text: "name, email address, subject and message. This data is used solely to respond to your request." },
      { strong: "Newsletter:", text: "email address. Used only for sending the church newsletter, with your explicit consent (double opt-in)." },
    ],
    s2Title: "2. Use of data",
    s2Text: "Your personal data is used exclusively to:",
    s2List: [
      "Respond to messages sent via the contact form",
      "Send you the newsletter if you have subscribed",
      "Ensure proper technical operation of the site",
    ],
    s3Title: "3. Data sharing",
    s3Text: "AD Niamey 2000 does not sell, rent or share your personal data with third parties, except as required by law.",
    s4Title: "4. Security",
    s4Text: "We implement appropriate technical and organizational measures to protect your data against unauthorized access, loss or modification.",
    s5Title: "5. Cookies",
    s5Text: "This site uses only technical cookies necessary for its proper functioning (admin session). No advertising or tracking cookies are used.",
    s6Title: "6. Your rights",
    s6Text: "In accordance with applicable regulations, you have the following rights regarding your personal data:",
    s6List: [
      { strong: "Right of access:", text: "obtain a copy of your data" },
      { strong: "Right to rectification:", text: "correct inaccurate data" },
      { strong: "Right to deletion:", text: "request the deletion of your data" },
      { strong: "Right to unsubscribe:", text: "unsubscribe from the newsletter at any time" },
    ],
    s7Title: "7. Retention period",
    s7Text: "Your contact data is retained for the time necessary to process your request. Newsletter data is retained as long as your subscription is active.",
    s8Title: "8. Contact",
    s8Text: "For any questions regarding the protection of your personal data, contact us at:",
  },
  meta: {
    description:
      "Official website of the Assemblies of God Niamey 2000 — Proclaiming the good news of Christ in Niamey, Niger and beyond.",
    aboutDescription:
      "Discover the Assemblies of God Niamey 2000 — our mission, history, values and the team leading God's work in Niamey.",
    sermonsDescription:
      "Browse the sermons and Bible teachings from AD Niamey 2000. Listen to or download messages to grow in your faith.",
    eventsDescription:
      "Check out upcoming events, retreats and conferences at AD Niamey 2000. Don't miss any opportunity for spiritual growth.",
    announcementsDescription:
      "The latest announcements and news from AD Niamey 2000. Stay informed about church activities and initiatives.",
    contactDescription:
      "Contact AD Niamey 2000 — send us a message, ask questions or plan your visit. We'd love to hear from you.",
    galleryDescription:
      "Discover photos and highlights from the life of AD Niamey 2000 — services, events, baptisms and community life.",
  },
  notFound: {
    title: "Page not found",
    text: "The page you are looking for does not exist or has been moved.",
    backHome: "Back to home",
  },
};

export const dictionaries: Record<Locale, Dict> = { fr, en };

export function getDict(locale: Locale): Dict {
  return dictionaries[locale] ?? fr;
}
