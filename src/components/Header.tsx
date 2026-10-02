import React, { useState } from 'react';
import { SiteConfig } from '../types';
import { User } from 'firebase/auth';
import {
  Menu,
  X,
  LogIn,
  LogOut,
  SlidersHorizontal,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Music2,
  MessageCircle,
} from 'lucide-react';
import { FreyaLogo } from './FreyaLogo';

interface HeaderProps {
  config: SiteConfig;
  user: User | null;
  onOpenEditor: () => void;
  onLogin: () => void;
  onLogout: () => void;
  isEditMode: boolean;
  onToggleEditMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  config,
  user,
  onOpenEditor,
  onLogin,
  onLogout,
  isEditMode,
  onToggleEditMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappPhone = config.whatsapp || '+591 69831697';
  const cleanPhone = whatsappPhone.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://api.whatsapp.com/send/?phone=${cleanPhone || '59169831697'}&text=${encodeURIComponent(
    'Hola Freya Academy, deseo información sobre los cursos médicos.'
  )}`;

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#806B55]/15 transition-all">
      {/* 
        Top Utility & Social Bar:
        Ensures all visitors immediately see the Academy's location, phone, and official social networks upon entry.
      */}
      <div className="bg-[#171717] text-[#FAF7F2] text-[11px] py-1.5 px-6 lg:px-12 border-b border-[#806B55]/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Location & Quick Contact */}
          <div className="flex items-center gap-3 sm:gap-5 text-neutral-300 truncate">
            <span className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-[#E4A9B4] shrink-0" />
              <span className="truncate font-light">
                {config.address || 'Edificio Vitruvio II, Piso 3, N° 7979, Calacoto, La Paz, Bolivia'}
              </span>
            </span>
            <span className="hidden md:inline text-neutral-600">•</span>
            <a
              href={`mailto:${config.email || 'freyacademia@gmail.com'}`}
              className="hidden lg:flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#E4A9B4]" />
              <span>{config.email || 'freyacademia@gmail.com'}</span>
            </a>
          </div>

          {/* Social Media Links & Direct WhatsApp */}
          <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
            <span className="hidden sm:inline text-neutral-400 text-[10px] uppercase tracking-wider font-semibold">
              Redes:
            </span>

            {/* Instagram */}
            <a
              href={config.instagramUrl || 'https://www.instagram.com/freyaacademiabo'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-neutral-300 hover:text-[#E4A9B4] transition-colors p-1"
              title="Instagram @freyaacademiabo"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span className="hidden xl:inline text-[10px]">Instagram</span>
            </a>

            {/* TikTok */}
            <a
              href={config.tiktokUrl || 'https://www.tiktok.com/@freya.academia?_r=1&_t=ZS-9A3s4KR8RBk'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-neutral-300 hover:text-[#E4A9B4] transition-colors p-1"
              title="TikTok @freya.academia"
            >
              <Music2 className="w-3.5 h-3.5" />
              <span className="hidden xl:inline text-[10px]">TikTok</span>
            </a>

            {/* Facebook */}
            <a
              href={config.facebookUrl || 'https://www.facebook.com/freyaacademiabo'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-neutral-300 hover:text-[#E4A9B4] transition-colors p-1"
              title="Facebook Freya Academy"
            >
              <Facebook className="w-3.5 h-3.5" />
              <span className="hidden xl:inline text-[10px]">Facebook</span>
            </a>

            {/* WhatsApp Direct Contact */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#25D366]/15 text-[#25D366] hover:bg-[#25D366]/25 transition-colors font-medium border border-[#25D366]/30"
              title="WhatsApp: +591 69831697"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="text-[10px] tracking-wide font-mono">{config.phone || '+591 69831697'}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        
        {/* Zone 1: Single text element Brand Zone */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#806B55]"
          >
            <FreyaLogo variant="full" />
          </a>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-[13px] xl:text-sm font-medium tracking-wide text-[#171717]/85">
          <button
            onClick={() => scrollToSection('hero')}
            className="hover:text-[#806B55] transition-colors focus:outline-none"
          >
            Inicio
          </button>
          <button
            onClick={() => scrollToSection('proximos-cursos')}
            className="hover:text-[#806B55] transition-colors focus:outline-none flex items-center gap-1.5 font-semibold text-[#806B55]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#9E6370] animate-pulse" />
            <span className="whitespace-nowrap">Próximos Cursos</span>
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className="hover:text-[#806B55] transition-colors focus:outline-none"
          >
            Programas
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="hover:text-[#806B55] transition-colors focus:outline-none whitespace-nowrap"
          >
            Dra. Mónica Meneses
          </button>
          <button
            onClick={() => scrollToSection('appointment')}
            className="hover:text-[#806B55] transition-colors focus:outline-none"
          >
            Admisiones
          </button>
        </nav>

        {/* Zone 3: Primary Actions (Sleek, compact with clear spacing separation) */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-3 ml-3 xl:ml-5 pl-3 xl:pl-5 border-l border-[#806B55]/20">
          {/* Practice Management / Client Data Button (Compact & elegant) */}
          <button
            onClick={onOpenEditor}
            className={`px-2.5 py-1.5 text-[11px] font-medium tracking-wide uppercase border transition-colors flex items-center gap-1.5 shrink-0 ${
              isEditMode
                ? 'bg-[#806B55] text-white border-[#806B55]'
                : 'bg-white text-[#806B55] border-[#806B55]/30 hover:border-[#806B55]'
            }`}
            title="Open Client Information Console"
          >
            <SlidersHorizontal className="w-3 h-3 shrink-0" />
            <span className="whitespace-nowrap">Practice Manager</span>
          </button>

          {/* Google Sign-in / Auth Status */}
          {user ? (
            <div className="flex items-center gap-2 pl-1 border-l border-[#806B55]/20 shrink-0">
              <span className="text-xs text-[#806B55] truncate max-w-[100px]" title={user.email || ''}>
                {user.displayName?.split(' ')[0] || user.email?.split('@')[0]}
              </span>
              <button
                onClick={onLogout}
                className="p-1.5 text-[#806B55] hover:text-[#171717] hover:bg-[#F2E4D5]/40 transition-colors"
                title="Sign out of Firebase"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onLogin}
              className="px-2.5 py-1.5 text-[11px] font-medium tracking-wide text-[#806B55] border border-[#806B55]/30 hover:border-[#806B55] bg-white transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
              title="Sign in with Google (Firebase Auth)"
            >
              <LogIn className="w-3 h-3 shrink-0" />
              <span>Admin Login</span>
            </button>
          )}

          {/* Primary CTA */}
          <button
            onClick={() => scrollToSection('appointment')}
            className="px-3.5 py-1.5 text-[11px] font-semibold tracking-wider uppercase text-white bg-[#806B55] hover:bg-[#6c5945] transition-all shadow-xs active:translate-y-0.5 whitespace-nowrap shrink-0"
          >
            {config.ctaText || 'Conoce Freya'}
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onOpenEditor}
            className="p-2 text-[#806B55] hover:bg-[#F2E4D5]/40 transition-colors border border-[#806B55]/20"
            aria-label="Practice Manager"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#171717] hover:text-[#806B55] transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F2] border-b border-[#806B55]/20 px-6 py-6 space-y-4 animate-in fade-in duration-200">
          <nav className="flex flex-col space-y-3 text-base font-medium">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-left py-2 hover:text-[#806B55] transition-colors"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection('proximos-cursos')}
              className="text-left py-2 text-[#806B55] font-semibold flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#9E6370]" />
              <span>Próximos Cursos</span>
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-left py-2 hover:text-[#806B55] transition-colors"
            >
              Programas Oficiales
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-left py-2 hover:text-[#806B55] transition-colors"
            >
              Dra. Mónica Meneses
            </button>
            <button
              onClick={() => scrollToSection('appointment')}
              className="text-left py-2 hover:text-[#806B55] transition-colors"
            >
              Admisiones & Cupos
            </button>
          </nav>

          <div className="pt-4 border-t border-[#806B55]/20 flex flex-col gap-3">
            <button
              onClick={() => scrollToSection('appointment')}
              className="w-full py-3 text-center text-xs font-semibold tracking-wider uppercase text-white bg-[#806B55]"
            >
              {config.ctaText || 'Schedule Consultation'}
            </button>

            {user ? (
              <button
                onClick={onLogout}
                className="w-full py-2.5 text-xs text-center border border-[#806B55]/30 text-[#806B55] flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out ({user.email})</span>
              </button>
            ) : (
              <button
                onClick={onLogin}
                className="w-full py-2.5 text-xs text-center border border-[#806B55]/30 text-[#806B55] flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign in with Google</span>
              </button>
            )}

            {/* Mobile Social Links */}
            <div className="pt-3 border-t border-[#806B55]/15 space-y-2">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#806B55] block">
                Nuestras Redes Sociales:
              </span>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <a
                  href={config.instagramUrl || 'https://www.instagram.com/freyaacademiabo'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white border border-[#806B55]/20 flex flex-col items-center gap-1 hover:border-[#806B55]"
                >
                  <Instagram className="w-4 h-4 text-[#806B55]" />
                  <span className="text-[10px]">Instagram</span>
                </a>
                <a
                  href={config.tiktokUrl || 'https://www.tiktok.com/@freya.academia?_r=1&_t=ZS-9A3s4KR8RBk'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white border border-[#806B55]/20 flex flex-col items-center gap-1 hover:border-[#806B55]"
                >
                  <Music2 className="w-4 h-4 text-[#806B55]" />
                  <span className="text-[10px]">TikTok</span>
                </a>
                <a
                  href={config.facebookUrl || 'https://www.facebook.com/freyaacademiabo'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white border border-[#806B55]/20 flex flex-col items-center gap-1 hover:border-[#806B55]"
                >
                  <Facebook className="w-4 h-4 text-[#806B55]" />
                  <span className="text-[10px]">Facebook</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
