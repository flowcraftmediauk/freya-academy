import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';

interface FloatingWhatsAppProps {
  whatsappUrl?: string;
  phone?: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  whatsappUrl = 'https://api.whatsapp.com/send/?phone=59162722266&text=Somos%20FREYA%20ACADEMY%20%C2%BFquieres%20inscribirte%20al%20curso%3F',
  phone = '+591 62722266',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip Pill */}
      <div
        className={`bg-white text-[#171717] px-3.5 py-2 rounded-lg shadow-lg border border-[#806B55]/20 text-xs font-semibold tracking-wide transition-all duration-300 pointer-events-none hidden sm:flex items-center gap-2 ${
          isHovered
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-2'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
        <span>Inscríbete por WhatsApp</span>
      </div>

      {/* Real WhatsApp Floating Button on the Right */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
        aria-label="Contactar por WhatsApp a Freya Academy"
      >
        {/* Real Official WhatsApp Vector Icon */}
        <svg
          viewBox="0 0 32 32"
          fill="currentColor"
          className="w-7 h-7 drop-shadow-sm group-hover:rotate-6 transition-transform"
        >
          <path d="M16 2C8.28 2 2 8.28 2 16c0 2.58.7 5 1.92 7.08L2.08 30l7.12-1.84A13.9 13.9 0 0016 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm0 25.56c-2.3 0-4.48-.62-6.38-1.7l-.46-.26-4.74 1.22 1.26-4.6-.3-.48A11.51 11.51 0 014.44 16c0-6.38 5.18-11.56 11.56-11.56s11.56 5.18 11.56 11.56-5.18 11.56-11.56 11.56zm6.34-8.66c-.34-.18-2.04-1.02-2.36-1.14-.32-.12-.56-.18-.8.18-.24.36-.92 1.14-1.12 1.38-.2.24-.4.26-.74.1-.34-.18-1.44-.54-2.74-1.7-1.02-.92-1.7-2.04-1.9-2.38-.2-.34-.02-.52.16-.7.16-.16.34-.4.52-.6.18-.2.24-.34.36-.56.12-.22.06-.42-.04-.6-.1-.18-.8-1.92-1.1-2.64-.3-.7-.58-.6-.8-.6h-.68c-.24 0-.62.08-.94.44-.32.36-1.24 1.22-1.24 2.96s1.28 3.44 1.46 3.68c.18.24 2.5 3.82 6.06 5.36.84.36 1.5.58 2.02.74.86.28 1.64.24 2.26.14.7-.1 2.04-.84 2.32-1.64.28-.82.28-1.52.2-1.66-.08-.14-.3-.22-.64-.4z" />
        </svg>


        {/* Pulse ring indicator */}
        <span className="absolute -inset-1 rounded-full border-2 border-[#25D366] opacity-30 animate-ping pointer-events-none" />
      </a>
    </div>

    <p>Deploy Test 1</p>
  );
};
