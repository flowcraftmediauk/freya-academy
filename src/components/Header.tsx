import React, { useState } from 'react';
import { SiteConfig } from '../types';
import { User } from 'firebase/auth';
import { Menu, X, Shield, LogIn, LogOut, SlidersHorizontal } from 'lucide-react';
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

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#806B55]/15 transition-all">
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
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium tracking-wide text-[#171717]/85">
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
            <span>Próximos Cursos</span>
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className="hover:text-[#806B55] transition-colors focus:outline-none"
          >
            Programas
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="hover:text-[#806B55] transition-colors focus:outline-none"
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

        {/* Zone 3: Primary Actions (Rectangular buttons) */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Practice Management / Client Data Button */}
          <button
            onClick={onOpenEditor}
            className={`px-3.5 py-2 text-xs font-medium tracking-wider uppercase border transition-colors flex items-center gap-2 ${
              isEditMode
                ? 'bg-[#806B55] text-white border-[#806B55]'
                : 'bg-white text-[#806B55] border-[#806B55]/30 hover:border-[#806B55]'
            }`}
            title="Open Client Information Console"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Practice Manager</span>
          </button>

          {/* Google Sign-in / Auth Status */}
          {user ? (
            <div className="flex items-center gap-2 pl-1 border-l border-[#806B55]/20">
              <span className="text-xs text-[#806B55] truncate max-w-[110px]" title={user.email || ''}>
                {user.displayName?.split(' ')[0] || user.email?.split('@')[0]}
              </span>
              <button
                onClick={onLogout}
                className="p-2 text-[#806B55] hover:text-[#171717] hover:bg-[#F2E4D5]/40 transition-colors"
                title="Sign out of Firebase"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onLogin}
              className="px-3 py-2 text-xs font-medium tracking-wide text-[#806B55] border border-[#806B55]/30 hover:border-[#806B55] bg-white transition-colors flex items-center gap-1.5"
              title="Sign in with Google (Firebase Auth)"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Admin Login</span>
            </button>
          )}

          {/* Primary CTA */}
          <button
            onClick={() => scrollToSection('appointment')}
            className="px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#806B55] hover:bg-[#6c5945] transition-all shadow-sm active:translate-y-0.5"
          >
            {config.ctaText || 'Schedule Consultation'}
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
          </div>
        </div>
      )}
    </header>
  );
};
