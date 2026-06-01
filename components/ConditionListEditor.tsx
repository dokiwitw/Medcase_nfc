'use client';

import { useState } from 'react';
import type { Condition } from '../types/patient.types';

interface ConditionListEditorProps {
  conditions: Condition[];
  onSave: (conditions: Condition[]) => void;
}

export function ConditionListEditor({ conditions, onSave }: ConditionListEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [items, setItems] = useState<Condition[]>(conditions);
  const [newCondition, setNewCondition] = useState({
    name: '',
    diagnosed_at: new Date().toISOString().split('T')[0],
    notes: '',
  });
  const [loading, setLoading] = useState(false);

  const handleAddCondition = () => {
    if (!newCondition.name.trim()) {
      alert('Preencha o nome da condição');
      return;
    }
    const condition: Condition = {
      id: Math.random().toString(36).substring(7),
      patient_id: items[0]?.patient_id || '123',
      name: newCondition.name,
      diagnosed_at: newCondition.diagnosed_at || undefined,
      notes: newCondition.notes || undefined,
    };
    setItems([...items, condition]);
    setNewCondition({
      name: '',
      diagnosed_at: new Date().toISOString().split('T')[0],
      notes: '',
    });
  };

  const handleRemoveCondition = (id: string) => {
    setItems(items.filter((c) => c.id !== id));
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

  const formatDate = (dateString?: string) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Condições Médicas</h2>
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
                Nome da condição *
              </label>
              <input
                type="text"
                value={newCondition.name}
                onChange={(e) => setNewCondition({ ...newCondition, name: e.target.value })}
                placeholder="Ex: Diabetes tipo 2"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Data de diagnóstico
                </label>
                <input
                  type="date"
                  value={newCondition.diagnosed_at}
                  onChange={(e) =>
                    setNewCondition({ ...newCondition, diagnosed_at: e.target.value })
                  }
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
                value={newCondition.notes}
                onChange={(e) => setNewCondition({ ...newCondition, notes: e.target.value })}
                placeholder="Ex: Controlada com medicação"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleAddCondition}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              + Adicionar Condição
            </button>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {items.length === 0 ? (
              <p className="text-gray-500 text-sm">Nenhuma condição registrada</p>
            ) : (
              items.map((condition) => (
                <div
                  key={condition.id}
                  className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{condition.name}</p>
                      <p className="text-sm text-gray-600">
                        Diagnosticado em: {formatDate(condition.diagnosed_at)}
                      </p>
                      {condition.notes && (
                        <p className="text-xs text-gray-500 mt-1">{condition.notes}</p>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemoveCondition(condition.id)}
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
                setItems(conditions);
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
          {conditions.length === 0 ? (
            <p className="text-gray-500">Nenhuma condição registrada</p>
          ) : (
            conditions.map((condition) => (
              <div key={condition.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="font-medium text-gray-900">{condition.name}</p>
                <p className="text-sm text-gray-600">
                  Diagnosticado em: {formatDate(condition.diagnosed_at)}
                </p>
                {condition.notes && (
                  <p className="text-xs text-gray-500 mt-1">{condition.notes}</p>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
