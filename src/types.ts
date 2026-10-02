export interface FeaturedCourseConfig {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  location: string;
  modality: string;
  seatsTotal: number;
  seatsLeft: number;
  targetAudience: string;
  syllabusHighlights: string[];
  isOpen: boolean;
}

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
  tiktokUrl?: string;
  address: string;
  openingHours: string;
  featuredCourse?: FeaturedCourseConfig;
  updatedAt: string;
  updatedBy?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  category?: string;
  imageUrl: string;
  ctaText: string;
  order: number;
  duration?: string;
  modality?: string;
  createdAt: string;
}

export interface Appointment {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  medicalSpecialty: 'Médico estético' | 'Médico dermatólogo' | 'Cirujano plástico' | string;
  preferredDate: string;
  service: string;
  notes: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export const DEFAULT_FEATURED_COURSE: FeaturedCourseConfig = {
  badge: 'Próxima Convocatoria • Cupos Limitados',
  title: 'Masterclass Avanzada: Armonización Facial & Bioestimuladores',
  subtitle: 'Técnicas de inyección segura con microcánula y anatomía de alta precisión',
  description:
    'Programa intensivo teórico-práctico hands-on diseñado para médicos que buscan perfeccionar su criterio estético, optimizar vectores de tracción facial y dominar el abordaje de complicaciones clínicas.',
  date: 'Próximamente • Fecha por Confirmar',
  location: 'Sede Freya Academy • Edificio Vitruvio II, Piso 3, N° 7979, Calacoto, La Paz, Bolivia',
  modality: '100% Práctico con Pacientes Reales',
  seatsTotal: 8,
  seatsLeft: 3,
  targetAudience: 'Médico estético, Médico dermatólogo, Cirujano plástico',
  syllabusHighlights: [
    'Mapeo ecográfico y vascular preventivo de zonas de riesgo',
    'Técnicas de anclaje cigomático y definición mandibular tridimensional',
    'Protocolos combinados de Hidroxiapatita de Calcio + Ácido Hialurónico',
    'Manejo de complicaciones y protocolos de reversión inmediata',
  ],
  isOpen: true,
};

export const DEFAULT_FREYA_COURSES: ServiceItem[] = [
  {
    id: 'course-curacion-de-heridas',
    title: 'Curación de Heridas',
    category: 'Manejo Tisular & Cicatrización',
    description:
      'Bases fisiopatológicas y protocolos clínicos avanzados para la cicatrización óptima. Abordaje de heridas agudas y crónicas, desbridamiento, apósitos bioactivos, prevención de cicatrices anómalas y regeneración tisular avanzada.',
    imageUrl: '/images/course_curacion_heridas.jpg',
    ctaText: 'Ver Temario & Cupos',
    order: 1,
    modality: 'Hands-On con Práctica Clínica',
    duration: 'Taller Práctico Intensivo',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'course-plasma-rico-en-plaquetas',
    title: 'Plasma Rico en Plaquetas',
    category: 'Terapias Biológicas & Regenerativas',
    description:
      'Protocolos rigurosos de centrifugación, activación y dosificación de PRP y PRF autólogo. Aplicación intradérmica y subdérmica para regeneración celular facial, rejuvenecimiento periocular, cuello y bioestimulación capilar.',
    imageUrl: '/images/course_plasma_rico_plaquetas.jpg',
    ctaText: 'Ver Temario & Cupos',
    order: 2,
    modality: 'Hands-On en Pacientes Reales',
    duration: 'Módulo Especializado',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'course-acido-hialuronico-lineas-finas',
    title: 'Ácido Hialurónico en Líneas Finas',
    category: 'Rellenos Dérmicos de Precisión',
    description:
      'Técnicas de microinyección superficial y blancheado (blanching technique) con ácidos hialurónicos de baja reticulación. Corrección milimétrica de código de barras, líneas de marioneta incipientes, patas de gallo y arrugas de reposo sin efecto Tyndall.',
    imageUrl: '/images/course_acido_hialuronico.jpg',
    ctaText: 'Ver Temario & Cupos',
    order: 3,
    modality: 'Hands-On en Pacientes Reales',
    duration: 'Módulo de Microprecisión',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'course-bloqueo-nervioso',
    title: 'Bloqueo Nervioso',
    category: 'Anestesiología & Confort',
    description:
      'Anatomía y técnica precisa de anestesia troncular y regional facial: nervio infraorbitario, mentoniano, supratroclear y supraorbitario. Procedimientos estéticos 100% confortables para el paciente con seguridad neurovascular absoluta.',
    imageUrl: '/images/course_bloqueo_nervioso.jpg',
    ctaText: 'Ver Temario & Cupos',
    order: 4,
    modality: 'Hands-On en Pacientes Reales',
    duration: 'Taller Práctico',
    createdAt: new Date().toISOString(),
  },
];

export const DEFAULT_EMPTY_SITE_CONFIG: SiteConfig = {
  businessName: 'Freya Academy',
  logoUrl: '',
  tagline: 'El conocimiento de hoy será tu poder del mañana',
  businessDescription:
    'Formación práctica para médicos que buscan perfeccionar sus técnicas y elevar su práctica en Medicina Estética.',
  heroHeadline:
    'Formación práctica para médicos que buscan perfeccionar sus técnicas y elevar su práctica en Medicina Estética.',
  heroSubheading:
    'Metodología práctica hands-on y mentoría directa diseñada exclusivamente para médicos que desean dominar protocolos avanzados y transformar su consulta profesional.',
  ctaText: 'Conoce Freya',
  heroImageUrl: '/images/freya_hero_skin_aesthetic.jpg',
  aboutHeading: 'Dra. Mónica Meneses',
  aboutDescription:
    'Fundadora & Directora Académica de Freya Academy.\n\nComprometida con la excelencia y la seguridad clínica, la Dra. Mónica Meneses lidera un programa de perfeccionamiento en Medicina Estética enfocado en destreza manual directa, análisis anatómico exhaustivo y aplicación rigurosa de técnicas de vanguardia.',
  aboutImageUrl: '/images/freya_academy_founder.jpg',
  email: 'freyacademia@gmail.com',
  phone: '+591 69831697',
  whatsapp: '+591 69831697',
  whatsappUrl:
    'https://api.whatsapp.com/send/?phone=59169831697&text=Hola%20Freya%20Academy%2C%20deseo%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20cursos%20m%C3%A9dicos',
  facebookUrl: 'https://www.facebook.com/freyaacademiabo',
  instagramUrl: 'https://www.instagram.com/freyaacademiabo',
  tiktokUrl: 'https://www.tiktok.com/@freya.academia?_r=1&_t=ZS-9A3s4KR8RBk',
  address: 'Edificio Vitruvio II, Piso 3, N° 7979, Calacoto, La Paz, Bolivia',
  openingHours: 'Lunes a Viernes: 09:00 - 18:00',
  featuredCourse: DEFAULT_FEATURED_COURSE,
  updatedAt: new Date().toISOString(),
};
