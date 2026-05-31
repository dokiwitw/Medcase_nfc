import { nanoid } from 'nanoid';
import { NextResponse } from 'next/server';
import { createTokenHmac } from '../../../../lib/crypto';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.patient_id !== 'string') {
    return NextResponse.json({ error: 'patient_id é obrigatório' }, { status: 400 });
  }

  const token = nanoid(12);
  const hmac = createTokenHmac(token);

  // TODO: salve em Supabase na tabela nfc_cards quando o banco estiver configurado.
  const url = `https://seusite.com/p/${token}`;

  return NextResponse.json({ token, url, hmac, patient_id: body.patient_id }, { status: 201 });
}
