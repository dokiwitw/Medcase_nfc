import { NextResponse } from 'next/server';
import type { NfcCard } from '../../../types/patient.types';

// TODO: Substituir por dados reais do Supabase quando o banco estiver configurado
const MOCK_CARDS: Map<string, NfcCard> = new Map([
  ['card-1', {
    id: 'card-1',
    patient_id: '123',
    token: 'abc123xyz789',
    active: true,
    created_at: '2026-05-20T10:00:00Z',
    updated_at: '2026-05-20T10:00:00Z',
    last_accessed: '2026-05-31T14:30:00Z',
    access_count: 5,
    description: 'Cartão de emergência principal',
  }],
  ['card-2', {
    id: 'card-2',
    patient_id: '123',
    token: 'def456uvw012',
    active: true,
    created_at: '2026-05-25T15:20:00Z',
    updated_at: '2026-05-25T15:20:00Z',
    last_accessed: '2026-05-28T09:15:00Z',
    access_count: 2,
    description: 'Cartão de backup',
  }],
  ['card-3', {
    id: 'card-3',
    patient_id: '123',
    token: 'ghi789rst345',
    active: false,
    created_at: '2026-05-10T08:00:00Z',
    updated_at: '2026-05-29T11:45:00Z',
    last_accessed: '2026-05-15T16:00:00Z',
    access_count: 12,
    description: 'Cartão antigo desativado',
  }],
]);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const patientId = searchParams.get('patient_id');

  if (!patientId) {
    return NextResponse.json(
      { error: 'patient_id é obrigatório' },
      { status: 400 }
    );
  }

  // TODO: Filtrar por patient_id do banco de dados
  const cards = Array.from(MOCK_CARDS.values()).filter(
    (card) => card.patient_id === patientId
  );

  return NextResponse.json(cards, { status: 200 });
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, active, description } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'id do cartão é obrigatório' },
        { status: 400 }
      );
    }

    const card = MOCK_CARDS.get(id);
    if (!card) {
      return NextResponse.json(
        { error: 'Cartão não encontrado' },
        { status: 404 }
      );
    }

    // TODO: Atualizar no banco de dados do Supabase
    const updatedCard: NfcCard = {
      ...card,
      ...(active !== undefined && { active }),
      ...(description !== undefined && { description }),
      updated_at: new Date().toISOString(),
    };

    MOCK_CARDS.set(id, updatedCard);

    return NextResponse.json(updatedCard, { status: 200 });
  } catch (error) {
    console.error('Erro ao atualizar cartão:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar cartão' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { error: 'id do cartão é obrigatório' },
      { status: 400 }
    );
  }

  const card = MOCK_CARDS.get(id);
  if (!card) {
    return NextResponse.json(
      { error: 'Cartão não encontrado' },
      { status: 404 }
    );
  }

  // TODO: Deletar do banco de dados do Supabase
  MOCK_CARDS.delete(id);

  return NextResponse.json(
    { message: 'Cartão deletado com sucesso' },
    { status: 200 }
  );
}
