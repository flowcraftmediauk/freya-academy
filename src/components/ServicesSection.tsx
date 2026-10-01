import React, { useState } from 'react';
import { ServiceItem, DEFAULT_FREYA_COURSES } from '../types';
import { ArrowUpRight, Plus, Sparkles, CheckCircle2, MessageCircle, Stethoscope, Award } from 'lucide-react';
import { resolveServiceImage, embeddedTreatmentImage } from '../utils/imageUtils';

interface ServicesSectionProps {
  services: ServiceItem[];
  onOpenEditor: () => void;
  isEditMode: boolean;
  onSelectCourse?: (courseTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  onOpenEditor,
  isEditMode,
  onSelectCourse,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Use provided services from Firestore or fallback to the official 10 Freya courses
  const displayCourses = services && services.length > 0 ? services : DEFAULT_FREYA_COURSES;

  const categories = [
    { id: 'all', label: 'Todos los Cursos' },
    { id: 'faciales', label: 'Facial & Inyectables' },
    { id: 'avanzados', label: 'Procedimientos Clínicos' },
    { id: 'especiales', label: 'Estética Regenerativa & Láser' },
  ];

  const filteredCourses = displayCourses.filter((course) => {
    if (selectedCategory === 'all') return true;
    const title = course.title.toLowerCase();
    const cat = (course.category || '').toLowerCase();
    
    if (selectedCategory === 'faciales') {
      return (
        title.includes('toxina') ||
        title.includes('armonización') ||
        title.includes('ácido') ||
        title.includes('bioestimuladores') ||
        cat.includes('facial') ||
        cat.includes('inyectables') ||
        cat.includes('rellenos')
      );
    }
    if (selectedCategory === 'avanzados') {
      return (
        title.includes('subscisión') ||
        title.includes('bloqueo') ||
        title.includes('miembro') ||
        title.includes('vaginal') ||
        cat.includes('quirúrgicos') ||
        cat.includes('urogenital') ||
        cat.includes('ginecología')
      );
    }
    if (selectedCategory === 'especiales') {
      return (
        title.includes('láser') ||
        title.includes('regenerativa') ||
        cat.includes('láser') ||
        cat.includes('biológicas')
      );
    }
    return true;
  });

  const handleEnrollCourse = (courseTitle: string) => {
    if (onSelectCourse) {
      onSelectCourse(courseTitle);
    }
    const el = document.getElementById('appointment');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#FAF7F2] border-b border-[#806B55]/15 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2">
              <span className="w-5 h-[1px] bg-[#806B55]" />
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#806B55]">
                Catálogo Académico Oficial
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#171717]">
              Cursos & Programas de Formación Médica
            </h2>
            <p className="text-sm sm:text-base text-[#171717]/70 font-light leading-relaxed">
              Programas de perfeccionamiento clínico diseñados bajo estricto rigor médico, destreza manual hands-on en pacientes reales y mentoría personalizada con la Dra. Mónica Meneses.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isEditMode && (
              <button
                onClick={onOpenEditor}
                className="px-4 py-2.5 text-xs font-semibold tracking-wider uppercase border border-[#806B55] text-[#806B55] bg-white hover:bg-[#F2E4D5]/30 transition-all flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Gestionar Cursos</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2.5 mb-10 pb-2 border-b border-[#806B55]/15">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#806B55] text-white shadow-sm'
                  : 'bg-white text-[#171717]/70 hover:text-[#171717] hover:bg-[#FAF7F2] border border-[#806B55]/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Content Grid: 10 Official Freya Academy Courses */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((service, idx) => {
            const courseInquiryWhatsapp = `https://api.whatsapp.com/send/?phone=59162722266&text=${encodeURIComponent(
              `Hola Freya Academy, deseo consultar información, temario y requisitos para el curso de: "${service.title}".`
            )}`;

            return (
              <div
                key={service.id || idx}
                className="group bg-white border border-[#806B55]/20 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div>
                  {/* Service Image */}
                  <div className="relative aspect-[4/3] bg-[#F2E4D5] overflow-hidden border-b border-[#806B55]/15">
                    <img
                      src={resolveServiceImage(service.imageUrl)}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src !== embeddedTreatmentImage) {
                          target.src = embeddedTreatmentImage;
                        }
                      }}
                    />

                    {/* Number badge */}
                    <div className="absolute top-3 left-3 bg-[#FAF7F2]/95 backdrop-blur-sm px-2.5 py-1 text-[11px] font-mono tracking-wider uppercase text-[#806B55] border border-[#806B55]/20 font-semibold">
                      {(idx + 1).toString().padStart(2, '0')}
                    </div>

                    {/* Modality Tag */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span className="bg-[#171717]/85 backdrop-blur-md text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1">
                        {service.modality || 'Hands-On en Pacientes'}
                      </span>
                      {service.category && (
                        <span className="bg-white/90 backdrop-blur-md text-[#806B55] text-[10px] font-bold tracking-wider uppercase px-2.5 py-1">
                          {service.category}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Text Details */}
                  <div className="p-6 space-y-3">
                    <h3 className="font-display text-xl font-semibold text-[#171717] group-hover:text-[#806B55] transition-colors leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[#171717]/75 font-light leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="px-6 pb-6 pt-2 space-y-2.5 border-t border-[#806B55]/10 mt-2">
                  <button
                    onClick={() => handleEnrollCourse(service.title)}
                    className="w-full py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#806B55] hover:bg-[#6c5945] transition-all flex items-center justify-center gap-1.5 shadow-sm active:translate-y-0.5"
                  >
                    <span>{service.ctaText || 'Ver Temario & Cupos'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={courseInquiryWhatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 text-xs font-semibold tracking-wider uppercase text-[#171717]/80 hover:text-[#25D366] bg-[#FAF7F2] hover:bg-[#25D366]/10 border border-[#806B55]/20 hover:border-[#25D366]/40 transition-all flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>Consultar por WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
