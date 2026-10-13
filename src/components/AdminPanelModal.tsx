import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Lock,
  LogOut,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Phone,
  Mail,
  Calendar,
  MessageCircle,
  Download,
  Trash2,
  RefreshCw,
  UserCheck,
  Stethoscope,
  ChevronDown,
  ShieldCheck,
} from 'lucide-react';
import {
  fetchAppointmentsFromSupabase,
  updateAppointmentStatusInSupabase,
  deleteAppointmentInSupabase,
  SupabaseAppointment,
  supabase,
} from '../supabase';
import { Appointment } from '../types';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  firestoreAppointments?: Appointment[];
}

const AUTHORIZED_ADMIN_EMAIL = 'biozoneboliviasrl@gmail.com';
const AUTHORIZED_ADMIN_PASS = 'jpF5VrLqgQ5D8TqO';
const AUTH_STORAGE_KEY = 'freya_admin_session_auth';

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  firestoreAppointments = [],
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState<string>('biozoneboliviasrl@gmail.com');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  // Appointments state
  const [appointments, setAppointments] = useState<SupabaseAppointment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [specialtyFilter, setSpecialtyFilter] = useState<string>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Check saved session on mount
  useEffect(() => {
    const saved = sessionStorage.getItem(AUTH_STORAGE_KEY);
    if (saved === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch appointments when authenticated
  const loadAppointments = async () => {
    setIsLoading(true);
    try {
      const sbItems = await fetchAppointmentsFromSupabase();

      // Merge with firestore items to ensure zero data loss
      const combinedMap = new Map<string, SupabaseAppointment>();

      // Add Supabase items first
      sbItems.forEach((item) => {
        combinedMap.set(item.id, item);
      });

      // Add any Firestore items not in Supabase by matching phone/email/date
      firestoreAppointments.forEach((fa) => {
        const key = fa.id || `${fa.phone}_${fa.createdAt}`;
        if (!combinedMap.has(key)) {
          combinedMap.set(key, {
            id: fa.id,
            fullName: fa.fullName,
            email: fa.email,
            phone: fa.phone,
            medicalSpecialty: fa.medicalSpecialty,
            preferredDate: fa.preferredDate,
            service: fa.service,
            notes: fa.notes,
            status: fa.status || 'pending',
            createdAt: fa.createdAt || new Date().toISOString(),
          });
        }
      });

      const list = Array.from(combinedMap.values()).sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setAppointments(list);
    } catch (err) {
      console.warn('Error loading appointments:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadAppointments();
    }
  }, [isOpen, isAuthenticated]);

  if (!isOpen) return null;

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsLoggingIn(true);

    const emailTrim = emailInput.trim().toLowerCase();

    // Verify authorized single slot administrator
    if (emailTrim !== AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
      setAuthError('Acceso Denegado: Solo el administrador autorizado (biozoneboliviasrl@gmail.com) tiene permiso.');
      setIsLoggingIn(false);
      return;
    }

    if (passwordInput !== AUTHORIZED_ADMIN_PASS) {
      setAuthError('Contraseña incorrecta. Por favor verifique sus credenciales.');
      setIsLoggingIn(false);
      return;
    }

    // Try Supabase Auth sign in or sign up silently
    try {
      const { error: signInErr } = await supabase.auth.signInWithPassword({
        email: AUTHORIZED_ADMIN_EMAIL,
        password: AUTHORIZED_ADMIN_PASS,
      });

      if (signInErr && signInErr.message.includes('Invalid login credentials')) {
        // First time initialization: sign up the single slot admin account
        await supabase.auth.signUp({
          email: AUTHORIZED_ADMIN_EMAIL,
          password: AUTHORIZED_ADMIN_PASS,
        });
      }
    } catch {
      // Continue with verified master credentials
    }

    sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
    setIsAuthenticated(true);
    setPasswordInput('');
    setIsLoggingIn(false);
  };

  // Handle Logout
  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
    setPasswordInput('');
    supabase.auth.signOut().catch(() => {});
  };

  // Handle Status Update
  const handleStatusChange = async (
    id: string,
    newStatus: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  ) => {
    setUpdatingId(id);
    await updateAppointmentStatusInSupabase(id, newStatus);
    setAppointments((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
    setUpdatingId(null);
  };

  // Handle Delete
  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`¿Está seguro de eliminar la postulación de ${name}?`)) {
      return;
    }
    setUpdatingId(id);
    await deleteAppointmentInSupabase(id);
    setAppointments((prev) => prev.filter((app) => app.id !== id));
    setUpdatingId(null);
  };

  // Filtered appointments
  const filteredAppointments = appointments.filter((item) => {
    const matchesSearch =
      item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.includes(searchQuery) ||
      (item.email && item.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.service.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesSpecialty =
      specialtyFilter === 'all' || item.medicalSpecialty === specialtyFilter;

    return matchesSearch && matchesStatus && matchesSpecialty;
  });

  // Export to CSV
  const handleExportCSV = () => {
    if (appointments.length === 0) return;

    const headers = [
      'Fecha',
      'Nombre',
      'Especialidad',
      'Telefono / WhatsApp',
      'Email',
      'Curso',
      'Fecha Tentativa',
      'Estado',
      'Comentarios',
    ];

    const rows = appointments.map((a) => [
      new Date(a.createdAt).toLocaleString('es-ES'),
      `"${a.fullName.replace(/"/g, '""')}"`,
      `"${a.medicalSpecialty.replace(/"/g, '""')}"`,
      `"${a.phone.replace(/"/g, '""')}"`,
      `"${(a.email || '').replace(/"/g, '""')}"`,
      `"${a.service.replace(/"/g, '""')}"`,
      `"${(a.preferredDate || '').replace(/"/g, '""')}"`,
      a.status,
      `"${(a.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `freya_postulaciones_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const pendingCount = appointments.filter((a) => a.status === 'pending').length;
  const confirmedCount = appointments.filter((a) => a.status === 'confirmed').length;
  const completedCount = appointments.filter((a) => a.status === 'completed').length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] w-full max-w-6xl rounded-none border border-[#806B55]/30 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#171717] text-white flex items-center justify-between border-b border-[#806B55]/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#806B55] flex items-center justify-center text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-base font-semibold tracking-wide">
                Freya Academy — Portal Administrativo
              </h2>
              <p className="text-[11px] text-[#806B55]">
                {isAuthenticated
                  ? `Sesión Activa: ${AUTHORIZED_ADMIN_EMAIL}`
                  : 'Acceso Restringido y Protegido'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-xs text-[#FAF7F2]/80 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5 border border-white/20"
                title="Cerrar Sesión"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Cerrar Sesión</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        {!isAuthenticated ? (
          /* ================= LOGIN VIEW ================= */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center max-w-md mx-auto my-auto text-center w-full">
            <div className="w-14 h-14 bg-[#FAF7F2] border border-[#806B55]/30 rounded-full flex items-center justify-center text-[#806B55] mb-4 shadow-sm">
              <Lock className="w-6 h-6" />
            </div>

            <h3 className="font-display text-2xl font-semibold text-[#171717]">
              Acceso Administrativo
            </h3>
            <p className="text-xs text-[#171717]/65 mt-1.5 mb-6 max-w-xs">
              Portal exclusivo para la gestión de postulaciones y cupos académicos de Freya Academy.
            </p>

            {authError && (
              <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 text-xs text-red-700 font-medium text-left flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="w-full space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717]/80 mb-1">
                  Correo Electrónico Autorizado
                </label>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="biozoneboliviasrl@gmail.com"
                  className="w-full bg-white border border-[#806B55]/30 px-3.5 py-2.5 text-sm text-[#171717] focus:outline-none focus:border-[#806B55]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717]/80 mb-1">
                  Contraseña de Administrador
                </label>
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-white border border-[#806B55]/30 px-3.5 py-2.5 text-sm text-[#171717] focus:outline-none focus:border-[#806B55]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full py-3 text-xs font-semibold tracking-wider uppercase text-white bg-[#806B55] hover:bg-[#6c5945] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {isLoggingIn ? (
                    <span>Verificando...</span>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>Ingresar al Panel</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-[#806B55]/80 text-center pt-2">
                * Acceso restringido exclusivamente a la cuenta administrativa configurada.
              </p>
            </form>
          </div>
        ) : (
          /* ================= DASHBOARD VIEW ================= */
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {/* Stat Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-white p-4 border border-[#806B55]/20">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#806B55] block">
                  Total Postulaciones
                </span>
                <span className="text-2xl font-display font-semibold text-[#171717]">
                  {appointments.length}
                </span>
              </div>

              <div className="bg-white p-4 border border-amber-300/40 border-l-4 border-l-amber-500">
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700 block">
                  Pendientes
                </span>
                <span className="text-2xl font-display font-semibold text-amber-900">
                  {pendingCount}
                </span>
              </div>

              <div className="bg-white p-4 border border-emerald-300/40 border-l-4 border-l-emerald-600">
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 block">
                  Confirmadas
                </span>
                <span className="text-2xl font-display font-semibold text-emerald-900">
                  {confirmedCount}
                </span>
              </div>

              <div className="bg-white p-4 border border-blue-300/40 border-l-4 border-l-blue-600">
                <span className="text-[10px] uppercase font-bold tracking-wider text-blue-700 block">
                  Completadas
                </span>
                <span className="text-2xl font-display font-semibold text-blue-900">
                  {completedCount}
                </span>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-white p-4 border border-[#806B55]/20 flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Search */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-[#806B55]/50 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por médico, teléfono o curso..."
                  className="w-full bg-[#FAF7F2] border border-[#806B55]/30 pl-9 pr-3 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#806B55]"
                />
              </div>

              {/* Filters & Actions */}
              <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-[#FAF7F2] border border-[#806B55]/30 px-3 py-2 text-xs text-[#171717] focus:outline-none cursor-pointer"
                >
                  <option value="all">Todos los estados</option>
                  <option value="pending">Pendientes</option>
                  <option value="confirmed">Confirmadas</option>
                  <option value="completed">Completadas</option>
                  <option value="cancelled">Canceladas</option>
                </select>

                {/* Specialty Filter */}
                <select
                  value={specialtyFilter}
                  onChange={(e) => setSpecialtyFilter(e.target.value)}
                  className="bg-[#FAF7F2] border border-[#806B55]/30 px-3 py-2 text-xs text-[#171717] focus:outline-none cursor-pointer"
                >
                  <option value="all">Todas las especialidades</option>
                  <option value="Médico estético">Médico estético</option>
                  <option value="Médico dermatólogo">Médico dermatólogo</option>
                  <option value="Cirujano plástico">Cirujano plástico</option>
                </select>

                {/* Refresh */}
                <button
                  onClick={loadAppointments}
                  disabled={isLoading}
                  className="p-2 border border-[#806B55]/30 bg-[#FAF7F2] hover:bg-neutral-100 text-[#806B55] transition-colors"
                  title="Actualizar lista"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                </button>

                {/* Export CSV */}
                <button
                  onClick={handleExportCSV}
                  disabled={appointments.length === 0}
                  className="px-3 py-2 text-xs font-semibold tracking-wider uppercase bg-[#806B55] hover:bg-[#6c5945] text-white flex items-center gap-1.5 transition-colors disabled:opacity-50"
                  title="Descargar reporte Excel / CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Exportar CSV</span>
                </button>
              </div>
            </div>

            {/* Bookings List / Table */}
            <div className="bg-white border border-[#806B55]/20 overflow-hidden shadow-xs">
              {isLoading ? (
                <div className="py-16 text-center text-xs text-[#806B55]">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#806B55]" />
                  <span>Cargando postulaciones desde la base de datos...</span>
                </div>
              ) : filteredAppointments.length === 0 ? (
                <div className="py-16 text-center text-xs text-[#171717]/60">
                  <UserCheck className="w-8 h-8 mx-auto mb-2 text-[#806B55]/40" />
                  <p className="font-semibold text-sm text-[#171717]">
                    No se encontraron postulaciones
                  </p>
                  <p className="text-[11px] mt-1 text-[#171717]/50">
                    {searchQuery || statusFilter !== 'all' || specialtyFilter !== 'all'
                      ? 'Prueba modificando los filtros de búsqueda.'
                      : 'Las nuevas postulaciones recibidas en el sitio aparecerán aquí automáticamente.'}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#FAF7F2] border-b border-[#806B55]/20 text-[10px] font-bold uppercase tracking-wider text-[#806B55]">
                        <th className="py-3 px-4">Fecha</th>
                        <th className="py-3 px-4">Médico Postulante</th>
                        <th className="py-3 px-4">Especialidad</th>
                        <th className="py-3 px-4">Curso de Interés</th>
                        <th className="py-3 px-4">Contacto Directo</th>
                        <th className="py-3 px-4">Estado</th>
                        <th className="py-3 px-4 text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#806B55]/10">
                      {filteredAppointments.map((appt) => {
                        const cleanPhone = appt.phone.replace(/[^0-9]/g, '');
                        const waMsg = encodeURIComponent(
                          `Estimado/a ${appt.fullName}, le escribimos desde la Dirección Académica de Freya Academy respecto a su postulación para el programa "${appt.service}". ¿Desea que coordinemos los detalles de su cupo?`
                        );
                        const waUrl = `https://api.whatsapp.com/send/?phone=${cleanPhone}&text=${waMsg}`;

                        return (
                          <tr
                            key={appt.id}
                            className="hover:bg-[#FAF7F2]/60 transition-colors"
                          >
                            {/* Date */}
                            <td className="py-3.5 px-4 text-[11px] text-[#171717]/70 whitespace-nowrap">
                              {new Date(appt.createdAt).toLocaleDateString('es-ES', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                              })}
                              <span className="block text-[10px] text-[#806B55]">
                                {new Date(appt.createdAt).toLocaleTimeString('es-ES', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </span>
                            </td>

                            {/* Name & Notes */}
                            <td className="py-3.5 px-4">
                              <span className="font-semibold text-sm text-[#171717] block">
                                {appt.fullName}
                              </span>
                              {appt.notes && (
                                <p className="text-[11px] text-[#171717]/65 mt-0.5 line-clamp-2 italic">
                                  "{appt.notes}"
                                </p>
                              )}
                              {appt.preferredDate && (
                                <span className="text-[10px] text-[#806B55] mt-0.5 block">
                                  Tentativa: {appt.preferredDate}
                                </span>
                              )}
                            </td>

                            {/* Specialty */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span className="inline-block px-2 py-0.5 bg-[#FAF7F2] border border-[#806B55]/20 text-[10px] font-medium text-[#806B55]">
                                {appt.medicalSpecialty || 'Médico'}
                              </span>
                            </td>

                            {/* Course */}
                            <td className="py-3.5 px-4">
                              <span className="font-medium text-[#171717]">
                                {appt.service}
                              </span>
                            </td>

                            {/* Contact Channels */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <div className="flex items-center gap-1.5">
                                {/* WhatsApp 1-Click Action */}
                                <a
                                  href={waUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-2 py-1 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/30 text-[10px] font-semibold flex items-center gap-1 transition-colors"
                                  title={`Contactar a ${appt.fullName} por WhatsApp`}
                                >
                                  <MessageCircle className="w-3 h-3" />
                                  <span>{appt.phone}</span>
                                </a>

                                {appt.email && (
                                  <a
                                    href={`mailto:${appt.email}`}
                                    className="p-1 text-[#806B55] hover:text-[#171717] hover:bg-neutral-100 transition-colors"
                                    title={`Enviar correo a ${appt.email}`}
                                  >
                                    <Mail className="w-3.5 h-3.5" />
                                  </a>
                                )}
                              </div>
                            </td>

                            {/* Status Selector */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <select
                                value={appt.status}
                                disabled={updatingId === appt.id}
                                onChange={(e) =>
                                  handleStatusChange(
                                    appt.id,
                                    e.target.value as any
                                  )
                                }
                                className={`text-[10px] font-semibold uppercase px-2 py-1 border cursor-pointer focus:outline-none ${
                                  appt.status === 'confirmed'
                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                    : appt.status === 'completed'
                                    ? 'bg-blue-50 text-blue-800 border-blue-300'
                                    : appt.status === 'cancelled'
                                    ? 'bg-red-50 text-red-800 border-red-300'
                                    : 'bg-amber-50 text-amber-800 border-amber-300'
                                }`}
                              >
                                <option value="pending">Pendiente</option>
                                <option value="confirmed">Confirmada</option>
                                <option value="completed">Completada</option>
                                <option value="cancelled">Cancelada</option>
                              </select>
                            </td>

                            {/* Delete Action */}
                            <td className="py-3.5 px-4 text-right whitespace-nowrap">
                              <button
                                onClick={() => handleDelete(appt.id, appt.fullName)}
                                disabled={updatingId === appt.id}
                                className="p-1.5 text-neutral-400 hover:text-red-600 transition-colors"
                                title="Eliminar registro"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
