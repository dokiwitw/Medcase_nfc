'use client';

import { useState, useEffect } from 'react';
import type { Patient } from '@/types/patient.types';
import PatientForm from './PatientForm';
import PatientCard from './PatientCard';

export default function PatientList() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  async function fetchPatients() {
    try {
      const response = await fetch('/api/patients');
      if (response.ok) {
        const data = await response.json();
        setPatients(data);
      }
    } catch (error) {
      console.error('Erro ao buscar pacientes:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeletePatient(patientId: string) {
    if (!confirm('Tem certeza que deseja remover este paciente? Todos os seus dados e cartões serão deletados.')) {
      return;
    }

    try {
      const response = await fetch(`/api/patients?patient_id=${patientId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPatients(patients.filter(p => p.id !== patientId));
      } else {
        alert('Erro ao deletar paciente');
      }
    } catch (error) {
      console.error('Erro ao deletar paciente:', error);
      alert('Erro ao deletar paciente');
    }
  }

  async function handleSavePatient(patientData: Omit<Patient, 'id' | 'created_at' | 'updated_at'>) {
    try {
      if (editingPatient) {
        // Editar paciente existente
        const response = await fetch(`/api/patients?patient_id=${editingPatient.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(patientData),
        });

        if (response.ok) {
          const updated = await response.json();
          setPatients(patients.map(p => p.id === updated.id ? updated : p));
          setEditingPatient(null);
          setShowForm(false);
        } else {
          alert('Erro ao atualizar paciente');
        }
      } else {
        // Criar novo paciente
        const response = await fetch('/api/patients', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(patientData),
        });

        if (response.ok) {
          const newPatient = await response.json();
          setPatients([...patients, newPatient]);
          setShowForm(false);
        } else {
          alert('Erro ao criar paciente');
        }
      }
    } catch (error) {
      console.error('Erro ao salvar paciente:', error);
      alert('Erro ao salvar paciente');
    }
  }

  function handleEdit(patient: Patient) {
    setEditingPatient(patient);
    setShowForm(true);
  }

  function handleCancel() {
    setEditingPatient(null);
    setShowForm(false);
  }

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600">Carregando pacientes...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Pacientes</h2>
        {!showForm && (
          <button
            onClick={() => {
              setEditingPatient(null);
              setShowForm(true);
            }}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            + Adicionar Paciente
          </button>
        )}
      </div>

      {showForm && (
        <PatientForm 
          patient={editingPatient || undefined}
          onSave={handleSavePatient}
          onCancel={handleCancel}
        />
      )}

      {patients.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
          <p className="text-gray-600">Nenhum paciente cadastrado.</p>
          <p className="mt-2 text-sm text-gray-500">Clique em "Adicionar Paciente" para começar.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {patients.map(patient => (
            <PatientCard 
              key={patient.id}
              patient={patient}
              onEdit={handleEdit}
              onDelete={handleDeletePatient}
            />
          ))}
        </div>
      )}
    </div>
  );
}
