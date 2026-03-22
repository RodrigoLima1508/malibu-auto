# Malibu Automotiva - Sistema Premium

Sistema web profissional completo para gestão de orçamentos e controle financeiro de uma empresa de serviços automotivos. Design de nível premium inspirado em sites como Apple e Tesla.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)
![Prisma](https://img.shields.io/badge/Prisma-5-2d3748)

## Stack Tecnológica

- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS com Design System personalizado
- **Banco de Dados**: SQLite + Prisma ORM
- **Autenticação**: NextAuth.js (JWT)
- **Animações**: Framer Motion
- **Ícones**: Lucide React

## Design Premium

O projeto conta com um design system completo inspirado em sites de alto nível:

- **Design Tokens**: Sistema de cores, tipografia e espaçamento padronizados
- **Glassmorphism**: Efeitos de vidro fosco em elementos UI
- **Gradientes**: Gradientes suaves e mesh gradients
- **Animações**: Transições suaves e micro-interações
- **Dark Mode**: Tema escuro como padrão com suporte a light mode

### Paleta de Cores

| Cor | Hex | Uso |
|------|-----|-----|
| Roxo Primário | `#8B5CF6` | Ações principais, destaques |
| Roxo Escuro | `#7C3AED` | Hover states |
| Verde Sucesso | `#10B981` | Sucesso, entradas |
| Vermelho Erro | `#EF4444` | Erros, alertas |
| Amarelo Aviso | `#F59E0B` | Avisos, pendências |

## Funcionalidades

### Site Público

- **Hero Section**: Banner principal com animações, estatísticas e CTAs
- **Serviços**: Cards interativos com hover effects e badges "Mais Procurado"
- **Resultados**: Galeria com slider antes/depois interativo
- **Sobre Nós**: História da empresa com valores e diferenciais
- **Avaliações**: Carousel de depoimentos com integração Google
- **Localização**: Mapa integrado com informações de contato
- **Contato**: Formulário completo com upload de imagens e preview

### Painel Administrativo

- **Dashboard**: Visão geral com estatísticas em tempo real
- **Orçamentos**: 
  - Gerenciamento completo (CRUD)
  - Status: Pendente → Em Análise → Aprovado → Finalizado
  - Sistema de observações
  - Filtros e busca
- **Contabilidade**:
  - Registro de entradas e saídas
  - Categorias: Serviço, Peça, Despesa Operacional, etc.
  - Filtros por período e categoria
  - Exportação para CSV
  - Estatísticas financeiras

### Diferenciais

- Animações suaves com Framer Motion
- Slider comparativo antes/depois arrastável
- Upload de imagens com preview
- Design 100% responsivo
- Tema escuro premium
- Loading states e skeletons
- Feedback visual (toasts, badges)
- Interface nivel produto real

## Requisitos

- Node.js 18+
- npm ou yarn

## Instalação

```bash
# Clonar repositório
git clone <repo-url>
cd malibu-automotiva

# Instalar dependências
npm install

# Gerar cliente Prisma
npx prisma generate

# Criar banco de dados
npx prisma db push

# Popular com dados de exemplo (opcional)
npm run db:seed

# Iniciar desenvolvimento
npm run dev
```

## Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Servidor de produção |
| `npm run lint` | Verificação de código |
| `npm run db:generate` | Gerar cliente Prisma |
| `npm run db:push` | Sincronizar schema |
| `npm run db:seed` | Popular banco |
| `npm run db:studio` | Prisma Studio |

## Credenciais Padrão

- **Email**: admin@malibuautomotiva.com.br
- **Senha**: malibu2024

## Estrutura do Projeto

```
src/
├── app/
│   ├── (admin)/              # Rotas administrativas
│   │   ├── dashboard/        # Dashboard
│   │   ├── orcamentos/       # Gerenciamento de orçamentos
│   │   ├── contabilidade/    # Controle financeiro
│   │   ├── settings/         # Configurações
│   │   └── login/           # Login
│   ├── api/                 # API Routes
│   │   ├── auth/            # Autenticação
│   │   ├── orcamentos/      # CRUD orçamentos
│   │   ├── servicos/        # CRUD serviços
│   │   └── stats/           # Estatísticas
│   ├── globals.css          # Estilos globais
│   ├── layout.tsx           # Layout raiz
│   └── page.tsx             # Página inicial
├── components/
│   ├── ui/                  # Componentes base
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── StatusBadge.tsx
│   │   └── ...
│   ├── layout/              # Layout
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx
│   └── sections/            # Seções do site
│       ├── Hero.tsx
│       ├── Services.tsx
│       ├── Results.tsx
│       ├── About.tsx
│       ├── Testimonials.tsx
│       ├── Location.tsx
│       └── ContactForm.tsx
├── lib/
│   ├── auth.ts              # Config NextAuth
│   ├── db.ts               # Cliente Prisma
│   └── utils.ts            # Funções auxiliares
└── types/                   # Tipos TypeScript
```

## API Endpoints

### Autenticação
- `POST /api/auth` - Login, logout, sessão (NextAuth.js)

### Orçamentos
- `GET /api/orcamentos` - Listar orçamentos
- `POST /api/orcamentos` - Criar orçamento
- `GET /api/orcamentos/[id]` - Detalhes
- `PATCH /api/orcamentos/[id]` - Atualizar status/observação
- `DELETE /api/orcamentos/[id]` - Excluir

### Serviços/Contabilidade
- `GET /api/servicos` - Listar registros
- `POST /api/servicos` - Criar registro
- `PATCH /api/servicos/[id]` - Atualizar
- `DELETE /api/servicos/[id]` - Excluir

### Estatísticas
- `GET /api/stats` - Dashboard stats

## Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Render
1. Criar projeto Web Service
2. Conectar GitHub
3. Build Command: `npm run build`
4. Start Command: `npm start`

### Alternativa Local
O projeto funciona perfeitamente com SQLite localmente.

## Boas Práticas

- **Tipagem**: TypeScript strict mode
- **Componentes**: Reutilizáveis e testáveis
- **CSS**: Design tokens e variáveis CSS
- **Performance**: Server Components quando possível
- **Segurança**: Hash de senhas, JWT, validação de inputs

## Licença

MIT
