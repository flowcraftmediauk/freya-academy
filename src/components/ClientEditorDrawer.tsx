import React, { useState } from 'react';
import { SiteConfig, ServiceItem, Appointment } from '../types';
import { User } from 'firebase/auth';
import {
  X,
  Save,
  CheckCircle,
  Plus,
  Trash2,
  Calendar,
  Building,
  Sparkles,
  Phone,
  FileText,
  LogIn,
  LogOut,
  AlertCircle,
  Layers,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

interface ClientEditorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
  services: ServiceItem[];
  appointments: Appointment[];
  user: User | null;
  onSaveConfig: (updatedConfig: SiteConfig) => Promise<void>;
  onAddService: (newService: Omit<ServiceItem, 'id'>) => Promise<void>;
  onDeleteService: (serviceId: string) => Promise<void>;
  onUpdateAppointmentStatus: (
    appointmentId: string,
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  ) => Promise<void>;
  onLogin: () => void;
  onLogout: () => void;
  isSaving: boolean;
}

export const ClientEditorDrawer: React.FC<ClientEditorDrawerProps> = ({
  isOpen,
  onClose,
  config,
  services,
  appointments,
  user,
  onSaveConfig,
  onAddService,
  onDeleteService,
  onUpdateAppointmentStatus,
  onLogin,
  onLogout,
  isSaving,
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'upcoming' | 'services' | 'appointments'>('info');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<SiteConfig>(config);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // New service state
  const [newServiceTitle, setNewServiceTitle] = useState('');
  const [newServiceDesc, setNewServiceDesc] = useState('');
  const [newServiceImg, setNewServiceImg] = useState('/images/clinic_wellness_treatment.jpg');
  const [newServiceCta, setNewServiceCta] = useState('Inquire Service');

  // Keep form data in sync when config updates
  React.useEffect(() => {
    setFormData(config);
  }, [config]);

  if (!isOpen) return null;

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    await onSaveConfig(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceTitle.trim()) return;

    await onAddService({
      title: newServiceTitle.trim(),
      description: newServiceDesc.trim(),
      imageUrl: newServiceImg,
      ctaText: newServiceCta.trim() || 'Inquire Service',
      order: services.length + 1,
      createdAt: new Date().toISOString(),
    });

    setNewServiceTitle('');
    setNewServiceDesc('');
  };

  const steps = [
    { num: 1, title: 'Business Name', key: 'businessName' },
    { num: 2, title: 'Logo', key: 'logoUrl' },
    { num: 3, title: 'Tagline', key: 'tagline' },
    { num: 4, title: 'Hero Content', key: 'heroHeadline' },
    { num: 5, title: 'About Section', key: 'aboutHeading' },
    { num: 6, title: 'Contact & Hours', key: 'phone' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-2xl bg-[#FAF7F2] h-full shadow-2xl flex flex-col border-l border-[#806B55]/30 animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-6 bg-white border-b border-[#806B55]/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-[#F2E4D5] flex items-center justify-center text-[#806B55] border border-[#806B55]/30">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold text-[#171717]">
                Practice Information Console
              </h2>
              <p className="text-xs text-[#806B55]">
                {user ? `Connected: ${user.email}` : 'Signed in as guest editor (Syncs to Firestore)'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!user ? (
              <button
                onClick={onLogin}
                className="px-2.5 py-1.5 text-xs text-[#806B55] border border-[#806B55]/30 hover:border-[#806B55] bg-[#FAF7F2] transition-colors flex items-center gap-1"
                title="Authenticate with Google"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Google Login</span>
              </button>
            ) : (
              <button
                onClick={onLogout}
                className="p-1.5 text-xs text-[#806B55] hover:bg-neutral-100 transition-colors"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-[#171717]/60 hover:text-[#171717] hover:bg-neutral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 bg-[#FAF7F2] border-b border-[#806B55]/15 flex items-center gap-4 text-xs font-semibold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('info')}
            className={`py-3.5 border-b-2 transition-colors ${
              activeTab === 'info'
                ? 'border-[#806B55] text-[#806B55]'
                : 'border-transparent text-[#171717]/60 hover:text-[#171717]'
            }`}
          >
            Client Information
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`py-3.5 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'upcoming'
                ? 'border-[#806B55] text-[#806B55]'
                : 'border-transparent text-[#171717]/60 hover:text-[#171717]'
            }`}
          >
            <span>Próximo Curso</span>
            <span className="bg-[#9E6370] text-white px-1.5 py-0.5 rounded text-[9px] font-bold">
              Destacado
            </span>
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`py-3.5 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'services'
                ? 'border-[#806B55] text-[#806B55]'
                : 'border-transparent text-[#171717]/60 hover:text-[#171717]'
            }`}
          >
            <span>Cursos / Servicios</span>
            <span className="bg-[#806B55]/10 text-[#806B55] px-1.5 py-0.5 rounded text-[10px]">
              {services.length || 10}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`py-3.5 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'appointments'
                ? 'border-[#806B55] text-[#806B55]'
                : 'border-transparent text-[#171717]/60 hover:text-[#171717]'
            }`}
          >
            <span>Inquiries</span>
            <span className="bg-[#806B55]/10 text-[#806B55] px-1.5 py-0.5 rounded text-[10px]">
              {appointments.length}
            </span>
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: CLIENT INFORMATION */}
          {activeTab === 'info' && (
            <div className="space-y-6">
              
              {/* Step Navigator */}
              <div className="bg-white p-4 border border-[#806B55]/15">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#806B55] mb-2.5">
                  Information Collection Workflow
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                  {steps.map((st) => {
                    const isFilled = Boolean(formData[st.key as keyof SiteConfig]);
                    return (
                      <button
                        key={st.num}
                        type="button"
                        onClick={() => setCurrentStep(st.num)}
                        className={`p-2 text-center text-xs border transition-colors ${
                          currentStep === st.num
                            ? 'border-[#806B55] bg-[#806B55] text-white font-semibold'
                            : isFilled
                            ? 'border-[#806B55]/40 bg-[#F2E4D5]/30 text-[#806B55]'
                            : 'border-neutral-200 bg-neutral-50 text-neutral-500'
                        }`}
                      >
                        <div className="text-[10px] opacity-75">Step {st.num}</div>
                        <div className="truncate">{st.title}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form Step Content */}
              <form onSubmit={handleSave} className="space-y-6">
                
                {/* Step 1: Business Name */}
                {currentStep === 1 && (
                  <div className="bg-white p-6 border border-[#806B55]/20 space-y-4">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-[#806B55]">Step 01</span>
                      <h3 className="font-display text-lg font-semibold text-[#171717]">
                        What is the client's business name?
                      </h3>
                      <p className="text-xs text-[#171717]/60 font-light mt-1">
                        This is the official clinic or practice name displayed prominently in the header, hero section, and footer.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase text-[#171717]/80">
                        Official Business Name
                      </label>
                      <input
                        type="text"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        placeholder="e.g. Atelier Aesthetics & Health"
                        className="w-full bg-[#FAF7F2] border border-[#806B55]/30 p-3 text-sm focus:outline-none focus:border-[#806B55] transition-colors"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#806B55] text-white flex items-center gap-1"
                      >
                        <span>Next: Logo</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Logo */}
                {currentStep === 2 && (
                  <div className="bg-white p-6 border border-[#806B55]/20 space-y-4">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-[#806B55]">Step 02</span>
                      <h3 className="font-display text-lg font-semibold text-[#171717]">
                        Please provide the client's logo
                      </h3>
                      <p className="text-xs text-[#171717]/60 font-light mt-1">
                        If the client has an image logo URL, enter it here. Otherwise, the clean typographic business wordmark will be used.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase text-[#171717]/80">
                        Logo Image URL (Optional)
                      </label>
                      <input
                        type="url"
                        value={formData.logoUrl}
                        onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                        placeholder="https://example.com/logo.svg"
                        className="w-full bg-[#FAF7F2] border border-[#806B55]/30 p-3 text-sm focus:outline-none focus:border-[#806B55] transition-colors"
                      />
                    </div>

                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="px-4 py-2 text-xs font-semibold uppercase tracking-wider border border-[#806B55]/30 text-[#806B55]"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#806B55] text-white flex items-center gap-1"
                      >
                        <span>Next: Tagline</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Tagline */}
                {currentStep === 3 && (
                  <div className="bg-white p-6 border border-[#806B55]/20 space-y-4">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-[#806B55]">Step 03</span>
                      <h3 className="font-display text-lg font-semibold text-[#171717]">
                        What is the client's tagline or business type?
                      </h3>
                      <p className="text-xs text-[#171717]/60 font-light mt-1">
                        A refined eyebrow label describing the clinical discipline (e.g., "Private Health & Aesthetic Medicine").
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase text-[#171717]/80">
                        Tagline / Category
                      </label>
                      <input
                        type="text"
                        value={formData.tagline}
                        onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                        placeholder="e.g. Private Clinical Excellence & Wellness"
                        className="w-full bg-[#FAF7F2] border border-[#806B55]/30 p-3 text-sm focus:outline-none focus:border-[#806B55] transition-colors"
                      />
                    </div>

                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="px-4 py-2 text-xs font-semibold uppercase tracking-wider border border-[#806B55]/30 text-[#806B55]"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(4)}
                        className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#806B55] text-white flex items-center gap-1"
                      >
                        <span>Next: Hero</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 4: Hero Headline & Description */}
                {currentStep === 4 && (
                  <div className="bg-white p-6 border border-[#806B55]/20 space-y-4">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-[#806B55]">Step 04</span>
                      <h3 className="font-display text-lg font-semibold text-[#171717]">
                        Hero Headline & Practice Description
                      </h3>
                      <p className="text-xs text-[#171717]/60 font-light mt-1">
                        The primary statement that greets prospective patients.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase text-[#171717]/80">
                        Hero Headline
                      </label>
                      <input
                        type="text"
                        value={formData.heroHeadline}
                        onChange={(e) => setFormData({ ...formData, heroHeadline: e.target.value })}
                        placeholder="e.g. Restoring Vitality with Discretion and Care"
                        className="w-full bg-[#FAF7F2] border border-[#806B55]/30 p-3 text-sm focus:outline-none focus:border-[#806B55] transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase text-[#171717]/80">
                        Practice Description / Subheading
                      </label>
                      <textarea
                        rows={3}
                        value={formData.heroSubheading || formData.businessDescription}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            heroSubheading: e.target.value,
                            businessDescription: e.target.value,
                          });
                        }}
                        placeholder="e.g. Combining state-of-the-art diagnostic protocols with personalized patient wellness..."
                        className="w-full bg-[#FAF7F2] border border-[#806B55]/30 p-3 text-sm focus:outline-none focus:border-[#806B55] transition-colors resize-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase text-[#171717]/80">
                        Call to Action Label
                      </label>
                      <input
                        type="text"
                        value={formData.ctaText}
                        onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                        placeholder="Schedule Consultation"
                        className="w-full bg-[#FAF7F2] border border-[#806B55]/30 p-3 text-sm focus:outline-none focus:border-[#806B55] transition-colors"
                      />
                    </div>

                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        className="px-4 py-2 text-xs font-semibold uppercase tracking-wider border border-[#806B55]/30 text-[#806B55]"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(5)}
                        className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#806B55] text-white flex items-center gap-1"
                      >
                        <span>Next: About</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 5: About Section */}
                {currentStep === 5 && (
                  <div className="bg-white p-6 border border-[#806B55]/20 space-y-4">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-[#806B55]">Step 05</span>
                      <h3 className="font-display text-lg font-semibold text-[#171717]">
                        About The Practice
                      </h3>
                      <p className="text-xs text-[#171717]/60 font-light mt-1">
                        Authentic background, practitioner credentials, and clinical philosophy.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase text-[#171717]/80">
                        About Heading
                      </label>
                      <input
                        type="text"
                        value={formData.aboutHeading}
                        onChange={(e) => setFormData({ ...formData, aboutHeading: e.target.value })}
                        placeholder="e.g. A Haven for Thoughtful, Evidence-Based Medicine"
                        className="w-full bg-[#FAF7F2] border border-[#806B55]/30 p-3 text-sm focus:outline-none focus:border-[#806B55] transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase text-[#171717]/80">
                        About Description
                      </label>
                      <textarea
                        rows={4}
                        value={formData.aboutDescription}
                        onChange={(e) => setFormData({ ...formData, aboutDescription: e.target.value })}
                        placeholder="Provide the authentic clinical narrative, background, or care approach..."
                        className="w-full bg-[#FAF7F2] border border-[#806B55]/30 p-3 text-sm focus:outline-none focus:border-[#806B55] transition-colors resize-none"
                      />
                    </div>

                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(4)}
                        className="px-4 py-2 text-xs font-semibold uppercase tracking-wider border border-[#806B55]/30 text-[#806B55]"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(6)}
                        className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#806B55] text-white flex items-center gap-1"
                      >
                        <span>Next: Contact</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 6: Contact Information */}
                {currentStep === 6 && (
                  <div className="bg-white p-6 border border-[#806B55]/20 space-y-4">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-[#806B55]">Step 06</span>
                      <h3 className="font-display text-lg font-semibold text-[#171717]">
                        Contact Information & Operating Hours
                      </h3>
                      <p className="text-xs text-[#171717]/60 font-light mt-1">
                        Official contact channels for direct patient inquiries.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase text-[#171717]/80">
                          WhatsApp Display Number
                        </label>
                        <input
                          type="tel"
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                          placeholder="+591 62722266"
                          className="w-full bg-[#FAF7F2] border border-[#806B55]/30 p-3 text-sm focus:outline-none focus:border-[#806B55] transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase text-[#171717]/80">
                          Direct WhatsApp API Link
                        </label>
                        <input
                          type="url"
                          value={formData.whatsappUrl || ''}
                          onChange={(e) => setFormData({ ...formData, whatsappUrl: e.target.value })}
                          placeholder="https://api.whatsapp.com/send/?phone=59162722266..."
                          className="w-full bg-[#FAF7F2] border border-[#806B55]/30 p-3 text-sm focus:outline-none focus:border-[#806B55] transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase text-[#171717]/80">
                          Instagram Profile URL
                        </label>
                        <input
                          type="url"
                          value={formData.instagramUrl || ''}
                          onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                          placeholder="https://www.instagram.com/freyaacademiabo..."
                          className="w-full bg-[#FAF7F2] border border-[#806B55]/30 p-3 text-sm focus:outline-none focus:border-[#806B55] transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase text-[#171717]/80">
                          Facebook Page URL
                        </label>
                        <input
                          type="url"
                          value={formData.facebookUrl || ''}
                          onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                          placeholder="https://www.facebook.com/freyaacademiabo..."
                          className="w-full bg-[#FAF7F2] border border-[#806B55]/30 p-3 text-sm focus:outline-none focus:border-[#806B55] transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase text-[#171717]/80">
                          Official Email
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="concierge@practice.com"
                          className="w-full bg-[#FAF7F2] border border-[#806B55]/30 p-3 text-sm focus:outline-none focus:border-[#806B55] transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase text-[#171717]/80">
                          Practice Address
                        </label>
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          placeholder="Calle 10 de Calacoto, Edificio Vitruvio C10, Piso 12, La Paz, Bolivia"
                          className="w-full bg-[#FAF7F2] border border-[#806B55]/30 p-3 text-sm focus:outline-none focus:border-[#806B55] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase text-[#171717]/80">
                        Operating Hours
                      </label>
                      <input
                        type="text"
                        value={formData.openingHours}
                        onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                        placeholder="Mon - Fri: 08:30 - 18:00 | Sat: By appointment"
                        className="w-full bg-[#FAF7F2] border border-[#806B55]/30 p-3 text-sm focus:outline-none focus:border-[#806B55] transition-colors"
                      />
                    </div>

                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(5)}
                        className="px-4 py-2 text-xs font-semibold uppercase tracking-wider border border-[#806B55]/30 text-[#806B55]"
                      >
                        Back
                      </button>
                    </div>
                  </div>
                )}

                {/* Save Button */}
                <div className="pt-2 flex items-center justify-between">
                  {saveSuccess && (
                    <span className="text-xs text-emerald-700 flex items-center gap-1.5 font-medium">
                      <CheckCircle className="w-4 h-4" />
                      <span>Changes saved & synchronized!</span>
                    </span>
                  )}

                  <button
                    type="submit"
                    disabled={isSaving}
                    className="ml-auto px-6 py-3 text-xs font-semibold uppercase tracking-wider bg-[#806B55] text-white hover:bg-[#6c5945] transition-all flex items-center gap-2 active:translate-y-0.5 disabled:opacity-60"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isSaving ? 'Saving to Database...' : 'Save & Sync Site'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB: UPCOMING COURSE (PRÓXIMO CURSO) */}
          {activeTab === 'upcoming' && (
            <div className="space-y-6">
              <div className="bg-white p-6 border border-[#806B55]/20 space-y-5">
                <div>
                  <h3 className="font-display text-base font-semibold text-[#171717]">
                    Gestión del Próximo Curso Destacado
                  </h3>
                  <p className="text-xs text-[#171717]/60 font-light mt-1">
                    Publica y actualiza la convocatoria del nuevo curso que impartirá la Dra. Mónica Meneses. Esta tarjeta aparece destacada en la página principal con botón directo a WhatsApp y reserva de cupos.
                  </p>
                </div>

                <form onSubmit={handleSave} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase text-[#171717]/80">
                      Título del Nuevo Curso <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.featuredCourse?.title || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          featuredCourse: {
                            ...(formData.featuredCourse || {
                              badge: 'Próxima Convocatoria',
                              title: '',
                              subtitle: '',
                              description: '',
                              date: '',
                              location: 'Santa Cruz, Bolivia',
                              modality: 'Hands-On en Pacientes Reales',
                              seatsTotal: 8,
                              seatsLeft: 3,
                              targetAudience: 'Médico estético, Médico dermatólogo, Cirujano plástico',
                              syllabusHighlights: [],
                              isOpen: true,
                            }),
                            title: e.target.value,
                          },
                        })
                      }
                      placeholder="e.g. Masterclass Avanzada: Armonización Facial & Bioestimuladores"
                      className="w-full bg-[#FAF7F2] border border-[#806B55]/30 p-3 text-sm focus:outline-none focus:border-[#806B55]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase text-[#171717]/80">
                        Etiqueta / Badge
                      </label>
                      <input
                        type="text"
                        value={formData.featuredCourse?.badge || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            featuredCourse: {
                              ...(formData.featuredCourse || ({} as any)),
                              badge: e.target.value,
                            },
                          })
                        }
                        placeholder="Próxima Convocatoria • Cupos Limitados"
                        className="w-full bg-[#FAF7F2] border border-[#806B55]/30 p-3 text-sm focus:outline-none focus:border-[#806B55]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase text-[#171717]/80">
                        Fecha Programada
                      </label>
                      <input
                        type="text"
                        value={formData.featuredCourse?.date || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            featuredCourse: {
                              ...(formData.featuredCourse || ({} as any)),
                              date: e.target.value,
                            },
                          })
                        }
                        placeholder="Próximamente • Fecha por Confirmar"
                        className="w-full bg-[#FAF7F2] border border-[#806B55]/30 p-3 text-sm focus:outline-none focus:border-[#806B55]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase text-[#171717]/80">
                        Sede / Ciudad
                      </label>
                      <input
                        type="text"
                        value={formData.featuredCourse?.location || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            featuredCourse: {
                              ...(formData.featuredCourse || ({} as any)),
                              location: e.target.value,
                            },
                          })
                        }
                        placeholder="Sede Freya Academy • Santa Cruz, Bolivia"
                        className="w-full bg-[#FAF7F2] border border-[#806B55]/30 p-3 text-sm focus:outline-none focus:border-[#806B55]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase text-[#171717]/80">
                        Modalidad
                      </label>
                      <input
                        type="text"
                        value={formData.featuredCourse?.modality || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            featuredCourse: {
                              ...(formData.featuredCourse || ({} as any)),
                              modality: e.target.value,
                            },
                          })
                        }
                        placeholder="100% Práctico con Pacientes Reales"
                        className="w-full bg-[#FAF7F2] border border-[#806B55]/30 p-3 text-sm focus:outline-none focus:border-[#806B55]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase text-[#171717]/80">
                        Cupos Totales
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={50}
                        value={formData.featuredCourse?.seatsTotal || 8}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            featuredCourse: {
                              ...(formData.featuredCourse || ({} as any)),
                              seatsTotal: parseInt(e.target.value) || 8,
                            },
                          })
                        }
                        className="w-full bg-[#FAF7F2] border border-[#806B55]/30 p-3 text-sm focus:outline-none focus:border-[#806B55]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase text-[#171717]/80">
                        Cupos Disponibles
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={formData.featuredCourse?.seatsTotal || 8}
                        value={formData.featuredCourse?.seatsLeft || 3}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            featuredCourse: {
                              ...(formData.featuredCourse || ({} as any)),
                              seatsLeft: parseInt(e.target.value) || 0,
                            },
                          })
                        }
                        className="w-full bg-[#FAF7F2] border border-[#806B55]/30 p-3 text-sm focus:outline-none focus:border-[#806B55]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase text-[#171717]/80">
                      Subtítulo o Enfoque
                    </label>
                    <input
                      type="text"
                      value={formData.featuredCourse?.subtitle || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          featuredCourse: {
                            ...(formData.featuredCourse || ({} as any)),
                            subtitle: e.target.value,
                          },
                        })
                      }
                      placeholder="Técnicas de inyección segura con microcánula y anatomía de alta precisión"
                      className="w-full bg-[#FAF7F2] border border-[#806B55]/30 p-3 text-sm focus:outline-none focus:border-[#806B55]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase text-[#171717]/80">
                      Descripción del Curso
                    </label>
                    <textarea
                      rows={3}
                      value={formData.featuredCourse?.description || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          featuredCourse: {
                            ...(formData.featuredCourse || ({} as any)),
                            description: e.target.value,
                          },
                        })
                      }
                      placeholder="Detalles sobre metodología, pacientes reales y mentoría..."
                      className="w-full bg-[#FAF7F2] border border-[#806B55]/30 p-3 text-sm focus:outline-none focus:border-[#806B55] resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    {saveSuccess && (
                      <span className="text-xs text-emerald-700 flex items-center gap-1.5 font-medium">
                        <CheckCircle className="w-4 h-4" />
                        <span>¡Próximo curso actualizado y publicado!</span>
                      </span>
                    )}

                    <button
                      type="submit"
                      disabled={isSaving}
                      className="ml-auto px-6 py-3 text-xs font-semibold uppercase tracking-wider bg-[#806B55] text-white hover:bg-[#6c5945] transition-all flex items-center gap-2 active:translate-y-0.5 disabled:opacity-60"
                    >
                      <Save className="w-4 h-4" />
                      <span>{isSaving ? 'Guardando...' : 'Publicar Anuncio de Curso'}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* TAB 2: SERVICES MANAGEMENT */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              
              {/* Add New Service Form */}
              <div className="bg-white p-6 border border-[#806B55]/20 space-y-4">
                <h3 className="font-display text-base font-semibold text-[#171717]">
                  Add Client Clinical Service
                </h3>
                <p className="text-xs text-[#171717]/60 font-light">
                  Add only authentic services verified by the client.
                </p>

                <form onSubmit={handleCreateService} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase text-[#171717]/80">
                      Service Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={newServiceTitle}
                      onChange={(e) => setNewServiceTitle(e.target.value)}
                      placeholder="e.g. Preventative Health Assessment"
                      className="w-full bg-[#FAF7F2] border border-[#806B55]/30 p-2.5 text-sm focus:outline-none focus:border-[#806B55]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase text-[#171717]/80">
                      Description
                    </label>
                    <textarea
                      rows={2}
                      value={newServiceDesc}
                      onChange={(e) => setNewServiceDesc(e.target.value)}
                      placeholder="Concise clinical summary of the treatment or consultation..."
                      className="w-full bg-[#FAF7F2] border border-[#806B55]/30 p-2.5 text-sm focus:outline-none focus:border-[#806B55] resize-none"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#806B55] text-white hover:bg-[#6c5945] flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Service Item</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Current Services List */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#806B55]">
                  Active Services ({services.length})
                </h4>

                {services.length === 0 ? (
                  <p className="text-xs text-[#806B55]/70 italic bg-white p-4 border border-dashed border-[#806B55]/30 text-center">
                    No services configured yet. Add services above or provide them in chat.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {services.map((srv, idx) => (
                      <div
                        key={srv.id || idx}
                        className="bg-white p-4 border border-[#806B55]/20 flex items-start justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono text-[#806B55] font-semibold">
                              {(idx + 1).toString().padStart(2, '0')}.
                            </span>
                            <span className="text-sm font-semibold text-[#171717]">
                              {srv.title}
                            </span>
                          </div>
                          <p className="text-xs text-[#171717]/70 mt-1">
                            {srv.description}
                          </p>
                        </div>
                        <button
                          onClick={() => onDeleteService(srv.id)}
                          className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                          title="Remove service"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 3: APPOINTMENT INQUIRIES */}
          {activeTab === 'appointments' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-base font-semibold text-[#171717]">
                    Patient Consultation Requests
                  </h3>
                  <p className="text-xs text-[#171717]/60 font-light">
                    Real-time inquiries received from website visitors, stored securely in Firestore.
                  </p>
                </div>
              </div>

              {appointments.length === 0 ? (
                <div className="bg-white p-12 border border-dashed border-[#806B55]/30 text-center space-y-2">
                  <Calendar className="w-8 h-8 text-[#806B55]/40 mx-auto" />
                  <p className="text-sm font-medium text-[#171717]">
                    No inquiries received yet
                  </p>
                  <p className="text-xs text-[#171717]/60">
                    When visitors submit the consultation form on the live site, they appear here instantly.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {appointments.map((appt) => (
                    <div
                      key={appt.id}
                      className="bg-white p-4 border border-[#806B55]/20 space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-sm font-semibold text-[#171717]">
                            {appt.fullName}
                          </h4>
                          <div className="text-xs text-[#806B55] flex flex-wrap gap-x-3 gap-y-1 mt-0.5">
                            {appt.email && <span>{appt.email}</span>}
                            {appt.phone && <span>{appt.phone}</span>}
                            {appt.preferredDate && <span>Fecha: {appt.preferredDate}</span>}
                          </div>
                          {appt.medicalSpecialty && (
                            <div className="mt-1.5 inline-block bg-[#806B55]/10 text-[#806B55] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider border border-[#806B55]/20">
                              Especialidad: {appt.medicalSpecialty}
                            </div>
                          )}
                        </div>

                        {/* Status selector */}
                        <select
                          value={appt.status}
                          onChange={(e) =>
                            onUpdateAppointmentStatus(
                              appt.id,
                              e.target.value as 'pending' | 'confirmed' | 'completed' | 'cancelled'
                            )
                          }
                          className="text-xs bg-[#FAF7F2] border border-[#806B55]/30 px-2 py-1 uppercase tracking-wider font-semibold focus:outline-none"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>

                      {appt.service && (
                        <div className="text-xs">
                          <span className="font-semibold text-[#171717]">Area:</span>{' '}
                          <span className="text-[#171717]/80">{appt.service}</span>
                        </div>
                      )}

                      {appt.notes && (
                        <div className="p-2.5 bg-[#FAF7F2] text-xs text-[#171717]/80 italic border-l-2 border-[#806B55]">
                          "{appt.notes}"
                        </div>
                      )}

                      <div className="text-[10px] text-neutral-400">
                        Received: {new Date(appt.createdAt).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
