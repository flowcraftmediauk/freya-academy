import {
  embeddedFounderImage,
  embeddedHeroImage,
  embeddedTreatmentImage,
} from '../assets/imagesData';

export {
  embeddedFounderImage,
  embeddedHeroImage,
  embeddedTreatmentImage,
};

/**
 * Resolves hero banner image to ensure it works 100% reliably in production builds
 * (Netlify, Vercel, Hostinger, GitHub Pages) without any 404 network errors.
 */
export function resolveHeroImage(url?: string): string {
  if (!url || typeof url !== 'string') return embeddedHeroImage;
  if (
    url.startsWith('/src/') ||
    url.includes('freya_academy_hero') ||
    url.includes('hero_clinic') ||
    url.startsWith('/images/freya_academy_hero')
  ) {
    return embeddedHeroImage;
  }
  return url;
}

/**
 * Resolves doctor/founder portrait to ensure it works 100% reliably in production builds
 * (Netlify, Vercel, Hostinger) without any 404 network errors.
 */
export function resolveFounderImage(url?: string): string {
  if (!url || typeof url !== 'string') return embeddedFounderImage;
  if (
    url.startsWith('/src/') ||
    url.includes('freya_academy_founder') ||
    url.includes('clinic_consultation') ||
    url.startsWith('/images/freya_academy_founder')
  ) {
    return embeddedFounderImage;
  }
  return url;
}

/**
 * Resolves service card image to ensure it works 100% reliably in production builds.
 */
export function resolveServiceImage(url?: string): string {
  if (!url || typeof url !== 'string') return embeddedTreatmentImage;
  if (
    url.startsWith('/src/') ||
    url.includes('clinic_wellness_treatment') ||
    url.startsWith('/images/clinic_wellness_treatment')
  ) {
    return embeddedTreatmentImage;
  }
  return url;
}
