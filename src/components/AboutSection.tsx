import React from 'react';
import { SiteConfig } from '../types';
import { ArrowRight, Award, ShieldCheck, Stethoscope } from 'lucide-react';
import { FreyaLogo } from './FreyaLogo';
import { resolveFounderImage, embeddedFounderImage } from '../utils/imageUtils';

interface AboutSectionProps {
  config: SiteConfig;
  onOpenEditor: () => void;
  isEditMode: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  config,
  onOpenEditor,
  isEditMode,
}) => {
  const scrollToAppointment = () => {
    const el = document.getElementById('appointment');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const founderImageSrc = resolveFounderImage(config.aboutImageUrl);

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#FFFFFF] border-b border-[#806B55]/15 relative overflow-hidden">
      {/* Subtle hexagonal background decoration */}
      <div className="absolute right-0 bottom-0 w-96 h-96 border border-[#806B55]/10 hex-wireframe pointer-events-none translate-x-24 translate-y-24 rotate-45" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual with refined framing */}
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <div className="relative max-w-lg mx-auto lg:max-w-none">
              
              {/* Subtle back decorative frame */}
              <div className="absolute -inset-3 sm:-inset-4 border border-[#806B55]/20 -translate-x-2 -translate-y-2 pointer-events-none" />

              <div className="relative overflow-hidden bg-[#171717] shadow-xl border border-[#806B55]/25 aspect-[3/4] max-w-md mx-auto">
                <img
                  src={founderImageSrc}
                  alt={config.aboutHeading || 'Dra. Mónica Meneses'}
                  className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== embeddedFounderImage) {
                      target.src = embeddedFounderImage;
                    }
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3.5 border border-[#806B55]/20 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#171717] block">
                      Dra. Mónica Meneses
                    </span>
                    <span className="text-[10px] text-[#806B55] uppercase tracking-wider font-semibold">
                      Fundadora & Directora Académica
                    </span>
                  </div>
                  <FreyaLogo variant="symbol" className="h-7 w-6" />
                </div>
              </div>

              {/* Hexagonal decorative badge */}
              <div className="absolute -top-6 -left-6 hidden sm:flex w-20 h-20 bg-[#FAF7F2] border border-[#806B55]/20 hex-wireframe items-center justify-center text-[#806B55] shadow-sm">
                <span className="text-[9px] uppercase font-mono tracking-wider font-bold">
                  DIRECTORA
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Text Information */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2">
              <span className="w-5 h-[1px] bg-[#806B55]" />
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#806B55]">
                Dirección Académica & Visión
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#171717] leading-tight">
              {config.aboutHeading || 'Dra. Mónica Meneses'}
            </h2>

            <div className="text-xs font-semibold uppercase tracking-widest text-[#806B55] -mt-3">
              Fundadora & Directora Académica
            </div>

            {/* Description Body */}
            <div className="text-base text-[#171717]/75 font-light leading-relaxed space-y-4">
              <p className="whitespace-pre-line">{config.aboutDescription}</p>
            </div>

            {/* Academic Credentials Badges */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 bg-[#FAF7F2] border border-[#806B55]/20 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#806B55] shrink-0" />
                <div>
                  <div className="text-xs font-bold text-[#171717]">Seguridad Clínica</div>
                  <div className="text-[11px] text-[#171717]/65">Protocolos de prevención</div>
                </div>
              </div>

              <div className="p-3.5 bg-[#FAF7F2] border border-[#806B55]/20 flex items-center gap-3">
                <Stethoscope className="w-5 h-5 text-[#806B55] shrink-0" />
                <div>
                  <div className="text-xs font-bold text-[#171717]">Práctica Real</div>
                  <div className="text-[11px] text-[#171717]/65">Modelos y casos vivos</div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <button
                onClick={scrollToAppointment}
                className="px-8 py-3.5 text-xs font-semibold tracking-wider uppercase text-white bg-gradient-to-r from-[#9E6370] via-[#804A58] to-[#693946] hover:brightness-110 transition-all shadow-sm inline-flex items-center gap-2"
              >
                <span>Postulación & Registro</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
