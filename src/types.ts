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
  location: 'Sede Freya Academy • Edificio Vitruvio C10, Piso 12, Calacoto, La Paz, Bolivia',
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
    id: 'course-toxina-botulinica',
    title: 'Toxina Botulínica',
    category: 'Inyectables & Toxinas',
    description:
      'Dominio anatómico exhaustivo del tercio superior, medio e inferior. Técnicas avanzadas de inyección para microbotox, sonrisa gingival, bruxismo, platisma y rejuvenecimiento cervical sin pérdida de naturalidad.',
    imageUrl: '/images/freya_academy_hero.jpg',
    ctaText: 'Ver Temario & Cupos',
    order: 1,
    modality: 'Hands-On en Pacientes Reales',
    duration: 'Módulo Intensivo',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'course-armonizacion-facial',
    title: 'Armonización Facial',
    category: 'Arquitectura Facial',
    description:
      'Análisis cefalométrico y proporciones áureas. Estructuración tridimensional de pómulos, ángulo mandibular, mentón y perfiloplastia médica integral con criterio estético de alta definición.',
    imageUrl: '/images/clinic_wellness_treatment.jpg',
    ctaText: 'Ver Temario & Cupos',
    order: 2,
    modality: 'Hands-On en Pacientes Reales',
    duration: 'Módulo Avanzado',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'course-acido-hialuronico',
    title: 'Ácido Hialurónico',
    category: 'Rellenos Dérmicos',
    description:
      'Reología y selección de densidades para cada plano anatómico. Relleno y perfilado de labios (técnica rusa y clásica), fosa temporal, surcos nasogenianos y ojeras con abordaje seguro por cánula.',
    imageUrl: '/images/freya_academy_founder.jpg',
    ctaText: 'Ver Temario & Cupos',
    order: 3,
    modality: 'Hands-On en Pacientes Reales',
    duration: 'Módulo Clínico',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'course-bioestimuladores',
    title: 'Bioestimuladores de Colágeno',
    category: 'Inducción de Colágeno',
    description:
      'Aplicación avanzada de Hidroxiapatita de Calcio (Radiesse), Ácido Poli-L-Láctico (Sculptra) e híbridos. Vectorización facial, redensificación dérmica, reafirmación de cuello y escote sin sobrevolumen.',
    imageUrl: '/images/clinic_consultation_space.jpg',
    ctaText: 'Ver Temario & Cupos',
    order: 4,
    modality: 'Hands-On en Pacientes Reales',
    duration: 'Módulo Especializado',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'course-subscision',
    title: 'Subscisión',
    category: 'Procedimientos Quirúrgicos Menores',
    description:
      'Técnica quirúrgica menor ambulatoria con aguja Nokor y cánulas especiales para la liberación de tractos fibróticos en cicatrices de acné severo y depresiones cutáneas, combinada con inductores biológicos.',
    imageUrl: '/images/clinic_wellness_treatment.jpg',
    ctaText: 'Ver Temario & Cupos',
    order: 5,
    modality: 'Hands-On en Pacientes Reales',
    duration: 'Módulo Clínico',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'course-bloqueo-nervioso',
    title: 'Bloqueo Nervioso',
    category: 'Anestesiología & Confort',
    description:
      'Anestesia troncular y regional precisa de nervios infraorbitario, mentoniano, supratroclear y supraorbitario. Procedimientos estéticos 100% confortables para el paciente con seguridad neurovascular absoluta.',
    imageUrl: '/images/freya_academy_hero.jpg',
    ctaText: 'Ver Temario & Cupos',
    order: 6,
    modality: 'Hands-On en Pacientes Reales',
    duration: 'Taller Práctico',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'course-engrosamiento-masculino',
    title: 'Engrosamiento de Miembro Masculino',
    category: 'Estética Urogenital',
    description:
      'Protocolo médico especializado de bioplastia genital masculina con ácido hialurónico reticulado de alta viscoelasticidad y bioestimuladores para aumento circunferencial estético y seguro bajo estricta técnica estéril.',
    imageUrl: '/images/clinic_consultation_space.jpg',
    ctaText: 'Ver Temario & Cupos',
    order: 7,
    modality: 'Hands-On en Pacientes Reales',
    duration: 'Módulo de Alta Complejidad',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'course-rejuvenecimiento-vaginal',
    title: 'Rejuvenecimiento Vaginal',
    category: 'Ginecología Estética & Funcional',
    description:
      'Técnicas mínimamente invasivas de biorevitalización vulvovaginal: infiltración con ácido hialurónico en labios mayores, bioestimulación celular, manejo de atrofia dérmica y restauración estética femenina.',
    imageUrl: '/images/freya_academy_founder.jpg',
    ctaText: 'Ver Temario & Cupos',
    order: 8,
    modality: 'Hands-On en Pacientes Reales',
    duration: 'Módulo Especializado',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'course-tecnologia-laser',
    title: 'Cursos con Tecnología Láser',
    category: 'Tecnología Lumínica',
    description:
      'Fundamentos biofísicos de la interacción luz-tejido. Práctica con Láser CO2 Fraccionado, Q-Switched, Neodimio YAG y Luz Pulsada Intensa (IPL) para fotodaño, discromías, secuelas de acné y rejuvenecimiento dérmico.',
    imageUrl: '/images/clinic_wellness_treatment.jpg',
    ctaText: 'Ver Temario & Cupos',
    order: 9,
    modality: 'Hands-On con Equipamiento Médico',
    duration: 'Módulo Tecnológico',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'course-medicina-regenerativa',
    title: 'Medicina Regenerativa',
    category: 'Terapias Biológicas',
    description:
      'Aislamiento y aplicación de Plasma Rico en Plaquetas (PRP), Fibrina Rica en Plaquetas (PRF), exosomas y factores de crecimiento para bio-regeneración cutánea y capilar basada en rigurosa evidencia científica.',
    imageUrl: '/images/freya_academy_hero.jpg',
    ctaText: 'Ver Temario & Cupos',
    order: 10,
    modality: 'Hands-On en Pacientes Reales',
    duration: 'Módulo Regenerativo',
    createdAt: new Date().toISOString(),
  },
];

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
  heroImageUrl: '/images/freya_hero_skin_aesthetic.jpg',
  aboutHeading: 'Dra. Mónica Meneses',
  aboutDescription:
    'Fundadora & Directora Académica de Freya Academy.\n\nComprometida con la excelencia y la seguridad clínica, la Dra. Mónica Meneses lidera un programa de perfeccionamiento en Medicina Estética enfocado en destreza manual directa, análisis anatómico exhaustivo y aplicación rigurosa de técnicas de vanguardia.',
  aboutImageUrl: '/images/freya_academy_founder.jpg',
  email: 'freyacademia@gmail.com',
  phone: '+591 62722266',
  whatsapp: '+591 62722266',
  whatsappUrl:
    'https://api.whatsapp.com/send/?phone=59162722266&text=Somos%20FREYA%20ACADEMY%20%C2%BFquieres%20inscribirte%20al%20curso%3F',
  facebookUrl: 'https://www.facebook.com/freyaacademiabo',
  instagramUrl: 'https://www.instagram.com/freyaacademiabo',
  tiktokUrl: 'https://www.tiktok.com/@freya.academia?_r=1&_t=ZS-9A3s4KR8RBk',
  address: 'Calle 10 de Calacoto, Edificio Vitruvio C10, Piso 12, La Paz, Bolivia',
  openingHours: 'Lunes a Viernes: 09:00 - 18:00',
  featuredCourse: DEFAULT_FEATURED_COURSE,
  updatedAt: new Date().toISOString(),
};
