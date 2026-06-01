import { NextResponse } from 'next/server';
import {
  getAllCards,
  getCardByToken,
  createCard,
  updateCard,
  deleteCard,
} from '@/lib/mockdb';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  const patientId = searchParams.get('patient_id');

  try {
    if (token) {
      // Get specific card by token
      const card = await getCardByToken(token);
      if (!card) {
        return NextResponse.json(
          { error: 'Cartão não encontrado' },
          { status: 404 }
        );
      }
      return NextResponse.json(card, { status: 200 });
    }

    // Get all cards (optionally filtered by patient_id)
    const allCards = await getAllCards();
    
    if (patientId) {
      const filteredCards = allCards.filter(card => card.patient_id === patientId);
      return NextResponse.json(filteredCards, { status: 200 });
    }

    return NextResponse.json(allCards, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar cartões:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar cartões' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { patient_id, description } = body;

    if (!patient_id) {
      return NextResponse.json(
        { error: 'patient_id é obrigatório' },
        { status: 400 }
      );
    }

    const newCard = await createCard(patient_id, description);
    return NextResponse.json(newCard, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar cartão:', error);
    return NextResponse.json(
      { error: 'Erro ao criar cartão' },
      { status: 500 }
    );
  }
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

    const updatedCard = await updateCard(id, { active, description });
    if (!updatedCard) {
      return NextResponse.json(
        { error: 'Cartão não encontrado' },
        { status: 404 }
      );
    }

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
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'id do cartão é obrigatório' },
        { status: 400 }
      );
    }

    const deleted = await deleteCard(id);
    if (!deleted) {
      return NextResponse.json(
        { error: 'Cartão não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Cartão deletado com sucesso' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erro ao deletar cartão:', error);
    return NextResponse.json(
      { error: 'Erro ao deletar cartão' },
      { status: 500 }
    );
  }
}
    );
  }
}
