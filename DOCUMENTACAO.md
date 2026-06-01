# NFC Health Card System - Documentação Completa

## Visão Geral

Este é um sistema web de gerenciamento de cartões NFC para compartilhamento seguro de informações médicas. Ele permite que administradores gerenciem cartões, cada um com um token único que pode ser impresso em cartões NFC físicos para acesso rápido às informações de emergência.

## Arquitetura do Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                    NFC Health Card System                    │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────┐         ┌────────────────────────┐ │
│  │   Admin Dashboard    │         │   Public Card View     │ │
│  │   (Protegido)        │         │   (Sem edição)         │ │
│  ├──────────────────────┤         ├────────────────────────┤ │
│  │ - Login (admin/admin)│         │ - URL: /p/TOKEN        │ │
│  │ - Gerenciar Cards    │         │ - Dados do paciente    │ │
│  │ - Adicionar Cards    │         │ - Somente leitura      │ │
│  │ - Editar Cards       │         │ - QR code pronto       │ │
│  │ - Deletar Cards      │         │                        │ │
│  │ - Ver Tokens         │         │                        │ │
│  └──────────────────────┘         └────────────────────────┘ │
│           │                                │                  │
│           └────────────┬───────────────────┘                  │
│                        │                                      │
│                   ┌────▼────────┐                             │
│                   │  API Routes  │                             │
│                   ├──────────────┤                             │
│                   │ /api/cards   │                             │
│                   │ /api/patients│                             │
│                   └──────────────┘                             │
│                        │                                      │
│                   ┌────▼────────┐                             │
│                   │  Mock Database                           │
│                   │  (Em memória)                             │
│                   └──────────────┘                             │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Componentes Principais

### 1. Autenticação (`lib/auth.ts`)

Sistema simples de autenticação com localStorage:

- **Credenciais padrão**: `admin` / `admin`
- **Sessão duração**: 24 horas
- **Métodos**:
  - `validateCredentials()`: Valida usuário e senha
  - `createSession()`: Cria nova sessão autenticada
  - `isAuthenticated()`: Verifica se o usuário está autenticado
  - `clearSession()`: Faz logout

### 2. Geração de Tokens (`lib/token.ts`)

Sistema de geração de tokens únicos usando `nanoid`:

- **Formato**: 21 caracteres alfanuméricos aleatórios
- **Método**: `generateCardToken()` cria novo token
- **Validação**: `isValidToken()` verifica se é válido

### 3. Banco de Dados Mock (`lib/mockdb.ts`)

Simula um banco de dados em memória com:

- **Tabelas**: Patients, Cards, Allergies, Medications, Conditions, Contacts
- **Operações CRUD**: Create, Read, Update, Delete para cada entidade
- **Funções principais**:
  - `createCard()`: Cria novo cartão com token gerado
  - `getAllCards()`: Lista todos os cartões
  - `getCardByToken()`: Busca cartão por token
  - `getFullPatientData()`: Retorna dados completos do paciente

### 4. API Routes

#### `/api/cards` (GET, POST, PUT, DELETE)

```
GET /api/cards          - Lista todos os cartões
GET /api/cards?token=X  - Busca cartão por token
POST /api/cards         - Cria novo cartão
PUT /api/cards          - Atualiza cartão
DELETE /api/cards       - Deleta cartão
```

**Corpo POST:**
```json
{
  "patient_id": "patient-1",
  "description": "Cartão de emergência"
}
```

#### `/api/patients` (GET)

```
GET /api/patients                    - Lista todos os pacientes
GET /api/patients?patient_id=X       - Busca paciente específico com dados completos
```

### 5. Páginas

#### `/login`

Página de autenticação para administradores:
- Form com usuário e senha
- Salva sessão no localStorage
- Redirect automático ao dashboard

#### `/dashboard`

Painel administrativo (protegido por autenticação):
- Lista de cartões do paciente
- Opção de adicionar novo cartão
- Editar descrição do cartão
- Ativar/desativar cartão
- Deletar cartão
- Ver token de cada cartão
- Logout

#### `/p/[token]`

Página pública de visualização do cartão (somente leitura):
- Acessível via URL: `https://medcase-nfc.vercel.app/p/[TOKEN]`
- Mostra dados completos do paciente
- Informações: Alergias, Medicações, Condições, Contatos
- Sem acesso a ferramentas de edição
- Perfeita para impressão em QR code em cartões NFC

## Fluxo de Uso

### Para Admin:

1. **Acessar o painel**:
   - Ir para `/login`
   - Login com `admin` / `admin`
   - Será redirecionado ao dashboard

2. **Gerenciar cartões**:
   - Clique em "+ Novo Cartão"
   - Defina uma descrição (ex: "Cartão João")
   - Sistema gera automaticamente um token único
   - Token pode ser visualizado e copiado

3. **Distribuir cartões**:
   - Copie a URL: `https://medcase-nfc.vercel.app/p/[TOKEN]`
   - Crie um QR code com essa URL
   - Imprima o QR code no cartão NFC
   - Quando lido, mostra dados do paciente

4. **Gerenciar cartões**:
   - Editar descrição
   - Ativar/desativar
   - Deletar (com confirmação)

### Para Usuário Final (Emergência):

1. Ler cartão NFC com smartphone
2. Será redirecionado para URL: `/p/[TOKEN]`
3. Verá informações médicas do paciente:
   - Dados pessoais (nome, idade, tipo sanguíneo)
   - Alergias (com gravidade)
   - Medicações (dosagem e frequência)
   - Condições médicas
   - Contatos de emergência

## Estrutura de Dados

### Patient
```typescript
{
  id: string;
  name: string;
  birth_date: string;        // YYYY-MM-DD
  blood_type: BloodType;     // A+, A-, B+, B-, AB+, AB-, O+, O-
  weight_kg: number;
  height_cm: number;
  insurance?: string;
  created_at: string;        // ISO 8601
  updated_at: string;        // ISO 8601
}
```

### NfcCard
```typescript
{
  id: string;
  patient_id: string;
  token: string;             // Token único de 21 caracteres
  active: boolean;
  created_at: string;
  updated_at?: string;
  description?: string;      // Ex: "Cartão de emergência"
  access_count?: number;
}
```

### Allergy
```typescript
{
  id: string;
  patient_id: string;
  name: string;
  severity: 'low' | 'medium' | 'critical';
  reaction?: string;
}
```

### Medication
```typescript
{
  id: string;
  patient_id: string;
  name: string;
  dosage: string;            // Ex: "850mg"
  frequency: string;         // Ex: "2x ao dia"
  notes?: string;
}
```

### Condition
```typescript
{
  id: string;
  patient_id: string;
  name: string;
  diagnosed_at?: string;     // YYYY-MM-DD
  notes?: string;
}
```

### EmergencyContact
```typescript
{
  id: string;
  patient_id: string;
  name: string;
  relationship: string;      // Ex: "Esposa"
  phone: string;
}
```

## Segurança

### Implementado:

- ✅ **Autenticação simples**: Admin login com credenciais
- ✅ **Proteção de dashboard**: Requer autenticação para acessar
- ✅ **Tokens únicos**: Cada cartão tem token aleatório e único
- ✅ **Acesso público controlado**: URL com token é a única forma de acessar dados
- ✅ **Somente leitura pública**: Dados do cartão não podem ser editados via URL pública

### Recomendações para Produção:

- 🔐 **NextAuth.js**: Para autenticação mais robusta
- 🔐 **JWT/Sessions**: Tokens de sessão seguros
- 🔐 **HTTPS**: Certificado SSL para produção
- 🔐 **Rate limiting**: Proteção contra força bruta
- 🔐 **Criptografia**: Dados sensíveis criptografados
- 🔐 **CORS**: Controle de acesso cross-origin
- 🔐 **Audit logs**: Registrar todos os acessos e modificações
- 🔐 **2FA**: Autenticação de dois fatores para admin

## URLs Principais

| URL | Tipo | Proteção | Descrição |
|-----|------|----------|-----------|
| `/` | Público | Nenhuma | Home page |
| `/login` | Público | Nenhuma | Login admin |
| `/dashboard` | Protegido | Autenticação | Painel admin |
| `/p/[TOKEN]` | Público | Token | Cartão de paciente |
| `/api/cards` | API | Nenhuma | Operações com cartões |
| `/api/patients` | API | Nenhuma | Dados de pacientes |

## Próximos Passos

### Para migrar para produção:

1. **Conectar ao Supabase**:
   - Substituir `lib/mockdb.ts` com funções do Supabase
   - Migrar dados para banco de dados real
   - Implementar migrations

2. **Melhorar autenticação**:
   - Implementar NextAuth.js
   - Adicionar OAuth (Google, Microsoft)
   - Implementar 2FA

3. **Adicionar features**:
   - Histórico de acessos aos cartões
   - Notificações quando cartão é acessado
   - Dashboard de estatísticas
   - Exportar dados do paciente
   - Backup automático

4. **Performance**:
   - Implementar cache
   - Otimizar queries
   - CDN para assets

5. **Monitoring**:
   - Logs de acesso
   - Monitoramento de erros
   - Analytics

## Dados de Teste

Sistema vem com dados de teste pré-carregados:

**Paciente:**
- Nome: Carlos Ribeiro
- Data de nascimento: 15/07/1982 (42 anos)
- Tipo sanguíneo: O+
- Altura: 176 cm
- Peso: 82 kg
- Seguro: Unimed

**Alergias:**
- Penicilina (crítica)
- Dipirona (crítica)
- Látex (média)

**Medicações:**
- Metformina 850mg - 2x ao dia
- Losartana 50mg - 1x ao dia (manhã)

**Condições:**
- Diabetes tipo 2 (diagnosticado em 10/03/2018)
- Hipertensão arterial (diagnosticada em 22/06/2020)

**Contatos de Emergência:**
- Maria Ribeiro (Esposa) - (11) 98765-4321
- Dr. Paulo Souza (Cardiologista) - (11) 3456-7890

## Como Testar

1. **Iniciar servidor**: `npm run dev`
2. **Acessar home**: `http://localhost:3000`
3. **Fazer login**: `http://localhost:3000/login`
   - Usuário: `admin`
   - Senha: `admin`
4. **Gerenciar cartões**: Dashboard mostra opções
5. **Ver cartão público**: Copie o token e acesse `/p/[TOKEN]`
6. **Testar logout**: Botão logout no dashboard

## Suporte

Para dúvidas ou problemas, consulte:
- Documentação do Next.js: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Supabase: https://supabase.com/docs
