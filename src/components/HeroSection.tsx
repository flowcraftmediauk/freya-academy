import React from 'react';
import { SiteConfig } from '../types';
import { ArrowRight, GraduationCap, BookOpen, Users, Phone, Sparkles } from 'lucide-react';
import { FreyaLogo } from './FreyaLogo';

interface HeroSectionProps {
  config: SiteConfig;
  onOpenEditor: () => void;
  isEditMode: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  config,
  onOpenEditor,
  isEditMode,
}) => {
  const scrollToAppointment = () => {
    const el = document.getElementById('appointment');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative bg-[#FAF7F2] py-16 lg:py-24 overflow-hidden border-b border-[#806B55]/15">
      {/* Subtle hexagonal background decoration */}
      <div className="absolute inset-0 bg-hex-pattern opacity-60 pointer-events-none" />
      
      {/* Delicate diagonal lines inspired by the Freya reference graphic */}
      <div className="absolute top-8 right-12 hidden lg:flex flex-col gap-2.5 opacity-20 pointer-events-none">
        <div className="w-36 h-[2px] bg-gradient-to-r from-transparent via-[#A66B77] to-[#7E4250] -rotate-45" />
        <div className="w-48 h-[2px] bg-gradient-to-r from-transparent via-[#A66B77] to-[#7E4250] -rotate-45" />
        <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#A66B77] to-[#7E4250] -rotate-45" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Text Content Column */}
          <div className="lg:col-span-6 space-y-7">
            
            {/* Freya Academy Brand Eyebrow */}
            <div className="flex items-center gap-3">
              <FreyaLogo variant="symbol" className="h-8 w-6" />
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#806B55]">
                  {config.businessName || 'Freya Academy'}
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] font-mono text-[#806B55]/70">
                  {config.tagline || 'Formación Médica Real'}
                </span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#171717] leading-[1.18] text-balance">
              {config.heroHeadline}
            </h1>

            {/* Subheading / Description */}
            <p className="text-base sm:text-lg text-[#171717]/75 font-light leading-relaxed max-w-xl">
              {config.heroSubheading || config.businessDescription}
            </p>

            {/* 3 Core Pillars directly from the reference image */}
            <div className="pt-1 pb-2">
              <div className="grid grid-cols-3 gap-3 sm:gap-4 p-4 bg-white/80 border border-[#806B55]/20 backdrop-blur-xs">
                
                {/* Pillar 1 */}
                <div className="flex flex-col items-center text-center p-2 space-y-1.5 border-r border-[#806B55]/15 last:border-0">
                  <div className="w-8 h-8 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#806B55] border border-[#806B55]/20">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#171717]">
                    Técnica Avanzada
                  </span>
                </div>

                {/* Pillar 2 */}
                <div className="flex flex-col items-center text-center p-2 space-y-1.5 border-r border-[#806B55]/15 last:border-0">
                  <div className="w-8 h-8 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#806B55] border border-[#806B55]/20">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#171717]">
                    Enfoque Práctico
                  </span>
                </div>

                {/* Pillar 3 */}
                <div className="flex flex-col items-center text-center p-2 space-y-1.5">
                  <div className="w-8 h-8 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#806B55] border border-[#806B55]/20">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#171717]">
                    Para Médicos
                  </span>
                </div>

              </div>
            </div>

            {/* Action Buttons (Rectangular, refined) */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={scrollToAbout}
                className="px-8 py-3.5 text-xs font-semibold tracking-wider uppercase text-white bg-gradient-to-r from-[#9E6370] via-[#804A58] to-[#693946] hover:brightness-110 transition-all shadow-sm active:translate-y-0.5 flex items-center gap-2"
              >
                <span>{config.ctaText || 'Conoce Freya'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={scrollToAppointment}
                className="px-6 py-3.5 text-xs font-semibold tracking-wider uppercase text-[#171717] bg-white border border-[#806B55]/30 hover:border-[#806B55] transition-all"
              >
                Postulación Académica
              </button>
            </div>

            {/* Contact info notice if pending */}
            {!config.phone && !config.email && (
              <div className="pt-2 text-xs text-[#806B55]/80 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#806B55]" />
                <span>Admisiones médicas exclusivas · Cupos limitados por cohorte</span>
              </div>
            )}
          </div>

          {/* Visual Column: Dra. Mónica Meneses & Freya Academy */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Outer decorative delicate offset border */}
              <div className="absolute -inset-3 sm:-inset-4 border border-[#806B55]/20 -z-10 translate-x-2 translate-y-2 pointer-events-none" />
              
              {/* Main Image Container */}
              <div className="relative overflow-hidden bg-[#171717] shadow-lg border border-[#806B55]/20 aspect-[4/3] lg:aspect-[4/3]">
                <img
                  src={config.aboutImageUrl || '/src/assets/images/freya_academy_founder_1790703920911.jpg'}
                  alt="Dra. Mónica Meneses — Fundadora & Directora Académica"
                  className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle scrim overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

                {/* Director Name Badge overlaid */}
                <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md p-4 border-l-4 border-[#9E6370] shadow-md flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#171717]">
                      Dra. Mónica Meneses
                    </h3>
                    <p className="text-[11px] uppercase tracking-wider text-[#806B55] font-semibold">
                      Fundadora & Directora Académica
                    </p>
                  </div>
                  <FreyaLogo variant="symbol" className="h-9 w-7" />
                </div>
              </div>

              {/* Hexagonal overlay badge */}
              <div className="absolute -top-5 -right-5 hidden sm:flex w-24 h-24 bg-[#FAF7F2] border border-[#806B55]/30 hex-wireframe items-center justify-center p-3 text-center shadow-md">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#806B55]">
                  Formación Real
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
