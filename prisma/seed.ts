import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";
import { buildPrismaAdapter } from "../src/lib/db";

const prisma = new PrismaClient({ adapter: buildPrismaAdapter() });

async function main() {
  const adminEmail = "admin@adniamey2000.org";
  const existing = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existing) {
    const password = await bcrypt.hash("admin123", 10);
    await prisma.user.create({
      data: { email: adminEmail, name: "Administrateur", password },
    });
    console.log(`Admin créé : ${adminEmail} / admin123`);
  }

  await prisma.sermon.deleteMany();
  await prisma.churchEvent.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.department.deleteMany();
  await prisma.scheduleItem.deleteMany();
  await prisma.donationInfo.deleteMany();
  await prisma.galleryImage.deleteMany();
  await prisma.siteSetting.deleteMany();

  const sermons = [    {
      titleFr: "La puissance de la foi",
      titleEn: "The power of faith",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      date: new Date("2026-08-10"),
      speaker: "Pasteur",
      summaryFr: "Découvrez comment la foi peut transformer votre vie et vos circonstances.",
      summaryEn: "Discover how faith can transform your life and circumstances.",
    },
    {
      titleFr: "La prière qui déplace les montagnes",
      titleEn: "Prayer that moves mountains",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      date: new Date("2026-08-03"),
      speaker: "Pasteur",
      summaryFr: "Un message sur le pouvoir de la prière persévérante.",
      summaryEn: "A message on the power of persevering prayer.",
    },
    {
      titleFr: "La grâce de Dieu",
      titleEn: "The grace of God",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      date: new Date("2026-07-27"),
      speaker: "Pasteur",
      summaryFr: "Comprendre l'amour inconditionnel de Dieu et sa grâce.",
      summaryEn: "Understanding God's unconditional love and grace.",
    },
  ];
  await prisma.sermon.createMany({ data: sermons });

  const events = [
    {
      titleFr: "Convention de la jeunesse",
      titleEn: "Youth convention",
      date: new Date("2026-09-12"),
      time: "09h00",
      place: "Église AD Niamey 2000",
      summaryFr: "Un temps fort de louange, de formation et d'enseignements pour la jeunesse.",
      summaryEn: "A powerful time of praise, training and teaching for the youth.",
    },
    {
      titleFr: "Séminaire de prière",
      titleEn: "Prayer seminar",
      date: new Date("2026-09-26"),
      time: "08h00",
      place: "Église AD Niamey 2000",
      summaryFr: "Apprendre et pratiquer la prière en profondeur.",
      summaryEn: "Learn and practice deep prayer.",
    },
    {
      titleFr: "Campagne d'évangélisation",
      titleEn: "Evangelism campaign",
      date: new Date("2026-10-10"),
      time: "16h00",
      place: "Place publique de Niamey",
      summaryFr: "Annoncer la bonne nouvelle de Jésus-Christ à tous.",
      summaryEn: "Proclaiming the good news of Jesus Christ to all.",
    },
  ];
  await prisma.churchEvent.createMany({ data: events });

  const announcements = [
    {
      titleFr: "Culte de ce dimanche : « La puissance de la foi »",
      titleEn: "This Sunday's service: 'The power of faith'",
      contentFr:
        "Soyez les bienvenus ce dimanche pour un culte de louange et d'adoration. Le pasteur partagera un message sur la foi. N'oubliez pas d'inviter un proche !",
      contentEn:
        "You are welcome this Sunday for a time of praise and worship. The pastor will share a message on faith. Don't forget to invite a friend!",
      date: new Date("2026-08-09"),
      isPublished: true,
    },
    {
      titleFr: "Répétition de la chorale vendredi",
      titleEn: "Choir rehearsal on Friday",
      contentFr:
        "La répétition de la chorale aura lieu vendredi à 17h00. Tous les choristes sont attendus ainsi que les nouveaux membres souhaitant rejoindre la chorale.",
      contentEn:
        "Choir rehearsal will take place on Friday at 5:00 PM. All choir members are expected, as well as new members wishing to join.",
      date: new Date("2026-08-14"),
      isPublished: true,
    },
    {
      titleFr: "Inscription à l'école du dimanche",
      titleEn: "Sunday school registration",
      contentFr:
        "Les inscriptions pour l'école du dimanche des enfants sont ouvertes. Inscrivez vos enfants auprès des responsables du département des enfants.",
      contentEn:
        "Registration for children's Sunday school is now open. Register your children with the children's department leaders.",
      date: new Date("2026-08-21"),
      isPublished: true,
    },
  ];
  await prisma.announcement.createMany({ data: announcements });

  const departments = [
    {
      nameFr: "Chorale",
      nameEn: "Choir",
      descFr: "La louange et l'adoration par le chant.",
      descEn: "Praise and worship through singing.",
      sortOrder: 1,
    },
    {
      nameFr: "Jeunesse",
      nameEn: "Youth",
      descFr: "Encadrement et formation des jeunes.",
      descEn: "Supporting and discipling young people.",
      sortOrder: 2,
    },
    {
      nameFr: "Femmes",
      nameEn: "Women",
      descFr: "Épanouissement et soutien des femmes.",
      descEn: "Growth and support of women.",
      sortOrder: 3,
    },
    {
      nameFr: "Hommes",
      nameEn: "Men",
      descFr: "Fratrie et édification des hommes.",
      descEn: "Fellowship and edification of men.",
      sortOrder: 4,
    },
    {
      nameFr: "Enfants",
      nameEn: "Children",
      descFr: "École du dimanche pour les enfants.",
      descEn: "Sunday school for children.",
      sortOrder: 5,
    },
    {
      nameFr: "Évangélisation",
      nameEn: "Evangelism",
      descFr: "Témoigner et partager l'Évangile.",
      descEn: "Witnessing and sharing the Gospel.",
      sortOrder: 6,
    },
  ];
  await prisma.department.createMany({ data: departments });

  const schedule = [
    {
      dayFr: "Dimanche",
      dayEn: "Sunday",
      time: "09h00 – 11h30",
      nameFr: "Culte de louange et d'adoration",
      nameEn: "Worship and praise service",
      sortOrder: 1,
    },
    {
      dayFr: "Mardi",
      dayEn: "Tuesday",
      time: "17h30 – 19h00",
      nameFr: "Étude biblique",
      nameEn: "Bible study",
      sortOrder: 2,
    },
    {
      dayFr: "Jeudi",
      dayEn: "Thursday",
      time: "18h00 – 19h30",
      nameFr: "Intercession et prière",
      nameEn: "Prayer and intercession",
      sortOrder: 3,
    },
    {
      dayFr: "Vendredi",
      dayEn: "Friday",
      time: "17h00 – 19h00",
      nameFr: "Répétition de la chorale",
      nameEn: "Choir rehearsal",
      sortOrder: 4,
    },
  ];
  await prisma.scheduleItem.createMany({ data: schedule });

  const donations = [
    { label: "Orange Money", value: "90 00 00 00", sortOrder: 1 },
    { label: "MobiCash", value: "90 00 00 00", sortOrder: 2 },
    { label: "Compte bancaire", value: "BIA Niger – 00000 00000 00000", sortOrder: 3 },
  ];
  await prisma.donationInfo.createMany({ data: donations });

  const settings = [
    { key: "address", valueFr: "Quartier Abidjan, Niamey, Niger", valueEn: "Abidjan district, Niamey, Niger" },
    { key: "phone", valueFr: "+227 00 00 00 00", valueEn: "+227 00 00 00 00" },
    { key: "email", valueFr: "contact@adniamey2000.org", valueEn: "contact@adniamey2000.org" },
  ];
  await prisma.siteSetting.createMany({ data: settings });

  const gallery = [
    { url: "/adlogo.jpg", captionFr: "Logo AD Niamey 2000", captionEn: "AD Niamey 2000 logo", sortOrder: 1 },
    { url: "/adlogo.jpg", captionFr: "Bienvenue à l'église", captionEn: "Welcome to church", sortOrder: 2 },
    { url: "/adlogo.jpg", captionFr: "Culte du dimanche", captionEn: "Sunday service", sortOrder: 3 },
  ];
  await prisma.galleryImage.createMany({ data: gallery });

  console.log("Seed terminé.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
