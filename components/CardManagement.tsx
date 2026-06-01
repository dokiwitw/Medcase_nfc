'use client';

import { useState, useEffect } from 'react';
import type { NfcCard } from '@/types/patient.types';

interface CardManagementProps {
  patientId: string;
}

export default function CardManagement({ patientId }: CardManagementProps) {
  const [cards, setCards] = useState<NfcCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNewCardForm, setShowNewCardForm] = useState(false);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  useEffect(() => {
    fetchCards();
  }, [patientId]);

  async function fetchCards() {
    try {
      const response = await fetch(`/api/cards?patient_id=${patientId}`);
      if (response.ok) {
        const data = await response.json();
        setCards(data.filter((card: NfcCard) => card.patient_id === patientId));
      }
    } catch (error) {
      console.error('Erro ao buscar cartões:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreateCard(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patient_id: patientId,
          description,
        }),
      });

      if (response.ok) {
        const newCard = await response.json();
        setCards([...cards, newCard]);
        setDescription('');
        setShowNewCardForm(false);
      } else {
        alert('Erro ao criar cartão');
      }
    } catch (error) {
      console.error('Erro ao criar cartão:', error);
      alert('Erro ao criar cartão');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeleteCard(cardId: string) {
    if (!confirm('Tem certeza que deseja remover este cartão?')) {
      return;
    }

    try {
      const response = await fetch(`/api/cards?id=${cardId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCards(cards.filter(c => c.id !== cardId));
      } else {
        alert('Erro ao deletar cartão');
      }
    } catch (error) {
      console.error('Erro ao deletar cartão:', error);
      alert('Erro ao deletar cartão');
    }
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    setCopiedToken(text);
    setTimeout(() => setCopiedToken(null), 2000);
  }

  if (isLoading) {
    return <p className="text-sm text-gray-600">Carregando cartões...</p>;
  }

  const cardUrl = (token: string) => `https://medcase-nfc.vercel.app/p/${token}`;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-gray-900">Cartões NFC</h4>
        {!showNewCardForm && (
          <button
            onClick={() => setShowNewCardForm(true)}
            className="rounded-lg bg-green-600 px-3 py-1 text-xs font-semibold text-white hover:bg-green-700"
          >
            + Novo Cartão
          </button>
        )}
      </div>

      {showNewCardForm && (
        <form onSubmit={handleCreateCard} className="rounded-lg border border-green-200 bg-green-50 p-4 space-y-3">
          <input
            type="text"
            placeholder="Descrição do cartão (ex: Cartão principal, Emergência)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg border border-green-300 px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowNewCardForm(false)}
              className="rounded-lg border border-green-300 px-3 py-1 text-xs font-semibold text-green-700 hover:bg-green-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-green-600 px-3 py-1 text-xs font-semibold text-white hover:bg-green-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Criando...' : 'Criar Cartão'}
            </button>
          </div>
        </form>
      )}

      {cards.length === 0 ? (
        <p className="text-sm text-gray-600">Nenhum cartão criado para este paciente.</p>
      ) : (
        <div className="space-y-3">
          {cards.map(card => (
            <div key={card.id} className="rounded-lg border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">
                    {card.description || 'Cartão sem descrição'}
                  </p>
                  <p className="mt-1 text-xs text-gray-600 break-all font-mono bg-white rounded px-2 py-1">
                    {card.token}
                  </p>
                  <p className="mt-2 text-xs text-gray-600 break-all">
                    <span className="font-semibold">URL:</span>{' '}
                    <span className="font-mono text-blue-600">{cardUrl(card.token)}</span>
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => copyToClipboard(cardUrl(card.token))}
                    className="rounded-lg bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-200 whitespace-nowrap"
                  >
                    {copiedToken === cardUrl(card.token) ? 'Copiado!' : 'Copiar URL'}
                  </button>
                  <button
                    onClick={() => handleDeleteCard(card.id)}
                    className="rounded-lg bg-red-100 px-2 py-1 text-xs font-semibold text-red-700 hover:bg-red-200 whitespace-nowrap"
                  >
                    Remover
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
