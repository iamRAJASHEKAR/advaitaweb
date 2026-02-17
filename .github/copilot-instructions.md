# Advaita Hyginie - Copilot Instructions

## Project Overview

Advaita Hyginie is a React + TypeScript B2B hygiene products wholesale, manufacturer, and distribution platform based in India.

## Tech Stack

- **Frontend**: React 19.2.0 + TypeScript 5.9.3
- **Build Tool**: Vite 7.2.4 (rolldown-vite)
- **Styling**: CSS + CSS Variables (centralized theme)
- **State Management**: React hooks (useState, useEffect, useMemo)
- **Node.js**: Requires v20.19+ or v22.12+

---

## Design System & Theme

### Color Palette (Centralized)

All colors are managed centrally:

1. **TypeScript** (`src/theme/colors.ts`): `colors` object for programmatic access
2. **CSS Variables** (`src/theme/variables.css`): `--color-*` for stylesheets

| Purpose       | Color        | Hex       | CSS Variable           |
| ------------- | ------------ | --------- | ---------------------- |
| Primary Brand | Navy Blue    | `#0A2540` | `--color-primary`      |
| Secondary     | Silver Grey  | `#CBD5E1` | `--color-secondary`    |
| Background    | White        | `#FFFFFF` | `--color-bg-main`      |
| Text Primary  | Almost Black | `#020617` | `--color-text-primary` |
| CTA / Accent  | Royal Blue   | `#2563EB` | `--color-cta`          |

**Semantic Colors:**

- Success: `#10b981` (`--color-success`)
- Warning: `#f59e0b` (`--color-warning`)
- Error: `#ef4444` (`--color-error`)
- Info: `#3b82f6` (`--color-info`)

### Typography

- **Font Family**: Montserrat (primary), Inter (fallback), system-ui
- **Font Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Base Font**: 16px
- **Page Title**: 1.6rem, color: `--color-primary`, letter-spacing: 0.01em
- **Muted Text**: 0.95rem, color: `--color-text-muted`

### Spacing Scale

```css
Small (sm):      0.5rem
Medium (md):     1rem
Large (lg):      1.5rem
Extra Large:     2rem
Padding (card):  1.5rem
Border Radius:   10px (buttons), 12px (cards)
```

### Component Classes with CSS Variables

#### Cards

```css
.card {
  background: var(--color-bg-light);
  border: 1px solid var(--color-border-light);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(10, 37, 64, 0.08);
}
```

#### Buttons

```css
.btn--primary {
  background: var(--color-cta);
  color: var(--color-text-inverse);
}

.btn--outline {
  background: transparent;
  color: var(--color-text-primary);
  border: 1px solid var(--color-primary);
}
```

### UI Theme

- All components must follow the **Navy Blue & Royal Blue** professional B2B theme
- Navy Blue (#0A2540) for primary elements, headers, titles
- Royal Blue (#2563EB) for CTAs, interactive elements, highlights
- White backgrounds with dark text for accessibility
- Silver Grey accents for secondary information

---

## Folder Structure

```
src/
├── theme/
│   ├── colors.ts           # TypeScript color definitions
│   └── variables.css       # CSS color variables
├── App.tsx                 # Main app component
├── App.css                 # Global component styles (imports variables.css)
├── index.css               # Global styles
└── main.tsx                # Entry point
```

## Architecture & Patterns

### Component Structure

1. **Functional Components Only** - Use React hooks, no class components
2. **TypeScript Strict Mode** - All components must be typed
3. **Props Interface** - Always define `type Props = {...}` at the top
4. **CSS with Variables** - Use `var(--color-*)` from centralized theme
5. **No Inline Styles** - Exception: dynamic positioning only
6. **File Colocations** - Component + CSS file together

### State Management

```typescript
// Local state
const [data, setData] = useState<Type>([]);

// Derived state
const filtered = useMemo(() => {
  return data.filter(/* logic */);
}, [data, dependencies]);

// Side effects
useEffect(() => {
  let mounted = true;
  (async () => {
    const result = await fetchData();
    if (mounted) setState(result);
  })();
  return () => {
    mounted = false;
  };
}, [dependencies]);
```

---

## Coding Guidelines

### 1. Using the Theme System

#### In CSS/SCSS

```css
.my-component {
  color: var(--color-text-primary);
  background: var(--color-bg-main);
  border: 1px solid var(--color-border-light);
}

.my-button {
  background: var(--color-cta);
  color: var(--color-text-inverse);
}
```

#### In TypeScript (for dynamic styles only)

```typescript
import { colors } from "@/theme/colors";

const dynamicStyle = {
  color: colors.cta.main,
  backgroundColor: colors.background.light,
};
```

### 2. TypeScript Conventions

```typescript
// Always use explicit types
type Props = {
  items: ProductItem[];
  onSelect: (id: string) => void;
};

// Never use 'any'
const [data, setData] = useState<Product[]>([]);

// Optional chaining for safety
const name = item?.brand || "Unbranded";
```

### 3. Component Patterns

#### Page Component

```typescript
export default function ProductPage() {
  const [state, setState] = useState<Type>(initialValue);

  useEffect(() => {
    // data loading
  }, []);

  return (
    <section className="shell">
      <h1 className="eyebrow">Page Title</h1>
      {/* content */}
    </section>
  );
}
```

### 4. Async Operations

```typescript
// Use try-catch for error handling
const handleAction = async () => {
  try {
    const result = await apiCall();
    setState(result);
  } catch (error) {
    console.error("Error:", error);
  }
};

// Prevent memory leaks
useEffect(() => {
  let mounted = true;
  (async () => {
    if (mounted) setState(data);
  })();
  return () => {
    mounted = false;
  };
}, []);
```

---

## Common Pitfalls to Avoid

1. ❌ **Don't hardcode colors** - Always use `var(--color-*)` in CSS or `colors` object in TypeScript
2. ❌ **Don't use `any` type** - Always provide explicit types
3. ❌ **Don't use inline styles** (except dynamic positioning)
4. ❌ **Don't ignore errors** - Always handle with try-catch
5. ❌ **Don't use different fonts** - Stick to Montserrat
6. ❌ **Don't create new color schemes** - Use centralized theme

---

## File Naming Conventions

- **Components**: PascalCase (e.g., `Dashboard.tsx`)
- **Styles**: Match component name (e.g., `Dashboard.css`)
- **Utilities**: kebab-case (e.g., `sku-generator.ts`)
- **Types**: kebab-case (e.g., `product.ts`)
- **Theme Files**: kebab-case in `theme/` folder

---

## Development Commands

```bash
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

---

## Git Commit Guidelines

- Format: `type: description`
- Types: `feat`, `fix`, `style`, `refactor`, `docs`, `chore`
- Example: `feat: add product detail page with quote modal`

---

## Key Features Reference

### Product Catalog

- Dustbins, Tissues, Hand Dryers, Dispensers
- Product detail pages with specifications
- Get Quote and Request Callback functionality

### Navigation

- Home page with hero, stats, and catalogue sections
- Product detail page with gallery and specs
- Modal forms for customer inquiries

### Theme Implementation

- All colors centralized in `src/theme/`
- CSS variables for consistency
- TypeScript color exports for components

---

**Last Updated**: January 24, 2026
**Project Version**: 0.0.1
