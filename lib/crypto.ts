import { createHmac } from 'crypto';

const secret = process.env.TOKEN_SECRET ?? 'token_secret_substitua';

export function createTokenHmac(value: string) {
  return createHmac('sha256', secret).update(value).digest('hex');
}
