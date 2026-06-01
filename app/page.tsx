import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
      <div className="rounded-3xl border border-gray-200 bg-white p-10 shadow-sm space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">NFC Health Card</h1>
          <p className="mt-3 text-lg text-gray-600">
            Sistema de cartões NFC para compartilhamento seguro de informações médicas
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row justify-center">
          <Link
            href="/login"
            className="rounded-lg bg-blue-600 px-8 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            Acessar Painel Admin
          </Link>
          <Link
            href="/p/demo"
            className="rounded-lg bg-emerald-600 px-8 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors"
          >
            Ver Exemplo de Cartão
          </Link>
        </div>

        <div className="border-t border-gray-200 pt-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Funcionalidades</h2>
          <ul className="space-y-3 text-left text-gray-600">
            <li className="flex items-start gap-3">
              <span className="text-2xl">🔐</span>
              <span>
                <strong>Seguro:</strong> Dados protegidos com acesso controlado via token único
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">📱</span>
              <span>
                <strong>NFC Ready:</strong> URLs imprimíveis em cartões NFC para acesso rápido
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🏥</span>
              <span>
                <strong>Informações Médicas:</strong> Alergias, medicações, condições e contatos
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">⚡</span>
              <span>
                <strong>Acesso Instantâneo:</strong> Dados críticos disponíveis em emergências
              </span>
            </li>
          </ul>
        </div>

        <div className="border-t border-gray-200 pt-6 text-sm text-gray-600">
          <p>
            Credenciais de teste:<br />
            <span className="font-mono bg-gray-100 px-2 py-1 rounded">admin / admin</span>
          </p>
        </div>
      </div>
    </main>
  );
}
