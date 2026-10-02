import React, { useState } from 'react';
import { SiteConfig } from '../types';
import {
  ArrowRight,
  GraduationCap,
  BookOpen,
  Users,
  CheckCircle,
  Send,
  Instagram,
  Facebook,
  Music2,
} from 'lucide-react';
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
  const [quickForm, setQuickForm] = useState({
    name: '',
    email: '',
    phone: '',
    program: 'Curación de Heridas',
  });
  const [submitted, setSubmitted] = useState(false);

  const scrollToAppointment = () => {
    const el = document.getElementById('appointment');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickForm.name.trim()) return;
    
    // Redirect with message to WhatsApp or appointment section
    const phone = config.whatsapp || '+591 69831697';
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(
      `Hola Freya Academy, deseo postularme al programa de ${quickForm.program}. Mi nombre es Dr./Dra. ${quickForm.name}, Tel: ${quickForm.phone || 'No especificado'}, Email: ${quickForm.email || 'No especificado'}.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
    setSubmitted(true);
  };

  const heroBgImage = '/images/freya_hero_bg_real.jpg';

  const renderStyledHeadline = (headline: string) => {
    const target = 'Medicina Estética';
    if (headline && headline.includes(target)) {
      const parts = headline.split(target);
      return (
        <>
          <span>{parts[0]}</span>
          <span className="relative inline-block font-normal italic text-transparent bg-clip-text bg-gradient-to-r from-[#9E6370] via-[#804A58] to-[#9E6370] px-1">
            {target}
            <span className="absolute bottom-1 left-1 right-1 h-[1.5px] bg-gradient-to-r from-[#9E6370]/60 via-[#804A58]/80 to-[#9E6370]/30" />
          </span>
          <span>{parts.slice(1).join(target)}</span>
        </>
      );
    }
    return headline;
  };

  return (
    <section id="hero" className="relative bg-[#FAF7F2] overflow-hidden border-b border-[#806B55]/15">
      
      {/* 
        High-End Background Aesthetic Visual:
        Directly inspired by Reference Image 2.
        Seamlessly blended on the right side behind the content with natural photorealistic texture.
      */}
      <div className="absolute top-0 right-0 bottom-0 w-full lg:w-[62%] pointer-events-none select-none overflow-hidden z-0">
        <img
          src={heroBgImage}
          alt="Medicina Estética & Cuidado Facial Avanzado — Freya Academy"
          className="w-full h-full object-cover object-[75%_center] lg:object-[68%_center] opacity-90 transition-opacity duration-700"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src !== '/images/freya_hero_skin_aesthetic.jpg') {
              target.src = '/images/freya_hero_skin_aesthetic.jpg';
            }
          }}
        />

        {/* Seamless Soft Fade Gradients matching Reference Image 2 */}
        {/* Left feather gradient: ensures text on the left is 100% crisp and readable */}
        <div className="absolute inset-y-0 left-0 w-2/5 sm:w-1/2 lg:w-3/5 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/85 to-transparent" />
        {/* Bottom soft fade */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/70 to-transparent" />
        {/* Top soft fade */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#FAF7F2] to-transparent" />
      </div>

      {/* Subtle hexagonal background pattern */}
      <div className="absolute inset-0 bg-hex-pattern opacity-35 pointer-events-none z-0" />

      {/* Hero Content Container */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-12 lg:pt-24 lg:pb-16 relative z-10">
        <div className="max-w-2xl lg:max-w-3xl space-y-7">
          
          {/* Eyebrow Brand Slogan */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-white/90 border border-[#806B55]/25 backdrop-blur-xs shadow-xs max-w-full">
            <FreyaLogo variant="symbol" className="h-5 w-4 shrink-0" />
            <span className="text-[11px] sm:text-xs font-serif italic text-[#806B55] tracking-wide">
              {config.tagline || 'El conocimiento de hoy será tu poder del mañana'}
            </span>
          </div>

          {/* Main Headline (Haute Couture / High-End Medical Editorial Typography) */}
          <div className="relative">
            {/* Subtle soft warm radial highlight */}
            <div className="absolute -top-10 -left-10 w-72 h-72 bg-[#F2E4D5]/40 rounded-full blur-3xl pointer-events-none -z-10" />

            <h1 className="font-luxury text-4xl sm:text-5xl lg:text-6xl xl:text-[4.15rem] font-light tracking-[-0.015em] text-[#171717] leading-[1.08] text-balance">
              {renderStyledHeadline(config.heroHeadline)}
            </h1>
          </div>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-[#171717]/85 font-sans leading-relaxed max-w-xl">
            {config.heroSubheading || config.businessDescription}
          </p>

          {/* 3 Core Pillars directly from the reference design */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 p-4 bg-white/90 border border-[#806B55]/20 backdrop-blur-md max-w-xl shadow-xs">
            {/* Pillar 1 */}
            <div className="flex flex-col items-center text-center p-1 sm:p-2 space-y-1.5 border-r border-[#806B55]/15 last:border-0">
              <div className="w-8 h-8 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#806B55] border border-[#806B55]/20">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#171717]">
                Técnica Avanzada
              </span>
            </div>

            {/* Pillar 2 */}
            <div className="flex flex-col items-center text-center p-1 sm:p-2 space-y-1.5 border-r border-[#806B55]/15 last:border-0">
              <div className="w-8 h-8 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#806B55] border border-[#806B55]/20">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#171717]">
                Enfoque Práctico
              </span>
            </div>

            {/* Pillar 3 */}
            <div className="flex flex-col items-center text-center p-1 sm:p-2 space-y-1.5">
              <div className="w-8 h-8 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#806B55] border border-[#806B55]/20">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#171717]">
                Para Médicos
              </span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={scrollToAppointment}
              className="px-8 py-3.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#806B55] hover:bg-[#6c5945] transition-all shadow-md active:translate-y-0.5 flex items-center gap-2 group"
            >
              <span>{config.ctaText || 'Conoce Freya'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={scrollToAbout}
              className="px-6 py-3.5 text-xs font-semibold tracking-wider uppercase text-[#171717] bg-white/90 border border-[#806B55]/30 hover:border-[#806B55] hover:bg-white transition-all shadow-xs"
            >
              Postulación Académica
            </button>
          </div>

          {/* Social Media Immediate Access Bar ("Que cuando entren puedan ver las redes sociales") */}
          <div className="pt-1 flex flex-wrap items-center gap-2.5 text-xs">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#806B55]">
              Redes Oficiales:
            </span>
            <a
              href={config.instagramUrl || 'https://www.instagram.com/freyaacademiabo'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/80 border border-[#806B55]/25 hover:border-[#806B55] text-[#171717] hover:text-[#806B55] transition-all shadow-2xs"
            >
              <Instagram className="w-3.5 h-3.5 text-[#806B55]" />
              <span className="text-[11px] font-medium">Instagram</span>
            </a>
            <a
              href={config.tiktokUrl || 'https://www.tiktok.com/@freya.academia?_r=1&_t=ZS-9A3s4KR8RBk'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/80 border border-[#806B55]/25 hover:border-[#806B55] text-[#171717] hover:text-[#806B55] transition-all shadow-2xs"
            >
              <Music2 className="w-3.5 h-3.5 text-[#806B55]" />
              <span className="text-[11px] font-medium">TikTok</span>
            </a>
            <a
              href={config.facebookUrl || 'https://www.facebook.com/freyaacademiabo'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/80 border border-[#806B55]/25 hover:border-[#806B55] text-[#171717] hover:text-[#806B55] transition-all shadow-2xs"
            >
              <Facebook className="w-3.5 h-3.5 text-[#806B55]" />
              <span className="text-[11px] font-medium">Facebook</span>
            </a>
          </div>
        </div>
      </div>

      {/* 
        Quick Consultation & Admissions Bar:
        Exact layout inspired by Reference Image 2 
        ("REQUEST FOR YOUR Consultation: Name | Email | Preferred Date | Type of Service | BOOK APPOINTMENT")
      */}
      <div className="border-t border-[#806B55]/20 bg-white/90 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5">
          <form
            onSubmit={handleQuickSubmit}
            className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 justify-between"
          >
            {/* Label Column */}
            <div className="shrink-0">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#806B55] block">
                Admisiones Médicas
              </span>
              <h4 className="font-serif text-base lg:text-lg font-bold text-[#171717]">
                Solicitar Cupo o Asesoría
              </h4>
            </div>

            {/* Input Fields Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 flex-1 max-w-3xl">
              {/* Name */}
              <input
                type="text"
                required
                placeholder="Nombre completo (Dr./Dra.)"
                value={quickForm.name}
                onChange={(e) => setQuickForm({ ...quickForm, name: e.target.value })}
                className="px-3.5 py-2.5 text-xs bg-[#FAF7F2] border border-[#806B55]/30 focus:outline-none focus:border-[#806B55] transition-colors"
              />

              {/* WhatsApp / Phone */}
              <input
                type="tel"
                placeholder="WhatsApp (+591...)"
                value={quickForm.phone}
                onChange={(e) => setQuickForm({ ...quickForm, phone: e.target.value })}
                className="px-3.5 py-2.5 text-xs bg-[#FAF7F2] border border-[#806B55]/30 focus:outline-none focus:border-[#806B55] transition-colors"
              />

              {/* Program Select */}
              <select
                value={quickForm.program}
                onChange={(e) => setQuickForm({ ...quickForm, program: e.target.value })}
                className="px-3 py-2.5 text-xs bg-[#FAF7F2] border border-[#806B55]/30 focus:outline-none focus:border-[#806B55] transition-colors text-[#171717]"
              >
                <option value="Curación de Heridas">Curación de Heridas</option>
                <option value="Plasma Rico en Plaquetas">Plasma Rico en Plaquetas (PRP)</option>
                <option value="Ácido Hialurónico en Líneas Finas">Ácido Hialurónico en Líneas Finas</option>
                <option value="Bloqueo Nervioso">Bloqueo Nervioso</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#806B55] hover:bg-[#6c5945] transition-colors shrink-0 flex items-center justify-center gap-2 shadow-xs"
            >
              {submitted ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Enviado</span>
                </>
              ) : (
                <>
                  <span>Postular Ahora</span>
                  <Send className="w-3 h-3" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

    </section>
  );
};

