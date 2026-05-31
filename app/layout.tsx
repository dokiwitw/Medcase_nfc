import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cartão de Saúde',
  description: 'Acesse dados médicos de emergência diretamente pelo seu cartão NFC.',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
