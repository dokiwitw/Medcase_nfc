import { NextResponse } from 'next/server';
import type { Patient, Allergy, Medication, Condition, EmergencyContact, PatientFullData } from '../../../types/patient.types';

// TODO: Substituir por dados reais do Supabase quando o banco estiver configurado
const MOCK_PATIENTS: Map<string, PatientFullData> = new Map([
  ['123', {
    patient: {
      id: '123',
      name: 'Carlos Ribeiro',
      birth_date: '1982-07-15',
      blood_type: 'O+',
      weight_kg: 82,
      height_cm: 176,
      insurance: 'Unimed',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    allergies: [
      { id: '1', patient_id: '123', name: 'Penicilina', severity: 'critical' },
      { id: '2', patient_id: '123', name: 'Dipirona', severity: 'critical' },
      { id: '3', patient_id: '123', name: 'Látex', severity: 'medium' },
    ],
    medications: [
      { id: '1', patient_id: '123', name: 'Metformina', dosage: '850mg', frequency: '2x ao dia' },
      { id: '2', patient_id: '123', name: 'Losartana', dosage: '50mg', frequency: '1x ao dia — manhã' },
    ],
    conditions: [
      { id: '1', patient_id: '123', name: 'Diabetes tipo 2', diagnosed_at: '2018-03-10' },
      { id: '2', patient_id: '123', name: 'Hipertensão arterial', diagnosed_at: '2020-06-22' },
    ],
    contacts: [
      { id: '1', patient_id: '123', name: 'Maria Ribeiro', relationship: 'Esposa', phone: '(11) 98765-4321' },
      { id: '2', patient_id: '123', name: 'Dr. Paulo Souza', relationship: 'Cardiologista', phone: '(11) 3456-7890' },
    ],
  }],
]);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const patientId = searchParams.get('id') || '123'; // Default para mock

  const patientData = MOCK_PATIENTS.get(patientId);
  if (!patientData) {
    return NextResponse.json(
      { error: 'Paciente não encontrado' },
      { status: 404 }
    );
  }

  return NextResponse.json(patientData, { status: 200 });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.name !== 'string' || typeof body.birth_date !== 'string') {
    return NextResponse.json({ error: 'Campos inválidos. name e birth_date são obrigatórios.' }, { status: 400 });
  }

  // TODO: implemente cadastro real no Supabase.
  return NextResponse.json({ message: 'Paciente criado (mock)', patient: body }, { status: 201 });
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'id do paciente é obrigatório' },
        { status: 400 }
      );
    }

    const patientData = MOCK_PATIENTS.get(id);
    if (!patientData) {
      return NextResponse.json(
        { error: 'Paciente não encontrado' },
        { status: 404 }
      );
    }

    // TODO: Atualizar no banco de dados do Supabase

    let updated: PatientFullData = { ...patientData };

    // Atualizar informações do paciente
    if (updateData.patient) {
      updated.patient = {
        ...patientData.patient,
        ...updateData.patient,
        updated_at: new Date().toISOString(),
      };
    }

    // Atualizar alergias
    if (updateData.allergies) {
      updated.allergies = updateData.allergies;
    }

    // Atualizar medicações
    if (updateData.medications) {
      updated.medications = updateData.medications;
    }

    // Atualizar condições
    if (updateData.conditions) {
      updated.conditions = updateData.conditions;
    }

    // Atualizar contatos de emergência
    if (updateData.contacts) {
      updated.contacts = updateData.contacts;
    }

    MOCK_PATIENTS.set(id, updated);

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error('Erro ao atualizar paciente:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar paciente' },
      { status: 500 }
    );
  }
}

