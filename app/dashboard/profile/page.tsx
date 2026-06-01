'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { PatientFullData, Patient, Allergy, Medication, Condition, EmergencyContact } from '../../../types/patient.types';
import { PatientInfoEditor } from '../../../components/PatientInfoEditor';
import { AllergyListEditor } from '../../../components/AllergyListEditor';
import { MedicationListEditor } from '../../../components/MedicationListEditor';
import { ConditionListEditor } from '../../../components/ConditionListEditor';
import { EmergencyContactListEditor } from '../../../components/EmergencyContactListEditor';

export default function ProfilePage() {
  const [patientData, setPatientData] = useState<PatientFullData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const patientId = '123'; // TODO: Obter do contexto/sessão do usuário

  useEffect(() => {
    fetchPatientData();
  }, []);

  const fetchPatientData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/patients?id=${patientId}`);
      if (!response.ok) throw new Error('Erro ao carregar dados');

      const data = await response.json();
      setPatientData(data);
    } catch (err) {
      console.error('Erro:', err);
      setError('Não foi possível carregar os dados do paciente');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePatient = async (patient: Patient) => {
    try {
      setSaving(true);
      const response = await fetch('/api/patients', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: patientId,
          patient,
        }),
      });

      if (!response.ok) throw new Error('Erro ao salvar');

      const updated = await response.json();
      setPatientData(updated);
      alert('Informações atualizadas com sucesso!');
    } catch (err) {
      console.error('Erro:', err);
      alert('Erro ao salvar informações');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAllergies = async (allergies: Allergy[]) => {
    try {
      setSaving(true);
      const response = await fetch('/api/patients', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: patientId,
          allergies,
        }),
      });

      if (!response.ok) throw new Error('Erro ao salvar');

      const updated = await response.json();
      setPatientData(updated);
      alert('Alergias atualizadas com sucesso!');
    } catch (err) {
      console.error('Erro:', err);
      alert('Erro ao salvar alergias');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveMedications = async (medications: Medication[]) => {
    try {
      setSaving(true);
      const response = await fetch('/api/patients', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: patientId,
          medications,
        }),
      });

      if (!response.ok) throw new Error('Erro ao salvar');

      const updated = await response.json();
      setPatientData(updated);
      alert('Medicações atualizadas com sucesso!');
    } catch (err) {
      console.error('Erro:', err);
      alert('Erro ao salvar medicações');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveConditions = async (conditions: Condition[]) => {
    try {
      setSaving(true);
      const response = await fetch('/api/patients', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: patientId,
          conditions,
        }),
      });

      if (!response.ok) throw new Error('Erro ao salvar');

      const updated = await response.json();
      setPatientData(updated);
      alert('Condições atualizadas com sucesso!');
    } catch (err) {
      console.error('Erro:', err);
      alert('Erro ao salvar condições');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveContacts = async (contacts: EmergencyContact[]) => {
    try {
      setSaving(true);
      const response = await fetch('/api/patients', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: patientId,
          contacts,
        }),
      });

      if (!response.ok) throw new Error('Erro ao salvar');

      const updated = await response.json();
      setPatientData(updated);
      alert('Contatos atualizados com sucesso!');
    } catch (err) {
      console.error('Erro:', err);
      alert('Erro ao salvar contatos');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </main>
    );
  }

  if (error || !patientData) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="rounded-lg bg-red-50 border border-red-200 p-6 text-center">
          <p className="text-red-800">{error || 'Erro ao carregar dados'}</p>
          <button
            onClick={fetchPatientData}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Editar Perfil</h1>
            <p className="mt-2 text-gray-600">
              Atualize suas informações pessoais e dados médicos
            </p>
          </div>
          <Link
            href="/dashboard"
            className="text-blue-600 hover:text-blue-700 text-sm"
          >
            ← Voltar
          </Link>
        </div>
      </div>

      {saving && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 text-sm">
          💾 Salvando alterações...
        </div>
      )}

      <div className="space-y-8">
        {/* Informações Pessoais */}
        <PatientInfoEditor
          patient={patientData.patient}
          onSave={handleSavePatient}
        />

        {/* Alergias */}
        <AllergyListEditor
          allergies={patientData.allergies}
          onSave={handleSaveAllergies}
        />

        {/* Medicações */}
        <MedicationListEditor
          medications={patientData.medications}
          onSave={handleSaveMedications}
        />

        {/* Condições Médicas */}
        <ConditionListEditor
          conditions={patientData.conditions}
          onSave={handleSaveConditions}
        />

        {/* Contatos de Emergência */}
        <EmergencyContactListEditor
          contacts={patientData.contacts}
          onSave={handleSaveContacts}
        />
      </div>

      {/* Info Section */}
      <div className="mt-12 rounded-lg bg-blue-50 border border-blue-200 p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          💡 Como funciona?
        </h3>
        <ul className="space-y-2 text-blue-800 text-sm">
          <li>
            • Clique em <strong>"Editar"</strong> em qualquer seção para adicionar ou
            modificar informações
          </li>
          <li>
            • Todas as alterações são salvas automaticamente quando você clica em{' '}
            <strong>"Salvar"</strong>
          </li>
          <li>
            • Seus dados são compartilhados através dos cartões NFC que você criar
          </li>
          <li>
            • Você pode ter alergias críticas com severidade diferente
          </li>
          <li>
            • Contatos de emergência serão acessíveis para profissionais de saúde
          </li>
        </ul>
      </div>
    </main>
  );
}
