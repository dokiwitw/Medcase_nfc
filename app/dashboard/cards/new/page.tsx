'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewCardPage() {
  const router = useRouter();
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newCard, setNewCard] = useState<any>(null);

  const patientId = '123'; // TODO: Obter do contexto/sessão do usuário

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      // Gerar cartão
      const generateResponse = await fetch('/api/cards/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patient_id: patientId }),
      });

      if (!generateResponse.ok) {
        throw new Error('Erro ao gerar cartão');
      }

      const card = await generateResponse.json();

      // Atualizar com descrição
      if (description) {
        const updateResponse = await fetch('/api/cards', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: card.token.substring(0, 8), // Usar parte do token como ID temporário
            description,
          }),
        });

        if (updateResponse.ok) {
          const updated = await updateResponse.json();
          setNewCard(updated);
        } else {
          setNewCard(card);
        }
      } else {
        setNewCard(card);
      }
    } catch (err) {
      console.error('Erro:', err);
      setError('Não foi possível gerar o cartão');
    } finally {
      setLoading(false);
    }
  };

  if (newCard) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-10">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">✅</div>
          <h1 className="text-3xl font-bold text-gray-900">Cartão Gerado!</h1>
        </div>

        <div className="rounded-lg bg-green-50 border-2 border-green-200 p-8 mb-8">
          <h2 className="font-semibold text-gray-900 mb-4">Seus dados do cartão:</h2>

          <div className="space-y-4">
            <div className="bg-white rounded p-4">
              <p className="text-xs text-gray-600 mb-1">Token:</p>
              <code className="text-sm font-mono text-gray-800 break-all">
                {newCard.token}
              </code>
            </div>

            <div className="bg-white rounded p-4">
              <p className="text-xs text-gray-600 mb-1">URL para compartilhamento:</p>
              <code className="text-sm font-mono text-gray-800 break-all">
                {newCard.url}
              </code>
            </div>

            {description && (
              <div className="bg-white rounded p-4">
                <p className="text-xs text-gray-600 mb-1">Descrição:</p>
                <p className="text-sm text-gray-800">{description}</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-blue-900 mb-3">Próximos passos:</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>✓ Copie o token para registrar no seu cartão NFC</li>
            <li>✓ Ou compartilhe a URL com pessoas de confiança</li>
            <li>✓ Gerenciar esse cartão na sua página de cartões</li>
          </ul>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => {
              navigator.clipboard.writeText(newCard.token);
              alert('Token copiado!');
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Copiar Token
          </button>
          <Link
            href="/dashboard/cards"
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Ir para Meus Cartões
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <Link href="/dashboard/cards" className="text-blue-600 hover:text-blue-700 mb-6 inline-flex items-center gap-2">
        ← Voltar
      </Link>

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Gerar Novo Cartão</h1>
        <p className="mt-2 text-gray-600">
          Crie um novo cartão NFC para compartilhar seus dados médicos
        </p>
      </div>

      <form onSubmit={handleGenerate} className="space-y-6">
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-900">
            Descrição do Cartão (opcional)
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ex: Cartão de emergência principal"
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="mt-1 text-sm text-gray-600">
            Descrição para ajudar a identificar este cartão
          </p>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-800">
            {error}
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-3">O que vai acontecer:</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Um token único será gerado para este cartão</li>
            <li>• Você poderá escrever o token em um cartão NFC</li>
            <li>• Outras pessoas poderão acessar seus dados usando este token</li>
            <li>• Você controla quando o cartão está ativo ou inativo</li>
          </ul>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
              loading
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {loading ? 'Gerando...' : 'Gerar Cartão'}
          </button>
          <Link
            href="/dashboard/cards"
            className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors text-center"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </main>
  );
}
