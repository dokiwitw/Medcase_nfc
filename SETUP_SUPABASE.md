# Configuração do Supabase

## Passo 1: Criar um Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Clique em "Sign In" (se tiver conta) ou "Sign Up" (para criar nova conta)
3. Crie um novo projeto:
   - Clique em "New Project"
   - Escolha um nome para o projeto (ex: "medcase-nfc")
   - Escolha uma senha segura para o banco de dados
   - Selecione a região mais próxima
   - Clique em "Create new project"

## Passo 2: Copiar Credenciais

1. Na página do projeto, clique em "Settings" (ícone de engrenagem)
2. Vá para "API" no menu lateral
3. Copie:
   - **Project URL** → Coloque em `SUPABASE_URL`
   - **anon public** → Coloque em `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Vá para "Service Role Secret" e copie:
   - **Service Role Secret** → Coloque em `SUPABASE_SERVICE_KEY`

## Passo 3: Configurar Variáveis de Ambiente

1. Crie um arquivo `.env.local` na raiz do projeto (copie do `.env.example`)
2. Preencha com as credenciais do Supabase:

```
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_KEY=sua-service-role-key
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key
```

## Passo 4: Criar as Tabelas

1. Na dashboard do Supabase, clique em "SQL Editor"
2. Clique em "New Query"
3. Copie e cole todo o conteúdo do arquivo `SUPABASE_SETUP.sql`
4. Clique em "Run" (ou pressione Ctrl+Enter)
5. Aguarde a execução - você verá mensagens de sucesso

## Passo 5: Verificar as Tabelas

1. Clique em "Database" no menu lateral
2. Você deve ver as seguintes tabelas:
   - `patients` - Pacientes
   - `nfc_cards` - Cartões NFC
   - `allergies` - Alergias
   - `medications` - Medicações
   - `conditions` - Condições/Doenças
   - `emergency_contacts` - Contatos de Emergência

## Passo 6: Iniciar o Projeto

```bash
npm run dev
```

O projeto agora está conectado ao Supabase e todos os dados serão salvos na nuvem!

## Testes Recomendados

1. **Login**: Use admin/admin
2. **Adicionar Paciente**: Crie um novo paciente com informações completas
3. **Gerar Cartão**: Crie um cartão NFC para o paciente
4. **Ver no Dashboard**: Verifique se os dados aparecem no Supabase SQL Editor
5. **Acessar URL Pública**: Visite `/p/[token]` para ver a página pública

## Troubleshooting

### "SUPABASE_URL e SUPABASE_SERVICE_KEY devem estar definidos"
- Verifique se o arquivo `.env.local` está na raiz do projeto
- Reinicie o dev server: `npm run dev`

### "Error: relation 'patients' does not exist"
- As tabelas não foram criadas. Execute o SQL em `SUPABASE_SETUP.sql` novamente

### "401 Unauthorized"
- Verifique se as chaves do Supabase estão corretas em `.env.local`
- Confirm que copiou o `SUPABASE_SERVICE_KEY` correto (não o anon key)

## Próximos Passos

- [ ] Configurar autenticação com Supabase Auth
- [ ] Adicionar RLS (Row Level Security) específicas por usuário
- [ ] Migrar para sistema de autenticação robusto (NextAuth.js)
- [ ] Configurar backups automáticos no Supabase
