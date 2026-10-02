import React from 'react';
import { SiteConfig, FeaturedCourseConfig } from '../types';
import { Calendar, MapPin, Users, Sparkles, ArrowRight, CheckCircle, Edit3, MessageCircle, Clock, ShieldCheck } from 'lucide-react';

interface UpcomingCoursesSectionProps {
  config: SiteConfig;
  onOpenEditor: () => void;
  isEditMode: boolean;
  onSelectCourse: (courseTitle: string) => void;
}

export const UpcomingCoursesSection: React.FC<UpcomingCoursesSectionProps> = ({
  config,
  onOpenEditor,
  isEditMode,
  onSelectCourse,
}) => {
  const featured = config.featuredCourse;

  // If doctor disabled or marked closed, don't show unless in edit mode
  if (!featured && !isEditMode) return null;

  const courseData: FeaturedCourseConfig = featured || {
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

  const handleEnrollClick = () => {
    onSelectCourse(courseData.title);
    const formEl = document.getElementById('appointment');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappInquiryUrl = `https://api.whatsapp.com/send/?phone=59169831697&text=${encodeURIComponent(
    `Hola Freya Academy, deseo información y postularme para el próximo curso: "${courseData.title}". ¿Cuáles son las fechas y cupos disponibles?`
  )}`;

  return (
    <section id="proximos-cursos" className="relative py-16 lg:py-24 bg-[#FAF7F2] border-b border-[#806B55]/15 overflow-hidden">
      {/* Hex pattern background overlay */}
      <div className="absolute inset-0 bg-hex-pattern opacity-40 pointer-events-none" />

      {/* Ambient glow accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#9E6370]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Eyebrow with Edit Trigger */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="inline-flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#9E6370] animate-ping" />
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#806B55]">
              Convocatoria Activa & Próximo Lanzamiento
            </span>
          </div>

          {isEditMode && (
            <button
              onClick={onOpenEditor}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#806B55] hover:text-[#171717] transition-colors bg-white/80 backdrop-blur-sm border border-[#806B55]/30 px-3.5 py-1.5 self-start sm:self-auto"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Editar Anuncio de Próximo Curso</span>
            </button>
          )}
        </div>

        {/* Featured Course Card */}
        <div className="relative bg-white border-2 border-[#806B55]/30 shadow-xl overflow-hidden">
          
          {/* Subtle top gold accent bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#806B55] via-[#9E6370] to-[#806B55]" />

          <div className="p-8 sm:p-12 lg:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Left Column: Course Main Details */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Badge & Target Audience */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 bg-[#9E6370] text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-sm shadow-sm">
                    <Sparkles className="w-3 h-3" />
                    {courseData.badge}
                  </span>

                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#806B55] bg-[#FAF7F2] border border-[#806B55]/20 px-3 py-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#806B55]" />
                    {courseData.targetAudience}
                  </span>
                </div>

                {/* Course Title & Subtitle */}
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#171717] tracking-tight leading-snug">
                    {courseData.title}
                  </h3>
                  <p className="mt-2 text-base text-[#806B55] font-medium font-serif italic">
                    {courseData.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-[#171717]/80 leading-relaxed font-light">
                  {courseData.description}
                </p>

                {/* Treatment Zones from Official Flyer */}
                {courseData.treatmentZones && courseData.treatmentZones.length > 0 && (
                  <div className="space-y-2.5 pt-1">
                    <h4 className="text-xs uppercase font-bold tracking-wider text-[#806B55] flex items-center gap-1.5">
                      <span>Zonas Anatómicas de Aplicación Clínica:</span>
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {courseData.treatmentZones.map((zone, idx) => (
                        <div
                          key={idx}
                          className="bg-[#FAF7F2] border border-[#806B55]/25 p-2 text-center text-xs font-semibold text-[#171717]"
                        >
                          <span className="text-[#9E6370] text-[10px] block font-mono font-bold">0{idx + 1}</span>
                          <span className="leading-tight">{zone}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Syllabus Highlights from Official Flyer */}
                {courseData.syllabusHighlights && courseData.syllabusHighlights.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs uppercase font-bold tracking-wider text-[#171717]">
                      Lo Que Aprenderás en el Curso:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {courseData.syllabusHighlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-[#171717]/85 font-light">
                          <CheckCircle className="w-4 h-4 text-[#806B55] shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Motivational Brand Quote from Flyer */}
                <div className="pt-2 text-xs italic text-[#806B55] font-serif border-t border-[#806B55]/15 flex items-center justify-between">
                  <span>"Belleza en cada detalle"</span>
                  <span className="font-sans text-[11px] font-medium tracking-wide">Formación que transforma. Resultados que inspiran.</span>
                </div>
              </div>

              {/* Right Column: Logistics, Seats & Direct Actions */}
              <div className="lg:col-span-5 bg-[#FAF7F2] border border-[#806B55]/20 p-6 sm:p-8 space-y-6">
                <div className="border-b border-[#806B55]/20 pb-4 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#806B55] block">
                      Ficha Técnica de Admisión
                    </span>
                    <p className="text-xs text-[#171717]/60 mt-0.5">
                      Dirigido por la Dra. Mónica Meneses
                    </p>
                  </div>
                  {courseData.investmentPrice && (
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-[#806B55] block">Inversión</span>
                      <span className="text-lg font-bold text-[#9E6370] font-mono">{courseData.investmentPrice}</span>
                    </div>
                  )}
                </div>

                {/* Key Logistic Items */}
                <div className="space-y-3.5 text-xs text-[#171717]">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-[#806B55] shrink-0" />
                    <div>
                      <span className="text-[#171717]/60 block text-[10px] uppercase font-semibold">Fecha & Horario</span>
                      <span className="font-semibold text-sm text-[#171717]">
                        {courseData.date} {courseData.time ? `• ${courseData.time}` : ''}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-[#806B55] shrink-0" />
                    <div>
                      <span className="text-[#171717]/60 block text-[10px] uppercase font-semibold">Sede Práctica</span>
                      <span className="font-medium text-[#171717]">{courseData.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#806B55] shrink-0" />
                    <div>
                      <span className="text-[#171717]/60 block text-[10px] uppercase font-semibold">Modalidad</span>
                      <span className="font-medium text-[#171717]">{courseData.modality}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-[#806B55] shrink-0" />
                    <div>
                      <span className="text-[#171717]/60 block text-[10px] uppercase font-semibold">Disponibilidad de Cupos</span>
                      <span className="font-semibold text-[#9E6370]">
                        Solo {courseData.seatsLeft} de {courseData.seatsTotal} cupos disponibles para médicos
                      </span>
                    </div>
                  </div>
                </div>

                {/* Seats Progress Bar */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-[11px] font-semibold text-[#806B55]">
                    <span>Capacidad de Cohorte</span>
                    <span>{Math.round(((courseData.seatsTotal - courseData.seatsLeft) / courseData.seatsTotal) * 100)}% Reservado</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#9E6370] transition-all duration-500 rounded-full"
                      style={{ width: `${Math.round(((courseData.seatsTotal - courseData.seatsLeft) / courseData.seatsTotal) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Call to Actions */}
                <div className="space-y-3 pt-2">
                  <button
                    onClick={handleEnrollClick}
                    className="w-full px-6 py-3.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#806B55] hover:bg-[#6c5945] transition-all flex items-center justify-center gap-2 shadow-md active:translate-y-0.5"
                  >
                    <span>Postularme a este Curso</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-6 py-3 text-xs font-semibold tracking-wider uppercase text-[#171717] bg-white border border-[#806B55]/30 hover:border-[#25D366] hover:bg-[#25D366]/5 transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span>Consultar por WhatsApp</span>
                  </a>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
