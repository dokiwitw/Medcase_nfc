'use client';

import { useState } from 'react';
import type { Medication } from '../types/patient.types';

interface MedicationListEditorProps {
  medications: Medication[];
  onSave: (medications: Medication[]) => void;
}

export function MedicationListEditor({ medications, onSave }: MedicationListEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [items, setItems] = useState<Medication[]>(medications);
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    frequency: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);

  const handleAddMedication = () => {
    if (!newMedication.name.trim() || !newMedication.dosage.trim() || !newMedication.frequency.trim()) {
      alert('Preencha nome, dosagem e frequência');
      return;
    }
    const medication: Medication = {
      id: Math.random().toString(36).substring(7),
      patient_id: items[0]?.patient_id || '123',
      name: newMedication.name,
      dosage: newMedication.dosage,
      frequency: newMedication.frequency,
      notes: newMedication.notes || undefined,
    };
    setItems([...items, medication]);
    setNewMedication({ name: '', dosage: '', frequency: '', notes: '' });
  };

  const handleRemoveMedication = (id: string) => {
    setItems(items.filter((m) => m.id !== id));
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
        <h2 className="text-2xl font-bold text-gray-900">Medicações</h2>
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
          <div className="space-y-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Nome da medicação *
              </label>
              <input
                type="text"
                value={newMedication.name}
                onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
                placeholder="Ex: Metformina"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Dosagem *
                </label>
                <input
                  type="text"
                  value={newMedication.dosage}
                  onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
                  placeholder="Ex: 850mg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Frequência *
                </label>
                <input
                  type="text"
                  value={newMedication.frequency}
                  onChange={(e) => setNewMedication({ ...newMedication, frequency: e.target.value })}
                  placeholder="Ex: 2x ao dia"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Observações
              </label>
              <input
                type="text"
                value={newMedication.notes}
                onChange={(e) => setNewMedication({ ...newMedication, notes: e.target.value })}
                placeholder="Ex: Tomar com comida"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleAddMedication}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              + Adicionar Medicação
            </button>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {items.length === 0 ? (
              <p className="text-gray-500 text-sm">Nenhuma medicação registrada</p>
            ) : (
              items.map((medication) => (
                <div
                  key={medication.id}
                  className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{medication.name}</p>
                      <p className="text-sm text-gray-600">
                        {medication.dosage} • {medication.frequency}
                      </p>
                      {medication.notes && (
                        <p className="text-xs text-gray-500 mt-1">{medication.notes}</p>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemoveMedication(medication.id)}
                      className="text-red-600 hover:text-red-700 font-medium text-sm"
                    >
                      Remover
                    </button>
                  </div>
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
                setItems(medications);
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
        <div className="space-y-3">
          {medications.length === 0 ? (
            <p className="text-gray-500">Nenhuma medicação registrada</p>
          ) : (
            medications.map((medication) => (
              <div key={medication.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="font-medium text-gray-900">{medication.name}</p>
                <p className="text-sm text-gray-600">
                  {medication.dosage} • {medication.frequency}
                </p>
                {medication.notes && (
                  <p className="text-xs text-gray-500 mt-1">{medication.notes}</p>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
