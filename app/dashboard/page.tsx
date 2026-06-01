import Link from 'next/link';

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Gerencie sua conta e cartões NFC</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Meus Cartões */}
        <Link
          href="/dashboard/cards"
          className="group rounded-lg border-2 border-gray-200 p-8 hover:border-blue-500 hover:shadow-lg transition-all"
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                Meus Cartões
              </h2>
              <p className="mt-2 text-gray-600 text-sm">
                Visualizar, editar e gerenciar seus cartões NFC
              </p>
            </div>
            <span className="text-3xl">🎫</span>
          </div>
          <div className="mt-4 flex items-center text-blue-600 font-medium text-sm">
            Acessar <span className="ml-2">→</span>
          </div>
        </Link>

        {/* Editar Perfil */}
        <Link
          href="/dashboard/profile"
          className="group rounded-lg border-2 border-gray-200 p-8 hover:border-green-500 hover:shadow-lg transition-all"
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                Editar Perfil
              </h2>
              <p className="mt-2 text-gray-600 text-sm">
                Atualize suas informações pessoais e médicas
              </p>
            </div>
            <span className="text-3xl">👤</span>
          </div>
          <div className="mt-4 flex items-center text-green-600 font-medium text-sm">
            Acessar <span className="ml-2">→</span>
          </div>
        </Link>
      </div>

      {/* Info Cards */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 p-6 border border-blue-200">
          <div className="text-3xl mb-2">🔒</div>
          <h3 className="font-semibold text-gray-900">Segurança</h3>
          <p className="mt-2 text-sm text-gray-700">
            Seus dados estão protegidos com criptografia
          </p>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 p-6 border border-purple-200">
          <div className="text-3xl mb-2">📱</div>
          <h3 className="font-semibold text-gray-900">NFC</h3>
          <p className="mt-2 text-sm text-gray-700">
            Compartilhe dados via cartões NFC seguros
          </p>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-green-50 to-green-100 p-6 border border-green-200">
          <div className="text-3xl mb-2">⚡</div>
          <h3 className="font-semibold text-gray-900">Rápido</h3>
          <p className="mt-2 text-sm text-gray-700">
            Acesso instantâneo a dados médicos críticos
          </p>
        </div>
      </div>
    </main>
  );
}
