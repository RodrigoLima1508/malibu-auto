# Malibu Automotiva - Sistema Completo

## 1. Concept & Vision

Sistema web institucional premium para uma empresa de serviços automotivos. A experiência transmite **confiança, profissionalismo e modernidade** - valores essenciais para o setor automotivo. O design combina elegância urbana com a energia dinâmica de uma oficina de alto padrão. Interface escura como tema principal (reforçando sofisticação) com acentos em roxo vibrante que comunicam inovação.

## 2. Design Language

### Aesthetic Direction
**"Luxury Automotive Studio"** - Inspirado em concessionárias premium e estúdios de design automotivo. Clean, sofisticado, com toques de energia criativa.

### Color Palette
```css
--primary: #8B5CF6;        /* Roxo vibrante */
--primary-dark: #7C3AED;   /* Roxo escuro */
--primary-light: #A78BFA;  /* Roxo claro */
--secondary: #10B981;      /* Verde esmeralda (sucesso) */
--background: #0F0F0F;      /* Preto profundo */
--background-card: #1A1A1A; /* Cards */
--background-elevated: #252525; /* Elementos elevados */
--text-primary: #FFFFFF;   /* Texto principal */
--text-secondary: #9CA3AF; /* Texto secundário */
--text-muted: #6B7280;     /* Texto muted */
--border: #2D2D2D;         /* Bordas */
--error: #EF4444;          /* Vermelho erro */
--warning: #F59E0B;        /* Amarelo aviso */
```

### Light Mode (Alternativo)
```css
--background: #FFFFFF;
--background-card: #F9FAFB;
--background-elevated: #F3F4F6;
--text-primary: #111827;
--text-secondary: #4B5563;
--border: #E5E7EB;
```

### Typography
- **Headings**: Inter (700, 600) - Clean e moderno
- **Body**: Inter (400, 500) - Excelente legibilidade
- **Monospace**: JetBrains Mono - Para valores financeiros

### Spatial System
- Base unit: 4px
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px
- Border radius: 8px (cards), 12px (modals), 9999px (pills)
- Container max-width: 1280px

### Motion Philosophy
- **Entrances**: Fade-in + translateY(-10px), 300ms ease-out, staggered 50ms
- **Hovers**: Scale(1.02) + shadow elevation, 200ms ease
- **Transitions**: 200ms ease-out for all interactions
- **Loading**: Pulse animation com shimmer effect
- **Page transitions**: Smooth scroll behavior

### Visual Assets
- **Icons**: Lucide React (consistent stroke width 2px)
- **Images**: Unsplash automotive photography
- **Decorative**: Gradient overlays, subtle grid patterns, glow effects

## 3. Layout & Structure

### Site Público
```
├── Header (fixed, glassmorphism)
│   ├── Logo
│   ├── Nav Links (smooth scroll)
│   ├── Theme Toggle
│   └── CTA Button "Solicitar Orçamento"
│
├── Hero Section (full viewport)
│   ├── Animated headline
│   ├── Subtitle
│   └── Dual CTA
│
├── Services Grid (3 columns)
│   ├── Funilaria
│   ├── Pintura
│   ├── Polimento
│   ├── Vitrificação
│   └── others...
│
├── Gallery (before/after slider)
│   └── Masonry grid with lightbox
│
├── About Section
│   ├── Company story
│   └── Values/mission
│
├── Location (map + contact info)
│
├── Contact Form (glassmorphism card)
│
└── Footer
```

### Painel Admin
```
├── Sidebar (collapsible)
│   ├── Dashboard (stats)
│   ├── Orçamentos
│   ├── Contabilidade
│   └── Configurações
│
├── Main Content Area
│   ├── Header with breadcrumbs
│   └── Dynamic content
│
└── Status Bar (bottom)
```

### Responsive Strategy
- **Desktop**: Full sidebar, multi-column grids
- **Tablet**: Collapsed sidebar, 2-column grids
- **Mobile**: Bottom navigation, single column, touch-optimized

## 4. Features & Interactions

### Site Público

#### Navigation
- Smooth scroll to sections
- Active section highlight
- Mobile hamburger menu with slide-in drawer
- Logo click returns to top

#### Hero
- Typewriter effect on headline
- Parallax background (subtle)
- Floating car silhouette decoration

#### Services
- Card hover: lift + glow effect
- Icon animation on hover
- Click opens modal with service details

#### Gallery
- Before/after comparison slider
- Lightbox with swipe navigation
- Lazy loading with blur-up placeholder

#### Contact Form
- Real-time validation
- Character counter
- Image upload with preview (max 5 images, 5MB each)
- Success animation (checkmark burst)
- Error shake animation
- Form data persists in localStorage (draft)

### Sistema de Orçamentos

#### Submission Flow
1. User fills form
2. Client-side validation
3. Image upload (drag & drop supported)
4. Loading state with progress
5. Success: redirect to confirmation + email notification
6. Error: inline error messages + retry option

#### Status Types
- **Pendente** (amarelo) - Novo pedido
- **Em Análise** (azul) - Analisando
- **Aprovado** (verde) - Aprovado para execução
- **Finalizado** (roxo) - Serviço concluído
- **Cancelado** (vermelho) - Cancelado

### Painel Admin

#### Authentication
- Login page with email/password
- JWT stored in httpOnly cookie
- Auto-logout after 24h inactivity
- Session refresh on activity

#### Dashboard
- Stats cards with animated counters
- Recent requests list
- Quick actions
- Revenue chart (last 7 days)

#### Orçamentos Management
- Sortable/filterable table
- Bulk status update
- Individual detail view with chat thread
- Image gallery per request
- Export to CSV

#### Contabilidade
- Add entry form (modal)
- Edit/delete entries
- Date range picker
- Category filter
- Auto-sum calculations
- Print-friendly report view

### Módulo de Contabilidade

#### Entry Types
- **Entrada** (green) - Pagamento recebido
- **Saída** (red) - Despesa

#### Fields
- Veículo (text)
- Ano (number)
- Serviço (text)
- Descrição (textarea, optional)
- Valor (currency BRL)
- Data (date)
- Tipo (entrada/saída)
- Categoria (serviço/peça/despesa operacional)

#### Reports
- Daily/weekly/monthly summaries
- Category breakdown pie chart
- Profit margin calculation
- Export to PDF/Excel

## 5. Component Inventory

### Buttons
- **Primary**: Purple gradient, white text, shadow glow on hover
- **Secondary**: Ghost style, purple border
- **Danger**: Red variant
- **States**: hover (lift), active (press), disabled (opacity 50%), loading (spinner)

### Inputs
- Dark background (#1A1A1A)
- Purple focus ring
- Error state: red border + message below
- Success state: green checkmark

### Cards
- Background: var(--background-card)
- Border: 1px solid var(--border)
- Hover: border-color transition to purple
- Shadow: 0 4px 6px -1px rgba(0,0,0,0.3)

### Status Badges
- Pill shape, uppercase, small text
- Color-coded background (10% opacity) + text color

### Modal
- Centered, backdrop blur
- Slide-up entrance animation
- Close on escape/outside click
- Focus trap

### Table
- Striped rows (alternating opacity)
- Sticky header
- Row hover highlight
- Pagination controls

### Toast Notifications
- Bottom-right positioned
- Auto-dismiss (5s)
- Manual dismiss
- Stack with animation
- Types: success, error, warning, info

### Loading States
- Skeleton screens for content
- Spinner for actions
- Progress bar for uploads

### Empty States
- Illustration + message
- CTA button to add first item

## 6. Technical Approach

### Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Variables
- **Database**: SQLite with Prisma ORM
- **Auth**: NextAuth.js with Credentials provider
- **File Upload**: Local filesystem (uploads folder)
- **State**: React Context + SWR for data fetching
- **Forms**: React Hook Form + Zod validation

### Project Structure
```
/
├── src/
│   ├── app/
│   │   ├── (public)/          # Public site routes
│   │   │   ├── page.tsx       # Home
│   │   │   ├── services/
│   │   │   ├── gallery/
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   └── location/
│   │   ├── (admin)/           # Admin routes
│   │   │   ├── login/
│   │   │   ├── dashboard/
│   │   │   ├── orcamentos/
│   │   │   ├── contabilidade/
│   │   │   └── settings/
│   │   ├── api/               # API routes
│   │   │   ├── auth/
│   │   │   ├── orcamentos/
│   │   │   └── servicos/
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                # Base components
│   │   ├── layout/            # Layout components
│   │   ├── sections/          # Page sections
│   │   └── admin/              # Admin components
│   ├── lib/
│   │   ├── db.ts              # Prisma client
│   │   ├── auth.ts            # Auth config
│   │   └── utils.ts           # Utilities
│   └── types/                 # TypeScript types
├── prisma/
│   └── schema.prisma
├── public/
│   ├── uploads/               # User uploads
│   └── images/
├── package.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```

### Database Schema

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String
  role      Role     @default(ADMIN)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  orcamentos Orcamento[]
}

enum Role {
  ADMIN
  SUPERADMIN
}

model Orcamento {
  id          String   @id @default(cuid())
  nome        String
  telefone    String
  whatsapp    String?
  email       String?
  veiculo     String
  ano         Int?
  servico     String
  descricao   String?
  imagens     String?  // JSON array of image paths
  status      Status   @default(PENDENTE)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  observacoes Observacao[]
}

enum Status {
  PENDENTE
  EM_ANALISE
  APROVADO
  FINALIZADO
  CANCELADO
}

model Observacao {
  id         String   @id @default(cuid())
  orcamento  Orcamento @relation(fields: [orcamentoId], references: [id], onDelete: Cascade)
  orcamentoId String
  texto      String
  createdBy  String
  createdAt  DateTime @default(now())
}

model ServicoRealizado {
  id          String   @id @default(cuid())
  veiculo     String
  ano         Int?
  servico     String
  descricao   String?
  valor       Float
  tipo        TipoTransacao
  categoria   String
  data        DateTime @default(now())
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum TipoTransacao {
  ENTRADA
  SAIDA
}
```

### API Endpoints

#### Auth
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/session` - Get session

#### Orçamentos
- `GET /api/orcamentos` - List all (admin)
- `GET /api/orcamentos/:id` - Get one
- `POST /api/orcamentos` - Create new
- `PATCH /api/orcamentos/:id` - Update status
- `DELETE /api/orcamentos/:id` - Delete
- `POST /api/orcamentos/:id/observacao` - Add observation
- `POST /api/upload` - Upload image

#### Serviços
- `GET /api/servicos` - List all
- `POST /api/servicos` - Create entry
- `PATCH /api/servicos/:id` - Update entry
- `DELETE /api/servicos/:id` - Delete entry
- `GET /api/servicos/stats` - Get financial stats

### Security
- Password hashing with bcrypt
- JWT with 24h expiry
- CSRF protection
- Input sanitization
- File type validation
- Rate limiting on public endpoints
