# 🚀 Guia Rápido - NFC Health Card

## ⚡ Comece Agora (5 minutos)

### 1️⃣ Iniciar o servidor
```bash
cd c:\Medcase\nfc-health-web
npm run dev
```
Aguarde a mensagem: `✓ Ready in XXXms`

### 2️⃣ Acessar a aplicação
Abra seu navegador em: **http://localhost:3000**

### 3️⃣ Fazer Login
- URL: http://localhost:3000/login
- **Usuário**: `admin`
- **Senha**: `admin`
- Clique em "Entrar"

### 4️⃣ Você verá o Dashboard com opções:

```
┌─────────────────────────────────┐
│  Painel Administrativo          │
├─────────────────────────────────┤
│                                 │
│  [+ Novo Cartão]                │
│                                 │
│  ┌─────────────────────────┐    │
│  │ Cartão 1                │    │
│  │ Status: Ativo ✓         │    │
│  │ Token: abc123...xyz789  │    │
│  │ [Editar] [Deletar]      │    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │ Cartão 2                │    │
│  │ Status: Ativo ✓         │    │
│  │ Token: def456...uvw012  │    │
│  │ [Editar] [Deletar]      │    │
│  └─────────────────────────┘    │
│                                 │
└─────────────────────────────────┘
```

---

## 🎫 Operações Básicas

### ➕ Criar Novo Cartão

1. Clique em **"+ Novo Cartão"**
2. Apareça um campo de texto
3. Digite uma descrição (ex: "Cartão João")
4. Clique em **"Criar Cartão"**
5. ✅ Novo cartão aparece na lista com token único gerado

### 📝 Editar Cartão

1. Clique no cartão que deseja editar
2. Cartão expande mostrando:
   - Campo para editar descrição
   - Botões "Salvar" e "Deletar"
   - URL do cartão em box azul

3. Edite a descrição se desejar
4. Clique **"Salvar"**
5. ✅ Alterações aplicadas

### 🗑️ Deletar Cartão

1. Clique no cartão
2. Clique no botão **"Deletar"**
3. Aparece confirmação: "Tem certeza que deseja deletar?"
4. Clique "OK" para confirmar
5. ✅ Cartão removido da lista

### 📋 Copiar URL do Cartão

1. Clique no cartão
2. No box azul, você verá a URL:
   ```
   https://medcase-nfc.vercel.app/p/[TOKEN]
   ```
3. Copie essa URL
4. Use para criar QR code
5. Imprima no cartão NFC

---

## 👁️ Visualizar Cartão como Paciente

### Opção 1: Direto via URL
```
http://localhost:3000/p/[COLA_SEU_TOKEN_AQUI]
```

### Opção 2: Usar um dos cartões existentes
1. No dashboard, clique em um cartão
2. Copie o token
3. Cole na URL: `http://localhost:3000/p/`
4. Vê o cartão como paciente

### O que você verá:
- ✅ Nome do paciente
- ✅ Idade e tipo de sangue
- ✅ Alergias (com cores por gravidade)
- ✅ Medicações (nome, dosagem, frequência)
- ✅ Condições médicas
- ✅ Contatos de emergência
- ❌ Sem botões de edição (somente leitura)

---

## 🔐 Segurança

### ✅ O que está protegido:
- Dashboard (requer login)
- Funções de editar/deletar
- Admin (usuário/senha)

### 📖 Como funciona o acesso público:
- Qualquer um com a URL pode ver o cartão
- Mas precisa do token exato (21 caracteres aleatórios)
- Impossível de adivinhar por força bruta
- Perfeito para cartões NFC

---

## 🧪 Dados de Teste

Sistema vem com **1 paciente pré-criado**:

| Campo | Valor |
|-------|-------|
| **Nome** | Carlos Ribeiro |
| **Data nascimento** | 15/07/1982 (42 anos) |
| **Tipo de sangue** | O+ |
| **Altura/Peso** | 176cm / 82kg |
| **Seguro** | Unimed |

**Alergias:**
- ⚠️ Penicilina (CRÍTICA)
- ⚠️ Dipirona (CRÍTICA)
- ⚠️ Látex (Média)

**Medicações:**
- 💊 Metformina 850mg (2x ao dia)
- 💊 Losartana 50mg (1x ao dia)

**Condições:**
- 🏥 Diabetes tipo 2
- 🏥 Hipertensão arterial

**Contatos:**
- 📞 Maria Ribeiro (Esposa): (11) 98765-4321
- 📞 Dr. Paulo Souza (Cardiologista): (11) 3456-7890

---

## 🔧 Troubleshooting

### ❌ Erro: "Não reconheço este comando"
```bash
# Verifique se está no diretório certo
cd c:\Medcase\nfc-health-web

# Reinstale dependências
npm install

# Tente novamente
npm run dev
```

### ❌ Porta 3000 já está em uso
```bash
# Encontre o processo
netstat -ano | findstr :3000

# Mate o processo (substitua PID)
taskkill /PID [PID] /F

# Ou inicie em outra porta
PORT=3001 npm run dev
```

### ❌ Não consigo fazer login
- Verifique caps lock
- Usuário deve ser: **admin**
- Senha deve ser: **admin**
- Limpe cookies do navegador

### ❌ Cartão não aparece quando acesso via URL
- Verifique se o token está correto
- Confirme se o cartão está "Ativo" no dashboard
- Abra console (F12) para ver erros

---

## 📱 QR Code para NFC

### Passo a passo:

1. No Dashboard, clique em um cartão
2. Copie a URL:
   ```
   https://medcase-nfc.vercel.app/p/[TOKEN]
   ```

3. Use um gerador de QR code:
   - https://qr-code-generator.com/
   - https://www.qr-code-generator.com/
   - Chrome: Right-click > "Gerar código QR"

4. Imprima o QR code

5. Cole no cartão NFC físico

6. Quando alguém ler o NFC:
   - Smartphone abrirá a URL
   - Verá dados do paciente
   - Acesso rápido em emergência

---

## 💡 Dicas & Truques

### 💾 Fazer backup de um token:
1. Copie todos os tokens
2. Cole em um arquivo de texto
3. Salve em lugar seguro

### 🔄 Distribuir cartões:
1. Imprima múltiplos QR codes
2. Um QR por cartão NFC
3. Distribua aos pacientes

### 📊 Organizar cartões:
1. Use descrições claras:
   - "Cartão de emergência - João Silva"
   - "Cartão de backup - Maria Santos"
   - "Cartão antigo - Desativado"

### ⚡ Acesso rápido ao login:
```
http://localhost:3000/login
```

### 🏃 Voltar para home:
```
http://localhost:3000
```

---

## 🆘 Como Resetar Tudo

Os dados estão em **memória**, então:

1. Parar servidor: **Ctrl + C**
2. Servidor reinicia com dados padrão
3. Todos os cartões customizados somem
4. Volta ao estado original

Para **resetar específico**:
- Deletar cartões um a um no dashboard
- Desativar em vez de deletar

---

## 📞 Suporte Rápido

### URLs Importantes:
| URL | Descrição |
|-----|-----------|
| http://localhost:3000 | 🏠 Home |
| http://localhost:3000/login | 🔐 Login |
| http://localhost:3000/dashboard | 📊 Dashboard |
| http://localhost:3000/p/[TOKEN] | 🎫 Cartão Público |

### Credenciais:
- **Usuário**: admin
- **Senha**: admin
- **Duração**: 24 horas

### Contato Dev:
- Consulte DOCUMENTACAO.md para detalhes técnicos
- Consulte MUDANCAS.md para lista de arquivos

---

## ✨ Pronto!

Você está pronto para usar o sistema! 🎉

**Próximos passos:**
1. ✅ Iniciar servidor
2. ✅ Fazer login
3. ✅ Criar seus cartões
4. ✅ Gerar QR codes
5. ✅ Distribuir aos pacientes

**Divirta-se!** 🚀
