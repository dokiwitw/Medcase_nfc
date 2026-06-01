/**
 * Supabase database integration
 * Replaces previous mock database
 */

import type { NfcCard, Patient, Allergy, Medication, Condition, EmergencyContact, PatientFullData } from '@/types/patient.types';
import { generateCardToken } from './token';
import { supabase } from './db';

// ============= CARD OPERATIONS =============

export async function getAllCards(): Promise<NfcCard[]> {
  const { data, error } = await supabase
    .from('nfc_cards')
    .select('*');

  if (error) {
    console.error('Erro ao buscar cartões:', error);
    return [];
  }

  return data || [];
}

export async function getCardByToken(token: string): Promise<NfcCard | null> {
  const { data, error } = await supabase
    .from('nfc_cards')
    .select('*')
    .eq('token', token)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Erro ao buscar cartão por token:', error);
  }

  return data || null;
}

export async function createCard(patientId: string, description?: string): Promise<NfcCard> {
  const newCard = {
    patient_id: patientId,
    token: generateCardToken(),
    active: true,
    description: description || '',
  };

  const { data, error } = await supabase
    .from('nfc_cards')
    .insert([newCard])
    .select()
    .single();

  if (error) {
    console.error('Erro ao criar cartão:', error);
    throw error;
  }

  return data;
}

export async function updateCard(id: string, updates: Partial<NfcCard>): Promise<NfcCard | null> {
  const { data, error } = await supabase
    .from('nfc_cards')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Erro ao atualizar cartão:', error);
  }

  return data || null;
}

export async function deleteCard(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('nfc_cards')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Erro ao deletar cartão:', error);
    return false;
  }

  return true;
}

// ============= PATIENT OPERATIONS =============

export async function getPatient(id: string): Promise<Patient | null> {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .eq('id', id)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Erro ao buscar paciente:', error);
  }

  return data || null;
}

export async function getAllPatients(): Promise<Patient[]> {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar pacientes:', error);
    return [];
  }

  return data || [];
}

export async function createPatient(patient: Omit<Patient, 'id' | 'created_at' | 'updated_at'>): Promise<Patient> {
  const newPatient = {
    ...patient,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('patients')
    .insert([newPatient])
    .select()
    .single();

  if (error) {
    console.error('Erro ao criar paciente:', error);
    throw error;
  }

  return data;
}

export async function updatePatient(id: string, updates: Partial<Patient>): Promise<Patient | null> {
  const { data, error } = await supabase
    .from('patients')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Erro ao atualizar paciente:', error);
  }

  return data || null;
}

export async function deletePatient(id: string): Promise<boolean> {
  try {
    // Delete patient and all associated data
    // This relies on CASCADE DELETE in the database, but we'll also do explicit deletes for safety
    
    // Delete cards
    await supabase.from('nfc_cards').delete().eq('patient_id', id);
    
    // Delete allergies
    await supabase.from('allergies').delete().eq('patient_id', id);
    
    // Delete medications
    await supabase.from('medications').delete().eq('patient_id', id);
    
    // Delete conditions
    await supabase.from('conditions').delete().eq('patient_id', id);
    
    // Delete emergency contacts
    await supabase.from('emergency_contacts').delete().eq('patient_id', id);
    
    // Delete patient
    const { error } = await supabase
      .from('patients')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erro ao deletar paciente:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erro ao deletar paciente:', error);
    return false;
  }
}

// ============= FULL PATIENT DATA =============

export async function getFullPatientData(patientId: string): Promise<PatientFullData | null> {
  const patient = await getPatient(patientId);
  if (!patient) return null;

  const [allergies, medications, conditions, contacts] = await Promise.all([
    getAllergies(patientId),
    getMedications(patientId),
    getConditions(patientId),
    getContacts(patientId),
  ]);

  return {
    patient,
    allergies,
    medications,
    conditions,
    contacts,
  };
}

// ============= ALLERGY OPERATIONS =============

async function getAllergies(patientId: string): Promise<Allergy[]> {
  const { data, error } = await supabase
    .from('allergies')
    .select('*')
    .eq('patient_id', patientId);

  if (error) {
    console.error('Erro ao buscar alergias:', error);
    return [];
  }

  return data || [];
}

export async function addAllergy(allergy: Omit<Allergy, 'id'>): Promise<Allergy> {
  const { data, error } = await supabase
    .from('allergies')
    .insert([allergy])
    .select()
    .single();

  if (error) {
    console.error('Erro ao adicionar alergia:', error);
    throw error;
  }

  return data;
}

export async function updateAllergy(id: string, updates: Partial<Allergy>): Promise<Allergy | null> {
  const { data, error } = await supabase
    .from('allergies')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Erro ao atualizar alergia:', error);
  }

  return data || null;
}

export async function deleteAllergy(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('allergies')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Erro ao deletar alergia:', error);
    return false;
  }

  return true;
}

// ============= MEDICATION OPERATIONS =============

async function getMedications(patientId: string): Promise<Medication[]> {
  const { data, error } = await supabase
    .from('medications')
    .select('*')
    .eq('patient_id', patientId);

  if (error) {
    console.error('Erro ao buscar medicamentos:', error);
    return [];
  }

  return data || [];
}

export async function addMedication(medication: Omit<Medication, 'id'>): Promise<Medication> {
  const { data, error } = await supabase
    .from('medications')
    .insert([medication])
    .select()
    .single();

  if (error) {
    console.error('Erro ao adicionar medicamento:', error);
    throw error;
  }

  return data;
}

export async function updateMedication(id: string, updates: Partial<Medication>): Promise<Medication | null> {
  const { data, error } = await supabase
    .from('medications')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Erro ao atualizar medicamento:', error);
  }

  return data || null;
}

export async function deleteMedication(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('medications')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Erro ao deletar medicamento:', error);
    return false;
  }

  return true;
}

// ============= CONDITION OPERATIONS =============

async function getConditions(patientId: string): Promise<Condition[]> {
  const { data, error } = await supabase
    .from('conditions')
    .select('*')
    .eq('patient_id', patientId);

  if (error) {
    console.error('Erro ao buscar condições:', error);
    return [];
  }

  return data || [];
}

export async function addCondition(condition: Omit<Condition, 'id'>): Promise<Condition> {
  const { data, error } = await supabase
    .from('conditions')
    .insert([condition])
    .select()
    .single();

  if (error) {
    console.error('Erro ao adicionar condição:', error);
    throw error;
  }

  return data;
}

export async function updateCondition(id: string, updates: Partial<Condition>): Promise<Condition | null> {
  const { data, error } = await supabase
    .from('conditions')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Erro ao atualizar condição:', error);
  }

  return data || null;
}

export async function deleteCondition(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('conditions')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Erro ao deletar condição:', error);
    return false;
  }

  return true;
}

// ============= EMERGENCY CONTACT OPERATIONS =============

async function getContacts(patientId: string): Promise<EmergencyContact[]> {
  const { data, error } = await supabase
    .from('emergency_contacts')
    .select('*')
    .eq('patient_id', patientId);

  if (error) {
    console.error('Erro ao buscar contatos de emergência:', error);
    return [];
  }

  return data || [];
}

export async function addContact(contact: Omit<EmergencyContact, 'id'>): Promise<EmergencyContact> {
  const { data, error } = await supabase
    .from('emergency_contacts')
    .insert([contact])
    .select()
    .single();

  if (error) {
    console.error('Erro ao adicionar contato:', error);
    throw error;
  }

  return data;
}

export async function updateContact(id: string, updates: Partial<EmergencyContact>): Promise<EmergencyContact | null> {
  const { data, error } = await supabase
    .from('emergency_contacts')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Erro ao atualizar contato:', error);
  }

  return data || null;
}

export async function deleteContact(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('emergency_contacts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Erro ao deletar contato:', error);
    return false;
  }

  return true;
}
