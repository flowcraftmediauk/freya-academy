export interface SiteConfig {
  businessName: string;
  logoUrl: string;
  tagline: string;
  businessDescription: string;
  heroHeadline: string;
  heroSubheading: string;
  ctaText: string;
  heroImageUrl: string;
  aboutHeading: string;
  aboutDescription: string;
  aboutImageUrl: string;
  email: string;
  phone: string;
  whatsapp: string;
  whatsappUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  address: string;
  openingHours: string;
  updatedAt: string;
  updatedBy?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  ctaText: string;
  order: number;
  createdAt: string;
}

export interface Appointment {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  preferredDate: string;
  service: string;
  notes: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export const DEFAULT_EMPTY_SITE_CONFIG: SiteConfig = {
  businessName: 'Freya Academy',
  logoUrl: '',
  tagline: 'Formación Médica Real',
  businessDescription:
    'Formación práctica para médicos que buscan perfeccionar sus técnicas y elevar su práctica en Medicina Estética.',
  heroHeadline:
    'Formación práctica para médicos que buscan perfeccionar sus técnicas y elevar su práctica en Medicina Estética.',
  heroSubheading:
    'Metodología práctica hands-on y mentoría directa diseñada exclusivamente para médicos que desean dominar protocolos avanzados y transformar su consulta profesional.',
  ctaText: 'Conoce Freya',
  heroImageUrl: '/src/assets/images/freya_academy_hero_1790703932741.jpg',
  aboutHeading: 'Dra. Mónica Meneses',
  aboutDescription:
    'Fundadora & Directora Académica de Freya Academy.\n\nComprometida con la excelencia y la seguridad clínica, la Dra. Mónica Meneses lidera un programa de perfeccionamiento en Medicina Estética enfocado en destreza manual directa, análisis anatómico exhaustivo y aplicación rigurosa de técnicas de vanguardia.',
  aboutImageUrl: '/src/assets/images/freya_academy_founder_1790703920911.jpg',
  email: '',
  phone: '+591 62722266',
  whatsapp: '+591 62722266',
  whatsappUrl:
    'https://api.whatsapp.com/send/?phone=59162722266&text=Somos%20FREYA%20ACADEMY%20%C2%BFquieres%20inscribirte%20al%20curso%3F',
  facebookUrl: 'https://www.facebook.com/freyaacademiabo',
  instagramUrl: 'https://www.instagram.com/freyaacademiabo',
  address: '',
  openingHours: '',
  updatedAt: new Date().toISOString(),
};
