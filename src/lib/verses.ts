export type Verse = {
  text: string;
  reference: string;
};

const VERSES: Verse[] = [
  { text: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.", reference: "Jean 3:16" },
  { text: "L'Éternel est mon berger: je ne manquerai de rien.", reference: "Psaume 23:1" },
  { text: "Dieu est pour nous un refuge et un appui, un secours qui ne manque jamais dans la détresse.", reference: "Psaume 46:2" },
  { text: "Je puis tout par celui qui me fortifie.", reference: "Philippiens 4:13" },
  { text: "Ne t'ai-je pas ordonné: Fortifie-toi et prends courage? Ne t'effraie point et ne t'épouvante point, car l'Éternel, ton Dieu, est avec toi dans tout ce que tu entreprendras.", reference: "Josué 1:9" },
  { text: "Ne crains rien, car je suis avec toi; ne promène pas des regards inquiets, car je suis ton Dieu; je te fortifie, je viens à ton secours, je te soutiens de ma droite triomphante.", reference: "Ésaïe 41:10" },
  { text: "Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos.", reference: "Matthieu 11:28" },
  { text: "Car je connais les projets que j'ai formés sur vous, dit l'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l'espérance.", reference: "Jérémie 29:11" },
  { text: "Nous savons, du reste, que toutes choses concourent au bien de ceux qui aiment Dieu, de ceux qui sont appelés selon son dessein.", reference: "Romains 8:28" },
  { text: "Pour nous, nous l'aimons, parce qu'il nous a aimés le premier.", reference: "1 Jean 4:19" },
  { text: "Le secours me vient de l'Éternel, qui a fait les cieux et la terre.", reference: "Psaume 121:2" },
  { text: "Confie-toi en l'Éternel de tout ton cœur, et ne t'appuie pas sur ta sagesse; reconnais-le dans toutes tes voies, et il aplanira tes sentiers.", reference: "Proverbes 3:5-6" },
  { text: "Mais le fruit de l'Esprit, c'est l'amour, la joie, la paix, la patience, la bonté, la bénignité, la fidélité, la douceur, la tempérance.", reference: "Galates 5:22-23" },
  { text: "Sentez et voyez combien l'Éternel est bon! Heureux l'homme qui cherche en lui son refuge!", reference: "Psaume 34:9" },
  { text: "Car c'est par la grâce que vous êtes sauvés, par le moyen de la foi. Et cela ne vient pas de vous, c'est le don de Dieu.", reference: "Éphésiens 2:8" },
  { text: "Arrêtez, et sachez que je suis Dieu: Je domine sur les nations, je domine sur la terre.", reference: "Psaume 46:11" },
  { text: "Cherchez premièrement le royaume et la justice de Dieu; et toutes ces choses vous seront données par-dessus.", reference: "Matthieu 6:33" },
  { text: "Mais ceux qui se confient en l'Éternel renouvellent leur force. Ils prennent le vol comme les aigles; ils courent, et ne se lassent point; ils marchent, et ne se fatiguent point.", reference: "Ésaïe 40:31" },
  { text: "C'est ici la journée que l'Éternel a faite; qu'elle soit pour nous un sujet d'allégresse et de joie!", reference: "Psaume 118:24" },
  { text: "Car ce n'est pas un esprit de timidité que Dieu nous a donné, mais un esprit de force, d'amour et de sagesse.", reference: "2 Timothée 1:7" },
  { text: "Je vous laisse la paix, je vous donne ma paix. Je ne vous donne pas comme le monde donne. Que votre cœur ne se trouble point, et ne s'alarme point.", reference: "Jean 14:27" },
  { text: "Quand je marche dans la vallée de l'ombre de la mort, je ne crains aucun mal, car tu es avec moi: ta houlette et ton bâton me rassurent.", reference: "Psaume 23:4" },
  { text: "Réjouissez-vous en espérance. Soyez patients dans l'affliction. Persévérez dans la prière.", reference: "Romains 12:12" },
  { text: "Je te loue de ce que je suis une créature si merveilleuse. Tes œuvres sont admirables, et mon âme le reconnaît bien.", reference: "Psaume 139:14" },
  { text: "Or la foi est une ferme assurance des choses qu'on espère, une démonstration de celles qu'on ne voit pas.", reference: "Hébreux 11:1" },
  { text: "Ne vous inquiétez de rien; mais en toute chose faites connaître vos besoins à Dieu par des prières et des supplications, avec des actions de grâces. Et la paix de Dieu, qui surpasse toute intelligence, gardera vos cœurs et vos pensées en Jésus-Christ.", reference: "Philippiens 4:6-7" },
  { text: "L'Éternel est ma lumière et mon salut: de qui aurais-je peur? L'Éternel est le soutien de ma vie: de qui aurais-je frayeur?", reference: "Psaume 27:1" },
  { text: "Que tout ce que vous faites se fasse avec charité.", reference: "1 Corinthiens 16:14" },
  { text: "Recommande ton sort à l'Éternel, mets en lui ta confiance, et il agira.", reference: "Psaume 37:5" },
  { text: "Je suis la lumière du monde; celui qui me suit ne marchera pas dans les ténèbres, mais il aura la lumière de la vie.", reference: "Jean 8:12" },
];

export function dayOfYear(now = new Date()) {
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now.getTime() - start.getTime()) / 86400000);
}

export function getDailyVerse(now = new Date()): Verse {
  const index = dayOfYear(now) % VERSES.length;
  return VERSES[index];
}

export function youVersionApiKey() {
  return process.env.YVP_APP_KEY ?? process.env.YOUVERSION_API_KEY ?? "";
}
