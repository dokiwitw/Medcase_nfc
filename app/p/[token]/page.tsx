import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import type { PatientFullData } from '../../../types/patient.types';
import { AllergyCard } from '../../../components/AllergyCard';
import { ConditionList } from '../../../components/ConditionList';
import { InfoGrid } from '../../../components/InfoGrid';
import { MedicationList } from '../../../components/MedicationList';
import { EmergencyContactRow } from '../../../components/EmergencyContactRow';

const MOCK_PATIENT: PatientFullData = {
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
};

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
  // TODO: substitua este mock por consulta ao Supabase usando lib/db.ts.
  if (token === 'invalid') {
    return null;
  }

  return {
    token,
    active: true,
    patient_id: '123',
  };
}

async function fetchFullPatientData() {
  // TODO: substitua pelo fetch de dados reais do Supabase em paralelo.
  return MOCK_PATIENT;
}

async function recordAccess(token: string) {
  const headersList = headers();
  const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';
  const userAgent = headersList.get('user-agent') || 'unknown';

  // TODO: registre em access_logs no Supabase usando lib/db.ts.
  console.log('Acesso registrado:', { token, ip, userAgent });
}

export default async function EmergencyCardPage({ params }: { params: { token: string } }) {
  const card = await fetchCardData(params.token);

  if (!card || !card.active) {
    notFound();
  }

  const [patientData] = await Promise.all([fetchFullPatientData(), recordAccess(params.token)]);

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
