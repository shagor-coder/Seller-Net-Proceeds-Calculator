# Google AI Studio Configuration Guide
## Complete Setup Pattern for React + TypeScript + Vite + Tailwind CSS v4

This guide documents the exact configuration patterns used in this codebase. Use this as a reference when setting up new projects in Google AI Studio.

---

## 📋 Table of Contents

1. [Project Structure](#project-structure)
2. [Package Configuration](#package-configuration)
3. [TypeScript Configuration](#typescript-configuration)
4. [Vite Configuration](#vite-configuration)
5. [Tailwind CSS Configuration](#tailwind-css-configuration)
6. [PostCSS Configuration](#postcss-configuration)
7. [Build Process](#build-process)
8. [Key Patterns & Best Practices](#key-patterns--best-practices)

---

## 📁 Project Structure

```
project-root/
├── App.tsx                 # Main React component
├── index.tsx               # Client entry point with hydration
├── index.html              # HTML template
├── entry-server.tsx        # SSR entry point
├── styles.css              # Global styles
├── types.ts                # TypeScript type definitions
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite client build config
├── vite.ssr.config.ts      # Vite SSR build config
├── tailwind.config.ts      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── metadata.json           # Google AI Studio metadata
├── components/             # React components
│   ├── AIAssistant.tsx
│   ├── BreakdownModal.tsx
│   └── InputGroup.tsx
├── services/               # Service modules
│   └── geminiService.ts
└── scripts/                # Build scripts
    └── prerender.mjs
```

---

## 📦 Package Configuration

### `package.json`

```json
{
  "name": "your-app-name",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build --config vite.config.ts && vite build --ssr entry-server.tsx --outDir dist/server --config vite.ssr.config.ts && node scripts/prerender.mjs",
    "preview": "vite preview"
  },
  "dependencies": {
    "@google/genai": "^1.34.0",
    "lucide-react": "^0.562.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "recharts": "^2.15.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.18",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.23",
    "postcss": "^8.5.6",
    "tailwindcss": "^4.1.18",
    "terser": "^5.44.1",
    "typescript": "^5.7.2",
    "vite": "^6.0.3",
    "vite-plugin-prerender": "^1.0.8"
  }
}
```

### Key Points:
- **`"type": "module"`** - Enables ES modules
- **React 19** - Latest React version
- **Tailwind CSS v4** - Uses `@tailwindcss/postcss` plugin
- **Build script** - Multi-step: client build → SSR build → prerender

---

## 🔷 TypeScript Configuration

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": false,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["."],
  "exclude": ["node_modules", "dist"]
}
```

### Important Settings:
- **`target: "ESNext"`** - Uses latest ECMAScript features
- **`jsx: "react-jsx"`** - Modern React JSX transform (no need to import React)
- **`strict: true`** - Full type checking enabled
- **`esModuleInterop: false`** - Strict ES module handling
- **`allowSyntheticDefaultImports: true`** - Allows default imports from modules without default export

---

## ⚡ Vite Configuration

### `vite.config.ts` (Client Build)

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    cssCodeSplit: false,
    // Bundle all dependencies into a single file
    rollupOptions: {
      input: "index.html",
      output: {
        // Use IIFE format - self-contained, no imports/exports
        format: "iife",
        // Single entry file with all dependencies bundled
        entryFileNames: "bundle.js",
        // No code splitting - everything in one file
        manualChunks: undefined,
        // Inline all assets
        inlineDynamicImports: true,
        // Bundle format settings
        name: "nurtureBeastTool",
        extend: true,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) return "styles.css";
          return "assets/[name][extname]";
        },
      },
      // External dependencies - set to empty to bundle everything
      external: [],
    },
    // Ensure all dependencies are bundled
    commonjsOptions: {
      include: [/node_modules/],
    },
    // Target browsers that don't support ES modules
    target: "es2015",
    // Minify the output
    minify: "terser",
    terserOptions: {
      format: {
        // Remove all comments
        comments: false,
      },
    },
  },
  // Resolve all dependencies
  resolve: {
    dedupe: [],
  },
});
```

### Key Features:
- **IIFE format** - Self-contained bundle, no module system required
- **Single bundle** - All code in one `bundle.js` file
- **Single CSS** - All styles in one `styles.css` file
- **Terser minification** - Production-ready minified output
- **ES2015 target** - Broad browser compatibility

### `vite.ssr.config.ts` (SSR Build)

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // SSR build will output into dist/server via CLI --outDir
    rollupOptions: {
      output: {
        entryFileNames: "entry-server.js", // ✅ SSR output name
        chunkFileNames: "chunks/[name].js",
      },
    },
  },
});
```

### Key Features:
- **Separate SSR build** - Server-side rendering support
- **Output to `dist/server`** - Isolated server bundle
- **Chunked output** - Code splitting for SSR

---

## 🎨 Tailwind CSS Configuration

### `tailwind.config.ts`

```typescript
export default {
  darkMode: ["class", '[class*="tool-dark"]'],
  content: [
    "./index.html",
    "./App.tsx",
    "./components/**/*.{tsx,ts}",
    "./**/*.{tsx,ts}",
    "!./node_modules/**",
    "!./dist/**",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        emerald: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
      },
    },
  },
  plugins: [],
};
```

### Key Features:
- **Tailwind CSS v4** - Latest version with PostCSS plugin
- **Dark mode** - Supports class-based and `tool-dark` prefix
- **Custom fonts** - Outfit and Plus Jakarta Sans
- **Custom colors** - Extended emerald palette
- **Content paths** - Scans all TSX/TS files

---

## 🔧 PostCSS Configuration

### `postcss.config.js`

```javascript
export default {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
};
```

### Key Features:
- **Tailwind v4 PostCSS plugin** - `@tailwindcss/postcss`
- **Autoprefixer** - Automatic vendor prefixes

---

## 🏗️ Build Process

### Build Script Breakdown

```bash
npm run build
```

This runs three sequential steps:

1. **Client Build**: `vite build --config vite.config.ts`
   - Builds client-side bundle
   - Outputs to `dist/`
   - Creates `bundle.js` and `styles.css`

2. **SSR Build**: `vite build --ssr entry-server.tsx --outDir dist/server --config vite.ssr.config.ts`
   - Builds server-side bundle
   - Outputs to `dist/server/`
   - Creates `entry-server.js`

3. **Prerender**: `node scripts/prerender.mjs`
   - Generates static HTML
   - Pre-renders React components

### Output Structure

```
dist/
├── bundle.js           # Client bundle (IIFE format)
├── styles.css          # All CSS in one file
├── index.html          # HTML template
└── server/
    └── entry-server.js # SSR bundle
```

---

## 📝 Key Patterns & Best Practices

### 1. Entry Point Pattern

**`index.tsx`** - Client entry with hydration:

```typescript
import React from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

const el = document.getElementById("tool");

if (el) {
  // If prerendered HTML exists, hydrate. Otherwise, fall back to client render.
  if (el.hasChildNodes()) {
    hydrateRoot(el, <App />);
  } else {
    createRoot(el).render(<App />);
  }
}
```

### 2. HTML Template Pattern

**`index.html`**:

```html
<!doctype html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Your App Title</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body class="dark">
    <div id="tool"></div>
    <script type="module" src="/index.tsx"></script>
  </body>
</html>
```

### 3. Metadata Configuration

**`metadata.json`** (for Google AI Studio):

```json
{
  "name": "Your App Name",
  "description": "App description",
  "requestFramePermissions": []
}
```

### 4. Import Patterns

- **React 19**: No need to import React for JSX (thanks to `jsx: "react-jsx"`)
- **CSS**: Import styles in entry point: `import "./styles.css"`
- **Components**: Use ES6 imports: `import Component from "./components/Component"`

### 5. Styling Patterns

- Use Tailwind utility classes
- Custom colors via `tailwind.config.ts`
- Dark mode via `dark:` prefix or `tool-dark` class
- Global styles in `styles.css`

---

## 🚀 Quick Start Checklist

When setting up a new project in Google AI Studio:

- [ ] Create `package.json` with exact dependencies
- [ ] Set up `tsconfig.json` with strict TypeScript config
- [ ] Configure `vite.config.ts` for IIFE bundle
- [ ] Configure `vite.ssr.config.ts` for SSR
- [ ] Set up `tailwind.config.ts` with content paths
- [ ] Configure `postcss.config.js` with Tailwind v4 plugin
- [ ] Create `index.html` with tool container div
- [ ] Set up `index.tsx` with hydration logic
- [ ] Create `metadata.json` for AI Studio
- [ ] Run `npm install`
- [ ] Test with `npm run dev`
- [ ] Build with `npm run build`

---

## 🔍 Version Compatibility

| Package | Version | Notes |
|---------|---------|-------|
| React | ^19.0.0 | Latest React |
| React DOM | ^19.0.0 | Must match React |
| Vite | ^6.0.3 | Latest Vite |
| TypeScript | ^5.7.2 | Latest TypeScript |
| Tailwind CSS | ^4.1.18 | v4 with PostCSS plugin |
| @tailwindcss/postcss | ^4.1.18 | Required for Tailwind v4 |

---

## ⚠️ Important Notes

1. **IIFE Bundle Format**: The client build uses IIFE format for maximum compatibility. This means no ES modules in the output.

2. **Single File Bundle**: All JavaScript is bundled into one `bundle.js` file. No code splitting.

3. **CSS Bundle**: All CSS is in one `styles.css` file. No CSS code splitting.

4. **SSR Support**: The project supports server-side rendering with prerendering.

5. **Tailwind v4**: Uses the new PostCSS plugin approach, not the traditional config file pattern.

6. **React 19**: Uses the latest React with automatic JSX runtime.

7. **TypeScript Strict Mode**: Full type checking enabled. Fix all type errors.

---

## 📚 Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React 19 Documentation](https://react.dev/)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 🎯 Summary

This configuration provides:
- ✅ Modern React 19 with TypeScript
- ✅ Vite for fast development and optimized builds
- ✅ Tailwind CSS v4 for styling
- ✅ Single-file bundle output (IIFE format)
- ✅ SSR and prerendering support
- ✅ Production-ready minification
- ✅ Google AI Studio compatibility

Use this guide as a reference when setting up new projects to ensure consistency across your codebase.

