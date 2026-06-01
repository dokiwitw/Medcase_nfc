'use client';

import { useState } from 'react';
import type { EmergencyContact } from '../types/patient.types';

interface EmergencyContactListEditorProps {
  contacts: EmergencyContact[];
  onSave: (contacts: EmergencyContact[]) => void;
}

export function EmergencyContactListEditor({
  contacts,
  onSave,
}: EmergencyContactListEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [items, setItems] = useState<EmergencyContact[]>(contacts);
  const [newContact, setNewContact] = useState({
    name: '',
    relationship: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);

  const handleAddContact = () => {
    if (!newContact.name.trim() || !newContact.phone.trim()) {
      alert('Preencha nome e telefone');
      return;
    }
    const contact: EmergencyContact = {
      id: Math.random().toString(36).substring(7),
      patient_id: items[0]?.patient_id || '123',
      name: newContact.name,
      relationship: newContact.relationship || 'Não especificado',
      phone: newContact.phone,
    };
    setItems([...items, contact]);
    setNewContact({ name: '', relationship: '', phone: '' });
  };

  const handleRemoveContact = (id: string) => {
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

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Contatos de Emergência</h2>
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
                Nome *
              </label>
              <input
                type="text"
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                placeholder="Ex: Maria Ribeiro"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Relacionamento
                </label>
                <input
                  type="text"
                  value={newContact.relationship}
                  onChange={(e) =>
                    setNewContact({ ...newContact, relationship: e.target.value })
                  }
                  placeholder="Ex: Esposa, Filho, Médico"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Telefone *
                </label>
                <input
                  type="tel"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  placeholder="Ex: (11) 98765-4321"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              onClick={handleAddContact}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              + Adicionar Contato
            </button>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {items.length === 0 ? (
              <p className="text-gray-500 text-sm">Nenhum contato de emergência registrado</p>
            ) : (
              items.map((contact) => (
                <div
                  key={contact.id}
                  className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{contact.name}</p>
                      <p className="text-sm text-gray-600">{contact.relationship}</p>
                      <p className="text-sm text-gray-600 font-mono">{contact.phone}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveContact(contact.id)}
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
                setItems(contacts);
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
          {contacts.length === 0 ? (
            <p className="text-gray-500">Nenhum contato de emergência registrado</p>
          ) : (
            contacts.map((contact) => (
              <div
                key={contact.id}
                className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-start justify-between"
              >
                <div>
                  <p className="font-medium text-gray-900">{contact.name}</p>
                  <p className="text-sm text-gray-600">{contact.relationship}</p>
                  <p className="text-sm text-gray-600 font-mono">{contact.phone}</p>
                </div>
                <span className="text-red-500">📞</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
