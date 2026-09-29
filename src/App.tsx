/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import {
  doc,
  collection,
  onSnapshot,
  setDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { auth, db, loginWithGoogle, logoutUser, handleFirestoreError, OperationType } from './firebase';
import { SiteConfig, ServiceItem, Appointment, DEFAULT_EMPTY_SITE_CONFIG } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { AppointmentSection } from './components/AppointmentSection';
import { Footer } from './components/Footer';
import { ClientEditorDrawer } from './components/ClientEditorDrawer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { SlidersHorizontal, Eye, EyeOff } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_EMPTY_SITE_CONFIG);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [authReady, setAuthReady] = useState(false);

  // Monitor Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  // Listen to Site Configuration in Firestore
  useEffect(() => {
    const configDocRef = doc(db, 'sites', 'default');
    const unsubscribe = onSnapshot(
      configDocRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data() as Partial<SiteConfig>;
          setConfig({
            ...DEFAULT_EMPTY_SITE_CONFIG,
            ...data,
          });
        }
      },
      (error) => {
        console.warn('Site config read error:', error);
      }
    );

    return () => unsubscribe();
  }, []);

  // Listen to Services in Firestore
  useEffect(() => {
    const servicesColRef = collection(db, 'sites', 'default', 'services');
    const unsubscribe = onSnapshot(
      servicesColRef,
      (snapshot) => {
        const items: ServiceItem[] = [];
        snapshot.forEach((d) => {
          items.push({ id: d.id, ...(d.data() as Omit<ServiceItem, 'id'>) });
        });
        items.sort((a, b) => (a.order || 0) - (b.order || 0));
        setServices(items);
      },
      (error) => {
        console.warn('Services read error:', error);
      }
    );

    return () => unsubscribe();
  }, []);

  // Listen to Appointments (Only if authenticated, per PII security rules)
  useEffect(() => {
    if (!user) {
      setAppointments([]);
      return;
    }

    const apptsColRef = collection(db, 'appointments');
    const unsubscribe = onSnapshot(
      apptsColRef,
      (snapshot) => {
        const items: Appointment[] = [];
        snapshot.forEach((d) => {
          items.push({ id: d.id, ...(d.data() as Omit<Appointment, 'id'>) });
        });
        items.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setAppointments(items);
      },
      (error) => {
        console.warn('Appointments snapshot listener error:', error);
      }
    );

    return () => unsubscribe();
  }, [user]);

  // Save Site Configuration
  const handleSaveConfig = async (updatedConfig: SiteConfig) => {
    setIsSaving(true);
    const path = 'sites/default';
    try {
      const payload: SiteConfig = {
        ...updatedConfig,
        updatedAt: new Date().toISOString(),
        ...(user?.uid ? { updatedBy: user.uid } : {}),
      };

      await setDoc(doc(db, 'sites', 'default'), payload, { merge: true });
      setConfig(payload);
    } catch (error) {
      console.error('Error saving site config:', error);
      try {
        handleFirestoreError(error, OperationType.WRITE, path);
      } catch (err) {
        alert('Could not save configuration. If required, please sign in first.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  // Add Service
  const handleAddService = async (newService: Omit<ServiceItem, 'id'>) => {
    const serviceDocRef = doc(collection(db, 'sites', 'default', 'services'));
    const path = `sites/default/services/${serviceDocRef.id}`;
    try {
      await setDoc(serviceDocRef, newService);
    } catch (error) {
      console.error('Error adding service:', error);
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  };

  // Delete Service
  const handleDeleteService = async (serviceId: string) => {
    const path = `sites/default/services/${serviceId}`;
    try {
      await deleteDoc(doc(db, 'sites', 'default', 'services', serviceId));
    } catch (error) {
      console.error('Error deleting service:', error);
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  // Update Appointment Status
  const handleUpdateAppointmentStatus = async (
    appointmentId: string,
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  ) => {
    const path = `appointments/${appointmentId}`;
    try {
      await updateDoc(doc(db, 'appointments', appointmentId), { status });
    } catch (error) {
      console.error('Error updating appointment:', error);
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#171717] antialiased selection:bg-[#F2E4D5]">
      
      {/* Top Header */}
      <Header
        config={config}
        user={user}
        onOpenEditor={() => setIsEditorOpen(true)}
        onLogin={loginWithGoogle}
        onLogout={logoutUser}
        isEditMode={isEditMode}
        onToggleEditMode={() => setIsEditMode(!isEditMode)}
      />

      {/* Main Website Sections */}
      <main className="flex-1">
        <HeroSection
          config={config}
          onOpenEditor={() => setIsEditorOpen(true)}
          isEditMode={isEditMode}
        />

        <ServicesSection
          services={services}
          onOpenEditor={() => setIsEditorOpen(true)}
          isEditMode={isEditMode}
        />

        <AboutSection
          config={config}
          onOpenEditor={() => setIsEditorOpen(true)}
          isEditMode={isEditMode}
        />

        <AppointmentSection
          config={config}
          services={services}
        />
      </main>

      {/* Footer */}
      <Footer
        config={config}
        onOpenEditor={() => setIsEditorOpen(true)}
      />

      {/* Client Information Management Drawer */}
      <ClientEditorDrawer
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        config={config}
        services={services}
        appointments={appointments}
        user={user}
        onSaveConfig={handleSaveConfig}
        onAddService={handleAddService}
        onDeleteService={handleDeleteService}
        onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
        onLogin={loginWithGoogle}
        onLogout={logoutUser}
        isSaving={isSaving}
      />

      {/* Floating Real WhatsApp Action (Bottom Right) */}
      <FloatingWhatsApp
        whatsappUrl={config.whatsappUrl}
        phone={config.phone}
      />

      {/* Floating Mode & Editor Control Bar (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-30 flex items-center gap-2 bg-[#FFFFFF]/90 backdrop-blur-md p-1.5 border border-[#806B55]/25 shadow-lg">
        <button
          onClick={() => setIsEditMode(!isEditMode)}
          className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
            isEditMode
              ? 'bg-[#806B55] text-white'
              : 'bg-[#FAF7F2] text-[#806B55] hover:bg-[#F2E4D5]'
          }`}
          title="Toggle editing hints and guidance"
        >
          {isEditMode ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          <span>{isEditMode ? 'Editor Mode' : 'Clean Preview'}</span>
        </button>

        <button
          onClick={() => setIsEditorOpen(true)}
          className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#806B55] bg-white border border-[#806B55]/30 hover:border-[#806B55] transition-colors flex items-center gap-1.5"
          title="Open Information Console"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Practice Data</span>
        </button>
      </div>

    </div>
  );
}
