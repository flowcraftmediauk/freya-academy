import defaultHeroImg from '../assets/images/freya_academy_hero_1790703932741.jpg';
import defaultFounderImg from '../assets/images/freya_academy_founder_1790703920911.jpg';
import defaultConsultationImg from '../assets/images/clinic_consultation_space_1790703391028.jpg';
import defaultTreatmentImg from '../assets/images/clinic_wellness_treatment_1790703406165.jpg';

export {
  defaultHeroImg,
  defaultFounderImg,
  defaultConsultationImg,
  defaultTreatmentImg,
};

/**
 * Resolves hero banner image to ensure it works reliably in production builds
 * (Netlify, Vercel, Hostinger) and local development.
 */
export function resolveHeroImage(url?: string): string {
  if (!url || typeof url !== 'string') return defaultHeroImg;
  if (url.startsWith('/src/') || url.includes('freya_academy_hero') || url.includes('hero_clinic')) {
    return defaultHeroImg;
  }
  return url;
}

/**
 * Resolves doctor/founder portrait to ensure it works reliably in production builds.
 */
export function resolveFounderImage(url?: string): string {
  if (!url || typeof url !== 'string') return defaultFounderImg;
  if (url.startsWith('/src/') || url.includes('freya_academy_founder') || url.includes('clinic_consultation')) {
    return defaultFounderImg;
  }
  return url;
}

/**
 * Resolves service card image to ensure it works reliably in production builds.
 */
export function resolveServiceImage(url?: string): string {
  if (!url || typeof url !== 'string') return defaultTreatmentImg;
  if (url.startsWith('/src/') || url.includes('clinic_wellness_treatment')) {
    return defaultTreatmentImg;
  }
  if (url.includes('clinic_consultation_space')) {
    return defaultConsultationImg;
  }
  return url;
}
