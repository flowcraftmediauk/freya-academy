import React from 'react';
import { MessageCircle, ShieldCheck, Check, Sparkles } from 'lucide-react';

interface PricingTreatment {
  id: string;
  name: string;
  description: string;
  highlights: string[];
  popular?: boolean;
}

const DEFAULT_TREATMENTS: PricingTreatment[] = [
  {
    id: 'armonizacion-facial',
    name: 'Armonización Facial & Ácido Hialurónico',
    description:
      'Evaluación anatómica integral y diseño de protocolo personalizado para restaurar volumen, perfilar facciones y equilibrar proporciones faciales.',
    highlights: [
      'Valoración médica y análisis de proporciones',
      'Ácido hialurónico con registro sanitario y alta cohesividad',
      'Técnica médica con microcánula y mínimo disconfort',
      'Seguimiento y control clínico post-tratamiento',
    ],
  },
  {
    id: 'toxina-botulinica',
    name: 'Toxina Botulínica (Full Face)',
    description:
      'Tratamiento de precisión para atenuar arrugas dinámicas en frente, entrecejo y patas de gallo, preservando una expresión fresca y natural.',
    highlights: [
      'Mapeo dinámico de líneas de expresión',
      'Dosificación individualizada según fuerza muscular',
      'Resultados naturales sin pérdida de expresividad',
      'Cita de revisión médica y ajuste incluida',
    ],
    popular: true,
  },
  {
    id: 'bioestimuladores',
    name: 'Bioestimuladores de Colágeno',
    description:
      'Inducción de colágeno biológico para tensar, redensificar y devolver la firmeza dérmica al rostro, cuello o escote con efecto prolongado.',
    highlights: [
      'Estimulación celular de colágeno tipo I y III',
      'Vectorización y reposicionamiento tisular',
      'Efecto tensor progresivo y duradero',
      'Protocolo médico seguro y mínimamente invasivo',
    ],
  },
];

export const PricingSection: React.FC = () => {
  const getWhatsAppLink = (treatmentName: string) => {
    const message = `Hola, quisiera consultar el precio de ${treatmentName}`;
    return `https://wa.me/50499637027?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="precios" className="py-20 lg:py-28 bg-[#FFFFFF] border-b border-[#806B55]/15 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-hex-pattern opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-[1px] bg-[#806B55]" />
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#806B55]">
              Valoración Médica & Presupuestos
            </span>
            <span className="w-5 h-[1px] bg-[#806B55]" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#171717] mb-4">
            Presupuesto & Tratamientos
          </h2>
          <p className="text-sm sm:text-base text-[#171717]/70 font-light leading-relaxed">
            Cada tratamiento es personalizado de acuerdo al diagnóstico anatómico, necesidades clínicas y objetivos de cada paciente.
          </p>
        </div>

        {/* 3 Clean Cards (Zero real price numbers) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {DEFAULT_TREATMENTS.map((treatment) => (
            <div
              key={treatment.id}
              className={`bg-[#FAF7F2] border flex flex-col justify-between transition-all duration-300 hover:shadow-lg relative ${
                treatment.popular
                  ? 'border-[#9E6370] ring-1 ring-[#9E6370]/30 shadow-md'
                  : 'border-[#806B55]/20 hover:border-[#806B55]/50'
              }`}
            >
              {/* Featured Badge if popular */}
              {treatment.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#9E6370] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-0.5 shadow-sm">
                  Tratamiento Frecuente
                </div>
              )}

              <div className="p-8 space-y-6">
                
                {/* Header Area with "Precio en consulta" Badge */}
                <div className="flex items-center justify-between gap-3 pt-1">
                  <span className="inline-flex items-center gap-1.5 bg-white border border-[#806B55]/25 text-[#806B55] text-[11px] font-bold uppercase tracking-wider px-3 py-1 shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#806B55]" />
                    Precio en consulta
                  </span>

                  <span className="text-[11px] text-[#171717]/50 uppercase tracking-wider font-mono">
                    Personalizado
                  </span>
                </div>

                {/* Treatment Name & Description */}
                <div className="space-y-3">
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#171717] leading-snug">
                    {treatment.name}
                  </h3>
                  <p className="text-sm text-[#171717]/75 font-light leading-relaxed">
                    {treatment.description}
                  </p>
                </div>

                {/* Key Inclusions / Highlights */}
                <div className="pt-2 border-t border-[#806B55]/15 space-y-2.5">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#806B55] block">
                    Protocolo Incluye:
                  </span>
                  <ul className="space-y-2">
                    {treatment.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#171717]/80 font-light">
                        <Check className="w-3.5 h-3.5 text-[#806B55] shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button: Consultar precio via WhatsApp */}
              <div className="p-8 pt-0">
                <a
                  href={getWhatsAppLink(treatment.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 text-xs font-semibold tracking-wider uppercase text-white bg-[#806B55] hover:bg-[#6c5945] transition-all flex items-center justify-center gap-2 shadow-sm active:translate-y-0.5 group"
                >
                  <MessageCircle className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                  <span>Consultar precio</span>
                </a>
                <p className="text-[10px] text-center text-[#171717]/50 mt-2 font-light">
                  Atención médica inmediata vía WhatsApp
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-14 p-6 bg-[#FAF7F2] border border-[#806B55]/20 max-w-3xl mx-auto text-center space-y-1.5">
          <p className="text-xs uppercase tracking-wider font-bold text-[#806B55]">
            Política de Presupuesto Médico
          </p>
          <p className="text-xs text-[#171717]/70 font-light leading-relaxed">
            Por ética y rigor clínico, no publicamos precios estándar fijos. El costo exacto se define únicamente tras la valoración clínica directa para determinar la cantidad de producto, áreas a tratar y plan de seguridad específico.
          </p>
        </div>

      </div>
    </section>
  );
};
