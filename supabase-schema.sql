-- ========================================================
-- Freya Academy - Supabase PostgreSQL Database Schema
-- Run this script in your Supabase Dashboard -> SQL Editor
-- ========================================================

-- 1. APPOINTMENTS TABLE (Course applications & online bookings)
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  medical_specialty TEXT NOT NULL,
  preferred_date TEXT,
  service TEXT NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Allow anonymous visitors to submit bookings
DROP POLICY IF EXISTS "Allow public booking insert" ON public.appointments;
CREATE POLICY "Allow public booking insert" ON public.appointments
  FOR INSERT WITH CHECK (true);

-- Allow reading appointments (for admin review)
DROP POLICY IF EXISTS "Allow select appointments" ON public.appointments;
CREATE POLICY "Allow select appointments" ON public.appointments
  FOR SELECT USING (true);


-- 2. SERVICES TABLE (Official Medical Courses)
CREATE TABLE IF NOT EXISTS public.services (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  image_url TEXT,
  cta_text TEXT DEFAULT 'Ver Temario & Cupos',
  "order" INT DEFAULT 0,
  duration TEXT,
  modality TEXT DEFAULT 'Hands-On en Pacientes Reales',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read services" ON public.services;
CREATE POLICY "Allow public read services" ON public.services
  FOR SELECT USING (true);


-- 3. SITE CONFIG TABLE (Practice details, contact, social links)
CREATE TABLE IF NOT EXISTS public.site_config (
  id TEXT PRIMARY KEY DEFAULT 'default',
  business_name TEXT,
  tagline TEXT,
  business_description TEXT,
  hero_headline TEXT,
  hero_subheading TEXT,
  cta_text TEXT,
  hero_image_url TEXT,
  about_heading TEXT,
  about_description TEXT,
  about_image_url TEXT,
  email TEXT,
  phone TEXT,
  whatsapp TEXT,
  whatsapp_url TEXT,
  facebook_url TEXT,
  instagram_url TEXT,
  tiktok_url TEXT,
  address TEXT,
  opening_hours TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read site_config" ON public.site_config;
CREATE POLICY "Allow public read site_config" ON public.site_config
  FOR SELECT USING (true);


-- 4. Initial seed for site_config
INSERT INTO public.site_config (
  id, business_name, tagline, business_description,
  hero_headline, hero_subheading, cta_text,
  about_heading, about_description, email, phone, whatsapp,
  whatsapp_url, facebook_url, instagram_url, tiktok_url,
  address, opening_hours
) VALUES (
  'default',
  'Freya Academy',
  'El conocimiento de hoy será tu poder del mañana',
  'Formación práctica para médicos que buscan perfeccionar sus técnicas y elevar su práctica en Medicina Estética.',
  'Formación práctica para médicos que buscan perfeccionar sus técnicas y elevar su práctica en Medicina Estética.',
  'Metodología práctica hands-on y mentoría directa diseñada exclusivamente para médicos que desean dominar protocolos avanzados y transformar su consulta profesional.',
  'Conoce Freya',
  'Dra. Mónica Meneses',
  'Fundadora & Directora Académica de Freya Academy. Comprometida con la excelencia y la seguridad clínica, la Dra. Mónica Meneses lidera un programa de perfeccionamiento en Medicina Estética enfocado en destreza manual directa, análisis anatómico exhaustivo y aplicación rigurosa de técnicas de vanguardia.',
  'freyacademia@gmail.com',
  '+591 69831697',
  '+591 69831697',
  'https://api.whatsapp.com/send/?phone=59169831697&text=Hola%20Freya%20Academy%2C%20deseo%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20cursos%20m%C3%A9dicos',
  'https://www.facebook.com/freyaacademiabo',
  'https://www.instagram.com/freyaacademiabo',
  'https://www.tiktok.com/@freya.academia?_r=1&_t=ZS-9A3s4KR8RBk',
  'Edificio Vitruvio II, Piso 3, N° 7979, Calacoto, La Paz, Bolivia',
  'Lunes a Viernes: 09:00 - 18:00'
) ON CONFLICT (id) DO NOTHING;
