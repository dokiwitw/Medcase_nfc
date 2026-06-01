# Deploy no Vercel

O projeto já está linkado ao Vercel. Para deploy automático:

## Variáveis de Ambiente no Vercel

1. Acesse o dashboard do Vercel: https://vercel.com/dashboard
2. Selecione o projeto "nfc-health-web"
3. Vá para "Settings" → "Environment Variables"
4. Adicione as seguintes variáveis:

```
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_KEY=sua-service-role-key
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key
```

## Deploy Automático

Quando você fizer push para a branch `main`:
- Vercel detecta as mudanças automaticamente
- Constrói o projeto
- Faz deploy para produção

Você pode ver o progresso em: https://vercel.com/dashboard

## URL de Produção

Após configurar as variáveis e fazer o primeiro deploy, sua aplicação estará disponível em:
- `https://seu-dominio-vercel.vercel.app`
- Os cartões NFC apontarão para: `https://seu-dominio-vercel.vercel.app/p/[TOKEN]`

## Verificar Logs

No dashboard do Vercel, você pode ver:
- Logs de build em "Deployments"
- Logs de aplicação em "Function Logs"
- Erros em tempo real

## Rollback

Se algo der errado:
1. Vá para "Deployments"
2. Clique no deploy anterior
3. Clique em "Promote to Production"

## Domínio Customizado

Para usar um domínio customizado:
1. Em "Settings" → "Domains"
2. Adicione seu domínio
3. Configure os DNS records conforme as instruções
