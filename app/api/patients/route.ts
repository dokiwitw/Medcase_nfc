import { NextResponse } from 'next/server';
import { getFullPatientData, getAllPatients, createPatient, updatePatient, deletePatient } from '@/lib/mockdb';
import type { Patient } from '@/types/patient.types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const patientId = searchParams.get('patient_id');

  try {
    if (patientId) {
      // Get specific patient's full data
      const patientData = await getFullPatientData(patientId);
      if (!patientData) {
        return NextResponse.json(
          { error: 'Paciente não encontrado' },
          { status: 404 }
        );
      }
      return NextResponse.json(patientData, { status: 200 });
    }

    // Get all patients
    const patients = await getAllPatients();
    return NextResponse.json(patients, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar pacientes:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar pacientes' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as Omit<Patient, 'id' | 'created_at' | 'updated_at'>;

    // Validação básica
    if (!body.name || !body.birth_date || !body.blood_type || !body.weight_kg || !body.height_cm) {
      return NextResponse.json(
        { error: 'Campos obrigatórios faltando: name, birth_date, blood_type, weight_kg, height_cm' },
        { status: 400 }
      );
    }

    const newPatient = await createPatient(body);
    return NextResponse.json(newPatient, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar paciente:', error);
    return NextResponse.json(
      { error: 'Erro ao criar paciente' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const patientId = searchParams.get('patient_id');

    if (!patientId) {
      return NextResponse.json(
        { error: 'patient_id é obrigatório' },
        { status: 400 }
      );
    }

    const body = await request.json() as Partial<Patient>;
    const updatedPatient = await updatePatient(patientId, body);

    if (!updatedPatient) {
      return NextResponse.json(
        { error: 'Paciente não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedPatient, { status: 200 });
  } catch (error) {
    console.error('Erro ao atualizar paciente:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar paciente' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const patientId = searchParams.get('patient_id');

    if (!patientId) {
      return NextResponse.json(
        { error: 'patient_id é obrigatório' },
        { status: 400 }
      );
    }

    const success = await deletePatient(patientId);
    if (!success) {
      return NextResponse.json(
        { error: 'Paciente não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Erro ao deletar paciente:', error);
    return NextResponse.json(
      { error: 'Erro ao deletar paciente' },
      { status: 500 }
    );
  }
}