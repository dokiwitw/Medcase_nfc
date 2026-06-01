'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { NfcCard } from '../../../types/patient.types';
import { CardItem } from '../../../components/CardItem';

export default function CardsPage() {
  const [cards, setCards] = useState<NfcCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const patientId = '123'; // TODO: Obter do contexto/sessão do usuário

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/cards?patient_id=${patientId}`);
      if (!response.ok) throw new Error('Erro ao carregar cartões');

      const data = await response.json();
      setCards(data);
    } catch (err) {
      console.error('Erro:', err);
      setError('Não foi possível carregar os cartões');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (updatedCard: NfcCard) => {
    setCards(cards.map((c) => (c.id === updatedCard.id ? updatedCard : c)));
  };

  const handleDelete = (id: string) => {
    setCards(cards.filter((c) => c.id !== id));
  };

  const activeCount = cards.filter((c) => c.active).length;
  const totalAccess = cards.reduce((sum, c) => sum + (c.access_count || 0), 0);

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Meus Cartões NFC</h1>
        <p className="mt-2 text-gray-600">
          Gerenciar, visualizar e editar seus cartões de emergência
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 p-6 border border-blue-200">
          <div className="text-sm text-blue-600 mb-1">Total de Cartões</div>
          <div className="text-3xl font-bold text-blue-900">{cards.length}</div>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-green-50 to-green-100 p-6 border border-green-200">
          <div className="text-sm text-green-600 mb-1">Cartões Ativos</div>
          <div className="text-3xl font-bold text-green-900">{activeCount}</div>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 p-6 border border-purple-200">
          <div className="text-sm text-purple-600 mb-1">Total de Acessos</div>
          <div className="text-3xl font-bold text-purple-900">{totalAccess}</div>
        </div>
      </div>

      {/* Actions */}
      <div className="mb-8 flex gap-3">
        <Link
          href="/api/cards/generate"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
        >
          <span>+</span> Gerar novo cartão
        </Link>
        <button
          onClick={fetchCards}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Atualizar
        </button>
      </div>

      {/* Content */}
      <div>
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Carregando cartões...</p>
          </div>
        ) : error ? (
          <div className="rounded-lg bg-red-50 border border-red-200 p-6 text-center">
            <p className="text-red-800">{error}</p>
            <button
              onClick={fetchCards}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Tentar novamente
            </button>
          </div>
        ) : cards.length === 0 ? (
          <div className="rounded-lg bg-gray-50 border border-gray-200 p-12 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2 1m2-1l-2-1m2 1v2.5"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              Nenhum cartão gerado
            </h3>
            <p className="mt-2 text-gray-600">
              Crie seu primeiro cartão NFC para começar
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {cards.map((card) => (
              <CardItem
                key={card.id}
                card={card}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="mt-12 rounded-lg bg-blue-50 border border-blue-200 p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          💡 Como funciona?
        </h3>
        <ul className="space-y-2 text-blue-800 text-sm">
          <li>
            • <strong>Gerar cartão:</strong> Crie um novo cartão para compartilhar
            seus dados médicos
          </li>
          <li>
            • <strong>Token:</strong> Cada cartão tem um token único que
            identifica seus dados
          </li>
          <li>
            • <strong>Ativar/Desativar:</strong> Controle quais cartões estão em
            uso
          </li>
          <li>
            • <strong>Histórico:</strong> Veja quando seu cartão foi acessado
          </li>
          <li>
            • <strong>Deletar:</strong> Remova cartões que não usa mais
          </li>
        </ul>
      </div>
    </main>
  );
}
