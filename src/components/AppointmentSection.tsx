import React, { useState } from 'react';
import { SiteConfig, ServiceItem } from '../types';
import { collection, addDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { Calendar, CheckCircle2, Send, Clock, User, Mail, Phone, FileText } from 'lucide-react';

interface AppointmentSectionProps {
  config: SiteConfig;
  services: ServiceItem[];
}

export const AppointmentSection: React.FC<AppointmentSectionProps> = ({
  config,
  services,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    preferredDate: '',
    service: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setErrorMessage('Please provide your full name.');
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
        preferredDate: formData.preferredDate.trim(),
        service: formData.service.trim(),
        notes: formData.notes.trim(),
        status: 'pending',
        createdAt: new Date().toISOString(),
      });

      setIsSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        preferredDate: '',
        service: '',
        notes: '',
      });
    } catch (err) {
      console.error('Failed to submit appointment:', err);
      try {
        handleFirestoreError(err, OperationType.CREATE, path);
      } catch {
        // Fallback display message
        setErrorMessage('Unable to submit inquiry at this moment. Please reach out directly by phone.');
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
                Consultation Request Received
              </h3>
              <p className="text-sm text-[#171717]/70 max-w-md mx-auto">
                Thank you. Your consultation inquiry has been logged in our secure practice records. A member of our clinical team will contact you shortly.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="mt-4 px-6 py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#806B55] hover:bg-[#6c5945] transition-all"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717]/80">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Eleanor Vance"
                      className="w-full bg-white border border-[#806B55]/25 px-4 py-3 text-sm text-[#171717] focus:outline-none focus:border-[#806B55] transition-colors placeholder:text-neutral-400"
                    />
                    <User className="w-4 h-4 text-[#806B55]/40 absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717]/80">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. client@example.com"
                      className="w-full bg-white border border-[#806B55]/25 px-4 py-3 text-sm text-[#171717] focus:outline-none focus:border-[#806B55] transition-colors placeholder:text-neutral-400"
                    />
                    <Mail className="w-4 h-4 text-[#806B55]/40 absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717]/80">
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +44 20 7946 0912"
                      className="w-full bg-white border border-[#806B55]/25 px-4 py-3 text-sm text-[#171717] focus:outline-none focus:border-[#806B55] transition-colors placeholder:text-neutral-400"
                    />
                    <Phone className="w-4 h-4 text-[#806B55]/40 absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Preferred Date */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717]/80">
                    Preferred Date
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

              {/* Service Selection */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717]/80">
                  Area of Consultation
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-white border border-[#806B55]/25 px-4 py-3 text-sm text-[#171717] focus:outline-none focus:border-[#806B55] transition-colors"
                >
                  <option value="">General Consultation / Assessment</option>
                  {services.map((srv) => (
                    <option key={srv.id} value={srv.title}>
                      {srv.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Additional Notes */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717]/80">
                  Consultation Notes / Inquiries
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Please mention any specific concerns, medical history notes, or scheduling preferences..."
                  className="w-full bg-white border border-[#806B55]/25 p-4 text-sm text-[#171717] focus:outline-none focus:border-[#806B55] transition-colors placeholder:text-neutral-400 resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-[#806B55] font-light">
                  Protected by secure clinical privacy guidelines.
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#806B55] hover:bg-[#6c5945] transition-all disabled:opacity-60 flex items-center justify-center gap-2 active:translate-y-0.5"
                >
                  {isSubmitting ? (
                    <span>Submitting Request...</span>
                  ) : (
                    <>
                      <span>Submit Consultation Request</span>
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
