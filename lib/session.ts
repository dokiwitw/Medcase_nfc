import { jwtVerify } from 'jose';

const secret = process.env.TOKEN_SECRET ?? 'token_secret_substitua';

export async function validateSession(token: string) {
  try {
    const encoder = new TextEncoder();
    const { payload } = await jwtVerify(token, encoder.encode(secret));
    return { valid: true, payload };
  } catch (_error) {
    return { valid: false };
  }
}
