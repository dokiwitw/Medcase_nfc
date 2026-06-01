'use client';

import { useState } from 'react';
import type { Allergy, Severity } from '../types/patient.types';

interface AllergyListEditorProps {
  allergies: Allergy[];
  onSave: (allergies: Allergy[]) => void;
}

const SEVERITIES: Severity[] = ['low', 'medium', 'critical'];
const SEVERITY_LABELS: Record<Severity, string> = {
  low: 'Baixa',
  medium: 'Média',
  critical: 'Crítica',
};
const SEVERITY_COLORS: Record<Severity, string> = {
  low: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  medium: 'bg-orange-100 text-orange-800 border-orange-300',
  critical: 'bg-red-100 text-red-800 border-red-300',
};

export function AllergyListEditor({ allergies, onSave }: AllergyListEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [items, setItems] = useState<Allergy[]>(allergies);
  const [newAllergy, setNewAllergy] = useState({ name: '', severity: 'medium' as Severity });
  const [loading, setLoading] = useState(false);

  const handleAddAllergy = () => {
    if (!newAllergy.name.trim()) return;
    const allergy: Allergy = {
      id: Math.random().toString(36).substring(7),
      patient_id: items[0]?.patient_id || '123',
      name: newAllergy.name,
      severity: newAllergy.severity,
    };
    setItems([...items, allergy]);
    setNewAllergy({ name: '', severity: 'medium' });
  };

  const handleRemoveAllergy = (id: string) => {
    setItems(items.filter((a) => a.id !== id));
  };

  const handleSaveSeverity = (id: string, severity: Severity) => {
    setItems(
      items.map((a) => (a.id === id ? { ...a, severity } : a))
    );
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      onSave(items);
      setIsEditing(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Alergias</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            Editar
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newAllergy.name}
              onChange={(e) => setNewAllergy({ ...newAllergy, name: e.target.value })}
              placeholder="Nome da alergia"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => e.key === 'Enter' && handleAddAllergy()}
            />
            <select
              value={newAllergy.severity}
              onChange={(e) =>
                setNewAllergy({ ...newAllergy, severity: e.target.value as Severity })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {SEVERITIES.map((s) => (
                <option key={s} value={s}>
                  {SEVERITY_LABELS[s]}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddAllergy}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              + Adicionar
            </button>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {items.length === 0 ? (
              <p className="text-gray-500 text-sm">Nenhuma alergia registrada</p>
            ) : (
              items.map((allergy) => (
                <div
                  key={allergy.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{allergy.name}</p>
                  </div>
                  <select
                    value={allergy.severity}
                    onChange={(e) => handleSaveSeverity(allergy.id, e.target.value as Severity)}
                    className={`px-2 py-1 text-sm rounded border ${SEVERITY_COLORS[allergy.severity]} mr-3`}
                  >
                    {SEVERITIES.map((s) => (
                      <option key={s} value={s}>
                        {SEVERITY_LABELS[s]}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleRemoveAllergy(allergy.id)}
                    className="text-red-600 hover:text-red-700 font-medium text-sm"
                  >
                    Remover
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors"
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
            <button
              onClick={() => {
                setItems(allergies);
                setIsEditing(false);
              }}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {allergies.length === 0 ? (
            <p className="text-gray-500">Nenhuma alergia registrada</p>
          ) : (
            allergies.map((allergy) => (
              <div
                key={allergy.id}
                className={`p-3 rounded-lg border ${SEVERITY_COLORS[allergy.severity]}`}
              >
                <p className="font-medium">{allergy.name}</p>
                <p className="text-xs opacity-75">
                  Severidade: {SEVERITY_LABELS[allergy.severity]}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
