import React, { useState } from 'react';
import { SiteConfig, ServiceItem } from '../types';
import { collection, addDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { Calendar, CheckCircle2, Send, Clock, User, Mail, Phone, Stethoscope, Award, Sparkles } from 'lucide-react';

interface AppointmentSectionProps {
  config: SiteConfig;
  services: ServiceItem[];
  selectedCourseTitle?: string;
}

export const AppointmentSection: React.FC<AppointmentSectionProps> = ({
  config,
  services,
  selectedCourseTitle,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    medicalSpecialty: '',
    preferredDate: '',
    service: selectedCourseTitle || '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync selected course if passed from outside
  React.useEffect(() => {
    if (selectedCourseTitle) {
      setFormData((prev) => ({ ...prev, service: selectedCourseTitle }));
    }
  }, [selectedCourseTitle]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setErrorMessage('Por favor ingresa tu nombre completo.');
      return;
    }

    if (!formData.medicalSpecialty) {
      setErrorMessage('Por favor selecciona tu especialidad médica (Médico estético, Médico dermatólogo o Cirujano plástico).');
      return;
    }

    if (!formData.phone.trim()) {
      setErrorMessage('Por favor ingresa un número de teléfono o WhatsApp para contactarte.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const path = 'appointments';
    try {
      await addDoc(collection(db, path), {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        medicalSpecialty: formData.medicalSpecialty,
        preferredDate: formData.preferredDate.trim(),
        service: formData.service.trim() || 'Información General de Cursos',
        notes: formData.notes.trim(),
        status: 'pending',
        createdAt: new Date().toISOString(),
      });

      setIsSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        medicalSpecialty: '',
        preferredDate: '',
        service: '',
        notes: '',
      });
    } catch (err) {
      console.error('Failed to submit admission request:', err);
      try {
        handleFirestoreError(err, OperationType.CREATE, path);
      } catch {
        setErrorMessage('No se pudo enviar la solicitud en este momento. Por favor contáctanos directamente por WhatsApp.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="appointment" className="py-20 lg:py-28 bg-[#FFFFFF] border-b border-[#806B55]/15 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-5 h-[1px] bg-[#806B55]" />
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#806B55]">
              Admisiones & Postulación Médica
            </span>
            <span className="w-5 h-[1px] bg-[#806B55]" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-[#171717] mb-4">
            Solicitud de Información y Cupos
          </h2>
          <p className="text-sm sm:text-base text-[#171717]/70 font-light">
            Formación práctica y exclusiva para médicos. Envía tus datos para recibir el temario detallado, fechas de las próximas cohortes y requisitos de admisión académica con la Dra. Mónica Meneses.
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-4xl mx-auto bg-[#FAF7F2] p-8 sm:p-12 border border-[#806B55]/20 shadow-sm relative">
          
          {/* Subtle top decorative ribbon */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#806B55]/40" />

          {isSuccess ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#F2E4D5] flex items-center justify-center text-[#806B55]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-[#171717]">
                Solicitud Recibida con Éxito
              </h3>
              <p className="text-sm text-[#171717]/70 max-w-md mx-auto">
                Gracias por tu interés en Freya Academy. Tu postulación ha sido registrada en nuestros registros académicos. Nuestro equipo de coordinación médica se comunicará contigo vía WhatsApp o llamada a la brevedad.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-6 py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#806B55] hover:bg-[#6c5945] transition-all"
                >
                  Enviar Otra Solicitud
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-3.5 bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717]/80">
                    Nombre Completo <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Dr. / Dra. Nombre Apellido"
                      className="w-full bg-white border border-[#806B55]/25 px-4 py-3 text-sm text-[#171717] focus:outline-none focus:border-[#806B55] transition-colors placeholder:text-neutral-400"
                    />
                    <User className="w-4 h-4 text-[#806B55]/40 absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Medical Specialty - Mandatory dropdown */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717]/80">
                    Especialidad Médica <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      required
                      value={formData.medicalSpecialty}
                      onChange={(e) => setFormData({ ...formData, medicalSpecialty: e.target.value })}
                      className="w-full bg-white border border-[#806B55]/25 px-4 py-3 text-sm text-[#171717] focus:outline-none focus:border-[#806B55] transition-colors appearance-none cursor-pointer font-medium"
                    >
                      <option value="">Selecciona tu especialidad médica</option>
                      <option value="Médico estético">Médico estético</option>
                      <option value="Médico dermatólogo">Médico dermatólogo</option>
                      <option value="Cirujano plástico">Cirujano plástico</option>
                    </select>
                    <Stethoscope className="w-4 h-4 text-[#806B55]/50 absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717]/80">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="doctor@ejemplo.com"
                      className="w-full bg-white border border-[#806B55]/25 px-4 py-3 text-sm text-[#171717] focus:outline-none focus:border-[#806B55] transition-colors placeholder:text-neutral-400"
                    />
                    <Mail className="w-4 h-4 text-[#806B55]/40 absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Phone Number / WhatsApp */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717]/80">
                    Teléfono / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+591 70000000"
                      className="w-full bg-white border border-[#806B55]/25 px-4 py-3 text-sm text-[#171717] focus:outline-none focus:border-[#806B55] transition-colors placeholder:text-neutral-400"
                    />
                    <Phone className="w-4 h-4 text-[#806B55]/40 absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

              </div>

              {/* Service / Course Selection & Preferred Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Course Selection */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717]/80">
                    Programa o Curso de Interés
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-white border border-[#806B55]/25 px-4 py-3 text-sm text-[#171717] focus:outline-none focus:border-[#806B55] transition-colors cursor-pointer"
                  >
                    <option value="">Información General de Todos los Cursos</option>
                    {services.map((srv) => (
                      <option key={srv.id} value={srv.title}>
                        {srv.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preferred Date */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717]/80">
                    Fecha Tentativa de Participación
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full bg-white border border-[#806B55]/25 px-4 py-3 text-sm text-[#171717] focus:outline-none focus:border-[#806B55] transition-colors"
                    />
                    <Calendar className="w-4 h-4 text-[#806B55]/40 absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

              </div>

              {/* Additional Notes / Medical Experience */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717]/80">
                  Comentarios o Consultas Académicas
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Detalla tu experiencia previa en procedimientos o dudas sobre el temario, pacientes modelo o cupos..."
                  className="w-full bg-white border border-[#806B55]/25 p-4 text-sm text-[#171717] focus:outline-none focus:border-[#806B55] transition-colors placeholder:text-neutral-400 resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-[#806B55] flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#806B55]" />
                  <span>Exclusivo para médicos con certificación profesional.</span>
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#806B55] hover:bg-[#6c5945] transition-all disabled:opacity-60 flex items-center justify-center gap-2 active:translate-y-0.5 shadow-sm"
                >
                  {isSubmitting ? (
                    <span>Enviando Solicitud...</span>
                  ) : (
                    <>
                      <span>Solicitar Información del Curso</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </section>
  );
};
