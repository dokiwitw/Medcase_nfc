import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.name !== 'string' || typeof body.birth_date !== 'string') {
    return NextResponse.json({ error: 'Campos inválidos. name e birth_date são obrigatórios.' }, { status: 400 });
  }

  // TODO: implemente cadastro real no Supabase.
  return NextResponse.json({ message: 'Paciente criado (mock)', patient: body }, { status: 201 });
}
