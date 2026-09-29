import React from 'react';
import { ServiceItem } from '../types';
import { ArrowUpRight, Plus, Sparkles } from 'lucide-react';

interface ServicesSectionProps {
  services: ServiceItem[];
  onOpenEditor: () => void;
  isEditMode: boolean;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  onOpenEditor,
  isEditMode,
}) => {
  const scrollToAppointment = () => {
    const el = document.getElementById('appointment');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#FAF7F2] border-b border-[#806B55]/15 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-xl space-y-3">
            <div className="inline-flex items-center gap-2">
              <span className="w-5 h-[1px] bg-[#806B55]" />
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#806B55]">
                Specialized Care
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#171717]">
              Clinical Services & Specializations
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {isEditMode && (
              <button
                onClick={onOpenEditor}
                className="px-4 py-2.5 text-xs font-semibold tracking-wider uppercase border border-[#806B55] text-[#806B55] bg-white hover:bg-[#F2E4D5]/30 transition-all flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add / Edit Services</span>
              </button>
            )}
          </div>
        </div>

        {/* Content Grid */}
        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div
                key={service.id || idx}
                className="group bg-white border border-[#806B55]/20 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div>
                  {/* Service Image */}
                  <div className="relative aspect-[4/3] bg-[#F2E4D5] overflow-hidden border-b border-[#806B55]/15">
                    {service.imageUrl ? (
                      <img
                        src={service.imageUrl}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#FAF7F2] p-6 text-center text-xs text-[#806B55]/60 font-light">
                        [ Service Imagery ]
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-[#FAF7F2]/90 backdrop-blur-sm px-2.5 py-1 text-[11px] font-mono tracking-wider uppercase text-[#806B55] border border-[#806B55]/20">
                      {(idx + 1).toString().padStart(2, '0')}
                    </div>
                  </div>

                  {/* Text Details */}
                  <div className="p-6 space-y-3">
                    <h3 className="font-display text-xl font-semibold text-[#171717] group-hover:text-[#806B55] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[#171717]/70 font-light leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Card Action */}
                <div className="px-6 pb-6 pt-2">
                  <button
                    onClick={scrollToAppointment}
                    className="w-full py-2.5 text-xs font-semibold tracking-wider uppercase text-[#806B55] border border-[#806B55]/30 hover:border-[#806B55] hover:bg-[#806B55] hover:text-white transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>{service.ctaText || 'Inquire Service'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty / Unconfigured Services Notice conforming strictly to DO NOT INVENT rule */
          <div className="bg-white border border-dashed border-[#806B55]/30 p-12 text-center max-w-3xl mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#806B55]/20 mx-auto flex items-center justify-center text-[#806B55]">
              <Sparkles className="w-5 h-5" />
            </div>

            <h3 className="font-display text-xl font-medium text-[#171717]">
              Services to be Specified by Client
            </h3>

            <p className="text-sm text-[#171717]/70 max-w-md mx-auto font-light leading-relaxed">
              No services have been automatically invented or assumed. Once the client provides their specific treatments or medical disciplines, service cards will render here with bespoke photography and descriptions.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenEditor}
                className="px-6 py-3 text-xs font-semibold tracking-wider uppercase text-white bg-[#806B55] hover:bg-[#6c5945] transition-all inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Configure Client Services</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
