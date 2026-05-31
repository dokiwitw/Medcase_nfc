import type { Medication } from '../types/patient.types';

export function MedicationList({ medications }: { medications: Medication[] }) {
  if (!medications || medications.length === 0) {
    return (
      <section className="rounded-3xl bg-white p-5 shadow-sm border border-gray-100">
        <p className="text-sm text-gray-600">Nenhum medicamento registrado.</p>
      </section>
    );
  }

  return (
    <section className="rounded-3xl bg-white p-5 shadow-sm border border-gray-100">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">Medicamentos</p>
      </div>
      <div className="space-y-3">
        {medications.map((medication) => (
          <div key={medication.id} className="rounded-3xl border border-gray-100 bg-gray-50 p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-semibold text-gray-900">{medication.name}</p>
              <p className="text-sm text-gray-600">{medication.dosage}</p>
            </div>
            <p className="mt-2 text-sm text-gray-600">{medication.frequency}</p>
            {medication.notes ? <p className="mt-2 text-sm text-gray-600">{medication.notes}</p> : null}
          </div>
        ))}
      </div>
    </section>
  );
}
