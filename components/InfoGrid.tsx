import type { Patient } from '../types/patient.types';

export function InfoGrid({ patient }: { patient: Patient }) {
  return (
    <section className="grid gap-4 rounded-3xl bg-white p-5 shadow-sm border border-gray-100 sm:grid-cols-2">
      <div className="rounded-2xl bg-gray-50 p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-gray-500">Tipo sanguíneo</p>
        <p className="mt-2 text-2xl font-semibold text-gray-900">{patient.blood_type}</p>
      </div>
      <div className="rounded-2xl bg-gray-50 p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-gray-500">Peso</p>
        <p className="mt-2 text-2xl font-semibold text-gray-900">{patient.weight_kg} kg</p>
      </div>
      <div className="rounded-2xl bg-gray-50 p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-gray-500">Altura</p>
        <p className="mt-2 text-2xl font-semibold text-gray-900">{patient.height_cm} cm</p>
      </div>
      <div className="rounded-2xl bg-gray-50 p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-gray-500">Convênio</p>
        <p className="mt-2 text-2xl font-semibold text-gray-900">{patient.insurance ?? 'Não informado'}</p>
      </div>
    </section>
  );
}
