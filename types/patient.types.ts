export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
export type Severity = 'low' | 'medium' | 'critical';

export interface Patient {
  id: string;
  name: string;
  birth_date: string;
  blood_type: BloodType;
  weight_kg: number;
  height_cm: number;
  insurance?: string;
  created_at: string;
  updated_at: string;
}

export interface Allergy {
  id: string;
  patient_id: string;
  name: string;
  severity: Severity;
  reaction?: string;
}

export interface Medication {
  id: string;
  patient_id: string;
  name: string;
  dosage: string;
  frequency: string;
  notes?: string;
}

export interface Condition {
  id: string;
  patient_id: string;
  name: string;
  diagnosed_at?: string;
  notes?: string;
}

export interface EmergencyContact {
  id: string;
  patient_id: string;
  name: string;
  relationship: string;
  phone: string;
}

export interface NfcCard {
  id: string;
  patient_id: string;
  token: string;
  active: boolean;
  created_at: string;
  updated_at?: string;
  last_accessed?: string;
  access_count?: number;
  description?: string;
}

export interface CardAccessLog {
  id: string;
  card_id: string;
  ip_address: string;
  user_agent: string;
  accessed_at: string;
}

export interface PatientFullData {
  patient: Patient;
  allergies: Allergy[];
  medications: Medication[];
  conditions: Condition[];
  contacts: EmergencyContact[];
}
