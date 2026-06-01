'use client';

import { useState } from 'react';
import type { Patient, BloodType } from '../types/patient.types';

interface PatientInfoEditorProps {
  patient: Patient;
  onSave: (patient: Patient) => void;
}

const BLOOD_TYPES: BloodType[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export function PatientInfoEditor({ patient, onSave }: PatientInfoEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(patient);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'weight_kg' || name === 'height_cm' ? Number(value) : value,
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      onSave(formData);
      setIsEditing(false);
    } finally {
      setLoading(false);
    }
  };

  const getAge = (birthDate: string) => {
    const birthday = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birthday.getFullYear();
    const monthDiff = today.getMonth() - birthday.getMonth();
    const dayDiff = today.getDate() - birthday.getDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) age -= 1;
    return age;
  };

  const age = getAge(formData.birth_date);
  const bmi = (formData.weight_kg / ((formData.height_cm / 100) ** 2)).toFixed(1);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Informações Pessoais</h2>
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Nome completo *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Data de nascimento *
              </label>
              <input
                type="date"
                name="birth_date"
                value={formData.birth_date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Tipo sanguíneo *
              </label>
              <select
                name="blood_type"
                value={formData.blood_type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {BLOOD_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Peso (kg) *
              </label>
              <input
                type="number"
                name="weight_kg"
                value={formData.weight_kg}
                onChange={handleChange}
                step="0.1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Altura (cm) *
              </label>
              <input
                type="number"
                name="height_cm"
                value={formData.height_cm}
                onChange={handleChange}
                step="0.1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Seguro saúde
            </label>
            <input
              type="text"
              name="insurance"
              value={formData.insurance || ''}
              onChange={handleChange}
              placeholder="Ex: Unimed, Bradesco, etc."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
                setFormData(patient);
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-600">Nome</p>
            <p className="text-lg font-medium text-gray-900">{patient.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Idade</p>
            <p className="text-lg font-medium text-gray-900">{age} anos</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Tipo sanguíneo</p>
            <p className="text-lg font-medium text-gray-900">{patient.blood_type}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Peso</p>
            <p className="text-lg font-medium text-gray-900">{patient.weight_kg} kg</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Altura</p>
            <p className="text-lg font-medium text-gray-900">{patient.height_cm} cm</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">IMC</p>
            <p className="text-lg font-medium text-gray-900">{bmi}</p>
          </div>
          {patient.insurance && (
            <div>
              <p className="text-sm text-gray-600">Seguro saúde</p>
              <p className="text-lg font-medium text-gray-900">{patient.insurance}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
