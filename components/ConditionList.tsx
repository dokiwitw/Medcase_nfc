import type { Condition } from '../types/patient.types';

export function ConditionList({ conditions }: { conditions: Condition[] }) {
  if (!conditions || conditions.length === 0) {
    return (
      <section className="rounded-3xl bg-white p-5 shadow-sm border border-gray-100">
        <p className="text-sm text-gray-600">Nenhuma condição pré-existente registrada.</p>
      </section>
    );
  }

  return (
    <section className="rounded-3xl bg-white p-5 shadow-sm border border-gray-100">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">Condições pré-existentes</p>
      </div>
      <div className="space-y-3">
        {conditions.map((condition) => (
          <div key={condition.id} className="rounded-3xl border border-gray-100 bg-gray-50 p-4">
            <p className="font-semibold text-gray-900">{condition.name}</p>
            <p className="mt-1 text-sm text-gray-600">Diagnóstico: {condition.diagnosed_at ?? 'Não informado'}</p>
            {condition.notes ? <p className="mt-2 text-sm text-gray-600">{condition.notes}</p> : null}
          </div>
        ))}
      </div>
    </section>
  );
}
