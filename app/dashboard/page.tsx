'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { isAuthenticated, clearSession } from '@/lib/auth';
import PatientList from '@/components/PatientList';

export default function DashboardPage() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
    } else {
      setIsAuth(true);
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    clearSession();
    router.push('/');
  };

  if (isLoading || !isAuth) {
    return null;
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Painel Administrativo</h1>
          <p className="mt-2 text-gray-600">Gerencie seus pacientes e cartões NFC de saúde</p>
        </div>
        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-600 px-6 py-2 text-sm font-semibold text-white hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <PatientList />
      </div>

      <div className="mt-8 flex justify-center">
        <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
          ← Voltar para home
        </Link>
      </div>
    </main>
  );
}
