import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
      <div className="rounded-3xl border border-gray-200 bg-white p-10 shadow-sm">
        <h1 className="text-4xl font-semibold text-gray-900">Cartão inválido</h1>
        <p className="mt-4 text-gray-600">O token do cartão não existe ou foi desativado.</p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Voltar para o início
        </Link>
      </div>
    </main>
  );
}
