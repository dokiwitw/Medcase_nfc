'use client';

import { useState } from 'react';
import type { Patient, BloodType } from '@/types/patient.types';

interface PatientFormProps {
  patient?: Patient;
  onSave: (data: Omit<Patient, 'id' | 'created_at' | 'updated_at'>) => void;
  onCancel: () => void;
}

const BLOOD_TYPES: BloodType[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function PatientForm({ patient, onSave, onCancel }: PatientFormProps) {
  const [formData, setFormData] = useState({
    name: patient?.name || '',
    birth_date: patient?.birth_date || '',
    blood_type: patient?.blood_type || 'O+' as BloodType,
    weight_kg: patient?.weight_kg || 70,
    height_cm: patient?.height_cm || 170,
    insurance: patient?.insurance || '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'weight_kg' || name === 'height_cm' ? parseFloat(value) : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!formData.name || !formData.birth_date) {
      alert('Nome e data de nascimento são obrigatórios');
      return;
    }

    setIsSubmitting(true);
    try {
      onSave(formData);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-gray-200 bg-white p-6 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">
        {patient ? 'Editar Paciente' : 'Novo Paciente'}
      </h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Nome */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Nome completo *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ex: João Silva"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        {/* Data de Nascimento */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Data de nascimento *
          </label>
          <input
            type="date"
            name="birth_date"
            value={formData.birth_date}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        {/* Tipo Sanguíneo */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tipo sanguíneo
          </label>
          <select
            name="blood_type"
            value={formData.blood_type}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {BLOOD_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Peso */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Peso (kg)
          </label>
          <input
            type="number"
            name="weight_kg"
            value={formData.weight_kg}
            onChange={handleChange}
            placeholder="70"
            step="0.1"
            min="0"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Altura */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Altura (cm)
          </label>
          <input
            type="number"
            name="height_cm"
            value={formData.height_cm}
            onChange={handleChange}
            placeholder="170"
            step="0.1"
            min="0"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Seguro */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Seguro (opcional)
          </label>
          <input
            type="text"
            name="insurance"
            value={formData.insurance}
            onChange={handleChange}
            placeholder="Ex: Unimed, Bradesco Saúde"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </form>
  );
}
