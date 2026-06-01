'use client';

import { useState } from 'react';
import type { Patient } from '@/types/patient.types';
import CardManagement from './CardManagement';

interface PatientCardProps {
  patient: Patient;
  onEdit: (patient: Patient) => void;
  onDelete: (patientId: string) => void;
}

export default function PatientCard({ patient, onEdit, onDelete }: PatientCardProps) {
  const [showCards, setShowCards] = useState(false);

  const birthDate = new Date(patient.birth_date);
  const age = new Date().getFullYear() - birthDate.getFullYear();

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
          <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-gray-600">
            <div>
              <span className="font-semibold">Idade:</span> {age} anos
            </div>
            <div>
              <span className="font-semibold">Tipo Sanguíneo:</span> {patient.blood_type}
            </div>
            <div>
              <span className="font-semibold">Peso:</span> {patient.weight_kg} kg
            </div>
            <div>
              <span className="font-semibold">Altura:</span> {patient.height_cm} cm
            </div>
            {patient.insurance && (
              <div className="col-span-2">
                <span className="font-semibold">Seguro:</span> {patient.insurance}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => onEdit(patient)}
            className="rounded-lg bg-blue-100 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-200 whitespace-nowrap"
          >
            Editar Dados
          </button>
          <button
            onClick={() => setShowCards(!showCards)}
            className="rounded-lg bg-purple-100 px-3 py-2 text-xs font-semibold text-purple-700 hover:bg-purple-200 whitespace-nowrap"
          >
            {showCards ? 'Ocultar' : 'Ver'} Cartões
          </button>
          <button
            onClick={() => onDelete(patient.id)}
            className="rounded-lg bg-red-100 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-200 whitespace-nowrap"
          >
            Remover
          </button>
        </div>
      </div>

      {showCards && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <CardManagement patientId={patient.id} />
        </div>
      )}
    </div>
  );
}
