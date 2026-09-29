import React from 'react';
import { SiteConfig } from '../types';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import { FreyaLogo } from './FreyaLogo';

interface FooterProps {
  config: SiteConfig;
  onOpenEditor: () => void;
}

export const Footer: React.FC<FooterProps> = ({ config, onOpenEditor }) => {
  const currentYear = new Date().getFullYear();

  const whatsappHref =
    config.whatsappUrl ||
    `https://api.whatsapp.com/send/?phone=59162722266&text=Somos%20FREYA%20ACADEMY%20%C2%BFquieres%20inscribirte%20al%20curso%3F`;

  return (
    <footer className="bg-[#FAF7F2] border-t border-[#806B55]/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#806B55]/15">
          
          {/* Col 1: Brand & Academic Mission */}
          <div className="space-y-4">
            <FreyaLogo variant="full" />
            <p className="text-xs text-[#171717]/70 font-light leading-relaxed">
              {config.businessDescription ||
                'Formación práctica para médicos que buscan perfeccionar sus técnicas y elevar su práctica en Medicina Estética.'}
            </p>
            <div className="pt-1">
              <span className="text-[11px] font-bold text-[#171717] block">
                Dra. Mónica Meneses
              </span>
              <span className="text-[10px] text-[#806B55] uppercase tracking-wider font-semibold">
                Fundadora & Directora Académica
              </span>
            </div>

            {/* Social Media Links: Styled tastefully to match luxury aesthetic */}
            <div className="pt-2 flex items-center gap-3">
              {/* Instagram */}
              {config.instagramUrl && (
                <a
                  href={config.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-sm bg-white border border-[#806B55]/25 hover:border-[#806B55] hover:bg-[#F2E4D5]/40 text-[#806B55] hover:text-[#171717] flex items-center justify-center transition-all shadow-xs group"
                  aria-label="Instagram de Freya Academy"
                  title="Instagram @freyaacademiabo"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 group-hover:scale-110 transition-transform"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              )}

              {/* Facebook */}
              {config.facebookUrl && (
                <a
                  href={config.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-sm bg-white border border-[#806B55]/25 hover:border-[#806B55] hover:bg-[#F2E4D5]/40 text-[#806B55] hover:text-[#171717] flex items-center justify-center transition-all shadow-xs group"
                  aria-label="Facebook de Freya Academy"
                  title="Facebook Freya Academia"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 group-hover:scale-110 transition-transform"
                  >
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
              )}

              {/* WhatsApp direct text button */}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 px-3 rounded-sm bg-white border border-[#806B55]/25 hover:border-[#25D366] hover:bg-[#25D366]/10 text-[#806B55] hover:text-[#25D366] flex items-center gap-1.5 text-xs font-semibold tracking-wider transition-all shadow-xs"
                title="WhatsApp Freya Academy"
              >
                <svg viewBox="0 0 32 32" fill="currentColor" className="w-3.5 h-3.5 text-[#25D366]">
                  <path d="M16 2C8.28 2 2 8.28 2 16c0 2.58.7 5 1.92 7.08L2.08 30l7.12-1.84A13.9 13.9 0 0016 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm0 25.56c-2.3 0-4.48-.62-6.38-1.7l-.46-.26-4.74 1.22 1.26-4.6-.3-.48A11.51 11.51 0 014.44 16c0-6.38 5.18-11.56 11.56-11.56s11.56 5.18 11.56 11.56-5.18 11.56-11.56 11.56zm6.34-8.66c-.34-.18-2.04-1.02-2.36-1.14-.32-.12-.56-.18-.8.18-.24.36-.92 1.14-1.12 1.38-.2.24-.4.26-.74.1-.34-.18-1.44-.54-2.74-1.7-1.02-.92-1.7-2.04-1.9-2.38-.2-.34-.02-.52.16-.7.16-.16.34-.4.52-.6.18-.2.24-.34.36-.56.12-.22.06-.42-.04-.6-.1-.18-.8-1.92-1.1-2.64-.3-.7-.58-.6-.8-.6h-.68c-.24 0-.62.08-.94.44-.32.36-1.24 1.22-1.24 2.96s1.28 3.44 1.46 3.68c.18.24 2.5 3.82 6.06 5.36.84.36 1.5.58 2.02.74.86.28 1.64.24 2.26.14.7-.1 2.04-.84 2.32-1.64.28-.82.28-1.52.2-1.66-.08-.14-.3-.22-.64-.4z" />
                </svg>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#806B55]">
              Navegación
            </h4>
            <ul className="space-y-2 text-xs text-[#171717]/80">
              <li>
                <a href="#hero" className="hover:text-[#806B55] transition-colors">
                  Inicio & Visión
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#806B55] transition-colors">
                  Programas & Cursos
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#806B55] transition-colors">
                  Dra. Mónica Meneses
                </a>
              </li>
              <li>
                <a href="#appointment" className="hover:text-[#806B55] transition-colors">
                  Postulación Médica
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Channels */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#806B55]">
              Canales Oficiales
            </h4>
            <div className="space-y-2.5 text-xs text-[#171717]/80 font-light">
              {/* WhatsApp direct */}
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 32 32" fill="currentColor" className="w-4 h-4 text-[#25D366] shrink-0">
                  <path d="M16 2C8.28 2 2 8.28 2 16c0 2.58.7 5 1.92 7.08L2.08 30l7.12-1.84A13.9 13.9 0 0016 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm0 25.56c-2.3 0-4.48-.62-6.38-1.7l-.46-.26-4.74 1.22 1.26-4.6-.3-.48A11.51 11.51 0 014.44 16c0-6.38 5.18-11.56 11.56-11.56s11.56 5.18 11.56 11.56-5.18 11.56-11.56 11.56zm6.34-8.66c-.34-.18-2.04-1.02-2.36-1.14-.32-.12-.56-.18-.8.18-.24.36-.92 1.14-1.12 1.38-.2.24-.4.26-.74.1-.34-.18-1.44-.54-2.74-1.7-1.02-.92-1.7-2.04-1.9-2.38-.2-.34-.02-.52.16-.7.16-.16.34-.4.52-.6.18-.2.24-.34.36-.56.12-.22.06-.42-.04-.6-.1-.18-.8-1.92-1.1-2.64-.3-.7-.58-.6-.8-.6h-.68c-.24 0-.62.08-.94.44-.32.36-1.24 1.22-1.24 2.96s1.28 3.44 1.46 3.68c.18.24 2.5 3.82 6.06 5.36.84.36 1.5.58 2.02.74.86.28 1.64.24 2.26.14.7-.1 2.04-.84 2.32-1.64.28-.82.28-1.52.2-1.66-.08-.14-.3-.22-.64-.4z" />
                </svg>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#171717] hover:text-[#25D366] transition-colors"
                >
                  {config.whatsapp || '+591 62722266'}
                </a>
              </div>

              {config.email ? (
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#806B55]" />
                  <a href={`mailto:${config.email}`} className="hover:text-[#806B55] transition-colors">
                    {config.email}
                  </a>
                </div>
              ) : (
                <div className="text-[11px] text-[#806B55]/70 italic">
                  [ Correo de admisiones por confirmar ]
                </div>
              )}

              {config.address ? (
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#806B55] mt-0.5 shrink-0" />
                  <span>{config.address}</span>
                </div>
              ) : (
                <div className="text-[11px] text-[#806B55]/70 italic">
                  [ Sede / Ubicación por confirmar ]
                </div>
              )}
            </div>
          </div>

          {/* Col 4: Admisiones y Cupos */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#806B55]">
              Admisiones & Formación
            </h4>
            <p className="text-xs text-[#171717]/75 font-light leading-relaxed">
              Formación médica continua con cupos reducidos por cohorte para garantizar supervisión clínica individualizada.
            </p>
            <div className="pt-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#806B55] hover:text-[#171717] transition-colors underline"
              >
                <span>Consultar próximas fechas por WhatsApp &rarr;</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#171717]/60 gap-4">
          <p>
            &copy; {currentYear} Freya Academy. Formación Médica Real. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4 text-[11px] text-[#806B55]">
            <span>Exclusivo para Profesionales Médicos</span>
            <span>·</span>
            <span>Rigor Científico y Seguridad Clínica</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
