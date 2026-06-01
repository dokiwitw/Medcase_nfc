import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import type { PatientFullData } from '../../../types/patient.types';
import { AllergyCard } from '../../../components/AllergyCard';
import { ConditionList } from '../../../components/ConditionList';
import { InfoGrid } from '../../../components/InfoGrid';
import { MedicationList } from '../../../components/MedicationList';
import { EmergencyContactRow } from '../../../components/EmergencyContactRow';

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

function getAge(birthDate: string) {
  const birthday = new Date(birthDate);
  const today = new Date();

  let age = today.getFullYear() - birthday.getFullYear();
  const monthDiff = today.getMonth() - birthday.getMonth();
  const dayDiff = today.getDate() - birthday.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age -= 1;
  }

  return age;
}

async function fetchCardData(token: string) {
  try {
    const response = await fetch(`http://localhost:3000/api/cards?token=${token}`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar cartão:', error);
    return null;
  }
}

async function fetchFullPatientData(patientId: string): Promise<PatientFullData | null> {
  try {
    const response = await fetch(`http://localhost:3000/api/patients?patient_id=${patientId}`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar dados do paciente:', error);
    return null;
  }
}

async function recordAccess(token: string) {
  const headersList = headers();
  const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';
  const userAgent = headersList.get('user-agent') || 'unknown';

  console.log('Acesso registrado:', { token, ip, userAgent });
}

export default async function EmergencyCardPage({ params }: { params: { token: string } }) {
  const card = await fetchCardData(params.token);

  if (!card || !card.active) {
    notFound();
  }

  const patientData = await fetchFullPatientData(card.patient_id);
  
  if (!patientData) {
    notFound();
  }

  await recordAccess(params.token);

  const { patient, allergies, medications, conditions, contacts } = patientData;

  return (
    <main className="mx-auto max-w-4xl px-6 py-8">
      <div className="space-y-6">
        <header className="rounded-3xl bg-white p-6 shadow-sm border border-gray-100">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-600 text-3xl font-bold text-white">
                {getInitials(patient.name)}
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-gray-500">Cartão de emergência</p>
                <h1 className="mt-2 text-3xl font-semibold text-gray-900">{patient.name}</h1>
                <p className="mt-1 text-sm text-gray-600">{getAge(patient.birth_date)} anos • {patient.blood_type}</p>
              </div>
            </div>
          </div>
        </header>

        <AllergyCard allergies={allergies} />
        <InfoGrid patient={patient} />
        <ConditionList conditions={conditions} />
        <MedicationList medications={medications} />

        <section className="space-y-4 rounded-3xl bg-white p-5 shadow-sm border border-gray-100">
          <div className="mb-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">Contatos de emergência</p>
          </div>
          <div className="space-y-4">
            {contacts.map((contact) => (
              <EmergencyContactRow key={contact.id} contact={contact} />
            ))}
          </div>
        </section>

        <footer className="rounded-3xl bg-gray-50 p-5 text-center text-sm text-gray-600">
          Última atualização: {new Date(patient.updated_at).toLocaleDateString('pt-BR')}
        </footer>
      </div>
    </main>
  );
}
