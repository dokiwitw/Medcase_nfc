import type { EmergencyContact } from '../types/patient.types';

export function EmergencyContactRow({ contact }: { contact: EmergencyContact }) {
  const phoneValue = contact.phone.replace(/[^0-9+]/g, '');

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-semibold text-gray-900">{contact.name}</p>
          <p className="text-sm text-gray-600">{contact.relationship}</p>
          <p className="mt-1 text-sm text-gray-600">{contact.phone}</p>
        </div>
        <a
          href={`tel:${phoneValue}`}
          className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Ligar agora
        </a>
      </div>
    </div>
  );
}
