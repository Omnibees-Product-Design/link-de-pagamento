# UI Produtos Internos — Grupo Omnibees

Tu constróis interfaces para produtos internos (backoffices, dashboards, ferramentas de administração) do Grupo Omnibees. Todas as empresas do grupo (Omnibees, Niara, Bee2Pay, Infotera, Hsystem) partilham este design system.

Lê este conteúdo COMPLETO antes de escrever qualquer código de UI. Todas as regras são obrigatórias — sem excepções.

## Como configurar

### 1. Copiar este ficheiro para a raiz do projecto

\`\`\`bash
cp design.md ./design.md
\`\`\`

### 2. Adicionar referência no CLAUDE.md

No ficheiro \`CLAUDE.md\` do projecto (criar se não existir), adicionar:

\`\`\`markdown
## Design — OBRIGATÓRIO
Lê o ficheiro \`design.md\` na raiz deste projecto ANTES de escrever qualquer código de UI.
Todas as regras são obrigatórias e sem excepção.
NUNCA uses cores, fontes, radius ou componentes que não estejam definidos no design.md.
Se o design.md define um componente da biblioteca para o caso, usa-o — NUNCA cries alternativas.
\`\`\`

### 3. Instalar a biblioteca de componentes

\`\`\`bash
echo "@omnibees-internal-products:registry=https://npm.pkg.github.com" > .npmrc
npm install @omnibees-internal-products/ui lucide-react
\`\`\`

### 4. Importar os estilos base (obrigatório)

No \`app/layout.tsx\`:

\`\`\`tsx
import "@omnibees-internal-products/ui/styles.css";
\`\`\`

---

## NUNCA

- Outra fonte que não Inter
- Ícones que não sejam de lucide-react
- Classes Tailwind zinc, slate, gray ou neutral — usar SEMPRE os hex do design system
- border-black ou border-zinc — bordas são #EBEBEB ou #D3D3D3
- Texto branco sobre botão primário — #FEC437 usa texto #242424
- Border-radius fora da escala: 4 / 8 / 12 / 24 / 1000px
- Sombras shadow-* do Tailwind — usar os tokens de sombra definidos
- Recriar componentes que existem em @omnibees-internal-products/ui

## SEMPRE

- AppShell como layout raiz
- Verificar se o componente existe na lib antes de criar custom
- Touch targets mínimo 44px
- Estados hover, focus e disabled em elementos interactivos
- Contraste 4.5:1 texto normal, 3:1 texto grande (WCAG AA)

---

## Biblioteca — @omnibees-internal-products/ui

OBRIGATÓRIO: antes de criar qualquer componente, verifica se já existe.

Layout: AppShell (layout raiz de todas as apps), PageHeader (título + descrição + acções)
Formulários: Input, Textarea, Select (com multi e searchable), SearchInput
Botões: Button — variant: primary | secondary | outline | ghost — size: sm (32px) | md (44px) | lg (56px)
Tabs: UnderlineTabs, PillTabs
Menus: DropdownMenu, Tooltip
Feedback: Alert (info | success | warning | error), Badge (success | error | warning | info | neutral | purple), Modal, ConfirmDialog
Loading: Spinner, Skeleton, SkeletonText, SkeletonCard
Dados: Table (com sorting, row click, striped), Pagination
Cards: StatCard (KPIs), LinkCard (navegação), FeatureCard (features com ícone)
Estados: PlaceholderContent (estados vazios), PrototypePreview

---

## Cores

Primária:
  #FEC437 — Botão primário, acções principais
  #E6B132 — Hover do primário

Roxo:
  #F8F5FB — Fundos subtis
  #EEE1FE — Badges, tags
  #8E52DE — Texto sobre fundo claro
  #4D2D78 — Texto principal roxo

Cinza:
  #242424 — Texto principal
  #656565 — Texto secundário
  #A6A6A6 — Placeholders, texto desactivado
  #D3D3D3 — Bordas de input
  #EBEBEB — Bordas de card, divisores
  #F5F5F5 — Fundo de áreas de conteúdo, separação de secções
  #FFFFFF — Superfícies, cards, fundo de página

Estados:
  Sucesso: #079F28 (texto) / #C1DDA0 (fundo)
  Erro: #E90303 (texto) / #FFF0F0 (fundo)
  Aviso: #FDBA01 (texto) / #FFF5D9 (fundo)
  Info: #0C83D9 (texto) / #ECF3FE (fundo)

---

## Tipografia — Inter

  22px Bold — Títulos de página
  20px Bold — Títulos de secção
  18px SemiBold — Subtítulos, cabeçalhos card
  14px Bold — Labels, texto com destaque
  13px SemiBold — Texto de interface padrão
  12px Regular — Texto secundário, descrições
  11px Regular — Metadata, badges, captions

## Border Radius

  4px — Inputs, checkboxes
  8px — Botões, cards
  12px — Modais, containers grandes
  24px — Áreas de destaque
  1000px — Badges, pills

## Sombras

  0px 1px 2px rgba(0,0,0,0.06) — Inputs em foco
  0px 1px 3px rgba(0,0,0,0.1) — Cards padrão
  0px 4px 6px rgba(0,0,0,0.07) — Cards hover, dropdowns
  0px 10px 15px rgba(0,0,0,0.1) — Modais, painéis flutuantes

---

## Layouts Padrão

Dashboard:
  - PageHeader com título + acções à direita
  - Grid de StatCards: 4 colunas desktop, 2 tablet, 1 mobile
  - Secção de tabela com filtros
  - Fundo: #FFFFFF, cards com border #EBEBEB

Página de Tabela:
  - PageHeader: título + badge contador + Button primary "Novo"
  - Barra de filtros: SearchInput + Select
  - Table com Pagination
  - PlaceholderContent para estado vazio

Página de Formulário:
  - Layout centrado, max-width 640px
  - Secções agrupadas com subtítulo (18px SemiBold)
  - Rodapé: Button secondary "Cancelar" + Button primary "Guardar"

---

## Regras Obrigatórias

1. Biblioteca primeiro — nunca recriar componentes que existem na lib
2. AppShell — todas as apps usam como layout raiz
3. Fonte Inter — sem excepções
4. Fundo de área de conteúdo — #F5F5F5 para separar secções; #FFFFFF para cards e superfícies
5. Botão primário — #FEC437 com texto #242424
6. Bordas — #EBEBEB ou #D3D3D3
7. Ícones — lucide-react exclusivamente
8. Stack — Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS 4
9. Idioma — seguir o idioma do utilizador; se não especificado, usar o idioma do pedido