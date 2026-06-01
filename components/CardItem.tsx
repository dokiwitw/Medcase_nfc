'use client';

import { useState } from 'react';
import type { NfcCard } from '../types/patient.types';

interface CardItemProps {
  card: NfcCard;
  onUpdate: (card: NfcCard) => void;
  onDelete: (id: string) => void;
}

export function CardItem({ card, onUpdate, onDelete }: CardItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(card.description || '');
  const [copied, setCopied] = useState(false);

  const handleSave = async () => {
    try {
      const response = await fetch('/api/cards', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: card.id,
          description,
        }),
      });

      if (!response.ok) throw new Error('Erro ao atualizar');

      const updated = await response.json();
      onUpdate(updated);
      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar alterações');
    }
  };

  const handleToggleActive = async () => {
    try {
      const response = await fetch('/api/cards', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: card.id,
          active: !card.active,
        }),
      });

      if (!response.ok) throw new Error('Erro ao atualizar');

      const updated = await response.json();
      onUpdate(updated);
    } catch (error) {
      console.error('Erro ao desativar:', error);
      alert('Erro ao atualizar status');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Tem certeza que deseja deletar este cartão?')) return;

    try {
      const response = await fetch(`/api/cards?id=${card.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Erro ao deletar');

      onDelete(card.id);
    } catch (error) {
      console.error('Erro ao deletar:', error);
      alert('Erro ao deletar cartão');
    }
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText(card.token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`h-3 w-3 rounded-full ${
                card.active ? 'bg-green-500' : 'bg-gray-300'
              }`}
            />
            <h3 className="text-lg font-semibold text-gray-900">
              {card.description || 'Cartão sem descrição'}
            </h3>
          </div>

          {/* Token Section */}
          <div className="mb-4 bg-gray-50 rounded-md p-3">
            <p className="text-xs text-gray-600 mb-1">Token:</p>
            <div className="flex items-center justify-between">
              <code className="text-sm font-mono text-gray-800 break-all">
                {card.token}
              </code>
              <button
                onClick={handleCopyToken}
                className="ml-2 px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100 whitespace-nowrap"
              >
                {copied ? '✓ Copiado' : 'Copiar'}
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
            <div>
              <p className="text-gray-600">Criado</p>
              <p className="font-medium text-gray-900">{formatDate(card.created_at)}</p>
            </div>
            <div>
              <p className="text-gray-600">Último acesso</p>
              <p className="font-medium text-gray-900">{formatDate(card.last_accessed)}</p>
            </div>
            <div>
              <p className="text-gray-600">Total de acessos</p>
              <p className="font-medium text-gray-900">{card.access_count || 0}</p>
            </div>
          </div>

          {/* Description Edit */}
          {isEditing ? (
            <div className="mb-4">
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição do cartão"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ) : null}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-4 border-t border-gray-200">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
            >
              Salvar
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setDescription(card.description || '');
              }}
              className="flex-1 px-3 py-2 bg-gray-200 text-gray-800 text-sm rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancelar
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 text-sm rounded-md hover:bg-blue-100 transition-colors"
            >
              Editar
            </button>
            <button
              onClick={handleToggleActive}
              className={`flex-1 px-3 py-2 text-sm rounded-md transition-colors ${
                card.active
                  ? 'bg-orange-50 text-orange-600 hover:bg-orange-100'
                  : 'bg-green-50 text-green-600 hover:bg-green-100'
              }`}
            >
              {card.active ? 'Desativar' : 'Ativar'}
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 px-3 py-2 bg-red-50 text-red-600 text-sm rounded-md hover:bg-red-100 transition-colors"
            >
              Deletar
            </button>
          </>
        )}
      </div>
    </div>
  );
}
