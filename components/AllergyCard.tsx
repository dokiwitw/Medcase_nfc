import type { Allergy } from '../types/patient.types';

const colorMap = {
  critical: {
    container: 'bg-red-50 border-red-200 text-red-700',
    pill: 'bg-red-100 text-red-800 border-red-200',
  },
  medium: {
    container: 'bg-orange-50 border-orange-200 text-orange-800',
    pill: 'bg-orange-100 text-orange-800 border-orange-200',
  },
  low: {
    container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    pill: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  },
};

function getPrioritySeverity(allergies: Allergy[]) {
  if (allergies.some((item) => item.severity === 'critical')) return 'critical';
  if (allergies.some((item) => item.severity === 'medium')) return 'medium';
  return 'low';
}

export function AllergyCard({ allergies }: { allergies: Allergy[] }) {
  if (!allergies || allergies.length === 0) return null;

  const severity = getPrioritySeverity(allergies);
  const palette = colorMap[severity];

  return (
    <section className={`rounded-3xl border p-5 ${palette.container} shadow-sm`}>
      <div className="mb-4 flex items-center gap-3">
        <span className="text-2xl">⚠</span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em]">Alergias críticas</p>
          <p className="text-sm text-gray-700">Prioridade máxima para equipe de emergência</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {allergies.map((allergy) => (
          <span
            key={allergy.id}
            className={`rounded-full border px-3 py-1 text-sm font-medium ${palette.pill}`}
          >
            {allergy.name}
          </span>
        ))}
      </div>
    </section>
  );
}
