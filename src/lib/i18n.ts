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
  };
  announcements: {
    title: string;
    subtitle: string;
    empty: string;
    publishedOn: string;
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
  };
  footer: {
    aboutText: string;
    quickLinks: string;
    servicesTitle: string;
    contactTitle: string;
    rights: string;
    madeWith: string;
    admin: string;
  };
  meta: {
    description: string;
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
  },
  announcements: {
    title: "Annonces",
    subtitle: "Retrouvez les annonces de chaque dimanche et les dernières nouvelles de l'église.",
    empty: "Aucune annonce pour le moment. Revenez bientôt !",
    publishedOn: "Publiée le",
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
        "Demande de visite",
        "Don / Offrande",
        "Autre sujet",
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
    title: "Newsletter",
    text: "Recevez les actualités de l'église par e-mail.",
    placeholder: "Votre adresse e-mail",
    button: "S'abonner",
    success: "Merci ! Votre inscription est confirmée.",
    error: "Une erreur est survenue, veuillez réessayer.",
    already: "Cette adresse est déjà inscrite à la newsletter.",
    invalid: "Adresse e-mail invalide.",
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
  },
  meta: {
    description:
      "Site officiel de l'Assemblée de Dieu Niamey 2000 — Annoncer la bonne nouvelle de Christ à Niamey, au Niger et au-delà.",
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
  },
  announcements: {
    title: "Announcements",
    subtitle: "Find the announcements of each Sunday and the latest church news.",
    empty: "No announcements yet. Come back soon!",
    publishedOn: "Posted on",
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
        "Visitation request",
        "Giving / Offering",
        "Other subject",
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
  },
  meta: {
    description:
      "Official website of the Assemblies of God Niamey 2000 — Proclaiming the good news of Christ in Niamey, Niger and beyond.",
  },
};

export const dictionaries: Record<Locale, Dict> = { fr, en };

export function getDict(locale: Locale): Dict {
  return dictionaries[locale] ?? fr;
}
