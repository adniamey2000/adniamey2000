export const images = {
  hero: "/images/hero.jpg",
  welcome: "/images/welcome.jpg",
  worship: "/images/worship.jpg",
  schedule: "/images/schedule.jpg",
  pageHeader: "/images/pageHeader.jpg",
  pageHeaders: {
    about: "/images/headers/about.jpg",
    events: "/images/headers/events.jpg",
    sermons: "/images/headers/sermons.jpg",
    gallery: "/images/headers/gallery.jpg",
    contact: "/images/headers/contact.jpg",
    announcements: "/images/headers/events.jpg",
  },
};

export function isValidImageUrl(url: string | null | undefined): url is string {
  if (!url) return false;
  return url.startsWith("/") || /^https?:\/\//.test(url);
}
