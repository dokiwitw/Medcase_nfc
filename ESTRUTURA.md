# 📋 Estrutura do Projeto - NFC Health Card System

## 📂 Hierarquia de Arquivos

```
nfc-health-web/
│
├── 📄 package.json              (Dependências e scripts)
├── 📄 tsconfig.json             (Configuração TypeScript)
├── 📄 next.config.mjs           (Configuração Next.js)
├── 📄 tailwind.config.ts        (Configuração Tailwind CSS)
├── 📄 postcss.config.js         (Configuração PostCSS)
│
├── 📁 lib/                      (Lógica de negócio)
│   ├── auth.ts                  ⭐ NOVO - Autenticação
│   ├── token.ts                 ⭐ NOVO - Geração de tokens
│   ├── mockdb.ts                ⭐ NOVO - Banco de dados
│   ├── db.ts                    (Supabase - em progresso)
│   ├── session.ts               (Gerenciamento de sessão)
│   ├── ratelimit.ts             (Rate limiting)
│   └── crypto.ts                (Utilitários de criptografia)
│
├── 📁 app/                      (Next.js App Router)
│   ├── layout.tsx               (Layout raiz)
│   ├── page.tsx                 ✏️ MODIFICADO - Home page melhorada
│   ├── globals.css              (Estilos globais)
│   │
│   ├── 📁 login/                ⭐ NOVO - Página de login
│   │   └── page.tsx
│   │
│   ├── 📁 dashboard/            ✏️ MODIFICADO - Dashboard admin
│   │   ├── page.tsx
│   │   ├── 📁 cards/
│   │   │   └── page.tsx
│   │   ├── 📁 cards/new/
│   │   │   └── page.tsx
│   │   └── 📁 profile/
│   │       └── page.tsx
│   │
│   ├── 📁 p/                    (Cartão público)
│   │   └── 📁 [token]/
│   │       └── page.tsx         ✏️ MODIFICADO - Busca por token
│   │
│   └── 📁 api/                  (API Routes)
│       ├── 📁 cards/
│       │   ├── route.ts         ✏️ MODIFICADO - CRUD de cartões
│       │   └── 📁 generate/
│       │       └── route.ts
│       └── 📁 patients/
│           └── route.ts         ⭐ NOVO - Dados de pacientes
│
├── 📁 components/               (Componentes React)
│   ├── CardList.tsx             ⭐ NOVO - Gerenciador de cartões
│   ├── CardItem.tsx
│   ├── AllergyCard.tsx
│   ├── AllergyListEditor.tsx
│   ├── ConditionList.tsx
│   ├── ConditionListEditor.tsx
│   ├── EmergencyContactListEditor.tsx
│   ├── EmergencyContactRow.tsx
│   ├── InfoGrid.tsx
│   ├── MedicationList.tsx
│   ├── MedicationListEditor.tsx
│   └── PatientInfoEditor.tsx
│
├── 📁 types/                    (Tipos TypeScript)
│   └── patient.types.ts         (Interfaces de dados)
│
├── 📁 public/                   (Arquivos estáticos)
│
├── 📄 README.md                 (Documentação original)
├── 📄 RESUMO_FINAL.md           ⭐ NOVO - Visão geral final
├── 📄 DOCUMENTACAO.md           ⭐ NOVO - Documentação técnica
├── 📄 MUDANCAS.md               ⭐ NOVO - Lista de mudanças
├── 📄 GUIA_RAPIDO.md            ⭐ NOVO - Guia de início rápido
└── 📄 ESTRUTURA.md              ⭐ NOVO - Este arquivo

Legend:
⭐ NOVO      = Arquivo criado
✏️ MODIFICADO = Arquivo editado
```

---

## 🔑 Arquivos Críticos

### Autenticação & Segurança
```
lib/auth.ts                 ← Gerencia login/logout/sessão
app/login/page.tsx          ← Formulário de login
app/dashboard/page.tsx      ← Protegido por autenticação
```

### Banco de Dados
```
lib/mockdb.ts               ← Todas as operações CRUD
app/api/cards/route.ts      ← API para cartões
app/api/patients/route.ts   ← API para pacientes
```

### Tokens
```
lib/token.ts                ← Geração de tokens únicos
app/p/[token]/page.tsx      ← Busca por token
```

### UI/Components
```
components/CardList.tsx     ← Gerenciador de cartões (principal)
app/page.tsx                ← Home page
app/dashboard/page.tsx      ← Dashboard admin
app/p/[token]/page.tsx      ← Visualizador de cartão
```

---

## 🔗 Fluxos de Dados

### Autenticação
```
User Input (Login)
    ↓
lib/auth.ts (validateCredentials)
    ↓
localStorage (saveSessionToStorage)
    ↓
app/dashboard/page.tsx (verificado com isAuthenticated)
    ↓
Dashboard Loaded ✅
```

### Criar Cartão
```
Button "+ Novo Cartão"
    ↓
CardList.tsx (handleAddCard)
    ↓
POST /api/cards
    ↓
lib/mockdb.ts (createCard)
    ↓
lib/token.ts (generateCardToken) 
    ↓
Nova NfcCard com token único ✅
```

### Visualizar Cartão
```
URL: /p/[TOKEN]
    ↓
app/p/[token]/page.tsx
    ↓
GET /api/cards?token=[TOKEN]
    ↓
lib/mockdb.ts (getCardByToken)
    ↓
GET /api/patients?patient_id=[ID]
    ↓
PatientFullData retornado ✅
```

### Editar Cartão
```
Clique no cartão
    ↓
CardList.tsx (seleciona cartão)
    ↓
Edita descrição
    ↓
Button "Salvar"
    ↓
PUT /api/cards
    ↓
lib/mockdb.ts (updateCard)
    ↓
Cartão atualizado ✅
```

---

## 🗂️ Arquitetura de Camadas

```
┌─────────────────────────────────────────┐
│         PRESENTATION LAYER              │
│  (UI Components & Pages)                │
├──────────────────────────────────────────┤
│ app/page.tsx                            │
│ app/login/page.tsx                      │
│ app/dashboard/page.tsx                  │
│ app/p/[token]/page.tsx                  │
│ components/CardList.tsx                 │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│         API LAYER                       │
│  (Next.js API Routes)                   │
├──────────────────────────────────────────┤
│ app/api/cards/route.ts                  │
│ app/api/patients/route.ts               │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│         BUSINESS LOGIC LAYER            │
│  (Core Functions)                       │
├──────────────────────────────────────────┤
│ lib/auth.ts                             │
│ lib/mockdb.ts                           │
│ lib/token.ts                            │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│         DATA LAYER                      │
│  (Database - Mock ou Real)              │
├──────────────────────────────────────────┤
│ In-memory database (mockdb.ts)          │
│ Future: Supabase                        │
└─────────────────────────────────────────┘
```

---

## 📊 Tipos Principais

### NfcCard (Cartão NFC)
```typescript
interface NfcCard {
  id: string;           // ID único do cartão
  patient_id: string;   // Referência ao paciente
  token: string;        // Token único para URL pública
  active: boolean;      // Cartão ativo ou inativo
  description?: string; // Ex: "Cartão de emergência"
  created_at: string;   // Data de criação
  updated_at?: string;  // Data de última modificação
  access_count?: number;// Quantas vezes foi acessado
  last_accessed?: string;// Último acesso
}
```

### Patient (Paciente)
```typescript
interface Patient {
  id: string;
  name: string;
  birth_date: string;
  blood_type: BloodType;
  weight_kg: number;
  height_cm: number;
  insurance?: string;
  created_at: string;
  updated_at: string;
}
```

### PatientFullData (Dados Completos)
```typescript
interface PatientFullData {
  patient: Patient;
  allergies: Allergy[];
  medications: Medication[];
  conditions: Condition[];
  contacts: EmergencyContact[];
}
```

---

## 🚀 Pontos de Entrada

### Para Usuário Admin
1. **Home**: `/` → Clica "Acessar Painel Admin"
2. **Login**: `/login` → Insere admin/admin
3. **Dashboard**: `/dashboard` → Gerencia cartões

### Para Usuário Final
1. **NFC Card**: Lê cartão NFC físico
2. **Smartphone**: Abre `/p/[TOKEN]` automaticamente
3. **Dados**: Visualiza informações médicas

---

## 🔄 Ciclo de Desenvolvimento

### Para adicionar nova funcionalidade:

1. **Definir tipo** em `types/patient.types.ts`
2. **Criar função DB** em `lib/mockdb.ts`
3. **Criar API route** em `app/api/*/route.ts`
4. **Criar componente** em `components/*.tsx`
5. **Integrar na página** em `app/*/page.tsx`

### Exemplo: Adicionar novo campo a Paciente

```typescript
// 1. Tipo
interface Patient {
  // ... existing
  emergency_blood?: boolean; // novo campo
}

// 2. Database
export async function updatePatient(id, updates) {
  // ... use emergency_blood
}

// 3. API
PUT /api/patients {
  patient_id, emergency_blood
}

// 4. Component
<input 
  type="checkbox"
  value={patient.emergency_blood}
  onChange={(e) => updatePatient(e.target.checked)}
/>

// 5. Page
<PatientEditor patient={patient} />
```

---

## 📈 Performance

### Otimizações Implementadas:
- ✅ **TypeScript**: Type safety em tempo de compilação
- ✅ **Next.js**: Automatic code splitting
- ✅ **Tailwind CSS**: CSS purging
- ✅ **Image Optimization**: Next/Image
- ✅ **React Hooks**: Minimal re-renders

### Possíveis Melhorias:
- 🔲 **Caching**: Implementar cache em API
- 🔲 **Pagination**: Para listas grandes
- 🔲 **Lazy Loading**: Componentes pesados
- 🔲 **CDN**: Para assets estáticos

---

## 🧪 Testabilidade

### Estrutura para testes:

```
__tests__/
├── lib/
│   ├── auth.test.ts
│   ├── token.test.ts
│   └── mockdb.test.ts
├── components/
│   └── CardList.test.tsx
├── api/
│   ├── cards.test.ts
│   └── patients.test.ts
└── e2e/
    ├── login.e2e.ts
    ├── dashboard.e2e.ts
    └── card-view.e2e.ts
```

---

## 🔐 Camadas de Segurança

```
┌─────────────────────────────────────┐
│  Client-side Authentication         │
│  (localStorage + isAuthenticated)   │
└─────────────────────────────────────┘
                ↓
┌─────────────────────────────────────┐
│  Route Protection                   │
│  (redirect if not authenticated)    │
└─────────────────────────────────────┘
                ↓
┌─────────────────────────────────────┐
│  Token Validation                   │
│  (validação de token único)         │
└─────────────────────────────────────┘
                ↓
┌─────────────────────────────────────┐
│  Read-only Public Access            │
│  (sem edição via URL pública)       │
└─────────────────────────────────────┘
```

---

## 📝 Convenções de Código

### Naming:
- `page.tsx` - Páginas de rotas
- `route.ts` - API routes
- `*.component.tsx` - Componentes
- `*.types.ts` - Tipos TypeScript
- `lib/*.ts` - Lógica de negócio

### Estilos:
- **Tailwind CSS** para todos os estilos
- Componentes responsivos (mobile-first)
- Cores consistentes via Tailwind config

### Estrutura de Commits:
```
feat: Adicionar novo cartão
fix: Corrigir erro de autenticação
docs: Atualizar documentação
refactor: Reorganizar código
test: Adicionar testes
```

---

## 🎯 Próximos Passos Recomendados

### Imediato:
1. ✅ Testar o sistema (já pronto!)
2. ✅ Criar QR codes
3. ✅ Testar em dispositivo móvel

### Curto Prazo (1-2 semanas):
1. Conectar ao Supabase
2. Adicionar mais pacientes
3. Implementar histórico de acessos

### Médio Prazo (1 mês):
1. NextAuth.js para auth robusta
2. Dashboard com estatísticas
3. Notificações de acesso

### Longo Prazo (3+ meses):
1. App mobile
2. Integração com sistemas hospitalares
3. API pública para terceiros

---

## 📞 Referências Rápidas

### Documentação Interna:
- `GUIA_RAPIDO.md` - Como começar
- `DOCUMENTACAO.md` - Referência técnica
- `MUDANCAS.md` - O que foi feito
- `RESUMO_FINAL.md` - Visão geral

### Documentação Externa:
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## ✨ Conclusão

Seu projeto está:
- ✅ Bem estruturado
- ✅ Fácil de manter
- ✅ Pronto para escalar
- ✅ Documentado completamente

**Aproveite!** 🚀
