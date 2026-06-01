-- Supabase Schema Setup
-- Execute these SQL commands in the Supabase SQL Editor

-- Create patients table
CREATE TABLE patients (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR NOT NULL,
  birth_date DATE NOT NULL,
  blood_type VARCHAR(3) NOT NULL,
  weight_kg DECIMAL(5, 2) NOT NULL,
  height_cm DECIMAL(5, 2) NOT NULL,
  insurance VARCHAR,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create nfc_cards table
CREATE TABLE nfc_cards (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id uuid NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  token VARCHAR UNIQUE NOT NULL,
  active BOOLEAN DEFAULT true,
  description VARCHAR DEFAULT '',
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  last_accessed TIMESTAMP,
  access_count INTEGER DEFAULT 0
);

-- Create allergies table
CREATE TABLE allergies (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id uuid NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  name VARCHAR NOT NULL,
  severity VARCHAR NOT NULL, -- 'low', 'medium', 'critical'
  reaction VARCHAR
);

-- Create medications table
CREATE TABLE medications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id uuid NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  name VARCHAR NOT NULL,
  dosage VARCHAR NOT NULL,
  frequency VARCHAR NOT NULL,
  notes VARCHAR
);

-- Create conditions table
CREATE TABLE conditions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id uuid NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  name VARCHAR NOT NULL,
  diagnosed_at DATE,
  notes VARCHAR
);

-- Create emergency_contacts table
CREATE TABLE emergency_contacts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id uuid NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  name VARCHAR NOT NULL,
  relationship VARCHAR NOT NULL,
  phone VARCHAR NOT NULL
);

-- Create indexes for better performance
CREATE INDEX idx_nfc_cards_token ON nfc_cards(token);
CREATE INDEX idx_nfc_cards_patient_id ON nfc_cards(patient_id);
CREATE INDEX idx_allergies_patient_id ON allergies(patient_id);
CREATE INDEX idx_medications_patient_id ON medications(patient_id);
CREATE INDEX idx_conditions_patient_id ON conditions(patient_id);
CREATE INDEX idx_emergency_contacts_patient_id ON emergency_contacts(patient_id);

-- Enable RLS (Row Level Security) if you want to add authentication later
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE nfc_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE allergies ENABLE ROW LEVEL SECURITY;
ALTER TABLE medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE conditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_contacts ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow all operations (for development - restrict in production)
CREATE POLICY "Enable all for development" ON patients FOR ALL USING (true);
CREATE POLICY "Enable all for development" ON nfc_cards FOR ALL USING (true);
CREATE POLICY "Enable all for development" ON allergies FOR ALL USING (true);
CREATE POLICY "Enable all for development" ON medications FOR ALL USING (true);
CREATE POLICY "Enable all for development" ON conditions FOR ALL USING (true);
CREATE POLICY "Enable all for development" ON emergency_contacts FOR ALL USING (true);
