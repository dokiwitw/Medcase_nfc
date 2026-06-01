'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { NfcCard } from '@/types/patient.types';
import { isAuthenticated } from '@/lib/auth';

interface CardListProps {
  patientId: string;
}

export default function CardList({ patientId }: CardListProps) {
  const router = useRouter();
  const [cards, setCards] = useState<NfcCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCard, setSelectedCard] = useState<NfcCard | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingDescription, setEditingDescription] = useState('');

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    fetchCards();
  }, [router]);

  async function fetchCards() {
    try {
      setIsLoading(true);
      const response = await fetch('/api/cards');
      if (!response.ok) {
        throw new Error('Erro ao buscar cartões');
      }
      const data = await response.json();
      setCards(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAddCard() {
    try {
      const response = await fetch('/api/cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patient_id: patientId,
          description: editingDescription,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar cartão');
      }

      const newCard = await response.json();
      setCards([...cards, newCard]);
      setShowForm(false);
      setEditingDescription('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    }
  }

  async function handleUpdateCard(card: NfcCard) {
    try {
      const response = await fetch('/api/cards', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: card.id,
          active: !card.active,
          description: editingDescription || card.description,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar cartão');
      }

      const updated = await response.json();
      setCards(cards.map(c => c.id === updated.id ? updated : c));
      setSelectedCard(null);
      setEditingDescription('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    }
  }

  async function handleDeleteCard(cardId: string) {
    if (!confirm('Tem certeza que deseja deletar este cartão?')) return;

    try {
      const response = await fetch('/api/cards', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: cardId }),
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar cartão');
      }

      setCards(cards.filter(c => c.id !== cardId));
      setSelectedCard(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    }
  }

  if (isLoading) {
    return <div className="text-center py-8">Carregando cartões...</div>;
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Meus Cartões NFC</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          {showForm ? 'Cancelar' : '+ Novo Cartão'}
        </button>
      </div>

      {showForm && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 space-y-4">
          <input
            type="text"
            value={editingDescription}
            onChange={(e) => setEditingDescription(e.target.value)}
            placeholder="Descrição do cartão (ex: Cartão de emergência principal)"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <button
            onClick={handleAddCard}
            className="w-full rounded-lg bg-blue-600 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Criar Cartão
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-600">
            Nenhum cartão cadastrado
          </div>
        ) : (
          cards.map((card) => (
            <div
              key={card.id}
              className={`rounded-lg border-2 p-4 transition-colors ${
                selectedCard?.id === card.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => {
                setSelectedCard(card);
                setEditingDescription(card.description || '');
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">
                      {card.description || 'Cartão sem descrição'}
                    </h3>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        card.active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {card.active ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 break-all">
                    Token: <code className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{card.token}</code>
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Criado em {new Date(card.created_at).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>

              {selectedCard?.id === card.id && (
                <div className="mt-4 space-y-3 border-t pt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descrição
                    </label>
                    <input
                      type="text"
                      value={editingDescription}
                      onChange={(e) => setEditingDescription(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdateCard(card)}
                      className="flex-1 rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-700"
                    >
                      Salvar
                    </button>
                    <button
                      onClick={() => handleDeleteCard(card.id)}
                      className="flex-1 rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700"
                    >
                      Deletar
                    </button>
                  </div>

                  <div className="rounded-lg bg-blue-50 p-3">
                    <p className="text-xs text-blue-900">
                      URL do cartão:<br />
                      <code className="font-mono text-xs break-all">
                        https://medcase-nfc.vercel.app/p/{card.token}
                      </code>
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
